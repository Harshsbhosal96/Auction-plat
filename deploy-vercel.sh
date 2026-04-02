#!/bin/bash

# 🚀 Auction Platform - Vercel Deployment Script
# Run this to deploy your app to Vercel

echo "🎯 Auction Platform Vercel Deployment"
echo "====================================="
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
    echo "✅ Vercel CLI installed"
fi

echo ""
echo "🔗 Login to Vercel..."
vercel login

echo ""
echo "📦 Deploying to Vercel..."
echo "This will:"
echo "  - Link your project"
echo "  - Set up environment variables"
echo "  - Deploy your app"
echo ""

# Deploy
vercel --prod

echo ""
echo "🎉 Deployment complete!"
echo "Check your Vercel dashboard for the live URL"