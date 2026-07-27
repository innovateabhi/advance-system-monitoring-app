import psutil


def get_system_stats():
    cpu = psutil.cpu_percent(interval=1)

    memory = psutil.virtual_memory().percent

    disk = psutil.disk_usage("/").percent

    network = psutil.net_io_counters()

    return {
        "cpu": cpu,
        "memory": memory,
        "disk": disk,
        "bytes_sent": round(network.bytes_sent / (1024 * 1024), 2),
        "bytes_recv": round(network.bytes_recv / (1024 * 1024), 2)
    }
