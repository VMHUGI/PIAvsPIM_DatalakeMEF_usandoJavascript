const {BrowserWindow,Notification} = require('electron')
//const {BrowserWindow} = require('@electron/remote/main').initialize()
const {getQueryResult,getQueryResultPIAPIM,getFuncionList} = require('./database')

function createProject(proyecto){
    //const result  = getQueryResult()

    (async () => {
        console.log(await getQueryResult(proyecto.name))
      })()

    //console.log(result)
    console.log(proyecto)
    new Notification({
        title: 'Proyecto UGI',
        body: 'Proyecto creado Satisfactoriamente'
    }).show()
}

async function getValuesPIAPIM(funcion){
    //const result  = getQueryResult()
    let result
    try {
        result = await getQueryResultPIAPIM(funcion)

        //console.log(result)
        /* console.log("Nhalim")
        console.log(result.rows) */
        //return result
        
    } catch (error) {
        console.log(error)
    }

    return result
    
}

async function getListaFunciones(){
    //const result  = getQueryResult()
    let result
    try {
        result = await getFuncionList()

        //console.log(result)
        /* console.log("Nhalim")
        console.log(result.rows) */
        //return result
        
    } catch (error) {
        console.log(error)
    }

    return result
    
}

let window

function createWindow(){
    window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        }
    })
    window.loadFile('src/ui/index.html')
}

module.exports = {
    createWindow,
    createProject,
    getValuesPIAPIM,
    getListaFunciones
}