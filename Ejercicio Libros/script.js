const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const url = "mongodb://localhost:27017/";
var urlencodedParser = bodyParser.urlencoded({ extended: false })
// CONSULTAR UN LIBRO CON SU AUTOR

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
            var idAutor2 = libro[0][0].id_autor2;
            var query2 = { "_id": mongo.ObjectId(idAutor) }
            var query3 = { "_id": mongo.ObjectId(idAutor2) }
            var coleccion2 = "Autores"
            dbo.collection(coleccion2).find(query2).toArray(function (err, result2) {
                if (err) throw err;
                libro.push(result2);
                dbo.collection(coleccion2).find(query3).toArray(function (err, result3) {
                    if (err) throw err;
                    libro.push(result3);
                    res.send(libro)
                    // db.close();
                })
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



