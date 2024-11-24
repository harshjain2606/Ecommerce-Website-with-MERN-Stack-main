const products = require('../data/products.json')
const Product = require('../models/productModel')
const dotenv = require('dotenv')
const path = require('path')
const connectDatabase = require('../config/database')

dotenv.config({path:path.join(__dirname,"..","config/configuration.env")})
connectDatabase()

const sendProducts=async()=>{
    try{
        await Product.deleteMany();
        console.log("products deleted!")
        
        await Product.insertMany(products)
        console.log("All products Inserted")
        process.exit()
    }
    catch(err){
        console.log(err.message)
        
    }
}
sendProducts();