#  this is a temp deploy script
#
#


## mac:
#sed -i '' "s/10.86.18.215:8080/10.86.18.215:8080/g" build/appconfig.json
## linux:
#sed -i    "s/10.86.18.215:8080/10.86.18.215:8080/g" build/appconfig.json


scp  -r client/build 10.0.12.11:/nginx

scp  -r server/build 10.0.12.11:/data

ssh  10.0.12.11 node /data/index &


#ssh  10.0.12.11 pm2 /data/index &
