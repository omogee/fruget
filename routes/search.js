var express = require('express');
var conn = require('./connection'); 
const verifyToken = require('./validateuser');
const router = express.Router()  
 
/*
 multer collects two parameters which are destination to be stored in the server and the name to give the intending file.
 const storage =()=>{
     destination: (req,file,cb)=>{
         cb(null ,"/uploads")
     }
     filename:(req,file,cb)=>{
         cb(null, date.now()+file.originalPathname)
     }
 }
 const FileFilter =(req,file,cb)=>{
     if(file.memetype === "image/png"){
         cb(null) 
     }else{
         cb("error: this file type is not allowed here")
     }
     if(filesi)
 }
 multer.uploads()=>{
     storage,
     filfilter,
    
 }
*/

 router.get('/items/search', (req,res) =>{   
    const search = req.query.search; 
    
    conn.query("UPDATE product SET rating =(select rating) + 1,searchrating=(select searchrating)+1 WHERE details LIKE '%"+search+"%'", (err,done)=>{
        if (err) throw err;
        console.log(done)
    })
    conn.query("SELECT MAX(sellingprice) as highestprice,MIN(sellingprice) as lowestprice FROM product  WHERE details LIKE '%"+search+"%'",(err,filem)=>{
        if (err) throw err;
        let min =  req.query.min || filem[0].lowestprice
    var max = req.query.max || filem[0].highestprice
    if(min === "undefined"|| min === undefined || min === null){
        min = filem[0].lowestprice
    } 
    if(max === "undefined" || max === undefined || max === null){
        max = filem[0].highestprice
    } 
    let pagee = req.query.page || 1;  
    if(pagee === "undefined" || pagee === undefined || pagee === null){
        pagee = 1
    } 
    const mainpage = parseInt(pagee)
const skips = (mainpage-1)*20;         
var currentPage = parseInt(req.query.page) 
var numPerPage =20;
    if(req.query.brand !== "undefined"  || req.query.vendor !== "undefined"  || req.query.inches !== "undefined"  ||  req.query.litres !== "undefined"  ||  req.query.colour !== "undefined"){litres
 var brands = req.query.brand
    var inches = req.query.inches 
    var litres = req.query.litres 
        var colors = req.query.colour
        var vendors = req.query.vendor
  
    brands= JSON.stringify(brands.split(",")).toString()
   inches= JSON.stringify(inches.split(",")).toString()
  litres= JSON.stringify(litres.split(",")).toString() 
    colors= JSON.stringify(colors.split(",")).toString()
    vendors= JSON.stringify(vendors.split(",")).toString()

    var brandno = brands.split(",").toString().length
    var inchesno = inches.split(",").toString().length
    var litresno = litres.split(",").toString().length
    var colorno = colors.split(",").toString().length 
    var vendorno = vendors.split(",").toString().length 

    brands = brands.slice(1,brandno-1)  
    inches = inches.slice(1,inchesno-1) 
    litres = litres.slice(1,litresno-1)  
    colors = colors.slice(1,colorno-1) 
    vendors = vendors.slice(1,vendorno-1) 

    let sort = req.query.sort;

    let gun = req.query.gun
    let q = req.query.gun
   
    let orderby=""
    let orderbyvalues ="" 
    
    console.log("q", req.query.gun)    

    switch (q){ 
        case "color":
            orderbyvalues= colors
            break;
            case "inches": 
            orderbyvalues = inches
            break;
            case "litres": 
            orderbyvalues = litres
            break;
            case "brand":
            orderbyvalues = brands    
            break;
            case "vendor":
                orderbyvalues = vendors
                q="store";
                break;
            default:
             q="brand"
            orderbyvalues = brands     
            break;   
      }
   

    switch (sort){
        case "low-high":
            sorter = "sellingprice"
            setting= "ASC"
            break;
            case "high-low":
            sorter = "sellingprice"
            setting= "DESC"
            break;
            case "cust-rating":
            sorter = "customerRating"
            setting= "ASC"
            break;
            case "warranty":
            sorter = "warranty"
            setting= "ASC"
            break;
            default:   
            setting="DESC"
            sorter= `FIELD(${q || "brand"},${orderbyvalues})`
            console.log(sorter)
            break;  
    }

    
    conn.query("SELECT COUNT(*) AS numOfRows FROM product WHERE (brand IN ("+brands+") OR inches IN ("+inches+") OR litres IN ("+litres+") OR color IN ("+colors+")) AND details LIKE '%"+search+"%'  AND (sellingprice >= '"+min+"' AND sellingprice <= '"+max+"')", (err, nofile)=>{
        if (err) throw err;
        const numOfRows = nofile[0].numOfRows;
        const numPages = Math.ceil(numOfRows/20)
/*
    const numOfRows = nofile[0].numOfRows;
    const numPages = Math.ceil(numOfRows/20)
    const pagee = parseInt(req.query.page) || 1; 
const mainpage = pagee - 1;
const skips = mainpage*20;
console.log(skips)
var currentPage = parseInt(req.query.page)
var numPerPage =20;
*/
    conn.query("SELECT *,CONCAT('₦', FORMAT(sellingprice, 0)) AS mainprice FROM product INNER JOIN product_rating using (productId) WHERE (brand IN ("+brands+") OR inches IN ("+inches+") OR litres IN ("+litres+")  OR color IN ("+colors+")) AND details LIKE '%"+search+"%' AND (sellingprice >= '"+min+"' AND sellingprice <= '"+max+"') ORDER BY "+sorter+" "+setting+" LIMIT ? OFFSET ?",[numPerPage, skips],(err,files)=>{
        if (err) throw err;
        files.map(file => { 
    file["authur"] = "Eze... Ogbonnaya..."
            if(file.productrating){      
                file["authur"] = "Eze... Ogbonnaya..."
                const prating =JSON.parse(file.productrating); 
                const mainrating =[];
                for (var i=0; i<Object.values(prating).length; i++){
                 mainrating.push(parseInt(Object.values(prating)[i][0]))
              }
                   const reducer = (a,b) => (a+b)
                   const prating2 =mainrating.map(pratings => pratings*20)
               //    console.log( Object.values(prating2).reduce(reducer)/Object.keys(prating).length)
                   file["numOfRating"] = Object.keys(prating).length
                   if(Object.values(prating).length > 0){
                       file["percentrating"] = Object.values(prating2).reduce(reducer)/Object.keys(prating).length
                   }
                  else{
                     file["percentrating"] = 0
                  }
                     }

        })
        console.log("fetching",numOfRows)
        res.json({files,numPages,currentPage,numOfRows})
    })  
})
}else{    
conn.query("SELECT COUNT(*) AS numOfRows FROM product WHERE details LIKE '%"+search+"%' AND (sellingprice >= '"+min+"' AND sellingprice <= '"+max+"')", (err, nofile)=>{
    if (err) throw err;
    const numOfRows = nofile[0].numOfRows;
    const numPages = Math.ceil(numOfRows/20)
    let sort = req.query.sort;
    switch (sort){
        case "low-high":
            sorter = "sellingprice"
            setting= "ASC"
            break;
            case "high-low":
            sorter = "sellingprice"
            setting= "DESC"
            break;
            case "cust-rating":
            sorter = "customerRating"
            setting= "ASC"
            break;
            case "warranty":
            sorter = "warranty"
            setting= "ASC"
            break;
            default:
            sorter = "rating"
            setting="ASC"
            break;
    }
   
conn.query("SELECT *,CONCAT('₦', FORMAT(sellingprice, 0)) AS mainprice FROM product INNER JOIN product_rating using (productId) WHERE details LIKE '%"+search+"%' AND sellingprice >= '"+min+"' AND sellingprice <= '"+max+"' ORDER BY "+sorter+" "+setting+" LIMIT ? OFFSET ?",[numPerPage, skips],(err,files)=>{
    if (err) throw err;
    files.map(file => { 
        file["authur"] = "Eze... Ogbonnaya..."
        console.log("prating",file.productrating)
        if(file.productrating){      
            file["authur"] = "....Eze... Ogbonnaya..."
           
          const prating =JSON.parse(file.productrating)
            const mainrating =[]; 
             for (var i=0; i<Object.values(prating).length; i++){
             mainrating.push(parseInt(Object.values(prating)[i][0]))
          } 
              const reducer = (a,b) => (a+b)
                const prating2 =mainrating.map(pratings => pratings*20)
            //    console.log( Object.values(prating2).reduce(reducer)/Object.keys(prating).length)
              file["numOfRating"] = Object.keys(prating).length
               if(Object.values(prating).length > 0){
                file["percentrating"] = Object.values(prating2).reduce(reducer)/Object.keys(prating).length
               } 
           else{
                 file["percentrating"] = 0
              }   
             }    
          // <Link to ={`/product/${product.details}`} style={{color:'black',display:`${this.state.griddetails}`}}>
          //         <Link to ={`/product/${product.details}`} style={{color:'black',display:`${this.state.listdetails}`}}>
     //<ModalSideNavbar/> put back in app.js
        }) 
        console.log("fetching",numOfRows)
    res.json({files,numPages,currentPage,numOfRows})
}) 
})  
}   
})    
 })

