"use strict";

// declaring constants
const express = require('express'); //framework e|xpress.js
const router = express.Router(); //Use method Router
const { usuarioRegistrado, registrarUsuarios, actualizarUsuario } = require('../../controllers/usuarios.controllers'); //Imports variable of controllers
const { solicitarProyectosUsuario } = require('../../controllers/proyectos.controllers');

//End points
router.post('/', usuarioRegistrado);
router.post('/registrar', registrarUsuarios);
router.patch('/actualizar', actualizarUsuario);


router.post('/proyectos',)

module.exports = router;
