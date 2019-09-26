const dbclient = require('../helpers/db')

var collection 
(async () => { collection = await dbclient.collections() })()

module.exports = {
    getById,
    getByCategory
}

async function getById(id) {
    console.log("Looking for productID: ", id)
    return await collection.Products.findOne({ "productId": id })    
}

async function getByCategory(category) {
    console.log("Looking for product category: ", category)
    return await collection.Products.find({ "category": category }).toArray() 
}

