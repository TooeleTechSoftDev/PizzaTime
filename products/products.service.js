const dbclient = require('../helpers/db')
const { checkInput } = require('../helpers/schemas')


let collection 
(async () => { collection = await dbclient.collections() })()

module.exports = {
    getProdById,
    getProdByCategory,
    newProduct,
    changeProduct
}

async function getProdById(id) {
    // console.log("Looking for productId: ", id)
    return await collection.Products.findOne({ "productId": id })    
}

async function getProdByCategory(category) {
    // console.log("Looking for product category: ", category)
    return await collection.Products.find({ "orderType": category }).toArray() 
}

async function newProduct(productData) {
    if (productData.productId)  throw('productId should NOT exist on received data')
    productData.productId = Math.floor(Math.random() * 10000) + 10000;
    // *** verify Id doesn't already exist in database?

    err = checkInput(productData, 'product')
    if (err)  throw(err)

    return await collection.Products.insertOne(productData)
}

async function changeProduct(prodId, productData) {
    // *** Todo: sanitize the data and do security checks here.
    return await collection.Products.updateOne( { "productId": prodId }, { $set: productData })
}
