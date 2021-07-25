import React, { Component } from 'react';
import {connect} from "react-redux" 
import {setredirect,getfilteredSuggestions,searcher,unshowmodalsidenavbar,unloading,showcolormodal,unshowcolormodal,showmodalsidenavbar,changecolor,fetchinvoice,fetchorders,viewuserdetailsbyuserId,viewuserdetails,fetchsavedItembyemail,shoppingcart,submittedcart} from "./store"
import Cookies from 'js-cookie';
import {Link,Redirect} from "react-router-dom"
import Suggestions from "./suggestions" 
import Profilesidenavbar from "./profilesidenavbar"
import {Dropdown} from "react-bootstrap"
import cookies from "js-cookie"
import queryString from "query-string"
import Followers from "./followers"
import Following from "./following"
import profilesidenavbar from './profilesidenavbar';

class myProfileTop extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            userId:"",
            background :"",
            currentCategory:"",
  displaysearch:"none",
  followerdisplay:"none",
  followingdisplay:"none",
  displaychangecolor:"none",
  sidenavbardisplay:"block",
  isLoggedin :false,
  searchinputwidth:"0%",
  searchinputone:"1",
  searchinputtwo:"0",
  inputval:""
         }
    }

   componentDidMount = async ()=>{  
        let mainToken
        if(Cookies.get("cm_pp")){
          this.setState({isLoggedin:true})
        }
        if(Cookies.get("cm_pp")){
            const myToken = Cookies.get("cm_pp")
            let myMainTokenlen = parseInt(myToken.split("%")[0])
             let userIdlen = parseInt(myToken.split("%")[1])
             let userIdpos = parseInt(myToken.split("%")[2].charAt(0)+myToken.split("%")[2].charAt(1))
             let userId = myToken.slice(userIdpos, userIdpos+userIdlen)
              mainToken = myToken.slice(userIdpos+userIdlen, myMainTokenlen)
             let userId2 = mainToken.slice(userIdpos, userIdpos+userIdlen)
             const compass = this.props.match.params.compass
            this.setState({userId})
            this.props.shoppingcart()
           // this.props.fetchinvoice(this.props.match.params.cartId)
            this.props.fetchorders()
           
             this.props.viewuserdetailsbyuserId(userId)
              
            let uri = window.location.href
           
         //   uri.indexOf = uri.split("/")[6]
            this.setState({currentCategory:uri})           
            this.scrollToTop();    
            this.props.submittedcart() 
        }else{
          this.props.setredirect()
        }
    }
    componentDidUpdate(prevProps) {
  if(prevProps.userdetails !== this.props.userdetails){ 
   setTimeout(()=> this.props.unloading(),2000) 
  }
}
    scrollToTop =()=>{
    //  alert("re-arranging")
   //  this.element.scrollTop =  this.element.scrollHeight;
 //  this.dummyDiv.scrollIntoView({behavior:"smooth"})
    }
    navigateFollowers=()=>{
        if(window.innerWidth > 600){
            this.setState({followerdisplay:"block"})
        }else{
          window.location.assign(`/profile/${this.props.match.params.email}/followers`)
        }
    }
    navigateFollowing=()=>{
        if(window.innerWidth > 600){
            this.setState({followingdisplay:"block"})
        }else{
          window.location.assign(`/profile/${this.props.match.params.email}/following`)
        }
    }
    change2 = (e)=>{
        this.setState({inputval:e.target.value,inputbtnclass:"fa fa-times"})
    //    const parsedQuery = queryString.parse(this.props.location.search)
       this.props.searcher(e.target.value)
           
       this.props.getfilteredSuggestions(e.target.value)
       if(e.target.value.length === 0){
       
        const url = window.location.href;
        const uri = url.split("?")[0]
     //   window.location.assign(uri)
       }
      }
      changebgcolor=()=>{
        this.props.showcolormodal()
      }
      proceedchangecolor= () =>{
        const data ={
          color:this.props.userdetails.background === "white" ? "black" : "white",
          userId:this.state.userId
        }
        this.props.changecolor(data)
       this.setState({displaychangecolor:"none"}, ()=>{
       })
      }  
      displaysidenavbar=()=>{
      // this.setState({sidenavbardisplay:"block"})
      if(this.props.modalsidenavbarwidth === "50%"){
      this.props.unshowmodalsidenavbar()
      }else{      
      this.props.showmodalsidenavbar()
      }

      }
      undisplaysidenavbar=()=>{
     //   this.setState({sidenavbardisplay:"none"})
     this.props.unshowmodalsidenavbar()
       }
       showsearchinput=()=>{
         if(this.state.searchinputwidth === "0%"){
         this.setState({searchinputwidth:"60%",searchinputone:"0",searchinputtwo:"1"})
         }else{
           this.setState({searchinputwidth:"0%",searchinputone:"1",searchinputtwo:"0"})
         }
       }
      logout=()=>{
        localStorage.clear();
        //         console.log(res.data[`userIexypoxy${res.data.messageId.charAt(0)+res.data.messageId.charAt(1)+res.data.messageId.charAt(2)}2gwy6g`])
    //  localStorage.setItem(`fruget152019081996b9gh2991hvhyb`, res.data[`userIexypoxy${res.data.messageId}2gwy6g`])
       console.log("m bc") 
    cookies.remove("token",{path:"/"})
    cookies.remove("cm_pp",{path:"/"})
    this.logoutredirect()
      }
     logoutredirect =()=>{
         if(!cookies.get("cm_pp")){
             this.props.history.push("/customer/login")
         } 
     }
     search=(e)=>{
       this.setState({inputval:e.target.value})
       const parsedQuery = queryString.parse(this.props.location.search)
      this.props.searcher(e.target.value)
          
     this.props.getfilteredSuggestions(e.target.value)
     if(e.target.value.length === 0){
     
      const url = window.location.href;
      const uri = url.split("?")[0]
   //   window.location.assign(uri)
     }
     }
    render() { 
      if(this.props.redirect){
        return <Redirect to={{ pathname: '/customer/login',state: { from: this.props.location }}} />
    }
     console.log(this.props.submittedcarts, "isLoggedin")
    // && parseInt(this.state.userId) == this.props.userdetails.userId  || parseInt(this.state.userId) === this.props.userdetails.userId
        let uri = window.location.href
      //  uri = uri.split("/")[3]
        console.log(this.state.sidenavbardisplay, "sidenavbardisplay")
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
      /**
       * <div style={{display:`${this.state.followerdisplay}`,position:"absolute",padding:"0px",top:"100%",left:"35%",border:"1px solid lightgrey",zIndex:"2",backgroundColor:"white",width:"25%",height:`100%`}}>
<div style={{width:"100%",padding:"0px"}}>
          
</div>
</div>
<div style={{display:`${this.state.followingdisplay}`,position:"absolute",padding:"0px",top:"100%",left:"35%",border:"1px solid lightgrey",zIndex:"2",backgroundColor:"white",width:"25%",height:`100%`}}>
<div style={{width:"100%",padding:"0px"}}>
       
</div> 
</div>
 <span onClick={this.displaysidenavbar} style={{color:`${this.props.userdetails.background==="white"?"black":"white"}`,position:"absolute",top:"15px",left:"20px"}} className="fa fa-bars "></span>
       */
      if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
  return ( 
    <div style={{backgroundColor:`${this.props.userdetails.background}`}} className="navbarcomponentlg">
  <div className="contain" style={{height:"100%",overflow:"hidden"}}>
     <div className="savemodaldiv" ref={(a) => this.savemodaldiv =a} id="savemodaldiv" style={{display:`${this.props.colormodaldisplay}`,zIndex:"1",width:"100%",height:"100%",backgroundColor:"rgba(0,0,0,0.4)"}}>
              <div className="savediv"  style={{backgroundColor:"white"}}>
              <center>
               <h3 style={{padding:"30px"}}>
               Select Background
               </h3>
               <form action="">
                 White <input type="radio"/> <br/>
                 Black <input type="radio"/>
               </form>
               <div className="row" style={{padding:"10px"}}>  
                    <div className="col-6">  
               <button className="btn btn-danger" onClick={()=>this.props.unshowcolormodal()} style={{boxShadow:"2px 3px lightgrey",padding:"8px",color:"white",width:"100%"}} type="button">Cancel</button> 
               </div>
               <div className="col-6">
              <button className="btn btn-success" onClick={this.proceedchangecolor} style={{padding:"8px",color:"white",width:"100%",boxShadow:"2px 3px lightgrey"}} >Proceed</button>
              </div>         
               </div>
     </center>
     </div>
       </div> 
        
  <div className="sidenavbar" style={{overflow:"auto",transition:"width 2s",WebkitTransform:"width 2s",mozTransition:"width 2s",zIndex:"1",width:`${this.props.modalsidenavbarwidth}`,overflowX:"hidden",height:"100%",left:"0px",position:"absolute",top:"0px"}}>
      <Profilesidenavbar email={this.props.match.params.email}/>            
   </div>
   <div  ref={(a) => this.element= a} style={{width:"100%",transition:"margin 2s",marginLeft:`${this.props.modalsidenavbarwidth}`,position:"relative"}}>    
  <div className="row" >         
  <div className="col-4 profImgdiv mt-2">
  <div style={{position:"relative"}}>
 
    <img src={this.props.userdetails.profileImage ? `https://res.cloudinary.com/fruget-com/image/upload/profile/${this.props.userdetails.profileImage}`: require(`./images/maleprofile.png`)}  style={{padding:"0px",width:"100%",height:"400px",borderRadius:"3px"}}  alt=""/>
    </div>
       <center>
     <div style={{position:"absolute",zIndex:"2",bottom:"-50px",borderTop:"1px solid lightgrey",borderRadius:"50%",width:"50%",backgroundColor:`${this.props.userdetails.background==="white"?"black":"white"}`}}>
             <center>
<img src={this.props.userdetails.profileImage ? `https://res.cloudinary.com/fruget-com/image/upload/profile/${this.props.userdetails.profileImage}`: require(`./images/maleprofile.png`)}  style={{padding:"30px",borderRadius:"50%",width:"100%",height:"200px"}}  alt=""/>
             </center>
    </div>  
    </center>
  </div>
  <div className="col-8" style={{marginTop:"30px",borderTop:"20px solid black",borderBottom:"none",borderTopRightRadius:"40%",borderTopLeftRadius:"20%",color:`${this.props.userdetails.background === "black" ? "white" :"black"}`}} >
     <br/>
      <small style={{fontSize:"25px"}}>{this.props.userdetails.fullName}</small><br/>
      <small className="text-muted" >{"@"+this.props.userdetails.businessName}</small><br/>
    <small style={{margin:"5px 0px",float:"right",fontSize:"14px"}}><button  style={{border:"1px solid lightgrey",padding:"3px"}} className="text-muted btn"><span className="fa fa-edit" ></span> Edit Profile</button></small><br/> 
           <p>
              emeechez entreprise is a wholesaler of refrigerator and other electronics. emeechez entreprise is a wholesaler of refrigerator and other electronics....          
              </p> 
     
      <small title={`click to mail ${this.props.userdetails.email}}`} style={{fontSize:"14px",padding:"4px"}}> <span className="fa fa-envelope 2x mr-2" style={{fontWeight:"bold"}}></span> <a href={`mailto:${this.props.userdetails.email}`} style={{textDecoration:"none",color:`${this.props.userdetails.background==="black"?"white":"black"}`}}> @<span>{this.props.userdetails.email}</span></a></small><br/>
      <small title={`click to dail ${this.props.userdetails.contact}}`} style={{fontSize:"14px",padding:"4px"}}> <span className="fa fa-phone 2x mr-2" style={{fontWeight:"bold"}}></span> <a href={`tel:${this.props.userdetails.email}`} style={{textDecoration:"none",color:`${this.props.userdetails.background==="black"?"white":"black"}`}}> <span>{this.props.userdetails.contact}</span></a></small><br/>
<small style={{fontSize:"14px",padding:"4px"}}> <span style={{fontWeight:"bold"}} className="fa fa-home mr-2"></span> <span style={{textTransform:"capitalize"}}>"{this.props.userdetails.businessName}"</span> located at <span>{this.props.userdetails.state+" , "+this.props.userdetails.lga}</span></small><br/>
<small style={{fontSize:"14px",padding:"4px"}}> <span style={{fontWeight:"bold"}} className="fab fa-twitter 2x mr-2"></span> <span>AdeIsCrown</span></small><br/>
<small style={{fontSize:"14px",padding:"4px"}}> <span style={{fontWeight:"bold"}} className="fab fa-facebook-square 2x mr-2"></span><span > Eze Ogbonnaya</span></small><br/>
<small style={{fontSize:"14px",padding:"4px"}}> <span style={{fontWeight:"bold"}} className="fa fa-link mr-2"></span><span><a style={{color:"green"}} href={`/fruget/myproducts/${this.props.userdetails.businessName}`}> {` http://fruget/myproducts/${this.props.userdetails.businessName}`}</a></span> <span title="click to share link" className="fa fa-reply ml-2"></span></small><br/>


{this.props.userdetails.userId === parseInt(this.state.userId) && this.props.shoppingcarts.length > 0 ?
 <Link to={`/checkout/cart`}><small className="text-muted">You have <span className="badge badge-primary">{this.props.shoppingcarts.length}</span> items in your <span className="fa fa-shopping-cart" style={{color:"green"}}></span></small><br/></Link>
: null}

  </div>
  </div>

 <div className="row" >
  <div className="col-6"></div>
  <div className="col-6" style={{padding:"5px"}}>
      <div className="row"> 
      <div className="col-4">
      <Link style={{color:`${uri === "uploads" ? "orange" : "grey"}`}} to={`/${Math.floor(Math.random()*1000000000)}/lg/uploads`}>
            <center>
  <b>{this.props.sellernumOfRows.length===0 ? 0 : this.props.sellernumOfRows}</b>  Uploads
            </center>
            </Link>
          </div>
          <div className="d-none d-md-block col-md-4" >
            <Link to={`/${Math.floor(Math.random()*10000000000)}/lg/followers`}>         
            <center style={{color:`${uri === "followers" ? "orange" : "grey"}`}}>
           <b>{this.props.userdetails.followers && this.props.userdetails.followers.length>0 ?JSON.parse(this.props.userdetails.followers).length : 0}</b>  Followers
            </center>
            </Link> 
          </div>
          <div className="col-4 d-md-none" >
          <Link to={`/${Math.floor(Math.random()*10000000000)}/lg/followers`}>
            <center style={{color:`${uri === "followers" ? "orange" : "grey"}`}}>
           <b>{this.props.userdetails.followers && this.props.userdetails.followers.length>0 ?JSON.parse(this.props.userdetails.followers).length : 0}</b>  Followers
            </center>
            </Link> 
          </div>
          <div className="col-4">
          <Link to={`/${Math.floor(Math.random()*10000000000)}/lg/following`}>
            <center style={{color:`${uri === "following" ? "orange" : "grey"}`}}>
            <b>  {this.props.userdetails.following && this.props.userdetails.following.length>0 ?JSON.parse(this.props.userdetails.following).length : 0}</b>  Following
            </center>
            </Link>
          </div>
      </div>
  </div>
  </div>
<br/>

 <div  style={{padding:"0px 20px"}}>
  <div  style={{ display:"flex",flexWrap:"nowrap",borderRadius:"20px",borderTopLeftRadius:"20px",border:"1px solid lightgrey",paddingBottom:"0px"}}>
          <div style={{width:"30%",padding:"5px",position:"relative"}}>
              <div style={{position:"absolute",top:"5%"}}>
          <div className="input-group mb-3 input-group-sm" >
                    <div className="input-group-prepend" >
                    <span className="input-group-text text-muted" onClick={()=>this.state.displaysearch === "none"?this.setState({displaysearch:"block"}):this.setState({displaysearch:"none"})} style={{border:"none",backgroundColor:"transparent"}}><span className="fa fa-search"></span></span>
                     </div>
                     <input style={{height:"50%",border:"none",display:`${this.state.displaysearch}`}} type="text" className="form-control form-control-sm navsearch"  value={this.state.inputval} name="search" onChange={this.change2} placeholder="Search Services"/>                      
                     </div>
  
                     <div style={{display:`${this.props.inputval.length > 0 ? "block" : "none"}`,zIndex:"3",width:"100%",height:"100%",position:"absolute"}} > 
             <Suggestions></Suggestions>       
                  </div>
                  </div>    
          </div>
   <div  style={{width:"10%",padding:"0px",borderTop:`${uri === "home" ? "1px solid grey" : ""}`,paddingTop:"10px"}}>
   <center>
   <Link style={{color:`${uri === "home" ? "orange" : "grey"}`}}  to={`/${this.props.match.params.email}/lg/home`}>
    <span className="fa fa-home" style={{fontSize:"15px"}}></span>
    <small className="" style={{fontSize:"13px"}}> Home</small>
    </Link>
   </center>
   </div>
   <div  style={{width:"10%",paddingTop:"10px"}}>
   <center>
   <Link to={`/${Math.floor(Math.random()*1000000000)}/lg/cart`}>
   <small style={{position:"relative"}}><span className="fa fa-shopping-cart text-muted" style={{fontSize:"20px"}}></span>
    <small style={{position:"absolute",right:"-10px"}} className="badge badge-success">
        {this.props.submittedcarts?this.props.submittedcarts.length: null}
    </small>
    </small> 
    <small className="text-muted"  style={{fontSize:"13px"}}> Cart</small>
    </Link>
   </center>
   </div>
   <div  style={{width:"10%",paddingTop:"10px",borderTop:`${uri === "saved_items" ? "1px solid grey" : ""}`}}>
   <center>
   <Link style={{color:`${uri === "saved_items" ? "orange" : "grey"}`}} to={`/${Math.floor(Math.random()*1000000000)}/lg/saved_items`}>
   <small style={{position:"relative"}}><span className="fa fa-cloud" style={{fontSize:"15px"}}></span>
    <small style={{position:"absolute",right:"-5px"}} className="badge badge-danger">
        {this.props.userdetails.savedItems && this.props.userdetails.savedItems !== null ? JSON.parse(this.props.userdetails.savedItems).length : 0}
    </small>
    </small> 
    <small className=""  style={{fontSize:"13px"}}> Saved</small>
    </Link>
   </center>
   </div>
   <div  style={{width:"10%",paddingTop:"10px"}}>
   <center>
   <Link style={{color:`${uri === "orders" ? "orange" : "grey"}`}} to={`/lg/orders`}>
   <small style={{position:"relative"}}><span className="fa fa-store " style={{fontSize:"15px"}}></span>
  <small style={{position:"absolute",right:"-8px"}} className="badge badge-danger">
        {this.props.orders.length}
    </small>
    </small>
  <small className=""  style={{fontSize:"13px"}}> orders</small>
  </Link>
   </center>
   </div>
   
   <div  style={{width:"20%",paddingTop:"10px"}}></div>
   <div style={{width:"10%",paddingTop:"10px"}}>
                 <center>
            <div style={{display:"flex",flexWrap:"nowrap"}}>
              <div>
     
   <small className="text-muted"> 
   <span className="fa fa-cog" style={{fontSize:"18px",ackgroundColor:"white",color:"grey"}}></span>
   </small>
              </div>
            </div>
            </center>               
                 </div>
   <div className="d-none " >
                      <center >
<Dropdown className="text-muted">
  <Dropdown.Toggle style={{backgroundColor:"transparent", border:"none",fontWeight:"bolder",color:"rgb(0, 119, 179)"}} id="dropdown-basic">
  <span className="fa fa-user-circle text-muted" style={{fontSize:"25px"}}></span>
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item onClick={this.logout}><small> <span className="fa fa-sign-out-alt" style={{color:"black"}}></span> Log out</small></Dropdown.Item>
    <Dropdown.Item onClick={() => this.sort("high-low")}><small>Price : Highest - Lowest</small></Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
    </center>
    </div>
   </div> 

  </div>
  </div>
  </div>
  </div>
         );
    }else{
    return(
      <div className="container">
              
              <div className="row" style={{boxShadow:" 0 4px 2px -2px lightgrey",backgroundColor:"white"}}>
        <div className="col-12" style={{position:"fixed",top:"0px",backgroundColor:"white",zIndex:"2",height:"35px"}}>
          <div style={{margin:"6px 0px",display:"flex",flexWrap:"nowrap",padding:"5px"}}>
 <div>
  <span onClick={this.displaysidenavbar} style={{opacity:`${this.props.navbariconopacity}`,transition:"opacity 2s",float:"left",color:`${this.props.userdetails.background==="white"?"black":"white"}`}} ></span>
  <span onClick={()=>this.props.unshowmodalsidenavbar()}
  style={{opacity:`${this.props.modaliconopacity}`,transition:"opacity 2s",position:"absolute",left:"5px",float:"left",top:"0px",color:`${this.props.userdetails.background==="white"?"black":"white"}`}} className="fa fa-times "></span>
  </div>  
  <div style={{marginLeft:"25%",width:"50%"}}>
    <center>
      <small style={{padding:"5px",width:"100%",borderRadius:"30%"}}>
      <div style={{width:`${this.state.searchinputwidth}`,transition:"width 2s",overflow:"hidden",position:"absolute"}}>
        <input type="text" onChange={this.search} value={this.state.inputval} className="form-control form-control-sm ml-4" placeholder="...search " style={{width:"97%",border:"0.5px solid lightgrey",borderBottom:"1px solid lightgrey",backgroundColor:"white"}} />
     <div style={{width:"150%"}}>
     <Suggestions />
     </div>
        </div>
         {this.props.userdetails.email} <span className="far fa-user ml-1"></span>
         </small>  
         </center>
     </div>{
//style={{margin:"6px 0px",display:"flex",flexWrap:"nowrap",padding:"5px"}}
//style={{display:"flex",flexWrap:"nowrap"}}
/**
 *  <div style={{position:"relative"}} >
        <span className="fa fa-bell" style={{fontSize:"18px",float:"right",color:"grey"}}></span>
        <div style={{position:"absolute",fontWeight:"bold",right:"-5px",top:"-5px"}}>
          <span className="badge"  style={{borderRadius:"50%",fontSize:"16px",padding:"0px 2px",backgroundColor:`brown`,color:`white`}}><small>0</small></span> 
       </div>  
        </div>
 */
     }
      <div style={{display:"flex",flexWrap:"nowrap"}}>
      <div style={{width:"50%"}}>
       <span className="fa fa-search ml-2" onClick={this.showsearchinput} style={{opacity:`${this.state.searchinputone}`,transition:"opacity 2s",marginLeft:"20px",fontSize:"15px",color:"grey"}}></span>
       </div>
       <div style={{position:"relative",width:"50%",float:"right",opacity:`${this.state.searchinputone}`  }} className={this.props.noofcontacts > 0 ? "bounce animated ml-5" : "ml-5"}>
      <a href={`/connections/dk/${Math.floor(Math.random()*10000000)}/${Math.floor(Math.random()*10000000)}`} >
       <i className='fab fa-facebook-messenger ml-2' style={{fontSize:"22px",color:"grey"}}></i>
       <div style={{position:"absolute",fontWeight:"bold",right:"-5px",top:"-5px"}}>
          <span className="badge"  style={{fontSize:"16px",padding:"0px 2px",backgroundColor:`brown`,color:`white`}}>
            <small style={{marginTop:"0px"}}>{this.props.noofcontacts}</small></span> 
       </div>
       </a>
       </div>
       <div>
       <span className="fa fa-times" onClick={this.showsearchinput} style={{opacity:`${this.state.searchinputtwo}`,position:"absolute",transition:"opacity 2s",fontSize:"15px",color:"grey",zIndex:"5"}}></span>
        </div>
       
        </div> 
      
      </div>
          </div>
          <div className="col-12" style={{position:"absolute",marginTop:"40px",backgroundColor:"white"}}>
      <center>
        <div style={{width:"10%",height:"50px",backgroundColor:"brown",color:"white",borderRadius:"50%"}}>
          <p style={{paddingTop:"15px"}}>E</p>
          </div>
          <small>Fruget <b>Account</b></small>
      </center>
      </div>
      </div>
      <div className="row" style={{marginTop:"130px"}} >
     <div className="col-12 mb-2" >
       <h4 style={{fontWeight:"bold",color:"orange"}}>
         fruget
       </h4>
     </div>
      <div className="col-12 " style={{borderBottom:"1px solid lightgrey",zIndex:"1"}}>
        <div className="row">
 <div className="col-2 " style={{borderBottom: `${uri.indexOf("profile") > -1 ? "1px solid brown" : ""}`}}>
<Link style={{color:`${uri.indexOf("profile") > -1 ? "brown" : "grey"}`}} to={`/${Math.floor(Math.random()*1000000000)}/lg/profile`}>
          <small className="mb-5">
            <span className="far fa-user-circle" style={{fontSize:"22px"}}></span>
          </small>
          </Link>
        </div>
        <div className="col-2" style={{borderBottom: `${uri.indexOf("uploads") > -1 ? "1px solid brown" : ""}`}}>
<Link style={{color:`${uri.indexOf("uploads") > -1 ? "brown" : "grey"}`}} to={`/${Math.floor(Math.random()*1000000000)}/lg/uploads`}>
          <small className="mb-2">
            <span className="fa fa-upload" style={{fontSize:"22px"}}></span>         
          <div style={{position:"absolute",top:"-5px",left:"22px"}}>
          <small className="badge ml-2" style={{borderRadius:"50%",backgroundColor:"brown",color:"white",padding:"3px"}}>        
          {this.props.sellernumOfRows.length===0 ? 0 : this.props.sellernumOfRows}
          </small>
    </div>
      </small>
    </Link>
        </div>
        <div className="col-2 " style={{borderBottom: `${uri.indexOf("cart") > -1 ? "1px solid brown" : ""}`}}>
<Link style={{color:`${uri.indexOf("cart") > -1 ? "brown" : "grey"}`}} to={`/${Math.floor(Math.random()*1000000000)}/lg/cart`}>
          <small className="mb-5">
            <span className="fab fa-opencart ml-1" style={{fontSize:"22px"}}></span>
            <div style={{position:"absolute",top:"-5px",left:"25px"}}>
            <small className="badge ml-2" style={{backgroundColor:"brown",color:"white",padding:"3px",borderRadius:"50%"}}>
        {this.props.submittedcarts?this.props.submittedcarts.length: null}
    </small>
    </div>
          </small>
          </Link>
        </div>
        <div className="col-2 " style={{borderBottom: `${uri.indexOf("saved_items") > -1 ? "1px solid brown" : ""}`}}>
<Link style={{color:`${uri.indexOf("saved_items") > -1 ? "brown" : "grey"}`}} to={`/${Math.floor(Math.random()*1000000000)}/lg/saved_items`}>
          <small className="mb-5">
            <span className="far fa-heart ml-1" style={{fontSize:"22px"}}></span>
            <div style={{position:"absolute",top:"-5px",left:"25px"}}>
            <small className="badge ml-2" style={{backgroundColor:"brown",color:"white",padding:"3px",borderRadius:"50%"}}>
            {this.props.userdetails.savedItems && this.props.userdetails.savedItems !== null ? JSON.parse(this.props.userdetails.savedItems).length : 0}
          </small>
          </div>
          </small>
          </Link>
        </div>
        <div className="col-2" style={{borderBottom: `${uri.indexOf("orders") > -1 ? "1px solid brown" : ""}`}}>
<Link style={{color:`${uri.indexOf("orders") > -1 ? "brown" : "grey"}`}} to={`/lg/orders`}>
          <small className="mb-5">
            <span className="fa fa-ambulance" style={{fontSize:"22px"}}></span>
            <div style={{position:"absolute",top:"-5px",left:"25px"}}>
            <small className="badge ml-2" style={{backgroundColor:"brown",color:"white",borderRadius:"50%",padding:"3px"}}>
            {this.props.orders.length}
         </small>
         </div>
          </small>
          </Link>
        </div>   
        <div className="col-2" style={{borderBottom: `${this.props.modalsidenavbarwidth === "50%" ? "1px solid brown" : ""}`}}>
        <span onClick={this.displaysidenavbar} style={{transition:"opacity 2s",float:"left",color:`${this.props.modalsidenavbarwidth === "50%" ?"brown":"black"}`}} className="fa fa-bars "></span> 
       </div>
        </div>
      </div>
      </div>
      </div>
    )
    }
  }
}
const mapStateToProps=(store)=>{
    return{
      modalsidenavbarwidth:store.modalsidenavbarwidth,
        userdetails:store.userdetails,
        sellerproducts:store.sellerproducts,
        inputval:store.inputval,
        savedProducts:store.savedProducts,
        sellernumOfRows:store.sellernumOfRows,
        shoppingcarts:store.shoppingcart,
        submittedcartprice:store.submittedcartprice,
        submittedcarts:store.submittedcart,
        orders :store.orders,
        totalorderprice: store.totalorderprice,
        loading: store.loading,
        modalsidenavbardisplay:store.modalsidenavbardisplay,
        modalsidenavbarwidth:store.modalsidenavbarwidth,
        colormodaldisplay:store.colormodaldisplay,
        statos:store.statos,
        isLoggedin:store.isLoggedin,
        modaliconopacity:store.modaliconopacity,
        navbariconopacity:store.navbariconopacity,
        noofcontacts:store.noofcontacts,
        redirect:store.redirect
    }
     }
     const mapDispatchToProps=(dispatch)=>{
         return{
         //    viewsellerdetails:(data)=>dispatch(viewsellerdetails(data)),
             getfilteredSuggestions :(data)=>dispatch(getfilteredSuggestions(data)),
             fetchsavedItembyemail :(data)=>dispatch(fetchsavedItembyemail(data)),
             searcher :(data)=>dispatch(searcher(data)),
             viewuserdetailsbyuserId:(data)=>dispatch(viewuserdetailsbyuserId(data)),
             shoppingcart:(data)=>dispatch(shoppingcart(data)),
             submittedcart:(data)=>dispatch(submittedcart(data)),
             fetchorders:()=>dispatch(fetchorders()),
             fetchinvoice:(data)=>dispatch(fetchinvoice(data)),
             changecolor:(data)=>dispatch(changecolor(data)),
             showmodalsidenavbar:()=>dispatch(showmodalsidenavbar()),
             showcolormodal:()=>dispatch(showcolormodal()),
             unshowcolormodal:()=>dispatch(unshowcolormodal()),
             unloading:()=>dispatch(unloading()),
             unshowmodalsidenavbar:()=>dispatch(unshowmodalsidenavbar()),
             setredirect:()=>dispatch(setredirect())
           
         }
     }
export default connect(mapStateToProps,mapDispatchToProps)(myProfileTop);
