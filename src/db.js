var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

/* entr, requirement : at end [ field: "field data" ] examples, : Included, Quotes included */
/* data,  the database [ "Name" ]  Quotes included*/
/* collect, the collection database name [ "Name" ] quotes included */

function look(data, collect, entr, adr) {
    MongoClient.connect(adr, function (err, db) {
        if (err) throw err;
        var dbo = db.db(data);
        dbo.collection(collect).find({ entr }, { projection: { _id: 0 } }).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
        });
    });
}
/* entering - example [name: "Company Inc", address: "Highway 37"]  : included, Quotes included */

function entry(data, collect, entering, adr) {
    MongoClient.connect(adr, function (err, db) {
        if (err) throw err;
        var dbo = db.db(data);
        dbo.collection(collect).insertOne(entering, function (err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });
    });
}

function remove(data, collect, entr, adr) {
    MongoClient.connect(adr, function (err, db) {
        if (err) throw err;
        var dbo = db.db(data);
        var myquery = { entr };
        dbo.collection(collect).deleteOne(myquery, function (err, obj) {
            if (err) throw err;
            console.log("1 document deleted");
            db.close();
        });
    }); 
}


var ent = { name: "Bobby" }
entry("Example", "People", ent, url);