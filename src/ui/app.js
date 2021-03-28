const productForm = document.getElementById('productForm')



const { remote } =require('electron')
//const { remote } = require('@electron/remote')
const main=remote.require('./main')

//result = //await main.getValuesPIAPIM()
const projectName = document.getElementById('name')
const projectOwner = document.getElementById('owner')
const projectMail = document.getElementById('mail')
const projectDescription = document.getElementById('description')
const projectFunciones = document.getElementById('funcion')


productForm.addEventListener('submit', async (e)=>{
    e.preventDefault();

    const newProject = {
        funcion: projectFunciones.value,
        name : projectName.value,
        owner: projectOwner.value,
        mail: projectMail.value,
        description: projectDescription.value

    }
    
    main.createProject(newProject)
    
    //renderChart(newProject.funcion);
    renderListaFunciones().then(
        async (message) => {
            await renderChart(projectFunciones.value);
          }
    )

})

var chart;
async function renderChart(funcion){

    result = await main.getValuesPIAPIM(funcion);
    console.log(result.rows)

    xvals = []
    PIAvals = []
    PIMvals = []
    MDvals = []

    funcionnombre = result.rows[0][5]

    result.rows.forEach(row => {
        xvals.push(row[0]) 
        PIAvals.push(row[2]/1000000000)
        PIMvals.push(row[3]/1000000000)
        MDvals.push(row[4]/1000000000)
    })

    var ctx = document.getElementById('myChart').getContext('2d');
    chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels:xvals,
            datasets: [
                {
                    label: 'PIA',
                    borderColor:  '#0093F8',
                    data: PIAvals
                },
                {
                    label: 'PIM',
                    borderColor:  'red',
                    data: PIMvals
                },
                {
                    label: 'Monto Devengado',
                    borderColor:  'green',
                    data: MDvals
                }
            ]
        },

        // Configuration options go here
        options: {
            title:{
                display:true,
                text: "Gasto Histórico CA",
                fontSize:30,
                padding: 30,
                fontColor: '#004899'

            },
            legend: {
                position: 'bottom',
                labels: {
                    padding: 20,
                    boxWidth: 25,
                    fontFamily: 'system-ui',
                    fontColor: 'black'
                }
            },
            elements:{
                line:{
                    borderWidth:8,
                    fill: false,
                },
                point:{
                    radius: 6,
                    borderWidth: 4,
                    backgroundColor:'white',
                    hoverRadius:8,
                    hoverBorderWidth:4,
                    hoverBackgroundColor: 'white',
                }
            },
            tooltips:{
                backgroundColor: '#0585f6',
                titleFontSize: 20,
                xPadding:20,
                yPadding:20,
                bodyFontSize: 15,
                bodySpacing:10,
                mode: 'x',
            }

        }
    });
    

}

let funciones = []

const getFuncionList = async  () =>{
    funciones =  await main.getListaFunciones();
    renderListaFunciones(funciones);
}


function renderListaFunciones(funciones){
    projectFunciones.innerHTML = '';
    funciones.rows.forEach(row =>{
        projectFunciones.innerHTML += `
            <option value=${row[0]}>
                ${row[1]}
            </option>
        `;
    })
}


 //renderListaFunciones() 


projectFunciones.addEventListener("change", function() {

    try {
        chart.destroy()
        
    } catch (error) {
        console.log("chart no existe")
    }

    renderChart(projectFunciones.value)
    

});

async function init(){
    await getFuncionList()
    renderChart(projectFunciones.value)
}

init();