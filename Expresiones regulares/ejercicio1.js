// Realiza un programa en JS que permita al usuario insertar una cadena y valide su formato, usando expresiones regulares. Las condiciones de la cadena son:
// Empieza por un número impar
// Luego tiene un "(" y un "$"
// A continuación tiene hasta tres mayúsculas
// Por último una minúscula
// La cadena puede estar dentro de otra

// function check() {
//     var cadenaUser = document.querySelector("#cadena").value
//     const regExp = new RegExp(/[13579]\(\$[A-Z]{1,3}[a-z]/)
//     var resultado = regExp.test(cadenaUser);
//     if (resultado) { alert("Cadena de caracteres correcta") }
//     else { alert("Revise su cadena de caracteres") }
// }

// var boton = document.querySelector("#button")
// boton.addEventListener("click", check, false)

// // Modifica el ejercicio anterior para que la cadena empiece y termine exactamente como se indica.

// function check() {
//     var cadenaUser = document.querySelector("#cadena").value
//     const regExp = new RegExp(/^[13579]\(\$[A-Z]{1,3}[a-z]$/)
//     var resultado = regExp.test(cadenaUser);
//     if (resultado) { alert("Cadena de caracteres correcta") }
//     else { alert("Revise su cadena de caracteres") }
// }
// var boton = document.querySelector("#button")
// boton.addEventListener("click", check, false)

// Modifica el ejercicio anterior para que las 4 letras puedan ser mayúsculas o minúsculas.

function check() {
    var cadenaUser = document.querySelector("#cadena").value
    const regExp = new RegExp(/^[13579]\(\$[A-Z]{1,3}[a-z]$/i)
    var resultado = regExp.test(cadenaUser);
    if (resultado) { alert("Cadena de caracteres correcta") }
    else { alert("Revise su cadena de caracteres") }
}
var boton = document.querySelector("#button")
boton.addEventListener("click", check, false)