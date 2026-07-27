let previousSent = 0;
let previousReceived = 0;

const uploadHistory = [];
const downloadHistory = [];

async function updateNetwork() {

    const response = await fetch("/api/network");

    const data = await response.json();

    document.getElementById("hostname").innerHTML = data.hostname;

    document.getElementById("ip").innerHTML = data.ip;

    document.getElementById("mac").innerHTML = data.mac;

    document.getElementById("sent").innerHTML =
        data.bytes_sent + " GB";

    document.getElementById("received").innerHTML =
        data.bytes_received + " GB";

    document.getElementById("packetSent").innerHTML =
        data.packets_sent;

    document.getElementById("packetReceived").innerHTML =
        data.packets_received;

    document.getElementById("interfaces").innerHTML =
        data.interfaces.join("<br>");

    let upload =
        (data.bytes_sent * 1024 - previousSent);

    let download =
        (data.bytes_received * 1024 - previousReceived);

    previousSent = data.bytes_sent * 1024;

    previousReceived = data.bytes_received * 1024;

    if(upload < 0) upload = 0;

    if(download < 0) download = 0;

    document.getElementById("uploadSpeed").innerHTML =
        upload.toFixed(2) + " MB/s";

    document.getElementById("downloadSpeed").innerHTML =
        download.toFixed(2) + " MB/s";

    uploadHistory.push(upload);

    downloadHistory.push(download);

    if(uploadHistory.length > 30){

        uploadHistory.shift();

        downloadHistory.shift();

    }

    chart.data.labels = uploadHistory.map((_,i)=>i);

    chart.data.datasets[0].data = uploadHistory;

    chart.data.datasets[1].data = downloadHistory;

    chart.update();

}

const chart = new Chart(document.getElementById("networkChart"),{

type:"line",

data:{

labels:[],

datasets:[

{

label:"Upload",

data:[],

tension:.3

},

{

label:"Download",

data:[],

tension:.3

}

]

},

options:{

responsive:true,

animation:false

}

});

updateNetwork();

setInterval(updateNetwork,1000);
