#!/bin/bash

# BU Management System - Start Backend Server
# This script starts the Deno backend server on port 8000

echo "🚀 Starting BU Management Backend Server..."
echo "==========================================="
echo ""

# Check if Deno is installed
if ! command -v deno &> /dev/null; then
    echo "❌ Deno is not installed!"
    echo ""
    echo "Installing Deno..."
    curl -fsSL https://deno.land/install.sh | sh
    
    # Add to PATH
    export PATH="$HOME/.deno/bin:$PATH"
    echo 'export PATH="$HOME/.deno/bin:$PATH"' >> ~/.bashrc
    
    echo "✅ Deno installed successfully!"
    echo ""
fi

echo "📦 Deno version: $(deno -v | head -n 1)"
echo ""

# Navigate to server directory
cd supabase/functions/server

echo "🌐 Starting server on http://localhost:8000"
echo "📊 API Base: http://localhost:8000/make-server-80868a71"
echo ""
echo "📝 Available endpoints:"
echo "   GET  /make-server-80868a71/health"
echo "   POST /make-server-80868a71/init-demo-data"
echo "   GET  /make-server-80868a71/business-units"
echo "   ... and 40+ more endpoints"
echo ""
echo "Press Ctrl+C to stop the server"
echo "==========================================="
echo ""

# Start the server
deno run --allow-net --allow-env --allow-read index.tsx
