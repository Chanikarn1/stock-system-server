//เป็นส่วนของ model
const mongoose =require('mongoose')
const Schema = mongoose.Schema
const stockSchema = new Schema({
    productName: String,
    price : Number,
    amount:Number,
    sku: String,
    cost: Number
    
},
{ timestamps: true, versionKey: false })

const stockModel = mongoose.model('storeStock',stockSchema)
module.exports = stockModel