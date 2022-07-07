import React, { Component } from 'react';
import {connect} from "react-redux" 
import {unloading,viewuserdetails,searcher,getfilteredSuggestions,fetchsavedItembyemail,shoppingcart,submittedcart} from "./store"
import Cookies from 'js-cookie';
import {Link,Redirect} from "react-router-dom"
import Suggestions from "./suggestions" 
import {Dropdown} from "react-bootstrap"
import cookies from "js-cookie"
import queryString from "query-string"
import Followers from "./followers"
import Following from "./following"
import {formater} from "./formatTime"

class ProfileTop extends Component {
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
            this.props.viewuserdetails(this.props.match.params.email)
            this.setState({userId})
            }      
    
            let uri = window.location.href
            uri = uri.split("/")[6]
            this.setState({currentCategory:uri})   
            if(this.props.match.params.select === "follower"){
                
            }
    }
    componentDidUpdate=(prevProps)=>{
      if(prevProps.otheruserdetails !== this.props.otheruserdetails){
        setTimeout(()=> this.props.unloading(),2000) 
      }
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
      console.log("comments of this user", this.props.usercomments)
  return ( 
      <div className="container" style={{backgroundColor:`${this.props.userdetails.background ||"white"}`,color:`${this.props.userdetails.background === "black" ? "white" : this.props.userdetails.background === "white"?"black" : "black"}`,width:"100%",height:"100%",overflow:"hidden"}}>
  <div>
  <div className="row" >         
  <div className="col-12 col-md-4 profImgdiv">
    <div style={{position:"relative"}}>
    <img src={this.props.otheruserdetails.profileImage ? `https://res.cloudinary.com/fruget-com/image/upload/profile/${this.props.otheruserdetails.profileImage}`: require(`./images/maleprofile.png`)}  style={{padding:"10px",width:"100%",height:"300px"}}  alt=""/>
    </div>
       <center>
     <div style={{position:"absolute",zIndex:"2",bottom:"-50px",borderTop:"1px solid lightgrey",borderRadius:"50%",width:"50%",backgroundColor:`${this.props.userdetails.background==="white"?"black":"white"}`}}>
             <center>
<img src={this.props.otheruserdetails.profileImage ? `https://res.cloudinary.com/fruget-com/image/upload/profile/${this.props.otheruserdetails.profileImage}`: require(`./images/maleprofile.png`)}  style={{padding:"30px",borderRadius:"50%",width:"100%",height:"200px"}}  alt=""/>
             </center>
    </div>  
    </center>
  </div>
  <div className="col-12 col-md-8" style={{marginTop:"30px",borderTop:"20px solid black",borderBottom:"none",borderTopRightRadius:"40%",borderTopLeftRadius:"20%",color:`${this.props.userdetails.background === "black" ? "white" :"black"}`}} >
     <br/>
      <small style={{fontSize:"25px"}}>{this.props.otheruserdetails.fullName}</small><br/>
      <small className="text-muted" >{"@"+this.props.otheruserdetails.businessName}</small>
      <small className="ml-3" style={{fontsSize:"11px"}}>
                     <div className="outer">
                         <div className="inner" style={{width:`${this.props.otheruserdetails.userrating*20}%`}}>

                         </div>
                     </div>
                 </small> ({this.props.otheruserdetails.numofrating})<br/>    
           <p>
              emeechez entreprise is a wholesaler of refrigerator and other electronics. emeechez entreprise is a wholesaler of refrigerator and other electronics....          
              </p> 
              <small title={`click to mail ${this.props.otheruserdetails.email}}`}  style={{fontSize:"15px",padding:"4px"}}> <span className="fa fa-envelope 2x mr-2"></span> <a href={`mailto:${this.props.otheruserdetails.email}`} style={{textDecoration:"none",color:`${this.props.userdetails.background==="black"?"white":"black"}`}}> @<span>{this.props.otheruserdetails.email}</span></a></small><br/>
      <small title={`click to dail ${this.props.otheruserdetails.contact}}`}  style={{fontSize:"15px",padding:"4px"}}> <span className="fa fa-phone 2x mr-2"></span> <a href={`tel:${this.props.otheruserdetails.email}`} style={{textDecoration:"none",color:`${this.props.userdetails.background==="black"?"white":"black"}`}}> <span>{this.props.otheruserdetails.contact}</span></a></small><br/>
<small  style={{fontSize:"15px",padding:"4px"}}> <span className="fa fa-home mr-2"></span> <span style={{textTransform:"capitalize"}}>{this.props.otheruserdetails.businessName} store is</span> located at <span>{this.props.otheruserdetails.state+" , "+this.props.otheruserdetails.lga}</span></small><br/>
<small  style={{fontSize:"15px",padding:"4px"}}> <span className="fab fa-twitter 2x mr-2"></span> <span>AdeIsCrown</span></small><br/>
<small  style={{fontSize:"15px",padding:"4px"}}> <span className="fab fa-facebook-square 2x mr-2"></span><span> Eze Ogbonnaya</span></small><br/>
<small  style={{fontSize:"15px",padding:"4px"}}> <span className="fa fa-link mr-2"></span><span ><a style={{color:"green"}} href={`/fruget/myproducts/${this.props.otheruserdetails.businessName}`}> {` http://fruget/myproducts/${this.props.otheruserdetails.businessName}`}</a></span> <span title="click to share link" className="fa fa-reply ml-2"></span></small><br/>
<small> <span className="fa fa-check-circle" style={{color:"orange"}}></span> Verified Transactions : 0</small> <br/>
<small ><span className="fa fa-map-marker-alt" style={{fontWeight:"bold"}}></span> {this.props.otheruserdetails.lga},{this.props.otheruserdetails.state}</small><br/>
  </div>

  </div>
 <div className="row" >
  <div className="d-none d-md-block col-md-6"></div>
  <div className="col-11 col-md-6" style={{padding:"5px"}}>
      <div className="row"> 
      <div className="col-4 text-muted">
      <Link style={{color:`${uri === "uploads" ? "orange" : "grey"}`}} to={`/profile/${this.props.match.params.email}/uploads`}>
            <center>
  <b>{this.props.otherusernumOfRows===0 ? 0 : this.props.otherusernumOfRows}</b>  Uploads
            </center>
            </Link>
          </div>
          <div className="d-none d-md-block col-md-4 text-muted" onClick={this.navigateFollowers}>
            <center style={{color:`${uri === "followers" ? "orange" : "grey"}`}}>
           <b>{this.props.otheruserdetails.followers && this.props.otheruserdetails.followers.length>0 ?JSON.parse(this.props.otheruserdetails.followers).length : 0}</b>  Followers
            </center>
          </div>
          <div className="col-4 d-md-none text-muted" onClick={this.navigateFollowers}>
            <center style={{color:`${uri === "followers" ? "orange" : "grey"}`}}>
           <b>{this.props.otheruserdetails.followers && this.props.otheruserdetails.followers.length>0 ?JSON.parse(this.props.otheruserdetails.followers).length : 0}</b>  Followers
            </center>
          </div>
          <div className="col-4 text-muted" onClick={this.navigateFollowing}>
            <center style={{color:`${uri === "following" ? "orange" : "grey"}`}}>
            <b>  {this.props.otheruserdetails.following && this.props.otheruserdetails.following.length>0 ?JSON.parse(this.props.otheruserdetails.following).length : 0}</b>  Following
            </center>
          </div>
      </div>
  </div>
  </div>
<br/>
 <div className="row" >
  <div className="col-12" style={{ borderTopRightRadius:"20px",borderTopLeftRadius:"20px",borderTop:"1px solid lightgrey"}}>
      <div className="row">
          <div className="d-none d-md-block col-md-4" style={{padding:"5px"}}>
                 
          </div>
   <div className="col-3  col-md-1" style={{padding:"5px"}}>
   <center>
   <Link to={`/profile/${this.props.match.params.email}/rating`}>
   <small style={{position:"relative"}}>
     <span className="far fa-comment text-muted" style={{fontSize:"20px"}}>
     </span>
    <small style={{position:"absolute",right:"-4px",fontSize:"14px"}} >
        <span className="fa fa-star" style={{color:"orange"}}></span>
    </small>
    </small> 
    <small className="d-none d-md-block"  style={{fontSize:"13px",color:"black"}}> Reviews</small>
    </Link>
   </center>
   </div>
   <div className="d-none d-md-block col-md-2"></div>
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
<br/>
<div className="row">
  <div className="col-6"></div>
  <div className="col-12 col-md-6">
  <div className="row" id="comments" style={{margin:"2px"}}>
            <div className="col-12" style={{border: "1px solid lightgrey", borderRadius:"5px",backgroundColor:`${this.props.userdetails.background}`,color:`${this.props.userdetails.background === "black" ? "white":"black"}`,padding:"10px"}}>
<small style={{fontSize:"15px"}}>Customer Reviews</small> 
<button style={{float:"right",backgroundColor:"orange",color:"white"}} 
className="btn active" 
onClick={this.displaymodal} >
  <a href="#modaldiv"  style={{color:"white"}}>
    Rate
    </a>
  </button>
             <hr/>
            {this.props.usercomments.length > 0 ?
             <div className="row">
             <div className="col-12 col-md-3">
                 <small style={{padding:"0px",margin:"0px"}}>RATING ({this.props.usercomments.length || 0} ) </small><br/>
            <small style={{fontSize:"20px",fontWeight:"bold"}}>{this.props.otheruserdetails.userrating}</small><br/>
          <div className="outer" style={{fontSize:"10px",padding:"0px"}}>
          <div className="inner" style={{width:`${this.props.otheruserdetails.userrating*20}%`}}>
             </div>
            </div>
             </div>
             <div className="col-12 col-md-9">
             <small style={{padding:"0px",margin:"0px"}}>REVIEWS/ COMMENTS ({this.props.usercomments.length || 0} ) </small>
             <hr/>
             {this.props.usercomments.map((comments)=> 
               <div style={{lineHeight:"16px",fontSize:"12px"}}>       
                      <div className="row">
                       <div className="col-2" style={{padding:"0px",margin:"0px"}}>
                       <img src={comments.userImage ? `https://res.cloudinary.com/fruget-com/image/upload/profile/${comments.userImage}`: require(`./images/maleprofile.png`)} style={{width:"100%",padding:"0px 8px",margin:"3px 0px",height:"70px"}} alt="" />
                       </div>
                       <div className="col-10" style={{padding:"0px",margin:"0px"}}>
                       <small style={{padding:"5px 0px",fontWeight:"bold",color:"brown",fontSize:"12px"}}> {comments.userName} </small>
                       <small className="ml-2 text-muted">{formater(comments.time)}</small>
                       <small style={{float:"right",marginRight:"8px"}}><span className="fa fa-check-circle " style={{color:"orange",fontSize:"15px"}}></span><span className="dodo"> Verified Purchase</span></small>
                                        
                <div style={{padding:"2px"}}>
                    <small style={{padding:"3px 0px"}}>
                     <small style={{fontSize:"13px"}}> {comments.comment}</small></small>
                     <small style={{float:"right",clear:"left",padding:"8px"}}>
                        <div className="outer" style={{fontSize:"10px"}}>
                <div className="inner" style={{fontSize:"8px",width:`${(comments.rating)*20 || 0}%`}}>
                </div>
                </div></small><br/>
                     </div>
               <small  style={{fontSize:"13px"}} onClick={()=>alert("only the admin can reply comments")}>Reply.</small>
               <small className="likebutton ml-2" style={{color:`${comments.likes && JSON.parse(comments.likes).includes(parseInt(this.props.userdetails.userId)) ? "orange" : "grey"}`}} >
                 <span className="fa fa-thumbs-up" onClick={(e)=>this.likecomment(e,{commentId:comments.ratingId,productId:comments.productId})} ></span>
                  <span className="ml-1">
                 {comments.likes && JSON.parse(comments.likes) ? JSON.parse(comments.likes).length : 0}
                  </span>
              </small>
               <small className="likebutton" style={{marginLeft:"40px",color:`${comments.dislikes && JSON.parse(comments.dislikes).includes(parseInt(this.props.userdetails.userId)) ? "orange" : "grey"}`}} >
                 <span className="fa fa-thumbs-down" onClick={(e)=>this.dislikecomment(e,{commentId:comments.ratingId,productId:comments.productId})}></span>
                  <span className="ml-1">
                  {comments.dislikes ? JSON.parse(comments.dislikes).length : 0}
                  </span>
               </small>
               </div>
               <br/>
               </div>
                   <br/>
               </div>            
             )}
             </div>
             </div>
    : <center> 
      <span style={{fontSize:"40px"}} className="text-muted far fa-comments"></span>
      <p>No Reviews Yet</p>
      </center>}
            </div>
        </div>  
  </div>
</div>
   <div className=" didi  filterdiv" style={{backgroundColor:"white",display:"none"}}>
               <div className="row">
                 <div className="col-2 fiterdiv-col"  style={{borderTop:`${uri === "home" ? "1px solid orange" : ""}`,borderLeft:"1px solid lightgrey",borderRight:"1px solid lightgrey"}}>
                   <center>
                   <Link to={`/profile/${this.props.match.params.email}/home`}>
              <button type="button" className="btn btn-link filter-btn"  style={{border:"none",color:`${uri === "home" ? "orange" : "grey"}`}}>
              <i class="fa fa-home" style={{fontSize:"18px"}}></i>
                  </button>
                  </Link>
                   </center>
                 </div>
                 <div className="col-2 fiterdiv-col"  style={{borderTop:`${uri === "cart" ? "1px solid orange" : ""}`,borderLeft:"1px solid lightgrey",borderRight:"1px solid lightgrey"}}>
                   <center>
              <Link to={`/profile/${this.props.match.params.email}/cart`}>
              <button type="button" className="btn btn-link filter-btn" style={{color:`${uri === "cart" ? "orange" : "grey"}`}}>
              <i class="fa fa-shopping-cart" style={{fontSize:"18px",position:"relative"}}>
              <small style={{position:"absolute",right:"-15px",top:"-10px"}} className="badge badge-success">
           {this.props.submittedcarts.length}
          </small>
              </i>
                  </button>
                  </Link>
                   </center>
                 </div>
                 <div className="col-2">
                 <center>
            <div style={{display:"flex",flexWrap:"nowrap"}}>
              <div>
              <Dropdown>
  <Dropdown.Toggle id="filterdiv-dropdown" style={{backgroundColor:"white",color:"grey"}}>
   <small className="text-muted"> 
   <span className="fa fa-cog" style={{fontSize:"18px",backgroundColor:"white",color:"grey"}}></span>
   </small>
  </Dropdown.Toggle>
  <Dropdown.Menu>
    <Dropdown.Item onClick={() => this.sort("low-high")}><small>Price : Lowest - Highest</small></Dropdown.Item>
    <Dropdown.Item onClick={() => this.sort("high-low")}><small>Price : Highest - Lowest</small></Dropdown.Item>
    <Dropdown.Item onClick={() => this.sort("popularity")}><small>Popularity</small></Dropdown.Item>
    <Dropdown.Item onClick={() => this.sort("warranty")}><small>Warranty</small></Dropdown.Item>
    <Dropdown.Item onClick={() => this.sort("cust-rating")}><small>Most Searched</small></Dropdown.Item>
    <Dropdown.Item onClick={() => this.sort("cust-rating")}><small>Most Viewed</small></Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
              </div>
            </div>
            </center>               
                 </div>
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
        loading: store.loading,
        otherusernumOfRows:store.otherusernumOfRows,
        usercomments:store.usercomments
    }
     }
     const mapDispatchToProps=(dispatch)=>{
         return{
             viewuserdetails:(data)=>dispatch(viewuserdetails(data)),
             getfilteredSuggestions :(data)=>dispatch(getfilteredSuggestions(data)),
             fetchsavedItembyemail :(data)=>dispatch(fetchsavedItembyemail(data)),
             searcher :(data)=>dispatch(searcher(data)),
             shoppingcart:(data)=>dispatch(shoppingcart(data)),
             unloading:()=>dispatch(unloading())
         }
     }
export default connect(mapStateToProps,mapDispatchToProps)(ProfileTop);