router.post('/search', (req,res)=>{
     const search = JSON.parse(req.body.data);
conn.query("SELECT COUNT(*) AS numOfRows from product WHERE details LIKE '%"+search+"%'", (err, nofile)=>{
    if (err) throw err;
    const numOfRows = nofile[0].numOfRows;
    const numPages = Math.ceil(numOfRows/20);
    const pagee = parseInt(req.body.page) || 1; 
    const mainpage = pagee - 1;
    const skips = mainpage*20;
    var currentPage = parseInt(req.body.page) || 1;
    var numPerPage =20;
    console.log(numOfRows)
    conn.query("SELECT *,CONCAT('₦', FORMAT(sellingprice, 0)) AS mainprice FROM product INNER JOIN product_rating using (productId) WHERE details LIKE '%"+search+"%' LIMIT ? OFFSET ?",[numPerPage, skips],(err,files)=>{
        if (err) throw err;  
        files.map(file => {    
            file["authurrr"] = "Eze..... Ogbonnaya"
            if(file.productrating){      
                file["authur"] = "Eze Okereke"
                const prating =JSON.parse(file.productrating);
                const mainrating =[];
                for (var i=0; i<Object.values(prating).length; i++){
                 mainrating.push(parseInt(Object.values(prating)[i][0]))
              }
                   const reducer = (a,b) => (a+b)
                   const prating2 =mainrating.map(pratings => pratings*20)
               //    console.log( Object.values(prating2).reduce(reducer)/Object.keys(prating).length)
                   file["numOfRating"] = Object.keys(prating).length
                   if(Object.values(prating).length > 0){
                       file["percentrating"] = Object.values(prating2).reduce(reducer)/Object.keys(prating).length
                   }
                  else{
                     file["percentrating"] = 0
                  }
                     }
          
        })
        res.json({files,numPages,currentPage,numOfRows})
    }) 
})   
})  

