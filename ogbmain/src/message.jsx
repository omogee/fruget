import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./main.css"
import {Link, withRouter} from "react-router-dom"
import Messagee from "./storage"
import {fetchconnections,viewuserdetailsbyuserId,viewotheruserdetailsbyuserId,getdetails,sendmessage,fetchmessage} from "./store"
import Cookies from "js-cookie"
import querystring from "query-string"
import {compose} from 'redux'
import {formatlastSeen, getSentTime} from "./formatTime"
//import {w3cwebsocket as w3cWebSocket} from "websocket"
import socket from "./socket"

class Message extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            productId:"",
            message:"",
            userId:"",
            connectedusers:[],
            messenger:null,
            messages:[],
            typingClients:[],
            otheruserId:null,
            optiondisplay:"none",
            otheruserlastseen:""
         }
    }
    
    componentDidMount=()=>{      
        let otheruserId =  this.props.otheruser 
        console.log(this.props.otheruser)
   //      otheruserId = otheruserId.slice(5,otheruserId.length)
     //    otheruserId = parseInt(otheruserId)
       //  otheruserId = otheruserId.toString()
      //   otheruserId = otheruserId.slice(0, -3);
        this.setState({otheruserId})
   //     socket.emit('add user', Cookies.get("ado_f"));

        const parsedQuery =  querystring.parse(this.props.location.search);
      console.log("parsedQuery",parsedQuery)
    const productId = parsedQuery.item
    this.setState({productId})
  
      let mainToken
        if(Cookies.get("cm_pp")){
            const myToken = Cookies.get("cm_pp")
            let myMainTokenlen = parseInt(myToken.split("%")[0])
             let userIdlen = parseInt(myToken.split("%")[1])
             let userIdpos = parseInt(myToken.split("%")[2].charAt(0)+myToken.split("%")[2].charAt(1))
             let userId = myToken.slice(userIdpos, userIdpos+userIdlen)
              mainToken = myToken.slice(userIdpos+userIdlen, myMainTokenlen)
             let userId2 = mainToken.slice(userIdpos, userIdpos+userIdlen)
             this.setState({userId})
             console.log(userId)
            
      const data ={productId,otheruserId,userId,token:Cookies.get("token")}
             if(parsedQuery.item !== undefined){
          this.props.getdetails(data)
             }
         this.props.viewotheruserdetailsbyuserId(otheruserId)
          //   this.props.fetchemail(userId)
            this.props.fetchmessage(data)  
         } else{
           this.props.history.push("/customer/login")
         }
       /*
          socket.on("last seens", data =>{
            if(this.props.otheruserdetails.userId === data.id){
             this.setState({otheruserlastseen:data.time})
            }
          })
          */
          socket.on("typing client", data => { 
            let typingClients = this.state.typingClients
            if(typingClients.includes(parseInt(data))){
              console.log("it includes")
            }else{
              typingClients.push(parseInt(data))
              this.setState({typingClients})
             console.log("typing client",typingClients)
            }
          });    
          socket.on("untyping client", data => { 
            let typingClients = this.state.typingClients
            if(typingClients.includes(parseInt(data))){
             typingClients.splice(typingClients.indexOf(parseInt(data)), 1)
             this.setState({typingClients})
          
             console.log("typing client is included",typingClients)
            }else{
             console.log("it has already been removed")
             console.log("typing client",typingClients)
             console.log("this.props.match.params.email",this.props.match.params.email)
            }
          });     

          let iden = {
            otheruserId:this.state.otheruserId,
            userId:this.state.userId
          }
       socket.emit("read", iden)    
          socket.on("messages", messagge => { 
            let messages = this.state.messages
            messages.push(messagge)
            console.log("messagge",messagge)
              this.setState({messages})
              this.messageElement.scrollTop =  this.messageElement.scrollHeight;
            });
            socket.on("recieve message", messagge => { 
              if(parseInt(messagge.sender) === this.props.otheruserdetails.userId){              
              let messages = this.state.messages
              messages.push(messagge)
                this.setState({messages})
                let id = {
                  otheruserId,
                  userId:this.state.userId
                }
             socket.emit("read", id)
                this.messageElement.scrollTop =  this.messageElement.scrollHeight; 
              }
              });
              socket.on("read report", messagge => { 
                let messages = this.state.messages
                 for (var i =0; i<messages.length; i++){
                        messages[i].status = "read"   
                 }
                  this.setState({messages})
                  if(messages.length === 0){
                    const data ={
                      productId:this.state.productId,
                      otheruserId:this.state.otheruserId,
                      userId:this.state.userId,
                      token:Cookies.get("token")}
                    this.props.fetchmessage(data)
                  }
                });
            socket.on("delivery report", messagge => { 
                let messages = this.state.messages
                 for (var i =0; i<messages.length; i++){
                     if(messages[i].message === messagge.message){
                        messages[i].status = "delivered"   
                     } 
                 }
                  this.setState({messages})
                  if(messages.length === 0){
                    const data ={
                      productId:this.state.productId,
                      otheruserId:this.state.otheruserId,
                      userId:this.state.userId,
                      token:Cookies.get("token")}
                    this.props.fetchmessage(data)
                  }
                });
                socket.on("sent report", messagge => { 
                  let messages = this.state.messages
                   for (var i =0; i<messages.length; i++){
                       if(messages[i].message === messagge.message){
                          messages[i].status = "sent"   
                       }
                   }
                    this.setState({messages})
                    console.log("sent report",messages)
                //    socket.emit("delivered",messagge)
                //    socket.emit("read", otheruserId) 
                  });
          socket.on("message", messagge => { 
            console.log("message", messagge)
         //   this.props.viewuserdetails(this.props.email)
            });
          
            this.scrollToTop()
    }
    componentDidUpdate() {
      this.scrollToTop();
    }
    scrollToTop =()=>{
    //  alert("re-arranging")
     this.messageElement.scrollTop =  this.messageElement.scrollHeight;
 //  this.dummyDiv.scrollIntoView({behavior:"smooth"})
    }
    change=(e)=>{
        const data ={
            "reciept": this.props.otheruserdetails.userId,
            "sender":this.state.userId
          }
 this.setState({message:e.target.value}, ()=>{
     if(this.state.message.length === 0){
        socket.emit("untyping", data)
     }
 })  
 socket.emit("typing", data)
    }
