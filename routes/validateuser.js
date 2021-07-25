const express = require ("express")
const jwt = require("jsonwebtoken");
var conn = require("./connection")
const router = express.Router()
  

function verifyToken(req,res,next){
   // { headers: {"Authorization" : `Markaranter ${Cookies.get("token")}`,"markaranterTwo":mainToken,"navigation":JSON.stringify(na
   const secret = "1ca6a75462ed832b6e1a713c483df9c3ae4ae3a5aebcbdcab919c4272f442ab0b11b2ce480402e7ea26c0c930d2ce063fab8d7b9ed58f09b4a8a8863e3509d8e";
   const bearerHead = req.headers["authorization"]
    const bearerNav = req.headers["navigation"]
console.log("bearerHead", JSON.stringify(bearerHead))
    /**
     *   const bearerMyToken = bearerHead && bearerHead.split(" ")[2];
    let bearer = bearerHead ? bearerHead.split(" ")[1] : null;
     */
   // const bearerHeader = bearerHead  ? bearerHead.split(" ")[2] : null
    let bearer = bearerHead ? bearerHead.split(" ")[1] : null;
   console.log("bearer", bearer)
    console.log(req.session)     
    if (bearerHead === null || bearerHead === undefined || bearer === "undefined"){
       console.log("no bearer header")
       return res.status(403).send({error: "you are not authorized to view this page because bearer is undefined"})
    }    
   else if (bearer === null || bearer === undefined || bearer === "undefined"){
        console.log("no bearer token")
        return res.status(403).send({error:"you are not authorized to access this page because token is null"});
     }  
   else{
    jwt.verify(bearer, secret, (err, isAuthUser)=>{
        if (err){
           console.log(err)
        return res.status(403).send({error:`you are not authorized to access this page because jwt could not recognize you with ${bearer}`})
        }     
       
        const user= isAuthUser.user.userId
        console.log(isAuthUser.user.userId)
       conn.getConnection(function(err, connection) { 
           if (err) console.log(err); // not connected!    
           connection.query ("SELECT * FROM user WHERE userId = ? ",[user],(err,navigater)=>{
            if (err){
               console.log("err fetching user")
                 return res.status(403).send({error:"error fetching the user and user navigator"})
            }
            if(!navigater[0] || navigater[0].currentNavigation !== bearerNav){
         //      console.log(navigater[0].currentNavigation)
         console.log(navigater)
         console.log("navigator is different")
                return res.status(403).send({error:"stored user navigator session has changed"})
               }else{
        /*      else if(!req.session.rabToken || req.session.rabToken !== bearerMyToken){
                   console.log("myToken is empty", req.session.rabToken)
                return   res.json("you are not authorized to access this page").status(404);
               } */
              console.log("isAuthUser",isAuthUser)  
               req.user = isAuthUser;          
                  connection.release();
                  next() 
           }
           })  
       })
   }) 
   }
}
  
/*    
function verifyToken(req,res,next){
    const bearerHead = req.headers["authorization"]
    const bearer = bearerHead && bearerHead.split(" ")[1];
    if (bearer === null){ 
        console.log("no bearer")
        res.json("you are not authorized to access this page").status(404);
    }
    console.log("token",bearer)
    const secret = "a667bc75dfff555f1f66c58ec41d7011653220dca6f3d72de1f027deb2883b009e55134ea82bd509cf0bc4e381a4cef79f14e1828f839a8b364a682af4d0c07e";
    jwt.verify(bearer, secret, (err, isAuthUser)=>{
     if (err){
          return res.status(403).json("you are not authorized to access this page")
     }else{
         console.log("user",req.user)
     req.user = isAuthUser;
     }
     next() 
    })
} 
*/
module.exports = verifyToken; 

