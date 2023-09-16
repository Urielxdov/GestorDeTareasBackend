"use strict";
const { conexion } = require('../database/database'); //Import database coneccion
const { verificarPasswordEncriptado } = require('./autenticacion');
const { encryptar } = require('../ayudantes/manejoBcrypt');


const solicitarUsuarioRegistrado = (correo, password) => {
    return new Promise((resolve, reject) => {
        console.log('Hola2')
        conexion.query('SELECT * FROM usuarios WHERE correo = ?', [correo], async (error, data) => {
            if (error) {
                reject(new Error('Error al momento de realizar la solicitud'));
                return; // Agregamos un return para evitar que el código continúe después del error
            }

            if (!data || data.length === 0) {
                resolve('Correo no registrado');
            } else {
                const passwordEncriptado = data[0].password;
                if (await verificarPasswordEncriptado(password, passwordEncriptado)) {
                    resolve(data);
                } else {
                    resolve('Contraseña incorrecta');
                }
            }
        });
    });
};




const registrarUsuario = (nombre, apellidos, correo, password) => { //register user
    return new Promise(async (resolve, reject) => {
        const passwordEncriptado = await encryptar(password);
        conexion.query(`INSERT INTO usuarios(nombre, apellidos, correo, password) VALUES (?, ?, ?, ?)`, [nombre, apellidos, correo, passwordEncriptado], (error, data) => {
            if (error) reject(new Error('Error al momento de realizar el registro'));
            resolve(data);
        });
    });
};

const actualizarDatosUsuario = (datos, id) => {
    return new Promise(async (resolve, reject) => {
        if ('password' in datos) {
            const password = await encryptar(datos.password);
            datos.password = password; // Actualiza la contraseña encriptada en el objeto datos
        }

        conexion.query('UPDATE usuarios SET ? WHERE id = ?', [datos, id], (error, data) => {
            if (error) reject(new Error('Error en la conexion a la base de datos'));
            resolve('Usuario actualizado');
        });
    });
};


module.exports = { solicitarUsuarioRegistrado, registrarUsuario, actualizarDatosUsuario };
