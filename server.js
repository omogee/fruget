const express = require ('express');
const mysql = require ('mysql')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const session = require('express-session')
const  MySQLStore = require('express-mysql-session')(session);
const cookieParser= require('cookie-parser')
const {check,validationResult}= require('express-validator') 
const Rcustomer = require("./routes/customer");
const Rsearch = require("./routes/search")       
const Rproducts = require("./routes/products")  
const Rdetails = require("./routes/details")  
const path = require("path")         
const cors = require("cors")               
var conn = require("./routes/connection")                
const sockets = require("socket.io");         
const http = require("http") 
//const wss = new webSocket.Server({port:8080,path:"/message"})
   
const app = express();    
app.use(cors());
const server =http.createServer(app)
const io = sockets(server)
const {addUser,removeUser,getTypingUsers,formatMessage,addTypingUser,getreciept,getConnectedUsers} = require("./routes/util");
const verifyToken = require('./routes/validateuser');
 
  
// const sessionStore= new MySQLStore(options);
app.use(cookieParser())
// app.use(cors) 
app.use(session({      
   key: 'session_cookie_name',      
   secret: 'otosh',    
 //  store: sessionStore,         
   resave: false,          
   saveUninitialized: true,      
  cookie:{
   path: '/',
   maxAge: 1000*60*60*24,
  }  
}));          

   io.on('connection', socket => {
    socket.emit('message',`welcome user `);

   socket.on('add user', userId =>{  
   const user = addUser(socket.id, userId)
  const getUsers = getConnectedUsers()
  // io.emit("connected users", getUsers)
  conn.query("update  messages set status = 'delivered' where reciever =? and status =?",[userId,"sent"],(err,inserted)=>{
    if (err) throw err;
    console.log("delivery done",userId)
    io.emit("connected users", getUsers) 
  })         
})        
      
socket.on("read", id => {   
  let sender = getreciept(id.otheruserId)   
  let  reciepter = getreciept(id.userId)
  console.log("sender && reciepter",reciepter,sender)
  if(reciepter){  
  console.log("read report", reciepter.userId, sender.userId)
  conn.query("update  messages set status = 'read' where reciever =? and sender=? and status !=?",[reciepter.userId,sender.userId,"read"],(err,inserted)=>{
    if (err) throw err;
    socket.broadcast.to(sender.id).emit("read report","read")
    console.log("readdddddd done",id)
  })                       
  }                              
  });          
                                                          
  socket.on('send message', data =>{ 
    let message = formatMessage(data.message)
    message["sender"]= data.sender.toString()     
    message["receiver"]= data.reciept          
    message["status"]= "pending"  
    const d = new Date()   
    message["date"] = `${d.getDate()}/${d.getMonth()}/${d.getFullYear()} Tz ${d.getHours() > 12 ? d.getHours() - 12 : d.getHours()}:${d.getMinutes()} ${d.getHours() > 12 ? "pm" : "am"}`
    let reciepter = getreciept(data.reciept)
    console.log("reciepter",reciepter)
  // io.emit("messages", message)   
  socket.emit("messages", message)
                             
  const reciever = data.reciept;     
  const user = data.sender           
  console.log("user",user)                
  console.log("reciever",reciever)    
  //let d = new Date();          
    const currentDate = `${d.getDate()}/${d.getMonth()}/${d.getFullYear()} Tz ${d.getHours() > 12 ? d.getHours() - 12 : d.getHours()}:${d.getMinutes()} ${d.getHours() > 12 ? "pm" : "am"}`   
    const currentTime = d.getTime(); 
    let product = data.product
    let productId,details,generalcategory,category,mainimg,sellingprice;
    for (var i=0; i<product.length; i++){ 
      productId=product[i].productId;      
      details=product[i].details;  
      generalcategory=product[i].generalcategory;
      category=product[i].category;
      mainimg=product[i].mainimg; 
      sellingprice="₦"+product[i].sellingprice;
    }        
    conn.getConnection(function(err, connection) {
    if (err) throw err;
  connection.query("select * from connection where (conn1=? AND conn2=?) OR (conn1=? AND conn2=?)",[reciever,user,user,reciever],(err,connId)=>{
   if (err) throw err;
  // let possibleConn = connId[0].connectionId
    if(connId[0] !== undefined && connId[0].connectionId){
  connection.query("insert into messages (connectionId,message,sender,reciever,date,time,status) values (?,?,?,?,?,?,?)",[connId[0].connectionId,data.message,user,reciever,currentDate,currentTime,"sent"],(err,messages)=>{
            if (err) throw err;
            if(messages){
      if(reciepter){     
        socket.broadcast.to(reciepter.id).emit("recieve message", message)  
         }else{
          let sender = getreciept(message.sender)
          if(sender){ 
          socket.emit("sent report", message)
        }              
      }    
      
    }
 if(product.length > 0 && product !== undefined ){
   connection.query("update  messages set refproductId=?,refdetails=?,refgencategory=?,refcategory=?,refmainimg=?,refprice=? where messagesId =?",[productId,details,generalcategory,category,mainimg,sellingprice,messages.insertId],(err,inserted)=>{
    if (err) throw err;
    
   })             
    }  
     connection.release()   
      console.log("done, its not empty") 
        })                       
      }else{         
        connection.query("insert into connection (`conn1`, `conn2`) values (?,?)",[user,reciever],(err,connected)=>{
            if (err) throw err;
        })
      connection.query("select connectionId from connection where (conn1=? AND conn2=?) OR (conn1=? AND conn2=?)",[reciever,user,user,reciever],(err,newconnectionId)=>{
                if (err) throw err;          
       connection.query("insert into messages (connectionId,text,sender,reciever,date,time,status) values (?,?,?,?,?,?,?)",[newconnectionId[0].connectionId,data.message,user,reciever,currentDate,currentTime,"sent"],(err,messages)=>{
                if (err) throw err;
                if(messages){
                if(reciepter){     
                  socket.broadcast.to(reciepter.id).emit("recieve message", message)  
                  console.log("broadcasting...")
                   }else{
                    let sender = getreciept(message.sender)
                    if(sender){ 
                    socket.emit("sent report", message)
                    console.log("sending...")
                  }              
                }    
              }       
       if(product.length > 0 && product !== undefined ){
        connection.query("update  messages set refproductId=?,refdetails=?,refgencategory=?,refcategory=?,refmainimg=?,refprice=? where messagesId =?",[productId,details,generalcategory,category,mainimg,sellingprice,messages.insertId],(err,inserted)=>{
            if (err) throw err;
           })                             
            }
                connection.release()
                    
        })  
    })
      } 
})  
})

  }) 

  socket.on('delivered', message =>{
    let sender = getreciept(message.sender)
    let receiver = getreciept(message.receiver)
    if(receiver){
      conn.query("update  messages set status = 'delivered' where reciever =? and status=?",[receiver.userId,"sent"],(err,inserted)=>{
        if (err) throw err;
        socket.broadcast.to(sender.id).emit("delivery report", message)
        console.log("delivery done")
      }) 
    console.log("delivery done",message)
  }      
  })    
  socket.on('untyping', (data) => {
    const reciept = getreciept(data.reciept)
    const sender = getreciept(data.sender)
  //  socket.emit('untyping client',data.reciept); 
   if(reciept !== undefined){
    socket.broadcast.to(reciept.id).emit('untyping client',data.sender); 
   }else{ 
     console.log("no such user")
   }            
   });                         
  
   socket.on('change color', (data) => {       
    const color = data.color;  
    const user = data.userId;        
  let userIdentity = user.user["userId"]
    conn.query("update user set background =? WHERE userId=?", [color,userIdentity], (err,file)=>{
    if(err) throw err; 
    conn.query("select * from user WHERE userId=?", [userIdentity], (err,user)=>{
      if(err) throw err;                 
 //    res.send(file)            
 socket.emit("user details", user)          
    })          
    })                    
  });                              
                               
socket.on('typing', (data) => {   
  const reciept = getreciept(data.reciept)
 const sender = getreciept(data.sender)  
 // socket.emit('typing client',data.reciept);    
 if(reciept !== undefined){
  socket.broadcast.to(reciept.id).emit('typing client',data.sender); 
}else{
   console.log("no such user")       
 }                            
 });                          

  socket.on('disconnect', () => { 
    console.log('A client just left'); 
    const userleaving = removeUser(socket.id); 
     io.emit('message',"bye user");
     const d = new Date();  
     const lastseen = d.getTime();  
     if(userleaving !== undefined){
       let lastseens ={id:userleaving.userId,time:lastseen}
      conn.query("update user set lastseen =?, userStatus =? where userId =?",[lastseen,"offline",userleaving.userId],(err,update)=>{
        if (err) throw err;
        console.log("done")
    io.emit('message',`${userleaving !== undefined ? userleaving.userId : null} just left at ${lastseen}`);
      const getUsers = getConnectedUsers()
     
      io.emit("connected users", getUsers) 
      io.emit("last seens",lastseens)
      }) 
    }   
     });                     
  });                 
                               
