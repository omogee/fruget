import React, { Component } from 'react';
import {connect} from "react-redux" 
import {fetchinvoice,fetchorders,viewuserdetailsbyuserId,viewuserdetails,searcher,getfilteredSuggestions,fetchsavedItembyemail,shoppingcart,submittedcart} from "./store"
import Cookies from 'js-cookie';
import {Link,Redirect} from "react-router-dom"
import Suggestions from "./suggestions" 
import {Dropdown} from "react-bootstrap"
import cookies from "js-cookie"
import queryString from "query-string"
import Followers from "./followers"
import Following from "./following"

class UserComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            userId:"",
  currentCategory:"",
  displaysearch:"none",
  followerdisplay:"none",
  followingdisplay:"none"
         }
    }

    componentDidMount =()=>{
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
        const parsedQuery = queryString.parse(this.props.location.search)
       this.props.searcher(e.target.value)
           
       this.props.getfilteredSuggestions(e.target.value)
       if(e.target.value.length === 0){
       
        const url = window.location.href;
        const uri = url.split("?")[0]
     //   window.location.assign(uri)
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
  
    render() { 
        if(Cookies.get("cm_pp") ){
           console.log("he logged in")
            }else{
                return <Redirect to="/customer/login" />
            }
        let uri = window.location.href
        uri = uri.split("/")[5]
        console.log(this.props.orders, "submitted")
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
  return ( 
      <div className="container" style={{backgroundColor:`${this.props.userdetails.background ||"white"}`,color:`${this.props.userdetails.background === "black" ? "white" : this.props.userdetails.background === "white"?"black" : "black"}`,width:"100%",height:"100%",overflow:"hidden"}}>
<div className="row" style={{backgroundColor:`${this.props.userdetails.background === "black" ? "rgb(38,38,38)":"rgb(242,242,242)"}`}}>
  <div className="col-sm-12 col-md-7" style={{borderRight:"1px solid lightgrey"}}></div>
  <div className="col-sm-12 col-md-5" style={{padding:"25px"}}>

   <div className="row" style={{padding:"0px",backgroundColor:`${this.props.userdetails.background || "white"}`}}>
  <div className="col-12" style={{padding:"0px"}}>
  <div style={{padding:"10px",boxShadow:"1px 2px 5px 2px grey"}}>
  <div className="row">
      <div className="col-10">
        <small style={{fontSize:"16px"}}> Save User </small><br/>
        <small className="text-muted">Receive notifications from this user</small>
      </div>
      <div className="col-2">
      <small>
    <div style={{backgroundColor:"#006080",borderRadius:"39px",width:"40px",height:"20px"}}>
      <div style={{backgroundColor:"lightgrey",float:"right",borderRadius:"50%",padding:"10px",width:"15px",height:"22px"}}>
      </div>
    </div>
   </small>
      </div>
    </div>
  </div>  
  </div>
  </div> 
  <br/>
   <div className="row" style={{padding:"0px",color:`${this.props.userdetails.background === "black" ? "white" : this.props.userdetails.background === "white"?"black" : "black"}`,backgroundColor:`${this.props.userdetails.background || "white"}`}}>
  <div className="col-12" style={{padding:"0px"}}>
  <div style={{padding:"10px",boxShadow:"1px 2px 5px 2px grey"}}>
  <span>About {this.props.userdetails.fullName}*</span> 
  <hr/>
  <div className="row">
      <div className="col-12 text-muted">
      <p>
      <small className="text-danger">Address</small><br/>
   {this.props.userdetails.address}
   </p>
      </div>
    </div>
    <hr/>
    <div className="row">
      <div className="col-8">
      <small style={{color:"#006080"}}>phone number</small><br/>
        {this.props.userdetails.contact} <br/>
        <small className="text-danger">Mobile</small>
      </div>
      <div className="col-2">
       <center>
         <span style={{color:"#006080"}} className="fa fa-phone"></span>
       </center>
      </div>
      <div className="col-2">
      <center>
         <span style={{color:"#006080"}} className="fa fa-comment"></span>
       </center>
      </div>
      </div><hr/>
      <div className="row">
      <div className="col-8">
        <small style={{color:"#006080"}}>other contact</small> <br/>
        {this.props.userdetails.contactTwo} <br/>
        <small className="text-danger">Mobile</small>
      </div>
      <div className="col-2">
       <center>
         <span style={{color:"#006080"}} className="fa fa-phone"></span>
       </center>
      </div>
      <div className="col-2">
      <center>
         <span style={{color:"#006080"}} className="fa fa-comment"></span>
       </center>
      </div>
      </div>
  </div>  
  </div>
  </div> 
<br/>
  <div className="row" style={{padding:"0px"}}>
  <div className="col-12" style={{padding:"0px"}}>
  <div style={{color:`${this.props.userdetails.background === "black" ? "white" : this.props.userdetails.background === "white"?"black" : "black"}`,backgroundColor:`${this.props.userdetails.background || "white"}`,padding:"10px",boxShadow:"1px 2px 5px 2px grey"}}>
    <div className="row">
      <div className="col-1">
       <span className="text-danger fa fa-ban">
       </span>
      </div>
      <div className="col-10 text-danger">
      <p>
   Report this user
   </p>
      </div>
    </div>
  </div>  
  </div>
  </div> 
<br/><br/>

</div>
</div>

  </div>
  
         );
    }
}
const mapStateToProps=(store)=>{
    return{
        userdetails:store.userdetails,
        otheruserdetails:store.otheruserdetails,
        sellerproducts:store.sellerproducts,
        inputval:store.inputval,
        savedProducts:store.savedProducts,
        sellernumOfRows:store.sellernumOfRows,
        shoppingcarts:store.shoppingcart,
        submittedcartprice:store.submittedcartprice,
        submittedcarts:store.submittedcart,
        orders :store.orders,
        totalorderprice: store.totalorderprice,
        loading: store.loading
    }
     }
     const mapDispatchToProps=(dispatch)=>{
         return{
             viewuserdetails:(data)=>dispatch(viewuserdetails(data)),
             getfilteredSuggestions :(data)=>dispatch(getfilteredSuggestions(data)),
             fetchsavedItembyemail :(data)=>dispatch(fetchsavedItembyemail(data)),
             searcher :(data)=>dispatch(searcher(data)),
             viewuserdetailsbyuserId:(data)=>dispatch(viewuserdetailsbyuserId(data)),
             shoppingcart:(data)=>dispatch(shoppingcart(data)),
             submittedcart:(data)=>dispatch(submittedcart(data)),
             fetchorders:()=>dispatch(fetchorders()),
             fetchinvoice:(data)=>dispatch(fetchinvoice(data))
         }
     }
export default connect(mapStateToProps,mapDispatchToProps)(UserComponent);
