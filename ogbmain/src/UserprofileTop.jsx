import React, { Component } from 'react';
import {connect} from "react-redux" 
import {viewsellerdetails,viewmyprofiledetails,searcher,getfilteredSuggestions,fetchsavedItembyemail} from "./store"
import Cookies from 'js-cookie';
import {Link,Redirect} from "react-router-dom"
import Suggestions from "./suggestions" 
import {Dropdown} from "react-bootstrap"
import cookies from "js-cookie"
import queryString from "query-string"
import Followers from "./followers"
import Following from "./following"

class UserProfileTop extends Component {
    constructor(props) {
        super(props);
        this.state = { 
  currentCategory:"",
  displaysearch:"none",
  followerdisplay:"none",
  followingdisplay:"none"
         }
    }

    componentDidMount =()=>{
        console.log("Cookies.get(cm_ppp)",Cookies.get("cm_pp"))    
        let mainToken
        if(Cookies.get("cm_pp") && this.props.myprofiledetails.length === 0){
            const myToken = Cookies.get("cm_pp")
            let myMainTokenlen = parseInt(myToken.split("%")[0])
             let userIdlen = parseInt(myToken.split("%")[1])
             let userIdpos = parseInt(myToken.split("%")[2].charAt(0)+myToken.split("%")[2].charAt(1))
             let userId = myToken.slice(userIdpos, userIdpos+userIdlen)
              mainToken = myToken.slice(userIdpos+userIdlen, myMainTokenlen)
             let userId2 = mainToken.slice(userIdpos, userIdpos+userIdlen)
            this.props.viewmyprofiledetails(userId)
   //          this.props.fetchsavedItembyemail(userId)
            }      
    
            let uri = window.location.href
            uri = uri.split("/")[6]
            this.setState({currentCategory:uri})   
            if(this.props.match.params.select === "follower"){
                
            }
    }
        
