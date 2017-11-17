
export NODE_ENV="develop"

cd ./client
npm install
npm run build
cd ..

cd ./server
npm install
npm run build
cd ..

export NODE_ENV="production"
