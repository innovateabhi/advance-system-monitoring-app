from flask import Blueprint, jsonify

from services.system_info import get_system_info
from services.system_stats import get_system_stats

api = Blueprint("api", __name__)


@api.route("/system-info")
def system_info():
    return jsonify(get_system_info())


@api.route("/system-stats")
def system_stats():
    return jsonify(get_system_stats())



from services.cpu_service import get_cpu_info
@api.route("/cpu")
def cpu():

    return jsonify(get_cpu_info())

from services.memory_service import get_memory_info
@api.route("/memory")
def memory():

    return jsonify(get_memory_info())

from services.disk_service import get_disk_info
@api.route("/disk")
def disk():

    return jsonify(get_disk_info())

from services.network_service import get_network_info
@api.route("/network")
def network():

    return jsonify(get_network_info())

from services.process_service import get_processes
@api.route("/processes")
def processes():

    return jsonify(get_processes())


from services.linux_services import get_services

@api.route("/services")
def services():

    return jsonify(get_services())

from services.logs_service import get_logs
@api.route("/logs")
def logs():

    return jsonify(get_logs())
