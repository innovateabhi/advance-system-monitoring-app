#!/bin/bash

LOG_DIR="$HOME/system-monitoring-app/log_monitor"

mkdir -p "$LOG_DIR"

echo "=============================="
echo "Linux System Monitor"
echo "Started : $(date)"
echo "=============================="

while true
do
    clear

    echo "============================================"
    echo " Linux Security Monitoring Dashboard"
    echo " Time : $(date)"
    echo "============================================"

    echo
    echo "----------- NGINX ERROR LOG -----------"
    sudo tail -10 /var/log/nginx/error.log

    echo
    echo "----------- NGINX ACCESS LOG ----------"
    sudo tail -10 /var/log/nginx/access.log

    echo
    echo "----------- DOCKER CONTAINER LOGS -----"
    docker logs --tail 10 system-monitor 2>/dev/null

    echo
    echo "----------- FAILED SSH LOGINS ---------"
    sudo journalctl -u sshd -n 10 --no-pager | grep "Failed"

    echo
    echo "----------- AUTHENTICATION EVENTS -----"
    sudo journalctl -u sshd -n 10 --no-pager

    sleep 5
done
