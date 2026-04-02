#!/bin/bash

# Auction Platform Deployment Script
# This script helps with production deployment setup

echo "🚀 Auction Platform Deployment Setup"
echo "===================================="

# Check if required tools are installed
echo "📋 Checking prerequisites..."

if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install dependencies
echo "📦 Installing dependencies..."

echo "Installing backend dependencies..."
cd backend
npm install

echo "Installing frontend dependencies..."
cd ../frontend
npm install

cd ..

echo "✅ Dependencies installed"

# Build frontend
echo "🔨 Building frontend..."
cd frontend
npm run build

cd ..

echo "✅ Frontend built successfully"

# Check environment files
echo "🔍 Checking environment configuration..."

if [ ! -f "backend/.env" ]; then
    echo "⚠️  Backend .env file not found. Please create it with production values."
    echo "   Copy from backend/.env.example if available"
fi

if [ ! -f "frontend/.env" ]; then
    echo "⚠️  Frontend .env file not found. Please create it with production values."
    echo "   Copy from frontend/.env.example if available"
fi

echo ""
echo "🎯 Deployment Ready!"
echo ""
echo "Next steps:"
echo "1. Set up your production database (MongoDB Atlas recommended)"
echo "2. Configure environment variables for production"
echo "3. Deploy backend to Vercel/Railway/Render"
echo "4. Deploy frontend to Netlify/Vercel"
echo "5. Update API URLs in frontend configuration"
echo ""
echo "See DEPLOYMENT.md for detailed instructions"