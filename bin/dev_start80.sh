#MYSQL_CONFIG_URL='http://218.205.113.98:6006/configicp.json' REDIS_CONFIG_URL='' MONGODB_CONFIG_URL='' MQ_CONFIG_URL='' pm2 start  start_servers.sh  --watch src  --ignore-watch "../logs ../plugins ../etc ../bin ../config ../node_modules ../docs "

CONFIG_URL='/Users/hujiabao/workspace_docker/icp/easynode-ipc/config.json'  ENV=DEVELOP PORT=80  sh  start_dev_servers.sh
