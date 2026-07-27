const history = [];

async function updateMemory() {

    const response = await fetch("/api/memory");

    const data = await response.json();

    document.getElementById("memoryUsage").innerHTML = data.usage + "%";

    document.getElementById("memoryBar").style.width = data.usage + "%";

    document.getElementById("total").innerHTML = data.total + " GB";

    document.getElementById("used").innerHTML = data.used + " GB";

    document.getElementById("available").innerHTML = data.available + " GB";

    document.getElementById("free").innerHTML = data.free + " GB";

    document.getElementById("cached").innerHTML = data.cached + " GB";

    document.getElementById("buffers").innerHTML = data.buffers + " GB";

    document.getElementById("swapTotal").innerHTML = data.swap_total + " GB";

    document.getElementById("swapUsed").innerHTML = data.swap_used + " GB";

    document.getElementById("swapFree").innerHTML = data.swap_free + " GB";

    document.getElementById("swapPercent").innerHTML = data.swap_percent + "%";

    history.push(data.usage);

    if(history.length>30){

        history.shift();

    }

    chart.data.labels = history.map((_,i)=>i);

    chart.data.datasets[0].data = history;

    chart.update();

}

const ctx = document.getElementById("memoryChart");

const chart = new Chart(ctx,{

    type:"line",

    data:{

        labels:[],

        datasets:[{

            label:"Memory Usage",

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

updateMemory();

setInterval(updateMemory,1000);
