import React, { Component } from 'react';
import {connect} from "react-redux" 
import {increasesettingsheight,decreasesettingsheight,decreaseshoppingcart,showcolormodal,displaycategorymodal,viewuserdetailsbyuserId,viewuserdetails,getProducts,getfilteredSuggestions,unshowmodalsidenavbar,allcategories,allsubcategories} from "./store"
import Cookies from 'js-cookie';
import {Link,Redirect} from "react-router-dom"

class ProfileSideNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = { 
  currentCategory:"",
  category:[],
  subcategory:[],
  currentcategory:"",
  set:"Category",
  subcategorydisplay:"none",
  settings_state:"fa fa-chevron-right"
         }
    }
    componentDidMount =()=>{
        console.log("Cookies.get(cm_ppp)",Cookies.get("cm_pp"))    
        let mainToken
        if(Cookies.get("cm_pp")){
            const myToken = Cookies.get("cm_pp")
            let myMainTokenlen = parseInt(myToken.split("%")[0])
             let userIdlen = parseInt(myToken.split("%")[1])
             let userIdpos = parseInt(myToken.split("%")[2].charAt(0)+myToken.split("%")[2].charAt(1))
             let userId = myToken.slice(userIdpos, userIdpos+userIdlen)
              mainToken = myToken.slice(userIdpos+userIdlen, myMainTokenlen)
             let userId2 = mainToken.slice(userIdpos, userIdpos+userIdlen)
             if(!this.props.viewuserdetailsbyuserId.email){
        //     this.props.viewuserdetailsbyuserId(userId)
            }
             console.log("userId",userId)
            }      
    
            let uri = window.location.href
            uri = uri.split("/")[6]
            this.setState({currentCategory:uri})
    
    /*    const userId = this.props.match.params.userId.split("%2C")[1]
        console.log("userId", userId)
        if(this.props.sellerdetails.length === 0){
            this.props.viewsellerdetails(userId)
        }
        this.setState({details:this.props.match.params.details || "none"})

        let uri = window.location.href
        uri = uri.split("/")[6]
        this.setState({currentCategory:uri})
        */
  //     this.props.allcategories()
    }
    subcat=(e)=>{
        this.props.allsubcategories(e.currentTarget.textContent)
        this.setState({currentcategory:e.currentTarget.textContent,set:"Sub-Category",subcategorydisplay:"block"})
       
      }
      undisplaysidenav =()=>{
        this.props.showmodalsidenavbar()
        }
        opencategory=(e)=>{
          const data ={
            category:e.currentTarget.textContent,
            page:1
          }
          this.props.getProducts(data)
        }
    undisplaysidenavbar=()=>{
        this.props.unshowmodalsidenavbar()
          }
    logout=()=>{
            localStorage.clear();
            //         console.log(res.data[`userIexypoxy${res.data.messageId.charAt(0)+res.data.messageId.charAt(1)+res.data.messageId.charAt(2)}2gwy6g`])
        //  localStorage.setItem(`fruget152019081996b9gh2991hvhyb`, res.data[`userIexypoxy${res.data.messageId}2gwy6g`])
           console.log("m bc") 
        Cookies.remove("token",{path:"/"})
        Cookies.remove("cm_pp",{path:"/"})
        this.logoutredirect()
          }
  logoutredirect =()=>{
             if(!Cookies.get("cm_pp")){
                 window.location.href("/customer/login")
             } 
         }
 displaycategorymodal=()=>{
 this.props.displaycategorymodal()
          }
increasesettingsheight=()=>{
this.props.increasesettingsheight()
this.setState({settings_state:"fa fa-chevron-down"})
          }
