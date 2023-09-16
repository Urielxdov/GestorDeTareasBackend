"use strict";

//Declaracion de variables necesarias
const express = require('express'); //Importamos el framework express.js

const cookieParser = require('cookie-parser');//Para indicar al servidor que recibira cookies 

const v1Router = require('./Version1/routes/routesV1'); //Importamos los endpoints de la api
const cors = require('cors'); //Para indicar las rutas permitidas para el acceso a la api



const app = express();  //Objeto de express
const PORT = process.env.PORT || 3000;


//set up app
app.use(cors('*'));//setting of cors


app.use(express.json()); // parsing the incoming data


app.set('trust proxy', 1); //That is a set up trust for proxy

//use of midllewares
app.use(cookieParser());



// Use path '/api'
app.use('/api', v1Router);

// listen server
app.listen(PORT, () => {
    console.log(`Server escuchando en el puerto ${PORT}`);
});

