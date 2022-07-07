var express = require('express')
var conn = require('./connection')
const jwt = require('jsonwebtoken')
const upload = require ("./multer")
 const cloudinary = require ("cloudinary")
const bcryptjs = require("bcrypt")
const cookieParser= require('cookie-parser')
const csrf = require('csurf');
const nodemailer = require('nodemailer') 
const path = require("path")
const fs = require("fs")
const router = express.Router()
const verifyToken = require("./validateuser")
const { checkout } = require('./search')
 router.use(cookieParser())
 //const csrfProtection= csrf({cookie:true, value : (req) => (req.cookies.csrfToken)});
  //router.use(csrfProtection);
 // router.use(csrfProtection)
 // router.use(cookieParser())
 // router.get('/csrftoken',csrfProtection,(req,res)=>{
 //    res.send(req.csrfToken())
  // })
  
   const transporter = nodemailer.createTransport({
       service:"gmail.com",
       secure:false,
       auth:{  
           user:"frugetcommunity@gmail.com",
           pass:"nms071996"
       },
       rejectUnauthorized:false
   })
/*
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
 */

router.post("/submit/login",(req,res)=>{
    const data = JSON.parse(req.body.data)
    const email = data.email; 
    const password = data.password; 
  
  //  res.cookie('csrfToken', req.csrfToken ? req.csrfToken() : null, { sameSite: true, httpOnly: true }); (req) => (req.cookies.csrfToken)
    const emailregex= /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/
    const passwordregex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/
    const isvalidemail = email.match(emailregex);
    const isvalidpassword = password.match(passwordregex)
    const navigation = data.navigation
    let sess =req.session;
    if(!isvalidemail || email.length === 0 || !isvalidpassword || password.length === 0){
        res.json("Login details is null or not valid").status(401)
    }else{
    
    conn.query("SELECT userId,email,hash,navigation FROM user WHERE email= ? ",[email],(err,file)=>{
       if (err) throw err;
     if(file.length === 0){ 
        res.json("Incorrect Login details").status(403)
     }else{
        const hashedpassword = file[0].hash;
        bcryptjs.compare(password, hashedpassword,(err,result)=>{
            if (err) throw err;         
            if(result){
                const user={
                   userId:file[0].userId,
                    username:file[0].email
                }
            conn.query("UPDATE user set currentNavigation = ? where email =?", [navigation,email],(err,reply)=>{
                    if (err) throw err;
                })
        const secret ="1ca6a75462ed832b6e1a713c483df9c3ae4ae3a5aebcbdcab919c4272f442ab0b11b2ce480402e7ea26c0c930d2ce063fab8d7b9ed58f09b4a8a8863e3509d8e";        
               const signature= jwt.sign({user}, secret, (err, token)=>{
                   if (err) throw err;
                   res.cookie('jwt',signature,console.log(`${token} is set`))  
                let rabToken=""
                let run=Math.floor(Math.random()*100)
                const userToken =`a3b0${Math.floor(Math.random()*1000)}09e34${Math.floor(Math.random()*1000)}ea88${Math.floor(Math.random()*1000)}2h9YIAS${Math.floor(Math.random()*1000)}IOFy&%${Math.floor(Math.random()*10000)}%2CieHYPOjmcp${Math.floor(Math.random()*100000000000)}8heI${Math.floor(Math.random()*1000)}J${Math.floor(Math.random()*100000)}J8${Math.floor(Math.random()*100000000)}6${Math.floor(Math.random()*1000)}JG81${Math.floor(Math.random()*10000)}00ujwhj${Math.floor(Math.random()*10000)}xpfb${Math.floor(Math.random()*100)}8e3hy8${Math.floor(Math.random()*1000)}gyroob8${Math.floor(Math.random()*1000)}yhftw3juht${Math.floor(Math.random()*100000)}%2Cuhhwwooijufjiiiwyhjf${Math.floor(Math.random()*100000)}y${Math.floor(Math.random()*100000)}IHWM<${Math.floor(Math.random()*1000000)}hfrugetuer%2Cyh${Math.floor(Math.random()*100000000)}fbfuri${Math.floor(Math.random()*100000)}wv93ke9e62g8${Math.floor(Math.random()*1000)}q9i#H8${Math.floor(Math.random()*1000)}yky_UGU${Math.floor(Math.random()*1000)}h8${Math.floor(Math.random()*100000)}ojPIFVCH8${Math.floor(Math.random()*1000)}hie8${Math.floor(Math.random()*1000)}ydgmjjfif8${Math.floor(Math.random()*1000)}t#%68-8${Math.floor(Math.random()*1000)}_OPM8${Math.floor(Math.random()*1000)}uq8uE8${Math.floor(Math.random()*1000)}x82X8${Math.floor(Math.random()*100000)}xXd9IJYB%9#08${Math.floor(Math.random()*1000)}FB8${Math.floor(Math.random()*1000)}Z8${Math.floor(Math.random()*1000)}MXOFM${Math.floor(Math.random()*1000)}HE0c0${Math.floor(Math.random()*1000)}e`; 
                const retabeta =(length)=>{
                    for (var i=0; i<length; i++){
                        rabToken +=  userToken.slice((Math.floor(Math.random()*100)),(Math.floor(Math.random()*userToken.length)));
                        req.session.token +=token
                        if (rabToken.length <= 39){
                            rabToken = `a83b0${Math.floor(Math.random()*1000)}#${Math.floor(Math.random()*1000)}eaVMB${Math.floor(Math.random()*1000)}VP0yIOFy&%${Math.floor(Math.random()*10000)}%2CieHYPOjmcp${Math.floor(Math.random()*100000000000)}8heuehjPGVUduejueh3IHJ86${Math.floor(Math.random()*100000000)}662OJG81${Math.floor(Math.random()*10000)}00ujwhj${Math.floor(Math.random()*10000)}xpfb${Math.floor(Math.random()*100)}8eOUP${Math.floor(Math.random()*100)}w3jVCX${Math.floor(Math.random()*100)}MAuht${Math.floor(Math.random()*100000)}%2Cu${Math.floor(Math.random()*100)}wooiju${Math.floor(Math.random()*100)}fjiiiw${Math.floor(Math.random()*100)}yhjf${Math.floor(Math.random()*100000)}yg6w${Math.floor(Math.random()*100)}6guYGYB${Math.floor(Math.random()*100)}u8ehfuj9h${Math.floor(Math.random()*100000)}frugTUIO${Math.floor(Math.random()*100)}fuhri${Math.floor(Math.random()*100000)}wv93k${Math.floor(Math.random()*10000)}8tg0uhj${Math.floor(Math.random()*100)}OUH${Math.floor(Math.random()*100)}FPQP${Math.floor(Math.random()*100)}mfh__UUOMXf${Math.floor(Math.random()*10000)}hhiep`
                            req.session.token= rabToken
                        }
                       
                      //  sess.token = rabToken
                        rabToken = Math.floor(Math.random()*1000)+JSON.stringify(rabToken.length)+'#'+JSON.stringify(file[0].userId).length+"%"+Math.floor(Math.random()*1000)+run+rabToken
                        rabToken = rabToken.slice(0,run)+file[0].userId+rabToken.slice(run,rabToken.length)                 
                        return rabToken
                     } 
                  }                              
                let rab =""
let userAlpha = `u${Math.floor(Math.random()*1000)}c58${Math.floor(Math.random()*1000)}8ec81${Math.floor(Math.random()*100000000)}a4a8b8${Math.floor(Math.random()*1000)}bBO8${Math.floor(Math.random()*1000)}Gga68${Math.floor(Math.random()*100000)}322${Math.floor(Math.random()*100000)}0dcaHHPPOe2bd5${Math.floor(Math.random()*100000)}09PU${Math.floor(Math.random()*100000)}PBETSJ${Math.floor(Math.random()*100000)}O52gwBMy6PQ${Math.floor(Math.random()*1000)}gs62gh${Math.floor(Math.random()*100)}u72gyiijOP_-JBVMBVP016GUhhhhp2tuq8ugxt${Math.floor(Math.random()*100)}2${Math.floor(Math.random()*100000)}OJVH${Math.floor(Math.random()*100)}m${Math.floor(Math.random()*100000)}ouhcmpASYOfruget__YRVJPpwibxgtokLL${Math.floor(Math.random()*100000)}LKKmjhhh${Math.floor(Math.random()*10000000)}hhhwghbcjmfrugetbhbhbgvfhgtvcehemhetgevhm${Math.floor(Math.random()*100000)}hhu2uK${Math.floor(Math.random()*100000)}KKLijy25f52gb${Math.floor(Math.random()*100000)}6hwyyhAAA990XVPHFKUIODFJKKgwv$%72O36OVX7ywghsu%${Math.floor(Math.random()*100000)}uehb8${Math.floor(Math.random()*1000)}OQWW8${Math.floor(Math.random()*1000)}WSSeh%73y7$8${Math.floor(Math.random()*1000)}837yeAA63tt8${Math.floor(Math.random()*1000)}e6yuw`
         const retalpha =(length)=>{
            for (var i=0; i<length; i++){
                rab +=  userAlpha.slice((Math.floor(Math.random()*20)),(Math.floor(Math.random()*userAlpha.length)));
                if (rab.length <= 90){
            rab = `y88${Math.floor(Math.random()*100000)}2h9Y${Math.floor(Math.random()*100000)}PpcXM${Math.floor(Math.random()*1000)}POCm${Math.floor(Math.random()*1000)}CIAS${Math.floor(Math.random()*1000)}IOFy&%${Math.floor(Math.random()*10000)}%2CieHY${Math.floor(Math.random()*100000)}POjmcp${Math.floor(Math.random()*100000000000)}8heIJhjPGVUd${Math.floor(Math.random()*100000)}uej${Math.floor(Math.random()*100000)}h3IHJ86${Math.floor(Math.random()*100000000)}662OJG81${Math.floor(Math.random()*10000)}00ujwhj${Math.floor(Math.random()*10000)}xpfb${Math.floor(Math.random()*100)}8e3hy${Math.floor(Math.random()*100000)}fYEI${Math.floor(Math.random()*100000)}MZht${Math.floor(Math.random()*100000)}%2Cuhhwwooijufjiiiwyhjf${Math.floor(Math.random()*100000)}y${Math.floor(Math.random()*100000)}OHIJ${Math.floor(Math.random()*100000)}j9hfrugetuer%2Cyhfbfuhri${Math.floor(Math.random()*100000)}wv93ke${Math.floor(Math.random()*100000)}9e62g8q${Math.floor(Math.random()*1000)}gmjcCXUjfi${Math.floor(Math.random()*100)}tguhj${Math.floor(Math.random()*1000)}PPB${Math.floor(Math.random()*100)}Xc`
                }
                rab = retabeta(50).length+"%"+JSON.stringify(file[0].userId).length+"%"+run+rab
                rab = rab.slice(0,run)+file[0].userId+retabeta(50)+rab.slice(run,rab.length)
               return rab
             }  
          }  

            user["token"]=`${token}` 
            user[`cm_p`] =retalpha(50)
            const rand = Math.floor(Math.random()*10000) 
         //  user[`userIexypoxy${rand}2gwy6g`] =`${Math.floor(Math.random()*1000)}io_yiPN${Math.floor(Math.random()*100000)}YXxOgUG${Math.floor(Math.random()*1000)}OPMFruget_u7IG2gyy${retalpha(70)}6hIE$%O${Math.floor(Math.random()*100000)}JWMywghsu%${Math.floor(Math.random()*100000)}`
         
                user["message"]=`Login Successful`
        //       user["messageId"]= `${rand}`
    
      req.session.save()
                res.send(user);               
               })
            }else{
                res.send("Password is Incorrect!!!")
            }
        })
     }   
    })
    }
})
router.get("/p/p/p/p/getit",(req,res)=>{
    req.session.token = "74t3tge6e73ue3ge73"
    if(!req.session.name){
        req.session.name="Eze"
    }
    res.send("req.session.name is set");
})

