import React, { Component } from 'react';
import {connect} from "react-redux" 
import {unloading,showcolormodal,unshowcolormodal,showmodalsidenavbar,changecolor,fetchinvoice,fetchorders,viewuserdetailsbyuserId,viewuserdetails,searcher,getfilteredSuggestions,fetchsavedItembyemail,shoppingcart,submittedcart} from "./store"
import Cookies from 'js-cookie';
import {Link,Redirect} from "react-router-dom"
import Suggestions from "./suggestions" 
import Profilesidenavbar from "./profilesidenavbar"
import {Dropdown} from "react-bootstrap"
import cookies from "js-cookie"
import queryString from "query-string"


class ProfileDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        let uri = window.location.href
        uri = uri.split("/")[3]
        if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
            return ( 
              <div style={{backgroundColor:`${this.props.userdetails.background}`}}>
            <div className="container" style={{width:"100%",height:"100%",overflow:"hidden"}}>
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
            <div className="col-12 col-md-4 profImgdiv mt-4" style={{padding:"0px"}}>
            <div style={{position:"relative"}}>
              <img src={this.props.userdetails.profileImage ? `https://res.cloudinary.com/fruget-com/image/upload/profile/${this.props.userdetails.profileImage}`: require(`./images/maleprofile.png`)}  style={{padding:"0px",width:"100%",height:"300px"}}  alt=""/>
              </div>
                 <center>
               <div style={{position:"absolute",zIndex:"2",bottom:"-50px",borderTop:"1px solid lightgrey",borderRadius:"50%",width:"50%",backgroundColor:`${this.props.userdetails.background==="white"?"black":"white"}`}}>
          
                       <center>
          <img src={this.props.userdetails.profileImage ? `https://res.cloudinary.com/fruget-com/image/upload/profile/${this.props.userdetails.profileImage}`: require(`./images/maleprofile.png`)}  style={{padding:"30px",borderRadius:"50%",width:"100%",height:"200px"}}  alt=""/>
                       </center>
              </div>  
              </center>
            </div>
            <div className="col-12 col-md-8" style={{marginTop:"30px",borderTop:"20px solid black",borderBottom:"none",borderTopRightRadius:"40%",borderTopLeftRadius:"20%",color:`${this.props.userdetails.background === "black" ? "white" :"black"}`}} >
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
            <div className="d-none d-md-block col-md-6"></div>
            <div className="col-11 col-md-6" style={{padding:"5px"}}>
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
          
           <div className="row" >
            <div className="col-12" style={{ borderTopRightRadius:"20px",borderTopLeftRadius:"20px",borderTop:"1px solid lightgrey"}}>
                <div className="row">
                    <div className="col-sm-12 col-md-4" style={{padding:"5px"}}>
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
             <Link style={{color:`${uri === "home" ? "orange" : "grey"}`}}  to={`/${this.props.match.params.email}/lg/home`}>
              <span className="fa fa-home" style={{fontSize:"15px"}}></span>
              <small className="" style={{fontSize:"13px"}}> Home</small>
              </Link>
             </center>
             </div>
             <div className="d-none d-md-block col-md-1" style={{padding:"5px"}}>
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
             <div className="d-none d-md-block col-md-1" style={{borderTop:`${uri === "saved_items" ? "1px solid grey" : ""}`,padding:"5px"}}>
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
             <div className="d-none d-md-block col-md-1" style={{padding:"5px"}}>
             <center>
             <Link style={{color:`${uri === "orders" ? "orange" : "grey"}`}} to={`/${Math.floor(Math.random()*1000000000)}/lg/orders`}>
             <small style={{position:"relative"}}><span className="fa fa-store " style={{fontSize:"15px"}}></span>
            <small style={{position:"absolute",right:"-8px"}} className="badge badge-danger">
                  {this.props.orders.length}
              </small>
              </small>
            <small className=""  style={{fontSize:"13px"}}> orders</small>
            </Link>
             </center>
             </div>
             <div className="d-none d-md-block col-md-1" style={{padding:"5px"}}>
             <center>
             <small style={{position:"relative"}}><span className="fa fa-bell " style={{fontSize:"15px"}}></span>
            <small style={{position:"absolute",right:"-8px"}} className="badge badge-danger">
                  {this.props.userdetails.savedItems && this.props.userdetails.savedItems !== null ? JSON.parse(this.props.userdetails.savedItems).length : 0}
              </small>
              </small>
            <small className=""  style={{fontSize:"13px"}}> Notification</small>
             </center>
             </div>
             <div className="d-none d-md-block col-md-1"></div>
             <div className="d-none d-md-block col-md-1">
                           <center>
                      <div style={{display:"flex",flexWrap:"nowrap"}}>
                        <div>
                        <Dropdown>
            <Dropdown.Toggle id="filterdiv-dropdown" style={{backgroundColor:"white",color:"grey"}}>
             <small className="text-muted"> 
             <span className="fa fa-cog" style={{fontSize:"18px",ackgroundColor:"white",color:"grey"}}></span>
             </small>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={this.changebgcolor}><small>change background</small></Dropdown.Item>
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
          
             <div className="didi  filterdiv" style={{backgroundColor:"white",display:"none"}}>
                         <div className="row">
                           <div className="col-2 fiterdiv-col"  style={{borderTop:`${uri === "home" ? "1px solid orange" : ""}`,borderLeft:"1px solid lightgrey",borderRight:"1px solid lightgrey"}}>
                             <center>
                             <Link to={`/${Math.floor(Math.random()*1000000000)}/lg/home`}>
                        <button type="button" className="btn btn-link filter-btn"  style={{border:"none",color:`${uri === "home" ? "orange" : "grey"}`}}>
                        <i class="fa fa-home" style={{fontSize:"18px"}}></i>
                            </button>
                            </Link>
                             </center>
                           </div>
                           <div className="col-2 fiterdiv-col"  style={{borderTop:`${uri === "cart" ? "1px solid orange" : ""}`,borderLeft:"1px solid lightgrey",borderRight:"1px solid lightgrey"}}>
                             <center>
                        <Link to={`/${Math.floor(Math.random()*1000000000)}/lg/cart`}>
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
                           <div className="col-2 fiterdiv-col"  style={{borderTop:`${uri === "saved_items" ? "1px solid orange" : ""}`,borderLeft:"1px solid lightgrey",borderRight:"1px solid lightgrey"}}>
                             <center>
                             <Link to={`/${Math.floor(Math.random()*1000000000)}/lg/saved_items`}>
                        <button type="button" className="btn btn-link filter-btn" style={{color:`${uri === "saved_items" ? "orange" : "grey"}`}}>
                        <i class="fa fa-cloud" style={{fontSize:"18px",position:"relative"}}>
                      <small style={{position:"absolute",right:"-15px",top:"-10px"}} className="badge badge-danger">
                      {this.props.userdetails.savedItems && this.props.userdetails.savedItems !== null ? JSON.parse(this.props.userdetails.savedItems).length : 0}
                     </small>
                        </i>
                            </button>
                            </Link>
                             </center>
                           </div>
                           <div className="col-2 fiterdiv-col"  style={{borderTop:`${uri === "notifications" ? "1px solid orange" : ""}`,borderLeft:"1px solid lightgrey",borderRight:"1px solid lightgrey"}}>
                             <center>
                             <Link to={`/${this.props.match.params.email}/lg/notifications`}>
                        <button type="button" className="btn btn-link filter-btn" style={{color:`${uri === "notifications" ? "orange" : "grey"}`}}>
                        <i class="fa fa-bell" style={{fontSize:"20px"}}></i>
                            </button>
                            </Link>
                             </center>
                           </div>
                           {parseInt(this.state.userId) === this.props.userdetails.userId ? 
                           <div className="col-2 fiterdiv-col"  style={{borderTop:`${uri === "orders" ? "1px solid orange" : ""}`,borderLeft:"1px solid lightgrey",borderRight:"1px solid lightgrey"}}>
                             <center>
                             <Link to={`/${this.props.match.params.email}/lg/orders`}>
                        <button type="button" className="btn btn-link filter-btn " style={{color:`${uri === "orders" ? "orange" : "grey"}`}}>
                        <i class="fa fa-store" style={{fontSize:"18px",position:"relative"}}>
                        <small style={{position:"absolute",right:"-15px",top:"-10px"}} className="badge badge-danger">
                      {this.props.orders ? this.props.orders.length: 0}
                     </small>
                        </i>
                            </button>
                            </Link>
                             </center>
                           </div>
                           : null}
                          
                           <div className="col-2">
                           <center>
                      <div style={{display:"flex",flexWrap:"nowrap"}}>
                        <div>
                        <Dropdown>
            <Dropdown.Toggle id="filterdiv-dropdown" style={{backgroundColor:"white",color:"grey"}}>
             <small className="text-muted"> 
             <span className="fa fa-cog" style={{fontSize:"18px",ackgroundColor:"white",color:"grey"}}></span>
             </small>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={this.changebgcolor}><small>change background</small></Dropdown.Item>
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
            </div>
            )
    }
}
}
const mapStateToProps=(store)=>{
    return{
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
        isLoggedin:store.isLoggedin
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
             unloading:()=>dispatch(unloading())
         }
     }
export default connect(mapStateToProps,mapDispatchToProps)(ProfileDetails);