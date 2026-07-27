let logs=[];

async function loadLogs(){

const response=await fetch("/api/logs");

logs=await response.json();

render(logs);

}

function badge(level){

if(level==="ERROR")

return '<span class="log-error">ERROR</span>';

if(level==="WARNING")

return '<span class="log-warning">WARNING</span>';

return '<span class="log-info">INFO</span>';

}

function render(data){

const tbody=document.querySelector("#logTable tbody");

tbody.innerHTML="";

data.forEach(log=>{

tbody.innerHTML+=`

<tr>

<td>${badge(log.level)}</td>

<td>${log.message}</td>

</tr>

`;

});

}

document.getElementById("searchLog")

.addEventListener("keyup",function(){

const keyword=this.value.toLowerCase();

render(

logs.filter(

log=>log.message.toLowerCase().includes(keyword)

)

);

});

loadLogs();

setInterval(loadLogs,5000);
