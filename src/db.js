const db = require('mongodb')
const dblink = "mongodb://localhost:27017"
const MongoClient = db.MongoClient
const assert = require('assert')

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
var test = { name: "Bobby" }
look("Pizza-dude", "People", test)


