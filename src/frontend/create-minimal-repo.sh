#!/bin/bash

# Script tạo Minimal Repository cho Replit
# Chỉ copy essential files, bỏ qua documentation lớn

echo "🪶 Creating Minimal Repository for Replit..."
echo "=============================================="
echo ""

# Get current directory
CURRENT_DIR=$(pwd)
MINIMAL_DIR="${CURRENT_DIR}-minimal"

echo "📁 Current directory: $CURRENT_DIR"
echo "📁 Minimal directory: $MINIMAL_DIR"
echo ""

# Check if minimal dir already exists
if [ -d "$MINIMAL_DIR" ]; then
    echo "⚠️  Minimal directory already exists!"
    read -p "Delete and recreate? (y/n): " confirm
    if [ "$confirm" = "y" ]; then
        rm -rf "$MINIMAL_DIR"
        echo "✅ Deleted existing directory"
    else
        echo "❌ Cancelled"
        exit 1
    fi
fi

# Create minimal directory
mkdir -p "$MINIMAL_DIR"
echo "✅ Created minimal directory"
echo ""

# Copy essential files and folders
echo "📦 Copying essential files..."
echo ""

# Root files
echo "  → Root configuration files..."
cp -v App.tsx "$MINIMAL_DIR/" 2>/dev/null || echo "    (App.tsx not found, skip)"
cp -v package.json "$MINIMAL_DIR/"
cp -v tsconfig.json "$MINIMAL_DIR/"
cp -v vite.config.ts "$MINIMAL_DIR/" 2>/dev/null || echo "    (vite.config.ts not found, skip)"
cp -v index.html "$MINIMAL_DIR/" 2>/dev/null || echo "    (index.html not found, skip)"
cp -v .replit "$MINIMAL_DIR/"
cp -v .gitignore "$MINIMAL_DIR/"
cp -v start-server.sh "$MINIMAL_DIR/" 2>/dev/null || echo "    (start-server.sh not found, skip)"

# Copy folders
echo ""
echo "  → Components..."
cp -r components "$MINIMAL_DIR/"

echo "  → Services..."
cp -r services "$MINIMAL_DIR/"

echo "  → Utils..."
cp -r utils "$MINIMAL_DIR/"

echo "  → Styles..."
cp -r styles "$MINIMAL_DIR/"

echo "  → Backend (supabase)..."
cp -r supabase "$MINIMAL_DIR/"

# Create minimal README
echo ""
echo "  → Creating minimal README.md..."
cat > "$MINIMAL_DIR/README.md" << 'EOF'
# 🏢 BU Management System - Minimal

Business Unit Management Dashboard (Optimized for Replit)

## 🚀 Quick Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Secrets

**Replit → Tools → Secrets**, add:

```
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
SUPABASE_DB_URL=postgresql://...
```

### 3. Update Config File

Edit `/utils/supabase/info.tsx`:
```typescript
export const projectId = "xxxxx"  // from SUPABASE_URL
export const publicAnonKey = "eyJhbGc..."  // SUPABASE_ANON_KEY
```

### 4. Run Application

**Terminal 1 - Frontend:**
```bash
npm run dev
```

**Terminal 2 - Backend:**
```bash
bash start-server.sh
```

Or manually:
```bash
cd supabase/functions/server
deno run --allow-net --allow-env --allow-read index.tsx
```

### 5. Initialize Database

1. Open browser: http://localhost:5173
2. Go to "Database" page
3. Click "Import dữ liệu demo"
4. Wait for success message
5. ✅ 69 records imported!

## ✨ Features

- 📊 **Dashboard** - KPI overview with charts
- 🏢 **Business Units** - CRUD operations
- 🎯 **Performance Tracking** - 5 tabs analysis
- 💰 **Financial Management** - Revenue & Costs
- 👥 **Employee Management** - HR operations
- 📈 **Analytics** - Reporting & insights
- 🔐 **RBAC** - Role-based access control

## 🛠️ Tech Stack

- **Frontend:** React 18 + TypeScript + Tailwind CSS
- **Backend:** Deno + Hono Framework
- **Database:** Supabase (PostgreSQL + KV Store)
- **UI:** Shadcn UI Components

## 📊 Database

- 10 Entity Types
- 40+ REST API Endpoints
- 69 Demo Records
- Full CRUD Operations

## 📚 Full Documentation

For complete documentation, visit the full repository:
- GitHub: [Full Repository with Docs]
- Database Schema
- API Documentation
- Setup Guides

## 🐛 Troubleshooting

### Frontend not loading
```bash
npm install
npm run dev
```

### Backend connection error
```bash
# Check backend is running
curl http://localhost:8000/make-server-80868a71/health

# If not, start it:
bash start-server.sh
```

### Demo data import fails
```bash
# Check Secrets are configured
# Check backend is running
# Try clearing data first, then import
```

## 📞 Support

- Issues: GitHub Issues
- Docs: See full repository

---

**Version:** 1.0 - Minimal  
**Optimized for:** Replit Import  
**Status:** Production Ready ✅
EOF

echo "✅ Created minimal README.md"
echo ""

# Count files
TOTAL_FILES=$(find "$MINIMAL_DIR" -type f | wc -l)
TOTAL_SIZE=$(du -sh "$MINIMAL_DIR" | cut -f1)

echo ""
echo "=============================================="
echo "✅ Minimal Repository Created!"
echo "=============================================="
echo ""
echo "📊 Statistics:"
echo "  Total files: $TOTAL_FILES"
echo "  Total size: $TOTAL_SIZE"
echo ""
echo "📁 Location: $MINIMAL_DIR"
echo ""
echo "🚀 Next Steps:"
echo ""
echo "1. Navigate to minimal directory:"
echo "   cd $MINIMAL_DIR"
echo ""
echo "2. Initialize Git:"
echo "   git init"
echo ""
echo "3. Add remote (replace YOUR-USERNAME):"
echo "   git remote add origin https://github.com/YOUR-USERNAME/bu-management-minimal.git"
echo ""
echo "4. Commit and push:"
echo "   git add ."
echo "   git commit -m \"Initial commit: Minimal version for Replit\""
echo "   git push -u origin main"
echo ""
echo "5. Import to Replit:"
echo "   → Replit.com → Import from GitHub"
echo "   → Paste URL: https://github.com/YOUR-USERNAME/bu-management-minimal"
echo "   → ✅ Import successful!"
echo ""
echo "=============================================="
echo "Happy Coding! 🎉"
echo "=============================================="