router.post("/submit/register",upload.single("files"),(req,res)=>{
    const data = req.body
    const navigation =data.navigation
    const firstname = data.firstname;
    const lastname = data.lastname;
    const contact = data.contact;
    const email = data.email;
    const facebook = data.facebook;
    const twitter=data.twitter;
    const instagram= data.instagram;
    const linkedin = data.linkedin;
    const gender = data.gender; 
    const password = data.password;
    const state = data.state;
    const lga = data.lga;
    const contactTwo = data.contactTwo; 
    const address = data.address;   
    const bustop = data.bustop;
    const businessname = data.businessname;
    const aboutbusiness = data.aboutbusiness; 
    const priviledge = data.priviledge
    const subscription = priviledge === "seller" ? "regular" : ""
    const fullname = firstname+" "+lastname;
    console.log("facebook",facebook, twitter, instagram)
    let d = new Date()
    let currentDay = `${d.getDay()} ${d.getDate()} | ${d.getMonth()} | ${d.getFullYear()}`
    let currentTime = `${d.getHours() > 12 ? (d.getHours() -12 ) : d.getHours() }:${d.getMinutes()}` + `${d.getHours() > 12 ? "pm":"am"}`
   const currentDate = JSON.stringify({date : currentDay,  time:currentTime}) 
   const rand = Math.floor(Math.random()*10000000000);
    var regex = /^[A-Za-z0-9 ]+$/
    var regex2 = /^[0-9]+$/
    var regex3 = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/
    var isvalidfirstname = firstname.match(regex)
    var isvalidlastname = lastname.match(regex)
    var isvalidcontact = contact.match(regex2)
    var isvalidpass = password.match(regex3)

 
    cloudinary.config({
        cloud_name:"fruget-com",
        api_key: "614738379773118",
        api_secret: "fCkcfwZsVDrvCNt6d_fMrG2i4NM"
    })
 /*   if(req.file){
      const file = req.file
    console.log(file)
    cloudinary.v2.uploader.upload( 
        file.path,
        {
            folder: "/profile", 
        },
        function(error, result) {    
            console.log(error,result);
        }
    );   
    }
    */
 if(!isvalidfirstname || !isvalidlastname || !isvalidcontact || !isvalidpass){
    res.json("data is invalid").status(401)
 }else{
     conn.query("SELECT * FROM user WHERE email =? ",[email],(err,file)=>{
        if (err) throw err;
        if(file.length=== 0){
    bcryptjs.genSalt(10, (err,salt)=>{
        if (err) throw err;
        bcryptjs.hash(password, salt, (err,hash)=>{
            if (err) throw err;
            if(req.file){
                const file = req.file
            console.log(file.path)                  
              cloudinary.v2.uploader.upload( 
                  file.path,
                  {
                      folder: "/profile",       
                  }, 
                  function(error, result) {
                      //authorization,
                     
                      console.log(error,result.secure_url.split("/")[8]);
            conn.query("INSERT INTO user (authorization,subscription,profileImage,fullName,businessName,email,emailconfirmationcode,hash,contact,contactTwo,gender,aboutbusiness,address,state,facebook,instagram, twitter,linkedin,lga,navigation,bustop,dateOfReg,following,followers) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",[priviledge,subscription,result.secure_url.split("/")[8],fullname,businessname,email,rand,hash,contact,contactTwo,gender,aboutbusiness,address,state,facebook,instagram,twitter,linkedin,lga,navigation,bustop,currentDate,"[]","[]"], (err,file)=>{
                if (err) throw err;
            conn.query("SELECT userId  from user WHERE email = ?",[email],(err,userIdentity)=>{    
                if (err) throw err;
                let userId=userIdentity[0].userId 
                var run = Math.floor(Math.random()*100)
                var rab = "" 
            var alphab = `3ygjjj2wgs${Math.floor(Math.random()*100000000000)}uwghvbu2286gyagay${Math.floor(Math.random()*100000)}hhhu9388gq1yh22hw26gx${Math.floor(Math.random()*100000)}gggfrug3yh3bhgvcftqwrvget${Math.floor(Math.random()*100000)}6yyguhhgyghjb${Math.floor(Math.random()*100000)}yeg3h836ehhuwhj0wo${Math.floor(Math.random()*100000)}ugetvhfiuhujhj82383888882h7w89%2Coruj38hudf38u83yfg662g8q9i9992u52gy89kydgyh73456789r89ydghxlaxreupfi29992ehhieppeCD83${Math.floor(Math.random()*100000)}9qy388xji2wfvx${Math.floor(Math.random()*100000)}63ffsfschxhx${Math.floor(Math.random()*100000)}e6e789q00q775573hhcdhd${Math.floor(Math.random()*100000)}3hehdu38ehe83hsi9fhfchxhwuhddu`
              const  randalphab =(length)=>{ 
                  for (var i=0; i<length; i++){
                     rab +=  alphab.slice((Math.floor(Math.random()*20)),(Math.floor(Math.random()*alphab.length)));
                     if (rab.length <= 70){ 
                 rab = `y882h9y&%${Math.floor(Math.random()*10000)}%2Ciejmcp${Math.floor(Math.random()*100000000000)}8heuehjduejueh386662810003ygujwhjxpfb${Math.floor(Math.random()*100000)}8e3hygyhuhu2tuq8ugxt${Math.floor(Math.random()*100)}288hyf3vugyroobyhftw3juht${Math.floor(Math.random()*100000)}%2Cuhhwwooijufjiiiwyhjf${Math.floor(Math.random()*100000)}yg6wuuhuhu82g6gu8jg0jyh83huhu8ehfuj9hfrugetuer%2Cyhfbfuhri${Math.floor(Math.random()*100000)}wv93ke9e62g8q9i9992u52gy89kydgyh73456789ojeijhiejmr89ydgmjjfif88883tguhjf999mfhxlaxreupfi29992ehhiep`
                     }
                     rab =rab.slice(0,run)+rand+rab.slice(run,rab.length)
                    return rab
                  } 
                }
                var rabuser = ""
                var alphabuser = `62jjeijjghj${Math.floor(Math.random()*100000000000)}ifjfijyeh%2C${Math.floor(Math.random()*100000)}hoojmmjmjmrior83gx${Math.floor(Math.random()*100000)}gggfrugetcommunityiriiri${Math.floor(Math.random()*100000)}6300birmmo00${Math.floor(Math.random()*100000)}81209055yh${Math.floor(Math.random()*100000)}frugetvhfetg663880jfhyrb%ihuvyejoimmmpoppufcxvbzorfioroj28321219lax45667895D83${Math.floor(Math.random()*100000)}9qa6sgsgvvx${Math.floor(Math.random()*100000)}6xhx${Math.floor(Math.random()*100000)}e6e789q00q7`
                const  randalphabuser =(length)=>{
                    for (var i=0; i<length; i++){
                       rabuser +=  alphabuser.slice((Math.floor(Math.random()*20)),(Math.floor(Math.random()*alphabuser.length)));
                       if (rabuser.length <= 70){
                        rabuser = `ydgy${Math.floor(Math.random()*10000)}%2Cygdy${Math.floor(Math.random()*100000000000)}8ioeoopwjw89293yhihdgvwhy${Math.floor(Math.random()*100000)}jfjo059i82ggvhejoehugvu3oo21ei${Math.floor(Math.random()*100)}8hdg2gs62ge6gw73${Math.floor(Math.random()*100000)}%2Cijhim${Math.floor(Math.random()*100000)}yg6wu899282yguhhddjkd92je7egst${Math.floor(Math.random()*100000)}wvsi9dkd0wu2gd6vxudje93ke9e`
                       }
                       rabuser =rabuser.slice(0,run)+userId+rabuser.slice(run,rabuser.length)
                      return rabuser
                    }  
                  }
           
                const confirmationEmail = `  
                <center>
                <img style='max-width:40%' src="cid:unique@fruget.ee"/>
                </center><br/><br/>
                Hello ${gender === "male" ? "Mr" : "Mrs"} <b> ${firstname}<b/><br/><br/>
                Welcome to The Fruget Community <span class="fa fa-handshake-o"></span>, Get ready to explore a world where you get to view shops and meet traders online at very pocket friendly price best you can get anywhere
                <br/>
                <p>Please confirm your email to activate your user account and enable mailing services by clicking on
                the button below</p><br/><br/>
                <center>
                <a href='http://localhost:3000/confirmemail/frugetcommunity/confirmUseraccount${Math.floor(Math.random()*100000000000)}893hdbdhbe4uu8euu/${run}yhujofozmnv${JSON.stringify(userId).length}fojfmc/${randalphab(70)}/d${randalphabuser(70)}?user%3Dnewuser%26confirmemail%3Dtrue'>
                <button style='background-color:green;color:white;padding:20px;border-radius:10px'>
                Confirm  your email
                </button>
                </a>
                </center>
            <br/> 
            <br/> 
            <p>or click on the link below</p>
            <a href='http://localhost:3000/confirmemail/frugetcommunity/confirmUseraccount${Math.floor(Math.random()*100000000000)}893hdbdhbe4uu8euu/${run}yhujofozmnv${JSON.stringify(userId).length}fojfmc/${randalphab(70)}/d${randalphabuser(70)}?user%3Dnewuser%26confirmemail%3Dtrue'>
            http://localhost:3000/confirmemail/frugetcommunity/confirmUseraccount${Math.floor(Math.random()*100000000000)}893hdbdhbe4uu8euu/${run}yhujofozmnv${JSON.stringify(userId).length}fojfmc/${randalphab(70)}/d${randalphabuser(70)}?user%3Dnewuser%26confirmemail%3Dtrue
    </a>
            <br/><br/>
            <small>
            *Never reveal your login details and password to anyone<br/>
            *A confirmation email would be sent to this mail each time u sign in with a different device<br/>
            *traders who are verified using their BVN would recieve higher recommendation and a tag of confirmation,which would be visible by every buyer<br/>
            *Never allow another person trade with your account especially unsupervised<br/>
            *Once a customer files a complaint of forgery and scam, and it is confirmed by fruget...you woulb be blocked completely from fruget<br/>
            </small>    
            `
            const mailOptions={
                from:"frugetcommunity@gmail.com",
                to: email,
                subject:`Confirm your email address @ <frugetcommunity@gmail.com>`,
                attachments: [{
                    filename: 'fruget.jpg',
                    path: __dirname+'/fruget.jpg',
                    cid: 'unique@fruget.ee'
                }],
                html:confirmationEmail
            }
            transporter.sendMail(mailOptions, (err,info)=>{
                if (err) throw err;
                console.log(`email sent to ${email} with id of ${userId} successfully`)
            })

                const register={
                   message:"registration recieved successfully,kindly confirm your email address",
                   register: true
                }
                res.send(register)
            })
        })
      }
     );   
    }else {           
        conn.query("INSERT INTO user (authorization,subscription,fullName,businessName,email,emailconfirmationcode,hash,contact,contactTwo,gender,aboutbusiness,address,state,facebook,instagram, twitter,linkedin,lga,navigation,bustop,dateOfReg) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",[priviledge,subscription,fullname,businessname,email,rand,hash,contact,contactTwo,gender,aboutbusiness,address,state,facebook,instagram,twitter,linkedin,lga,navigation,bustop,currentDate], (err,file)=>{
            if (err) throw err;
        conn.query("SELECT userId  from user WHERE email = ?",[email],(err,userIdentity)=>{    
            if (err) throw err;
            const userId=userIdentity[0].userId
            console.log(userId)
            var run = Math.floor(Math.random()*100)
            var rab = ""
        var alphab = `gsvy72wgs${Math.floor(Math.random()*100000000000)}ggsvy72wgsyhw72sysbgyagay${Math.floor(Math.random()*100000)}hhhu82gu83gx${Math.floor(Math.random()*100000)}gggfruget${Math.floor(Math.random()*100000)}6339o2o00${Math.floor(Math.random()*100000)}8jcuj255yh${Math.floor(Math.random()*100000)}ugetvhfi96t6525555ye63g0pppfjfhj10azgd5e6fygh82h7wi887j347890ayishudf38udhdueh838hehe3he83h8ehghi56789kydgyh73456789r89ydghxlax34566gd772hshmazaf5689uhdb3456789552CD83${Math.floor(Math.random()*100000)}9qa6sgsgvvx${Math.floor(Math.random()*100000)}63ffsfschxhx${Math.floor(Math.random()*100000)}e6e789q00q775573hhcdhd${Math.floor(Math.random()*100000)}3hehdu38ehe83hsi9fhfchxhwuhddu`
          const  randalphab =(length)=>{
              for (var i=0; i<length; i++){
                 rab +=  alphab.slice((Math.floor(Math.random()*20)),(Math.floor(Math.random()*alphab.length)));
                 if (rab.length <= 70){
                  rab = `ydgy&%${Math.floor(Math.random()*10000)}%2Cygdy${Math.floor(Math.random()*100000000000)}8heuehjd383heh38890e92o3eydgvwhy${Math.floor(Math.random()*100000)}8ggd7w72ghd7wg2yy${Math.floor(Math.random()*100)}8hdg2gs62ge6gw73${Math.floor(Math.random()*100000)}%2Cijhim${Math.floor(Math.random()*100000)}yg6wu899282yguhhddjkd92je7egst${Math.floor(Math.random()*100000)}wvsi9dkd0wu2gd6vxudje93ke9e`
                 }
                 rab =rab.slice(0,run)+rand+rab.slice(run,rab.length)
                return rab
              } 
            }
            var rabuser = ""
            var alphabuser = `62tvghj${Math.floor(Math.random()*100000000000)}jgvgchyeh%2C${Math.floor(Math.random()*100000)}hhhu82gu83gx${Math.floor(Math.random()*100000)}gggfrugetcommunity${Math.floor(Math.random()*100000)}6339o2o00${Math.floor(Math.random()*100000)}8jcuj255yh${Math.floor(Math.random()*100000)}frugetvhfetg663880jfhyrbbzcjirocmmchii9y3g368383j2Cc82uh2hyh6t652%5555yhxlax45667895D83${Math.floor(Math.random()*100000)}9qa6sgsgvvx${Math.floor(Math.random()*100000)}6xhx${Math.floor(Math.random()*100000)}e6e789q00q7`
            const  randalphabuser =(length)=>{
                for (var i=0; i<length; i++){
                   rabuser +=  alphabuser.slice((Math.floor(Math.random()*20)),(Math.floor(Math.random()*alphabuser.length)));
                   if (rabuser.length <= 70){
                    rabuser = `ydgy${Math.floor(Math.random()*10000)}%2Cygdy${Math.floor(Math.random()*100000000000)}8heuehjd383heh3889200e92o3eydgvwhy${Math.floor(Math.random()*100000)}8ggd7w72ghd7wg2yy${Math.floor(Math.random()*100)}8hdg2gs62ge6gw73${Math.floor(Math.random()*100000)}%2Cijhim${Math.floor(Math.random()*100000)}yg6wu899282yguhhddjkd92je7egst${Math.floor(Math.random()*100000)}wvsi9dkd0wu2gd6vxudje93ke9e`
                   }
                   rabuser =rabuser.slice(0,run)+userId+rabuser.slice(run,rabuser.length)
                  return rabuser
                } 
              }
            console.log(randalphab(70).slice(run,run+10))    
        console.log("json",JSON.stringify(userId).length)
        console.log("userId",userId.length)
            const confirmationEmail = `
            <center>
            <img style='max-width:40%' src="cid:unique@fruget.ee"/>
            </center><br/><br/>
            Hello ${gender === "male" ? "Mr" : "Mrs"} <b> ${firstname}<b/><br/><br/>
            Welcome to The Fruget Community <span class="fa fa-handshake-o"></span>, Get ready to explore a world where you get to view shops and meet traders online at very pocket friendly price best you can get anywhere
            <br/>
            <p>Please confirm your email to activate your user account and enable mailing services by clicking on
            the button below</p><br/><br/>
            <center>
            <a href='http://localhost:3000/confirmemail/frugetcommunity/confirmUseraccount${Math.floor(Math.random()*100000000000)}893hdbdhbe4uu8euu/${run}yhujofozmnv${JSON.stringify(userId).length}fojfmc/${randalphab(70)}/d${randalphabuser(70)}?user%3Dnewuser%26confirmemail%3Dtrue'>
            <button style='background-color:green;color:white;padding:20px;border-radius:10px'>
            Confirm  your email
            </button>
            </a>
            </center>
        <br/> 
        <br/> 
        <p>or click on the linke below</p>
        <a href='http://localhost:3000/confirmemail/frugetcommunity/confirmUseraccount${Math.floor(Math.random()*100000000000)}893hdbdhbe4uu8euu/${run}yhujofozmnv${JSON.stringify(userId).length}fojfmc/${randalphab(70)}/d${randalphabuser(70)}?user%3Dnewuser%26confirmemail%3Dtrue'>
        http://localhost:3000/confirmemail/frugetcommunity/confirmUseraccount${Math.floor(Math.random()*100000000000)}893hdbdhbe4uu8euu/${run}yhujofozmnv${JSON.stringify(userId).length}fojfmc/${randalphab(70)}/d${randalphabuser(70)}?user%3Dnewuser%26confirmemail%3Dtrue
        </a>
        <br/><br/>
        <small>
        *Never reveal your login details and password to anyone<br/>
        *A confirmation email would be sent to this mail each time u sign in with a different device<br/>
        *traders who are verified using their BVN would recieve higher recommendation and a tag of confirmation,which would be visible by every buyer<br/>
        *Never allow another person trade with your account especially unsupervised<br/>
        *Once a customer files a complaint of forgery and scam, and it is confirmed by fruget...you woulb be blocked completely from fruget<br/>
        </small>    
        `
     
        const mailOptions={
            from:"frugetcommunity@gmail.com",
            to: email,
            subject:`Confirm your email address @ <frugetcommunity@gmail.com>`,
            attachments: [{
                filename: 'fruget.jpg',
                path: __dirname+'/fruget.jpg', 
                cid: 'unique@fruget.ee'
            }],
            html:confirmationEmail
        }
        transporter.sendMail(mailOptions, (err,info)=>{
            if (err) throw err;
            console.log(`email sent to ${email} with id of ${userId} successfully`)
        })

            const register={ 
               message:"registration recieved successfully,kindly confirm your email address",
               register: true
            }
            res.send(register)
        })
    })
    }
    })
 })
}  
else{
    res.send("This email is already registered on fruget")
}
})  
}    
})
router.get("/retrieve/user/email/:userIdentity", (req,res)=>{
    let userId = req.params.userIdentity;
    conn.query("Select email from user WHERE userId = ?", [userId], (err, email)=>{
        if (err) throw err;
        if(email){
            res.send(email)      
        }else{
            res.send("no email") 
        }
     
    })    
}) 

