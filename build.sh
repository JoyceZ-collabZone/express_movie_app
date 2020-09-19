echo "*** STARTING BUIlD Process"

# currently in root directory
echo "buiding frontend"
cd frontend
npm install #install dependencies
npm run build #build react app into /build

echo "*** copy react build to Express public"

cd ../ #return to app root
mkdir -p ./backend/public
cp -r ./frontend/build/* ./backend/public/

echo "*** building backend"
cd backend 
npm install # install backend dependencies

cd ../ #return script to root level

echo "=== build script complete"
