import os
import psutil


def get_cpu_info():

    freq = psutil.cpu_freq()

    load = os.getloadavg()

    return {

        "usage": psutil.cpu_percent(interval=0.5),

        "physical_cores": psutil.cpu_count(logical=False),

        "logical_cores": psutil.cpu_count(logical=True),

        "current_frequency": round(freq.current,2),

        "minimum_frequency": round(freq.min,2),

        "maximum_frequency": round(freq.max,2),

        "load_average":{

            "1min":round(load[0],2),

            "5min":round(load[1],2),

            "15min":round(load[2],2)

        },

        "per_core":psutil.cpu_percent(interval=None,percpu=True)

    }