router.get("/confirm/user/:email/email/:rand",(req,res)=>{
    let rand = req.params.rand
    rand=parseInt(rand)
    const emailIden = req.params.email;
    conn.query("SELECT emailconfirmationcode  from user WHERE email =?", [emailIden],(err, code)=>{
 if (err) throw err;
 const confirmationCode = code[0].emailconfirmationcode;

 if(confirmationCode == rand){ 
    conn.query("UPDATE user set confirmemail = 'confirmed' WHERE email =?", [emailIden], (err, confirmed)=>{
        if (err) throw err;
        console.log(`${emailIden} Confirmed successfully`)
        res.send(`${emailIden} Confirmed successfully`)  
    })
}else{

    res.send("You are fake and not a registered User")
} 
}) 
})
                
router.post("/submit/sellerregister", (req,res)=>{
    const data = JSON.parse(req.body.data)
    let navigation = data.navigation;   
    const firstname = data.firstname;
    const lastname = data.lastname;
    const businesscontact = data.businesscontact; 
    const email = data.email;
    const gender = data.gender;
    const password = data.password;
    const address = data.address;   
    const lga =data.lga;
    const state = data.state;  
    const bustop = data.bustop;
    const businessname = data.businessname;
    const aboutbusiness = data.aboutbusiness; 
    const fullname = firstname+" "+lastname;
    let d = new Date()
    let currentDay = `${d.getDate()} | ${d.getMonth()} | ${d.getFullYear()}`
    let currentTime = `${d.getHours()}:${d.getMinutes()}`
   const currentDate = JSON.stringify({date : currentDay,  time:currentTime}) 
   let rand = Math.floor(Math.random()*100000);
    console.log(currentDate)
    var regex = /^[A-Za-z0-9 ]+$/
    var regex2 = /^[0-9]+$/  
    var regex3 = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/
    var isvalidfirstname = firstname.match(regex)
    var isvalidlastname = lastname.match(regex)  
    var isvalidcontact =businesscontact.match(regex2) 
    var isvalidpass = password.match(regex3)
 if(!isvalidfirstname || !isvalidlastname || !isvalidcontact || !isvalidpass){
    res.json("data is invalid").status(401)
 }else{  

     conn.query("SELECT * FROM sellers WHERE email =? ",[email],(err,file)=>{
        if (err) throw err;
        if(file.length=== 0){   
     navigation =JSON.stringify(navigation)   
    bcryptjs.genSalt(10, (err,salt)=>{    
        if (err) throw err;  
        bcryptjs.hash(password, salt, (err,hash)=>{  
            if (err) throw err; 
 conn.query("INSERT INTO sellers (profileImage,fullname, businessname,email, contact,aboutbusiness,gender,address,state,lga,bustop,navigation,dateOfReg,confirmationcode,hash) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",[profileImg,fullname,businessname,email,businesscontact,aboutbusiness,gender,address,state,lga,bustop,navigation,currentDate,rand,hash], (err,file)=>{
                if (err) throw err;
conn.query("SELECT sellerid from sellers WHERE email = ?",[email],(err,selleridentity)=>{
    if (err) throw err;
            let sellerid=selleridentity[0].sellerid
            const confirmationEmail = `
            <center>
            <img style='max-width:40%' src="cid:unique@fruget.ee"/> 
            </center><br/><br/>
            Hello ${gender === "male" ? "Mr" : "Mrs"} ${firstname}<br/><br/>
            <p>Please confirm your email to activate your account and enable mailing services by clicking on
            the button below</p><br/><br/>
            <center>
            <a href='http://localhost:3000/confirmemail/frugetcommunity/confirmUseraccount155514838839893hdbdhbe4uu8euu/26789165q3773q92729q${rand}uebhduehbdq7378384748/2F678387q701/2F678387q701%${rand}/${sellerid},57278,65289,256/7727yeyhs9%2C7u3hu882hhskmsgvuhsvgaywjk872666789gstws5527xgxv%2C83781%2C73782892?user%3Dnewuser%26confirmemail%3Dtrue'>
            <button style='background-color:green;color:white;padding:20px;border-radius:10px'>
            Confirm  your email
            </button>
            </a>
            </center>
        <br/>
        <br/> 
        <p>or click on the linke below</p>
<a href='http://localhost:3000/confirmemail/frugetcommunity/confirmUseraccount155514838839893hdbdhbe4uu8euu/26789165q3773q92729q${rand}uebhduehbdq7378384748/2F678387q701/2F678387q701/${sellerid},57278%2C65289%2C256/7727yeyhs9%2C7u3hu882hhskmsgvuhsvgaywjk872666789gstws5527xgxv%2C83781%2C73782892?user%3Dnewuser%26confirmemail%3Dtrue'>
http://localhost:3000/confirmemail/frugetcommunity/confirmUseraccount155514838839893hdbdhbe4uu8euu/26789165q3773q92729q${rand}uebhduehbdq7378384748/2F678387q701/2F678387q701%2F${sellerid}%2C57278%2C65289%2C256/7727yeyhs9%2C7u3hu882hhskmsgvuhsvgaywjk872666789gstws5527xgxv%2C83781%2C73782892?user%3Dnewuser%26confirmemail%3Dtrue
</a>
        <br/><br/>
        <small>
        *Never reveal your login details and password to anyone<br/>
        *A confirmation email would be sent to this mail each time u sign in with a different device<br/>
        *traders who are verified using their BVN would recieve higher recommendation and a tag of confirmation,which would be visible by every buyer<br/>
        *Never allow another person trade with your account especially unsupervised<br/>
        *Once a customer files a complaint of forgery and scam, and it is confirmed by fruget...you woulb be blocked completely from fruget<br/>
        </small>    
        `
            const mailOptions={
                from:"frugetcommunity@gmail.com",
                to: email,
                subject:`Confirm your email address @ <frugetcommunity@gmail.com>`,
                attachments: [{
                    filename: 'fruget.jpg',
                    path: __dirname+'/fruget.jpg',
                    cid: 'unique@fruget.ee'
                }],
                html:confirmationEmail
            }
            transporter.sendMail(mailOptions, (err,info)=>{
                if (err) throw err;
                console.log(`email sent to ${email} with id of ${sellerid} successfully`)
            })

                const register={
                   message:"registration recieved successfully",
                   register: true
                } 
                res.send(register)
            })
            
        })
        })
      }) 
}
else{
    res.send("This email is already registered as a seller on fruget")
}
}) 
}    
})  
router.get("/retrieve/seller/email/:userId", (req,res)=>{
    let userIden = req.params.userId;
    conn.query("Select email from sellers WHERE sellerid = ?", [userIden], (err, email)=>{
        if (err) throw err;
        res.send(email) 
    
    })
})
router.get("/confirm/seller/:email/email",(req,res)=>{
    let emailIden = req.params.email;
    conn.query("UPDATE sellers set confirmemail = 'confirmed' WHERE email =?", [emailIden], (err, confirmed)=>{
        if (err) throw err;
        console.log(`${emailIden} Confirmed successfully`)
        res.send(`${emailIden} Confirmed successfully`)  
    })
})/*
fetch
add-to-cart 
router.get("/fetchsellers", (req,res)=>{
    let details = req.query.details;
    conn.query("SELECT store from product WHERE details =? ",[details], (err,sellers)=>{
        if (err) throw err;
    if(sellers.length === 1){
    conn.query("SELECT * FROM sellers WHERE businessname =?", [seller[0].seller],(err, sellerdetails)=>{
        if (err) throw err;
        res.send(sellerdetails)
    })
    }else if(sellers.length > 1){
      var arr=  sellers.map(seller =>{
            return seller.businessname;
        })
        conn.query("SELECT * FROM sellers WHERE businessname IN "+ arr, [seller[0].seller],(err, sellerdetails)=>{
            if (err) throw err;
            res.send(sellerdetails)
        })
    }
    }) 
}) 
/customer/fetch/services
*/

