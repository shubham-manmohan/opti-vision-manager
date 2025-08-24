# Opti-Vision Manager

A comprehensive, professional-grade optical store management system built with React, TypeScript, and modern web technologies. Designed specifically for optical professionals to manage customers, orders, inventory, and analytics efficiently.

## ✨ Features

### 🏥 **Customer Management**
- **Complete Customer Profiles**: Store customer information including contact details, location, and visit history
- **Prescription Management**: Track detailed prescription data (SPH, CYL, AXIS, PD) with notes
- **Customer Status Tracking**: VIP, Active, and Inactive customer categorization
- **Search & Filter**: Find customers by name, phone, email, or location
- **Customer History**: View order history and last visit information

### 📋 **Order Management**
- **Comprehensive Order Tracking**: Full order lifecycle from pending to delivered
- **Status Management**: Pending → Confirmed → In Lab → Ready → Delivered
- **Prescription Integration**: Automatic prescription loading from customer profiles
- **Payment Tracking**: Advance payment and balance due management
- **Product Details**: Frame specifications and lens type tracking
- **Delivery Scheduling**: Expected delivery date management

### 📦 **Inventory Management**
- **Product Catalog**: Frames, lenses, and accessories with detailed specifications
- **Stock Tracking**: Real-time inventory levels with reorder alerts
- **Supplier Management**: Track suppliers and restocking information
- **Pricing Management**: Cost price, selling price, and profit margin calculations
- **Category Organization**: Frame, Lens, and Accessory categorization
- **Low Stock Alerts**: Automatic notifications for items below reorder levels

### 📊 **Analytics & Reporting**
- **Real-time Dashboard**: Live statistics and key performance indicators
- **Sales Analytics**: Revenue tracking, order trends, and customer metrics
- **Product Performance**: Top-selling products with sales percentages
- **Customer Insights**: Customer retention and order value analysis
- **Inventory Analytics**: Stock levels, reorder requirements, and supplier performance

### 🎨 **Professional UI/UX**
- **Mobile-First Design**: Optimized for mobile devices and tablets
- **Professional Theme**: Medical-grade interface with optical industry colors
- **Responsive Layout**: Works seamlessly across all device sizes
- **Intuitive Navigation**: Easy-to-use interface with quick actions
- **Modern Components**: Built with shadcn/ui components for consistency

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd opti-vision-manager
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production
```bash
npm run build
```

## 🏗️ Architecture

### **Frontend Stack**
- **React 18**: Modern React with hooks and functional components
- **TypeScript**: Type-safe development with comprehensive interfaces
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework with custom design system
- **shadcn/ui**: High-quality, accessible UI components

### **State Management**
- **Zustand**: Lightweight state management with persistence
- **Local Storage**: Data persistence across browser sessions
- **Real-time Updates**: Immediate UI updates on data changes

### **Data Structure**
- **Customers**: Complete customer profiles with prescription data
- **Orders**: Full order lifecycle with status tracking
- **Inventory**: Product catalog with stock management
- **Analytics**: Real-time business intelligence

## 📱 Usage Guide

### **Dashboard**
- **Quick Overview**: View today's orders, revenue, and pending items
- **Quick Actions**: Add customers, create orders, and manage inventory
- **Recent Activity**: Monitor latest business activities
- **Order Status**: Track order progress across all stages

### **Customer Management**
1. **Add Customer**: Click "Add New Customer" button
2. **Fill Details**: Enter name, phone, email, and location
3. **Prescription**: Add detailed prescription information
4. **Save**: Customer is automatically added to the system

### **Order Creation**
1. **Select Customer**: Choose from existing customer database
2. **Product Details**: Specify frame and lens requirements
3. **Prescription**: Auto-load or modify prescription data
4. **Pricing**: Set total amount and advance payment
5. **Schedule**: Set expected delivery date

### **Inventory Management**
1. **Add Item**: Create new inventory items with detailed specifications
2. **Stock Tracking**: Monitor current stock levels
3. **Reorder Alerts**: Get notified when items need restocking
4. **Supplier Info**: Track supplier details and restock dates

## 🔧 Configuration

### **Customization**
- **Colors**: Modify CSS variables in `src/index.css`
- **Components**: Customize UI components in `src/components/ui/`
- **Data**: Update sample data in `src/lib/sampleData.ts`

### **Environment Variables**
Create a `.env` file for environment-specific configurations:
```env
VITE_APP_TITLE=Opti-Vision Manager
VITE_APP_VERSION=1.0.0
```

## 📊 Data Persistence

The application uses browser local storage to persist data:
- **Automatic Saving**: All changes are saved immediately
- **Data Recovery**: Data persists across browser sessions
- **Sample Data**: Pre-loaded with realistic optical store data
- **Export Ready**: Data can be exported for backup purposes

## 🎯 Business Benefits

### **For Optical Professionals**
- **Efficiency**: Streamlined customer and order management
- **Accuracy**: Prescription tracking and order status management
- **Insights**: Real-time business analytics and reporting
- **Professionalism**: Modern, professional interface for customers

### **For Business Owners**
- **Performance**: Track sales, revenue, and customer metrics
- **Inventory**: Optimize stock levels and supplier relationships
- **Growth**: Identify top products and customer segments
- **Compliance**: Maintain detailed customer and order records

## 🚧 Development

### **Project Structure**
```
src/
├── components/          # Reusable UI components
│   ├── dashboard/      # Dashboard-specific components
│   ├── forms/          # Form components for data entry
│   ├── layout/         # Layout and navigation components
│   └── ui/            # Base UI components (shadcn/ui)
├── hooks/              # Custom React hooks
├── lib/                # Utilities and store management
├── pages/              # Main application pages
└── types/              # TypeScript type definitions
```

### **Adding New Features**
1. **Create Components**: Add new UI components in appropriate directories
2. **Update Store**: Extend the Zustand store for new data types
3. **Add Routes**: Include new pages in the routing configuration
4. **Update Types**: Extend TypeScript interfaces as needed

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/new-feature`
3. **Make changes**: Implement your improvements
4. **Test thoroughly**: Ensure all functionality works correctly
5. **Submit pull request**: Describe your changes and improvements

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- **Documentation**: Check this README and code comments
- **Issues**: Report bugs and feature requests via GitHub issues
- **Community**: Join discussions in the project repository

## 🔮 Roadmap

### **Future Enhancements**
- **Multi-location Support**: Manage multiple store locations
- **Advanced Analytics**: Enhanced reporting and business intelligence
- **Integration APIs**: Connect with external systems and services
- **Mobile App**: Native mobile applications for iOS and Android
- **Cloud Sync**: Multi-device synchronization and backup
- **Advanced Prescription**: Digital prescription management and verification

---

**Built with ❤️ for the optical industry**

*Opti-Vision Manager - Professional Optical Store Management*