    navigateFollowers=()=>{
        if(window.innerWidth > 600){
            this.setState({followerdisplay:"block"})
        }else{
          window.location.assign(`/profile/${this.props.match.params.userId}/${this.props.match.params.details}/followers`)
        }
    }
    navigateFollowing=()=>{
        if(window.innerWidth > 600){
            this.setState({followingdisplay:"block"})
        }else{
          window.location.assign(`/profile/${this.props.match.params.userId}/${this.props.match.params.details}/following`)
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
        uri = uri.split("/")[6]
        console.log(this.props.myprofiledetails)
  return ( 
      <div>
<div style={{display:`${this.state.followerdisplay}`,position:"absolute",padding:"0px",top:"100%",left:"35%",border:"1px solid lightgrey",zIndex:"2",backgroundColor:"white",width:"25%",height:`100%`}}>
<div style={{width:"100%",padding:"0px"}}>
    <Followers/>       
</div>
</div>
<div style={{display:`${this.state.followingdisplay}`,position:"absolute",padding:"0px",top:"100%",left:"35%",border:"1px solid lightgrey",zIndex:"2",backgroundColor:"white",width:"25%",height:`100%`}}>
<div style={{width:"100%",padding:"0px"}}>
    <Following />       
</div>
</div>
  <div className="container">
 <div className="row">         
  <div className="col-12 col-md-4 profImgdiv">
       <center>
     <div style={{border:"1px solid lightgrey",borderRadius:"50%",width:"60%"}}>
         <span style={{position:"absolute",top:"15px",left:"50px"}} className="fa fa-bars "></span>
             <center>
<img src={this.props.myprofiledetails.profileImage ? `https://res.cloudinary.com/fruget-com/image/upload/profile/${this.props.myprofiledetails.profileImage}`: require(`./images/maleprofile.png`)}  style={{padding:"30px",borderRadius:"50%",width:"100%",height:"200px"}}  alt=""/>
             </center>
    </div>
    </center>
  </div>
  <div className="col-12 col-md-8" style={{backgroundColor:"white"}}>
      <small className="text-muted" style={{fontSize:"25px"}}>{this.props.myprofiledetails.fullName}</small><br/>
      <small className="text-muted">email :{this.props.myprofiledetails.email}</small> <small style={{margin:"5px 0px",float:"right",fontSize:"14px"}}><button  style={{border:"1px solid lightgrey",padding:"3px"}} className="text-muted btn"><span className="fa fa-edit" ></span> Edit Profile</button></small><br/> 
           <p>
              emeechez entreprise is a wholesaler of refrigerator and other electronics. emeechez entreprise is a wholesaler of refrigerator and other electronics....          
              </p>
      <p className="text-muted" >{"@"+this.props.myprofiledetails.businessName}</p>
  </div>

  </div>
 <div className="row">

  <div className="d-none d-md-block col-md-6"></div>
  <div className="col-12 col-md-6" style={{padding:"5px"}}>
      <div className="row" style={{backgroundColor:"white"}}>
      <div className="col-4 text-muted">
      <Link className="text-muted" to={`/profile/${this.props.match.params.userId}/${this.props.match.params.details}/Uploads`}>
            <center>
  <b>{this.props.myprofilenumOfRows.length===0 ? 0 : this.props.myprofilenumOfRows}</b>  Uploads
            </center>
            </Link>
          </div>
          <div className="d-none d-md-block col-md-4 text-muted" onClick={this.navigateFollowers}>
            <center>
           <b>{this.props.myprofiledetails.followers && this.props.myprofiledetails.followers.length>0 ?JSON.parse(this.props.myprofiledetails.followers).length : 0}</b>  Followers
            </center>
          </div>
          <div className="col-4 d-md-none text-muted" onClick={this.navigateFollowers}>
            <center>
           <b>{this.props.myprofiledetails.followers && this.props.myprofiledetails.followers.length>0 ?JSON.parse(this.props.myprofiledetails.followers).length : 0}</b>  Followers
            </center>
          </div>
          <div className="col-4 text-muted" onClick={this.navigateFollowing}>
            <center>
            <b>  {this.props.myprofiledetails.following && this.props.myprofiledetails.following.length>0 ?JSON.parse(this.props.myprofiledetails.following).length : 0}</b>  Following
            </center>
          </div>
      </div>
  </div>
  </div>

  

 <div className="row">
  <div className="col-12" style={{ borderTopRightRadius:"20px",borderTopLeftRadius:"20px",borderTop:"1px solid lightgrey"}}>
      <div className="row">
          <div className="d-none d-md-block col-md-4" style={{padding:"5px"}}>
              <center>
          <div className="input-group mb-3 input-group-sm" >
                    <div className="input-group-prepend" >
                    <span className="input-group-text text-muted" onClick={()=>this.state.displaysearch === "none"?this.setState({displaysearch:"block"}):this.setState({displaysearch:"none"})} style={{border:"none",backgroundColor:"transparent"}}><span className="fa fa-search"></span></span>
                     </div>
                     <input style={{border:"none",display:`${this.state.displaysearch}`}} type="text" className="form-control"  value={this.state.inputval} name="search" onChange={this.change2} placeholder="Search products , brand and categories here..."/>                      
                     </div>
  
                     <div style={{display:`${this.props.inputval.length > 0 ? "block" : "none"}`,zIndex:"3",width:"100%",height:"100%",position:"absolute"}} > 
             <Suggestions></Suggestions>       
                  </div>
                  </center>    
          </div>
   <div className="d-none d-md-block col-md-1" style={{borderTop:`${uri === "home" ? "1px solid grey" : ""}`,padding:"5px"}}>
   <center>
   <Link style={{color:`${uri === "home" ? "orange" : "grey"}`}}  to={`/profile/${this.props.match.params.userId}/${this.props.match.params.details}/home`}>
    <span className="fa fa-home" style={{fontSize:"15px"}}></span>
    <small className=""  style={{fontSize:"13px"}}> Home</small>
    </Link>
   </center>
   </div>
   <div className="d-none d-md-block col-md-1" style={{padding:"5px"}}>
   <center>
   <Link to={`/profile/${this.props.match.params.userId}/${this.props.match.params.details}/saved_items`}>
   <small style={{position:"relative"}}><span className="fa fa-shopping-cart text-muted" style={{fontSize:"15px"}}></span>
    <small style={{position:"absolute",right:"-8px"}} className="badge badge-danger">0</small>
    </small> 
    <small className="text-muted"  style={{fontSize:"13px"}}> Cart</small>
    </Link>
   </center>
   </div>
   <div className="d-none d-md-block col-md-1" style={{borderTop:`${uri === "saved_items" ? "1px solid grey" : ""}`,padding:"5px"}}>
   <center>
   <Link style={{color:`${uri === "saved_items" ? "orange" : "grey"}`}} to={`/profile/${this.props.match.params.userId}/${this.props.match.params.details}/saved_items`}>
   <small style={{position:"relative"}}><span className="fa fa-cloud " style={{fontSize:"15px"}}></span>
    <small style={{position:"absolute",right:"-5px"}} className="badge badge-danger">
        {this.props.myprofiledetails.savedItems && this.props.myprofiledetails.savedItems !== null ? JSON.parse(this.props.myprofiledetails.savedItems).length : 0}
    </small>
    </small> 
    <small className=""  style={{fontSize:"13px"}}> Saved</small>
    </Link>
   </center>
   </div>
   <div className="d-none d-md-block col-md-1" style={{padding:"5px"}}>
   <center>
  <span className="fa fa-info-circle" style={{fontSize:"15px"}}></span>
  <small className=""  style={{fontSize:"13px"}}> About</small>
   </center>
   </div>
   <div className="d-none d-md-block col-md-3"></div>
   <div className="d-none d-md-block col-md-1" >
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
    }
}
const mapStateToProps=(store)=>{
    return{
      myprofiledetails:store.myprofiledetails,
        myprofileproducts:store.myprofileproducts,
        inputval:store.inputval,
        savedProducts:store.savedProducts,
        myprofilenumOfRows:store.myprofilenumOfRows
    }
     }
     const mapDispatchToProps=(dispatch)=>{
         return{
             viewsellerdetails:(data)=>dispatch(viewsellerdetails(data)),
             getfilteredSuggestions :(data)=>dispatch(getfilteredSuggestions(data)),
             fetchsavedItembyemail :(data)=>dispatch(fetchsavedItembyemail(data)),
             searcher :(data)=>dispatch(searcher(data)),
             viewmyprofiledetails:(data)=>dispatch(viewmyprofiledetails(data))
         }
     }
export default connect(mapStateToProps,mapDispatchToProps)(UserProfileTop);
