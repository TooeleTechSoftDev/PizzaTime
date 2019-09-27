const dbclient = require('../helpers/db')
const { getSchemas } = require('../helpers/schemas')
const productServices = require('../products/products.service.js')
const accountServices = require('../accounts/accounts.service.js')
const orderServices = require('../orders/orders.service.js')
//const orders = require('../orders/orders.service.js')


let collection 
(async () => { collection = await dbclient.collections() })()

// let schemas

async function init() {
    let schemas = await getSchemas()  // don't catch error and it should barf, like we want

    schemas.custAccount.examples.forEach(async obj => {
        await accountServices.newAccount(obj)
        .catch(err => {
            console.log('=== err: ', err)
            process.exit(-1)
        })
        console.log(`${obj.username} was inserted into account db successfully`)
    })

    schemas.product.examples.forEach(async obj => {
        await productServices.newProduct(obj)
        .catch(err => {
            console.log('=== err: ', err)
            process.exit(-1)
        })
        console.log(`${obj.name} was inserted into product db successfully`)
    })
    
    // schemas.order.examples.forEach(async obj => {
    //     await orderServices.newAccount(obj)
    //     .catch(err => {
    //         console.log('=== err: ', err)
    //         process.exit(-1)
    //     })
    //     console.log(`an order with accountId of ${obj.accountId} was inserted into order db successfully`)
    // })
    console.log("=== done ===")  // to see if this is reached before everything is inserted, which it is
}

init()  // can't use iife pattern with async function, apparently, but this works
// .then( () => {
//     process.exit(0)
// })
