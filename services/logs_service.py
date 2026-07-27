import subprocess


def get_logs(lines=100):

    try:

        result = subprocess.run(
            [
                "journalctl",
                "-n",
                str(lines),
                "--no-pager",
                "--output=short-iso"
            ],
            capture_output=True,
            text=True
        )

        logs = []

        for line in result.stdout.splitlines():

            level = "INFO"

            text = line.lower()

            if "error" in text or "failed" in text:
                level = "ERROR"

            elif "warning" in text or "warn" in text:
                level = "WARNING"

            logs.append({

                "level": level,

                "message": line

            })

        return logs

    except Exception as e:

        return [

            {

                "level": "ERROR",

                "message": str(e)

            }

        ]
