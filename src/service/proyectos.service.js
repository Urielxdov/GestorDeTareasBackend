"use strict";


const { conexion } = require("../database/database");

const solicitarProyectos = (id, correo, password) => {
    return new Promise ((resolve, reject) => {
        conexion.query('SELECT * FROM proyectos WHERE (idCreador = ? AND correoUser = ? AND passwordUser = ?)', [id, correo, password], (err, data)=> {
            if(err) {
                reject({mensaje : 'Se detecto infomracion corrompida, favor de inciar nuevamente sesion'});
            }
            resolve(data);
        });
    });
};

const solicitarProyecto = (idCreador, titulo) => {
    return new Promise ((resolve, reject) => {
        conexion.query('SELECT * FROM proyectos WHERE idCreador = ? AND titulo = ?', [idCreador, titulo],(err, data)=> {
            if(err) reject({mensaje : err});
            if(data.length == 0) resolve({mensaje : 'Not found projects with this factures'});
            resolve(data);
        });
    });
};


module.exports = {solicitarProyectos, solicitarProyecto}
