import React, { useState, useEffect, useCallback } from "react";
import { message } from "antd";
import { checkMomoPayment, createMomoPayment } from "../../Api/MoMoApi";
import { useSelector } from "react-redux";
import {
  selectTotalCartAmount,
  selectCartItems,
  selectAllProducts,
} from "../../Redux/ShopSlice";
import OrderInfoStep from "./Steps/OrderInfoStep";
import RecipientInfoStep from "./Steps/RecipientInfoStepMoMo";
import PaymentResultStep from "./Result/PaymentResultMoMo";

const OnlineMomo = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [transactionInfo, setTransactionInfo] = useState({});
  const [recipientInfo, setRecipientInfo] = useState({});
  const totalCartAmount = useSelector(selectTotalCartAmount);
  const cartItems = useSelector(selectCartItems);
  const allProducts = useSelector(selectAllProducts);

  const handleMoMoCallback = useCallback(async () => {
    const params = new URLSearchParams(window.location.search);
    const resultCode = params.get("resultCode");
    if (resultCode === "0") {
      try {
        const orderId = params.get("orderId");
        const transactionData = await checkMomoPayment({ orderId });
        if (transactionData.resultCode === 0) {
          setTransactionInfo({
            transactionId: orderId,
            amount: transactionData.amount,
            timestamp: new Date(transactionData.responseTime).toLocaleString(),
          });
          setCurrentStep(3);
        } else {
          message.error("Transaction failed.");
        }
      } catch (error) {
        console.error("Error in handleMoMoCallback:", error);
      }
    } else if (resultCode === "-49") {
      message.error("Payment canceled");
    } else if (resultCode === "-217") {
      message.error("[UserAndSystem] Transaction failed.");
    }
  }, []);

  useEffect(() => {
    handleMoMoCallback();
  }, [handleMoMoCallback]);

  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);

  return (
    <div>
      {currentStep === 1 && (
        <OrderInfoStep onNext={nextStep} setRecipientInfo={setRecipientInfo} />
      )}
      {currentStep === 2 && (
        <RecipientInfoStep
          onPrev={prevStep}
          createMoMoPayment={createMomoPayment}
          totalCartAmount={totalCartAmount}
          cartItems={cartItems}
          allProducts={allProducts}
          recipientInfo={recipientInfo}
        />
      )}
      {currentStep === 3 && (
        <PaymentResultStep
          transactionInfo={transactionInfo}
          recipientInfo={recipientInfo}
        />
      )}
    </div>
  );
};

export default OnlineMomo;
