from flask import Flask, render_template
from config import Config
from routes.api import api

app = Flask(__name__)
app.config.from_object(Config)

app.register_blueprint(api, url_prefix="/api")


@app.route("/")
def dashboard():
    return render_template("dashboard.html")


@app.route("/cpu")
def cpu():
    return render_template("cpu.html")


@app.route("/memory")
def memory():
    return render_template("memory.html")


@app.route("/disk")
def disk():
    return render_template("disk.html")


@app.route("/network")
def network():
    return render_template("network.html")


@app.route("/processes")
def processes():
    return render_template("processes.html")


@app.route("/services")
def services():
    return render_template("services.html")


@app.route("/logs")
def logs():
    return render_template("logs.html")


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000,
        debug=False
    )
