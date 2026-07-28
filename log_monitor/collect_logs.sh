#!/bin/bash

mkdir -p logs

DATE=$(date +"%F_%H-%M-%S")

sudo cp /var/log/nginx/access.log logs/access_$DATE.log
sudo cp /var/log/nginx/error.log logs/error_$DATE.log

docker logs system-monitor > logs/docker_$DATE.log 2>&1

sudo journalctl -u sshd > logs/ssh_$DATE.log
