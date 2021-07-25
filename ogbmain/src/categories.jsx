import React, { Component , lazy, Suspense} from 'react';
import "./fontawesome"
import Navbar from './navbar'
<<<<<<< HEAD
import {BrowserRouter as Router, Route, Switch, withRouter,Link} from 'react-router-dom'

 //import App from './App'
=======
import {BrowserRouter as Router, Route, Switch, withRouter} from 'react-router-dom'
 import App from './App'
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
import Details from './details'
// import SideNav from './sidenav' 
import ReactHtmlParser from "react-html-parser"
import Autocomplete from './components/Autocomplete';
import store, {fetchunreadmessages,fetchconnections,viewsender,pushmessages,setlastseen,connectedusers,undisplaymodal,undisplaysavemodal,undisplayclearcartsuccess,rateproduct,ratevendor,clearcart,undisplayclearcartmodal,undisplaysellerrating,undisplayproductrating,setdisplayvendorrating,setdisplayproductrating,confirmtoclearcart,changecolor, unshowcolormodal,showcolormodal,viewuserdetailsbyuserId,shoppingcart} from './store'
import {Provider} from 'react-redux'
import queryString from 'query-string'
import Suggestions from "./suggestions"
import Sidenavbar from "./sidenavbar"
import {CookiesProvider} from 'react-cookie' 


import Subcats from './subcats';
import Followers from './followers';
import Following from './following';
import SearchApp from "./searchapp"
import Login from "./login"
import Profile from "./profile"
import SavedItems from "./savedItems"
import CheckOut from "./checkout"
import ModalSideNavbar from "./modalsidenavbar"
<<<<<<< HEAD
import Register from "./register"
import SellerRegister from "./sellerregister"
import ProductUpload from "./productupload"
import ConfirmEmail from "./confirmemail"
import SellerLogin from './sellerlogin'
import SellerDetails from "./sellerdetail"
import catalogueSidenavbar from "./testrandom"
import Settings from "./settings"

import CatalogueSearchSideNavbar from "./testrandomsearch"
import myProfileTop from './myprofiletop'
import Uploads from './uploads';
import UploadsTwo from './uploadstwo';
import Home from "./home"
import Cart from "./cart"
import Orders from "./orders"
import profileSideNavbar from "./profilesidenavbar"
import UserProfileTop from "./UserprofileTop"
import ProfileTop from "./profiletop"
import Messages from "./messages"
import Message from "./message"
import Invoice from './invoice';
import GroupedInvoice from './groupinvoice';
import GroupedInvoiceDetails from './groupedinvoicedetails';
import UserComponent from "./usercomponent"
import socket from "./socket"
import Services from './services';
import {connect} from "react-redux"
import Cookies from "js-cookie"
import mapContainer from "./mapcontainer"
import MessageConnections from './messageconnections';
import MessageConnectionsSm from "./messageconnectionsm"
import Profilesidenavbar from "./profilesidenavbar"
import UserRatings from "./userratings"
import ProfileDetails from "./profiledetails"
// const App =lazy(()=>import("./App"))
import Products from "./products"
import { formater } from './formatTime';
=======
import SellerRegister from "./sellerregister"
import ProductUpload from "./productupload"
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac

class Category extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            sub: [],
            prefferedColor:"",
            productcomment:"Excellent Product",
            vendorcomment:"Excellent Service",
            chooserating:5,
            display:"block",
            opacity:"1",userId:""
         }
    }
    
