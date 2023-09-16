"use strict";


const verificarEmail = (email) => {
    const expresionRegular =  /^[A-Za-z0-9_.]+@[A-Za-z0-9]+\.[A-Za-z]{2,}$/; //Definimos la expresion regular

    //is email a String and not is empty?
    if(typeof email === 'string' && email !== '') {
        return expresionRegular.test(email); // Validated
    }
    return false; // The email doesn´t passed the validation
}

const verificarPassword = (password) => {
    // Is the password a String or is minnor than 8?
    if (typeof password !== 'string' || password.length < 8) {
        return false; // The password not meets the criterias of validation
    }

    // Verificar al menos una letra minúscula
    if (!/[a-z]/.test(password)) {
        return false; // The password not meets the criterias of validation
    }

    // Validate what password contains at least one letter
    if (!/[A-Z]/.test(password)) {
        return false; // The password not meets the criterias of validation
    }

    // Validate what password contains at least one number 
    if (!/[0-9]/.test(password)) {
        return false; // The password not meets the criterias of validation
    }

    // Validate what password contains at least one special character
    if (!/[!@#$%^&*()_+[\]{};':"\\|,.<>/?]+/.test(password)) {
        return false; // The password not meets the criterias of validation
    }

    return true; // The password meets the criterias of validation

}

module.exports = { verificarEmail, verificarPassword };

