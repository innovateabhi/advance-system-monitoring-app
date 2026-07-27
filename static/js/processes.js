let processData=[];

async function loadProcesses(){

const response=await fetch("/api/processes");

const data=await response.json();

processData=data.processes;

document.getElementById("total").innerHTML=data.total;

document.getElementById("running").innerHTML=data.running;

document.getElementById("sleeping").innerHTML=data.sleeping;

document.getElementById("stopped").innerHTML=data.stopped;

document.getElementById("zombie").innerHTML=data.zombie;

renderTable(processData);

}

function renderTable(data){

const tbody=document.querySelector("#processTable tbody");

tbody.innerHTML="";

data.forEach(process=>{

tbody.innerHTML+=`

<tr>

<td>${process.pid}</td>

<td>${process.name}</td>

<td>${process.user}</td>

<td>${process.cpu}%</td>

<td>${process.memory}%</td>

<td>${process.status}</td>

<td>${process.started}</td>

</tr>

`;

});

}

document.getElementById("search").addEventListener("keyup",function(){

const keyword=this.value.toLowerCase();

const filtered=processData.filter(

p=>p.name.toLowerCase().includes(keyword)

);

renderTable(filtered);

});

loadProcesses();

setInterval(loadProcesses,3000);
