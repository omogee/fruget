var express = require('express')
var mysql = require('mysql')
var conn = require("./connection")
var verifyToken = require("./validateuser");
const router = express.Router()
 

 router.post("/:vendor/rate/vendor",verifyToken,(req,res)=>{   
    const data = JSON.parse(req.body.data);
    const userIdentity = req.user;
    let user = userIdentity.user["userId"] 
    const vendor = data.vendor; 
    const productId = data.productId;  
    const rating = data.rating;
    const comment = data.comment; 
    let d = new Date();       
    let currentTime = d.getTime()
    conn.getConnection((err, connection)=>{
        connection.query("select userId from user where businessName =?",[vendor], (err,vendorId)=>{
            if(!vendorId[0].userId){
                console.log("no vendorId specified")
            }else{
                connection.query("select numofrating from user where userId =?",[user],(err, numofrating)=>{
                    if (err) throw err;
                    if(numofrating && numofrating[0].numofrating === 0){
                     connection.query("update user set numofrating=(select numofrating)+1 and userrating =?",[rating],(err,done)=>{
                         if (err) throw err
                         console.log("user table updated")
                     })
                    }else{
                        connection.query("update user set numofrating=(select numofrating)+1 and userrating=((select userrating)+?)/2",[rating],(err,updated)=>{
                            if (err) throw err
                            console.log("user table updated")
                        })
                    }

                })
         const currentDate = `   ${d.getHours() > 12 ? d.getHours() - 12 : d.getHours()}:${d.getMinutes()} ${d.getHours() > 12 ? "pm" : "am"} - ${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`   
    connection.query("SELECT * FROM user WHERE userId = '"+user+"'",(err, selectfile)=>{
        if (err) throw err;
    connection.query("INSERT INTO userratings (productId,vendorId,userId,userImage,userName,comment,rating,likes,dislikes,date,time) values (?,?,?,?,?,?,?,?,?,?,?)",
[productId,parseInt(vendorId[0].userId),user,selectfile[0].profileImage,selectfile[0].fullName,comment,rating,JSON.stringify([]),JSON.stringify([]),currentDate,currentTime],(err, insertfile)=>{
        if (err) throw err;
        console.log("Inserted successfully")
             res.send("rating and comments  have been inserted successfully")
             })   
        })
    }
    })       
 }) 
})
router.post("/:details/rate/product",verifyToken,(req,res)=>{   
    const data = JSON.parse(req.body.data);
    const userIdentity = req.user;
    let user = userIdentity.user["userId"] 
    const productId = data.productId;  
    const rating = data.rating;
    const comment = data.comment; 
    let d = new Date();          
    let currentTime = d.getTime()
    const currentDate = `   ${d.getHours() > 12 ? d.getHours() - 12 : d.getHours()}:${d.getMinutes()} ${d.getHours() > 12 ? "pm" : "am"} - ${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`   
    conn.getConnection((err, connection) => {
        if (err) throw err;
    connection.query("SELECT * FROM user WHERE userId = ?",[user],(err, selectfile)=>{
        if (err) throw err;
        connection.query("SELECT * from product where productId =?",[productId], (err,product)=>{
            if (err) throw err;
            if(product[0].productrating === 0){
        connection.query("update product set productrating =? where productId =?",[rating,productId],(err, selectfile)=>{
                    if (err) throw err;
                })
            }else{
                connection.query("update product set productrating =((select productrating)+?)/2 where productId =?",[rating,productId],(err, selectfile)=>{
                    if (err) throw err;
                })
            }
        })
    connection.query("INSERT INTO productrating (productId,userId,userImage,userName,comment,rating,date,time,likes,dislikes) values (?,?,?,?,?,?,?,?,?,?)",
[productId,user,selectfile[0].profileImage,selectfile[0].fullName,comment,rating,currentDate,currentTime,JSON.stringify([]),JSON.stringify([])],(err, insertfile)=>{
        if (err) throw err;
        connection.release()
        console.log("product rating Inserted successfully")
             res.send("rating and comments  have been inserted successfully")
             })  
            })         
            
 }) 
})
 router.post("/:details/rate",(req,res)=>{   
    const data = JSON.parse(req.body.data);
    const details = req.params.details; 
    const userId = data.userId;  
    const rating = data.rating;
    const comment = data.comment; 
    let d = new Date();       
    const currentDate = `${d.getDate()}/${d.getMonth()}/${d.getFullYear()} -  ${d.getHours() > 12 ? d.getHours() - 12 : d.getHours()}:${d.getMinutes()} ${d.getHours() > 12 ? "pm" : "am"}`   
    conn.query("SELECT productId FROM product WHERE details = '"+details+"'",(err, file)=>{
        if (err) throw err;
        const productId = file[0].productId;
        console.log(productId)

    conn.query("SELECT percentagerating,productrating,comments from product_rating WHERE productId = '"+productId+"'",(err, file)=>{
        if (err) throw err;
        if(file[0].comments && file[0].productrating){  
     file.map(files =>{
         console.log(files.productrating)  
         const filerating = JSON.parse(files.productrating)   
             filerating[`${userId}`] =rating +","+ currentDate;
           const filerating2 = JSON.stringify(filerating)
           const filecomment = JSON.parse(files.comments)
           filecomment[`${userId}`] = comment;
           const filecomment2 = JSON.stringify(filecomment)
          let filepercentagerating = files.percentagerating;
          console.log(filepercentagerating)
          filepercentagerating = (parseInt(filepercentagerating) + parseInt(rating))/2
          console.log(filepercentagerating)
             conn.query("UPDATE product_rating SET productrating ='"+filerating2+"',comments ='"+filecomment2+"',percentagerating='"+filepercentagerating+"' WHERE productId = '"+productId+"'",(err, file)=>{
                 if (err) throw err;
             console.log("rating have been inserted successfully")
             res.send("rating and comments  have been inserted successfully")
             })  
            
})  
 }
    else{
        let myrating = {} 
        myrating[`${userId}`] = rating +","+ currentDate;
        const filerating2 = JSON.stringify(myrating)
        let newfilecomment ={}
        newfilecomment[`${userId}`] = comment;
        newfilecomment = JSON.stringify(newfilecomment)
        conn.query("UPDATE product_rating SET productrating ='"+filerating2+"',percentagerating='"+rating+"',comments='"+newfilecomment+"' WHERE productId = '"+productId+"'", (err, file)=>{
            if (err) throw err;
            console.log("new rating added successfully")
            res.send("added succesffully")
        })
         
    }
    })
})
}) 
 router.get("/fetch/details",(req,res)=>{
     conn.query("SELECT *,`colors-avail` as color from product", (err, files)=>{
         if (err) throw err;
         res.send(files)
     }) 
 })

 router.get('/product/:productId', (req,res)=>{ 
            const productId = req.params.productId;
            conn.getConnection(function(err, connection) {
                if (err) throw err;
            const sql = "SELECT *,(select count(*) from productrating where productId =?) as ratingscount,`colors-avail` as coloursavail,CONCAT('₦', FORMAT(sellingprice, 0)) mainprice, CONCAT('₦', FORMAT(initialprice, 0)) initialcost  FROM product WHERE productId = ?";   
             connection.query(sql ,[productId,productId,],(err,file)=>{
               if (err) throw err; 
               connection.query("SELECT * from productrating where productId = ? order by ratingId DESC",[productId],(err,productcomments)=>{
                   if (err) throw err;
            connection.query("UPDATE product SET rating =(select rating) + 1,viewrating=(select viewrating)+1 WHERE productId = ? ",[productId],(err, update0)=>{
                if (err) throw err
         connection.query('SELECT *, CONCAT("₦", FORMAT(sellingprice, 0)) AS mainprice FROM product INNER JOIN product_rating using (productId) WHERE brand = ? LIMIT 8;',[file[0].brand],(err,similiarBrand)=>{
             if (err) throw err;
             res.json({file,files2:similiarBrand,productcomments}) 
         })
            })
        })
            //'SELECT *, CONCAT("₦", FORMAT(sellingprice, 0)) AS mainprice FROM product INNER JOIN product_rating using (productId) WHERE brand = ? AND category=? AND (subcat1 = ? OR subcat2 = ? OR subcat3= ? ) LIMIT 8;';

       //     connection.query("SELECT *, CONCAT('₦', FORMAT(sellingprice, 0)) AS mainprice FROM product INNER JOIN product_rating using (productId) WHERE brand = ? LIMIT 8;SELECT *, CONCAT('₦', FORMAT(sellingprice, 0)) AS mainprice FROM product INNER JOIN product_rating using (productId) WHERE brand = ? AND category=? AND (subcat1 = ? OR subcat2 = ? OR subcat3= ? ) LIMIT 8;",[productId,file[0].brand,file[0].brand ,file[0].category,file[0].subcat1,file[0].subcat2,file[0].subcat3], (err,done)=>{
        //        if (err) throw err; 
            
        //    const sql = "SELECT *,`colors-avail` as coloursavail,CONCAT('₦', FORMAT(sellingprice, 0)) mainprice, CONCAT('₦', FORMAT(initialprice, 0)) initialcost  FROM product INNER JOIN product_rating using (productId) WHERE productId = ?";

 // const sql2 = 'SELECT *, CONCAT("₦", FORMAT(sellingprice, 0)) AS mainprice FROM product INNER JOIN product_rating using (productId) WHERE brand = ? LIMIT 8;';
  /*         conn.query(sql2 , [file[0].brand],  (err,files2)=>{ 
    if (err) throw err;
 // const sql3 = 'SELECT *, CONCAT("₦", FORMAT(sellingprice, 0)) AS mainprice FROM product INNER JOIN product_rating using (productId) WHERE brand = ? AND category=? AND (subcat1 = ? OR subcat2 = ? OR subcat3= ? ) LIMIT 8;';
     conn.query(sql3 , [file[0].brand ,file[0].category,file[0].subcat1,file[0].subcat2,file[0].subcat3],  (err,files3)=>{
     if (err) throw err;
     connection.release()
     res.json({file,files2,files3})
           })
        })   
        */
   //     const files2 = done[1];
   //     const files3 = done[2];
          })
         })  
        })               
    

 router.get('/follow/seller',verifyToken, (req,res)=>{
            const seller = parseInt(req.query.sellerId);
          const user = parseInt(req.user.user.userId)
          conn.getConnection((err, connection) => {
            if (err) throw err
 connection.query('SELECT *  FROM user WHERE `userId` = "'+seller+'"',(err,sellerdetails)=>{
                if (err) throw err;
                console.log("heo",sellerdetails[0].followers)
connection.query("SELECT following FROM user WHERE userId=?", [user], (err,following)=>{
             if (err) throw err;
            
if(JSON.parse(sellerdetails[0].followers).includes(user) || JSON.parse(following[0].following).includes(seller)){  
                    console.log("followers is included")
                    let frugetfollowers =JSON.parse(sellerdetails[0].followers)
                    frugetfollowers.splice(frugetfollowers.indexOf(user), 1)
                    frugetfollowers = JSON.stringify(frugetfollowers)   

                    let frugetfollowing =JSON.parse(following[0].following)
                     frugetfollowing.splice(frugetfollowing.indexOf(seller),1)
                    frugetfollowing =JSON.stringify(frugetfollowing)
connection.query('UPDATE user set following = ? WHERE userId=?',[frugetfollowing,user],(err,updatefollowing)=>{
if (err) throw err;
 connection.query('UPDATE user set followers = ? WHERE userId=?',[frugetfollowers,seller],(err,updatefollowers)=>{
     if (err) throw err;
connection.query('SELECT *  FROM user WHERE `userId` = "'+user+'"',(err,currentuserdetails)=>{
        if (err) throw err;
connection.query('SELECT *  FROM user WHERE `userId` = "'+seller+'"',(err,currentsellerdetails)=>{
    if (err) throw err;
     res.json({status:"follow",user:currentuserdetails[0],seller:currentsellerdetails[0]})
})
    })
 })
})
}
else if(!JSON.parse(sellerdetails[0].followers).includes(user) || !JSON.parse(following[0].following).includes(seller)){
    console.log("followers is not included")
    let frugetfollowers =JSON.parse(sellerdetails[0].followers)
    frugetfollowers.push(user)
    frugetfollowers = JSON.stringify(frugetfollowers)

    console.log("following is not included")
    let frugetfollowing =JSON.parse(following[0].following)
    frugetfollowing.push(seller)
    frugetfollowing =JSON.stringify(frugetfollowing)
connection.query('UPDATE user set followers = ? WHERE userId=?',[frugetfollowers,seller],(err,updatefollowers)=>{
if (err) throw err;
connection.query('UPDATE user set following = ? WHERE userId=?',[frugetfollowing,user],(err,updatefollowing)=>{
    if (err) throw err;
    connection.query('SELECT *  FROM user WHERE `userId` = "'+user+'"',(err,currentuserdetails)=>{
        if (err) throw err; 
    connection.query('SELECT *  FROM user WHERE `userId` = "'+seller+'"',(err,currentsellerdetails)=>{
            if (err) throw err;
    res.json({status:"following",user:currentuserdetails[0], seller:currentsellerdetails[0]})
    })
    })
})
})   
}
  }) 
  })     
  connection.release()
   })
  })    

  router.get('/follow/service',verifyToken, (req,res)=>{
    const seller = parseInt(req.query.sellerId);
  const user = parseInt(req.user.user.userId)
  conn.getConnection((err, connection) => {
    if (err) throw err 
connection.query('SELECT *  FROM user WHERE `userId` = "'+seller+'"',(err,sellerdetails)=>{
        if (err) throw err;
        console.log("heo",sellerdetails[0].followers)
connection.query("SELECT * FROM user WHERE userId=?", [user], (err,following)=>{
     if (err) throw err;
    
if(JSON.parse(sellerdetails[0].followers).includes(user) || JSON.parse(following[0].following).includes(seller)){  
            console.log("followers is included")
            let frugetfollowers =JSON.parse(sellerdetails[0].followers)
            frugetfollowers.splice(frugetfollowers.indexOf(user), 1)
            frugetfollowers = JSON.stringify(frugetfollowers)   

            let frugetfollowing =JSON.parse(following[0].following)
             frugetfollowing.splice(frugetfollowing.indexOf(seller),1)
            frugetfollowing =JSON.stringify(frugetfollowing)
connection.query('UPDATE user set following = ? WHERE userId=?',[frugetfollowing,user],(err,updatefollowing)=>{
if (err) throw err;
connection.query('UPDATE user set followers = ? WHERE userId=?',[frugetfollowers,seller],(err,updatefollowers)=>{
if (err) throw err;
connection.query('SELECT *  FROM user WHERE `userId` = "'+user+'"',(err,currentuserdetails)=>{
if (err) throw err;
connection.query("select * from product inner join user on (product.store=user.businessName) group by product.store order by FIELD(user.lga, '"+following[0].lga+"') DESC", (err,service)=>{
    if(err) throw err;   
res.json({user:currentuserdetails[0],service})
})
})
})
})
}
else if(!JSON.parse(sellerdetails[0].followers).includes(user) || !JSON.parse(following[0].following).includes(seller)){
console.log("followers is not included")
let frugetfollowers =JSON.parse(sellerdetails[0].followers)
frugetfollowers.push(user)
frugetfollowers = JSON.stringify(frugetfollowers)

console.log("following is not included")
let frugetfollowing =JSON.parse(following[0].following)
frugetfollowing.push(seller)
frugetfollowing =JSON.stringify(frugetfollowing)
connection.query('UPDATE user set followers = ? WHERE userId=?',[frugetfollowers,seller],(err,updatefollowers)=>{
if (err) throw err;
connection.query('UPDATE user set following = ? WHERE userId=?',[frugetfollowing,user],(err,updatefollowing)=>{
if (err) throw err;
connection.query('SELECT *  FROM user WHERE `userId` = "'+user+'"',(err,currentuserdetails)=>{
if (err) throw err; 
connection.query("select * from product inner join user on (product.store=user.businessName) group by product.store order by FIELD(user.lga, '"+following[0].lga+"') DESC", (err,service)=>{
    if(err) throw err;   
res.json({user:currentuserdetails[0],service})
})
})
})
})   
}
}) 
})     
connection.release()
})
})    

  router.get("/ri/ri/ri/ri",(req,res)=>{
    conn.query("update product set store='e.o.eze' where category='tv and audio'", (err, seller)=>{
        if (err) throw err;
        res.send("changed successfully")
  })
})   

