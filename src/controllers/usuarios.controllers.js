"use strict";

const { solicitarUsuarioRegistrado, registrarUsuario, actualizarDatosUsuario } = require('../service/usuarios.service'); //Logic of the api
const jsonwebtoken = require('jsonwebtoken'); //Import JWT
const { secret } = require('../../configuracion'); //Import secret for JWT
const { verificarEmail, verificarPassword } = require('../ayudantes/verificacionDeDatos'); //Validations of data

const usuarioRegistrado = (req, res) => {
    const { correo, password } = req.body;
    console.log('Hola1')
    if (verificarEmail(correo)) {
        console.log('Hola3')
        solicitarUsuarioRegistrado(correo, password)
            .then((data) => {
                const token = jsonwebtoken.sign({ id: data[0].id }, secret, { //Use Json Web Token for more security
                    expiresIn: 60 * 60 * 24,
                    issuer: 'apiCRUDuriel050604',
                    audience: 'apiCRUDurielAudience'
                });
                // delete data[0].password;
                res.json({ data, token });
            })
            .catch((error) => {
                console.error("Error al solicitar usuario registrado:", error);
                res.status(401).json({ mensaje: error.message });
            });
    }
}



const registrarUsuarios = (req, res) => {
    const { nombre, apellidos, correo, password } = req.body;

    // data validations
    if (!(nombre && apellidos && verificarEmail(correo) && verificarPassword(password))) {
        return res.status(400).json({ mensaje: "Error en los datos, favor de verificar" });
    }

    // If dates is valid, send data the user
    registrarUsuario(nombre, apellidos, correo, password)
        .then(data => {
            const token = jsonwebtoken.sign({ id: data[0].id }, secret, {
                expiresIn: 60 * 60 * 24,
                issuer: 'apiCRUDuriel050604',
                audience: 'apiCRUDurielAudience'
            });
            res.json({ data, token });
        })
        .catch(error => {
            res.status(400).json({ mensaje: error.message });
        });
}


const actualizarUsuario = (req, res) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(401).json({ mensaje: 'No se encuentra el token' });
    }

    try {
        const decodificacion = jsonwebtoken.verify(token, secret, {
            issuer : 'apiCRUDuriel050604',
            audience : 'apiCRUDurielAudience'
        });
        actualizarDatosUsuario(req.body, decodificacion.id)
            .then(data => res.json({ mensaje: data[0] }))
            .catch(error => res.status(500).json({ mensaje: error.message }));
    } catch (error) {
        res.status(401).json({ mensaje: 'El token no es válido o ha expirado' });
    }
};



module.exports = { usuarioRegistrado, registrarUsuarios, actualizarUsuario };