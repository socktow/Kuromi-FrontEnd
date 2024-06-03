import React, { useState, useEffect, useMemo } from "react";
import { Form, Button, Descriptions, List, Select } from "antd";
import  fetchVouchers  from "../../../Api/Vouchers";
const { Option } = Select;

const RecipientInfoStepZalo = ({ onPrev, createZaloPayment, totalCartAmount, cartItems, allProducts }) => {
  const [vouchers, setVouchers] = useState([]);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [selectedVoucherInfo, setSelectedVoucherInfo] = useState(null);

  useEffect(() => {
    fetchVoucherData();
  }, []);

  const fetchVoucherData = async () => {
    const data = await fetchVouchers();
    setVouchers(data);
  };

  const handleVoucherChange = (value) => {
    setSelectedVoucher(value);
    const voucherInfo = vouchers.find(voucher => voucher._id === value);
    setSelectedVoucherInfo(voucherInfo);
  };

  const getProductDetails = (productId) => {
    return allProducts.find((product) => product.id === productId);
  };

  const saveOrderInfo = (values) => {
    const orderDetails = {
      recipientInfo: {
        receiverName: values.fullName || "",
        deliveryAddress: values.address || "",
        phoneNumber: values.phoneNumber || "",
        email: values.email || "",
      },
      total: totalCartAmount || 0,
      items: cartItems.map((item) => {
        const product = getProductDetails(item.productId);
        return {
          name: product?.name || "Unknown",
          price: product?.new_price || 0,
          quantity: item.quantity,
          size: item.size,
          image: product?.image || "",
        };
      }),
      voucher: selectedVoucher,
    };
    localStorage.setItem("orderInfo", JSON.stringify(orderDetails));
    return orderDetails;
  };

  const handlePayment = async (values) => {
    const orderDetails = saveOrderInfo(values);
    try {
      const paymentResponse = await createZaloPayment({
        amount: totalCartAmount,
        productName: orderDetails.items.map((item) => item.name).join(", "),
        productDescription: `Order with ${orderDetails.items.length} items`,
      });
      if (paymentResponse.return_code === 1) {
        window.location.href = paymentResponse.order_url;
      } else {
        console.error("Payment creation failed: ", paymentResponse);
      }
    } catch (error) {
      console.error("Payment Error: ", error);
    }
  };

  const renderedVouchers = useMemo(() => {
    return vouchers.map((voucher) => (
      <Option key={voucher._id} value={voucher._id}>
        {voucher.voucherName} - Giảm tối đa {(voucher?.minimumOrderValue || 0).toLocaleString("en-US")} VND
      </Option>
    ));
  }, [vouchers]);

  return (
    <div>
      <Form
        layout="vertical"
        style={{
          maxWidth: "500px",
          margin: "auto",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          marginTop: "20px",
        }}
        onFinish={handlePayment}
      >
        <Descriptions title="Thông Tin Đơn Hàng" bordered>
          <Descriptions.Item label="Tổng tiền" span={3}>
            {(totalCartAmount || 0).toLocaleString("en-US")} VND
          </Descriptions.Item>
          <Descriptions.Item label="Số Lượng" span={3}>
            {cartItems.length} Sản Phẩm
          </Descriptions.Item>
          <Descriptions.Item label="Voucher" span={3}>
            <Select
              placeholder="Chọn voucher"
              style={{ width: "100%" }}
              onChange={handleVoucherChange}
              value={selectedVoucher}
            >
              {renderedVouchers}
            </Select>
          </Descriptions.Item>
          {selectedVoucherInfo && (
            <Descriptions.Item label="Thông tin Voucher" span={3}>
              <div>
                <p><strong>Tên Voucher:</strong> {selectedVoucherInfo.voucherName}</p>
                <p><strong>Mã Voucher:</strong> {selectedVoucherInfo.voucherCode}</p>
                <p><strong>Đơn hàng tối thiểu:</strong> {(selectedVoucherInfo.minimumOrderValue || 0).toLocaleString("en-US")} VND</p>
                <p><strong>Giảm tối đa:</strong> {(selectedVoucherInfo.maximumDiscount || 0).toLocaleString("en-US")} VND</p>
                <p><strong>Hạn sử dụng:</strong> {selectedVoucherInfo.voucherExpiry}</p>
              </div>
            </Descriptions.Item>
          )}
        </Descriptions>
        <List
          itemLayout="horizontal"
          dataSource={cartItems}
          renderItem={(item) => {
            const product = getProductDetails(item.productId);
            return (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <img
                      src={product?.image || ""}
                      alt={product?.name || "Unknown"}
                      style={{ width: 50 }}
                    />
                  }
                  title={product?.name || "Unknown"}
                  description={`Số lượng: ${item.quantity} Size: ${item.size} - Giá: ${(product?.new_price || 0).toLocaleString(
                    "en-US"
                  )} VND  Tổng giá: ${((product?.new_price || 0) * item.quantity).toLocaleString(
                    "en-US"
                  )} VND`}
                />
              </List.Item>
            );
          }}
        />
        <Form.Item>
          <Button
            onClick={onPrev}
            style={{ marginRight: "10px" }}
          >
            Quay Lại
          </Button>
          <Button
            type="primary"
            htmlType="submit"
          >
            Thanh Toán
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RecipientInfoStepZalo;