router.get("/product/display/seller", verifyToken,(req,res)=>{
    const productId = req.query.productId;
    const details = req.query.details
    const email = req.query.email 
    const user = req.user;
    let userIdentity = user.user["userId"]
    conn.getConnection((err, connection) => {      
        if (err) throw err
        connection.query("select store from product where productId =?",[productId],(err,mainstore)=>{
            if (err) throw err;
        connection.query("SELECT distinct store from product WHERE details =?", [details], (err, store)=>{
            if (err) throw err    
           let stores;
            if(store.length > 1){
                 stores =[];
            store.map(storer=>{
                if(storer.store !== mainstore[0].store){
                stores.push(storer.store)
                }
            })  
        }else{
             stores ="undefined"
        }
            console.log("stores",stores)
     connection.query("SELECT * from user WHERE businessName =?", [mainstore[0].store], (err, sellerdetail)=>{
                if (err) throw err;
    connection.query("SELECT * from user WHERE businessName IN (?) AND businessName != ?", [stores,mainstore[0].store], (err, otherstores)=>{
                if (err) throw err;     
                connection.release()  
                if(sellerdetail[0].userId === user){
                    res.json({sellerdetail:sellerdetail[0],otherstores,follow:false})
                }
     else if(sellerdetail[0].followers !== null && sellerdetail[0].followers.length > 0  && JSON.parse(sellerdetail[0].followers).includes(user)){
                    res.json({sellerdetail:sellerdetail[0],otherstores,follow:true}) 
        }          
     else{
            res.json({sellerdetail:sellerdetail[0],otherstores,follow:false}) 
        } 
    })
})
    })  
    }) 
})
})

