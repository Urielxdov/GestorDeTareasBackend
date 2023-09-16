"use strict";

//declare variables
const session = require('express-session');
const mysql = require ('mysql');
const mysqlStore = require('express-mysql-session')(session); //Use for handle session store



//settings of coneccion the a database
const conexion = mysql.createConnection({
    host : 'localhost',
    port: 3306,
    user : 'root',
    password : '050604?UrieL1',
    database : "gestordeproyectos"
});

const sessionStore = new mysqlStore({
    expiration : 10800000,
    createDatabaseTable : true,
    schema : {
        tableName : 'sessionStore',
        columnNames : {
            session_id : 'sessionId',
            expires : 'expires',
            data : 'data'
        }
    }
}, conexion);

conexion.connect((err) => {
    if(err) {
        console.log(err);
        return;
    } 
    console.log('Conexion con la base de datos bien');
})


module.exports = {conexion, sessionStore};