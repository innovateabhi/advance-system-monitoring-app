import subprocess


def get_services():

    command = [
        "systemctl",
        "list-units",
        "--type=service",
        "--all",
        "--no-pager",
        "--no-legend"
    ]

    result = subprocess.run(
        command,
        capture_output=True,
        text=True
    )

    services = []

    running = 0
    stopped = 0
    failed = 0

    for line in result.stdout.splitlines():

        parts = line.split(None, 4)

        if len(parts) < 5:
            continue

        unit = parts[0]

        load = parts[1]

        active = parts[2]

        sub = parts[3]

        description = parts[4]

        if active == "active":
            running += 1

        elif active == "failed":
            failed += 1

        else:
            stopped += 1

        enabled = "Unknown"

        try:

            enabled = subprocess.check_output(

                ["systemctl", "is-enabled", unit],

                text=True

            ).strip()

        except subprocess.CalledProcessError:

            enabled = "Disabled"

        services.append({

            "service": unit,

            "status": active,

            "substatus": sub,

            "enabled": enabled,

            "description": description

        })

    services.sort(key=lambda x: x["service"])

    return {

        "running": running,

        "stopped": stopped,

        "failed": failed,

        "services": services

    }
