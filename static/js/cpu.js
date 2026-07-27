const history=[];

async function updateCPU(){

const response=await fetch("/api/cpu");

const data=await response.json();

document.getElementById("cpuUsage").innerHTML=data.usage+"%";

document.getElementById("cpuBar").style.width=data.usage+"%";

document.getElementById("physical").innerHTML=data.physical_cores;

document.getElementById("logical").innerHTML=data.logical_cores;

document.getElementById("currentFreq").innerHTML=data.current_frequency+" MHz";

document.getElementById("maxFreq").innerHTML=data.maximum_frequency+" MHz";

document.getElementById("minFreq").innerHTML=data.minimum_frequency+" MHz";

document.getElementById("load1").innerHTML=data.load_average["1min"];

document.getElementById("load5").innerHTML=data.load_average["5min"];

document.getElementById("load15").innerHTML=data.load_average["15min"];

let html="";

data.per_core.forEach((value,index)=>{

html+=`

<p>

Core ${index+1}

<progress value="${value}" max="100"></progress>

${value}%

</p>

`;

});

document.getElementById("cores").innerHTML=html;

history.push(data.usage);

if(history.length>30){

history.shift();

}

chart.data.labels=history.map((_,i)=>i);

chart.data.datasets[0].data=history;

chart.update();

}

const ctx=document.getElementById("cpuChart");

const chart=new Chart(ctx,{

type:"line",

data:{

labels:[],

datasets:[{

label:"CPU Usage",

data:[],

fill:false,

tension:0.3

}]

},

options:{

responsive:true,

animation:false,

scales:{

y:{

beginAtZero:true,

max:100

}

}

}

});

updateCPU();

setInterval(updateCPU,1000);
