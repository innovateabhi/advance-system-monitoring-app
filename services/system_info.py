import os
import platform
import socket
import psutil
import datetime


def get_system_info():

    boot_time = datetime.datetime.fromtimestamp(psutil.boot_time())

    uptime = datetime.datetime.now() - boot_time

    ram = round(psutil.virtual_memory().total / (1024 ** 3), 2)

    return {

        "hostname": socket.gethostname(),

        "os": f"{platform.system()} {platform.release()}",

        "platform": platform.platform(),

        "kernel": platform.release(),

        "architecture": platform.machine(),

        "processor": platform.processor(),

        "python": platform.python_version(),

        "physical_cores": psutil.cpu_count(logical=False),

        "logical_cores": psutil.cpu_count(logical=True),

        "ram": f"{ram} GB",

        "boot_time": boot_time.strftime("%d-%m-%Y %H:%M:%S"),

        "uptime": str(uptime).split(".")[0]

    }
