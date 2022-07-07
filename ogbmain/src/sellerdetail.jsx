import React, { Component } from 'react';
import {viewsellerdetails} from "./store"
import {connect} from "react-redux"
import "./main.css"
class SellerDetails extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            details:"",
            hoverapp:""
         }
    }
    componentWillMount =()=>{
        const userId = this.props.match.params.userId.split("%2C")[1]
        console.log("userId", userId)
        if(this.props.sellerdetails.length === 0){
            this.props.viewsellerdetails(userId)
        }
        this.setState({details:this.props.match.params.details || "none"})
    }
    hoverapp=()=>{
        this.setState({hoverapp:"hoveredapp"})
      }
      change=()=>{
          this.props.history.push(`${window.location.pathname}/#home`)
      }
    render() { 
        console.log("seller props",this.props)
        return ( 
            <div  style={{backgroundColor:"rgb(242, 242, 242)"}}>
        <div className="container-fluid">
            <div className="row">
            <div className="d-sm-block col-sm-12 d-lg-none">
                <span className="fa fa-bars"></span>
            </div>
            </div>
           <div className="row" style={{padding:"10px"}}>
         <div className="d-sm-12 col-md-5 col-lg-2"   style={{backgroundColor:"rgba(0, 119, 179,0.9)",color:"white"}}>        
            {this.props.sellerdetails.map((details)=>           
              <div style={{margin:"20px 5px 20px 5px"}} key={details.userId}>
            <img src={details.profileImage ? `https://res.cloudinary.com/fruget-com/image/upload/profile/${details.profileImage}`: require(`./images/maleprofile.png`)} className="rounded-circle" style={{float:"left",width:"9%"}} alt=""/>
            <p style={{textTransform:"uppercase",fontWeight:"bold",fontSize:"20px",paddingLeft:"10px"}}>{details.businessName}</p>
            <small>56389</small>
            <br/>
           <small onClick={this.change} style={{fontSize:"15px"}}><span className="fa fa-home"></span> Home</small><hr/>
           <small  style={{fontSize:"15px"}}><span className="fa fa-upload"></span>  Uploads (1-10)</small><hr/>
           <small  style={{fontSize:"15px"}}><span className="fa fa-upload"></span>  Uploads (10-20)</small><hr/>
           <small style={{fontSize:"15px"}}><span className="fa fa-shopping-cart"></span> Pending Cart</small> <hr/>
           <small style={{fontSize:"15px"}}><small style={{fontSize:"15px",position:"relative"}}>
           <span className="fa fa-shopping-cart" style={{fontSize:"20px"}}></span>
           <span className="fa fa-times" style={{fontSize:"25px",position:"absolute",right:"0px",top:"0px",color:"red"}}></span>
                </small> Cleared Cart</small> <hr/>
                <small  style={{fontSize:"15px"}}><span className="fa fa-recycle"></span>  Subscription</small><hr/>
           <small style={{fontSize:"15px"}}><span className="fa fa-cloud"></span>  Saved Items</small><hr/>
           <small style={{fontSize:"15px"}} ><span className="fa fa-users"></span>   Followers</small><hr/>
           <small  style={{fontSize:"15px"}}><span className="fa fa-info-circle"></span>  About</small><hr/>
            <small style={{fontSize:"15px"}}> <span className="fa fa-cog"></span> Settings</small>
          
            {this.props.match.params.details ?
           <div> <small>Item : {this.state.details}</small><br/></div>
            : null } 
            </div>
            )}          
</div>

           <div className="col-sm-12 col-md-7 col-lg-9" id="products">
             <div className="row">              
            {this.props.sellerproducts.map((products)=>
               <div className="col-6 col-md-6 col-lg-3" key={products.productId} style={{padding:"2px"}}>
              <div  onMouseOver={this.hoverapp} className={`${this.state.hoverapp} unhoveredapp`} style={{backgroundColor:"white",padding:"5px"}}>
            <center>
            <img className="mainImg img-responsive" src={`https://res.cloudinary.com/fruget-com/image/upload/${products.generalcategory}/${products.category}/${products.mainimg || 'emptyimg.jpg'}`} ></img>
            </center>
            <small style={{float:"left",fontSize:"11px",width:"100%",textTransform:"capitalize",display:`block`}}>{products.brand}</small>
           <div className="detaildiv" style={{lineHeight:"16px"}}> 
            <div  className="details"> 
   
     <small  style={{display:`block`,fontSize:"11px"}}>{products.details.length > 40 ? products.details.slice(0,40)+ "..." : products.details +"-"+ products.model +"-"+ products.color}</small>  
      

     <small  style={{display:`none`,fontSize:"11px"}}>{products.details.length > 50 ? products.details.slice(0,50)+ "..." : products.details +"-"+ products.model +"-"+ products.color}</small>  

        </div> 
        <small style={{fontWeight:"bold",fontSize:"14px"}}>{products.mainprice}</small> <br/>
       <div><small className="text-muted" style={{textDecoration:"line-through",fontSize:"12px"}}>{products.discount ? products.mainprice : null}</small><b className="badge" style={{fontSize:"12px",fontWeight:"bolder",color:"rgba(0, 119, 179)",backgroundColor:"rgba(0, 119, 179,0.1)",float:"right"}}>{products.discount ? `-${products.discount}%` : null}</b></div> 
     
       <div>
         <div className="outer">     
          <div className="inner" style={{width:`80%`}}>   

          </div> 
          </div>  <small style={{fontSize:"12px"}}>({products.numOfRating || 0}) </small></div> 
          <small className="text-muted" style={{letterSpacing:"-1px",textTransform:"capitalize",fontSize:"10px"}}><b style={{color:"orange"}}>{products.store}</b> @ <span className="fa fa-map-marker-alt"></span>{products.lga}</small>
         </div>
         <br/>
         <center >
        
        <button  type="button" ref={this.detailsRef} className="btn addtocartbtn" onClick={()=>this.addtocart(products.productId)}>
         ADD TO CART</button><br/>
        </center>
 <br/>
               </div>
               </div>
              )}
             </div>
           </div>

           <div className="d-sm-12 col-md-5 col-lg-9" id="about"  style={{backgroundColor:"rgba(0, 119, 179,0.9)",color:"white"}}>        
            {this.props.sellerdetails.map((details)=>           
              <div style={{margin:"20px 5px 20px 5px"}} key={details.userId}>
            {this.props.match.params.details ?
           <div> <small>Item : {this.state.details}</small><br/></div>
            : null }
            <div>
<small style={{textTransform:"uppercase",fontWeight:"bold"}} className="text-muted" className="text-muted">full name : </small> <small style={{textTransform:"capitalize",fontWeight:"bold"}} className="text-muted">{details.fullName}</small><br/>
<small style={{textTransform:"uppercase",fontWeight:"bold"}} className="text-muted">business name : </small> <small  className="text-muted" style={{textTransform:"capitalize",fontWeight:"bold"}}>{details.businessName}</small><br/>
<small style={{textTransform:"uppercase",fontWeight:"bold"}} className="text-muted">email : </small>  <small style={{fontWeight:"bold"}} className="text-muted">{details.email}</small><br/>
<small style={{textTransform:"uppercase",fontWeight:"bold"}} className="text-muted">gender : </small> <small  className="text-muted" style={{textTransform:"capitalize"}}> {details.gender}</small><br/>
<small style={{textTransform:"uppercase",fontWeight:"bold"}} className="text-muted">Address : </small><small  className="text-muted" style={{textTransform:"capitalize"}}>{details.address}</small><br/>
<small style={{textTransform:"uppercase",fontWeight:"bold"}} className="text-muted">state : </small> <small style={{textTransform:"capitalize"}}>{details.state}</small><br/>
<small style={{textTransform:"uppercase",fontWeight:"bold"}} className="text-muted">lga : </small> <small style={{textTransform:"capitalize"}}>{details.lga}</small><br/>
<small style={{textTransform:"uppercase",fontWeight:"bold"}} className="text-muted">Nearest bustop : </small><small className="text-muted" style={{textTransform:"capitalize"}}>{details.bustop}</small><br/>
<small style={{textTransform:"uppercase",fontWeight:"bold"}} className="text-muted"> no of Followers : </small> <small style={{textTransform:"capitalize",fontWeight:"bolder"}}>0</small><br/>
<small style={{textTransform:"uppercase",fontWeight:"bold"}} className="text-muted">no of verified sales : </small> <small style={{textTransform:"capitalize",fontWeight:"bolder"}}> 0</small><br/>
            <small style={{textTransform:"uppercase",fontWeight:"bold"}} className="text-muted">rating : <div className="outer"><div className="inner" style={{width:"80%"}}></div></div></small>
         <center   style={{display:"block",width:"50%"}}>
        <br/>
        <button  type="button" ref={this.detailsRef} className="btn sellerdetaddtocartbtn" onClick={()=>this.addtocart()}>
         ADD TO CART</button><br/>
        </center>   
            </div>  
            </div>
            )}          
           </div>
           </div>
        </div>
            </div>
         );
    }
}
 const mapStateToProps=(store)=>{
return{
    sellerdetails :store.sellerdetails,
    sellerproducts:store.sellerproducts
}
 }
 const mapDispatchToProps=(dispatch)=>{
     return{
         viewsellerdetails:(data)=>dispatch(viewsellerdetails(data))
     }
 }
export default connect(mapStateToProps,mapDispatchToProps)(SellerDetails);