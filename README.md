# Kuromi Store Frontend

## Introduction
Kuromi Store Frontend is a modern e-commerce web application built with React.js, offering a seamless shopping experience for men's, women's, and children's clothing. The application features a responsive design, intuitive user interface, and integration with multiple payment gateways.

## Libraries & Dependencies

### Core Technologies
- **React** (^18.3.1) - Frontend framework
- **React Router** (^6.23.0) - Routing
- **Redux Toolkit** (^2.2.4) - State management
- **Axios** (^1.6.8) - HTTP client

### UI Components & Styling
- **Ant Design** (^5.17.0) - UI component library
- **Bootstrap** (^5.3.3) - CSS framework
- **SASS** (^1.76.0) - CSS preprocessor
- **Font Awesome** (^6.5.2) - Icon library

### State Management & Data Handling
- **Redux Thunk** (^3.1.0) - Async actions
- **Moment.js** (^2.30.1) - Date handling
- **Recharts** (^2.12.7) - Data visualization
- **XLSX** (^0.18.5) - Excel file handling

### Authentication & Security
- **JWT** (^9.0.2) - Authentication
- **Firebase** (^10.12.2) - Backend services
- **bcryptjs** (^2.4.3) - Password hashing

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/socktow/Kuromi-FrontEnd
   cd Kuromi-FrontEnd
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Configuration:**
   Create a `.env` file in the root directory with the following variables:
   ```
   REACT_APP_API_URL=http://localhost:4000
   REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   ```

4. **Start the development server:**
   ```bash
   npm start
   ```

5. **Build for production:**
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── redux/         # Redux store and slices
├── services/      # API services
├── utils/         # Utility functions
├── assets/        # Static assets
└── styles/        # Global styles and themes
```

## Features

### User Interface
- Responsive design for all devices
- Modern and intuitive navigation
- Product filtering and search
- Shopping cart functionality
- User profile management

### Authentication
- User registration and login
- Email verification
- Password recovery
- Social media authentication

### Shopping Experience
- Product catalog with categories
- Detailed product views
- Shopping cart management
- Order tracking
- Wishlist functionality

### Payment Integration
- Momo payment gateway
- Zalo payment gateway
- Order confirmation
- Payment status tracking

### Admin Dashboard
- Product management
- Order management
- User management
- Analytics and reporting
- Voucher system management

## Customization

### Styling
- Modify `src/styles/` for global styles
- Use SASS variables for theming
- Customize Ant Design components

### Components
- Create new components in `src/components/`
- Follow the existing component structure
- Use TypeScript for type safety

### API Integration
- Update API endpoints in `src/services/`
- Modify Redux actions and reducers
- Handle API responses and errors

## Performance Optimization
- Code splitting
- Lazy loading
- Image optimization
- Caching strategies

## Testing
```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage
```

## Deployment
1. Build the application:
   ```bash
   npm run build
   ```
2. Deploy the `build` folder to your hosting service

## Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License
ISC License