router.get('/items/searchbrand', (req,res)=>{
    const search = req.query.search   
    var brands = req.query.brand 
    if(brands !== "undefined"){
        brands= JSON.stringify(brands.split(",").reverse()).toString()
        var brandno = brands.split(",").toString().length
        brands = brands.slice(1,brandno-1)
   conn.query("select  brand, COUNT(brand) as brandy  from product where  details LIKE '%"+search+"%' group by brand ORDER by FIELD(brand,"+brands+") DESC",(err,files)=>{
    if (err) throw err;
       res.send(files)
   })
}else{
    conn.query("select  brand, COUNT(brand) as brandy  from product where  details LIKE '%"+search+"%' group by brand ORDER by brandy ASC",(err,files)=>{
        if (err) throw err;
        res.send(files)
    })
}
})
router.get('/items/searchcolour', (req,res)=>{
    const search = req.query.search;
    var brands = req.query.brand 
    var sizes = req.query.size
    var colors = req.query.colour
    console.log(colors)
    var category = req.params.category
    brands= JSON.stringify(brands.split(",")).toString()
    sizes= JSON.stringify(sizes.split(",")).toString()
    colors= JSON.stringify(colors.split(",").reverse()).toString()
    var brandno = brands.split(",").toString().length
    var sizeno = sizes.split(",").toString().length
    var colorno = colors.split(",").toString().length
    brands = brands.slice(1,brandno-1)
    sizes = sizes.slice(1,sizeno-1)
    colors = colors.slice(1,colorno-1)
   conn.query("select  color, COUNT(color) as colory  from product where  details LIKE '%"+search+"%' group by color ORDER by FIELD(color,"+colors+") DESC",(err,files)=>{
    if (err) throw err;
       res.send(files)
   })
})


