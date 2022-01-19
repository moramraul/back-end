const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const url = "mongodb://localhost:27017/";
var urlencodedParser = bodyParser.urlencoded({ extended: false })


// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html');
// });
// app.post('/add', urlencodedParser, (req, res) => {
//     const mydb = req.body.bdNameAdd;
//     const coleccion = req.body.collectionNameAdd;
//     const coleccion2 = "Autores"
//     const titulo = req.body.bookNameAdd
//     const isbn = req.body.bookISBNAdd
//     const autor = req.body.authorNameAdd
//     const idAutor = req.body.authorIdAdd
//     const autor2 = req.body.author2NameAdd
//     const idAutor2 = req.body.author2IdAdd
//     const myobj = {
//         "Titulo": titulo,
//         "ISBN": isbn,
//         "Autor": autor,
//         "id_autor": idAutor
//     };
//     const myobj2 = { "Apellidos": autor }
//     const myobj3 = { "Apellidos": autor2 }
//     const myobj4 = {
//         "Titulo": titulo,
//         "ISBN": isbn,
//         "Autor": autor,
//         "id_autor": idAutor,
//         "Autor2": autor2,
//         "id_autor2": idAutor2
//     }

//     if ((autor != '' && idAutor == '') && (autor2 == '' && idAutor2 == '')) // If uno. Tenemos solo un autor sin id.

//     {
//         MongoClient.connect(url, function (err, db) { // Primero creamos el autor porque necesitamos su id para el libro
//             if (err) throw err;
//             var dbo = db.db(mydb);
//             dbo.collection(coleccion2).insertOne(myobj2, function (err, res) {
//                 if (err) throw err;
//                 console.log("Autor insertado");
//                 dbo.collection(coleccion2).find(myobj2).toArray(function (err, result2) {
//                     if (err) throw err;
//                     var objeto = mongo.ObjectId(result2[0]._id).toString() // Revisar Davinia
//                     const objCreated = {
//                         "Titulo": titulo,
//                         "ISBN": isbn,
//                         "Autor": autor,
//                         "id_autor": objeto
//                     }
//                     dbo.collection(coleccion).insertOne(objCreated, function (err, res) {
//                         if (err) throw err;
//                         console.log("Libro insertado");
//                     })
//                 })
//             });
//             res.send("Base de datos actualizada")
//         });

//     } else if ((autor != '' && idAutor != '') && (autor2 == '' && idAutor2 == '')) // If dos. Tenemos un autor con id
//     {
//         MongoClient.connect(url, function (err, db) {
//             if (err) throw err;
//             var dbo = db.db(mydb);
//             dbo.collection(coleccion).insertOne(myobj, function (err, res) {
//                 if (err) throw err;
//                 console.log("Libro insertado por el if 2");
//                 console.log(typeof idAutor)
//                 // db.close();
//             });
//             res.send("Base de datos actualizada")
//         });
//     }
//     else if ((autor != '' && idAutor == '') && (autor2 != '' && idAutor2 == ''))//If tres. Tenemos dos autores con nombres pero sin ids
//     {
//         MongoClient.connect(url, function (err, db) {
//             if (err) throw err;
//             var dbo = db.db(mydb);
//             dbo.collection(coleccion2).insertOne(myobj2, function (err, res) {
//                 if (err) throw err;
//                 console.log("Autor1 insertado");
//                 dbo.collection(coleccion2).insertOne(myobj3, function (err, res) {
//                     if (err) throw err;
//                     console.log("Autor2 insertado");
//                     dbo.collection(coleccion2).find(myobj2).toArray(function (err, result) {
//                         if (err) throw err;
//                         var objeto = mongo.ObjectId(result[0]._id).toString()
//                         dbo.collection(coleccion2).find(myobj3).toArray(function (err, result2) {
//                             if (err) throw err;
//                             var objeto2 = mongo.ObjectId(result2[0]._id).toString()
//                             var objCreated = {
//                                 "Titulo": titulo,
//                                 "ISBN": isbn,
//                                 "Autor": autor,
//                                 "Autor2": autor2,
//                                 "id_autor": objeto,
//                                 "id_autor2": objeto2
//                             }
//                             dbo.collection(coleccion).insertOne(objCreated, function (err, res) {
//                                 if (err) throw err;
//                                 console.log("Libro insertado");

//                             });
//                             // res.send("Base de datos actualizada")
//                         })
//                     })

//                 }

//                 )
//             })
//         })
//     }
//     else if ((autor != '' && idAutor != '') && (autor2 != '' && idAutor2 == '')) // If cuatro. Tenemos un autor con id y otro autor sin id.
//     {
//         MongoClient.connect(url, function (err, db) {
//             if (err) throw err;
//             var dbo = db.db(mydb);
//             dbo.collection(coleccion2).insertOne(myobj3, function (err, res) {
//                 if (err) throw err;
//                 console.log("Autor2 insertado");
//                 dbo.collection(coleccion2).find(myobj3).toArray(function (err, result) {
//                     if (err) throw err;
//                     var objeto = mongo.ObjectId(result[0]._id).toString();
//                     var objCreated = {
//                         "Titulo": titulo,
//                         "ISBN": isbn,
//                         "Autor": autor,
//                         "Autor2": autor2,
//                         "id_autor": idAutor,
//                         "id_autor2": objeto
//                     }
//                     dbo.collection(coleccion).insertOne(objCreated, function (err, res) {
//                         if (err) throw err;
//                         console.log("Libro insertado");
//                         db.close();
//                     })
//                 })
//             });
//             res.send("Base de datos actualizada")
//         })
//     } else {
//         MongoClient.connect(url, function (err, db) {
//             if (err) throw err;
//             var dbo = db.db(mydb);
//             dbo.collection(coleccion).insertOne(myobj4, function (err, res) {
//                 if (err) throw err;
//                 console.log("Libro insertado por el if 5");
//                 console.log(typeof idAutor)
//                 // db.close();
//             });
//             res.send("Base de datos actualizada")
//         });
//     }


// });    
// app.listen(3000);

// // CONSULTAR UN LIBRO CON SU AUTOR

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
app.post('/consulta', urlencodedParser, (req, res) => {
    const mydb = req.body.bdName;
    const coleccion = req.body.collectionName;
    const consulta = req.body.bookISBN;
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(mydb);
        var query = { "ISBN": consulta };
        dbo.collection(coleccion).find(query).toArray(function (err, result) {
            if (err) throw err;
            var libro = []
            libro.push(result)
            var idAutor = libro[0][0].id_autor;
            var query2 = { "_id": mongo.ObjectId(idAutor) }
            var coleccion2 = "Autores"
            dbo.collection(coleccion2).find(query2).toArray(function (err, result2) {
                if (err) throw err;
                libro.push(result2);
                res.send(libro)
                // db.close();

            })
        })
    });

});

app.listen(3000);
// SACAR TODOS LOS LIBROS
// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html');
// });
// app.post('/todos', urlencodedParser, (req, res) => {
//     const mydb = req.body.bdName1;
//     const coleccion = req.body.collectionName1;
//     MongoClient.connect(url, function (err, db) {
//         if (err) throw err;
//         var dbo = db.db(mydb);
//         dbo.collection(coleccion).find({}).toArray(function (err, result) {
//             if (err) throw err;
//             console.log(result);
//             res.send(result)
//             // db.close();
//         });
//     });

//     console.log('Base de datos:', req.body.bdName, '\nCollección: ', req.body.collectionName);
// });

// app.listen(3000);



