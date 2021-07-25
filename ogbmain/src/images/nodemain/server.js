const express = require ('express');
const mysql = require ('mysql')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const session = require('express-session')
const  MySQLStore = require('express-mysql-session')(session);
const cookieParser= require('cookie-parser')
const {check,validationResult}= require('express-validator')

const app = express();
const options = {
    host: 'us-cdbr-east-02.cleardb.com',
    user: 'b9b001ef539d5b',
    password: '8b36306e',
    database: 'heroku_ea5621dea112dad'
   }

const conn = mysql.createPool(options)

    console.log('mysql connected successfully')

const sessionStore= new MySQLStore(options);
app.use(cookieParser())
app.use(session({
    key: 'session_cookie_name',
    secret: 'otosh',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    checkExpirationInterval: 900000,
    // The maximum age of a valid session; milliseconds
    expiration: 200000,
}));
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.get('/:category', (req,res)=>{
    const cat = req.params.category;
    const pagee = req.query.page || 1;
    const currentPage = parseInt(pagee)
    const numPerPage = 20;
    var skip = (pagee-1)*20;
    var limitter = skip + numPerPage;
conn.query('SELECT COUNT(*) as numOfRows from product WHERE subcat1 ="'+cat+'"', (err,file)=>{
    if (err) throw err;
const numOfRows = file[0].numOfRows;
const numPages = Math.ceil(numOfRows/numPerPage);
conn.query('SELECT *,  CONCAT("₦", FORMAT(sellingprice, 0)) AS mainprice FROM product INNER JOIN product_rating using (productId) WHERE `subcat1` = "'+cat+'" LIMIT ? OFFSET ?',[numPerPage,skip],(err,file)=>{
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
        console.log("no need for filter")
        res.json({file,numPages,currentPage,numOfRows})
    })
})
})  
app.post("/:details/rate",(req,res)=>{
    const data = JSON.parse(req.body.data);
    const details = req.params.details;
    const userId = data.userId;
    const rating = data.rating;
    const comment = data.comment;
    const currentDate = new Date();
    conn.query("SELECT productId FROM product WHERE details = '"+details+"'",(err, file)=>{
        if (err) throw err;
        const productId = file[0].productId;
        console.log(productId)

    conn.query("SELECT productrating,comments from product_rating WHERE productId = '"+productId+"'",(err, file)=>{
        if (err) throw err;
        if(file.length > 0){
     file.map(files =>{
         console.log(files.productrating)
         const filerating = JSON.parse(files.productrating)     
             filerating[`${userId}`] =rating +","+ currentDate;
           const filerating2 = JSON.stringify(filerating)
             conn.query("UPDATE product_rating SET productrating ='"+filerating2+"' WHERE productId = '"+productId+"'",(err, file)=>{
                 if (err) throw err;
             console.log("rating have been inserted successfully")
             })  
               // Comment Section
               console.log(files.comments)
      const filecomment = JSON.parse(files.comments)
       filecomment[`${userId}`] = comment;
       const filecomment2 = JSON.stringify(filecomment)
       conn.query("UPDATE product_rating SET comments ='"+filecomment2+"' WHERE productId = '"+productId+"'",(err, file)=>{
        if (err) throw err;
        console.log("comments have been inserted successfuly")
        res.send("rating and comments  have been inserted successfully")
    })       
     })  
    }
    else{
        let myrating = {} 
        myrating[`${userId}`] = rating +","+ currentDate;
        const filerating2 = JSON.stringify(myrating)
        conn.query("UPDATE product_rating SET productrating ='"+filerating2+"' WHERE productId = '"+productId+"'", (err, file)=>{
            if (err) throw err;
            console.log("new rating added successfully")
            res.send("added succesffully")
        })
        
    }
    })
})
})
app.post('/login', (req,res)=>{ 
    const data = JSON.parse(req.body.data)
     const username = data.username
     const password = data.password;
    const sql ="SELECT * FROM user WHERE username ='"+username+"' ";
    conn.query(sql, (err,file)=>{
        if (err) throw err;
        if(file.length > 0){
        file.forEach(files =>{
            if(files.password === password){
                const user ={
                    id: 1,
                    name: files.username,
                    password: files.password
                 }
                 const signature=  jwt.sign({user: user}, 'secretKey', (err, token)=>{
                    if (err) throw err;
                res.cookie('jwt',signature,{
                    maxAge:3600,
                    httpOnly: true,
                   // secure: true
                },console.log('cookie set')) ;               
                const msg ={
                 signupMessage:'you are now logged in',
                 isLoggedin: true,
                 token: token,
                 userId: files.id                                      
                 }  
                 console.log('details are correct')
                 res.send(msg)    

             })  
    }         
            else{
               console.log('passwords dont match')
               const msg ={
                signupMessage:'you are now logged in',
                isLoggedin: false
            }
                res.send(msg)
            }
        })  
        }
        else{
            console.log('user doesnt exist')
            const msg ={
                signupMessage:'you are now logged in',
                isLoggedin: false
            }
            res.send(msg)
        }
    })
})
app.get('/similiar/:details', (req,res)=>{
    const sql = "SELECT * FROM product WHERE  details = '"+req.params.details+"'";
    conn.query(sql, (err,files)=>{
        if (err) throw err;
     var count = files.length;
    for (var i = 0; i < count; i++) {
          arr_brand = files[i].brand;
          arr_subcat2 = files[i].subcat2;
          arr_subcat3 = files[i].subcat3;
          console.log(arr_brand, arr_subcat2, arr_subcat3)
      const sql2 = 'SELECT *, CONCAT("₦", FORMAT(sellingprice, 0)) AS mainprice FROM product INNER JOIN product_rating using (productId) WHERE brand = ? AND ( subcat2 = ? OR subcat3= ? ) LIMIT 8;';
    conn.query(sql2 , [arr_brand,arr_subcat2,arr_subcat3],  (err,files2)=>{
    if (err) throw err;
    files2.map(files => { 
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
    res.send(files2)
    })
    }
    })
    })
    app.get('/similiarbrand/:details', (req,res)=>{
        const sql = "SELECT * FROM product WHERE  details = '"+req.params.details+"'";
        conn.query(sql, (err,files)=>{
            if (err) throw err;
         var count = files.length;
        for (var i = 0; i < count; i++) {
              arr_brand = files[i].brand;
              arr_subcat2 = files[i].subcat2;
              arr_subcat3 = files[i].subcat3;
              console.log(arr_brand, arr_subcat2, arr_subcat3)
const sql2 = 'SELECT *, CONCAT("₦", FORMAT(sellingprice, 0)) AS mainprice FROM product INNER JOIN product_rating using (productId) WHERE brand = ? LIMIT 8;';
        conn.query(sql2 , [arr_brand],  (err,files2)=>{
        if (err) throw err;
        files2.map(files => { 
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
        res.send(files2)
        })
        }
        })
        })

app.get('/product/rating',(req,res)=>{
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
app.post('/signup',(req,res)=>{
    const data = JSON.parse(req.body.data)
     const username = data.username
     const password = data.password;
 //    const navigator = req.body.navigator;
 const error = validationResult(req);
     conn.query('INSERT INTO user (username, password) VALUES ("'+username+'","'+password+'")', (err, file)=>{
         if (err) throw err;
         res.send(true)
     })
})
app.get('/items/search', (req,res) =>{
    const search = req.query.search;
    var brands = req.query.brand 
    var sizes = req.query.size
    var colors = req.query.colour
    var pagee = req.query.page
    var category = req.params.category
    brands= JSON.stringify(brands.split(",")).toString()
    sizes= JSON.stringify(sizes.split(",")).toString()
    colors= JSON.stringify(colors.split(",")).toString()
    var brandno = brands.split(",").toString().length
    var sizeno = sizes.split(",").toString().length
    var colorno = colors.split(",").toString().length
    brands = brands.slice(1,brandno-1)
    sizes = sizes.slice(1,sizeno-1)
    colors = colors.slice(1,colorno-1)
    conn.query("SELECT COUNT(*) AS numOfRows FROM product WHERE details LIKE '%"+search+"%' OR brand IN ("+brands+") OR size IN ("+sizes+") OR color IN ("+colors+")", (err, nofile)=>{
        if (err) throw err;
        const numOfRows = nofile[0].numOfRows;
        const numPages = Math.ceil(numOfRows/20)
        const pagee = parseInt(req.query.page) || 1; 
    const mainpage = pagee - 1;
    const skips = mainpage*20;
    console.log(skips)
    var currentPage = parseInt(req.query.page)
    var numPerPage =20;
    conn.query("SELECT *,CONCAT('₦', FORMAT(sellingprice, 0)) AS mainprice FROM product INNER JOIN product_rating using (productId) WHERE details LIKE '%"+search+"%' OR brand IN ("+brands+") OR size IN ("+sizes+") OR color IN ("+colors+") ORDER BY FIELD(brand, "+brands+") LIMIT ? OFFSET ?",[numPerPage, skips],(err,files)=>{
        if (err) throw err;
        files.map(file => { 
            file["authur"] = "Eze Ogbonnaya"
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
        res.json({files,numPages,currentPage,numOfRows})
    }) 
})
})
app.post('/search', (req,res)=>{
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
            file["authur"] = "Eze Ogbonnaya"
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
        res.json({files,numPages,currentPage,numOfRows})
    }) 
})
})
app.get('/items/searchbrand', (req,res)=>{
    const search = req.query.search 
    var brands = req.query.brand 
    var sizes = req.query.size
    var colors = req.query.colour
    console.log(colors)
    var category = req.params.category
    brands= JSON.stringify(brands.split(",")).toString()
    sizes= JSON.stringify(sizes.split(",")).toString()
    colors= JSON.stringify(colors.split(",")).toString()
    var brandno = brands.split(",").toString().length
    var sizeno = sizes.split(",").toString().length
    var colorno = colors.split(",").toString().length
    brands = brands.slice(1,brandno-1)
    sizes = sizes.slice(1,sizeno-1)
    colors = colors.slice(1,colorno-1)
   conn.query("SELECT DISTINCT brand FROM product WHERE details LIKE '%"+search+"%' OR brand IN ("+brands+") OR size IN ("+sizes+") OR color IN ("+colors+")",(err,files)=>{
       if (err) throw err;
       res.send(files)
   })
})
app.get('/items/searchcolour', (req,res)=>{
    const search = req.query.search;
    var brands = req.query.brand 
    var sizes = req.query.size
    var colors = req.query.colour
    console.log(colors)
    var category = req.params.category
    brands= JSON.stringify(brands.split(",")).toString()
    sizes= JSON.stringify(sizes.split(",")).toString()
    colors= JSON.stringify(colors.split(",")).toString()
    var brandno = brands.split(",").toString().length
    var sizeno = sizes.split(",").toString().length
    var colorno = colors.split(",").toString().length
    brands = brands.slice(1,brandno-1)
    sizes = sizes.slice(1,sizeno-1)
    colors = colors.slice(1,colorno-1)
   conn.query("SELECT DISTINCT color FROM product WHERE details LIKE '%"+search+"%' OR brand IN ("+brands+") OR size IN ("+sizes+") OR color IN ("+colors+")",(err,files)=>{
       if (err) throw err;
       res.send(files)
   })
})
app.get('/items/searchsize', (req,res)=>{
    const search = req.query.search;
    var brands = req.query.brand 
    var sizes = req.query.size
    var colors = req.query.colour
    console.log(colors)
    var category = req.params.category
    brands= JSON.stringify(brands.split(",")).toString()
    sizes= JSON.stringify(sizes.split(",")).toString()
    colors= JSON.stringify(colors.split(",")).toString()
    var brandno = brands.split(",").toString().length
    var sizeno = sizes.split(",").toString().length
    var colorno = colors.split(",").toString().length
    brands = brands.slice(1,brandno-1)
    sizes = sizes.slice(1,sizeno-1)
    colors = colors.slice(1,colorno-1)
   conn.query("SELECT DISTINCT size FROM product WHERE details LIKE '%"+search+"%' OR brand IN ("+brands+") OR size IN ("+sizes+") OR color IN ("+colors+")",(err,files)=>{
       if (err) throw err;
       res.send(files)
   })
})
app.get('/items/filter/:category', (req,res) =>{
    let pagee = parseInt(req.query.page) || null;
    var brands = req.query.brand || null;
    var sizes = req.query.size || null
    var colors = req.query.colour || null
    var min = req.query.min || null
    var max = req.query.max || null
    var category = req.params.category
    brands= JSON.stringify(brands.split(",")).toString()
    sizes= JSON.stringify(sizes.split(",")).toString()
    colors= JSON.stringify(colors.split(",")).toString()
    var brandno = brands.split(",").toString().length
    var sizeno = sizes.split(",").toString().length
    var colorno = colors.split(",").toString().length
    brands = brands.slice(1,brandno-1)
    sizes = sizes.slice(1,sizeno-1)
    colors = colors.slice(1,colorno-1)
    console.log(min,max)
conn.query("SELECT COUNT(*) AS numOfRows FROM product WHERE (brand IN ("+brands+") OR size IN ("+sizes+") OR color IN ("+colors+") OR (sellingprice >= '"+min+"' AND sellingprice <= '"+max+"')) AND subcat1='"+category+"'", (err, file)=>{
  if (err) throw err;
    const numOfRows = file[0].numOfRows;
    const numPages = Math.ceil(numOfRows/20)
    const pagee = parseInt(req.query.page) || 1; 
    const mainpage = pagee - 1;
    const skips = mainpage*20;
    console.log(skips)
    var currentPage = parseInt(req.query.page)
    var numPerPage =20;
const sql = "SELECT *,CONCAT('₦', FORMAT(sellingprice, 0)) AS mainprice FROM product INNER JOIN product_rating using (productId) WHERE (brand IN ("+brands+") OR size IN ("+sizes+") OR color IN ("+colors+") OR (sellingprice >= '"+min+"' AND sellingprice <= '"+max+"')) AND subcat1='"+category+"' ORDER BY FIELD(brand, "+brands+") LIMIT ? OFFSET ?";
conn.query(sql,[numPerPage, skips], (err, files)=>{
    if (err) throw err;
    console.log(numOfRows)
    res.json({files,numPages,currentPage,numOfRows})
})
})
})
app.post('/searchbrand', (req,res)=>{
    const search = JSON.parse(req.body.data); 
   conn.query("SELECT DISTINCT brand FROM product WHERE details LIKE '%"+search+"%'",(err,files)=>{
       if (err) throw err;
       res.send(files)
   })
})
app.post('/searchcolour', (req,res)=>{
    const search = JSON.parse(req.body.data);
   conn.query("SELECT DISTINCT color FROM product WHERE details LIKE '%"+search+"%'",(err,files)=>{
       if (err) throw err;
       res.send(files)
   })
})
app.post('/searchsize', (req,res)=>{
    const search = JSON.parse(req.body.data);
   conn.query("SELECT DISTINCT size FROM product WHERE details LIKE '%"+search+"%'",(err,files)=>{
       if (err) throw err;
       res.send(files)
   })
})
app.get('/distinct/subcats', (req,res)=>{
   conn.query("SELECT DISTINCT generalcategory FROM product",(err,files)=>{
       if (err) throw err;
       res.send(files)
   })
})
app.get('/modal/:gencat', (req,res)=>{
    const category = req.params.gencat;
    conn.query("SELECT DISTINCT category from product WHERE generalcategory = '"+category+"' OR subcat1 = '"+category+"'",(err,files4)=>{
        if (err) throw err;
    conn.query("SELECT DISTINCT subcat1 from product WHERE generalcategory = '"+category+"' OR  subcat1 = '"+category+"'",(err,files1)=>{
        if (err) throw err;
        conn.query("SELECT DISTINCT subcat2 from product WHERE generalcategory = '"+category+"' OR  subcat1 = '"+category+"'",(err,files2)=>{
            if (err) throw err;    
        conn.query("SELECT DISTINCT subcat3 from product WHERE generalcategory = '"+category+"' OR  subcat1 = '"+category+"'",(err,files3)=>{
            if (err) throw err;
            const files =[...files4,...files1,...files2,...files3]
            res.send(files)
        })
    })
    })
    })
 })

//SECTIONS

app.get('/section/one', (req,res)=>{
    conn.query("SELECT *,  CONCAT('₦', FORMAT(sellingprice, 0)) AS mainprice FROM product where subcat1='fan' LIMIT 12",(err,files)=>{
        if (err) throw err;
        res.send(files)
    })
 })
 app.get('/section/two', (req,res)=>{
    conn.query("SELECT *,  CONCAT('₦', FORMAT(sellingprice, 0)) AS mainprice FROM product where subcat1='stabilizer' LIMIT 12",(err,files)=>{
        if (err) throw err;
        res.send(files)
    })
 })
 app.get('/section/three', (req,res)=>{
    conn.query("SELECT *,  CONCAT('₦', FORMAT(sellingprice, 0)) AS mainprice FROM product where subcat1='blender' LIMIT 12",(err,files)=>{
        if (err) throw err;
        res.send(files)
    })
 })
 app.get('/section/four', (req,res)=>{
    conn.query("SELECT *,  CONCAT('₦', FORMAT(sellingprice, 0)) AS mainprice FROM product where subcat1='refrigerator' LIMIT 12",(err,files)=>{
        if (err) throw err;
        res.send(files)
    })
 })


 //Category colour,brand,size
app.get('/:category/color', (req,res)=>{
    const cat = req.params.category;
   conn.query('select color, COUNT(color) as colory  from product  where `subcat1` = "'+cat+'" group by color',(err,files)=>{
       if (err) throw err;
       res.send(files)
   })
})
app.get('/:category/subcat2', (req,res)=>{
    const cat = req.params.category;
    conn.query('SELECT DISTINCT `subcat2` FROM product WHERE `subcat1` = "'+cat+'"',(err,files)=>{
        if (err) throw err;
        res.send(files)
    })
 })
app.get('/:category/size', (req,res)=>{
    const cat = req.params.category;
    conn.query('select size, COUNT(size) as sizey  from product  where `subcat1` = "'+cat+'" group by size',(err,files)=>{
        if (err) throw err;
        res.send(files)
    })
 })
 app.get('/:category/brand', (req,res)=>{
     const cat = req.params.category;
    conn.query('select brand, COUNT(brand) as brandy  from product  where `subcat1` = "'+cat+'" group by brand',(err,files)=>{
        if (err) throw err;
        res.send(files)
    })
 })
 app.get('/:category/price', (req,res)=>{
    const cat = req.params.category;
   conn.query('SELECT MAX(sellingprice) as highestprice,MIN(sellingprice) as lowestprice FROM product  WHERE `subcat1` = "'+cat+'"',(err,file)=>{
       if (err) throw err;
       res.send(file)
   })
})
app.get('/category/searched/price', (req,res)=>{
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
 app.get('/:category/category', (req,res)=>{
    const cat = req.params.category;
   conn.query('SELECT DISTINCT subcat2 FROM product  WHERE `subcat1` = "'+cat+'";',(err,file1)=>{
       if (err) throw err;
       conn.query('SELECT DISTINCT subcat3 FROM product  WHERE `subcat1` = "'+cat+'";',(err,file2)=>{
        if (err) throw err;
       const files = [...file1,...file2]
        res.send(files)
    })
   })
})
app.get('/product/:details', (req,res)=>{
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
app.get('/suggestions/suggestion',(req,res)=>{
    conn.query('SELECT brand,subcat1,subcat2,subcat3,mainimg,details FROM product',(err,files)=>{
        if (err) throw err;
        res.send(files)
    })
})
const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log('connected on 5000 expected')
})