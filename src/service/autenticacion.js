"use strict";
const { encryptar, comparar } = require("../ayudantes/manejoBcrypt");

const verificarPasswordEncriptado = async (password, passwordEncriptado) => {
    try {
        const hash = await comparar(password, passwordEncriptado);
        return hash;
    } catch (e) {
        throw new Error(e);
    }
}



module.exports = { verificarPasswordEncriptado };
