const dbclient = require('../helpers/db')
const { checkInput, getSchemas } = require('../helpers/schemas')
const productServices = require('../products/products.service.js')
const accountServices = require('../accounts/accounts.service.js')
//const orders = require('../orders/orders.service.js')


let collection 
(async () => { collection = await dbclient.collections() })()

// let schemas

async function init() {
    let schemas = await getSchemas()
    console.log(schemas.product.examples)
    process.exit(0)
}
init()  // can't use iife pattern with async function, apparently, but this works just as well


// read examples from schemas

// use services functions to post them to the db, and check if they succeeded

// close db connection when done so it doesn't stay running