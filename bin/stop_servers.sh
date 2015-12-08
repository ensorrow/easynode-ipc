#!/bin/sh

#arg1 -> Server name

stopService() {
        echo "shutting down {PROJECT}  Server [$1]..."
        PID=`ps -ef|grep node |grep "$1" |grep -v grep |grep -v "/babel-node" |awk '{print $2}'`
        if [ -n "$PID" ]; then
                echo "kill server [$1] process -> $PID"
                kill -9 $PID
        fi
}

echo 'shutting down {PROJECT}  servers...'
#################{PROJECT} Backend Servers START##############
sleep 1
stopService {PROJECT}
#################{PROJECT} Backend Servers END#########################
echo '{PROJECT}  servers shutdown!'