decreasesettingsheight =()=>{
    this.props.decreasesettingsheight()
    this.setState({settings_state:"fa fa-chevron-right"})
}
    render() { 
        let uri = window.location.href
        uri = uri.split("/")[5]
        console.log(uri)
        return ( 
            <div className="container">
 <div className="row" style={{backgroundColor:`${this.props.userdetails.background || "white"}`,color:`${this.props.userdetails.background==="white"?"black": this.props.userdetails.background==="white"?"black":"black"}`}}>
 <div className="col-sm-12 d-md-none" style={{position:"sticky",top:"0px",padding:"0px", zIndex:"10"}}>  
 <small onClick={this.undisplaysidenavbar} style={{display:`${this.props.modalsidenavbardisplay}`,float:"right",fontSize:"20px",cursor:"pointer"}}>x</small>
 {this.props.userdetails.email ?         
 <div style={{backgroundColor:"rgb(10, 20, 41)",padding:"10px",color:"white",zIndex:"10"}}>
 <small onClick={this.undisplaysidenavbar} style={{float:"right",fontSize:"20px",cursor:"pointer"}}>x</small>
        <small style={{textTransform:"uppercase",fontWeight:"bold",padding:"0px",fontSize:"15px"}}>Fruget Community</small><br/>
        <small style={{textTransform:"capitalize"}}>{this.props.userdetails.businessName}</small> 
        <span style={{padding:"10px"}} className="fa fa-angle-down"></span><br/>
            <small style={{color:"lightgrey"}}>56389</small>
        </div> 
: null}
</div>
<div className="col-sm-12 d-md-none" style={{padding:"10px"}}> 
        <p>Account</p>
<div className="row" style={{padding:"0px 10px"}}>
<div className="col-6">
<button className="btn" onClick={()=> window.location.assign("/customer/login")} style={{backgroundColor:"orange",textDecoration:"none",borderRadius:"3px",width: "100%",color:"white",padding:"2px"}}>
  <small> <span className="fa fa-sign-in "></span>sign in </small></button>
</div>

 <div className="col-6">
<button className="btn btn-link" onClick={()=> window.location.assign("/customer/register")}  style={{backgroundColor:"orange",textDecoration:"none",borderRadius:"3px",width:"100%",padding:"2px",color:"white"}}> 
<small><span className="fa fa-heart"></span> Register</small></button>
</div>
</div>
<br/>

 <p onClick={(e)=>this.opencategory(e)} style={{backgroundColor:`${this.props.userdetails.background==="black"?"white":"black"}`,color:`${this.props.userdetails.background === "black" ? "black" : "white"}`,padding:"10px",display:`${this.state.subcategorydisplay}`}}>
  {this.state.currentcategory}
   <i style={{float:"right"}} className="fas fa-chevron-down ml-1"></i>
 </p>
 <div style={{paddingLeft:"35px",display:`${this.state.subcategorydisplay || "white"}`}} className="row">
 <div className="col-12" style={{backgroundColor:`${this.props.userdetails.background || "white"}`,color:`${this.props.userdetails.background === "black" ? "white" : this.props.userdetails.background === "white"?"black" : "black"}`,padding:"10px",display:`${this.state.subcategorydisplay}`}}>
    {this.props.allsubcategory.length > 0 ? this.props.allsubcategory.map((categories) =>
        <div key={categories.category } style={{cursor:"pointer",borderBottom:"1px solid lightgrey"}}>
             <p onClick={(e)=>this.subcat(e)} ><small style={{textTransform:"capitalize"}} >{categories.category}</small>
             </p>
        </div>
        ) : null}
      </div>
      </div>
      <p>Category</p>
      <div style={{paddingLeft:"20px"}} className="row">
   <div className="col-12" style={{backgroundColor:`${this.props.userdetails.background || "white"}`,color:`${this.props.userdetails.background === "black" ? "white" : "black"}`}}>
    {this.props.allcategory.length > 0 ? this.props.allcategory.map((categories) =>
        <div key={categories.generalcategory } style={{cursor:"pointer",borderBottom:"1px solid lightgrey"}}>
             <p onClick={(e)=>this.subcat(e)} ><small style={{fontWeight:"bold",textTransform:"capitalize"}} >{categories.generalcategory}</small>
             </p>
        </div>
        ) : null}
      </div>
     
      <div>
      </div>
 </div>

<div style={{padding:"10px",borderBottom:`1px solid lightgrey`}}>
<Link style={{width:"0px",fontSize:"0px",color:`${uri === "home" ? "orange" : this.props.userdetails.background==="white"?"black":"white"}`}} to={`/${this.props.email}/lg`}>
<small onClick={this.change} style={{fontSize:"14px"}}>
 <span className="fa fa-home"> </span>  Home</small>
 </Link>
</div>

<div onClick={this.displaycategorymodal} style={{padding:"10px",borderBottom:`1px solid lightgrey`,color:`${uri === "home" ? "orange" : this.props.userdetails.background==="white"?"black":"white"}`}}>
<small onClick={this.change} style={{fontSize:"14px"}}>
<span className="fa fa-user-md"></span> Our Services </small>
</div>

  {this.props.userdetails.email ?

  <div style={{margin:""}} >
            <div style={{padding:"15px 0px 0px 23px"}}>
               <small style={{fontSize:"13px",fontWeight:"bolder",color:"lightgrey"}}>
                   ORDERS
               </small>
            </div>
<a style={{color:`${uri === "cleared_carts" ? "orange" :this.props.userdetails.background==="white"?"black":"white"}`}} href={`/${this.props.email}/lg/orders`}>
 <div style={{padding:"10px",borderBottom:`1px solid lightgrey`}}>
           <small  style={{fontSize:"14px"}}><span className="fa fa-shopping-cart"></span> Pending Cart 
           <small className="badge badge-danger" style={{float:"right"}}>{this.props.shoppingcarts.length}</small>
            </small>
    </div>
    </a>
    <Link style={{color:`${uri === "submitted_carts" ? "orange" : this.props.userdetails.background==="white"?"black":"white"}`}} to={`/${this.props.email}/lg/pending_carts`}>
 <div style={{padding:"10px",borderBottom:`1px solid lightgrey`}}>
           <small  style={{fontSize:"14px"}}><span className="fa fa-shopping-cart"></span> Submitted Cart 
           <small className="badge badge-danger" style={{float:"right"}}>{this.props.submittedcarts.length}</small>
            </small>
    </div>
    </Link>
    <Link style={{color:`${uri === "cleared_carts" ? "orange" : this.props.userdetails.background==="white"?"black":"white"}`}} to={`/${this.props.email}/lg/cleared_carts`}>
 <div style={{padding:"10px",borderBottom:`1px solid lightgrey`}}>
           <small  style={{fontSize:"14px"}}><small style={{fontSize:"15px",position:"relative"}}>
           <span className="fa fa-shopping-cart" ></span>
           <span className="fa fa-times" style={{fontSize:"25px",position:"absolute",right:"0px",top:"0px",color:"red"}}></span>
                </small> Cleared Cart <small className="badge badge-success" style={{float:"right"}}>0</small>
            </small>
    </div>
    </Link>
    <Link style={{color:`${uri === "orders" ? "orange" : this.props.userdetails.background==="white"?"black":"white"}`}} to={`/lg/orders`}>
 <div style={{padding:"10px",borderBottom:`1px solid lightgrey`}}>
           <small  style={{fontSize:"14px"}}><small style={{fontSize:"15px",position:"relative"}}>
           <span className="fa fa-shopping-cart" ></span>
           <span className="fa fa-times" style={{fontSize:"25px",position:"absolute",right:"0px",top:"0px",color:"red"}}></span>
                </small> Orders <small className="badge badge-success" style={{float:"right"}}> {this.props.orders.length}</small>
            </small>
    </div>
    </Link>

<div style={{padding:"15px 0px 0px 23px"}}>
               <small style={{fontSize:"13px",fontWeight:"bolder",color:"lightgrey"}}>
                   ACCOUNT
               </small>
            </div>
            <a style={{color:`${uri === "uploads" ? "orange" : this.props.userdetails.background==="white"?"black":"white"}`}} href={`/${this.props.email}/lg/uploads`}>
 <div style={{padding:"10px",borderBottom:`1px solid lightgrey`}}>
           <small  style={{fontSize:"14px"}}><span className="fa fa-upload"></span> 
            Uploads 
            <span style={{float:"right"}}>
            ({this.props.sellernumOfRows.length===0 ? 0 : this.props.sellernumOfRows})
            </span>
            </small>
    </div>
    </a>
<a style={{color:`${uri === "saved_items" ? "orange" : this.props.userdetails.background==="white"?"black":"white"}`}} href={`/${this.props.userdetails.email || this.props.email}/lg/saved_items`}>
    <div style={{padding:"10px",borderBottom:`1px solid lightgrey`}}>
           <small  style={{fontSize:"14px"}}><span className="fa fa-cloud"></span>  Saved Items 
           <small className="badge badge-warning" style={{float:"right"}}>
           {this.props.userdetails.savedItems && this.props.userdetails.savedItems !== null ? JSON.parse(this.props.userdetails.savedItems).length : 0}
           </small>
           </small>
</div>
</a>
<Link style={{color:`${uri === "followers" ? "orange" : this.props.userdetails.background==="white"?"black":"white"}`}} to={`/${this.props.email}/lg/followers`}>
    <div style={{padding:"10px",borderBottom:`1px solid lightgrey`}}>
           <small  style={{fontSize:"14px"}}><span className="fa fa-users"></span>   Followers 
           <small className="badge badge-danger" style={{float:"right"}}>
           {this.props.userdetails.followers && this.props.userdetails.followers.length>0 ?JSON.parse(this.props.userdetails.followers).length : 0}
           </small>
           </small>
</div>
</Link>

<div style={{cursor:"pointer",color:`${uri === "settings" ? "orange" : this.props.userdetails.background==="white"?"black":"white"}`}} to={`/${this.props.email}/lg/category`}>
    <div style={{padding:"10px",borderBottom:`1px solid lightgrey`}} title="double click to remove settings" onDoubleClick={this.decreasesettingsheight} onClick={this.increasesettingsheight} >
           <small  style={{fontSize:"14px"}}><span className="fa fa-cog" ></span> Settings
           </small>
           <small style={{float:"right"}}>
               <span className={`${this.state.settings_state}`}></span>
           </small>
           </div>
           <div style={{height:`${this.props.settingsheight}`, transition:"height 2s",overflow:"hidden"}}>
           <div style={{cursor:"pointer",padding:"2px 5px"}} >
           <small className="ml-3" style={{fontSize:"13px"}}><span className="fa fa-edit" style={{fontWeight:"bold"}}></span> Edit Profile
           </small></div> 
           <div style={{cursor:"pointer",padding:"2px 5px"}}>
           <small className ="ml-3" style={{fontSize:"13px"}} onClick={()=>this.props.showcolormodal()}><span className="fa fa-cog" ></span> 
           Select Background <br/>
           <span style={{marginLeft:"25px",color:"grey"}}>
           {this.props.userdetails.background}
           </span>
           </small>
           </div>
           <div style={{cursor:"pointer",padding:"2px 5px"}}>
           <small className ="ml-3" style={{fontSize:"13px"}} onClick={()=>this.props.showcolormodal()}><span style={{fontWeight:"bold"}} className="fa fa-bell" ></span> 
           Notification <br/>
           <span style={{marginLeft:"25px",color:"grey"}}>
           On
           </span>
           </small>
           </div>
           <div style={{cursor:"pointer",padding:"3px 5px"}} >
           <small className="ml-3" style={{fontSize:"13px"}}><span className="fa fa-sign-out-alt" style={{fontWeight:"bold"}}></span> Log Out </small></div>
           </div>
</div>
 </div>

: null}

<div onClick={this.logout} style={{color:`${this.props.userdetails.background === "black" ? "white" : this.props.userdetails.background === "white"?"black" : "black"}`,padding:"10px",borderBottom:"1px solid lightgrey"}}>
           <small  style={{fontSize:"14px"}}><span className="fa fa-map-maker"></span>Locate us
           </small>
</div> 

<div onClick={this.logout} style={{color:`${this.props.userdetails.background === "black" ? "white" : this.props.userdetails.background === "white"?"black" : "black"}`,padding:"10px"}}>
           <small  style={{fontSize:"14px"}}><span className="fa fa-sign-out"></span> Log Out
           </small>
</div>                    
     </div>

 </div>
 </div>
         );
    }
}
const mapStateToProps=(store)=>{
    return{
        userdetails :store.userdetails,
        sellerproducts:store.sellerproducts,
        savedProducts:store.savedProducts,
        sellernumOfRows:store.sellernumOfRows,
        shoppingcarts:store.shoppingcart,
        submittedcartprice:store.submittedcartprice,
        submittedcarts:store.submittedcart,
        orders :store.orders,
        totalorderprice: store.totalorderprice,
        loading: store.loading,
        modalsidenavbardisplay:store.modalsidenavbardisplay,
        allcategory:store.allcategories,
        allsubcategory:store.allcategory,
        settingsheight:store.settingsheight
    }
     }
     const mapDispatchToProps=(dispatch)=>{  
         return{
            viewuserdetails:(data)=>dispatch(viewuserdetails(data)),
             getfilteredSuggestions :(data)=>dispatch(getfilteredSuggestions(data)),
             unshowmodalsidenavbar :()=>dispatch(unshowmodalsidenavbar()),
             allcategories: ()=>dispatch(allcategories()),
             allsubcategories:(data)=> dispatch(allsubcategories(data)),
             getProducts:(data)=>dispatch(getProducts(data)),
             viewuserdetailsbyuserId:(data)=>dispatch(viewuserdetailsbyuserId(data)),
             displaycategorymodal:()=>dispatch(displaycategorymodal()),
             showcolormodal:()=>dispatch(showcolormodal()),
             increasesettingsheight:()=>dispatch(increasesettingsheight()),
             decreasesettingsheight:()=>dispatch(decreasesettingsheight())
         }
     }
export default connect(mapStateToProps,mapDispatchToProps)(ProfileSideNavbar);