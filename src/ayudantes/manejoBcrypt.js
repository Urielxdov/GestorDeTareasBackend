"use strict";
const bcrypt = require('bcrypt');

const encryptar = async (textoPlano) => {
    try {
        const saltRounds = 10;
        const hash = await bcrypt.hash(textoPlano, saltRounds);
        return hash;
    }
    catch (error) {
        throw Error('Error al generar la contraseña Hash');
    }
}

const comparar = async (passwordPlain, hashPassword) => {
    try {
        const isMatch = await bcrypt.compare(passwordPlain, hashPassword);
        return isMatch;
    } catch (error) {
        throw Error ('Error al comparar las contraseñas');
    }
}

module.exports = {encryptar, comparar};