sendmessage=(e)=>{
     e.preventDefault()
     const parsedQuery =  querystring.parse(this.props.location.search);
   const productId = parsedQuery.item
     const data={
      "message":this.state.message,
      "product":this.props.productDetails,
      "reciept":this.props.otheruserdetails.userId,
      "sender":parseInt(this.state.userId)
   //   "senderId":parseInt(this.state.userId)
        }
    console.log("data",data)
  socket.emit("send message", data)
  //this.props.fetchconnections(this.state.userId)
   // this.props.sendmessage(data)
    this.setState({message:""})
    socket.emit("untyping", data)
    }
    render() {
      /**
       * {this.state.messages.map(message =>
    <div key={message} style={{padding:"0px"}}>
        <div style={{margin:"5px 0px",maxWidth:"80%",float:`${message.sender === parseInt(this.state.userId) ?"right" :"none"}`,clear:"both"}}>
  <small style={{ color:"black",border:"1px solid lightgrey",display:"inline-block",padding:"5px",borderRadius:`${message.sender === parseInt(this.state.userId) ? "10px 10px 0px 10px" :"10px 10px 10px 0px"}`,backgroundColor:`${message.sender === parseInt(this.state.userId) ?"rgba(26, 198, 255,0.1)" :"white"}`}}>  
     
  {message.sender === parseInt(this.state.userId) && this.props.productDetails.length > 0 ? 
  this.props.productDetails.map(product =>
        <div style={{backgroundColor:"white",border:"1px solid lightgrey",borderLeft:"3px solid #cc6699",borderRight:"3px solid #cc6699",padding:"2px",borderRadius:"10px"}}>
            <div  className="row">
                       <div className="col-1"> 
<img src={`https://res.cloudinary.com/fruget-com/image/upload/${product.generalcategory}/${product.category}/${product.mainimg}`}  style={{border:"1px solid grey",paddingTop: "2px",borderRadius:"50%",height:"30px"}}  alt=""/>
                       </div>
                       <div className="col-7 ml-3"  style={{textTransform:"capitalize",color:"#cc6699",fontWeight:"bolder"}}>
<small> { product.details.length > 30 ? product.details.slice(0,30)+"..." : product.details}</small>
                       </div>
                       <div className="col-3">
                           <small style={{fontWeight:"bold"}}>
                               { product.mainprice}
                           </small>
                       </div>
            </div>
        </div>
   )  : null}

       {message.message}
         <small style={{float:"right",padding:"5px"}} className="text-muted">{message.time}
         <span  className="text-primary" style={{padding:"3px"}}>
             {message.status === "read" && message.sender === parseInt(this.state.userId)?
            <span className="fa fa-check-double text-primary"></span>
            :  message.status === "delivered" && message.sender === parseInt(this.state.userId) ?
            <span className="fa fa-check-double text-muted"></span>
            :  message.status === "sent" && message.sender === parseInt(this.state.userId)?
            <span className="fa fa-check text-muted"></span>
            :  message.status === "pending" && message.sender === parseInt(this.state.userId)?
            <span className="fa fa-clock-o text-danger"></span>
            : null
            } 
             </span></small>
          </small>
    </div>
    </div>
    )}
 

       */
      let overallMessage = this.props.messages 
     const overallMessages = overallMessage.concat(this.state.messages)
     for (var i=0; i<overallMessages.length; i++){
       overallMessages[i].daysent =getSentTime(overallMessages[i].time)
     }
 
     if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        return ( 
            <div>
   <div  className="" style={{color:"white"}}>
 <div  style={{display:"flex",flexWrap:"nowrap",backgroundColor: "#006080",width:"100%",padding:"10px 10px 10px 5px",borderBottom:"1px solid lightgrey"}}>             
<div style={{width:"15%"}}>
    <center>
<img src={this.props.otheruserdetails ? `https://res.cloudinary.com/fruget-com/image/upload/profile/${this.props.otheruserdetails.profileImage}`: require(`./images/maleprofile.png`)}  style={{border:"1px solid grey",borderRadius:"50%",width:"90%",height:"40px"}}  alt=""/>
</center>     
</div>  
<div  style={{margin:"0px",lineHeight:"15px",paddingLeft:"5px",width:"67%"}}>
  <Link to={`/profile/${this.props.otheruserdetails.email}`}>
   <small style={{color:"white",textTransform:"capitalize",fontWeight:"bold",fontSize:"14px",padding:"0px"}}>
     {this.props.otheruserdetails.fullName}
     </small>
     </Link><br/>
   <small style={{marginTop:"5px"}}>
   <i>
      {this.props.typingClients.includes(parseInt(this.props.otheruserdetails.userId))
       ? "typing"
      :this.props.connectedclients.includes(this.props.otheruserdetails.userId)
       ? "Online"
      : formatlastSeen(this.props.otheruserlastseen.time) !== null && this.props.otheruserlastseen.id === this.props.otheruserdetails.userId ?
      formatlastSeen(this.props.otheruserlastseen.time)
      :formatlastSeen(this.props.otheruserdetails.lastseen)
   }
       </i>
       </small><br/>
</div>
<div className="col-1">
<a href={`tel:${this.props.otheruserdetails.contact}`}  style={{color:"white"}}>
<span className="fa fa-phone" style={{fontSize:"20px"}}></span>
</a>
</div>
<div className="col-1">  
   <span className="fa fa-info-circle" onClick={()=>this.setState({optiondisplay:this.state.optiondisplay === "block" ? "none" : "block"})} style={{fontSize:"20px"}}></span>
<div style={{position:"absolute",display:`${this.state.optiondisplay}`,backgroundColor:"white",right:"5%",width:"400%",top:"30px"}}>
<div style={{padding:"10px",color:"black"}}>
  <small>Profile</small><br/>
  <small>Settings</small><br/>
</div>
</div>
</div>
</div>  

<div  style={{height:"420px",backgroundColor:`${this.props.userdetails.background || "white"}`,overflowy:"scroll",overflowX:"hidden"}}  ref={(a)=> this.messageElement = a}>
 <div>
<div  style={{backgroundColor:`${this.props.userdetails.background || "white"}`,width:"100%",padding:"3px"}} >
{overallMessages !== undefined ? overallMessages.map((message,i) =>
    <div key={message.time} style={{padding:"0px"}}>
      {i === 0 || overallMessages[i].daysent !== overallMessages[i > 0 ? i-1 : 0].daysent ? 
      <div style={{width:"100%",clear:"both"}}>
      <center>
        <small><button className="btn" style={{padding:"0px"}}>
          <small style={{color:`${this.props.userdetails.background === "black" ?"white":"black"}`,textTransform:"uppercase",fontWeight:"bold",fontSize:"8px",padding:"0px"}}>{message.daysent}</small>
          </button>
          </small>
      </center>
      </div>
      : null}
        <div style={{margin:"5px 0px",maxWidth:"80%",color:`${ this.props.userdetails.background === "black" ? "white" : "black"}`,float:`${message.sender === this.state.userId ?"right" :"none"}`,clear:"both"}}>
  <small style={{border:"1px solid lightgrey",display:"inline-block",padding:"5px",borderRadius:`${message.sender === this.state.userId ? "10px 10px 0px 10px" :"10px 10px 10px 0px"}`,backgroundColor:`${message.sender === this.state.userId ?"rgba(26, 198, 255,0.1)":"white"}`}}>
  
  {message.sender === this.state.userId && message.refdetails  && message.refdetails.length >0 ? 
        <div style={{backgroundColor:"white",border:"1px solid lightgrey",borderLeft:"3px solid #cc6699",borderRight:"3px solid #cc6699",padding:"2px",borderRadius:"10px"}}>
            <div  className="row">
                       <div className="col-1"> 
<img src={`https://res.cloudinary.com/fruget-com/image/upload/${message.refgencategory}/${message.refcategory}/${message.refmainimg}`}  style={{border:"1px solid grey",paddingTop: "2px",borderRadius:"50%",height:"30px"}}  alt=""/>
                       </div>
                       <div className="col-7 ml-3"  style={{textTransform:"capitalize",color:"#cc6699",fontWeight:"bolder"}}>
<small> { message.refdetails.length > 30 ? message.refdetails.slice(0,30)+"..." : message.refdetails}</small>
                       </div>
                       <div className="col-3">
                           <small style={{fontWeight:"bold"}}>
                               { message.refprice}
                           </small>
                       </div>
            </div>
        </div>
      : this.props.productDetails.map(product =>
        <div style={{backgroundColor:"white",border:"1px solid lightgrey",borderLeft:"3px solid #cc6699",borderRight:"3px solid #cc6699",padding:"2px",borderRadius:"10px"}}>
            <div  className="row">
                       <div className="col-1"> 
<img src={`https://res.cloudinary.com/fruget-com/image/upload/${product.generalcategory}/${product.category}/${product.mainimg}`}  style={{border:"1px solid grey",paddingTop: "2px",borderRadius:"50%",height:"30px"}}  alt=""/>
                       </div>
                       <div className="col-7 ml-3"  style={{textTransform:"capitalize",color:"#cc6699",fontWeight:"bolder"}}>
<small> { product.details.length > 30 ? product.details.slice(0,30)+"..." : product.details}</small>
                       </div>
                       <div className="col-3">
                           <small style={{fontWeight:"bold"}}>
                               { product.mainprice}
                           </small>
                       </div>
            </div>
        </div>
   )  }
         {message.message}
         <small style={{float:"right",padding:"3px"}} className="text-muted">{message.date.split("Tz")[1]}
        {message.sender === this.state.userId ?
        <span  className="text-primary" style={{margin:"3px"}}>
             { message.status  === "read" ?
            <span className="fa fa-check-double text-primary"></span>
            :  message.status === "delivered" ?
            <span className="fa fa-check-double text-muted"></span>
            : <span className="fa fa-check text-muted"></span>
            }
             </span>
             :null } 
             </small>
          </small>
    </div>
    </div>
    ) : null}
</div>
</div> 
 </div>

<div className="innermessageTypingBox" style={{backgroundColor:"white",padding:"0px 10px",margin:"0px",width:"100%"}}>
                          <form  action="/search" method="get" >
                  <div className="input-group mb-3" >
                  <div className="input-group-prepend">
               <button className={`btn ${this.state.navInputbtnclass}`} style={{fontSize:"20px",border:"1px solid lightgrey",borderTopLeftRadius:"20px",borderBottomLeftRadius:"20px",borderRight:"none"}} type="submit">
                   <span  className="fa fa-smile text-muted"></span>
               </button>  
                </div>        
                 <input type="text"  className="form-control form-control-lg" name="message" style={{borderLeft:"none",borderRight:"none"}} value={this.state.message}  onChange={this.change} placeholder="Type a message" />
                <div className="input-group-append">
               <button style={{border:"1px solid lightgrey",borderTopRightRadius:"20px",borderBottomRightRadius:"20px",borderLeft:"none"}} className={`btn ${this.state.navInputbtnclass}`} type="submit">
                   <span style={{fontSize:"20px"}} className="fa fa-camera text-muted"></span>
               </button>  
                </div>
                <div className="input-group-append" style={{padding:"5px"}}>
               <button className={`btn ${this.state.navInputbtnclass}`} style={{borderRadius:"40px",backgroundColor:`${this.state.message.length > 0 ? "green" : "grey"}`}} onClick={this.sendmessage}>
                   <span style={{color:"white"}} className="fa fa-paper-plane"></span>
               </button>  
                </div>
               </div>
                </form>
                </div> 
                </div>
                      </div>
         );
    }else{
      return(
        <div>
        <div  className="" style={{color:"white"}}>
      <div  style={{display:"flex",position:"fixed",top:"0px",zIndex:"3",flexWrap:"nowrap",backgroundColor: "#006080",width:"100%",padding:"10px 10px 10px 5px",borderBottom:"1px solid lightgrey"}}>             
      <div style={{width:"5%"}} className="d-block col-1 d-md-none">
 <a href={`/connections/dk/${Math.floor(Math.random()*100000000)}/${Math.floor(Math.random()*109990000000)}`}>
<span className="fa fa-arrow-left" style={{marginTop:"6px",color:"white",float:"left"}}></span>
</a>
  </div>
     <div style={{width:"15%"}}>
         <center>
     <img src={this.props.userdetails.profileImage ? `https://res.cloudinary.com/fruget-com/image/upload/profile/${this.props.userdetails.profileImage}`: require(`./images/maleprofile.png`)}  style={{border:"1px solid grey",borderRadius:"50%",width:"90%",height:"40px"}}  alt=""/>
     </center>     
     </div>  
     <div  style={{margin:"0px",lineHeight:"15px",paddingLeft:"5px",width:"67%"}}>
       <Link to={`/profile/${this.props.userdetails.email}`}>
        <small style={{color:"white",textTransform:"capitalize",fontWeight:"bold",fontSize:"14px",padding:"0px"}}>
          {this.props.userdetails.fullName}
          </small>
          </Link><br/>
        <small style={{marginTop:"5px"}}>
        <i>
           {this.props.typingClients.includes(parseInt(this.props.userdetails.userId))
            ? "typing"
           :this.props.connectedclients.includes(this.props.userdetails.userId) ? "Online"
            : formatlastSeen(this.props.userdetails.lastseen)
        }
            </i>
            </small><br/>
     </div>
     <div className="col-1">
     <a href={`tel:${this.props.userdetails.contact}`}  style={{color:"white"}}>
     <span className="fa fa-phone" style={{fontSize:"20px"}}></span>
     </a>
     </div>
     <div className="col-1">  
        <span className="fa fa-info-circle" style={{fontSize:"20px"}}></span>
     </div>
     </div>  
     
     <div className="mt-5" style={{height:"100%",backgroundColor:`${this.props.userdetails.background || "white"}`,overflowy:"scroll",overflowX:"hidden"}}  ref={(a)=> this.messageElement = a}>
      <div >
     <div  style={{backgroundColor:`${this.props.userdetails.background || "white"}`,width:"100%",padding:"3px"}} >
     {overallMessages !== undefined ? overallMessages.map((message,i) =>
         <div key={message.time} style={{padding:"0px"}}>
           {i === 0 || overallMessages[i].daysent !== overallMessages[i > 0 ? i-1 : 0].daysent ? 
           <div style={{width:"100%",clear:"both"}}>
           <center>
             <small><button className="btn" style={{padding:"0px"}}>
               <small style={{color:`${this.props.userdetails.background === "black" ?"white":"black"}`,textTransform:"uppercase",fontWeight:"bold",fontSize:"8px",padding:"0px"}}>{message.daysent}</small>
               </button></small>
           </center>
           </div>
           : null}
             <div style={{margin:"5px 0px",maxWidth:"80%",color:`${ this.props.userdetails.background === "black" ? "white" : "black"}`,float:`${message.sender === this.state.userId ?"right" :"none"}`,clear:"both"}}>
       <small style={{border:"1px solid lightgrey",display:"inline-block",padding:"5px",borderRadius:`${message.sender === this.state.userId ? "10px 10px 0px 10px" :"10px 10px 10px 0px"}`,backgroundColor:`${message.sender === this.state.userId ?"rgba(26, 198, 255,0.1)":"white"}`}}>
       
       {message.sender === this.state.userId && message.refdetails  && message.refdetails.length >0 ? 
             <div style={{backgroundColor:"white",border:"1px solid lightgrey",borderLeft:"3px solid #cc6699",borderRight:"3px solid #cc6699",padding:"2px",borderRadius:"10px"}}>
                 <div  className="row">
                            <div className="col-1"> 
     <img src={`https://res.cloudinary.com/fruget-com/image/upload/${message.refgencategory}/${message.refcategory}/${message.refmainimg}`}  style={{border:"1px solid grey",paddingTop: "2px",borderRadius:"50%",height:"30px"}}  alt=""/>
                            </div>
                            <div className="col-7 ml-3"  style={{textTransform:"capitalize",color:"#cc6699",fontWeight:"bolder"}}>
     <small> { message.refdetails.length > 30 ? message.refdetails.slice(0,30)+"..." : message.refdetails}</small>
                            </div>
                            <div className="col-3">
                                <small style={{fontWeight:"bold"}}>
                                    { message.refprice}
                                </small>
                            </div>
                 </div>
             </div>
           : this.props.productDetails.map(product =>
             <div style={{backgroundColor:"white",border:"1px solid lightgrey",borderLeft:"3px solid #cc6699",borderRight:"3px solid #cc6699",padding:"2px",borderRadius:"10px"}}>
                 <div  className="row">
                            <div className="col-1"> 
     <img src={`https://res.cloudinary.com/fruget-com/image/upload/${product.generalcategory}/${product.category}/${product.mainimg}`}  style={{border:"1px solid grey",paddingTop: "2px",borderRadius:"50%",height:"30px"}}  alt=""/>
                            </div>
                            <div className="col-7 ml-3"  style={{textTransform:"capitalize",color:"#cc6699",fontWeight:"bolder"}}>
     <small> { product.details.length > 30 ? product.details.slice(0,30)+"..." : product.details}</small>
                            </div>
                            <div className="col-3">
                                <small style={{fontWeight:"bold"}}>
                                    { product.mainprice}
                                </small>
                            </div>
                 </div>
             </div>
        )  }
              {message.message}
              <small style={{float:"right",padding:"3px"}} className="text-muted">{message.date.split("Tz")[1]}
              <span  className="text-primary" style={{margin:"3px"}}>
                  {message.status === "read" ?
                 <span className="fa fa-check-double text-primary"></span>
                 :  message.status === "delivered" ?
                 <span className="fa fa-check-double text-muted"></span>
                 : <span className="fa fa-check text-muted"></span>
                 }
                  </span></small>
               </small>
         </div>
         </div>
         ) : null}
     </div>
     </div> 
      </div>
     
     <div className="innermessageTypingBox" style={{position:"fixed",bottom:"0px",backgroundColor:"white",padding:"0px 10px",margin:"0px",width:"100%"}}>
                               <form  action="/search" method="get" >
                       <div className="input-group mb-3" >
                       <div className="input-group-prepend">
                    <button className={`btn ${this.state.navInputbtnclass}`} style={{fontSize:"20px",border:"1px solid lightgrey",borderTopLeftRadius:"20px",borderBottomLeftRadius:"20px",borderRight:"none"}} type="submit">
                        <span  className="fa fa-smile text-muted"></span>
                    </button>  
                     </div>        
                      <input type="text"  className="form-control form-control-lg" name="message" style={{borderLeft:"none",borderRight:"none"}} value={this.state.message}  onChange={this.change} placeholder="Type a message" />
                     <div className="input-group-append">
                    <button style={{border:"1px solid lightgrey",borderTopRightRadius:"20px",borderBottomRightRadius:"20px",borderLeft:"none"}} className={`btn ${this.state.navInputbtnclass}`} type="submit">
                        <span style={{fontSize:"20px"}} className="fa fa-camera text-muted"></span>
                    </button>  
                     </div>
                     <div className="input-group-append" style={{padding:"5px"}}>
                    <button className={`btn ${this.state.navInputbtnclass}`} style={{borderRadius:"40px",backgroundColor:`${this.state.message.length > 0 ? "green" : "grey"}`}} onClick={this.sendmessage}>
                        <span style={{color:"white"}} className="fa fa-paper-plane"></span>
                    </button>  
                     </div>
                    </div>
                     </form>
                     </div> 
                     </div>
                           </div>
      )
    }
  }
}
const mapStateToProps =(store)=>{
    return{           
     seller:store.seller,
     userdetails:store.userdetails,
     messages:store.messages,
     useremail:store.useremail,
     productDetails:store.productDetails,
     otheruserdetails:store.otheruserdetails,
     connectedclients:store.connectedclients,
     otheruserlastseen:store.otheruserlastseen

     }
  }
  const mapDispatchToProps =(dispatch)=>{
   return{
    viewuserdetailsbyuserId:(data)=>dispatch(viewuserdetailsbyuserId(data)),
     getdetails:(data)=>dispatch(getdetails(data)),
     sendmessage:(data)=>dispatch(sendmessage(data)),
     fetchmessage:(data)=>dispatch(fetchmessage(data)),
     viewotheruserdetailsbyuserId:(data)=>dispatch(viewotheruserdetailsbyuserId(data)),
     fetchconnections:(data)=>dispatch(fetchconnections(data))
     }
  }
export default compose(connect(mapStateToProps,mapDispatchToProps),withRouter)(Message);