router.get("/submit-to-cart",verifyToken,(req,res)=>{ 
    const user = req.user
    let userIdentity = user.user["userId"]
conn.query("INSERT INTO submittedcart (userId,generalcategory,category,productId,details,mainimg,sellingprice,quantity,color,size,seller) select userId,generalcategory,category,productId,details,mainimg,sellingprice,quantity,color,size,seller from shoppingcart where userId = ?",[userIdentity],(err,files)=>{
    if(err) throw err;
conn.query("DELETE from shoppingcart where userId=?",[userIdentity],(err,deletemessage)=>{ 
    if(err) throw err;   
    const d =new Date()
    let currentDay = `${d.getDate()} | ${d.getMonth()} | ${d.getFullYear()}`
    let currentTime = `${d.getHours()}:${d.getMinutes()}`
    const messages ={
        success: true,
        message: `<b>Cart Submitted Successfully On </b> ${currentDay} <br/><br/><br/><center> ${currentTime}  <br/></center>`
    }
  res.send(messages)
})
    })    
})
router.get("/add-to-cart",verifyToken,(req,res)=>{ 
    const id = req.query.id;
    const detail = req.query.details;
    const inches = req.query.inches;
    const litres = req.query.litres;
    const wattage = req.query.wattage;
    const kilogram = req.query.kilogram
    const color = req.query.color
    let d = new Date();
    let currentTime = d.getTime()
    let numba = d.getDay()
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var months = ['January','February','March','April','May','June','July','August','September','October','November','December']; 
let currentDate = `${days[d.getDay()]} ${d.getDate()}${d.getDate() === 22 || d.getDate() === 22 ? "nd" : d.getDate() === 3 || d.getDate()===23 ? "rd" : "th" } of ${months[d.getMonth()]}  ${d.getFullYear()}`
    const user = req.user 
    let userIdentity = user.user["userId"]
    conn.query("SELECT * FROM shoppingcart WHERE userId= ? AND productId= ? AND color=?",
    [userIdentity,id,color],(err,file)=>{
        if (err) throw err;
        if(file.length === 0){
conn.query("SELECT productId,generalcategory,category,details,mainimg,sellingprice,color,screensize,megapixel,operatingsystem,inches,wattage,litres,kilogram,store FROM product WHERE productId='"+id+"'",(err,newfile)=>{
        if(err) throw err;
        const details =newfile[0].details;
conn.query("INSERT INTO shoppingcart (userId,productId,generalcategory,category,details,mainimg,sellingprice,color,screensize,megapixel,operatingsystem,inches,wattage,litres,kilogram,time,date,seller) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
[userIdentity,newfile[0].productId,newfile[0].generalcategory,newfile[0].category,newfile[0].details,newfile[0].mainimg,newfile[0].sellingprice,color,newfile[0].screensize,newfile[0].megapixel,newfile[0].operatingsysystem,inches,wattage,litres,kilogram,currentTime,currentDate,newfile[0].store],(err,updatedfiles)=>{
    if(err) throw err;
conn.query("SELECT *,CONCAT ('₦', FORMAT(sellingprice,0))as mainprice,CONCAT ('₦', FORMAT(sellingprice*quantity,0)) as subtotal FROM shoppingcart WHERE userId=? ",[userIdentity],(err,cart)=>{
        if (err) throw err;
        const messages ={  
            cart, 
            success: true,
            message: `${details}`,
            header:`Added to cart`
        } 
  res.send(messages)
    })         
})   
})
//save
        }else{
 conn.query("SELECT details FROM product WHERE productId =?", [id],(err,details)=>{
                const detail = details[0].details
conn.query("UPDATE shoppingcart SET quantity = quantity+1, time=? , date =? WHERE userId=? AND productId=? AND color=?",
[currentTime,currentDate,userIdentity,id,color], (err,file)=>{
    if (err) throw err;
conn.query("SELECT *,CONCAT ('₦', FORMAT(sellingprice,0))as mainprice,CONCAT ('₦', FORMAT(sellingprice*quantity,0)) as subtotal FROM shoppingcart WHERE userId=?",[userIdentity],(err,cart)=>{
        if (err) throw err;
    const messages ={  
        cart, 
        success: true,
        message: `${detail}`,
        header:`Added to cart`
    } 
    res.send(messages)
})
})
 })
  }
 }) 
})
router.get("/increasecart",verifyToken, (req,res)=>{
    const details = req.query.details;
    const userIdentity = req.user
    const user = userIdentity.user["userId"]
    conn.query("UPDATE shoppingcart SET quantity = quantity + 1 WHERE userId = ? and id = ?",[user,details], (err,file)=>{
        if (err) throw err;
        conn.query("SELECT *,CONCAT ('₦', FORMAT(sellingprice,0))as mainprice,CONCAT ('₦', FORMAT(sellingprice*quantity,0)) as subtotal FROM shoppingcart WHERE userId=? order by id desc",[user],(err,files)=>{
            if (err) throw err;
        conn.query("SELECT CONCAT ('₦', FORMAT( SUM(quantity*sellingprice),0)) as totalprice FROM shoppingcart WHERE userId =?",[user], (err,totalprice) =>{
            if (err) throw err;
            const filess={
                files,  
                totalprice: totalprice[0].totalprice
            }  
            res.send(filess)
        })  
      })     
    }) 
})

