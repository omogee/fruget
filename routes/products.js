var express = require('express')
var conn = require("./connection")
const cloudinary =require ("cloudinary")
const cloudinaries =require ("./cloudinary")
const upload = require ("./multer")
const fs = require("fs")
const jwt = require("jsonwebtoken");
const cookieParser= require('cookie-parser')
// var verifyToken = require("./validateuser");
//category/category
const router = express.Router()
  
router.use(cookieParser())
function verifyToken(req,res,next){
    // { headers: {"Authorization" : `Markaranter ${Cookies.get("token")}`,"markaranterTwo":mainToken,"navigation":JSON.stringify(na
    const secret = "1ca6a75462ed832b6e1a713c483df9c3ae4ae3a5aebcbdcab919c4272f442ab0b11b2ce480402e7ea26c0c930d2ce063fab8d7b9ed58f09b4a8a8863e3509d8e";
    const bearerHead = req.headers["authorization"]
    const bearerNav = req.headers["navigation"]
    const bearerMyToken = bearerHead && bearerHead.split(" ")[2];
    let bearer = bearerHead && bearerHead.split(" ")[1];
    console.log(bearerHead)
    console.log(bearerMyToken)
    console.log(bearer) 
    console.log(req.session)    
 
    if (bearer === null){
        console.log("no bearer")
         res.json("you are not authorized to access this page").status(404);
    }    
    if (bearerMyToken === null){
         console.log("no myToken bearer")
          res.json("you are not authorized to access this page").status(404);
      }  
     jwt.verify(bearer, secret, (err, isAuthUser)=>{
      if (err){
         console.log(err)
           return res.status(403).json("you are not authorized to access this page")
      }     
     
      const user= isAuthUser.user.userId
      console.log(isAuthUser.user.userId)
     conn.getConnection(function(err, connection) {
         if (err) throw err; // not connected!
         connection.query ("SELECT * FROM user WHERE userId = ? ",[user],(err,navigater)=>{
          if (err){
             console.log("err fetching user")
               return res.status(403).json("you are not authorized to access this page")
          }
          if(!navigater[0] || navigater[0].currentNavigation !== bearerNav){
       //      console.log(navigater[0].currentNavigation)
       console.log(navigater)
       console.log("navigator is different")
              return res.status(403).json("you are not authorized to access this page")
             }
            else if(!req.session.rabToken || req.session.rabToken !== bearerMyToken){
                 console.log("myToken is empty", req.session.rabToken)
              return   res.json("you are not authorized to access this page").status(404);
             }
                else{
             req.user = isAuthUser;
                }
                connection.release();
                next() 
         })  
     })
 }) 
 }
 

  
