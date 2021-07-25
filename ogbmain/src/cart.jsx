import React, { Component } from 'react';
import Cookies from "js-cookie"
import {confirmtoclearcart,setdisplayvendorrating,getseller,getdetails,clearcart,undisplaysavemodal,submittedcart,undisplaymodal,shoppingcart, increaseshoppingcart, decreaseshoppingcart,removeshoppingcart,saveItem,checksaveItem,submitshoppingcart} from "./store"
import { connect } from 'react-redux';
import ReactHtmlParser from "react-html-parser"
import {Link} from "react-router-dom"
import {formater} from "./formatTime"
                                         
class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          display:"none",
          displayconfirmmodal:"none",
          clearcartId:null,
          clearcartvendor:"",
          clearcartdetails:"",
          clearcartimage:"",
          clearcartgencategory:"",
          clearcartcategory:"",
          clearcartproductId:"",
          comment:"Excellent Product",
          chooserating:5,
          categoryloading: false,
          loader:false 
        }
    }
    componentDidMount=()=>{
      if(Cookies.get("cm_pp") && Cookies.get("cm_pp") !== undefined){
      this.props.checksaveItem()
      this.props.submittedcart()
      }
      window.addEventListener("click", this.handleundisplaycartmodal)
      window.addEventListener("click", this.handleundisplayconfirmcartmodal)
      setTimeout(()=> this.setState({categoryloading:true}), 6000)
      setTimeout(()=> this.setState({loader:true}), 7000)
    }
    componentDidUpdate(prevProps){
      if(prevProps.productDetails !== this.props.productDetails)
      {
        this.props.history.push(`/product/202029190128891%2C${this.props.currentProductIdcategory}%2C245719/${this.props.currentDetailcategory}`)
       }
   }
    increaseCart = details =>{
      this.props.increaseshoppingcart(details)
      this.props.submittedcart(this.props.match.params.email)
   }
   decreaseCart = details =>{
       this.props.decreaseshoppingcart(details)
       this.props.submittedcart(this.props.match.params.email)
   }
  deletecart=(details)=>{
      this.props.removeshoppingcart(details)
      this.props.submittedcart(this.props.match.params.email)  
  }
  checksaveItem=()=>{
    this.props.submittedcart(this.props.match.params.email) 
     this.props.checksaveItem()
  }
  undisplaysavemodal=() =>{
    this.props.undisplaysavemodal()
   // this.props.checksaveItem() 
  }
  saveItem =(datum)=>{
   let data={
     productId :datum.id,
     details: datum.detail
    }
   this.props.saveItem(data)  
//   this.props.submittedcart(this.props.match.params.email)
this.checksaveItem()
   }

   comfirmtoclearcart=(datum)=>{
  const data ={
    vendor:datum.seller,
    cartId:datum.id,details:datum.details,image:datum.image,gencat:datum.gencat,
    cat:datum.category,productId:datum.productId
  }
  this.props.confirmtoclearcart(data)
   }
  confirmclearcart=()=>{
    this.setState({displayconfirmmodal:"none",display:"block"})
      }
     change =(e) =>{
    this.setState({comment:e.target.value})
    if(this.state.comment.length >= 29){
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
        return    this.setState({comment: "Excellent Service",chooserating:e.target.value})
        }
     else if(e.target.value >3 && e.target.value <= 4){
           this.setState({comment: "Very Good Service",chooserating:e.target.value})
       }
      else if(e.target.value >2 && e.target.value <= 3){
           this.setState({comment: "Good Service",chooserating:e.target.value})
       }
       else if(e.target.value >1 && e.target.value <= 2){
           this.setState({comment: "Average Service",chooserating:e.target.value})
       }
      else if(e.target.value == 1){
           this.setState({comment: "Very Poor Not Satisfied",chooserating:e.target.value})
       }          
 }
 submitrating =(e)=>{
  e.preventDefault();
  this.setState({comment:"Thank you for reviewing"}) 
  const data ={
      cartId: this.state.clearcartId,
      rating: this.state.chooserating,
      comment: this.state.comment,
      seller:this.state.clearcartvendor,
      productId: this.state.clearcartproductId
  }
  console.log(data)
  this.props.clearcart(data)
}
undisplayclearcartmodal=()=>{
  this.setState({display:"none", comment:"Excellent Product",chooserating:5}) 
}
handleundisplaycartmodal=(e)=>{
  if(e.target == this.modaldiv){
    this.setState({display:"none", comment:"Excellent Product",chooserating:5})
}
}
undisplayconfirmclearcartmodal =()=>{
  this.setState({displayconfirmmodal:"none", comment:"Excellent Product",chooserating:5})
}
handleundisplayconfirmcartmodal=(e)=>{
  if(e.target == this.confirmmodaldiv){
    this.setState({displayconfirmmodal:"none", comment:"Excellent Product",chooserating:5})
}
}
openDetails=(datum)=>{
  const data = {
  productId :datum
  }
  this.props.getseller(data)
 this.props.getdetails(data)
// this.props.checksaveItem(data)
 // this.props.setcategoryLoadingtoTrue()
 //heart
} 
    render() { 
      console.log("clearcartMessage",this.props.categoryloading)
      if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        return (         
            <div style={{backgroundColor:"white" }} className="navbarcomponentlg">
               <div className="contain">


               <div className="mainmodaldiv" ref={(a) => this.confirmmodaldiv =a} id="modaldiv" style={{display:`none`,zIndex:"1",width:"100%",height:"100%",backgroundColor:"rgba(0,0,0,0.4)"}}>
         <div className="ratingmodaldiv"  style={{backgroundColor:"white",borderRadius:"10px"}}>
             <div className="inner-modal">
               <p style={{padding:"4px"}}>ACKNOWLEGDE!!!</p>
                     <center> 
                       <div> 
                       <img  src={`https://res.cloudinary.com/fruget-com/image/upload/${this.props.clearcartgencategory}/${this.props.clearcartcat}/${this.props.clearcartimage}`} style={{padding:"3px",height:"100px"}} className="img-responsive"></img><br/>
                         <b>Item : </b> {this.props.clearcartdetails} <br/>
                         <b>code :  </b>  cart{this.props.clearcartId} <br/>
                         <b>seller :  </b>  {this.props.clearcartvendor} <br/>
                         <b>Recieved : </b> <span className="fa fa-check-circle text-success"></span> <br/>
                     <span style={{color:"grey"}}>
                       <small>
                         By clicking on <b>Proceed</b> , you acknoledge that you have recieved this item and have confirmed 
                         that its working properly <br/>
                        <span className="text-danger"> Note! This action cannot be undone </span>
                       </small></span>
                     <div className="row" style={{padding:"5px"}}>  
                    <div className="col-6">  
<button className="btn btn-danger" onClick={this.undisplayconfirmclearcartmodal} style={{boxShadow:"2px 3px lightgrey",padding:"3px",color:"white",width:"100%"}} type="button">Cancel</button> 
</div>
<div className="col-6">
<button className="btn btn-success" onClick={this.confirmclearcart} style={{padding:"3px",color:"white",width:"100%",boxShadow:"2px 3px lightgrey"}} >Proceed</button>
</div>         
               </div>          
               </div>
             </center>
         </div>
     </div>
 </div>

 <div className="row" style={{backgroundColor:`${this.props.userdetails.background || "white"}`,zIndex:"2",position:"sticky",top:"35px"}}>               
 <div className="col-5 col-md-6" style={{fontSize:"20px",padding:"10px"}}>                     
                           <small className="ml-4"> Cart ({this.props.submittedcarts?this.props.submittedcarts.length : null})</small>
                               </div>                           
 <div className="col-4 col-m4-3" style={{padding:"10px",display:`${this.props.submittedcarts.length > 0 ? "block" :"none"}`}}>                
              
   </div>                                          
               <div style={{padding:"10px",display:`${this.props.submittedcarts.length > 0 ? "block" :"none"}`}}>
              <i class="fa fa-th" style={{color:`${this.state.view === "grid"  ? "rgb(0, 119, 179)" : this.props.userdetails.background === "black" ? "white" : "black"}`}} onClick={this.grid}></i>
              </div>
              <div style={{padding:"10px",display:`${this.props.submittedcarts.length > 0 ? "block" :"none"}`}}>
              <i class="fa fa-grip-vertical" style={{color:`${this.state.view === "list" ? "rgb(0, 119, 179)" : this.props.userdetails.background === "black" ? "white" : "black"}`}} onClick={this.list}></i>
              </div>
              <div style={{padding:"10px",fontSize:"20px"}}>
              <a href={`/checkout/cart`}><i class="fa fa-shopping-cart" style={{color:`orange`}} onClick={this.list}></i></a>
              </div>
              </div>
     <br/>
   <div className="mainmodaldiv" ref={(a) => this.cartmodaldiv =a} id="modaldiv" style={{display:`none`}}>
         <div className="modaldiv"  style={{backgroundColor:"white",borderRadius:"5px"}}>
           <p onClick={this.undisplaycartmodal}>x</p>
             <div className="inner-modal"> 
               <br/><br/>
               <center>
                 <span className="fa fa-smile-o" style={{fontSize:"50px",color:"pink"}}></span>
                 <h5 style={{padding:"10px"}}>{ReactHtmlParser(this.props.cartMessage)} </h5>
               </center>
               <center>                        
               <div className="row" style={{padding:"3px"}}>  
               <div className="col-6">  
<Link to={`/checkout/cart`}><button className="btn btn-success checkout" type="button">Continue shopping</button> </Link>
</div>
<div className="col-6">
<button className="btn btn-warning continueshopping" onClick={this.undisplaycartmodal}  type="submit">Go Home!</button>
</div>         
 </div> 
 </center> 
</div> 
  </div>
 </div> 

                {this.props.submittedcarts.length > 0 ?
                    <div className="row text-muted">
                           <div className="col-6">         
                           <small style={{textTransform:"uppercase",fontSize:"15px",fontWeight:"bold"}}>Products</small>                         
                           </div>
                           <div className="col-1">
                             <center>
                             <small style={{textTransform:"uppercase",fontSize:"15px",fontWeight:"bold"}}> quantity</small>
                             </center>
                           </div>
                           <div className="col-1">
                             <center>
                             <small style={{textTransform:"uppercase",fontSize:"15px",fontWeight:"bold"}}>Price</small>
                             </center>
                           </div>
                           <div className="col-2">
                           <center>
                           <small style={{textTransform:"uppercase",fontSize:"14px",fontWeight:"bold"}}>Sub Total</small>
                           </center>
                           </div>
                           <div className="col-2">
                                   <center>
                                   <small style={{textTransform:"uppercase",fontSize:"14px",fontWeight:"bold"}}>Details</small>
                                   </center>
                                   </div>
                              </div> : null }
                              <div style={{margin:"0px",padding:"0px"}}>
                              {this.props.submittedcarts.map(carts=>
                        <div  className="row mb-1" key={carts.id} style={{borderRadius:"3px",boxShadow:"1px 2px 5px 2px lightgrey",width:"100%",backgroundColor:"white",margin:"0px",padding:"0px"}} >
                            <div className="col-2" > 
                            <span className={this.props.userdetails.savedItems && JSON.parse(this.props.userdetails.savedItems).includes(parseInt(carts.productId)) ? "fa fa-heart" : "far fa-heart"} onClick={()=>this.saveItem({"detail":carts.details,"id":carts.productId})} style={{fontSize:"20px",position:"absolute",top:"5px",color:"orange"}}></span>
                            <img  src={`https://res.cloudinary.com/fruget-com/image/upload/${carts.generalcategory}/${carts.category}/${carts.mainimg}`} style={{width:"100%",height:"100px"}} className="img-responsive mb-1 topmarginerimage"></img>                           
                            </div>
                           <div className="col-4" style={{padding:"0px",margin:"0px"}}> 
                              <small onClick={()=>this.openDetails(carts.productId)} style={{cursor:"pointer",textTransform:"capitalize",fontSize:"14px",margin:"auto"}}>
                                {carts.details}
                                <br/>
                                <small className="text-muted">Color :</small> <small style={{textTransform:"capitalize",fontSize:"13px",fontWeight:"bold"}}>{carts.color}</small>
                                <small style={{float:"right"}}>   
                                        <div onClick={()=> this.deletecart(carts.details)} style={{cursor:"pointer",fontSize:"18px",color:"red"}}> <span className="fa fa-trash mr-1" ></span>  </div>
                                        </small><br/>
                               <small className="text-muted">Vendor :</small> <small style={{textTransform:"capitalize",fontSize:"13px",fontWeight:"bold"}}><a href={`tel:`}><span className="fa fa-phone mr-1" style={{color:"black"}}></span></a> {carts.seller}</small><br/>
                              <small >{formater(carts.time)
                              
                              //dateoforder.split("T")[0] <span style={{marginLeft:"5px"}}>{carts.dateoforder.split("T")[1]}</span>
                              } 
                             
                              </small> 
                              <small style={{fontSize:"9px",float:"right"}} className="mr-1">
                                         {carts.status === "pending" || carts.status === '"pending"' || carts.status === null? 
                                         <button onClick={()=>this.comfirmtoclearcart({"seller":carts.seller,"id":carts.id,details:carts.details,image:carts.mainimg,gencat:carts.generalcategory,category:carts.category,productId:carts.productId})} className="btn btn-sm " style={{padding:"3px",backgroundColor:"white",border:"1px solid green"}}>
                                        clear cart <span className="fa fa-check-circle" style={{cursor:"pointer",color:"green"}}></span> 
                                         </button>
                                         :
                                         <button onClick={()=>alert("cart has already been cleared")} className="btn btn-sm btn-success" style={{padding:"3px",color:"white"}}>
                                         {carts.status} <span className="fa fa-check-circle" style={{cursor:"pointer",color:"white"}}></span> 
                                          </button>
                                         }
                                     </small>
                               </small>
                               <div className="row" style={{display:"none",padding:"25px 0px 0px 0px"}}>
                                 <div className="d-none d-md-block col-md-4 text-danger " >
                                     <center>
                                         <small>   
                                        <div onClick={()=> this.deletecart(carts.details)} style={{cursor:"pointer",fontSize:"18px"}}> <span className="fa fa-trash" ></span>  </div>
                                        </small>
                                     </center>
                                 </div>
                                 <div className="d-none d-md-block col-3">
                                     <center>
                                      <small>
                                          {this.props.categoryloading ? 
                                            <small>
                                           <img src={require(`./images/35.gif`)} style={{width:"38%"}}/>
                                           </small>
                                           :
  <span className={this.props.userdetails.savedItems && JSON.parse(this.props.userdetails.savedItems).includes(parseInt(carts.productId)) ? "fa fa-heart" : "far fa-heart"} onClick={()=>this.saveItem({"detail":carts.details,"id":carts.productId})} style={{cursor:"pointer",fontSize:"18px",color:"orange"}}  onClick={()=>this.saveItem({"detail":carts.details,"id":carts.productId})}></span> 
                                          } 
                                         </small>
                                     </center>
                                 </div>
                                 <div className="d-none d-md-block col-5" title="Click here! if you have recieved and confirmed this item">
                                     <center>
                                       <small style={{fontSize:"9px"}}>
                                         {carts.status === "pending" || carts.status === '"pending"' || carts.status === null? 
                                         <button onClick={()=>this.comfirmtoclearcart({"seller":carts.seller,"id":carts.id,details:carts.details,image:carts.mainimg,gencat:carts.generalcategory,category:carts.category,productId:carts.productId})} className="btn btn-sm " style={{padding:"3px",backgroundColor:"white",border:"1px solid green"}}>
                                        clear cart <span className="fa fa-check-circle" style={{cursor:"pointer",color:"green"}}></span> 
                                         </button>
                                         :
                                         <button onClick={()=>alert("cart has already been cleared")} className="btn btn-sm btn-success" style={{padding:"3px",color:"white"}}>
                                         {carts.status} <span className="fa fa-check-circle" style={{cursor:"pointer",color:"white"}}></span> 
                                          </button>
                                         }
                                     </small>
                                    </center>
                                 </div>
                               </div>                   
                           </div>
                            
                           <div className="col-1" style={{borderLeft:"1px solid lightgrey",borderRight:"1px solid lightgrey"}}>
                          <center>
                         <p className="topmarginer"> {carts.quantity}</p>
                          </center>                
                           </div>
                           <div className="col-1" style={{borderRight:"1px solid lightgrey"}}>
                           <center>
                           <p className="topmarginer">{carts.mainprice}</p>
                           </center>                         
                           </div>
                           <div className="col-2">
                           <center className="topmarginer">
                               <b  style={{padding:"auto"}}>{carts.subtotal}</b>
                           </center>                  
                           </div>
                           <div className="d-none" style={{padding:"5px",borderLeft:"1px solid lightgrey"}}>
                                  <center>
                             <small style={{width:"100%",fontSize:"12px"}}>
                             <Link to={`/lg/invoice?cartId=${carts.id}`}>                 
                            <button className="btn btn-sm" style={{padding:"2px",backgroundColor:"orange",color:"white",width:"100%"}}>
                          view details
                           </button>
                           </Link>
                            </small>
                                  </center>                               
                                   </div>
                                   <div className="col-2 text-muted" style={{borderLeft:"1px solid lightgrey"}}>
                                  <center>
                             <small style={{width:"100%",fontSize:"12px"}}>
                            {carts.businessName}  <br/> 
                         <small><b>{carts.contact}</b> /{carts.contactTwo}</small>  <br/> 
                            {carts.address && carts.address.length > 50 ? carts.address.slice(0,40)+ "..." : carts.address} 
                           <Link to={`/lg/invoice?cartId=${carts.id}`}>
                          view carts details
                          </Link>
                             </small>
                                  </center>                               
                                   </div>
                          </div>
                        )} 
                     </div>
                     <br/>
                     {this.props.submittedcarts.length === 0  && !this.props.loading && this.state.loading ?
                    <div className="row" style={{height:"100%"}}>
                      <div className="col-12">
                       <center>
<small className="text-danger" style={{fontSize:"39px",fontWeight:"bolder"}}>o</small><small className="text-danger" style={{fontSize:"35px",fontWeight:"bolder"}}>o</small>
<small className="text-danger" style={{fontSize:"30px",fontWeight:"bolder"}}>p</small><small className="text-danger" style={{fontSize:"35px",fontWeight:"bolder"}}>s!</small><br/><br/>
                         <span className="fa fa-shopping-cart text-danger" style={{fontSize:"120px"}}></span>
                         <p className="text-danger" style={{fontStyle:"italics",fontWeight:"bold"}}>Sorry!. You have no pre-selected cart </p><br/>
                         <small className="text-muted">Click <button className="btn btn-warning" style={{padding:"3px",color:"white"}}>Continue</button> to return to Shopping Page</small>
                       </center>
                      </div>
                    </div> 
                    :null}
                     <br/>
   
                  {this.props.submittedcarts.length === 0 ?
                     <div className="row">                
                       <div className="col-8"></div>
                       <div className="col-12 col-md-4" style={{fontWeight:"bolder"}}>
                           <div style={{float:"right"}}>
                           <small className="text-muted">Subtotal</small> : {this.props.submittedcartprice} <br/>
                           <small style={{color:"lightgrey"}}>Delivery fee not included</small><hr/>
                           <small style={{fontSize:"20px"}}>Total Due</small> : <small style={{fontSize:"20px"}}>{this.props.submittedcartprice}</small>
                           </div>
                       </div>
                       
                       <div className="col-12">
                         <small className="text-muted">
                           Dear user, <br/>
                           Only after confirmation of goods or items should you Click on the black tick beside each products.
                           <br/>Note: Only a buyer can clear a cart.
                         </small>
                       </div>
                        </div>                 
                       : null }
                   
                    <div style={{display:`${this.props.submittedcarts.length >0 ? "block" : "none"}`,backgroundColor:"white",boxShadow:"1px 1px lightgrey"}}>
                  <div style={{padding:"20px 50px"}} className="row" >
                      <div className="col-6">
                          <center>
                         <button onClick={this.submitCart} className="btn btn-success" style={{boxShadow:"2px 2px lightgrey",width:"80%"}}>Go Back!</button>
                         </center>
                      </div>
                      <div className="col-6">
                      <center>
                         <button className="btn btn-warning" style={{boxShadow:"2px 2px lightgrey",width:"80%"}}>Clear All</button>
                         </center>
                      </div>
                  </div>
                  </div>
                    </div>
            </div>
         );
    }else{
      return (         
        <div style={{backgroundColor:"white"}}>
           <div className="container">


           <div className="mainmodaldiv" ref={(a) => this.confirmmodaldiv =a} id="modaldiv" style={{display:`none`,zIndex:"1",width:"100%",height:"100%",backgroundColor:"rgba(0,0,0,0.4)"}}>
     <div className="ratingmodaldiv"  style={{backgroundColor:"white",borderRadius:"10px"}}>
         <div className="inner-modal">
           <p style={{padding:"4px"}}>ACKNOWLEGDE!!!</p>
                 <center> 
                   <div> 
                   <img  src={`https://res.cloudinary.com/fruget-com/image/upload/${this.props.clearcartgencategory}/${this.props.clearcartcat}/${this.props.clearcartimage}`} style={{padding:"3px",height:"100px"}} className="img-responsive"></img><br/>
                     <b>Item : </b> {this.props.clearcartdetails} <br/>
                     <b>code :  </b>  cart{this.props.clearcartId} <br/>
                     <b>seller :  </b>  {this.props.clearcartvendor} <br/>
                     <b>Recieved : </b> <span className="fa fa-check-circle text-success"></span> <br/>
                 <span style={{color:"grey"}}>
                   <small>
                     By clicking on <b>Proceed</b> , you acknoledge that you have recieved this item and have confirmed 
                     that its working properly <br/>
                    <span className="text-danger"> Note! This action cannot be undone </span>
                   </small></span>
                 <div className="row" style={{padding:"5px"}}>  
                <div className="col-6">  
<button className="btn btn-danger" onClick={this.undisplayconfirmclearcartmodal} style={{boxShadow:"2px 3px lightgrey",padding:"3px",color:"white",width:"100%"}} type="button">Cancel</button> 
</div>
<div className="col-6">
<button className="btn btn-success" onClick={this.confirmclearcart} style={{padding:"3px",color:"white",width:"100%",boxShadow:"2px 3px lightgrey"}} >Proceed</button>
</div>         
           </div>          
           </div>
         </center>
     </div>
 </div>
</div>

<div className="row" style={{backgroundColor:`${this.props.userdetails.background || "white"}`,zIndex:"2",position:"sticky",top:"35px"}}>               
<div className="col-5 col-md-6" style={{fontSize:"20px",padding:"10px"}}>                     
                       <small > Cart ({this.props.submittedcarts?this.props.submittedcarts.length : null})</small>
                           </div>                           
<div className="col-4 col-m4-3" style={{padding:"10px",display:`${this.props.submittedcarts.length > 0 ? "block" :"none"}`}}>                
          
</div>                                          
           <div style={{padding:"10px",display:`${this.props.submittedcarts.length > 0 ? "block" :"none"}`}}>
          <i class="fa fa-th" style={{color:`${this.state.view === "grid"  ? "rgb(0, 119, 179)" : this.props.userdetails.background === "black" ? "white" : "black"}`}} onClick={this.grid}></i>
          </div>
          <div style={{padding:"10px",display:`${this.props.submittedcarts.length > 0 ? "block" :"none"}`}}>
          <i class="fa fa-grip-vertical" style={{color:`${this.state.view === "list" ? "rgb(0, 119, 179)" : this.props.userdetails.background === "black" ? "white" : "black"}`}} onClick={this.list}></i>
          </div>
          <div style={{padding:"10px",fontSize:"20px"}}>
          <a href={`/checkout/cart`}><i class="fa fa-shopping-cart" style={{color:`orange`}} onClick={this.list}></i></a>
          </div>
          </div>
 <br/>
<div className="mainmodaldiv" ref={(a) => this.cartmodaldiv =a} id="modaldiv" style={{display:`none`}}>
     <div className="modaldiv"  style={{backgroundColor:"white",borderRadius:"5px"}}>
       <p onClick={this.undisplaycartmodal}>x</p>
         <div className="inner-modal"> 
           <br/><br/>
           <center>
             <span className="fa fa-smile-o" style={{fontSize:"50px",color:"pink"}}></span>
             <h5 style={{padding:"10px"}}>{ReactHtmlParser(this.props.cartMessage)} </h5>
           </center>
           <center>                        
           <div className="row" style={{padding:"3px"}}>  
           <div className="col-6">  
<Link to={`/checkout/cart`}><button className="btn btn-success checkout" type="button">Continue shopping</button> </Link>
</div>
<div className="col-6">
<button className="btn btn-warning continueshopping" onClick={this.undisplaycartmodal}  type="submit">Go Home!</button>
</div>         
</div> 
</center> 
</div> 
</div>
</div> 

            {this.props.submittedcarts.length > 0 ?
                <div className="row text-muted dodo">
                       <div className="col-6">         
                       <small style={{textTransform:"uppercase",fontSize:"15px",fontWeight:"bold"}}>Products</small>                         
                       </div>
                       <div className="col-1">
                         <center>
                         <small style={{textTransform:"uppercase",fontSize:"15px",fontWeight:"bold"}}> quantity</small>
                         </center>
                       </div>
                       <div className="col-1">
                         <center>
                         <small style={{textTransform:"uppercase",fontSize:"15px",fontWeight:"bold"}}>Price</small>
                         </center>
                       </div>
                       <div className="col-2">
                       <center>
                       <small style={{textTransform:"uppercase",fontSize:"14px",fontWeight:"bold"}}>Sub Total</small>
                       </center>
                       </div>
                       <div className="col-2">
                               <center>
                               <small style={{textTransform:"uppercase",fontSize:"14px",fontWeight:"bold"}}>Details</small>
                               </center>
                               </div>
                          </div> : null }
                          <div style={{margin:"0px",padding:"0px"}}>
                          {this.props.submittedcarts.map(carts=>
                    <div  className="row mb-1" key={carts.id} style={{borderRadius:"10px",boxShadow:"1px 2px 5px 2px lightgrey",width:"100%",backgroundColor:"white",margin:"0px",padding:"0px"}} >
                        <div className="col-4 col-md-2" > 
                        <span className={this.props.userdetails.savedItems && JSON.parse(this.props.userdetails.savedItems).includes(parseInt(carts.productId)) ? "fa fa-heart" : "far fa-heart"} onClick={()=>this.saveItem({"detail":carts.details,"id":carts.productId})} style={{fontSize:"20px",position:"absolute",top:"5px",color:"orange"}}></span>
                        <img  src={`https://res.cloudinary.com/fruget-com/image/upload/${carts.generalcategory}/${carts.category}/${carts.mainimg}`} style={{width:"100%",height:"100px"}} className="img-responsive mb-1 topmarginerimage"></img>                           
                        </div>
                       <div className="col-7 col-md-4" style={{padding:"0px",margin:"0px"}}> 
                          <small onClick={()=>this.openDetails(carts.productId)} style={{cursor:"pointer",textTransform:"capitalize",fontSize:"14px",margin:"auto"}}>
                            {carts.details}
                            <br/>
                            <small className="text-muted">Color :</small> <small style={{textTransform:"capitalize",fontSize:"13px",fontWeight:"bold"}}>{carts.color}</small>
                            <small style={{float:"right"}}>   
                                    <div onClick={()=> this.deletecart(carts.details)} style={{cursor:"pointer",fontSize:"18px",color:"red"}}> <span className="fa fa-trash mr-1" ></span>  </div>
                                    </small><br/>
                           <small className="text-muted">Vendor :</small> <small style={{textTransform:"capitalize",fontSize:"13px",fontWeight:"bold"}}><a href={`tel:`}><span className="fa fa-phone mr-1" style={{color:"black"}}></span></a> {carts.seller}</small><br/>
                          <small >{formater(carts.time)
                          
                          //dateoforder.split("T")[0] <span style={{marginLeft:"5px"}}>{carts.dateoforder.split("T")[1]}</span>
                          } 
                         
                          </small> 
                          <small style={{fontSize:"9px",float:"right"}} className="mr-1">
                                     {carts.status === "pending" || carts.status === '"pending"' || carts.status === null? 
                                     <button onClick={()=>this.comfirmtoclearcart({"seller":carts.seller,"id":carts.id,details:carts.details,image:carts.mainimg,gencat:carts.generalcategory,category:carts.category,productId:carts.productId})} className="btn btn-sm " style={{padding:"3px",backgroundColor:"white",border:"1px solid green"}}>
                                    clear cart <span className="fa fa-check-circle" style={{cursor:"pointer",color:"green"}}></span> 
                                     </button>
                                     :
                                     <button onClick={()=>alert("cart has already been cleared")} className="btn btn-sm btn-success" style={{padding:"3px",color:"white"}}>
                                     {carts.status} <span className="fa fa-check-circle" style={{cursor:"pointer",color:"white"}}></span> 
                                      </button>
                                     }
                                 </small>
                           </small>
                           <div className="row" style={{display:"none",padding:"25px 0px 0px 0px"}}>
                             <div className="d-none d-md-block col-md-4 text-danger " >
                                 <center>
                                     <small>   
                                    <div onClick={()=> this.deletecart(carts.details)} style={{cursor:"pointer",fontSize:"18px"}}> <span className="fa fa-trash" ></span>  </div>
                                    </small>
                                 </center>
                             </div>
                             <div className="d-none d-md-block col-3">
                                 <center>
                                  <small>
                                      {this.props.categoryloading ? 
                                        <small>
                                       <img src={require(`./images/35.gif`)} style={{width:"38%"}}/>
                                       </small>
                                       :
<span className={this.props.userdetails.savedItems && JSON.parse(this.props.userdetails.savedItems).includes(parseInt(carts.productId)) ? "fa fa-heart" : "far fa-heart"} onClick={()=>this.saveItem({"detail":carts.details,"id":carts.productId})} style={{cursor:"pointer",fontSize:"18px",color:"orange"}}  onClick={()=>this.saveItem({"detail":carts.details,"id":carts.productId})}></span> 
                                      } 
                                     </small>
                                 </center>
                             </div>
                             <div className="d-none d-md-block col-5" title="Click here! if you have recieved and confirmed this item">
                                 <center>
                                   <small style={{fontSize:"9px"}}>
                                     {carts.status === "pending" || carts.status === '"pending"' || carts.status === null? 
                                     <button onClick={()=>this.comfirmtoclearcart({"seller":carts.seller,"id":carts.id,details:carts.details,image:carts.mainimg,gencat:carts.generalcategory,category:carts.category,productId:carts.productId})} className="btn btn-sm " style={{padding:"3px",backgroundColor:"white",border:"1px solid green"}}>
                                    clear cart <span className="fa fa-check-circle" style={{cursor:"pointer",color:"green"}}></span> 
                                     </button>
                                     :
                                     <button onClick={()=>alert("cart has already been cleared")} className="btn btn-sm btn-success" style={{padding:"3px",color:"white"}}>
                                     {carts.status} <span className="fa fa-check-circle" style={{cursor:"pointer",color:"white"}}></span> 
                                      </button>
                                     }
                                 </small>
                                </center>
                             </div>
                           </div>                   
                       </div>
                       <div className="col-1 d-md-none">
                         <span className="fa fa-ellipsis-v">
                         </span>
                       </div>
                       <div className="d-none d-md-block col-md-1" style={{borderLeft:"1px solid lightgrey",borderRight:"1px solid lightgrey"}}>
                      <center>
                     <p className="topmarginer"> {carts.quantity}</p>
                      </center>                
                       </div>
                       <div className="col-1 d-md-none" style={{borderLeft:"1px solid lightgrey",borderRight:"1px solid lightgrey"}}>
                      <center>
               <p className="topmarginer"> {carts.quantity}</p>
                      </center>                
                       </div>
                       <div className="col-4 col-md-1" style={{borderRight:"1px solid lightgrey"}}>
                       <center>
                       <p className="topmarginer">{carts.mainprice}</p>
                       </center>                         
                       </div>
                       <div className="col-5 col-md-2">
                       <center className="topmarginer">
                           <b  style={{padding:"auto"}}>{carts.subtotal}</b>
                       </center>                  
                       </div>
                       <div className="col-sm-3 col-md-2 d-lg-none" style={{padding:"5px",borderLeft:"1px solid lightgrey"}}>
                              <center>
                         <small style={{width:"100%",fontSize:"12px"}}>
                         <Link to={`/lg/invoice?cartId=${carts.id}`}>                 
                        <button className="btn btn-sm" style={{padding:"2px",backgroundColor:"orange",color:"white",width:"100%"}}>
                      view details
                       </button>
                       </Link>
                        </small>
                              </center>                               
                               </div>
                               <div className="d-none d-lg-block col-lg-2 text-muted" style={{borderLeft:"1px solid lightgrey"}}>
                              <center>
                         <small style={{width:"100%",fontSize:"12px"}}>
                        {carts.businessName}  <br/> 
                     <small><b>{carts.contact}</b> /{carts.contactTwo}</small>  <br/> 
                        {carts.address && carts.address.length > 50 ? carts.address.slice(0,40)+ "..." : carts.address} 
                       <Link to={`/lg/invoice?cartId=${carts.id}`}>
                      view carts details
                      </Link>
                         </small>
                              </center>                               
                               </div>
                      </div>
                    )} 
                 </div>
                 <br/>
                 {this.props.submittedcarts.length === 0  && !this.props.loading && this.state.loading ?
                <div className="row" style={{height:"100%"}}>
                  <div className="col-12">
                   <center>
<small className="text-danger" style={{fontSize:"39px",fontWeight:"bolder"}}>o</small><small className="text-danger" style={{fontSize:"35px",fontWeight:"bolder"}}>o</small>
<small className="text-danger" style={{fontSize:"30px",fontWeight:"bolder"}}>p</small><small className="text-danger" style={{fontSize:"35px",fontWeight:"bolder"}}>s!</small><br/><br/>
                     <span className="fa fa-shopping-cart text-danger" style={{fontSize:"120px"}}></span>
                     <p className="text-danger" style={{fontStyle:"italics",fontWeight:"bold"}}>Sorry!. You have no pre-selected cart </p><br/>
                     <small className="text-muted">Click <button className="btn btn-warning" style={{padding:"3px",color:"white"}}>Continue</button> to return to Shopping Page</small>
                   </center>
                  </div>
                </div> 
                :null}
                 <br/>

              {this.props.submittedcarts.length === 0 ?
                 <div className="row">                
                   <div className="col-8"></div>
                   <div className="col-12 col-md-4" style={{fontWeight:"bolder"}}>
                       <div style={{float:"right"}}>
                       <small className="text-muted">Subtotal</small> : {this.props.submittedcartprice} <br/>
                       <small style={{color:"lightgrey"}}>Delivery fee not included</small><hr/>
                       <small style={{fontSize:"20px"}}>Total Due</small> : <small style={{fontSize:"20px"}}>{this.props.submittedcartprice}</small>
                       </div>
                   </div>
                   
                   <div className="col-12">
                     <small className="text-muted">
                       Dear user, <br/>
                       Only after confirmation of goods or items should you Click on the black tick beside each products.
                       <br/>Note: Only a buyer can clear a cart.
                     </small>
                   </div>
                    </div>                 
                   : null }
               
                <div style={{display:`${this.props.submittedcarts.length >0 ? "block" : "none"}`,backgroundColor:"white",boxShadow:"1px 1px lightgrey"}}>
              <div style={{padding:"20px 50px"}} className="row" >
                  <div className="col-6">
                      <center>
                     <button onClick={this.submitCart} className="btn btn-success" style={{boxShadow:"2px 2px lightgrey",width:"80%"}}>Go Back!</button>
                     </center>
                  </div>
                  <div className="col-6">
                  <center>
                     <button className="btn btn-warning" style={{boxShadow:"2px 2px lightgrey",width:"80%"}}>Clear All</button>
                     </center>
                  </div>
              </div>
              </div>
                </div>
        </div>
     );
    }
  }
}
const mapStateToProps=(store)=>{
    return{
       categoryloading:store.categoryloading,
        userdetails:store.userdetails,
        sellernumOfRows:store.sellernumOfRows,
        shoppingcarts:store.shoppingcart,
        submittedcartprice:store.submittedcartprice,
        submittedcarts:store.submittedcart,
        orders :store.orders,
        totalorderprice: store.totalorderprice,
        saveResponse: store.saveResponse,
        displaysavemodal: store.displaysavemodal,
        issave:store.issave,
        clearcartMessage:store.clearcartMessage,
        productDetails:store.productDetails,
        currentProductIdcategory:store.currentProductIdcategory,
        currentDetailcategory:store.currentDetailcategory,
        clearcartMessage:store.clearcartMessage,
        clearcartdisplay:store.clearcartdisplay,
       clearcartvendor:store.clearcartvendor,
       clearcartId:store.clearcartId,
       clearcartdetails:store.clearcartdetails,
       clearcartimage:store.clearcartimage,
       clearcartgencat:store.clearcartgencat,clearcartcat:store.clearcartcat,clearcartproductId:store.clearcartproductId
    }
     }
     const mapDispatchToProps =(dispatch)=>{
      return{
       shoppingcart:()=>dispatch(shoppingcart()),
       increaseshoppingcart:(data)=>dispatch(increaseshoppingcart(data)),
       decreaseshoppingcart:(data)=>dispatch(decreaseshoppingcart(data)),
       removeshoppingcart:(data)=>dispatch(removeshoppingcart(data)),
       saveItem:(data)=>dispatch(saveItem(data)),
       checksaveItem:()=>dispatch(checksaveItem()),
       submitshoppingcart:()=>dispatch(submitshoppingcart()),
      undisplaycartmodal:()=>dispatch(undisplaymodal()),
      submittedcart : (data)=>dispatch(submittedcart(data)),
      undisplaysavemodal: (data)=>dispatch(undisplaysavemodal(data)),
      clearcart:(data)=>dispatch(clearcart(data)),
      getdetails:(data)=>dispatch(getdetails(data)),
      getseller:(data)=>dispatch(getseller(data)),
      confirmtoclearcart:(data)=>dispatch(confirmtoclearcart(data))
      }
     }
     
export default connect(mapStateToProps,mapDispatchToProps)(Cart)