router.post("/changecart",verifyToken, (req,res)=>{  
    const quantity = JSON.parse(req.body.data);
    const userIdentity = req.user
    const user = userIdentity.user["userId"]
    conn.query("UPDATE shoppingcart SET quantity = ? WHERE userId = ? and details = ?",[quantity,user,details], (err,file)=>{
        if (err) throw err;
        res.send("quantity updated successfully")
    })  
})
router.get("/details/changepreferredcolor",(req,res)=>{ 
    conn.query("update product set img1= REPLACE(img1,')','')", (err,done)=>{
        if (err) throw err;
        res.send(done)
    })  
})

router.get("/decreasecart",verifyToken, (req,res)=>{   
    const details = req.query.details;
    const userIdentity = req.user
    const user = userIdentity.user["userId"]
    conn.query("SELECT quantity FROM shoppingcart WHERE id = ?", [details], (err, quantity)=>{
        if (err) throw err;
        if(quantity[0].quantity > 1){
         conn.query("UPDATE shoppingcart SET quantity = quantity - 1 WHERE userId = ? and id = ?",[user,details], (err,file)=>{
        if (err) throw err;
        conn.query("SELECT *,CONCAT ('₦', FORMAT(sellingprice,0))as mainprice,CONCAT ('₦', FORMAT(sellingprice*quantity,0)) as subtotal FROM shoppingcart WHERE userId=? order by id desc",[user],(err,files)=>{
            if (err) throw err;
        conn.query("SELECT CONCAT ('₦', FORMAT( SUM(quantity*sellingprice),0)) as totalprice FROM shoppingcart WHERE userId =?",[user], (err,totalprice) =>{
            if (err) throw err;
            const filess={
                files,  
                totalprice: totalprice[0].totalprice
            }  
            res.send(filess)
        })  
      })     
    })       
        }else{  
            messages={
                failed:true,
                message:"cannot update when value = 1"
            }
            res.send(messages)
        } 
    })     
})

