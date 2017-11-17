#  this is a deploy script
#
#


## mac:
#sed -i '' "s/10.86.18.215:8080/10.86.18.215:8080/g" build/appconfig.json
## linux:
#sed -i    "s/10.86.18.215:8080/10.86.18.215:8080/g" build/appconfig.json

## use env to change database on target host
#        HITCHHIKER_DB_HOST || Setting.instance.db.host,
#        HITCHHIKER_DB_PORT || Setting.instance.db.port,
#        HITCHHIKER_DB_USERNAME || Setting.instance.db.username,
#        MYSQL_DATABASE || Setting.instance.db.database,
#        MYSQL_ROOT_PASSWORD || Setting.instance.db.password,

# copy html/js
scp  -r client/build 10.0.12.11:/nginx/html/
# copy source
scp  -r server/build 10.0.12.11:/hitchhiker/
# run & start
ssh  10.0.12.11 node /hitchhiker/index &
# run with pm2
#ssh  10.0.12.11 pm2 /data/index &

