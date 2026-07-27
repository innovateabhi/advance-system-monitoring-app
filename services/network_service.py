import socket
import psutil


def bytes_to_mb(value):
    return round(value / (1024 * 1024), 2)


def bytes_to_gb(value):
    return round(value / (1024 * 1024 * 1024), 2)


def get_network_info():

    hostname = socket.gethostname()

    ip_address = socket.gethostbyname(hostname)

    counters = psutil.net_io_counters()

    interfaces = list(psutil.net_if_addrs().keys())

    mac = "Unknown"

    for interface, addresses in psutil.net_if_addrs().items():

        for address in addresses:

            if str(address.family) == "AddressFamily.AF_PACKET":

                mac = address.address

                break

        if mac != "Unknown":

            break

    return {

        "hostname": hostname,

        "ip": ip_address,

        "mac": mac,

        "bytes_sent": bytes_to_gb(counters.bytes_sent),

        "bytes_received": bytes_to_gb(counters.bytes_recv),

        "packets_sent": counters.packets_sent,

        "packets_received": counters.packets_recv,

        "interfaces": interfaces

    }