<<<<<<< HEAD
   componentDidMount=()=>{  
    //  window.addEventListener("load", this.checkstatus())
    let mainToken;
    console.log("Cookies.get(cm_pp)",Cookies.get("cm_pp") )
    if(Cookies.get("cm_pp") && Cookies.get("cm_pp").length > 0 && Cookies.get("cm_pp") !== undefined){
        const myToken = Cookies.get("cm_pp")
        let myMainTokenlen = parseInt(myToken.split("%")[0])
         let userIdlen = parseInt(myToken.split("%")[1])
         let userIdpos = parseInt(myToken.split("%")[2].charAt(0)+myToken.split("%")[2].charAt(1))
         let userId = myToken.slice(userIdpos, userIdpos+userIdlen)
         this.setState({userId})
          mainToken = myToken.slice(userIdpos+userIdlen, myMainTokenlen)
         let userId2 = mainToken.slice(userIdpos, userIdpos+userIdlen)      
      this.props.viewuserdetailsbyuserId(userId)
      this.props.shoppingcart(userId)
      this.props.fetchunreadmessages()
        }     
     
     socket.on('connected users', users => {
      console.log("users",users)
     this.setState({connectedusers:users},()=>{            
  this.props.connectedusers(users)
    })
   });
   socket.on("last seens", data =>{
     if(this.props.otheruserdetails.userId === data.id){
      this.props.setlastseen(data)
     }
   })   
  // socket.emit("read", otheruserId)    
   socket.on("messages", messagge => { 
     });
     const deliverer = {
     receiver:this.state.userId,
      sender:this.props.otheruserdetails.userId || null
     }
     
     socket.on("recieve message", messagge => { 
      socket.emit("delivered",messagge)
       this.props.viewsender(messagge.sender)
       this.props.fetchunreadmessages() 
         this.props.pushmessages(messagge)
         this.props.fetchconnections(this.state.userId)
       });   
       socket.on("delivery report", messagge => { 
this.props.fetchconnections(this.state.userId)
          });     
           
   socket.on("message", messagge => { 
     console.log("message", messagge)
  //   this.props.viewuserdetails(this.props.email)
     });
   


     //
     window.addEventListener("click",(e)=>{
       if(e.target == this.productratingdiv){
        this.props.undisplayproductrating()  
       }
     })
     window.addEventListener("click",(e)=>{
      if(e.target == this.clearcartmodaldiv){
       this.props.undisplayclearcartmodal()  
      }
    })
     window.addEventListener("click",(e)=>{
       if(e.target == this.sellerratingdiv){       
     this.props.undisplaysellerrating()
       }
     })
     window.addEventListener("click",(e)=>{
       if(e.target == this.colormodaldiv){
         this.props.unshowcolormodal() 
       }
     })
   }

   //for the rating
   change =(e) =>{
    this.setState({[e.target.name]:e.target.value})
    if(this.state.vendorcomment.length >= 29){
        alert("please!!! comment cannot exceed 30 characters ")
    }
    if(this.state.productcomment.length >= 29){
      alert("please!!! comment cannot exceed 30 characters ")
  }
 }
   change2=(e)=>{
    if(e.target.value > 5){
       return this.setState({chooserating:1})
    }
    else if(e.target.value < 1){
       return this.setState({chooserating:1})
    }
       else if(e.target.value >4 && e.target.value <= 5){
       return    this.setState({productcomment: "Excellent Product",vendorcomment:"Excellent Service",chooserating:e.target.value})
       }
    else if(e.target.value >3 && e.target.value <= 4){
          this.setState({productcomment: "Very Good Product",vendorcomment:"Very Good Service",chooserating:e.target.value})
      }
     else if(e.target.value >2 && e.target.value <= 3){
          this.setState({productcomment: "Good Product",vendorcomment:"Good Service",chooserating:e.target.value})
      }
      else if(e.target.value >1 && e.target.value <= 2){
          this.setState({productcomment: "Average Product",vendorcomment:"Average Service",chooserating:e.target.value})
      }
     else if(e.target.value == 1){
          this.setState({productcomment: "Very Poor",vendorcomment:"Very Poor Service",chooserating:e.target.value})
      }          
}
   //after the rating
   changecolor=(e)=>{
       this.setState({prefferedColor:e.target.value})
   }
   removecolormodal=()=>{
    this.props.unshowcolormodal()
    const uri =window.location.href 
   }
   proceedchangecolor= () =>{
    const data ={
      color:this.state.prefferedColor,
      userId:this.state.userId
    }
    this.props.changecolor(data)
   this.props.unshowcolormodal()
   const uri =window.location.href 
  if(uri.indexOf("/register") > -1){
    window.location.assign(`/${Math.floor(Math.random()*100000)}/lg`)
  }
  }  
  submitvendorrating=(datum)=>{
    datum.e.preventDefault()
    const data={
      vendor:datum.vendor,
      productId:datum.productId,
      comment:this.state.vendorcomment,
      rating:this.state.chooserating
    }
       this.props.ratevendor(data)
       this.props.undisplaysellerrating()
       setTimeout(()=> this.props.setdisplayproductrating(),3000)
      }
 submitproductrating=(datum)=>{
      datum.e.preventDefault()
      const data={
        productId:datum.productId,
        comment:this.state.productcomment,
        rating:this.state.chooserating
      }
      this.props.rateproduct(data)
      this.props.undisplayproductrating()
      }
  undisplayproductrating=()=>{
        this.props.undisplayproductrating()
      }
  undisplaysellerrating=()=>{
  this.props.undisplaysellerrating()
  setTimeout(()=> this.props.setdisplayproductrating(),5000)
}
undisplayclearcartmodal=()=>{
  this.props.undisplayclearcartmodal()
}
undisplaysavemodal=() =>{
  this.props.undisplaysavemodal()
}
undisplayclearcartsuccessmodal=()=>{
  this.props.undisplayclearcartsuccess()
   setTimeout(()=> this.props.setdisplayvendorrating(),3000) 
}
undisplaymodal =() =>{
  this.props.undisplaymodal()
 }
 