router.get("/deletecart",verifyToken, (req,res)=>{
    const details = req.query.details;
    const userIdentity = req.user
    const user = userIdentity.user["userId"]
    conn.query("DELETE FROM shoppingcart  WHERE userId = ? and id = ?",[user,details], (err,file)=>{
        if (err) throw err;
        res.send("cart deleted") 
    })   
})                  

router.get("/checkout",verifyToken, (req,res)=>{
    const userIdentity = req.user
    const user = userIdentity.user["userId"]
    console.log("shoppingcart user", user)
    conn.query("SELECT * FROM user WHERE userid = ?",[user], (err,file)=>{
        if (err) throw err;
        if(!file) return res.sendStatus(403)
        conn.query("SELECT *,CONCAT ('₦', FORMAT(sellingprice,0))as mainprice,CONCAT ('₦', FORMAT(sellingprice*quantity,0)) as subtotal FROM shoppingcart WHERE userId=? order by id desc",[user],(err,files)=>{
            if (err) throw err;
        conn.query("SELECT CONCAT ('₦', FORMAT( SUM(quantity*sellingprice),0)) as totalprice FROM shoppingcart WHERE userId =?",[user], (err,totalprice) =>{
            if (err) throw err;
            const filess={
                files,  
                totalprice: totalprice[0].totalprice
            }  
            res.send(filess)
        })  
      })     
    })
}) 
       //clear
router.get("/submittedcart",verifyToken, (req,res)=>{   
    const userIdentity = req.user;     
    const user= userIdentity.user["userId"] 
    const requser = req.query.user
    conn.query("SELECT * FROM user WHERE userId = ?",[user], (err,file)=>{
        if (err) throw err;
        conn.query("SELECT *,CONCAT ('₦', FORMAT(sellingprice,0))as mainprice,CONCAT ('₦', FORMAT(sellingprice*quantity,0)) as subtotal FROM submittedcart WHERE userId=?",[user],(err,files)=>{
            if (err) throw err;
        conn.query("SELECT CONCAT ('₦', FORMAT( SUM(quantity*sellingprice),0)) as totalprice FROM submittedcart WHERE userId =?",[user], (err,totalprice) =>{
            if (err) throw err;
            const filess={
                files, 
                totalprice: totalprice[0].totalprice
            }  
         //   console.log("submitted cart submitted cart submitted cart submitted cart submitted cart submitted cart", files)
            res.send(filess)
        })   
      })     
    })
})                                 
                    
router.get("/",(req,res)=>{  
    conn.query("select savedItems from user  WHERE userid =?", [241], (err,file)=>{
        if (err) throw err;
 //  conn.query("UPDATE user SET savedItems ='' WHERE userid =?", [241], (err,fil)=>{
  //   if (err) throw err; 
        res.send(JSON.parse(file[0].savedItems));
 //   })
})
})     
router.get("/count/userdetails",verifyToken,(req,res)=>{
    const user = req.user;
    let userIdentity = user.user["userId"]
    conn.getConnection((err, connection) => {
        if (err) throw err
 conn.query("SELECT COUNT (*) AS noOfSaved from saveditems WHERE userId=?",[userIdentity],(err, savedcount)=>{
     if (err) throw err;
 conn.query("SELECT COUNT (*) AS noOfCart from submittedcart WHERE userId=?",[userIdentity],(err, cartcount)=>{
    if (err) throw err;
conn.query("SELECT businessName from user WHERE userId =?", [userIdentity], (err, name)=>{
    if (err) throw err;
conn.query("SELECT COUNT (*) AS noOfOrder from submittedcart WHERE seller=?",[name[0].businessName],(err, ordercount)=>{
    if (err) throw err;

console.log("savedcount,cartcount,ordercount",savedcount[0],cartcount[0],ordercount[0])
res.send({savedcount,cartcount,ordercount})
    })
})   })
})
})
})                   
//fetch                    
router.get("/save",verifyToken, (req,res)=>{
    const user = req.user;           
    const details = req.query.details
    let d = new Date()
    let time = d.getTime();

    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December']; 
    let currentDate = `${days[d.getDay()]} ${d.getDate()}${d.getDate() === 22 || d.getDate() === 22 ? "nd" : d.getDate() === 3 || d.getDate()===23 ? "rd" : "th" } of ${months[d.getMonth()]}  ${d.getFullYear()}`
     
    const productId = parseInt(req.query.productId)
    let userIdentity = user.user["userId"]
    conn.getConnection((err, connection) => {
        if (err) throw err
        connection.query("SELECT * from product WHERE productId=?",[productId],(err, product)=>{
            if (err) throw err;
            connection.query("select * from saveditems WHERE userId = ? AND productId =?", [userIdentity,productId], (err, savedproducts)=>{
                if (err) throw err;
     connection.query("SELECT * from user WHERE userId = ?", [userIdentity], (err, items)=>{
                    if (err) throw err;
                    let newsavedItems;
                    console.log("savedproducts[0]",savedproducts[0])
                    let oldSavedItems = items[0].savedItems
            if (savedproducts && savedproducts[0]){
                connection.query("DELETE from saveditems WHERE userId =? AND productId =?",[userIdentity,productId],(err, deleted)=>{
                    if (err) throw err;
                })        
            }else{
                connection.query("insert into saveditems (userId,productId,generalcategory,category,mainimg,officialimg,brand,date,time,details, model, color) values (?,?,?,?,?,?,?,?,?,?,?,?)", [userIdentity,product[0].productId,product[0].generalcategory,product[0].category,product[0].mainimg,product[0].officialimg,product[0].brand,time,currentDate,product[0].details,product[0].model,product[0].color],(err, userdetails)=>{
                    if (err) throw err;
                })
            }
            
         if(items[0] && items[0].savedItems && JSON.parse(items[0].savedItems).includes(parseInt(productId))){
            oldSavedItems = JSON.parse(oldSavedItems)
            oldSavedItems.splice(oldSavedItems.indexOf(productId),1)
            newsavedItems = JSON.stringify(oldSavedItems)
         }else{
            oldSavedItems = JSON.parse(oldSavedItems)
            oldSavedItems.push(parseInt(productId)) 
            newsavedItems = JSON.stringify(oldSavedItems)
         }
         connection.query("UPDATE user SET savedItems = ? WHERE userId =?", [newsavedItems, userIdentity], (err,file)=>{
            if (err) throw err;
            connection.query("SELECT * from user WHERE userId=?", [userIdentity],(err, currentuserdetails)=>{
                if (err) throw err;
                const messages ={  
                    success: true,
                    message: `${details}`,
                    header:`Product Has Been Saved Successfully`
                } 
res.send({messages,userdetails:currentuserdetails[0]});
          })
        }) 
        })
     })
    })
}) 
})


router.get("/unsave",verifyToken, (req,res)=>{
    const user = req.user;
    const productId = parseInt(req.query.productId)
    let userIdentity = user.user["userId"]
    conn.getConnection((err, connection) => {
        if (err) throw err
        connection.query("DELETE from saveditems WHERE userId =? AND productId =?",[userIdentity,productId],(err, deleted)=>{
            if (err) throw err;
    connection.query("SELECT savedItems from user WHERE userId=?", [userIdentity],(err, savedItem)=>{
        if (err) throw err;
            let newSavedItems = savedItem[0].savedItems
            newSavedItems=JSON.parse(newSavedItems)
            newSavedItems.splice(newSavedItems.indexOf(productId),1)
            newSavedItems = JSON.stringify(newSavedItems);
            connection.query("UPDATE user SET savedItems = ? WHERE userId =?", [newSavedItems, userIdentity], (err,file)=>{
              if (err) throw err;
    
              res.send(`<b> Product Unsaved Successfully </b>`);
            })
        })
    })  
})    
})                

