const db = require('mongodb')
const dblink = "mongodb://localhost:27017"
const MongoClient = db.MongoClient
const assert = require('assert')
const express = require('express')
const app = express()
const mongoClient = new MongoClient(dblink, { useNewUrlParser: true })
const DBname = 'PizzaTime'

mongoClient.connect(function (err) {
    assert.equal(null, err)
    console.log("Connected to Mongo")
    app.listen("3000", () => {
        console.log("Server started on 3000")
    })
})

function look(data, collect, entr) {
    const dbo = mongoClient.db(data)
    dbo.collection(collect).find(entr, { projection: { _id: 0 } }).toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
    });
}
function entry(data, collect, entr) {
    const dbo = mongoClient.db(data)
    dbo.collection(collect).insertOne(entr, function (err, res) {
        if (err) throw err
        console.log("1 document inserted")
    })
}
function remove(data, collect, entr) {
    const dbo = mongoClient.db(data)
    dbo.collection(collect).deleteOne(entr, function (err, obj) {
        if (err) throw err
        console.log("1 document deleted")
    })
}

    /* data = database name
*      - NoSpaces
* collect = collection name
*      - NoSpaces
* entry = Entry added, as object
*         - Example - { name: "Company Inc", address: "Highway 37" }
* */

app.use('/public',express.static('public'))

app.get('/', (req, res) => res.send('<html><body><h2>This is smaller</h2></body></html>'))
app.get('/test', (req, res) => res.send('<html><body><h1>This is bigger</h1></body></html>'))

let jsonObj = { "name": "supreme",
                "size": 12,
                "crust": "deep",
                "imgURL":  "http://www.sugardale.com/sites/default/files/stuffed%20crust%20pizza.jpg"
}
app.get('/account/lookup/:name', (req, res) => {
    let lname = JSON.stringify(req.params.name)
    let test = '{ "name": ' + lname + ' }'
    console.log('test is ' + test)
    let intest = JSON.parse(test)
    let output = look("Pizza-dude", "People", intest)
    console.log('before')
    console.log(output)
    console.log('after')
})
/*
var test = { name: "Bobby" }
look("Pizza-dude", "People", test)
*/
app.get('/deals', (req, res) => res.send(JSON.stringify(jsonObj)))


