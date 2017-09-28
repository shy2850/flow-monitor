rm -rf ./dist
npm run build
cp .f2econfig.serve.js ./dist/.f2econfig.js
cp -rf ./serve ./dist
cd ./dist/
mkdir node_modules
cp -rf ../node_modules/*-stat ./node_modules/
cp -rf ../node_modules/f2e-* ./node_modules/
cd ..