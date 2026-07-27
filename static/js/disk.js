const history=[];

async function updateDisk(){

const response=await fetch("/api/disk");

const data=await response.json();

document.getElementById("diskUsage").innerHTML=data.usage+"%";

document.getElementById("diskBar").style.width=data.usage+"%";

document.getElementById("totalDisk").innerHTML=data.total+" GB";

document.getElementById("usedDisk").innerHTML=data.used+" GB";

document.getElementById("freeDisk").innerHTML=data.free+" GB";

document.getElementById("readCount").innerHTML=data.read_count;

document.getElementById("writeCount").innerHTML=data.write_count;

document.getElementById("readMB").innerHTML=data.read_mb+" MB";

document.getElementById("writeMB").innerHTML=data.write_mb+" MB";

const tbody=document.querySelector("#partitionTable tbody");

tbody.innerHTML="";

data.partitions.forEach(part=>{

tbody.innerHTML+=`

<tr>

<td>${part.device}</td>

<td>${part.mountpoint}</td>

<td>${part.fstype}</td>

<td>${part.total} GB</td>

<td>${part.used} GB</td>

<td>${part.free} GB</td>

<td>${part.percent}%</td>

</tr>

`;

});

history.push(data.usage);

if(history.length>30){

history.shift();

}

chart.data.labels=history.map((_,i)=>i);

chart.data.datasets[0].data=history;

chart.update();

}

const ctx=document.getElementById("diskChart");

const chart=new Chart(ctx,{

type:"line",

data:{

labels:[],

datasets:[{

label:"Disk Usage",

data:[],

fill:false,

tension:.3

}]

},

options:{

responsive:true,

animation:false,

scales:{

y:{

min:0,

max:100

}

}

}

});

updateDisk();

setInterval(updateDisk,2000);