router.post("/seller/productupload",upload.array('files'),(req,res)=>{
    const data = req.body
 const generalcategory=data.generalcategory;
 const  category =data.category;
 const subcat1 =data.subcat1;
 const subcat2=data.subcat2
 const subcat3=data.subcat3
const entrytext=data.entrytext
const details=data.details
const color=data.currentColor
const colors = data.colors
const currentsize=data.currentsize
const size=data.size
const brand= data.brand
const feature = data.features
const price=data.price;
const initialprice=data.initialprice;
const discount=data.discount;
const weight = data.weight;
const model=data.model
const power=data.power; 
const aboutbrand=data.aboutbrand;
const d = new Date()
const currentTime = d.getTime()
cloudinary.config({
    cloud_name:"fruget-com",
    api_key: "614738379773118",
    api_secret: "fCkcfwZsVDrvCNt6d_fMrG2i4NM"
})
conn.query("SELECT businessname,state,lga from user WHERE userId =?", [221],(err,seller)=>{
    if (err) throw err;
    let state= seller[0].state
    let lga = seller[0].lga
    let mainseller = seller[0].businessname
      const uploader = (path) => cloudinaries.uploads(path,`/${generalcategory}/${category}`);
        const urls = []
        const mainImages ={}
        const files = req.files || req.file
        for(var i=0; i < files.length; i++){
            const {path} = files[i]
            const newPath = uploader(path)
            urls.push(newPath)   
            fs.unlinkSync(path)
            mainImages[i+1] = files[i].filename
            } 
           
 conn.query("INSERT INTO product (generalcategory,category,`subcat1`,`subcat2`,`subcat3`,brand,branddescription,details,entrytext,color,`colors-avail`,size,sizesavail,`img1`,mainImg,model,power,weight,initialprice,sellingprice,discount,features,store,state,lga,time) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
  [generalcategory,category,subcat1,subcat2,subcat3,brand,aboutbrand,details,entrytext,color,JSON.stringify(colors),currentsize,JSON.stringify(size),JSON.stringify(mainImages),mainImages[1],model,power,weight,initialprice,price,discount,JSON.stringify(feature),mainseller,state,lga,currentTime],
  (err,file)=>{
 if (err) throw err; 
 if(file){
     const message ={
         success:true,
         message:"Product has been added successfully"
     }
 res.send(message)
 }
 else{
    const message ={
        failure:true,
        message:"Product Upload Failed"
    }
res.send(message)
}
  })
//console.log(generalcategory,category,subcat1,subcat2,subcat3,brand,details,entrytext,color,colors,size,mainImages,mainImages[1],model,power,weight,initialprice,price,discount,feature,mainseller,state,lga)

})
})
 router.get('/:categorie',(req,res)=>{
 const cat = req.params.categorie;
 const custrating = parseInt(req.query.rating) || 0; 
 const mainratingvalue = custrating || 0
 conn.getConnection(function(err, connection) {
   if (err) throw err;
  connection.query('SELECT MAX(sellingprice) as highestprice,MIN(sellingprice) as lowestprice FROM product  WHERE  `generalcategory` = "'+cat+'" OR `category` = "'+cat+'" OR `subcat1` = "'+cat+'" OR `subcat2` = "'+cat+'" OR `subcat3` = "'+cat+'"',(err,filem)=>{
        if (err) throw err;
        let min =  req.query.min || filem[0].lowestprice
        let max = req.query.max || filem[0].highestprice
        if(min === "undefined"|| min === undefined || min === null){
            min = filem[0].lowestprice
        }
        if(max === "undefined" || max === undefined || max === null){
            max = filem[0].highestprice
        }
        const overallMax = filem[0].highestprice
        const overallMin = filem[0].lowestprice

    const pagee = req.query.page || 1;
    const sort = req.query.sort;
    const currentPage = parseInt(pagee)
    const numPerPage = 40;
    var skip = (pagee-1)*40 || 0; 
    switch (sort){   
        case "low-high":   
            sorter = "sellingprice"  
            setting= "ASC"
            break;  
            case "high-low":
            sorter = "sellingprice"
            setting= "DESC"  
            break;   
            case "most-searched":
            sorter = "searchrating"
            setting= "DESC" 
            break; 
            case "most-viewed":
                sorter = "viewrating"
                setting= "DESC" 
                break; 
            case "warranty":     
            sorter = "warranty" 
            setting= "DESC"      
            break; 
            default: 
            sorter = "rating"
            setting="DESC"
            break;    
    } 

       
    
// var max = req.query.max || filem[0].max ;   
// var min = req.query.min || filem[0].min; 
connection.query('SELECT COUNT(*) as numOfRows,MAX(sellingprice) as max,MIN(sellingprice) as min from product WHERE  (generalcategory = "'+cat+'" OR category ="'+cat+'" OR subcat1 = "'+cat+'" OR subcat2 = "'+cat+'" OR subcat3="'+cat+'") AND (sellingprice >= "'+min+'" AND sellingprice <= "'+max+'")', (err,file)=>{
    if (err) throw err;   
    console.log("file",file)
const numOfRows = file[0].numOfRows;
const numPages = Math.ceil(numOfRows/numPerPage);
console.log(sorter,numPages,numOfRows, max, min)
//(sellingprice >= "'+min+'" AND sellingprice <= "'+max+'") AND 
connection.query('SELECT *,  CONCAT("₦", FORMAT(sellingprice, 0)) AS mainprice FROM product WHERE (`generalcategory` = "'+cat+'" OR`category` = "'+cat+'" OR subcat1 = "'+cat+'" OR subcat2 = "'+cat+'" OR subcat3 = "'+cat+'") AND (sellingprice >= "'+min+'" AND sellingprice <= "'+max+'") AND productrating >= "'+mainratingvalue+'" ORDER BY '+sorter+' '+setting+' LIMIT ? OFFSET ?',[numPerPage,skip],(err,file)=>{ 
    if (err) throw err;      
           connection.release(); 
         
        res.json({file,numPages,currentPage,numOfRows,max,min,overallMax,overallMin})
   }) 
})
})
})  
})  
//inner join
router.get('/goods/:vendor',(req,res)=>{ 
    const vendor = req.params.vendor;
    const cat = req.query.category
    const custrating = parseInt(req.query.rating) || 0; 
    const mainratingvalue = custrating || 0
    conn.getConnection(function(err, connection) {
      if (err) throw err;
     connection.query('SELECT MAX(sellingprice) as highestprice,MIN(sellingprice) as lowestprice FROM product where store = "'+vendor+'"',(err,filem)=>{
           if (err) throw err;
           let min =  req.query.min || filem[0].lowestprice
           let max = req.query.max || filem[0].highestprice
           if(min === "undefined"|| min === undefined || min === null){
               min = filem[0].lowestprice
           }
           if(max === "undefined" || max === undefined || max === null){
               max = filem[0].highestprice
           }
           const overallMax = filem[0].highestprice
           const overallMin = filem[0].lowestprice
   
       const pagee = req.query.page || 1;
       const sort = req.query.sort;
       const currentPage = parseInt(pagee)
       const numPerPage = 40;
       var skip = (pagee-1)*40 || 0; 
       switch (sort){   
           case "low-high":   
               sorter = "sellingprice"  
               setting= "ASC"
               break;  
               case "high-low":
               sorter = "sellingprice"
               setting= "DESC"  
               break;   
               case "most-searched":
               sorter = "searchrating"
               setting= "DESC" 
               break; 
               case "most-viewed":
                   sorter = "viewrating"
                   setting= "DESC" 
                   break; 
               case "warranty":     
               sorter = "warranty" 
               setting= "DESC"      
               break; 
               default: 
               sorter = "rating"
               setting="DESC"
               break;    
       } 
   connection.query('SELECT COUNT(*) as numOfRows,MAX(sellingprice) as max,MIN(sellingprice) as min from product WHERE  store ="'+vendor+'"', (err,file)=>{
       if (err) throw err;   
       console.log("file",file)
   const numOfRows = file[0].numOfRows;
   const numPages = Math.ceil(numOfRows/numPerPage);
   console.log(sorter,numPages,numOfRows, max, min)
   //(sellingprice >= "'+min+'" AND sellingprice <= "'+max+'") AND 
   connection.query('SELECT *,  CONCAT("₦", FORMAT(sellingprice, 0)) AS mainprice FROM product INNER JOIN product_rating using (productId) WHERE store ="'+vendor+'" AND product_rating.percentagerating >= "'+mainratingvalue+'" ORDER BY '+sorter+' '+setting+' LIMIT ? OFFSET ?',[numPerPage,skip],(err,file)=>{ 
       if (err) throw err;
        file.map(files => {  
               files["authur"] = "Eze... Ogbonnaya"   
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
              connection.release();
           res.json({file,numPages,currentPage,numOfRows,max,min,overallMax,overallMin})
      }) 
   })
   })
   })  
   })  
   

router.get('/items/filter/:category', (req,res) =>{
    const cat = req.params.category
     conn.query('SELECT MAX(sellingprice) as highestprice,MIN(sellingprice) as lowestprice FROM product  WHERE `generalcategory` = "'+cat+'" OR `category` = "'+cat+'" OR `subcat1` = "'+cat+'" OR `subcat2` = "'+cat+'" OR `subcat3` = "'+cat+'"',(err,filem)=>{
        if (err) throw err;
    let pagee = parseInt(req.query.page) || null;
    var brands = req.query.brand || null;
    var inches = req.query.inches || null
    var litres = req.query.litres || null
    var colors = req.query.colour || null
    var vendor = req.query.vendor || null
    let min =  req.query.min || filem[0].lowestprice
    var max = req.query.max || filem[0].highestprice
    if(min === "undefined"|| min === undefined || min === null){
        min = filem[0].lowestprice
    }
    if(max === "undefined" || max === undefined || max === null){
        max = filem[0].highestprice
    }
    const overallMax = filem[0].highestprice
    const overallMin = filem[0].lowestprice
    var sort = req.query.sort;
    var category = req.params.category
    console.log(min,max)
    brands= brands.split(",")
    brands= brands.reverse()
    brands= JSON.stringify(brands).toString()
    inches= inches.split(",")
    inches= inches.reverse()
    inches= JSON.stringify(inches).toString()
    litres= litres.split(",")
    litres= litres.reverse()
    litres= JSON.stringify(litres).toString()
    colors= colors.split(",")
    colors= colors.reverse()
    colors= JSON.stringify(colors).toString()
    vendor= vendor.split(",")
    vendor= vendor.reverse()
    vendor= JSON.stringify(vendor).toString()

    var brandno = brands.split(",").toString().length
    var inchno = inches.split(",").toString().length
    var litreno = litres.split(",").toString().length
    var colorno = colors.split(",").toString().length
    var vendorno = vendor.split(",").toString().length

    brands = brands.slice(1,brandno-1)
    inches = inches.slice(1,inchno-1)
    litres = litres.slice(1,litreno-1)
    colors = colors.slice(1,colorno-1)
    vendor = vendor.slice(1,vendorno-1)

    let sorter ="";
    let setting="";
    let sorter2="";
    let q = req.query.q || "brand"
   

    let orderby=""
    let orderbyvalues ="" 
     
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
                orderbyvalues = vendor    
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
            case "most-searched":
            sorter = "searchrating"
            setting= "DESC" 
            break; 
            case "most-viewed":
                sorter = "viewrating"
                setting= "DESC" 
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
          
     console.log(q,sorter) 
conn.query("SELECT COUNT(*) AS numOfRows FROM product WHERE (brand IN ("+brands+") OR inches IN ("+inches+") OR store IN ("+vendor+") OR litres IN ("+litres+") OR color IN ("+colors+")) AND (sellingprice >= '"+min+"' AND sellingprice <= '"+max+"') AND (generalcategory='"+category+"' OR category='"+category+"' OR subcat1='"+category+"' OR subcat2='"+category+"' OR subcat3='"+category+"')", (err, file)=>{
  if (err) throw err;  
    const numOfRows = file[0].numOfRows;   
    const numPages = Math.ceil(numOfRows/20)  
    const pagee = parseInt(req.query.page) || 1;  
    const mainpage = pagee - 1;      
    const skips = mainpage*40;  
    console.log(skips) 
    var currentPage = parseInt(req.query.page)     
    var numPerPage =40;
const sql = "SELECT *,CONCAT('₦', FORMAT(sellingprice, 0)) AS mainprice FROM product INNER JOIN product_rating using (productId) WHERE (brand IN ("+brands+") OR store IN ("+vendor+") OR inches IN ("+inches+") OR litres IN ("+litres+") OR color IN ("+colors+")) AND (sellingprice >= '"+min+"' AND sellingprice <= '"+max+"')   AND (generalcategory='"+category+"' OR category='"+category+"' OR subcat1='"+category+"' OR subcat2='"+category+"' OR subcat3='"+category+"') ORDER BY "+sorter+" "+setting+" LIMIT ? OFFSET ?";
conn.query(sql,[numPerPage, skips], (err, files)=>{
    if (err) throw err;
    res.json({files,numPages,currentPage,numOfRows,max,min,overallMax,overallMin})
})   
})  
})  
})

router.get('/goods/filter/:vendor', (req,res) =>{
    const vendor = req.params.vendor
    const cat = req.params.category
     conn.query('SELECT MAX(sellingprice) as highestprice,MIN(sellingprice) as lowestprice FROM product  WHERE  store="'+vendor+'"',(err,filem)=>{
        if (err) throw err;
    let pagee = parseInt(req.query.page) || null;
    var brands = req.query.brand || null;
    var inches = req.query.inches || null
    var litres = req.query.litres || null
    var colors = req.query.colour || null
    
    let min =  req.query.min || filem[0].lowestprice
    var max = req.query.max || filem[0].highestprice
    if(min === "undefined"|| min === undefined || min === null){
        min = filem[0].lowestprice
    }
    if(max === "undefined" || max === undefined || max === null){
        max = filem[0].highestprice
    }
    const overallMax = filem[0].highestprice
    const overallMin = filem[0].lowestprice
    var sort = req.query.sort;
    var category = req.params.category
    console.log(min,max)
    brands= brands.split(",")
    brands= brands.reverse()
    brands= JSON.stringify(brands).toString()
    inches= inches.split(",")
    inches= inches.reverse()
    inches= JSON.stringify(inches).toString()
    litres= litres.split(",")
    litres= litres.reverse()
    litres= JSON.stringify(litres).toString()
    colors= colors.split(",")
    colors= colors.reverse()
    colors= JSON.stringify(colors).toString()
  

    var brandno = brands.split(",").toString().length
    var inchno = inches.split(",").toString().length
    var litreno = litres.split(",").toString().length
    var colorno = colors.split(",").toString().length
    

    brands = brands.slice(1,brandno-1)
    inches = inches.slice(1,inchno-1)
    litres = litres.slice(1,litreno-1)
    colors = colors.slice(1,colorno-1)
  

    let sorter ="";
    let setting="";
    let sorter2="";
    let q = req.query.q || "brand"
   

    let orderby=""
    let orderbyvalues ="" 
     
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
            case "most-searched":
            sorter = "searchrating"
            setting= "DESC" 
            break; 
            case "most-viewed":
                sorter = "viewrating"
                setting= "DESC" 
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
          
     console.log(q,sorter) 
conn.query("SELECT COUNT(*) AS numOfRows FROM product WHERE (brand IN ("+brands+") OR inches IN ("+inches+")  OR litres IN ("+litres+") OR color IN ("+colors+")) AND (sellingprice >= '"+min+"' AND sellingprice <= '"+max+"') AND store='"+vendor+"'", (err, file)=>{
  if (err) throw err;  
    const numOfRows = file[0].numOfRows;   
    const numPages = Math.ceil(numOfRows/20)  
    const pagee = parseInt(req.query.page) || 1;  
    const mainpage = pagee - 1;      
    const skips = mainpage*40;  
    console.log(skips) 
    var currentPage = parseInt(req.query.page)     
    var numPerPage =40;
const sql = "SELECT *,CONCAT('₦', FORMAT(sellingprice, 0)) AS mainprice FROM product INNER JOIN product_rating using (productId) WHERE (brand IN ("+brands+")  OR inches IN ("+inches+") OR litres IN ("+litres+") OR color IN ("+colors+")) AND (sellingprice >= '"+min+"' AND sellingprice <= '"+max+"')   AND store='"+vendor+"' ORDER BY "+sorter+" "+setting+" LIMIT ? OFFSET ?";
conn.query(sql,[numPerPage, skips], (err, files)=>{
    if (err) throw err;
    res.json({files,numPages,currentPage,numOfRows,max,min,overallMax,overallMin})
})   
})  
})  
})


router.get('/distinct/subcats', (req,res)=>{
    conn.query("SELECT DISTINCT generalcategory FROM product",(err,files)=>{
        if (err) throw err;
        res.send(files)
    })
 }) 
 
 //display/seller
 
 router.get('/section/one', (req,res)=>{
     conn.query("SELECT *,  CONCAT('₦', FORMAT(sellingprice, 0)) AS mainprice FROM product inner join user on (product.store = user.businessName) where category='fan'  LIMIT 12",(err,files)=>{
         if (err) throw err;
         console.log("yea yea yea ")
         res.send(files)
     }) 
  })
  router.get('/section/two', (req,res)=>{
     conn.query("SELECT *,  CONCAT('₦', FORMAT(sellingprice, 0)) AS mainprice FROM product inner join user on (product.store = user.businessName) where category='mobile phones' LIMIT 12",(err,files)=>{
         if (err) throw err;
         res.send(files)
     })
  })
  router.get('/section/three', (req,res)=>{
     conn.query("SELECT *,  CONCAT('₦', FORMAT(sellingprice, 0)) AS mainprice FROM product inner join user on (product.store = user.businessName) where category='blender' LIMIT 12",(err,files)=>{
         if (err) throw err;
         res.send(files) 
     })
  })
  router.get('/section/four', (req,res)=>{
     conn.query("SELECT *,  CONCAT('₦', FORMAT(sellingprice, 0)) AS mainprice FROM product inner join user on (product.store = user.businessName) where category='refrigerator' LIMIT 12",(err,files)=>{
         if (err) throw err;
         res.send(files)
     })
  })  
         //Category colour,brand,size
 router.get('/:category/color', (req,res)=>{
     const cat = req.params.category;
     let colors=req.query.selectedColour
     if(colors !== "undefined"){
       colors= colors.split(",")
      colors= colors.reverse()
       colors= JSON.stringify(colors).toString()
       var colorno = colors.split(",").toString().length
       colors = colors.slice(1,colorno-1)
       conn.query('select distinct color, COUNT(color) as colory  from product  where `generalcategory` = "'+cat+'" OR `category`="'+cat+'" OR `subcat1` = "'+cat+'" OR `subcat2` = "'+cat+'" OR `subcat3` = "'+cat+'" group by color ORDER by FIELD(color,'+colors+') DESC',(err,files)=>{
           if (err) throw err;
           res.send(files)
       })
     }else{
    conn.query('select distinct color, COUNT(color) as colory  from product  where `generalcategory` = "'+cat+'" OR `category`="'+cat+'" OR `subcat1` = "'+cat+'" OR `subcat2` = "'+cat+'" OR `subcat3` = "'+cat+'" group by color',(err,files)=>{
        if (err) throw err;
        res.send(files)
    })
}
 })  
 router.get('/:category/seller', (req,res)=>{
    const cat = req.params.category;
    let sellers=req.query.selectedseller
    console.log("fetching sellers",sellers)
    if(sellers !== "undefined"){
        sellers= sellers.split(",")
      sellers= sellers.reverse()
     sellers= JSON.stringify(sellers).toString()   
      var sellerno = sellers.split(",").toString().length
      sellers = sellers.slice(1,sellerno-1)
      console.log("fetching sellers",sellers)
      conn.query('select distinct store, COUNT(store) as storey  from product  where `generalcategory` = "'+cat+'" OR `category`="'+cat+'" OR `subcat1` = "'+cat+'" OR `subcat2` = "'+cat+'" OR `subcat3` = "'+cat+'" group by store ORDER by FIELD(store,'+sellers+') DESC',(err,files)=>{
          if (err) throw err;
          console.log(files)
          res.send(files)
      })
    }else{
   conn.query('select distinct store, COUNT(store) as storey  from product  where `generalcategory` = "'+cat+'" OR `category`="'+cat+'" OR `subcat1` = "'+cat+'" OR `subcat2` = "'+cat+'" OR `subcat3` = "'+cat+'" group by store',(err,files)=>{
       if (err) throw err;
       res.send(files)
   })
}
})


 router.get('/:category/subcat2', (req,res)=>{
     const cat = req.params.category;
     conn.query('SELECT DISTINCT `subcat2` FROM product WHERE `category` = "'+cat+'"',(err,files)=>{
         if (err) throw err;
         res.send(files)
     }) 
  })
  router.get('/:category/size', (req,res)=>{
    const cat = req.params.category;
    let litres=req.query.selectedLitres
    let inches=req.query.selectedInches 
     inches= inches.split(",")
     litres= litres.split(",")
       inches= JSON.stringify(inches).toString()
       litres= JSON.stringify(litres).toString()
       var inchno = inches.split(",").toString().length
       var litreno = litres.split(",").toString().length
       inches = inches.slice(1,inchno-1)
       litres = litres.slice(1,litreno-1)
    conn.getConnection(function(err, connection) {
        if (err) throw err;
      connection.query('select  inches, COUNT(inches) as inchesy  from product  where `generalcategory` = "'+cat+'" OR `category`="'+cat+'" OR `subcat1` = "'+cat+'" OR `subcat2` = "'+cat+'" OR `subcat3` = "'+cat+'" group by inches ORDER by FIELD(inches,'+inches+') DESC',(err,inches)=>{
          if (err) throw err;
      connection.query('select  litres, COUNT(litres) as litresy  from product  where `generalcategory` = "'+cat+'" OR `category`="'+cat+'" OR `subcat1` = "'+cat+'" OR `subcat2` = "'+cat+'" OR `subcat3` = "'+cat+'" group by litres ORDER by FIELD(litres,'+litres+') DESC',(err,litres)=>{
            if (err) throw err;  
     connection.query('select  wattage, COUNT(wattage) as wattagey  from product  where `generalcategory` = "'+cat+'" OR `category`="'+cat+'" OR `subcat1` = "'+cat+'" OR `subcat2` = "'+cat+'" OR `subcat3` = "'+cat+'" group by wattage',(err,wattage)=>{
                if (err) throw err;    
          connection.release()
          res.json({inches,litres,wattage})
      })
    })    
})
    })   
 })

  router.get('/:category/brand', (req,res)=>{
      const cat = req.params.category;
      let brands=req.query.selectedBrand   
      if(brands !== "undefined"){
        brands= brands.split(",")
        brands= brands.reverse()
        brands= JSON.stringify(brands).toString()
        var brandno = brands.split(",").toString().length
        brands = brands.slice(1,brandno-1)
        conn.query('select brand, COUNT(brand) as brandy  from product  where `generalcategory` = "'+cat+'" OR `category`="'+cat+'" OR `subcat1` = "'+cat+'" OR `subcat2` = "'+cat+'" OR `subcat3` = "'+cat+'" group by brand ORDER by FIELD(brand,'+brands+') DESC',(err,files)=>{
            if (err) throw err;
            res.send(files)
        })
      }else{
          console.log("no brand")
     conn.query('select brand, COUNT(brand) as brandy  from product  where `generalcategory` = "'+cat+'" OR `category`="'+cat+'" OR `subcat1` = "'+cat+'" OR `subcat2` = "'+cat+'" OR `subcat3` = "'+cat+'" group by brand',(err,files)=>{
         if (err) throw err;
         res.send(files)
     })
    }
  })
  router.get('/goods/:vendor/color', (req,res)=>{
    const vendor = req.params.vendor;
    let colors=req.query.selectedColour
    if(colors !== "undefined"){
      colors= colors.split(",")
     colors= colors.reverse()
      colors= JSON.stringify(colors).toString()
      var colorno = colors.split(",").toString().length
      colors = colors.slice(1,colorno-1)
      conn.query('select distinct color, COUNT(color) as colory  from product  where store = "'+vendor+'" group by color ORDER by FIELD(color,'+colors+') DESC',(err,files)=>{
          if (err) throw err;
          res.send(files)
      })
    }else{
   conn.query('select distinct color, COUNT(color) as colory  from product  where store = "'+vendor+'" group by color',(err,files)=>{
       if (err) throw err;
       res.send(files)
   })
}
})  
router.get('/goods/:vendor/size', (req,res)=>{
    const vendor = req.params.vendor;
    let litres=req.query.selectedLitres
    let inches=req.query.selectedInches 
     inches= inches.split(",")
     litres= litres.split(",")
       inches= JSON.stringify(inches).toString()
       litres= JSON.stringify(litres).toString()
       var inchno = inches.split(",").toString().length
       var litreno = litres.split(",").toString().length
       inches = inches.slice(1,inchno-1)
       litres = litres.slice(1,litreno-1)
    conn.getConnection(function(err, connection) {
        if (err) throw err;
      connection.query('select  inches, COUNT(inches) as inchesy  from product  where store="'+vendor+'" group by inches ORDER by FIELD(inches,'+inches+') DESC',(err,inches)=>{
          if (err) throw err;
      connection.query('select  litres, COUNT(litres) as litresy  from product  where store="'+vendor+'" group by litres ORDER by FIELD(litres,'+litres+') DESC',(err,litres)=>{
            if (err) throw err;  
     connection.query('select  wattage, COUNT(wattage) as wattagey  from product  where store="'+vendor+'" group by wattage',(err,wattage)=>{
                if (err) throw err;    
          connection.release()
          res.json({inches,litres,wattage})
      })
    })    
})
    })   
 })

  router.get('/goods/:vendor/brand', (req,res)=>{
      const vendor = req.params.vendor;
      let brands=req.query.selectedBrand   
      if(brands !== "undefined"){
        brands= brands.split(",")
        brands= brands.reverse()
        brands= JSON.stringify(brands).toString()
        var brandno = brands.split(",").toString().length
        brands = brands.slice(1,brandno-1)
        conn.query('select brand, COUNT(brand) as brandy  from product where store="'+vendor+'" group by brand ORDER by FIELD(brand,'+brands+') DESC',(err,files)=>{
            if (err) throw err;
            res.send(files)
        })
      }else{
          console.log("no brand")
     conn.query('select brand, COUNT(brand) as brandy  from product  where store="'+vendor+'" group by brand',(err,files)=>{
         if (err) throw err;
         res.send(files)
     })
    }
  })
  router.get('/:category/price', (req,res)=>{
     const cat = req.params.category; 
    conn.query('SELECT MAX(sellingprice) as highestprice,MIN(sellingprice) as lowestprice FROM product  WHERE `subcat1` = "'+cat+'" OR `subcat2` = "'+cat+'" OR `subcat3` = "'+cat+'"',(err,file)=>{
        if (err) throw err;
        res.send(file)
    })
 })

 router.get('/:category/category', (req,res)=>{
    const cat = req.params.category;
    conn.query('SELECT DISTINCT category FROM product  WHERE `generalcategory` = "'+cat+'" OR `category` = "'+cat+'" OR `subcat1` = "'+cat+'"  OR `subcat2` = "'+cat+'" OR `subcat3` = "'+cat+'"',(err,distcat)=>{
        if (err) throw err;
  conn.query('SELECT DISTINCT subcat1 FROM product  WHERE `generalcategory` = "'+cat+'" OR `category` = "'+cat+'" OR `subcat1` = "'+cat+'"  OR `subcat2` = "'+cat+'" OR `subcat3` = "'+cat+'"',(err,distsub1)=>{
            if (err) throw err;      
   conn.query('SELECT DISTINCT subcat2 FROM product  WHERE `generalcategory` = "'+cat+'" OR `category` = "'+cat+'" OR `subcat1` = "'+cat+'"  OR `subcat2` = "'+cat+'" OR `subcat3` = "'+cat+'"',(err,distsub2)=>{
       if (err) throw err;
  conn.query('SELECT DISTINCT subcat3 FROM product  WHERE `generalcategory` = "'+cat+'" OR `category` = "'+cat+'" OR `subcat1` = "'+cat+'"  OR `subcat2` = "'+cat+'" OR `subcat3` = "'+cat+'"',(err,distsub3)=>{
        if (err) throw err;
       const files = [...distcat,...distsub1,...distsub2,...distsub3]
    
        res.json({distcat,distsub1,distsub2, distsub3 })
    })
   })
  })
 })
})

router.get('/vendor/:vendor/category', (req,res)=>{
    const vendor = req.params.vendor;
    conn.query('SELECT DISTINCT category FROM product  WHERE store="'+vendor+'"',(err,distcat)=>{
        if (err) throw err;
  conn.query('SELECT DISTINCT subcat1 FROM product  WHERE store="'+vendor+'"',(err,distsub1)=>{
            if (err) throw err;      
   conn.query('SELECT DISTINCT subcat2 FROM product  WHERE store="'+vendor+'"',(err,distsub2)=>{
       if (err) throw err;
  conn.query('SELECT DISTINCT subcat3 FROM product  WHERE store="'+vendor+'"',(err,distsub3)=>{
        if (err) throw err;
       const files = [...distcat,...distsub1,...distsub2,...distsub3]
        res.json({distcat,distsub1,distsub2, distsub3 })
    })
   })
  })
 }) 
})
router.get('/productupload/:category/subcat2', (req,res)=>{
    const cat = req.params.category;
   conn.query('SELECT DISTINCT subcat2 FROM product  WHERE `subcat1` = "'+cat+'" ',(err,subcat2)=>{
        if (err) throw err;
        res.send(subcat2)
    })
   })
   router.get('/productupload/:category/subcat3', (req,res)=>{
    const cat = req.params.category;
   conn.query('SELECT DISTINCT subcat3 FROM product  WHERE `subcat1` = "'+cat+'" ',(err,subcat3)=>{
        if (err) throw err;
        res.send(subcat3)
    })
   })
  
   

router.get('/product/:details', (req,res)=>{
    const details = req.params.details;
   conn.query("SELECT *, `colors-avail` as coloursavail,CONCAT('₦', FORMAT(sellingprice, 0)) mainprice, CONCAT('₦', FORMAT(initialprice, 0)) initialcost  FROM product INNER JOIN product_rating using (productId) WHERE details = ?",[details],(err,file)=>{
       if (err) throw err;
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

router.get("/products/allcategories", (req,res)=>{
    conn.query("SELECT DISTINCT generalcategory FROM product", (err,file)=>{
        if (err) throw err;
        res.send(file)
    })
})

 module.exports = router;

function newFunction(sort, sorter, setting, q, orderbyvalues) {
    switch (sort) {
        case "low-high":
            sorter = "sellingprice"
            setting = "ASC"
            break
        case "high-low":
            sorter = "sellingprice"
            setting = "DESC"
            break
        case "most-searched":
            sorter = "searchrating"
            setting = "DESC"
            break
        case "most-viewed":
            sorter = "viewrating"
            setting = "DESC"
            break

        case "warranty":
            sorter = "warranty"
            setting = "ASC"
            break
        default:
            setting = "DESC"
            sorter = `FIELD(${q || "brand"},${orderbyvalues})`
            console.log(sorter)
            break
    }
    return { sorter, setting }
}

function newFunction(sort, sorter, setting, q, orderbyvalues) {
    switch (sort) {
        case "low-high":
            sorter = "sellingprice"
            setting = "ASC"
            break
        case "high-low":
            sorter = "sellingprice"
            setting = "DESC"
            break
        case "most-searched":
            sorter = "searchrating"
            setting = "DESC"
            break
        case "most-viewed":
            sorter = "viewrating"
            setting = "DESC"
            break

        case "warranty":
            sorter = "warranty"
            setting = "ASC"
            break
        default:
            setting = "DESC"
            sorter = `FIELD(${q || "brand"},${orderbyvalues})`
            console.log(sorter)
            break
    }
    return { sorter, setting }
}
