#!/bin/bash

echo "Starting Perpustakaan Ban Timoh Application..."
echo ""
echo "1. Installing dependencies..."
npm install
echo ""
echo "2. Starting development server..."
npm run dev
echo ""
echo "Application will be available at:"
echo "- Frontend: http://localhost:3000"
echo "- Backend: http://localhost:5000"
echo "- Admin Panel: http://localhost:3000?admin=true"
echo ""