clearcart =(e)=>{
  e.preventDefault()
  const data ={
    cartId: this.props.clearcartId,
    rating: this.state.chooserating,
    comment: this.state.comment,
    seller:this.props.clearcartvendor,
    productId: this.props.clearcartproductId
}
 this.props.clearcart(data)
// this.props.undisplayclearcartmodal()
}
undismodal=()=>{
  this.setState({opacity:"0"},()=>{
    setTimeout(()=>this.setState({display:"none"}),800)
  })
}
 cartMessage=()=>{
    if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
  return (
    <div className="mainmodaldiv" ref={(a) => this.modaldiv =a} id="modaldiv" style={{display:`${this.props.display}`}}>
    <div className="modaldiv"  style={{backgroundColor:"white",borderRadius:"5px"}}>
      <p onClick={this.undisplaymodal}>x</p>
        <div className="inner-modal"> 
          <br/>        
          <center>
          <h4>{this.props.cartHeader}</h4>
          <center> 
            <small style={{fontSize:"15px",textTransform:"capitalize"}}>{this.props.cartMessage.length > 50 ? this.props.cartMessage.slice(0,49) + "..." : this.props.cartMessage}
            </small> <br/><br/>
            </center>          
          </center>
          <center>                        
          <div className="row" style={{padding:"3px"}}>  
          <div className="col-6">  
<a href="/checkout/cart"><button className="btn btn-success checkout" type="button">CheckOut</button> </a>
</div>
<div className="col-6">
<button className="btn btn-warning continueshopping" onClick={this.undisplaymodal}  type="submit">Continue Shopping</button>
</div>         
          </div> 
        </center> 
    </div> 
</div>
</div> 
  )}
  else{
   return(
    <div className="row bg-dark" style={{display:`${this.props.display}`,opacity:`${this.props.cartOpacity}`,transition:"opacity 1s",width:"100%",zIndex:"2",padding:"0px",margin:"0px",position:"fixed",top:"0px"}}>
 <div className="col-12  alert" style={{width:"100%",padding:"2px"}}>
   <small><span className="fa fa-times mr-1" onClick={this.undisplaymodal} style={{float:"right",color:"white"}}></span></small>
<small style={{fontSize:"15px",color:"lightgrey"}}>{this.props.cartHeader}</small><br/>
<small style={{padding:"0px",color:"white"}}>{this.props.cartMessage.length > 50 ? this.props.cartMessage.slice(0,50) + "..." : this.props.cartMessage}</small>
<small className="ml-2" style={{color:"white"}}><Link to={`/cart/checkout`}> Check out</Link></small>
     </div>
    </div>
  )}
}
savedMessage=()=>{
  if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
  return (
    <div className="savemodaldiv" ref={(a) => this.savemodaldiv =a} id="savemodaldiv" style={{display:`${this.props.displaysavemodal}`,zIndex:"1",width:"100%",height:"100%",backgroundColor:"rgba(0,0,0,0.4)"}}>
    <div className="savediv"  style={{backgroundColor:"white"}}>
    <br/>        
          <center>
          <h4>{this.props.saveHeader}</h4>
          <center> 
            <small style={{fontSize:"15px",textTransform:"capitalize"}}>{this.props.saveResponse.length > 80 ? this.props.saveResponse.slice(0,79) + "..." : this.props.saveResponse}
            </small> <br/><br/>
            </center>          
          </center>
        <center>     
               <div className="row" style={{padding:"10px"}}>  
                       <div className="col-6">  
   <button className="btn btn-danger" onClick={this.undisplaysavemodal} style={{boxShadow:"2px 3px lightgrey",padding:"8px",color:"white",width:"100%"}} type="button">Done</button> 
   </div>
   <div className="col-6">
   <button className="btn btn-success"  style={{padding:"8px",color:"white",width:"100%",boxShadow:"2px 3px lightgrey"}} >Saved Items</button>
   </div>         
        </div>
        </center>
        </div>
    </div>
  )}else{
    return(
      <div className="row bg-dark" style={{display:`${this.props.displaysavemodal}`,opacity:`${this.props.saveOpacity}`,transition:"opacity 1s",width:"100%",zIndex:"2",padding:"0px",margin:"0px",position:"fixed",top:"0px"}}>
      <div className="col-12  alert" style={{width:"100%",padding:"2px"}}>
        <small><span className="fa fa-times mr-1" onClick={this.undisplaysavemodal} style={{float:"right",color:"white"}}></span></small>
     <small style={{fontSize:"15px",color:"lightgrey"}}>{this.props.saveHeader}</small><br/>
     <small style={{padding:"0px",color:"white"}}>{this.props.saveResponse.length > 50 ? this.props.saveResponse.slice(0,50) + "..." : this.props.saveResponse}</small>
     <small className="ml-2" style={{color:"white"}}><Link to={`/cart/checkout`}> Saved Products</Link></small>
          </div>
         </div>
    )
  }
}
newMessage=()=>{
  let d = new Date()
  if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
 return(
  <div className="row bg-dark" style={{display:`${this.props.sender.fullName ? this.props.messagedisplay : "none"}`,opacity:`${this.props.cartOpacity}`,transition:"opacity 1s",width:"100%",zIndex:"2",padding:"0px",margin:"0px",position:"fixed",top:"0px"}}>
<div className="col-12  alert" style={{width:"100%",padding:"2px"}}>
  <a href={`/in_box/dk/15386${this.props.sender.userId}493in_box/2675386398310691000000006862667`} style={{textDecoration:"none"}}>
 <small><span className="fa fa-times mr-1" onClick={this.undisplaymodal} style={{float:"right",color:"white"}}></span></small>
<small style={{fontSize:"15px",color:"lightgrey"}}> <span className="far fa-envelope" style={{color:"orange"}}></span>{this.props.sender.fullName} </small><br/>
{this.props.allmessages.length > 0 ?
<small style={{padding:"0px",color:"white"}}>{ this.props.allmessages[this.props.allmessages.length-1].message.length > 20 ? this.props.allmessages[this.props.allmessages.length-1].message.slice(0,20) : this.props.allmessages[this.props.allmessages.length-1].message}</small>
: null}
<small style={{float:"right",color:"lightgrey"}}>{formater(d.getTime())}</small>
</a>
   </div>
  </div>
)}
}
render() { 
  console.log(this.props.allmessages,"sender",this.props.sender)
      let loading;
    const ranoo =Math.floor(Math.random()*100)
    if(ranoo > 0 && ranoo <= 20){
     loading = "Get quality and affordable items at a frugal price"
         }
else if(ranoo > 20 && ranoo <= 40){
loading = "Upload Items with ease and meet buyers in minutes"
 }else if(ranoo >= 40 && ranoo <= 60){
   loading = "track orders and selected carts from your profile"
  }
  else {
    loading = "Never pay for Items until recieved and confirmed"
  }
        //<Route path='/'  component={Navbar} />  
        /**
         * <div className="row">
                     <div className="col-12">
                     <Route path="/fruget/myprofile/" exact component={UserProfileTop}/>
                     </div>
                     <div className="col-12 container">
                     <Route path="/fruget/myprofile/uploads" exact component={Uploads}/>
                     <Route path="/fruget/myprofile/home" exact component={Home}/>
                     <Route path="/fruget/myprofile/category" exact component={profilecategory}/> 
                     <Route path="/fruget/myprofile/saved_items" exact component={SavedItems}/> 
                     <Route path='/fruget/myprofile/followers' exact component={Followers}/> 
                     <Route path="/fruget/myprofile/following" exact component={Following}/> 
                     </div>
                 </div>
                 <Route path='/'  component={Navbar} /> 
                 <div style={{position:"absolute",top:"25%",left:"25%",width:"50%"}}>       
         */
        const uri = window.location.href;

=======
    render() {  
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
        return (
          
            <CookiesProvider>
            <div> 
                <Router>
<<<<<<< HEAD
                 <Provider store={store}>    
                 {this.props.loading ?     
          <div style={{position:"fixed", top:"0%",left:"0%",zIndex:"2",backgroundColor:"lightgrey",width:"100%",minHeight:"100%",opacity:"0.4"}}>
           <div className="loadingdiv">
            <center >
            <img src={require(`./images/35.gif`)} />    <br/>
             <small style={{textTransform:"capitalize"}}>{loading}</small>       
            </center>    
         </div>
          </div>
        : null}
        <Route path='/'  component={Navbar} />
         <Route path='/in_box/dk/:id/:random' exact component={Messages} />
        <this.cartMessage />
          <this.savedMessage/>
          <this.newMessage/>
          
<div style={{position:"fixed",opacity:"0.5",overflow:"hidden",height:"100%",width:"100%",display:`${this.props.categoryModaldisplay}`,backgroundColor:"lightgrey",width:"100%",zIndex:"3"}}>
 </div>

 <div className={`${this.props.categoryModalclass}`} style={{transition:"width 3s",backgroundColor:`${this.props.userdetails.background || "white"}`,color:`${this.props.userdetails.background === "black" ? "white":"black"}`,height:"60%",zIndex:"4",position:"fixed",top:"20%",overflow:"auto",borderRadius:"10px"}}>
         <Services/>
            </div>
          
   
 <div className="savemodaldiv" ref={(a) => this.savemodaldiv =a} id="savemodaldiv" style={{display:`${this.props.displayclearcartsuccess}`,zIndex:"1",width:"100%",height:"100%",backgroundColor:"rgba(0,0,0,0.4)"}}>
 <div className="savediv"  style={{backgroundColor:"white"}}>
     <center>
            <h5 style={{padding:"40px"}}>{ReactHtmlParser(this.props.clearcartresponse)}</h5>           
            <div className="row" style={{padding:"10px"}}>  
                    <div className="col-6">  
<button className="btn btn-danger" onClick={this.undisplayclearcartsuccessmodal} style={{boxShadow:"2px 3px lightgrey",padding:"8px",color:"white",width:"100%"}} type="button">Done</button> 
</div>
<div className="col-6">
<button className="btn btn-success"  style={{padding:"8px",color:"white",width:"100%",boxShadow:"2px 3px lightgrey"}} >Saved Items</button>
</div>         
     </div>
     </center>
     </div>
 </div>

{
  //CLEAR CART-MODAL
}
            <div className="mainmodaldiv" ref={(a) => this.clearcartmodaldiv =a} id="modaldiv" style={{display:`${this.props.clearcartdisplay}`,zIndex:"1",width:"100%",height:"100%",backgroundColor:"rgba(0,0,0,0.4)"}}>
         <div className="clearcartdiv"  style={{backgroundColor:"white",borderRadius:"10px"}}>
             <div className="inner-modal">
               <p style={{padding:"4px"}}>ACKNOWLEGDE RECEIPT!!!</p>
                     <center> 
                       <small> 
                       <img  src={`https://res.cloudinary.com/fruget-com/image/upload/${this.props.clearcartgencat}/${this.props.clearcartcat}/${this.props.clearcartimage}`} style={{padding:"1px",height:"100px"}} className="img-responsive"></img><br/>
                        <div className="row">
                          <div className="col-8">
                          <b>Item : </b> {this.props.clearcartdetails.length>35?this.props.clearcartdetails.slice(0,35)+"...":this.props.clearcartdetails} <br/>
                         <b>code :  </b>  cart{this.props.clearcartId} <br/>
                         <b>seller :  </b>  {this.props.clearcartvendor} <br/>
                         <b>Recieved : </b> <span className="fa fa-check-circle text-success"></span> <br/>
                          </div>
                          <div className="col-4">
       {this.props.categoryloading ?
        <center>
        <img src={require(`./images/35.gif`)}  style={{width:"50px"}}/>    <br/>     
        </center>    
       :null}
                          </div>
                        </div>
                     <span style={{color:"grey"}}>
                       <small style={{fontSize:"11px"}}>
                         By clicking on <b>Proceed</b> , you acknoledge that you have recieved this item and have confirmed 
                         that its working properly <br/>
                        <span className="text-danger"> Note! This action cannot be undone </span>
                       </small></span>
                     <div className="row" style={{padding:"5px"}}>  
                    <div className="col-6">  
<button className="btn btn-danger" onClick={this.undisplayclearcartmodal} style={{boxShadow:"2px 3px lightgrey",padding:"3px",color:"white",width:"100%"}} type="button">
  Cancel</button> 
</div>
<div className="col-6">
<button className="btn btn-success" onClick={this.clearcart} style={{padding:"3px",color:"white",width:"100%",boxShadow:"2px 3px lightgrey"}} >
Proceed</button>
</div>         
               </div>          
               </small>
             </center>
         </div>
     </div>
 </div>
{
  //VENDOR RATING MODAL 
}
            <div className="mainmodaldiv" ref={(a) => this.sellerratingdiv =a} id="modaldiv" style={{display:`${this.props.clearcartsellerratingdisplay}`,zIndex:"1",width:"100%",height:"100%",backgroundColor:"rgba(0,0,0,0.4)"}}>
         <div className="ratingmodaldiv"  style={{backgroundColor:"white",borderRadius:"10px"}}>
             <div className="inner-modal">
                     <p style={{padding:"10px"}}>Rate <span style={{textTransform:"uppercase"}}>{this.props.clearcartvendor}<span style={{fontSize:"15px",padding:"2px"}} className="fa fa-check-circle text-warning"></span></span></p>
                     <center> 
                       <div className="outer" >
                        <div className="inner" style={{width:`${this.state.chooserating*20}%`}}>
                         </div>
                       </div>
                       <div>
                         <small style={{float:"right"}}>
                           {this.props.categoryloading ?
                           <center style={{color:"green"}}>
                           <img src={require(`./images/35.gif`)} style={{width:"38%"}}/>
                          </center>
                          : null}
                           </small><br/>
             <form onSubmit={this.submitrating}>
    <input type="number" name=""  maxLength="1" onChange={this.change2}  value={this.state.chooserating} style={{width:"10%",position:"absolute",right:"5%",top:"20%"}}/><br/>
<textarea name="vendorcomment"  maxLength="30" cols="5" rows="3" value={this.state.vendorcomment} onChange={this.change} className="form-control" style={{width:"70%"}}></textarea>
                     <span style={{color:"grey"}}>{this.state.vendorcomment.length}/30</span> <br/><br/>
                    
                     <div className="row" style={{padding:"10px"}}>  
                    <div className="col-6">  
<button className="btn btn-danger" onClick={this.undisplaysellerrating} style={{boxShadow:"2px 3px lightgrey",padding:"8px",color:"white",width:"100%"}} type="button">
  Remind me later</button> 
</div>
<div className="col-6">
<button className="btn btn-success" onClick={(e)=>this.submitvendorrating({e,vendor:this.props.clearcartvendor,productId:this.props.clearcartproductId})}  style={{padding:"8px",color:"white",width:"100%",boxShadow:"2px 3px lightgrey"}} >Rate this Vendor</button>
</div>         
               </div>
                </form>            
               </div>
             </center>
         </div>
     </div>
 </div>

{
  //PRODUCT RATING MODAL
}
            <div className="mainmodaldiv" ref={(a) => this.productratingdiv =a} id="modaldiv" style={{display:`${this.props.clearcartproductratingdisplay}`,zIndex:"1",width:"100%",height:"100%",backgroundColor:"rgba(0,0,0,0.4)"}}>
         <div className="ratingmodaldiv"  style={{backgroundColor:"white",borderRadius:"10px"}}>
             <div className="inner-modal">
                     <p style={{padding:"5px"}}>Rate, {this.props.clearcartdetails}</p>
                     <center>   
                       <div className="outer" >
                        <div className="inner" style={{width:`${this.state.chooserating*20}%`}}>
                         </div>
                       </div>
                       <div><br/>
             <form onSubmit={this.submitrating}>
    <input type="number" name=""  maxLength="1" onChange={this.change2}  value={this.state.chooserating} style={{width:"10%",position:"absolute",right:"5%",top:"20%"}}/><br/>
<textarea name="productcomment"  maxLength="30" cols="5" rows="3" value={this.state.productcomment} onChange={this.change} className="form-control" style={{width:"70%"}}></textarea>
                     <span style={{color:"grey"}}>{this.state.productcomment.length}/30</span> <br/><br/><br/>
                     <div className="row" style={{padding:"10px"}}>  
                    <div className="col-6">  
<button className="btn btn-danger" onClick={this.undisplayproductrating} style={{boxShadow:"2px 3px lightgrey",padding:"8px",color:"white",width:"100%"}} type="button">
  <small>Remind me later</small></button> 
</div>
<div className="col-6">
<button className="btn btn-success" onClick={(e)=>this.submitproductrating({e,productId:this.props.clearcartproductId})}  style={{padding:"8px",color:"white",width:"100%",boxShadow:"2px 3px lightgrey"}}>
  <small>Rate this product</small>
</button>
</div>         
               </div>
                     </form>              
               </div>
             </center>
         </div>
     </div>
 </div>

            <div className="savemodaldiv" ref={(a) => this.colormodaldiv =a} id="savemodaldiv" style={{display:`${this.props.colormodaldisplay}`,zIndex:"2",width:"100%",height:"100%",backgroundColor:"rgba(0,0,0,0.4)"}}>
              <div className="savediv"  style={{backgroundColor:"white"}}>
                <p>{uri.indexOf("/register") ? `Welcome, Mr ${this.props.userdetails.fullName}, kindly` : null}</p>
              <center>
               <h3 style={{padding:"30px"}}>
               Select Background
               </h3>
               <form action="">
                 White <input type="radio" value="white" onClick={this.changecolor} name="color"/> <br/>
                 Black <input type="radio" value="black" onClick={this.changecolor} name="color"/>
               </form>
               <div className="row" style={{padding:"10px"}}>  
                    <div className="col-6">  
               <button className="btn btn-danger" onClick={this.removecolormodal} style={{boxShadow:"2px 3px lightgrey",padding:"8px",color:"white",width:"100%"}} type="button">Cancel</button> 
               </div>
               <div className="col-6">
              <button className="btn btn-success" onClick={this.proceedchangecolor} style={{padding:"8px",color:"white",width:"100%",boxShadow:"2px 3px lightgrey"}} >Proceed</button>
              </div>         
               </div>
     </center>
     </div>
       </div> 



    <div className="sidenavbar" style={{overflow:"auto",transition:"width 2s",WebkitTransform:"width 2s",mozTransition:"width 2s",zIndex:"3",width:`${this.props.modalsidenavbarwidth}`,overflowX:"hidden",height:"100%",left:"0px",position:"absolute",top:"0px"}}>
      <Profilesidenavbar />            
   </div>         
   <div style={{marginLeft:`${this.props.modalsidenavbarwidth}`,transition:"margin 2s",WebkitTransform:"margin 2s",mozTransition:"margin 2s"}}> 
        {//<Route path="/" component={Navbar} />
         }
    <Route path='/se/se'  component={Settings} />  
     
      <Route path='/connections/dk/:id/:random' exact component={MessageConnections} />
      <div className="row">
          <div className="col-12 d-md-none">
               <Route path='/connections/dk/:id/:random/sm' exact component={MessageConnectionsSm} /> 
          </div>
      </div>      
                 <Switch>  
                 <Route path='/' exact component={Subcats} />              
                 <Route path='/:category' exact   component={/*withRouter(App)*/Products} />
     
                 <Route path='/fruget/myproducts/:vendor' exact   component={/*withRouter(App)*/Products} />
                 <Route path='/fruget/services' exact   component={Services} />
                 <Route path='/select/filter' exact component={catalogueSidenavbar} /> 
                 <Route path="/select/searchfilter"  exact component={CatalogueSearchSideNavbar}></Route>             
                 <Route path="/customer/:priviledge/register" exact component={SellerRegister} />
                 <Route path="/user/productupload" exact component={ProductUpload} /> 
                 <Route path='/customer/login' exact component={Login}/>               
                 <Route path="/saved-items/:userId" exact component={SavedItems} />
                 <Route path='/product/:productId/:details' exact   component={Details} />  
                 <Route path='/category/search' exact   component={SearchApp} />  
                 <Route path='/checkout/cart' exact   component={CheckOut} />  
                 <Route path='/mi/mi/mi' exact   component={profileSideNavbar} />  
                 <Route path="/confirmemail/frugetcommunity/:confirmUseraccount/:getdetailsarray/:randalphaarray/:randuser" exact  component={ConfirmEmail}/>                    
                 <Route path='/fruget/map' exact   component={mapContainer} />  
                 </Switch>      
           </div>
                     <div>
                     <div>
                     <Route path="/:compass/lg"  component={myProfileTop}/>
                     </div>  
                     <div>
                     <Route path="/lg/:compass"  component={myProfileTop}/>
                     </div>   
                     <div>
                       <Route path="/:compass/lg/profile"  component={ProfileDetails}/>
                     </div>
                     <div>
                     <Route path="/:compass/lg/uploads" exact component={Uploads}/>
                     </div>                 
                     <div>
                     <Route path="/:compass/lg/home" exact component={Home}/>
                     </div>             
                     <div style={{boxSizing: "border-box",width:"100%",clear: "both",display:"inline-block",transition:"margin 2s",marginLeft:this.props.modalsidenavbarwidth}}>
                     <Route path="/:compass/lg/cart" exact component={Cart}/>
                     </div>
                     <div>
                     <Route path="/lg/orders" exact component={Orders}/>
                     </div>          
                     <div>
                     <Route path="/:compass/lg/saved_items" exact component={SavedItems}/>
                     </div>
                     <div>
                     <Route path="/:compass/lg/followers" exact component={Followers}/>
                     </div>
                     <div>
                     <Route path="/:compass/lg/profile/followers" exact component={Followers}/>
                     </div>
                     <div>
                     <Route path="/:compass/lg/following" exact component={Following}/>
                     </div>  
                     <div>
                     <Route path="/lg/invoice" exact component={Invoice}/>
                     </div>  
                     <div>
                     <Route path="/lg/group_orders" exact component={GroupedInvoice}/>
                     </div>  
                     <div>
                     <Route path="/lg/groupedinvoice" exact component={GroupedInvoiceDetails}/>
                     </div>          
                 </div>       
                         
                 <div >       
                  <div> 
                      <Route path="/profile/:email"  component={ProfileTop}/>
                      <Route path="/profile/component/:email" exact  component={UserComponent}/>
                     </div>
                     
                     <div >
                     <Route path="/profile/:email/uploads" exact component={UploadsTwo}/>
                     </div>                                      
                     <div >
                     <Route path="/profile/:email/saved_items" exact component={SavedItems}/>
                     </div>
                     <div >
                     <Route path="/profile/:email/followers" exact component={Followers}/>
                     <div >
                     <Route path="/profile/:email/following" exact component={Following}/>
                     </div>      
                     <div >
                     <Route path="/profile/:email/rating" exact component={UserRatings}/>
                     </div>    
                 </div>   
                 </div>
=======
                 <Provider store={store}>
                    <Navbar />
                 <Switch> 
                 
                 <Route path='/' exact component={Subcats} />
                 <Route path="/sellerregister" exact component={SellerRegister} />
                 <Route path="/productupload" exact component={ProductUpload} />
                 
                     <Route path='/customer/login' exact component={Login}/>
                 <Route path='/product/:details' exact   component={Details} />  
                 <Route path='/category/:category' exact   component={withRouter(App)} />
                 <Route path='/search' exact   component={SearchApp} />   
                 <Route path='/profile/:userId' exact component={Profile} />   
                 <Route path="/saved-items/:userId" exact component={SavedItems} />  
                 <Route path="/checkout/:userId" exact component={CheckOut}/>       
                 <Route path="/suggestions" exact component={Suggestions}/>                       
                 </Switch>          
                
                
                
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
                     </Provider>
                </Router>
            </div>
            </CookiesProvider>
        
         );
    }
  }
