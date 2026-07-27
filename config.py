import os


class Config:

    SECRET_KEY = os.environ.get("SECRET_KEY") or "system-monitor-secret-key"

    APP_NAME = "Linux System Monitoring Dashboard"

    VERSION = "1.0.0"

    DEBUG = True