router.get("/orders",verifyToken,(req,res)=>{
    const user = req.user;     
   let userIdentity = user.user["userId"] 
   conn.getConnection((err, connection) => { 
    if (err) throw err
    connection.query("SELECT businessName from user WHERE userId=?", [userIdentity],(err, businessName)=>{
        if (err) throw err;    
        console.log("businessName[0].businessName",businessName[0].businessName)                                                                                                                                    
    conn.query("SELECT *,CONCAT ('₦', FORMAT(sellingprice,0))as mainprice,CONCAT ('₦', FORMAT(sellingprice*quantity,0)) as subtotal FROM submittedcart inner join user  WHERE submittedcart.seller =?  group by submittedcart.productId",[businessName[0].businessName],(err,files)=>{
        if (err) throw err;
    conn.query("SELECT CONCAT ('₦', FORMAT( SUM(quantity*sellingprice),0)) as totalprice FROM submittedcart WHERE seller =?",[businessName[0].businessName], (err,totalprice) =>{
        if (err) throw err;        
        const filess={   
            files, 
            totalprice: totalprice[0].totalprice      
        }                                     
 res.send(filess);             
})                        
   })                                                         
})      
})               
})

router.get("/like/comment",verifyToken,(req,res)=>{
    const userIdentity = req.user;     
   let user = userIdentity.user["userId"] 
   const ratingId = req.query.commentId
   const productId = req.query.productId
   conn.getConnection((err, connection)=>{
       if (err) throw err;
       connection.query("SELECT * from productrating where ratingId = ?",[ratingId], (err, prorating)=>{
           if (err) throw err;
           if(prorating[0].dislikes && JSON.parse(prorating[0].dislikes).includes(user)){
            let dislikes = prorating[0].dislikes
            dislikes=JSON.parse(dislikes)
            dislikes.splice(dislikes.indexOf(productId),1)
            dislikes = JSON.stringify(dislikes); 
          connection.query("Update productrating set dislikes = ?",[dislikes],(err,updatedlikes)=>{
                if (err) throw err;         
                console.log("updated dislikes")     
        })
    }
            if(prorating[0].likes && JSON.parse(prorating[0].likes).includes(user)){
                let likes = prorating[0].likes
                likes=JSON.parse(likes)
                likes.splice(likes.indexOf(productId),1)
                likes = JSON.stringify(likes); 
                connection.query("Update productrating set likes = ? where ratingId = ?",[likes,ratingId],(err,updateddislikes)=>{
                    if (err) throw err;
                    connection.query("SELECT * from productrating where productId = ? order by ratingId DESC",[productId],(err,currentprorating)=>{
                        if (err) throw err;
                        console.log("updated likes")
                  res.send(currentprorating)
                })  
                })
            }else{
                let likes = JSON.parse(prorating[0].likes)
            console.log("dislikes",typeof(likes),likes)
            likes.push(user) 
            likes=JSON.stringify(likes)
            connection.query("Update productrating set likes = ? where ratingId = ?",[likes,ratingId],(err,updateddislikes)=>{
                if (err) throw err;
                connection.query("SELECT * from productrating where productId = ? order by ratingId DESC",[productId],(err,currentprorating)=>{
                    if (err) throw err;
                    console.log("updated likes")
              res.send(currentprorating)
            })  
            })
            }
   })
})
})
//services
router.get("/dislike/comment",verifyToken,(req,res)=>{
    const userIdentity = req.user;     
   let user = userIdentity.user["userId"] 
   const ratingId = req.query.commentId
   const productId = req.query.productId
   conn.getConnection((err, connection)=>{
       if (err) throw err;
       connection.query("SELECT * from productrating where ratingId = ?",[ratingId], (err, prorating)=>{
           if (err) throw err;
           if(prorating[0].likes && JSON.parse(prorating[0].likes).includes(user)){
            let likes = prorating[0].likes
            likes=JSON.parse(likes)
            likes.splice(likes.indexOf(productId),1)
            likes = JSON.stringify(likes); 
          connection.query("Update productrating set likes = ?",[likes],(err,updatedlikes)=>{
                if (err) throw err;         
                console.log("updated likes")     
        })
    }
            if(prorating[0].dislikes && JSON.parse(prorating[0].dislikes).includes(user)){
                let dislikes = prorating[0].dislikes
                dislikes=JSON.parse(dislikes)
                dislikes.splice(dislikes.indexOf(productId),1)
                dislikes = JSON.stringify(dislikes); 
                connection.query("Update productrating set dislikes = ? where ratingId = ?",[dislikes,ratingId],(err,updateddislikes)=>{
                    if (err) throw err;
                    connection.query("SELECT * from productrating where productId = ? order by ratingId DESC",[productId],(err,currentprorating)=>{
                        if (err) throw err;
                        console.log("updated dislikes")
                  res.send(currentprorating)
                })  
                })
            }else{
                let dislik = JSON.parse(prorating[0].dislikes)
            console.log("dislikes",typeof(dislik),dislik)
            dislik.push(user) 
            dislik=JSON.stringify(dislik)
            connection.query("Update productrating set dislikes = ? where ratingId = ?",[dislik,ratingId],(err,updateddislikes)=>{
                if (err) throw err;
                connection.query("SELECT * from productrating where productId = ? order by ratingId DESC",[productId],(err,currentprorating)=>{
                    if (err) throw err;
                    console.log("updated dislikes")
              res.send(currentprorating)
            })  
            })
            }
   })
})
})
router.get("/dislike/comment",verifyToken,(req,res)=>{
    const userIdentity = req.user;     
   let user = userIdentity.user["userId"] 
   const ratingId = req.query.commentId
   const productId = req.query.productId
   conn.getConnection((err, connection)=>{
       if (err) throw err;
       connection.query("SELECT * from productrating where ratingId = ?",[ratingId], (err, prorating)=>{
           if (err) throw err;
           if(prorating[0].likes && JSON.parse(prorating[0].likes).includes(user)){
            let likes = prorating[0].likes
            likes=JSON.parse(likes)
            likes.splice(likes.indexOf(productId),1)
            likes = JSON.stringify(likes); 
          connection.query("Update productrating set likes = ?",[likes],(err,updatedlikes)=>{
                if (err) throw err;         
                console.log("updated likes")     
        })
    }
            if(prorating[0].dislikes && JSON.parse(prorating[0].dislikes).includes(user)){
                let dislikes = prorating[0].dislikes
                dislikes=JSON.parse(dislikes)
                dislikes.splice(dislikes.indexOf(productId),1)
                dislikes = JSON.stringify(dislikes); 
                connection.query("Update productrating set dislikes = ? where ratingId = ?",[dislikes,ratingId],(err,updateddislikes)=>{
                    if (err) throw err;
                    connection.query("SELECT * from productrating where productId = ? order by ratingId DESC",[productId],(err,currentprorating)=>{
                        if (err) throw err;
                        console.log("updated dislikes")
                  res.send(currentprorating)
                })  
                })
            }else{
                let dislik = JSON.parse(prorating[0].dislikes)
            console.log("dislikes",typeof(dislik),dislik)
            dislik.push(user) 
            dislik=JSON.stringify(dislik)
            connection.query("Update productrating set dislikes = ? where ratingId = ?",[dislik,ratingId],(err,updateddislikes)=>{
                if (err) throw err;
                connection.query("SELECT * from productrating where productId = ? order by ratingId DESC",[productId],(err,currentprorating)=>{
                    if (err) throw err;
                    console.log("updated dislikes")
              res.send(currentprorating)
            })  
            })
            }
   })
})
})
router.get("/clear/cart",verifyToken,(req,res)=>{
    const user = req.user;     
   let userIdentity = user.user["userId"] 
   const cartId = req.query.cartId
   const seller = req.query.seller
   const rating = req.query.rating
   const comment = req.query.comment
   const productId = req.query.productId
   conn.getConnection((err, connection) => { 
    if (err) throw err
    connection.query("SELECT * FROM submittedcart WHERE id=?", [cartId],(err, cart)=>{
        if (err) throw err;       
        console.log(cart)
    conn.query("INSERT INTO userrating (productId,buyerId,sellerId,rating,percentagerating,comment) VALUES (?,?,?,?,?,?)",[cart[0].productId,userIdentity,cart[0].seller,rating,rating,comment],(err, file)=>{
        if (err) throw err;
    connection.query("UPDATE submittedcart SET status = ? WHERE id =?", ["cleared",cartId],(err, update1)=>{
        if (err) throw err;                                                                                                                                        
 connection.query("UPDATE user SET verifiedsales=verifiedsales+1 WHERE businessName =?", [seller],(err, update2)=>{
            if (err) throw err; 
connection.query("SELECT * from product where productId =?", [productId],(err,verifiedprosales)=>{
    if (err) throw err;
    let prevsales= JSON.parse(verifiedprosales[0].verifiedsales)
    prevsales.push(userIdentity)
    prevsales = JSON.stringify(prevsales)
connection.query("UPDATE product SET verifiedsales=? WHERE productId =?", [prevsales,productId],(err, update2)=>{
                if (err) throw err; 
  connection.query("UPDATE user SET verifiedpurchases=verifiedpurchases+1 WHERE userId =?", [userIdentity],(err, update3)=>{
                if (err) throw err; 
 conn.query("INSERT INTO verifiedsales (cartId,userId,productId,details,mainimg,sellingprice,quantity,color,size,seller,category,generalcategory,invoiceId,dateoforder) select id,userId,productId,details,mainimg,sellingprice,quantity,color,size,seller,generalcategory,category,invoiceId,dateoforder from submittedcart where id = ?",[cartId],(err,files)=>{
                    if(err) throw err;
connection.query("SELECT * from submittedcart where userId =?", [userIdentity],(err,submittedcart)=>{
                 if (err) throw err;
    if(update1){
        res.json({response:`<span className="fa fa-check-circle text-success"></span> <br/>Cart Cleared Successfully!<br/><small> ${verifiedprosales[0].details}</small>`,submittedcart});   
    }else{
        res.json({response:"Failed to clear cart",submittedcart});
    }               
})                                                                                     
})       
})
})        
    }) 
})
}) 
   })    
})
}) 
})
    
