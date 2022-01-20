const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const url = "mongodb://localhost:27017/";
var urlencodedParser = bodyParser.urlencoded({ extended: false })
// Para afinar un poco las búsquedas, meta lo que meta el usuario en el input nos lo transforma poniendo la primera letra en mayúsculas y el resto en minúsculas. Solo aplica en los campos que que siempre llevan la primera en mayúsculas y el resto en minúsculas: base de datos, colección y autor (con los títulos, imposible, demasiados factores: varias palabras, nombres propios intercalados...)
function capitalizarPrimeraLetra(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/ejercicio3.html');
});
app.post('/add', urlencodedParser, (req, res) => {
    const inputmydb = req.body.bdNameAdd;
    const mydb = capitalizarPrimeraLetra(inputmydb)
    const inputcollecion = req.body.collectionNameAdd;
    const coleccion = capitalizarPrimeraLetra(inputcollecion)
    const coleccion2 = "Autores"
    const titulo = req.body.bookNameAdd
    const isbn = req.body.bookISBNAdd
    const inputautor = req.body.authorNameAdd
    const autor = capitalizarPrimeraLetra(inputautor)
    const idAutor = req.body.authorIdAdd
    const inputautor2 = req.body.author2NameAdd
    const autor2 = capitalizarPrimeraLetra(inputautor2)
    const idAutor2 = req.body.author2IdAdd
    const myobj = {
        "Titulo": titulo,
        "ISBN": isbn,
        "Autor": autor,
        "id_autor": idAutor
    };
    const myobj2 = { "Apellidos": autor }
    const myobj3 = { "Apellidos": autor2 }
    const myobj5 = { "Titulo": titulo }
    const myobj4 = {
        "Titulo": titulo,
        "ISBN": isbn,
        "Autor": autor,
        "id_autor": idAutor,
        "Autor2": autor2,
        "id_autor2": idAutor2
    };

    MongoClient.connect(url, function (err, db) { // Conectamos a la base de datos y buscamos el libro introducido por el usuario para evitar que de duplique.
        if (err) throw err;
        var dbo = db.db(mydb);
        dbo.collection(coleccion).find(myobj5).toArray(function (err, result2) {
            if (err) throw err;
            if (result2[0] == undefined)  // Si la búsqueda no arroja resultado, es que el libro no existe así que procedemos a crearlo en uno de los cinco supuestos, según la info que nos de el usuario
            { if ((autor != '' && idAutor == '') && (autor2 == '' && idAutor2 == ''))  // If uno: tenemos solo un autor sin id.
                {
                    dbo.collection(coleccion2).insertOne(myobj2, function (err, res) {
                        if (err) throw err;
                        console.log("Autor insertado");
                        dbo.collection(coleccion2).find(myobj2).toArray(function (err, result2) {
                            if (err) throw err;
                            var objeto = mongo.ObjectId(result2[0]._id).toString()
                            const objCreated = {
                                "Titulo": titulo,
                                "ISBN": isbn,
                                "Autor": autor,
                                "id_autor": objeto
                            }
                            dbo.collection(coleccion).insertOne(objCreated, function (err, res) {
                                if (err) throw err;
                                console.log("Libro insertado por el if 1");
                            })
                        })
                    });
                    res.send("Base de datos actualizada")
                } else if ((autor != '' && idAutor != '') && (autor2 == '' && idAutor2 == '')) // If dos: tenemos un solo autor pero tiene id.
                {
                    dbo.collection(coleccion).insertOne(myobj, function (err, res) {
                        if (err) throw err;
                        console.log("Libro insertado por el if 2");
                        console.log(typeof idAutor)
                        // db.close();
                    });
                    res.send("Base de datos actualizada")
                } else if ((autor != '' && idAutor == '') && (autor2 != '' && idAutor2 == '')) // If tres: tenemos dos autores, pero ninguno con id.
                {
                    dbo.collection(coleccion2).insertOne(myobj2, function (err, res) {
                        if (err) throw err;
                        console.log("Autor1 insertado");
                        dbo.collection(coleccion2).insertOne(myobj3, function (err, res) {
                            if (err) throw err;
                            console.log("Autor2 insertado");
                            dbo.collection(coleccion2).find(myobj2).toArray(function (err, result) {
                                if (err) throw err;
                                var objeto = mongo.ObjectId(result[0]._id).toString()
                                dbo.collection(coleccion2).find(myobj3).toArray(function (err, result2) {
                                    if (err) throw err;
                                    var objeto2 = mongo.ObjectId(result2[0]._id).toString()
                                    var objCreated = {
                                        "Titulo": titulo,
                                        "ISBN": isbn,
                                        "Autor": autor,
                                        "Autor2": autor2,
                                        "id_autor": objeto,
                                        "id_autor2": objeto2
                                    }
                                    dbo.collection(coleccion).insertOne(objCreated, function (err, res) {
                                        if (err) throw err;
                                        console.log("Libro insertado por el if 3");
                                    })
                                })
                            })
                        })
                    })
                    res.send("Base de datos actualizada")
                } else if ((autor != '' && idAutor != '') && (autor2 != '' && idAutor2 == '')) // If cuatro. Tenemos dos autores, uno con id y el otro sin id
                {
                    dbo.collection(coleccion2).insertOne(myobj3, function (err, res) {
                        if (err) throw err;
                        console.log("Autor2 insertado");
                        dbo.collection(coleccion2).find(myobj3).toArray(function (err, result) {
                            if (err) throw err;
                            var objeto = mongo.ObjectId(result[0]._id).toString();
                            var objCreated = {
                                "Titulo": titulo,
                                "ISBN": isbn,
                                "Autor": autor,
                                "Autor2": autor2,
                                "id_autor": idAutor,
                                "id_autor2": objeto
                            }
                            dbo.collection(coleccion).insertOne(objCreated, function (err, res) {
                                if (err) throw err;
                                console.log("Libro insertado por el if 4");
                                db.close();
                            })
                        })
                    })
                    res.send("Base de datos actualizada")
                }
                else // If cinco, la única opción restante. Tenemos dos autores con dos ids.
                {dbo.collection(coleccion).insertOne(myobj4, function (err, res) {
                        if (err) throw err;
                        console.log("Libro insertado por el if 5");
                    });
                    res.send("Base de datos actualizada")
                }
            }
            else if // Si el libro introducido coincide en titulo autor e isbn con uno existente, no se introduce nada y se arroja un aviso
            (result2[0].Titulo == titulo && result2[0].Autor == autor && result2[0].ISBN == isbn) { res.send("Libro ya existente, no puede volver a crearse") }
            // Por último, si falta información esencial en el formulario como titulo o al menos un autor, se manda un mensaje de error.
            else { res.send("Formulario rellenado incorrectamente. Falta información esencial") }
        })
    });
});
app.listen(3000);