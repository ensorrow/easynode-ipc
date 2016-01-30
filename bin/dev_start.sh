#MYSQL_CONFIG_URL='http://218.205.113.98:6006/configicp.json' REDIS_CONFIG_URL='' MONGODB_CONFIG_URL='' MQ_CONFIG_URL='' pm2 start  start_servers.sh  --watch src  --ignore-watch "../logs ../plugins ../etc ../bin ../config ../node_modules ../docs "

CONFIG_URL='http://218.205.113.98:6006/configicpfc_dev.json'  sh  start_dev_servers.sh