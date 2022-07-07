import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./main.css"
import Message from "./message"
import {getseller,getdetails,fetchconnections} from "./store"
import Cookies from "js-cookie"
import querystring from "query-string"
import {formater} from "./formatTime"
import socket from "./socket"
import {compose} from "redux"
import {Link, withRouter} from "react-router-dom"

class messageConnections extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            productId:"",
            typingClients:[],
            connectedusers:[],
            messages:{},
            userId:"",
            otheruserId: null,
            displaysearch:"none",
            displayheader:"block",
            searchval:"",
            filteredconn:[],
            lastseens:[]
         }
    }
    componentDidMount=()=>{
      let otheruserId =  this.props.otheruser 
          this.setState({otheruserId})
        let mainToken
          if(Cookies.get("cm_pp")){
              const myToken = Cookies.get("cm_pp")
              let myMainTokenlen = parseInt(myToken.split("%")[0])
               let userIdlen = parseInt(myToken.split("%")[1])
               let userIdpos = parseInt(myToken.split("%")[2].charAt(0)+myToken.split("%")[2].charAt(1))
               let userId = myToken.slice(userIdpos, userIdpos+userIdlen)
                mainToken = myToken.slice(userIdpos+userIdlen, myMainTokenlen)
               let userId2 = mainToken.slice(userIdpos, userIdpos+userIdlen)
               console.log(userId)
         ////      this.setState({productId})
               this.setState({userId})
               const data ={userId,token:Cookies.get("token")}
             this.props.fetchconnections(userId)
          //     this.props.getseller(data)
       //        this.props.checksaveItem(data)
           } else{
             this.props.history.push("/customer/login")
           }
           socket.on('connected users', users => {
            console.log("users",users)
           this.setState({connectedusers:users},()=>{
         //   this.props.fetchconnections(this.state.userId)
           })
         });
         socket.on("last seens", data =>{
          if(this.props.otheruserdetails.userId === data.id){
            let lastseen = {userId:data.id,lastseen:data.time}
            let newlastseens = [...this.state.lastseens,lastseen]
           this.setState({lastseens:newlastseens})
          }
        })
         socket.on("messages", messagge => { 
           this.props.fetchconnections(this.state.userId)
          });
          socket.on("recieve message", messagge => { 
          //  this.props.fetchconnections(this.state.userId)
           });
            socket.on("read report", messagge => { 
              let messages = this.state.messages
               for (var i =0; i<messages.length; i++){
                      messages[i].status = "read"   
               }
                this.setState({messages})
                console.log("read report",messages)
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
                    });
            socket.on("message", messagge => { 
              console.log("message", messagge)
          //    this.props.viewuserdetails(this.props.email)
              });
            socket.on("user is typing", message => { 
              // this.setState({status:message})
              console.log("user is typing")
            });
  
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
               console.log("typing client",typingClients)
              }else{
               console.log("it has already been removed")
               console.log("typing client",typingClients)
                  }
            });    
      }
   displaysearch=()=>{
     this.setState({displaysearch:"block",displayheader:"none"})
   }
   undisplaysearch=()=>{
    this.setState({displaysearch:"none",displayheader:"block"})
  }
  change=(e)=>{
    this.setState({searchval:e.target.value})
    const filteredconn =[]
    const inputval = e.target.value;
    for(var i=0; i<this.props.userconnection.length; i++){
      if(this.props.userconnection[i].fullName.toLowerCase().indexOf(inputval.toLowerCase()) > -1 || this.props.userconnection[i].businessName.toLowerCase().indexOf(inputval.toLowerCase()) > -1){
        filteredconn.push(this.props.userconnection[i])
        this.setState({filteredconn})
       /*      const maindetails = suggestions[i].details;
             const searchimg = suggestions[i].mainimg;
             const mainbrand = suggestions[i].brand;
             const mainsubcat1 = suggestions[i].subcat1;
             const mainsubcat2 = suggestions[i].subcat2;
             const mainsubcat3 = suggestions[i].subcat3;
  
             filteredSuggestions.push({maindetails,searchimg,mainbrand,mainsubcat1,mainsubcat2,mainsubcat3 })
     */
            }
  }
  } 
    render() {  
        return ( 
            <div>
            <div  style={{borderBottom:"1px solid lightgrey",backgroundColor:`${this.props.userdetails.background || "white"}`,display:`${this.state.displaysearch}`,width:"100%",padding:"8px"}}>
<div style={{display:"flex",flexWrap:"nowrap"}}>
 <div>
   <center>
 <span className="fa fa-arrow-left mt-2" onClick={this.undisplaysearch} style={{color:"#006080"}}></span>
 </center>
 </div>
 <div>
    <form action="">
          <input style={{border:"none"}} type="text" placeholder="Search ..." className="form-control" onChange={this.change} value={this.state.searchval}/>
   </form>
 </div>
</div>
</div> 
 <div style={{display:`${this.state.displayheader}`,backgroundColor:"#006080",color:"white",width:"100%",margin:"0px",padding:"0px"}}>
           <div style={{padding:"15px"}}>       
                   Fruget
                   <small style={{float:"right",fontSize:"18px"}}>
              <small className="mr-1">  Chat </small>
                <small className="badge" style={{padding:"5px",backgroundColor:"orange",borderRadius:"50%"}}>
                {this.props.userconnection.length}
                 </small>
                 <small>
                   <span className="fa fa-search ml-4" onClick={this.displaysearch}></span>
                   <span className="fa fa-ellipsis-v ml-4"></span>
                 </small>
                   </small>
               </div> 
               </div>    
               
             <div  className="row" style={{backgroundColor:`${this.props.userdetails.background || "white"}`,height:"490px",overflowY:"auto",padding:"0px 15px"}}>         
<div className="col-12 " style={{backgroundColor:`${this.props.userdetails.background || "white"}`,padding:"10px",msOverflowY:"scroll",OverflowY:"scroll"}}>              
<div  style={{backgroundColor:`${this.props.userdetails.background || "white"}`,width:"100%",padding:"3px"}}>


 {this.state.filteredconn.length > 0 ?this.state.filteredconn.map((follower)=>
 <a  key={follower.userId} style={{textDecoration:"none",color:`${this.props.userdetails.background === "black" ? "white" : "black"}`}} href={`/in_box/dk/${Math.floor(Math.random()*100000)}${follower.userId}${Math.floor(Math.random()*1000)}in_box/${Math.floor(Math.random()*100000000000000000000)}00006862${Math.floor(Math.random()*1000)}`}>

    <div className="row"  style={{padding: "5px 10px"}}>
                          <div className="col-2" style={{padding:"0px"}}>
<img src={follower.profileImage ? `https://res.cloudinary.com/fruget-com/image/upload/profile/${follower.profileImage}`: require(`./images/maleprofile.png`)}  style={{paddingTop: "2px",borderRadius:"50%",width:"100%",height:"50px"}}  alt=""/>
                          </div>

     <div className="col-10" style={{borderBottom:"1px solid lightgrey"}}>
   <div className="row"  style={{padding:"0px",margin:"0px"}}>
    <div className="col-8" style={{padding:"0px",margin:"0px",color:`${this.props.userdetails.background === "black" ? "white" : "black"}`}}>
  <small style={{fontWeight:"bold",textTransform:"capitalize",fontSize:"14px",color:`${this.props.userdetails.background === "black" ? "white" : "black"}`}} >
    {follower.businessName && follower.businessName.length > 0 ? follower.businessName : follower.fullName}
    </small>
   </div>
   <div className="col-4" style={{padding:"0px",margin:"0px"}}>
   <center style={{marginTop:"5px"}}> 
     <small>                         
      {this.state.typingClients.includes(follower.userId) 
    ? <i style={{color:"#006080"}}> typing...</i>
     :  this.state.connectedusers.includes(follower.userId) ?
     <span className="ml-1 mr-1 mb-5" style={{borderRadius:"60%",fontSize:"8px",lineHeight:"0.2px",margin:"0px",padding:"0px 5px",backgroundColor:`purple`,color:`purple`}}><small>.</small></span> 
     : follower.lastseen && follower.lastseen.length > 0 
     ? <i style={{color:"#006080"}}> {formater(follower.lastseen)} </i> 
    : null }
   </small>
    </center>
   </div>
    <small style={{paddingRight:"4px",color:"grey",width:"100%"}}>
  {follower.status === "read" && parseInt(follower.sender) === parseInt(this.state.userId)?
 <small> <span  style={{paddingRight:"4px"}} className="fa fa-check-double text-primary"></span></small>
 : follower.status === "delivered" && parseInt(follower.sender) === parseInt(this.state.userId) ?
 <small><span  style={{paddingRight:"4px"}} className="fa fa-check-double text-muted"></span></small>
 :  follower.status === "sent" && parseInt(follower.sender) === parseInt(this.state.userId) ?
 <small> <span  style={{paddingRight:"4px"}} className="fa fa-check text-muted"></span></small>
 :  follower.status === "pending" && parseInt(follower.sender) === parseInt(this.state.userId)?
 <small><span style={{paddingRight:"4px"}} className="fa fa-clock-o text-danger"></span></small>
 : null 
 }
 {follower.message.length > 30 ?
 follower.message.slice(0,30)+"..."
 : follower.message }
 {follower.noOfunread > 0 ?
 <small className="badge" style={{float:"right",padding:"5px",backgroundColor:"#006080",color:"white",borderRadius:"50%"}}>
   {follower.noOfunread}
   </small>   
   : null}
   <br/>
   </small>
  
    <br/>
   </div>
 
    </div>
    <hr/>
   </div>
 </a>
 )






: this.state.searchval.length === 0 && this.props.userconnection.length > 0 ? this.props.userconnection.map((follower)=>
  follower.userId !== parseInt(this.state.userId) ?
<a  key={follower.userId} style={{textDecoration:"none"}} href={`/in_box/dk/${Math.floor(Math.random()*100000)}${follower.userId}${Math.floor(Math.random()*1000)}in_box/${Math.floor(Math.random()*100000000000000000000)}00006862${Math.floor(Math.random()*1000)}`}>
    <div className="row"  style={{padding: "5px 10px"}}>
                          <div className="col-2" style={{padding:"0px"}}>
<img src={follower.profileImage ? `https://res.cloudinary.com/fruget-com/image/upload/profile/${follower.profileImage}`: require(`./images/maleprofile.png`)}  style={{paddingTop: "2px",borderRadius:"50%",width:"100%",height:"50px"}}  alt=""/>
                          </div>

     <div className="col-10" style={{borderBottom:"1px solid lightgrey",}}>
   <div className="row"  style={{padding:"0px",margin:"0px"}}>
    <div className="col-8" style={{padding:"0px",margin:"0px"}}>
  <small style={{fontWeight:"bold",fontSize:"14px",color:"black",textTransform:"capitalize"}} >
    {follower.businessName && follower.businessName.length > 0 ? follower.businessName : follower.fullName}
    </small>
   </div>
   <div className="col-4" style={{padding:"0px",margin:"0px"}}>
   <center style={{marginTop:"5px"}}> 
     <small>                         
      {this.state.typingClients.includes(follower.userId) 
    ? <i style={{color:"#006080"}}> typing...</i>
     :  this.state.connectedusers.includes(follower.userId) ?
     <span className="ml-1 mr-1 mb-5" style={{borderRadius:"60%",fontSize:"8px",lineHeight:"0.2px",margin:"0px",padding:"0px 5px",backgroundColor:`purple`,color:`purple`}}><small>.</small></span> 
     : follower.lastseen && follower.lastseen.length > 0 
     ? <i style={{color:"#006080"}}> {formater(follower.lastseen)} </i> 
    : null }
   </small>
    </center>
   </div>

  <small style={{paddingRight:"4px",color:"grey",width:"100%"}}>
  {follower.status === "read" && parseInt(follower.sender) === parseInt(this.state.userId)?
 <small> <span  style={{paddingRight:"4px"}} className="fa fa-check-double text-primary"></span></small>
 : follower.status === "delivered" && parseInt(follower.sender) === parseInt(this.state.userId) ?
 <small><span  style={{paddingRight:"4px"}} className="fa fa-check-double text-muted"></span></small>
 :  follower.status === "sent" && parseInt(follower.sender) === parseInt(this.state.userId) ?
 <small> <span  style={{paddingRight:"4px"}} className="fa fa-check text-muted"></span></small>
 :  follower.status === "pending" && parseInt(follower.sender) === parseInt(this.state.userId)?
 <small><span style={{paddingRight:"4px"}} className="fa fa-clock-o text-danger"></span></small>
 : null 
 }
 {follower.message.length > 30 ?
 follower.message.slice(0,30)+"..."
 : follower.message }
 {follower.noOfunread > 0 ?
 <small className="badge" style={{float:"right",padding:"5px",backgroundColor:"#006080",color:"white",borderRadius:"50%"}}>
   {follower.noOfunread}
   </small>   
   : null}
   <br/>
   </small>

    <br/>
   </div>
    </div>
    <hr/>

       </div>
          </a>
       : null     
) 
: this.state.searchval.length > 0?
<center>
 <span className="fa fa-frown-o" style={{color:"orange",fontSize:"100px"}}></span>
  <p style={{fontStyle:"italics",fontWeight:"bold",color:"grey"}}>No results found for '{this.state.searchval}' </p><br/>
 </center>
 
: 
<center>
 <span className="fa fa-frown-o" style={{color:"orange",fontSize:"100px"}}></span>
  <p  style={{fontStyle:"italics",fontWeight:"bold",color:"grey"}}>Sorry!. You have no previous Connections </p><br/>
 </center>
} 
                          </div>       
                         
        
      </div>
                </div>
</div>
         );
    }
}
const mapStateToProps =(store)=>{
    return{           
     seller:store.seller,
     productDetails:store.productDetails,
     userdetails:store.userdetails,
     userconnection:store.userconnection,
     otheruserdetails:store.otheruserdetails
     }
  }
  const mapDispatchToProps =(dispatch)=>{
   return{
     getseller:(data)=>dispatch(getseller(data)),
     getdetails:(data)=>dispatch(getdetails(data)),
     fetchconnections:(data)=>dispatch(fetchconnections(data))
   }
  }
export default compose(connect(mapStateToProps,mapDispatchToProps),withRouter)(messageConnections);