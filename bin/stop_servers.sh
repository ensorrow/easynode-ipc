#!/bin/sh

#arg1 -> Server name

stopService() {
        echo "shutting down icp  Server [$1]..."
        PID=`ps -ef|grep node |grep "$1" |grep -v grep |grep -v "/babel-node" |awk '{print $2}'`
        if [ -n "$PID" ]; then
                echo "kill server [$1] process -> $PID"
                kill -9 $PID
        fi
}

echo 'shutting down icp  servers...'
#################icp Backend Servers START##############
sleep 1
stopService icp
#################icp Backend Servers END#########################
echo 'icp  servers shutdown!'
