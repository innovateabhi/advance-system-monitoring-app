let services=[];

async function loadServices(){

const response=await fetch("/api/services");

const data=await response.json();

services=data.services;

document.getElementById("running").innerHTML=data.running;

document.getElementById("stopped").innerHTML=data.stopped;

document.getElementById("failed").innerHTML=data.failed;

renderTable(services);

}

function badge(status){

if(status==="active")

return `<span class="status running">Running</span>`;

if(status==="failed")

return `<span class="status failed">Failed</span>`;

return `<span class="status stopped">Stopped</span>`;

}

function renderTable(list){

const tbody=document.querySelector("#serviceTable tbody");

tbody.innerHTML="";

list.forEach(service=>{

tbody.innerHTML+=`

<tr>

<td>${service.service}</td>

<td>${badge(service.status)}</td>

<td>${service.enabled}</td>

<td>${service.description}</td>

</tr>

`;

});

}

document.getElementById("serviceSearch")

.addEventListener("keyup",function(){

const keyword=this.value.toLowerCase();

renderTable(

services.filter(

s=>s.service.toLowerCase().includes(keyword)

)

);

});

loadServices();

setInterval(loadServices,5000);
