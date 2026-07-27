async function loadSystemInfo() {

    const response = await fetch("/api/system-info");
    const data = await response.json();

    document.getElementById("hostname").innerText = data.hostname;
    document.getElementById("os").innerText = data.os;
    document.getElementById("kernel").innerText = data.kernel;
    document.getElementById("arch").innerText = data.architecture;
    document.getElementById("python").innerText = data.python;
    document.getElementById("cores").innerText =
        `${data.physical_cores} Physical / ${data.logical_cores} Logical`;
    document.getElementById("ram").innerText = data.ram;
    document.getElementById("boot").innerText = data.boot_time;
    document.getElementById("uptime").innerText = data.uptime;
}


async function loadStats() {

    const response = await fetch("/api/system-stats");
    const data = await response.json();

    document.getElementById("cpu").innerText = data.cpu + "%";
    document.getElementById("memory").innerText = data.memory + "%";
    document.getElementById("disk").innerText = data.disk + "%";

    document.getElementById("network").innerHTML =
        `
        ↑ ${data.bytes_sent} MB<br>
        ↓ ${data.bytes_recv} MB
        `;
}


loadSystemInfo();
loadStats();

setInterval(loadStats, 2000);
