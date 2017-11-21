
#export NODE_ENV="production"
#
#cd ./client
### mac:
##sed -i '' "s/10.86.18.215:8080/10.86.18.215:8080/g" src/config.ts
### linux:
##sed -i    "s/10.86.18.215:8080/10.86.18.215:8080/g" src/config.ts
#npm install
#npm run build
#cd ..
#
#
#cd ./server
### mac:
##sed -i '' "s/10.86.18.215:8080/10.86.18.215:8080/g" src/appconfig.ts
### linux:
##sed -i    "s/10.86.18.215:8080/10.86.18.215:8080/g" src/appconfig.ts
#npm install
#npm run build
#cd ..

#build local  image use exist src
docker build -f deploy/Dockerfile.local  -t hitchhiker-youwi:lasted .