router.get('/items/searchvendor', (req,res)=>{
    const search = req.query.search;
    var vendor = req.query.vendor 
    if(vendor){
    vendor= JSON.stringify(vendor.split(",").reverse()).toString()
    var vendorno = vendor.split(",").toString().length
    vendor = vendor.slice(1,vendorno-1)
   conn.query("select  store, COUNT(store) as storey  from product where  details LIKE '%"+search+"%' group by store ORDER by FIELD(store,"+vendor+") DESC",(err,files)=>{
    if (err) throw err;
    console.log("vendors",files)
       res.send(files)
   }) 
}
else{
    conn.query("select  store, COUNT(store) as storey  from product where  details LIKE '%"+search+"%' group by store",(err,files)=>{ 
        if (err) throw err;
        console.log("vendors",files)
        res.send(files)
})
}
})

router.get('/items/searchsize', (req,res)=>{
    const search = req.query.search;
    var brands = req.query.brand 
    var sizes = req.query.size
    var colors = req.query.colour
    console.log(colors)
    let litres=req.query.selectedLitres
    let inches=req.query.selectedInches 
     inches= inches.split(",").reverse()
     litres= litres.split(",").reverse()
       inches= JSON.stringify(inches).toString()
       litres= JSON.stringify(litres).toString()
       var inchno = inches.split(",").toString().length
       var litreno = litres.split(",").toString().length
       inches = inches.slice(1,inchno-1)
       litres = litres.slice(1,litreno-1)   
  /* conn.query("SELECT DISTINCT size FROM product WHERE details LIKE '%"+search+"%'  ORDER by FIELD(size,"+sizes+") DESC",(err,files)=>{
       if (err) throw err;    
       res.send(files)  
*/
       conn.getConnection(function(err, connection) {
        if (err) throw err;
      connection.query("select  inches, COUNT(inches) as inchesy  from product  where details LIKE '%"+search+"%' group by inches ORDER by FIELD(inches,"+inches+") DESC",(err,inches)=>{
          if (err) throw err;
      connection.query("select  litres, COUNT(litres) as litresy  from product where  details LIKE '%"+search+"%' group by litres ORDER by FIELD(litres,"+litres+") DESC",(err,litres)=>{
            if (err) throw err;  
 connection.query("select  wattage, COUNT(wattage) as wattagey  from product where  details LIKE '%"+search+"%' group by wattage ",(err,wattage)=>{
                if (err) throw err;   
          connection.release()
          res.json({inches,litres,wattage})
 })

    }) 
})
    })
   })   

router.post('/searchbrand', (req,res)=>{
    const search = JSON.parse(req.body.data); 
   conn.query("SELECT DISTINCT brand FROM product WHERE details LIKE '%"+search+"%'",(err,files)=>{
       if (err) throw err;
       res.send(files)
   })
})
router.post('/searchcolour', (req,res)=>{
    const search = JSON.parse(req.body.data);
   conn.query("SELECT DISTINCT color FROM product WHERE details LIKE '%"+search+"%'",(err,files)=>{
       if (err) throw err;
       res.send(files)
   })
})
router.post('/searchsize', (req,res)=>{
    const search = JSON.parse(req.body.data);
   conn.query("SELECT DISTINCT size FROM product WHERE details LIKE '%"+search+"%'",(err,files)=>{
       if (err) throw err;
       res.send(files)
   })
})