const mapStateToProps =(store)=>{
    return{           
      loading:store.loading,
     service:store.services,
     userdetails:store.userdetails,
     categoryModalclass:store.categoryModalclass,
     categoryModalheight:store.categoryModalheight,
     categoryModaldisplay:store.categoryModaldisplay,
     categoryModalSmallwidth:store.categoryModalSmallwidth,
     modalsidenavbarwidth:store.modalsidenavbarwidth,
     shoppingcarts:store.shoppingcart,
     colormodaldisplay:store.colormodaldisplay,
     ratingmodaldisplay:store.ratingmodaldisplay ,
     clearcartMessage:store.clearcartMessage,
     clearcartdisplay:store.clearcartdisplay,
    clearcartvendor:store.clearcartvendor,
    clearcartId:store.clearcartId,
    clearcartdetails:store.clearcartdetails,
    clearcartimage:store.clearcartimage,
    clearcartgencat:store.clearcartgencat,clearcartcat:store.clearcartcat,clearcartproductId:store.clearcartproductId,
    clearcartsellerratingdisplay:store.clearcartsellerratingdisplay,
     clearcartproductratingdisplay:store.clearcartproductratingdisplay,
     categoryloading:store.categoryloading,
     displayclearcartsuccess:store.displayclearcartsuccess,
     saveResponse :store.saveResponse,
     saveHeader:store.saveHeader,
     saveOpacity:store.saveOpacity,
     clearcartresponse:store.clearcartresponse,
     displaysavemodal:store.displaysavemodal,
     cartMessage:store.cartMessage,
     cartHeader:store.cartHeader,
     cartOpacity:store.cartOpacity,
      display:store.display,
      otheruserdetails:store.otheruserdetails,
      connectedclients:store.connectedclients,
      allmessages:store.allmessages,
      sender:store.sender,
      messagedisplay:store.messagedisplay,
      noofunreadmessages:store.noofunreadmessages
  }
  }
  const mapDispatchToProps =(dispatch)=>{
   return{
    connectedusers:(data)=>dispatch(connectedusers(data)),
   viewuserdetailsbyuserId:(data)=>dispatch(viewuserdetailsbyuserId(data)),
   shoppingcart:(data)=>dispatch(shoppingcart(data)),
   showcolormodal:()=>dispatch(showcolormodal()),
   unshowcolormodal:()=>dispatch(unshowcolormodal()),
   changecolor:(data)=>dispatch(changecolor(data)),
   confirmtoclearcart:()=>dispatch(confirmtoclearcart()),
   setdisplayproductrating:()=>dispatch(setdisplayproductrating()),
   undisplaysellerrating:()=>dispatch(undisplaysellerrating()),
   setdisplayvendorrating:()=>dispatch(setdisplayvendorrating()),
   undisplayproductrating:()=>dispatch(undisplayproductrating()),
   undisplayclearcartmodal:()=>dispatch(undisplayclearcartmodal()),
   undisplayclearcartsuccess:()=>dispatch(undisplayclearcartsuccess()),
   clearcart:(data)=>dispatch(clearcart(data)),
   ratevendor:(data)=>dispatch(ratevendor(data)),
   rateproduct:(data)=>dispatch(rateproduct(data)),
   undisplaysavemodal:()=>dispatch(undisplaysavemodal()),
   undisplaymodal:()=>dispatch(undisplaymodal()),
   setlastseen:(data)=>dispatch(setlastseen(data)),
   pushmessages:(data)=>dispatch(pushmessages(data)),
   viewsender:(data)=>dispatch(viewsender(data)),
   fetchconnections:(data)=>dispatch(fetchconnections(data)),
   fetchunreadmessages:()=>dispatch(fetchunreadmessages())
     }
  }
export default connect(mapStateToProps,mapDispatchToProps)(Category);
