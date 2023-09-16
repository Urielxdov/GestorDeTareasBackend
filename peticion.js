const url = 'http://localhost:3000/api/';
let opciones = {
    method : "POST",
    headers : {"Content-Type": "application/json"},
    body : JSON.stringify({
        correo : "Urieledgar878@gmail.com",
        password : "Circulito1"
    })
}

const peticion = () => {
    fetch(url, opciones)
        .then(response => {
            console.log('Aqui')
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }
            return response.json(); // Esto convierte la respuesta en formato JSON
        })
        .then(data=> console.log(data))
        .catch(err=> console.log(err));
}

module.exports = {peticion};