router.get('/category/searched/price', (req,res)=>{
    const search = req.query.search;
    var brands = req.query.brand 
    var sizes = req.query.size
    var colors = req.query.colour
    brands= JSON.stringify(brands.split(",")).toString()
    sizes= JSON.stringify(sizes.split(",")).toString()
    colors= JSON.stringify(colors.split(",")).toString()
    var brandno = brands.split(",").toString().length
    var sizeno = sizes.split(",").toString().length
    var colorno = colors.split(",").toString().length
    brands = brands.slice(1,brandno-1)
    sizes = sizes.slice(1,sizeno-1)
    colors = colors.slice(1,colorno-1)
   conn.query("SELECT MAX(sellingprice) as highestprice,MIN(sellingprice) as lowestprice FROM product  WHERE details LIKE '%"+search+"%' OR brand IN ("+brands+") OR size IN ("+sizes+") OR color IN ("+colors+") ORDER BY FIELD(brand, "+brands+")",(err,file)=>{
       if (err) throw err;
       console.log(file)
       res.send(file)
   })
})
   
router.post('/connection/chat/message',verifyToken, (req,res)=>{
    const data = JSON.parse(req.body.data)
  const message = data.message;
  const productId = data.productId;
  const reciever = data.reciever;
  const userIdentity = req.user
  const user = userIdentity.user["userId"]
  console.log("user",user)
  console.log("reciever",reciever)
  let d = new Date();       
  let time = d.getTime();

  var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  var months = ['January','February','March','April','May','June','July','August','September','October','November','December']; 
 let currentDay = `${days[d.getDay()]} ${d.getDate()}${d.getDate() === 22 || d.getDate() === 22 ? "nd" : d.getDate() === 3 || d.getDate()===23 ? "rd" : "th" } of ${months[d.getMonth()]}  ${d.getFullYear()}`
   
    const currentDate = `${d.getDate()}/${d.getMonth()}/${d.getFullYear()} Tz ${d.getHours() > 12 ? d.getHours() - 12 : d.getHours()}:${d.getMinutes()} ${d.getHours() > 12 ? "pm" : "am"}`   
    const currentTime = d.getTime(); 
    conn.getConnection(function(err, connection) {
    if (err) throw err;
    connection.query("select * from product where productId =?",[productId],(err,product)=>{
        if (err) throw err;
  connection.query("select * from connection where (conn1=? AND conn2=?) OR (conn1=? AND conn2=?)",[reciever,user,user,reciever],(err,connId)=>{
   if (err) throw err;
  // let possibleConn = connId[0].connectionId
    if(connId[0] !== undefined && connId[0].connectionId){
  connection.query("insert into messages (connectionId,text,sender,reciever,date,time,status) values (?,?,?,?,?,?,?)",[connId[0].connectionId,message,user,reciever,currentDate,currentTime,"sent"],(err,messages)=>{
            if (err) throw err;
            if(product[0] !== undefined ){
   connection.query("update  messages set refproductId=?,refdetails=?,refgencategory=?,refcategory=?,refmainimg=?,refprice=? where messagesId =?",[product[0].productId,product[0].details,product[0].generalcategory,product[0].category,product[0].mainimg,"₦"+product[0].sellingprice,messages.insertId],(err,inserted)=>{
    if (err) throw err;
   })            
            }
            connection.release()
            res.send("its not empty")
        })                       
      }else{         
        connection.query("insert into connection (`conn1`, `conn2`, date,time) values (?,?,?,?)",[user,reciever,currentDay, currentTime],(err,connected)=>{
            if (err) throw err;
        })
      connection.query("select connectionId from connection where (conn1=? AND conn2=?) OR (conn1=? AND conn2=?)",[reciever,user,user,reciever],(err,newconnectionId)=>{
                if (err) throw err;          
       connection.query("insert into messages (connectionId,text,sender,reciever,date,time,status) values (?,?,?,?,?,?,?)",[newconnectionId[0].connectionId,message,user,reciever,currentDate,currentTime,"sent"],(err,messages)=>{
                if (err) throw err;
       if(product[0] !== undefined ){
        connection.query("update  messages set refproductId=?,refdetails=?,refgencategory=?,refcategory=?,refmainimg=?,refprice=? where messagesId =?",[product[0].productId,product[0].details,product[0].generalcategory,product[0].category,product[0].mainimg,"₦"+product[0].sellingprice,messages.insertId],(err,inserted)=>{
            if (err) throw err;
           })                             
            }
                connection.release()
                console.log(messages)
                res.send("its empty")
                
        })  
    })
      } 
})
})
})
})
//rating
router.get('/fetch/chat/message',verifyToken, (req,res)=>{
    const reciever = req.query.otheruserId;
    const userIdentity = req.user
  const user = userIdentity.user["userId"]
    conn.getConnection((err, connection) => {      
        if (err) throw err
      
        connection.query("update messages set status = 'read' WHERE reciever=?", [user], (err, secondparty)=>{
            if (err) throw err;
        })
            connection.query("SELECT * from connection WHERE (conn1=? AND conn2=?) OR (conn1=? AND conn2=?)",[reciever,user,user,reciever], (err, connected)=>{
                if (err) throw err      
                if(connected[0] === undefined ){
                    console.log("its empty") 
                    res.send({messages:[]})   
                }else{
 connection.query("SELECT * from messages  WHERE (messages.sender=? AND messages.reciever=?) OR (messages.sender=? AND messages.reciever=?)",[reciever,user,user,reciever], (err, messages)=>{
                        if (err) throw err  
                        console.log("its not empty")
                        res.json({messages})
                    })  
                }         
    })
})
})