///product/display/otheruserdetailsbyuserId
router.get("/product/display/sellerdetails", (req,res)=>{
    
    const userId = req.query.userId;
    conn.getConnection((err,connection)=>{
        if (err) throw err;     
        connection.query("SELECT * from user WHERE userId =?", [userId], (err, seller)=>{
        if (err) throw err;
        connection.query("SELECT *,CONCAT('₦', FORMAT(sellingprice, 0)) AS mainprice FROM product  WHERE store =? LIMIT 30 OFFSET 0", [seller[0].businessName], (err, products)=>{
                if (err) throw err
        connection.query("SELECT COUNT(*) as numOfRows FROM product  WHERE store =?", [seller[0].businessName], (err, numOfRows)=>{
                    if (err) throw err
         connection.release()
         res.json({seller,products, numOfRows}) 
            })
        })
    }) 
    })  
})            
 
router.get("/product/display/userdetails", (req,res)=>{
    const email = req.query.email;
    conn.getConnection((err,connection)=>{
        if (err) throw err;  
        connection.query("SELECT * from user WHERE email =?", [email], (err, details)=>{
        if (err) throw err;
        connection.query("update user set viewrating=(select viewrating)+1 where email =?", [email], (err,viewupdate)=>{
            if (err) throw err;
        })
connection.query("SELECT *,CONCAT('₦', FORMAT(sellingprice, 0)) AS mainprice FROM product WHERE store =? LIMIT 30 OFFSET 0", [details[0].businessName], (err, products)=>{
                if (err) throw err
        connection.query("SELECT COUNT(*) as numOfRows FROM product  WHERE store =?", [details[0].businessName], (err, numOfRows)=>{
                    if (err) throw err
        connection.query("SELECT * from userratings where vendorId = ?",[details[0].userId], (err,comments)=>{
            if (err) throw err;  
         connection.release()
         res.json({details:details[0],products, numOfRows, comments}) 
            })
          })
        })   
    })  
    })  
})   
//other
router.get("/product/display/userdetailsbyuserId",verifyToken,(req,res)=>{
    const user = req.user 
    let userId = user.user["userId"]
  //  const userId = req.query.userId;
    conn.getConnection((err,connection)=>{
        if (err) throw err;  
        connection.query("SELECT * from user WHERE userId =?", [userId], (err, details)=>{
        if (err) throw err;
        if(details.length === 0 || !details){
            console.log("its an empty detail")
         res.json({details:{}, isLoggedin:false,status:"done"})
        }else{
        connection.query("SELECT *,CONCAT('₦', FORMAT(sellingprice, 0)) AS mainprice FROM product INNER JOIN product_rating using (productId) WHERE store =? LIMIT 30 OFFSET 0", [details[0].businessName], (err, products)=>{
                if (err) throw err
        connection.query("SELECT COUNT(*) as numOfRows FROM product  WHERE store =?", [details[0].businessName], (err, numOfRows)=>{
                    if (err) throw err
         connection.release()
         res.json({details:details[0],products, numOfRows,isLoggedin:true,status:"done"})      
            })
        })
      }
    })    
    })  
}) 
//display/userdetailsbyuserId
router.get("/product/display/otheruserdetailsbyuserId",verifyToken,(req,res)=>{
   const userId = req.query.userId;
   console.log("its an empty detail",userId)
    conn.getConnection((err,connection)=>{
        if (err) throw err;  
        connection.query("SELECT * from user WHERE userId =?", [userId], (err, details)=>{
        if (err) throw err;
        if(details.length === 0 || !details){
           
         res.json({details:{}, isLoggedin:false,status:"done"})
        }else{
        connection.query("SELECT *,CONCAT('₦', FORMAT(sellingprice, 0)) AS mainprice FROM product INNER JOIN product_rating using (productId) WHERE store =? LIMIT 30 OFFSET 0", [details[0].businessName], (err, products)=>{
                if (err) throw err
        connection.query("SELECT COUNT(*) as numOfRows FROM product  WHERE store =?", [details[0].businessName], (err, numOfRows)=>{
                    if (err) throw err
         connection.release()
       //  console.log(otheruserdetails,"otheruserdetails otheruserdetailsotheruserdetailsotheruserdetails")
         res.json({otheruserdetails:details[0],products, numOfRows,isLoggedin:true,status:"done"})      
            })
        })
      }
    })    
    })  
}) 
 router.get("/messages/unread",verifyToken,(req,res)=>{
    const user = req.user;
    let userIdentity = user.user["userId"]
    conn.query("select count (*) as unread,count(distinct(sender)) as contacts from  messages where status != 'read' and reciever=?",[userIdentity],(err,unread)=>{
        if (err) throw err;
        console.log(userIdentity, unread)
        res.send(unread)
    })
 })
