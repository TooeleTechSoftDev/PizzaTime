const db = require('mongodb')
const dblink = "mongodb://localhost:27017"
const MongoClient = db.MongoClient
const assert = require('assert')
const express = require('express')
const app = express()
const mongoClient = new MongoClient(dblink, { useNewUrlParser: true })
const DBname = 'PizzaTime'
app.use(express.json('*/*'))


mongoClient.connect(function (err) {
    assert.equal(null, err)
    console.log("Connected to Mongo")
    app.listen("3000", () => {
        console.log("Server started on 3000")
    })
})

function look(collect, entr, retu) {
    const dbo = mongoClient.db("Pizza-dude")
     dbo.collection(collect).findOne(entr, { projection: { _id: 0 } }).then(retu)
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

app.get('/', express.static('public'))
app.get('/found/')

let jsonObj = { "name": "supreme",
                "size": 12,
                "crust": "deep",
                "imgURL":  "http://www.sugardale.com/sites/default/files/stuffed%20crust%20pizza.jpg"
}
app.get('/lookup/:name', (req, res) => {
    let test = { name: { $regex: req.params.name, $options: 'i' } }


    look("People", test, (docu) => {
        console.log('Callback testout -> ', docu)
        res.send(JSON.stringify(docu))
    })
})
/*
var test = { name: "Bobby" }
look("Pizza-dude", "People", test)
*/
