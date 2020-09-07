const express= require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
var cors = require('cors');

const storeStock = require('./models/stock')
const app = express()


//รับค่า port
const PORT = process.env.PORT || 8080
app.use(bodyParser.json());
app.use(cors());
console.log("dfdgd")
mongoose.connect('mongodb://localhost:27017/node-stock-api', { useNewUrlParser: true })
const stock = [{
    name : "a",
    price :400
}]

app.get('/stocks',async (req,res)=>{
    // res.json({
    //     message: 'Ahoy!',
      
    //   })
   const stocks = await storeStock.find({})
   res.json(stocks)

})
app.get('/stocks/:id',async (req,res)=>{
    const {id} = req.params
    const product = await storeStock.findById(id)
    res.json(product)
   

})

app.post('/stocks',async (req,res)=>{
    // const {id} = req.params
    const payload = req.body
    const stocks = new storeStock(payload)
    await stocks .save()
    res.status(201).end()
})
app.put('/stocks/:id',async (req,res) => {
    const {id} =req.params
    const payload = req.body
    const stocks =await storeStock.findByIdAndUpdate(id,{$set:payload})
    res.json(stocks)

})
app.delete('/stocks/:id',async (req,res)=>{
    const {id} = req.params
    await storeStock.findByIdAndDelete(id)
    res.status(204).end()
})

//run web server ที่เราสร้างไว้ โดยใช้ PORT ที่เรากำหนดไว้ในตัวแปร PORT
app.listen(PORT, () => {
    //หากทำการ run server สำเร็จ ให้แสดงข้อความนี้ใน cmd หรือ terminal
    console.log(`Server is running on port : ${PORT}`)
})

module.exports = app