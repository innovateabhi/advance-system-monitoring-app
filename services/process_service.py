import datetime
import psutil


def get_processes():

    processes = []

    status_count = {
        "running": 0,
        "sleeping": 0,
        "stopped": 0,
        "zombie": 0
    }

    for process in psutil.process_iter(

        ['pid',
         'name',
         'username',
         'cpu_percent',
         'memory_percent',
         'status',
         'create_time']

    ):

        try:

            info = process.info

            status = info["status"]

            if status in status_count:
                status_count[status] += 1

            processes.append({

                "pid": info["pid"],

                "name": info["name"],

                "user": info["username"],

                "cpu": round(info["cpu_percent"],1),

                "memory": round(info["memory_percent"],1),

                "status": status,

                "started": datetime.datetime.fromtimestamp(
                    info["create_time"]
                ).strftime("%H:%M:%S")

            })

        except (

            psutil.NoSuchProcess,

            psutil.AccessDenied,

            psutil.ZombieProcess

        ):

            pass

    processes.sort(

        key=lambda x:x["cpu"],

        reverse=True

    )

    return {

        "total":len(processes),

        "running":status_count["running"],

        "sleeping":status_count["sleeping"],

        "stopped":status_count["stopped"],

        "zombie":status_count["zombie"],

        "processes":processes

    }
