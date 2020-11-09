let products = require('../data/products.json');
const { v4: uuidv4 } = require('uuid');

const {writeDataToFile} = require('../util/file_read_data.js');

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
};

function findAll() {
    return new Promise((resolve, reject) => {
        resolve(products)
    })
};


function findById(id){
    return new Promise((resolve, reject) => {
        // returns result if id present in database
        // find returns the value of the first element in an array that passes the test (function)
        const product = products.find((p)=>{
            return p.id === id
        })
        // If not found, returns undefined
        resolve(product)
    })
}

function create(product){
    return new Promise ((resolve,reject)=>{
        // ... is a spread operator which will take each key object in function parameter and will spread them across 'product' below. - basically takes all the contents in an object and puts them in another object.
        // ... spreads out items within an array/object.
        // uuid generates a random id.
        const newProduct = {id:uuidv4(),...product}

        // This appends new object to the products array from the database array.
        products.push(newProduct)
        // This writes the new product to file.
        writeDataToFile('./data/products.json',products)
        resolve(newProduct)
    }) 
}

function update(id,product){
    return new Promise ((resolve,reject)=>{
        const index = products.findIndex((p)=>{
            return p.id === id
        });
        products[index] = {id, ...product};
        writeDataToFile('./data/products.json',products)
        resolve(products[index])
    }) 
}

function remove(id,product){
    return new Promise ((resolve,reject)=>{
        // Filter creates an array filled with elemets that do not pass the test - in this case, it recreates the array of objects, leaving out the deleted object.
        products = products.filter((p)=>{
            return p.id!==id
        });
        console.log(products);
        writeDataToFile('./data/products.json',products)
        resolve()
    }) 
}
