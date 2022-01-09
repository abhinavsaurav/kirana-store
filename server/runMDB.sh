mongod --fork --syslog --dbpath=/root/mongodb-data --bind_ip 0.0.0.0 
ifconfig | grep 'inet 172'|tr -s ' '
