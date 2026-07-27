import psutil


def bytes_to_gb(value):
    return round(value / (1024 ** 3), 2)


def bytes_to_mb(value):
    return round(value / (1024 ** 2), 2)


def get_disk_info():

    usage = psutil.disk_usage("/")

    partitions = []

    for partition in psutil.disk_partitions():

        try:

            stats = psutil.disk_usage(partition.mountpoint)

            partitions.append({

                "device": partition.device,

                "mountpoint": partition.mountpoint,

                "fstype": partition.fstype,

                "total": bytes_to_gb(stats.total),

                "used": bytes_to_gb(stats.used),

                "free": bytes_to_gb(stats.free),

                "percent": stats.percent

            })

        except PermissionError:
            continue

    io = psutil.disk_io_counters()

    return {

        "usage": usage.percent,

        "total": bytes_to_gb(usage.total),

        "used": bytes_to_gb(usage.used),

        "free": bytes_to_gb(usage.free),

        "read_count": io.read_count,

        "write_count": io.write_count,

        "read_mb": bytes_to_mb(io.read_bytes),

        "write_mb": bytes_to_mb(io.write_bytes),

        "partitions": partitions

    }
