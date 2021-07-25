var express = require('express')
var mysql = require('mysql')
const cookieParser= require('cookie-parser')

const router = express.Router()

const options = {
    host: 'us-cdbr-east-02.cleardb.com',
    user: 'b9b001ef539d5b',
    password: '8b36306e',
    database: 'heroku_ea5621dea112dad'
   }

const conn = mysql.createPool(options)
  
router.get("/add-to-cart", (req,res)=>{ 
    const id = req.query.id;
    const user = 41
    conn.query("SELECT * FROM shoppingcart WHERE userId= ? AND productId= ?",[user,id],(err,file)=>{
        if (err) throw err;
        if(file.length === 0){
conn.query("SELECT productId,details,mainimg,sellingprice,color,size,store FROM product WHERE productId='"+id+"'", [user],(err,file)=>{
        if(err) throw err;
        const details =file[0].details;
conn.query("INSERT INTO shoppingcart (userId,productId,details,mainimg,sellingprice,color,size,seller) VALUES (?,?,?,?,?,?,?,?)",
[user,file[0].productId,file[0].details,file[0].mainimg,file[0].sellingprice,file[0].color,file[0].size, file[0].store],(err,files)=>{
    if(err) throw err;
  res.send(`<center><small> Product </small> : <small><b> ${details}</b></small> <br/><br/> <small> successfully added One Item  to Cart</small></center>`)
    })  
})  
        }else{
conn.query("UPDATE shoppingcart SET quantity = quantity+1 WHERE userId=? AND productId=?",[41,id], (err,file)=>{
    if (err) throw err;
    res.send(`<center><small> Product </small> : <small><b> ${details}</b></small> <br/><br/> <small> successfully added and Cart Updated</small></center>`)
})
        }
    })
})

module.exports = router;