router.get("/invoice",verifyToken,(req,res)=>{    
    const user = req.user;     
   let userIdentity = user.user["userId"] 
  const cartId = req.query.cartId
   conn.getConnection((err, connection) => {              
    if (err) throw err
    connection.query("SELECT *,CONCAT ('₦', FORMAT(sellingprice,0))as mainprice,CONCAT ('₦', FORMAT(sellingprice*quantity,0)) as subtotal from submittedcart WHERE id=?", [cartId],(err, cart)=>{
        if (err) throw err;                                                                                                                                        
    conn.query("SELECT * from user  WHERE userId =?",[cart[0].userId],(err,buyer)=>{
        if (err) throw err;
        conn.query("SELECT * from user  WHERE businessName =?",[cart[0].seller],(err,seller)=>{
            if (err) throw err;     
        const filess={            
            cart,  
            buyer,   
            seller           
        }                                     
 res.send(filess);             
})                         
   })                                                         
})            
})             
})           
             //save
router.get("/group/invoice",verifyToken,(req,res)=>{    
    const user = req.user;     
   let userIdentity = user.user["userId"] 
  const invoiceId = req.query.invoiceId
  console.log(invoiceId)
   conn.getConnection((err, connection) => {              
    if (err) throw err
    connection.query("SELECT *,CONCAT ('₦', FORMAT(sellingprice,0))as mainprice,CONCAT ('₦', FORMAT(sellingprice*quantity,0)) as subtotal from submittedcart WHERE invoiceId=?", [invoiceId],(err, cart)=>{
        if (err) throw err;                                                                                                                                        
    conn.query("SELECT * from user  WHERE userId =?",[cart[0].userId],(err,buyer)=>{
        if (err) throw err;
        conn.query("SELECT * from user  WHERE businessName =?",[cart[0].seller],(err,seller)=>{
            if (err) throw err;    
            console.log("cart",cart)
        const filess={            
            cart,  
            buyer,   
            seller      
        }                                     
 res.send(filess);             
})                         
   })                                                         
})        
})         
})   

router.get("/group/submittedcart",verifyToken,(req,res)=>{    
    const user = req.user;     
   let userIdentity = user.user["userId"] 
   conn.getConnection((err, connection) => {              
    if (err) throw err
    connection.query("SELECT businessName from user WHERE userId=?", [userIdentity],(err, businessName)=>{
        if (err) throw err;    
    connection.query("SELECT *, COUNT(*) as colory,CONCAT ('₦', FORMAT(sellingprice,0))as mainprice,CONCAT ('₦', FORMAT( SUM(sellingprice*quantity),0)) as subtotal from submittedcart inner join user using (userId) where submittedcart.seller =?  group by submittedcart.invoiceId", [businessName[0].businessName,businessName[0].businessName],(err, groupcart)=>{
        if (err) throw err; 
    connection.query("SELECT CONCAT ('₦', FORMAT( SUM(quantity*sellingprice),0)) as totalprice FROM submittedcart WHERE seller =?",[businessName[0].businessName], (err,totalprice) =>{
            if (err) throw err;   
            const file={
                groupcart,
                totalprice:totalprice[0].totalprice    
            }     
            connection.release()                                                                                                                                                               
 res.send(file);                                                                     
})        
    })
})         
})
})
router.get("/check/save",verifyToken,(req,res)=>{ 
   // const productId = parseInt(req.query.productId);
    const user = req.user; 
   let userIdentity = user.user["userId"] 
   conn.getConnection((err, connection) => {
    if (err) throw err
connection.query("SELECT savedItems from user WHERE userid=?", [userIdentity],(err, savedItem)=>{
    if (err) throw err;   
res.send(savedItem[0].savedItems);   
})  
})   
})              
     //fetchbyuserId/saveditems
router.get("/fetchbyuserId/saveditems",verifyToken,(req,res)=>{
   // const id= req.params.userId;
   const userIdentity= req.user;         
   let id = userIdentity.user["userId"]   
   console.log("na saved items route be this")              
            conn.query("SELECT * FROM saveditems WHERE userId = ? ORDER BY id DESC",[id], (err, files)=>{
            if (err) throw err;                    
            console.log(id,"saved",files)      
             res.send(files)
  
    })

})

router.get("/fetchbyemail/saveditems",verifyToken,(req,res)=>{
    // const id= req.params.userId;
    const userIdentity= req.user;
    let id = userIdentity.user["userId"]
    console.log(req.query.email,"req.query.email")
     conn.query('SELECT savedItems FROM user WHERE email =?',[req.query.email],(err, savedItems)=>{
         if (err) throw err;
         if(!savedItems || savedItems[0].savedItems.length === 0){                
          res.send([])     
         }else{        
             let savedItemss = savedItems[0].savedItems
             savedItemss = JSON.parse(savedItemss)
            savedItemss.join(",");
             conn.query("SELECT *, CONCAT('₦', FORMAT(sellingprice, 0)) AS mainprice FROM product INNER JOIN product_rating using (productId) WHERE productId IN ("+savedItemss+")", (err, files)=>{
             if (err) throw err;                   
             files.map(file => {      
                 file["authur"] = "Eze Ogbonnaya"   
                 if(file.productrating){        
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
            
     //         console.log(files)
              res.send(files)
             })
         } 
     })
 })
  
router.get("/fetch/followers",verifyToken,(req,res)=>{
    const user = req.user;
    let userIdentity = user.user["userId"] 
    const email = req.query.email
    console.log(email)
    conn.query("SELECT * FROM user WHERE userId =?",[userIdentity],(err, follow)=>{
        if (err) throw err;
 //       console.log(followers[0].followers, userIdentity)
        if(follow[0].followers && JSON.parse(follow[0].followers).length === 0){
         res.send([])   
        }else{   
        let followersggg = JSON.parse(follow[0].followers)
         // followersggg.join(",");
//followersggg = JSON.stringify(followersggg)
        conn.query("SELECT * FROM user WHERE userId IN ("+followersggg+")",(error, file)=>{
            if (error) throw error;          
            res.send(file)
        })   
     }    
 })  
})      
        
router.get("/fetch/following",verifyToken,(req,res)=>{
    const user = req.user;
    let userIdentity = user.user["userId"]
    const email = req.query.email
    conn.query("SELECT * FROM user WHERE userId =?",[userIdentity],(err, following)=>{
        if (err) throw err; 
 //       console.log(followers[0].followers, userIdentity)
        if(following[0].following && JSON.parse(following[0].following).length === 0){
         res.send([])    
        }else{   
        let followingggg = JSON.parse(following[0].following) 
          followingggg.join(",");
        conn.query("SELECT * FROM user WHERE userId IN ("+followingggg+")",(error, file)=>{
            if (error) throw error;            
            res.send(file)  
        })      
     }           
 })
})  
       
router.get("/userprofile/:id",(req,res)=>{
    const id = req.params.id;
    console.log(id)
    conn.query("SELECT * FROM user WHERE userId=?", [id], (err,file)=>{
        if(err) throw err;
        if(file.length === 0){
            res.send("user is not registered")
        }else{
            console.log("goods day")
            const messages={
                file:file[0],
                message:"successful"
            }
            
           res.send(messages)
        }
    })
})
      
        
router.get("/change/bgcolor",verifyToken,(req,res)=>{
    const color = req.query.color.length > 0 ? req.query.color :"white";
    const user = req.user;
    let userIdentity = user.user["userId"]
            conn.query("update user set background =? WHERE userId=?", [color,userIdentity], (err,file)=>{
                if(err) throw err;   
                conn.query("select * from user WHERE userId=?", [userIdentity], (err,userdetails)=>{
                    if(err) throw err;            
                    res.send(userdetails)   
                })  
            }) 
    })       
router.get("/fetch/services",(req,res)=>{
   // const user = req.user;
   // let userIdentity = user.user["userId"]
  const lat = parseInt(req.query.lat)
  const long = parseInt(req.query.long)
  
    conn.query(`select * from product inner join user on (product.store=user.businessName) group by product.store order by abs(${lat} - user.storelat),abs(${long} - user.storelong)`, (err,services)=>{
            if(err) throw err;             
            res.send(services)   
        })      
    })     

module.exports = router;    
