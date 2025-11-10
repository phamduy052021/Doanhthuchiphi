#!/bin/bash

# BU Management System - Replit Setup Script
# Run this after uploading files to Replit

echo "🚀 BU Management System - Setup Script"
echo "======================================"
echo ""

# Check Node.js
echo "📦 Checking Node.js..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js >= 18.0.0"
    exit 1
fi
echo "✅ Node.js found: $(node -v)"

# Check npm
echo "📦 Checking npm..."
if ! command -v npm &> /dev/null; then
    echo "❌ npm not found."
    exit 1
fi
echo "✅ npm found: $(npm -v)"

# Install Deno if not exists
echo ""
echo "📦 Checking Deno..."
if ! command -v deno &> /dev/null; then
    echo "⚠️  Deno not found. Installing..."
    curl -fsSL https://deno.land/install.sh | sh
    export PATH="$HOME/.deno/bin:$PATH"
    echo "✅ Deno installed: $(deno -v | head -n 1)"
else
    echo "✅ Deno found: $(deno -v | head -n 1)"
fi

# Install dependencies
echo ""
echo "📦 Installing npm dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Check for Supabase config
echo ""
echo "🔍 Checking Supabase configuration..."
if [ -z "$SUPABASE_URL" ]; then
    echo "⚠️  SUPABASE_URL not set in Secrets"
    echo "   Please add the following to Replit Secrets:"
    echo "   - SUPABASE_URL"
    echo "   - SUPABASE_ANON_KEY"
    echo "   - SUPABASE_SERVICE_ROLE_KEY"
    echo "   - SUPABASE_DB_URL"
else
    echo "✅ Supabase secrets configured"
fi

# Create directories if needed
echo ""
echo "📁 Checking directory structure..."
mkdir -p supabase/functions/server
mkdir -p components/ui
mkdir -p services
mkdir -p utils/supabase
mkdir -p styles
echo "✅ Directory structure verified"

echo ""
echo "======================================"
echo "✅ Setup Complete!"
echo "======================================"
echo ""
echo "📋 Next Steps:"
echo "1. Verify Supabase Secrets are configured"
echo "2. Update /utils/supabase/info.tsx with your project ID"
echo "3. Run frontend: npm run dev"
echo "4. Run backend: npm run server"
echo "5. Initialize database via UI or API"
echo ""
echo "📚 Documentation:"
echo "- Quick Start: QUICK_START.md"
echo "- Full Setup: REPLIT_SETUP.md"
echo "- Database: DATABASE_DOCUMENTATION.md"
echo ""
echo "🚀 Happy coding!"
