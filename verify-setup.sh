#!/bin/bash

# Financial Management System - Setup Verification Script

echo "🔍 Verifying Financial Management System Setup..."
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

success=0
failures=0

check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✓${NC} $1"
        ((success++))
    else
        echo -e "${RED}✗${NC} $1 - MISSING"
        ((failures++))
    fi
}

check_dir() {
    if [ -d "$1" ]; then
        echo -e "${GREEN}✓${NC} $1/"
        ((success++))
    else
        echo -e "${RED}✗${NC} $1/ - MISSING"
        ((failures++))
    fi
}

echo "📁 Checking Directory Structure..."
check_dir "src/frontend"
check_dir "src/backend"
check_dir "src/backend/routes"
check_dir "src/backend/db"
check_dir "src/shared"
check_dir "supabase"
check_dir "supabase/migrations"
echo ""

echo "📄 Checking Configuration Files..."
check_file "package.json"
check_file "tsconfig.json"
check_file "tsconfig.node.json"
check_file "vite.config.ts"
check_file "tailwind.config.js"
check_file "postcss.config.js"
check_file ".env.example"
check_file ".gitignore"
check_file "index.html"
echo ""

echo "🗄️ Checking Database Files..."
check_file "supabase/schema.sql"
check_file "supabase/seed.sql"
check_file "supabase/migrations/001_initial_schema.sql"
echo ""

echo "🔧 Checking Backend Files..."
check_file "src/backend/index.ts"
check_file "src/backend/db/client.ts"
check_file "src/backend/routes/companies.ts"
check_file "src/backend/routes/business-units.ts"
check_file "src/backend/routes/departments.ts"
check_file "src/backend/routes/revenue.ts"
check_file "src/backend/routes/expenses.ts"
check_file "src/backend/routes/employees.ts"
check_file "src/backend/routes/salary.ts"
check_file "src/backend/routes/auth.ts"
check_file "src/backend/routes/reports.ts"
echo ""

echo "📝 Checking Shared Files..."
check_file "src/shared/types.ts"
echo ""

echo "📚 Checking Documentation..."
check_file "README.md"
check_file "DATABASE.md"
check_file "ARCHITECTURE.md"
check_file "SETUP_GUIDE.md"
check_file "PROJECT_SUMMARY.md"
echo ""

echo "═══════════════════════════════════════════════════════"
echo -e "${GREEN}✓ Success: $success${NC}"
if [ $failures -gt 0 ]; then
    echo -e "${RED}✗ Failures: $failures${NC}"
else
    echo -e "${GREEN}✓ All checks passed!${NC}"
fi
echo "═══════════════════════════════════════════════════════"
echo ""

if [ $failures -eq 0 ]; then
    echo "🎉 Setup verification complete! Your project is ready."
    echo ""
    echo "Next steps:"
    echo "1. Set up Supabase (see SETUP_GUIDE.md)"
    echo "2. Copy .env.example to .env and add your credentials"
    echo "3. Run: npm install"
    echo "4. Run: npm run dev"
    echo ""
else
    echo "⚠️  Some files are missing. Please check the output above."
    exit 1
fi
