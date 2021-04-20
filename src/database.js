const oracledb = require('oracledb');
const dbconfig = require('./dbconfig.js');
const dbConfig = require('./dbconfig.js');


async function init() {
    try {
        await oracledb.initOracleClient({libDir: 'C:\\Users\\Lenovo\\Documents\\MEF\\XYProject\\DesktopApp\\instantclient_19_10'});
        console.log('Connection sucessful!');
    } catch (err) {
        console.error('Whoops!');
        console.error(err);
        process.exit(1);
    } 

    try {
  
      await oracledb.createPool({
        user          : "Usuario",
        password      : "Password",
        connectString : "IP_DATA_BASE:1521/dgpp",
        poolIncrement : 0,
        poolMax       : 5,
        poolMin       : 5,
      });
  
      
      //await server.listen(3000);
  
      console.log("Config is running");
  
    } catch (err) {
      console.log("init() error: " + err.message);
    }
  }


init()


async function Connection(){
    let connection
    let result
    try {
        //connection = await oracledb.getConnection(dbConfig);
        return await oracledb.getConnection(dbConfig);
        //result = await connection.execute(`SELECT * FROM GASTOHISTNH`);
        console.log(result)
        console.log('great!')
    } catch (err) {
        console.error(err);
    } finally {
        if (connection) {
        try {
            await connection.close();
        } catch (err) {
            console.error(err);
        }
        }
    }

    return connection;
}

//let conn = Connection();

async function getQueryResult(tablename){
    //let result = await conn.execute(`SELECT * FROM GASTOHISTNH`);
    //return await conn.execute(`SELECT * FROM GASTOHISTNH`);
    //return result
    //connection = await oracledb.getConnection();  // get a connection from the default pool
    //const result = await connection.execute(`SELECT COUNT(*) FROM `+tablename);
    let connection;
    let result;
    try {

        connection = await oracledb.getConnection(dbconfig);  // get a connection from the default pool
        result = await connection.execute('SELECT * FROM '+tablename);
        
        //displayResults(response, result);  // do something with the results

    } catch (err) {
        console.log("<p>Error: " + "ERRO DE CONECCION" + "</p>");
    } finally {
        if (connection) {
            try {
                console.log("<p>Finalmente: " + "soltando la conecciOn" + "</p>");
                await connection.close();  // always release the connection back to the pool
                
            } catch (err) {
                console.error(err);
            }
        }
    }


    return result
}


async function getQueryResultPIAPIM(funcion){
    let connection;
    let result;
    try {

        connection = await oracledb.getConnection(dbconfig); 
        result = await connection.execute('SELECT G.ANO_EJE,G.FUNCION,G.MONTO_PIA,G.MONTO_PIM,G.MONTO_DEVENGADO,F.NOMBRE FROM GASTOHISTNH G,FUNCION F WHERE G.FUNCION= F.FUNCION AND G.FUNCION='+funcion+' ORDER BY G.ANO_EJE');
        
    } catch (err) {
        console.log("<p>Error: " + "ERRO DE CONECCION" + "</p>");
    } finally {
        if (connection) {
            try {
                console.log("<p>Finalmente: " + "soltando la conecciOn" + "</p>");
                await connection.close();  
                
            } catch (err) {
                console.error(err);
            }
        }
    }


    return result
}


async function getFuncionList(){
    //let result = await conn.execute(`SELECT * FROM GASTOHISTNH`);
    //return await conn.execute(`SELECT * FROM GASTOHISTNH`);
    //return result
    //connection = await oracledb.getConnection();  // get a connection from the default pool
    //const result = await connection.execute(`SELECT COUNT(*) FROM `+tablename);
    let connection;
    let result;
    try {

        connection = await oracledb.getConnection(dbconfig);  // get a connection from the default pool
        result = await connection.execute('SELECT DISTINCT FUNCION,NOMBRE FROM FUNCION');
        
        //displayResults(response, result);  // do something with the results

    } catch (err) {
        console.log("<p>Error: " + "ERRO DE CONECCION" +err+ "</p>");
    } finally {
        if (connection) {
            try {
                console.log("<p>Finalmente: " + "soltando la conecciOn" + "</p>");
                await connection.close();  // always release the connection back to the pool
                
            } catch (err) {
                console.error(err);
            }
        }
    }


    return result
}

module.exports = { getQueryResult ,getQueryResultPIAPIM,getFuncionList}
