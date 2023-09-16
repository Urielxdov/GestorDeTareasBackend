"use strict";


const verificarEmail = (email) => {
    const expresionRegular =  /^[A-Za-z0-9_.]+@[A-Za-z0-9]+\.[A-Za-z]{2,}$/; //Definimos la expresion regular

    //Verificamos que sea un string y ademas no este vacio
    if(typeof email === 'string' && email !== '') {
        return expresionRegular.test(email); // El correo cumplio con los criterios
    }
    return false; // El correo no cumplio con los criterios
}

const verificarPassword = (password) => {
    // Verificar si no es una cadena o es una cadena vacía
    if (typeof password !== 'string' || password.length < 8) {
        return false; // La contraseña no cumple con los criterios de seguridad
    }

    // Verificar al menos una letra minúscula
    if (!/[a-z]/.test(password)) {
        return false; // La contraseña no cumple con los criterios de seguridad
    }

    // Verificar al menos una letra mayúscula
    if (!/[A-Z]/.test(password)) {
        return false; // La contraseña no cumple con los criterios de seguridad
    }

    // Verificar al menos un dígito
    if (!/[0-9]/.test(password)) {
        return false; // La contraseña no cumple con los criterios de seguridad
    }

    // Verificar opcionalmente un carácter especial
    if (!/[!@#$%^&*()_+[\]{};':"\\|,.<>/?]+/.test(password)) {
        return false; // La contraseña no cumple con los criterios de seguridad
    }

    return true; // La contraseña cumple con todos los criterios de seguridad
}



module.exports = { verificarEmail, verificarPassword };

