# Auction Platform

This is a full-stack auction platform built using the MERN stack (MongoDB, Express.js, React, and Node.js). The platform allows users to create, bid on, and manage auctions in real-time.

## 🚀 Deployment

This application is configured for deployment on **Vercel**. See the deployment guides for detailed instructions:

- **[Vercel Deployment Guide](VERCEL_DEPLOYMENT.md)** - Complete step-by-step deployment instructions
- **[Environment Variables](.env.example)** - Required configuration variables

## Features

- **User Authentication**: Secure user registration and login with JWT-based authentication
- **Auction Management**: Users can create auctions, set starting prices, and define bidding timelines
- **Real-Time Bidding**: Live updates to ensure seamless bidding experience
- **Dashboard**: Personalized user dashboards to track active and past auctions
- **Commission System**: Auctioneers can submit commission proofs for Super Admin approval
- **Email Notifications**: Automated email notifications for various platform activities
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Admin Panel**: Super Admin dashboard for managing users, auctions, and commissions

## Tech Stack

- **Frontend**: React with Redux Toolkit for state management
- **Backend**: Node.js with Express.js (deployed as Vercel serverless functions)
- **Database**: MongoDB Atlas
- **File Storage**: Cloudinary for image uploads
- **Email Service**: Gmail SMTP with Nodemailer
- **Deployment**: Vercel (both frontend and backend)

## Local Development Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Auction-app
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp ../.env.example .env
   # Edit .env with your local configuration
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Environment Variables**
   Copy `.env.example` to `.env` and configure:
   - Database connection (MongoDB)
   - JWT secrets
   - Email service credentials
   - Cloudinary configuration

## 📧 Default Test Credentials

- **Super Admin**: admin@auction.com / admin123
- **Test Bidder**: harshvardhan96yahoo@gmail.com / 1234@@$$
- **Test Auctioneer**: test@example.com / password123

## 📚 Documentation

- [Vercel Deployment Guide](VERCEL_DEPLOYMENT.md)
- [Environment Configuration](.env.example)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.
CLOUDINARY_API_SECRET = 
JWT_SECRET_KEY =
JWT_EXPIRE=
COOKIE_EXPIRE=
SMTP_HOST=
SMTP_PORT=
SMTP_SERVICE=
SMTP_MAIL=
SMTP_PASSWORD=
FRONTEND_URL =
MONGO_URI =
Use node.js latest v along with mongodb to use locally

