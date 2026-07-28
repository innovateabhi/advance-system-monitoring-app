# Linux System Monitoring Dashboard (Flask + Docker) 

## Project Overview

This project is a Linux System Monitoring Dashboard built using:

* Python
* Flask
* HTML
* CSS
* JavaScript
* Docker
* Docker Compose

The application monitors:

* Dashboard
* CPU Usage
* Memory Usage
* Disk Usage
* Network Statistics
* Running Processes
* Services
* System Logs

---

# Phase 1 - Create Project

## Create Project Directory

```bash
mkdir system-monitoring-app
cd system-monitoring-app
```

---

## Create Virtual Environment

```bash
python3 -m venv venv
```

Activate:

```bash
source venv/bin/activate
```

---

## Install Required Packages

```bash
pip install flask psutil
```

---

## Create Requirements File

```bash
pip freeze > requirements.txt
```

Later, keep it clean:

```text
Flask==3.1.3
psutil==7.2.2
```

---

# Project Structure

```text
system-monitoring-app/
│
├── app.py
├── config.py
├── requirements.txt
├── Dockerfile
├── docker-compose.yml
├── .dockerignore
│
├── static/
│   ├── css/
│   ├── js/
│   └── images/
│
├── templates/
│
├── routes/
│
├── services/
│
└── logs/
```

---

# Run Flask Application

```bash
python app.py
```

Open

```
http://localhost:5000
```

---

# Docker Installation (Fedora)

```bash
sudo dnf install docker docker-compose-plugin runc -y
```

Enable Docker

```bash
sudo systemctl enable --now docker
```

Check Status

```bash
sudo systemctl status docker
```

---

# Docker Permissions

Add current user

```bash
sudo usermod -aG docker $USER
```

Refresh

```bash
newgrp docker
```

Verify

```bash
docker ps
```

---

# Dockerfile

Create

```bash
touch Dockerfile
```

---

# Docker Ignore

Create

```bash
touch .dockerignore
```

---

# Docker Compose

Create

```bash
touch docker-compose.yml
```

---

# Build Docker Image

```bash
docker build -t system-monitor .
```

---

# Run Container

```bash
docker run -d \
--name system-monitor \
-p 5000:5000 \
system-monitor
```

---

# Verify Running Containers

```bash
docker ps
```

---

# View Logs

```bash
docker logs system-monitor
```

Live Logs

```bash
docker logs -f system-monitor
```

---

# Stop Container

```bash
docker stop system-monitor
```

---

# Start Container

```bash
docker start system-monitor
```

---

# Restart Container

```bash
docker restart system-monitor
```

---

# Remove Container

```bash
docker rm system-monitor
```

---

# Remove Image

```bash
docker rmi system-monitor
```

---

# Docker Compose Commands

Build

```bash
docker compose build
```

Run

```bash
docker compose up
```

Run in Background

```bash
docker compose up -d
```

Rebuild

```bash
docker compose up --build
```

Stop

```bash
docker compose down
```

Restart

```bash
docker compose restart
```

Logs

```bash
docker compose logs
```

Live Logs

```bash
docker compose logs -f
```

---

# Execute Shell Inside Container

```bash
docker exec -it system-monitor sh
```

Exit

```bash
exit
```

---

# Inspect Container

```bash
docker inspect system-monitor
```

---

# Check Port Mapping

```bash
docker port system-monitor
```

---

# Test Flask Inside Container

```bash
curl http://localhost:5000
```

---

# Remove All Stopped Containers

```bash
docker container prune
```

---

# Remove Unused Images

```bash
docker image prune
```

---

# Remove Everything Unused

```bash
docker system prune -a
```

---

# Common Debugging Commands

Docker Status

```bash
sudo systemctl status docker
```

Docker Version

```bash
docker --version
```

Compose Version

```bash
docker compose version
```

Docker Info

```bash
docker info
```

Container List

```bash
docker ps -a
```

Image List

```bash
docker images
```

Volumes

```bash
docker volume ls
```

Networks

```bash
docker network ls
```

---

# Useful Linux Commands

Current Directory

```bash
pwd
```

List Files

```bash
ls -la
```

Create Folder

```bash
mkdir folder_name
```

Create File

```bash
touch filename
```

Copy

```bash
cp source destination
```

Move

```bash
mv source destination
```

Delete File

```bash
rm filename
```

Delete Folder

```bash
rm -rf foldername
```

File Permissions

```bash
chmod +x filename
```

Owner

```bash
chown user:user filename
```

---

# Git Commands

Initialize

```bash
git init
```

Status

```bash
git status
```

Add Files

```bash
git add .
```

Commit

```bash
git commit -m "Initial Commit"
```

Branch

```bash
git branch
```

Push

```bash
git push origin main
```

Clone

```bash
git clone <repository_url>
```

Pull

```bash
git pull
```

---

# Useful Flask Command

Run

```bash
python app.py
```

---

# Browser URLs

Local Flask

```
http://localhost:5000
```

Docker

```
http://localhost:5000
```

AWS EC2

```
http://<EC2_PUBLIC_IP>:5000
```

---

# Issues Faced During Development

### 1. Docker Permission Denied

Solution

```bash
sudo usermod -aG docker $USER
newgrp docker
```

---

### 2. Missing runc

Solution

```bash
sudo dnf install runc
```

---

### 3. Invalid requirements.txt

Cause

Using `pip freeze` captured Fedora system packages.

Solution

Create a clean `requirements.txt`:

```text
Flask==3.1.3
psutil==7.2.2
```

---

### 4. Flask Accessible Only Inside Container

Cause

Application was bound to `127.0.0.1`.

Solution

```python
app.run(host="0.0.0.0", port=5000, debug=False)
```

---

### 5. Docker Container Restart Loop

Cause

Application crash or permission issue.

Debug

```bash
docker logs system-monitor
```

---

### 6. SELinux Bind Mount Issue (Fedora/RHEL)

If using bind mounts in Docker Compose, use:

```yaml
volumes:
  - .:/app:Z
```

The `:Z` option relabels the mounted directory so the container can access it under SELinux.

---

# Final Project Workflow

```text
Develop Flask Application
        │
        ▼
   Test Locally
        │
        ▼
  Create Dockerfile
        │
        ▼
Create docker-compose.yml
        │
        ▼
 Build Docker Image
        │
        ▼
Run Docker Container
        │
        ▼
   Verify Logs
        │
        ▼
Access Application
        │
        ▼
  Push to GitHub
```

