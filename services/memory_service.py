import psutil


def bytes_to_gb(value):
    return round(value / (1024 ** 3), 2)


def get_memory_info():

    memory = psutil.virtual_memory()

    swap = psutil.swap_memory()

    return {

        "usage": memory.percent,

        "total": bytes_to_gb(memory.total),

        "used": bytes_to_gb(memory.used),

        "available": bytes_to_gb(memory.available),

        "free": bytes_to_gb(memory.free),

        "cached": bytes_to_gb(getattr(memory, "cached", 0)),

        "buffers": bytes_to_gb(getattr(memory, "buffers", 0)),

        "swap_total": bytes_to_gb(swap.total),

        "swap_used": bytes_to_gb(swap.used),

        "swap_free": bytes_to_gb(swap.free),

        "swap_percent": swap.percent

    }
