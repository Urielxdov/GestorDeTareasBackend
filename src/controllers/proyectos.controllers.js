"use strict";

const {solicitarProyectos, solicitarProyecto} = require('../service/proyectos.service');


const solicitarProyectosUsuario = (req, res) => {
    const { id, correo, password } = req.body;

    if(id && correo && password) {
        solicitarProyectos(id, correo, password)
            .then((data)=> {
                res.json(data);
            })
            .catch((error)=> {
                res.json({ mensaje : error.mensaje})
            })
    } else {
        res.json({ mensaje : 'Informacion del navegador vacia'})
    }
}

const solicitarProyectoUsuario = (req, res) => {
    const { id, correo, password, titulo } = req.body;

    solicitarProyecto(id, titulo)
        .then(data => res.json(data))
        .catch(error => res.json({mensaje : error.mensaje}));
}


module.exports = { solicitarProyectosUsuario };