router.get("/product/display/myprofiledetails", verifyToken,(req,res)=>{
    const user = req.user;
    let userIdentity = user.user["userId"]
    console.log("usasa",userIdentity)
    conn.getConnection((err,connection)=>{
        if (err) throw err;  
        connection.query("SELECT * from user WHERE userId =?", [userIdentity], (err, details)=>{
        if (err) throw err;
        connection.query("SELECT *,CONCAT('₦', FORMAT(sellingprice, 0)) AS mainprice FROM product INNER JOIN product_rating using (productId) WHERE store =? LIMIT 30 OFFSET 0", [details[0].businessName], (err, products)=>{
                if (err) throw err
        connection.query("SELECT COUNT(*) as numOfRows FROM product  WHERE store =?", [details[0].businessName], (err, numOfRows)=>{
                    if (err) throw err
         connection.release()
         res.json({details,products, numOfRows}) 
            })
        })
    })
    })
})  

router.get('/product/rating',(req,res)=>{ 
    conn.query('SELECT * FROM product INNER JOIN product_rating  USING (productId) Where productId = 11', (err,file)=>{
        if (err) throw err;
    //    console.log(file) 
    file.map(files => {   
        files["authur"] = "Eze Ogbonnaya"
        if(files.productrating){      
            const prating =JSON.parse(files.productrating);
            const mainrating =[];
            for (var i=0; i<Object.values(prating).length; i++){
             mainrating.push(parseInt(Object.values(prating)[i][0]))
          }
               const reducer = (a,b) => (a+b)
               const prating2 =mainrating.map(pratings => pratings*20)
           //    console.log( Object.values(prating2).reduce(reducer)/Object.keys(prating).length)
               files["numOfRating"] = Object.keys(prating).length
               if(Object.values(prating).length > 0){
                   files["percentrating"] = Object.values(prating2).reduce(reducer)/Object.keys(prating).length
               }
              else{
                 files["percentrating"] = 0
              }
                 }
    })  
    
        res.send(file)
    })
})





 module.exports = router;