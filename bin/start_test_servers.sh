#!/bin/sh

#arg1 -> Service Name
#arg2 -> Service HTTP port

startService() {
        echo "starting  service [$1],  HTTP port: [$2]"

        nohup node main.min.js --debug-output=true --http.server.port=$2 --src-dirs=lib --main-class=netease.icp.backend.Main --config-files=config/service.conf  --easynode.app.id=$1 &
}

echo 'starting icp servers...'

#################icp backend Servers START##############
sleep 1
startService 'icp' $PORT
#################icp backend Servers END#########################
echo 'icp backend servers started!'