app.use(bodyParser.urlencoded({extended: true}))  
app.use(bodyParser.json())   
 app.use('/customer',Rcustomer);  
 app.use('/search',Rsearch);
 app.use('/products',Rproducts); 
 app.use("/details",Rdetails)  
  
app.get('/suggestions/suggestion',(req,res)=>{ 
    conn.query('SELECT brand,generalcategory,category,subcat1,subcat2,mainimg,details FROM product',(err,files)=>{
app.get('/suggestions/suggestion',(req,res)=>{ 
    conn.query('SELECT brand,subcat1,subcat2,subcat3,mainimg,details FROM product',(err,files)=>{
        if (err) throw err;
        res.send(files)  
    }) 
}) 

    })
  })
if(process.env.NODE_ENV === "production"){ 
app.use(express.static("ogbmain/build"))

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname, 'ogbmain','build', 'index.html'));
})
}  
app.get("/",(req,res)=>{
  conn.query('SELECT * FROM user',(err,files)=>{
    if (err) throw err;
    res.send(files)  
}) 
})

/*
app.get('/',(req,res)=>{
  res.send(req.session)
})
app.get('/get',(req,res)=>{
    res.send(req.session.token);
})
*/
const port = process.env.PORT || 5000;   
server.listen(port, ()=>{   
  console.log('connected on 5000 expected')
})