router.get('/fetch/connected/clients',verifyToken, (req,res)=>{
    const userId = req.query.userId;
    const userIdentity = req.user
  const user = userIdentity.user["userId"]
    conn.getConnection((err, connection) => {      
        if (err) throw err
            connection.query("SELECT * from connection where conn1 =? OR conn2=?",[userId,userId], (err, connections)=>{
                if (err) throw err     
                const connectors = []
     for(var i=0; i<connections.length; i++){
    if(connections[i].conn1 === userId){
        connectors.push(connections[i].conn2.toString())
    }else if(connections[i].conn2 === userId){
        connectors.push(connections[i].conn1.toString())
    } 
     }
     //,* from messages inner join connection using (connectionId) inner join user on ((user.userId !=221) and (user.userId = connection.conn1 or  user.userId =connection.conn2)) where (messages.sender=221 or messages.reciever=221) group by connection.connectionId 
     //SELECT * from messages inner join connection where messages.sender =221 or messages.reciever = 221 group by messages.connectionId order by messages.time desc 
     let connectedusers = connectors.join(",")
     //"SELECT * from user where userId IN ("+connectedusers+")
connection.query("SELECT * FROM messages inner join user on (user.userId !=? and (messages.sender = user.userId or messages.reciever=user.userId)) WHERE messagesId IN (SELECT MAX(messagesId) FROM messages GROUP BY connectionId) and (sender=? or reciever=?) order by messagesId desc",[user,user,user], (err, users)=>{
        if (err) throw err  
      res.send(users)    
})     
})    
})      
})    
module.exports = router;
//select *,sum(case when t1.status='sent' or t1.status='delivered' then 1 else 0 end) as noOfunread from (select * from messages where (messages.sender=? or messages.reciever=?) order by time desc ) as t1 inner join user on ((user.userId != ?) and (user.userId = t1.sender or  user.userId =t1.reciever)) group by connectionId
//select *,sum(case when t1.status='sent' or t1.status='delivered' then 1 else 0 end) as noOfunread from (select * from messages where (messages.sender=221 or messages.reciever=221) order by time desc ) as t1 inner join user on ((user.userId != 221) and (user.userId = t1.sender or  user.userId =t1.reciever)) group by connectionId
//select *,sum(case when messages.status="sent" or messages.status="delivered" then 1 else 0 end) as noOfunread from messages inner join connection using (connectionId) inner join user on ((user.userId !=221) and (user.userId = connection.conn1 or  user.userId =connection.conn2)) where (messages.sender=221 or messages.reciever=221) group by connection.connectionId 
//select *,sum(case when messages.status='sent' then 1 else 0 end) as noOfunread from messages inner join connection using (connectionId) inner join user on ((user.userId !=221) and (user.userId = connection.conn1 or  user.userId =connection.conn2)) where (messages.sender=221 or messages.reciever=221 or connection.connectionId=(select max(connection.connectionId) from connection)) group by connection.connectionId order by messages.time desc
