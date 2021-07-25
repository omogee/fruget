import React, { Component } from 'react';
import axios from 'axios';
<<<<<<< HEAD
import Cookies from "js-cookie"
import {setredirect,undisplaysavemodal,undisplaymodal,shoppingcart, increaseshoppingcart, decreaseshoppingcart,removeshoppingcart,saveItem,checksaveItem,submitshoppingcart} from "./store"
import { connect } from 'react-redux';
import ReactHtmlParser from "react-html-parser"
import {Link,Redirect} from "react-router-dom"
import {formater} from "./formatTime"
=======
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac

class CheckOut extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            cart:[],
            pricevalue:"",
<<<<<<< HEAD
            totalprice:"",
            loading: false,
            loader:false 
         }
    }
    componentDidMount=()=>{
      window.addEventListener("click",this.undisplaysavemodal)
        this.getcart(); 
    }
      getcart = async ()=>{
  //      let user = this.props.match.params.userId
   //     user = user.split(",")[1]
   let mainToken
   if(Cookies.get("cm_pp") && Cookies.get("cm_pp") !== undefined){
       const myToken = Cookies.get("cm_pp")
       let myMainTokenlen = parseInt(myToken.split("%")[0])
        let userIdlen = parseInt(myToken.split("%")[1])
        let userIdpos = parseInt(myToken.split("%")[2].charAt(0)+myToken.split("%")[2].charAt(1))
        let userId = myToken.slice(userIdpos, userIdpos+userIdlen)
         mainToken = myToken.slice(userIdpos+userIdlen, myMainTokenlen)
        let userId2 = mainToken.slice(userIdpos, userIdpos+userIdlen)
        await this.props.shoppingcart()
        await  this.props.checksaveItem()
        setTimeout(()=> this.setState({loading:true}), 4000)
        setTimeout(()=> this.setState({loader:true}), 6000)
       } else{
         this.props.setredirect()
       }         
    }
    increaseCart = id =>{
      this.setState({loader:false})
       this.props.increaseshoppingcart(id)
     //  this.getcart()
    }
    decreaseCart = id =>{
      this.setState({loader:false})
        this.props.decreaseshoppingcart(id)
      //  this.getcart()
    }
   deletecart=(id)=>{
    this.setState({loader:false})
       this.props.removeshoppingcart(id)
       this.getcart()
   }
   saveItem =(datum)=>{
    let data={
      productId :datum.id,
      details: datum.detail
     }
    this.props.saveItem(data)  
    this.getcart()
    }
    submitCart=()=>{
      this.props.submitshoppingcart()
      this.getcart()
    }
    undisplaycartmodal =() =>{
      this.props.undisplaycartmodal()
     }
     handlesavemodalclick =(e) =>{
      if(e.target == this.savemodaldiv){
        const data ={
          productId: this.state.productId
        }
      this.props.undisplaysavemodal()
  //    this.props.checksaveItem(data) 
      }
     }        
    undisplaysavemodal=() =>{
      const data ={
        productId: this.state.productId
      }
      this.props.undisplaysavemodal()
    //  this.props.checksaveItem(data) 
    }
    render() { 
      if(this.props.redirect){
        return <Redirect to={{ pathname: '/customer/login',state: { from: this.props.location }}} />
    }
       /**
        * {this.props.loading ?     
          <div style={{position:"absolute", top:"0%",left:"0%",zIndex:"3",backgroundColor:"lightgrey",width:"100%",height:`100%`,opacity:"0.2"}}>
            <center style={{position:"absolute", top:"50%",left:"50%"}}>
            <img src={require(`./images/35.gif`)} />
            <p>Note : Carts can only be cleared by buyers</p>
            </center>
          </div>
        : null}
        */
       let loading;
       const ranoo =Math.floor(Math.random()*100)
       console.log("ranoo", this.props.loading)
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
        // <img src={`https://res.cloudinary.com/fruget-com/image/upload/${carts.generalcategory}/${carts.category}/${Object.values(JSON.parse(carts.img1))[0]}`} style={{width:"100%",padding:"5px"}} alt=""/>
        if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
          return (         
            <div className="navbarcomponentlg" style={{backgroundColor:"white",minHeight:`${this.props.cart.length ===0 ? "100%" : ""}`}}>
               <div className="container">
               <div className="row" style={{backgroundColor:`${this.props.userdetails.background || "white"}`,zIndex:"2",position:"sticky",top:"0px"}}>               
 <div className="col-5 col-md-6" style={{fontSize:"20px",padding:"10px"}}>                     
                           <small>Shopping Cart ({this.props.cart?this.props.cart.length : null})</small>
                               </div>                           
        <div className="col-4 col-m4-3" style={{padding:"10px",display:`${this.props.cart.length > 0 ? "block" :"none"}`}}>                
              
                               </div>                                          
               <div style={{padding:"10px",display:`${this.props.cart.length > 0 ? "block" :"none"}`}}>
              <i class="fa fa-th" style={{color:`${this.state.view === "grid"  ? "rgb(0, 119, 179)" : this.props.userdetails.background === "black" ? "white" : "black"}`}} onClick={this.grid}></i>
              </div>
              <div style={{padding:"10px",display:`${this.props.cart.length > 0 ? "block" :"none"}`}}>
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
 
 <div className="savemodaldiv" ref={(a) => this.savemodaldiv =a} id="savemodaldiv" style={{display:`${this.props.displaysavemodal}`,zIndex:"1",width:"100%",height:"100%",backgroundColor:"rgba(0,0,0,0.4)"}}>
 <div className="savediv"  style={{backgroundColor:"white"}}>
     <center>
            <h5 style={{padding:"50px"}}>{ReactHtmlParser(this.props.saveResponse)}</h5>
            
            <div className="row" style={{padding:"10px"}}>  
                    <div className="col-6">  
<button className="btn btn-danger" onClick={this.undisplaysavemodal} style={{boxShadow:"2px 3px lightgrey",padding:"8px",color:"white",width:"100%"}} type="button">Cancel</button> 
</div>
<div className="col-6">
<button className="btn btn-success"  style={{padding:"8px",color:"white",width:"100%",boxShadow:"2px 3px lightgrey"}} >Saved Items</button>
</div>         
               </div>
     </center>
     </div>
 </div>
      
                {this.props.cart.length > 0 ?
                    <div className="row text-muted ">
=======
            totalprice:""
         }
    }
    componentDidMount=()=>{
       this.getcart();
    }
    getcart =()=>{
        let user = this.props.match.params.userId
        user = user.split(",")[1]
        axios.get(`http://fruget.herokuapp.com/customer/checkout?user=${user}`)
        .then(res => this.setState({cart: res.data.files,totalprice:res.data.totalprice},()=>{
            console.log(res.data.totalprice)
        }))
        .catch(err => console.warn(err))
    }
    increaseCart = details =>{
        axios.get(`http://fruget.herokuapp.com/customer/increasecart?details=${details}`)
        .then(res => this.getcart())
        .catch(err => console.warn(err))
    }
    decreaseCart = details =>{
        axios.get(`http://fruget.herokuapp.com/customer/decreasecart?details=${details}`)
        .then(res => this.getcart())
        .catch(err => console.warn(err))
    }
   deletecart=(details)=>{
    axios.get(`http://fruget.herokuapp.com/customer/deletecart?details=${details}`)
        .then(res => this.getcart())
        .catch(err => console.warn(err))
   }
    render() { 
        return ( 
            <div style={{backgroundColor:"rgb(242, 242, 242)"}}>
               <div className="container">
                <p style={{fontSize:"20px"}}>Cart ({this.state.cart.length})</p>
                    <div className="row text-muted dodo">
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
                           <div className="col-6">
                         
                           <small style={{textTransform:"uppercase",fontSize:"15px",fontWeight:"bold"}}>Products</small>
                          
                           </div>
                           <div className="col-2">
                             <center>
                             <small style={{textTransform:"uppercase",fontSize:"15px",fontWeight:"bold"}}> quantity</small>
                             </center>
                           </div>
                           <div className="col-2">
                             <center>
                             <small style={{textTransform:"uppercase",fontSize:"15px",fontWeight:"bold"}}>Price</small>
                             </center>
                           </div>
                           <div className="col-2">
                           <center>
                           <small style={{textTransform:"uppercase",fontSize:"14px",fontWeight:"bold"}}>Sub Total</small>
                           </center>
                           </div>
<<<<<<< HEAD
                              </div> : null }
                              <div style={{margin:"0px",padding:"0px"}}>
                              {this.props.cart.length > 0 ? this.props.cart.map(carts=>
                        <div  className="row mb-1" key={carts.id} style={{borderRadius:"3px",boxShadow:"1px 2px 5px 2px lightgrey",width:"100%",backgroundColor:"white",margin:"0px",padding:"0px"}} >
                            <div className="col-2" >
                            <span className={this.props.userdetails.savedItems && JSON.parse(this.props.userdetails.savedItems).includes(parseInt(carts.productId)) ? "fa fa-heart" : "far fa-heart"} onClick={()=>this.saveItem({"detail":carts.details,"id":carts.productId})} style={{fontSize:"20px",position:"absolute",top:"5px",color:"orange"}}></span>
                            <img  src={`https://res.cloudinary.com/fruget-com/image/upload/${carts.generalcategory}/${carts.category}/${carts.mainimg}`} style={{width:"100%",height:"100px"}} className="img-responsive  mb-1 topmarginerimage"></img>                           
                            </div>
                           <div className="col-4" style={{padding:"0px",margin:"0px"}}>
                                 <Link to={`/product/202029190128891%2C${carts.productId}%2C245719/${carts.details}`}>
                                    <small  style={{textTransform:"capitalize",fontSize:"13px",margin:"auto",color:"black"}}>
                              {carts.details}</small></Link><br/>
                               <small className="text-muted">Color :</small> <small style={{textTransform:"capitalize",fontSize:"13px",fontWeight:"bold"}}>{carts.color}</small>
                               <span className="ml-1 mr-1 mb-5" style={{borderRadius:"60%",fontSize:"8px",lineHeight:"0.2px",margin:"0px",padding:"0px 5px",border:"1px solid lightgrey",backgroundColor:`${carts.color}`,color:`${carts.color}`}}><small>.</small></span> ,
                    <small className="ml-2">Size : </small>  {carts.inches && carts.inches !== "null" && carts.inches.length > 0 ? <small style={{fontWeight:"bold"}}>{carts.inches}</small> : null}
                              {carts.litres && carts.litres !== "null" && carts.litres.length > 0 ?<small style={{fontWeight:"bold"}}>{carts.litres}</small> : null}
                              {carts.wattage && carts.wattage !== "null" && carts.wattage.length > 0 ? <small style={{fontWeight:"bold"}}>{carts.wattage}</small> : null}
                              {carts.kilogram && carts.kilogram !== "null" && carts.kilogram.length > 0 ? <small style={{fontWeight:"bold"}}>{carts.kilogram}</small> : null}<br/>
                               <small className="text-muted">Vendor :</small> <small style={{textTransform:"capitalize",fontSize:"13px",fontWeight:"bold"}}>{carts.seller}</small>
                               <small style={{float:"right",fontSize:"16px"}}>
                                        <div onClick={()=> this.deletecart(carts.id)} style={{cursor:"pointer"}}> <span className="fa fa-trash text-danger mr-2" ></span></div>
                                 </small><br/>
                              {carts.time ? 
                               <small><span style={{color:"orange"}} className="fa fa-clock mr-1"></span> <b>{formater(carts.time)}</b> { " " + carts.date} </small>
                                : null}
                            
                           </div>
                         
                           <div className="col-2" style={{padding:"0px",position:"relative",margin:"0px"}}>
                          <div style={{position:"absolute",top:"38%",left:"25%",padding:"10px"}}>
 <small style={{fontSize:"15px",cursor:"pointer",backgroundColor:"brown",borderRadius:"50%",color:"white"}} className="badge" onClick={()=> this.decreaseCart(carts.id)}>
   -</small> 
   <small style={{fontSize:"15px",padding:"5px"}}> {carts.quantity}</small>
    <small style={{fontSize:"15px",cursor:"pointer",backgroundColor:"orange",borderRadius:"50%",color:"white"}} className="badge" onClick={()=> this.increaseCart(carts.id)}>
      +</small><br/>
                </div>
                          
                           </div>
                           <div className="col-2" style={{position:"relative"}}>
                        <div style={{position:"absolute",top:"45%",left:"40%"}}>                      
                       <p style={{padding:"auto",fontWeight:"bold",color:"grey"}}>{carts.mainprice}</p>
                          </div>                          
                           </div>
                           <div className="col-2" style={{position:"relative"}}>
                           <div style={{position:"absolute",top:"45%",left:"40%"}}>
                               <p  style={{padding:"auto",fontWeight:"bold"}}>{carts.subtotal}</p>
                           </div>
=======
                              </div>
                              <div style={{margin:"0px",padding:"0px"}}>
                              {this.state.cart.map(carts=>
                        <div  className="row" key={carts.id} style={{borderRadius:"10px",borderBottom:"1px solid lightgrey",width:"100%",backgroundColor:"white",margin:"0px",padding:"0px"}} >
                            <div className="col-4 col-md-1">
                               <img src={require(`./images/${carts.mainimg}`)} style={{width:"100%",padding:"5px"}} alt=""/>
                            </div>
                           <div className="col-8 col-md-5" >
                               <small className="text-muted" style={{textTransform:"capitalize",fontSize:"14px",margin:"auto"}}>{carts.details}</small><br/>
                               <div className="row" style={{padding:"25px 0px 0px 0px"}}>
                                 <div className="col-6 text-danger" >
                                     <center>
                                        <div onClick={()=> this.deletecart(carts.details)} style={{cursor:"pointer"}}> <span className="fa fa-trash" ></span> REMOVE </div>
                                     </center>
                                 </div>
                                 <div className="col-6" style={{color:"orange"}}>
                                     <center>
                                         <span className="fa fa-heart" onClick={this.saveItem}></span> Save Item
                                     </center>
                                 </div>
                               </div>
                               
                           </div>
                           <div className="col-6 col-md-2" style={{borderLeft:"1px solid lightgrey",borderRight:"1px solid lightgrey"}}>
                          <center>
 <small style={{fontSize:"25px",cursor:"pointer"}} onClick={()=> this.decreaseCart(carts.details)}>-</small> <small style={{fontSize:"20px"}}> {carts.quantity}</small> <small style={{fontSize:"25px",cursor:"pointer"}} onClick={()=> this.increaseCart(carts.details)}>+</small><br/>
                          </center>
                          
                           </div>
                           <div className="col-3 col-md-2" style={{borderRight:"1px solid lightgrey"}}>
                           <center>
                           <p>{carts.mainprice}</p>
                           </center>
                           
                           </div>
                           <div className="col-3 col-md-2 text-muted">
                           <center>
                               <b style={{padding:"auto"}}>{carts.subtotal}</b>
                           </center>
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
                           
                           </div>
        
                              </div>
<<<<<<< HEAD
                        ) : null} 
                     </div>
                     <br/>
                     {this.props.cart.length === 0 && !this.props.loading && this.state.loading ?
                    <div className="row" style={{height:"100%"}}>
                      <div className="col-12">
                       <center>
<small className="text-warning" style={{fontSize:"35px",fontWeight:"bolder"}}>o</small><small className="text-warning" style={{fontSize:"30px",fontWeight:"bolder"}}>o</small>
<small className="text-warning" style={{fontSize:"25px",fontWeight:"bolder"}}>p</small><small className="text-warning" style={{fontSize:"25px",fontWeight:"bolder"}}>s!</small><br/>
                         <span className="fa fa-frown-o text-warning" style={{fontSize:"120px"}}></span>
                         <p className="text-warning" style={{fontStyle:"italics",fontWeight:"bold"}}>Sorry!. You have no pre-selected cart </p><br/>
                         <small className="text-muted">Click <button className="btn btn-warning" style={{padding:"3px",color:"white"}}>Continue</button> to return to Shopping Page</small>
                       </center>
                      </div>
                    </div> 
                    :null}
                     <br/>
                     {this.props.cart.length > 0 ?
=======
                        )} 
                     </div>
                     <br/>
                     <br/>
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
                    <div className="row">
                       <div className="col-8"></div>
                       <div className="col-12 col-md-4" style={{fontWeight:"bolder"}}>
                           <div style={{float:"right"}}>
<<<<<<< HEAD
                           <small className="text-muted">Subtotal</small> : {this.props.totalcartprice} <br/>
                           <small style={{color:"lightgrey"}}>Delivery fee not included</small><hr/>
                           <small style={{fontSize:"20px"}}>Total Due</small> : <small style={{fontSize:"20px"}}>{this.props.totalcartprice}</small>
                           </div>
                       </div>
                    </div>
                    : null}
                    <br/><br/>
                    <div className="row">
                    <div className="col-12">
                         <small className="text-muted">
                           Dear user, <br/>
                           Only after confirmation of goods or items should you Click on the black tick beside each products.
                           <br/>Note: Only a buyer can clear a cart.
                         </small>
                       </div>
                    </div>
                    <div style={{display:`${this.props.cart.length >0 ? "block" : "none"}`,backgroundColor:"white",boxShadow:"1px 1px lightgrey"}}>
                  <div style={{padding:"20px 10px"}} className="row" >
                      <div className="col-4 col-md-6">
                          <center>
                         <button onClick={this.submitCart} className="btn btn-success" style={{boxShadow:"2px 2px lightgrey",width:"100%"}}>Check Out</button>
                         </center>
                      </div>
                      <div className="col-8 col-md-6">
=======
                           <small className="text-muted">Subtotal</small> : {this.state.totalprice} <br/>
                           <small style={{color:"lightgrey"}}>Delivery fee not included</small><hr/>
                           <small style={{fontSize:"20px"}}>Total Due</small> : <small style={{fontSize:"20px"}}>{this.state.totalprice}</small>
                           </div>
                       </div>
                    </div>
                    <div style={{backgroundColor:"white",boxShadow:"1px 1px lightgrey"}}>
                  <div style={{padding:"20px 50px"}} className="row" >
                      <div className="col-6">
                          <center>
                         <button className="btn btn-success" style={{boxShadow:"2px 2px lightgrey",width:"80%"}}>Check Out</button>
                         </center>
                      </div>
                      <div className="col-6">
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
                      <center>
                         <button className="btn btn-warning" style={{boxShadow:"2px 2px lightgrey",width:"80%"}}>Continue Shopping</button>
                         </center>
                      </div>
                  </div>
                  </div>
<<<<<<< HEAD
                  
                    </div>
            </div>
         );
    }else{
      return (         
        <div style={{backgroundColor:"white",minHeight:`${this.props.cart.length ===0 ? "100%" : ""}`}}>
           <div className="container">
           <div className="row" style={{backgroundColor:`${this.props.userdetails.background || "white"}`,zIndex:"2",position:"sticky",top:"0px"}}>               
<div className="col-5 col-md-6" style={{fontSize:"20px",padding:"10px"}}>                     
                       <small>Shopping Cart ({this.props.cart?this.props.cart.length : null})</small>
                           </div>                           
    <div className="col-4 col-m4-3" style={{padding:"10px",display:`${this.props.cart.length > 0 ? "block" :"none"}`}}>                
          
                           </div>                                          
           <div style={{padding:"10px",display:`${this.props.cart.length > 0 ? "block" :"none"}`}}>
          <i class="fa fa-th" style={{color:`${this.state.view === "grid"  ? "rgb(0, 119, 179)" : this.props.userdetails.background === "black" ? "white" : "black"}`}} onClick={this.grid}></i>
          </div>
          <div style={{padding:"10px",display:`${this.props.cart.length > 0 ? "block" :"none"}`}}>
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

<div className="savemodaldiv" ref={(a) => this.savemodaldiv =a} id="savemodaldiv" style={{display:`${this.props.displaysavemodal}`,zIndex:"1",width:"100%",height:"100%",backgroundColor:"rgba(0,0,0,0.4)"}}>
<div className="savediv"  style={{backgroundColor:"white"}}>
 <center>
        <h5 style={{padding:"50px"}}>{ReactHtmlParser(this.props.saveResponse)}</h5>
        
        <div className="row" style={{padding:"10px"}}>  
                <div className="col-6">  
<button className="btn btn-danger" onClick={this.undisplaysavemodal} style={{boxShadow:"2px 3px lightgrey",padding:"8px",color:"white",width:"100%"}} type="button">Cancel</button> 
</div>
<div className="col-6">
<button className="btn btn-success"  style={{padding:"8px",color:"white",width:"100%",boxShadow:"2px 3px lightgrey"}} >Saved Items</button>
</div>         
           </div>
 </center>
 </div>
</div>
  
            {this.props.cart.length > 0 ?
                <div className="row text-muted dodo">
                       <div className="col-6">
                     
                       <small style={{textTransform:"uppercase",fontSize:"15px",fontWeight:"bold"}}>Products</small>
                      
                       </div>
                       <div className="col-2">
                         <center>
                         <small style={{textTransform:"uppercase",fontSize:"15px",fontWeight:"bold"}}> quantity</small>
                         </center>
                       </div>
                       <div className="col-2">
                         <center>
                         <small style={{textTransform:"uppercase",fontSize:"15px",fontWeight:"bold"}}>Price</small>
                         </center>
                       </div>
                       <div className="col-2">
                       <center>
                       <small style={{textTransform:"uppercase",fontSize:"14px",fontWeight:"bold"}}>Sub Total</small>
                       </center>
                       </div>
                          </div> : null }
                          <div style={{margin:"0px",padding:"0px"}}>
                          {this.props.cart.length > 0 ? this.props.cart.map(carts=>
                    <div  className="row" key={carts.id} style={{borderRadius:"10px",boxShadow:"1px 2px 5px 2px lightgrey",width:"100%",backgroundColor:"white",margin:"0px",padding:"0px"}} >
                        <div className="col-4 col-md-2" >
                        <span className={this.props.userdetails.savedItems && JSON.parse(this.props.userdetails.savedItems).includes(parseInt(carts.productId)) ? "fa fa-heart didi" : "far fa-heart didi"} onClick={()=>this.saveItem({"detail":carts.details,"id":carts.productId})} style={{fontSize:"20px",position:"absolute",top:"5px",color:"orange"}}></span>
                        <img  src={`https://res.cloudinary.com/fruget-com/image/upload/${carts.generalcategory}/${carts.category}/${carts.mainimg}`} style={{width:"100%",height:"100px"}} className="img-responsive mb-1 "></img>                           
                        </div>
                       <div className="col-7 col-md-4" style={{padding:"0px",margin:"0px"}}>
                             <Link to={`/product/202029190128891%2C${carts.productId}%2C245719/${carts.details}`}>
                                <small  style={{textTransform:"capitalize",fontSize:"13px",margin:"auto",color:"black"}}>
                          {carts.details}</small></Link><br/>
                           <small className="text-muted">Color :</small> <small style={{textTransform:"capitalize",fontSize:"13px",fontWeight:"bold"}}>{carts.color}</small>
                           <span className="ml-1 mr-1 mb-5" style={{borderRadius:"60%",fontSize:"8px",lineHeight:"0.2px",margin:"0px",padding:"0px 5px",border:"1px solid lightgrey",backgroundColor:`${carts.color}`,color:`${carts.color}`}}><small>.</small></span> ,
                <small className="ml-2">Size : </small>  {carts.inches && carts.inches !== "null" && carts.inches.length > 0 ? <small style={{fontWeight:"bold"}}>{carts.inches}</small> : null}
                          {carts.litres && carts.litres !== "null" && carts.litres.length > 0 ?<small style={{fontWeight:"bold"}}>{carts.litres}</small> : null}
                          {carts.wattage && carts.wattage !== "null" && carts.wattage.length > 0 ? <small style={{fontWeight:"bold"}}>{carts.wattage}</small> : null}
                          {carts.kilogram && carts.kilogram !== "null" && carts.kilogram.length > 0 ? <small style={{fontWeight:"bold"}}>{carts.kilogram}</small> : null}<br/>
                           <small className="text-muted">Vendor :</small> <small style={{textTransform:"capitalize",fontSize:"13px",fontWeight:"bold"}}>{carts.seller}</small><br/>
                          {carts.time ? 
                           <small><span style={{color:"orange"}} className="fa fa-clock mr-1"></span> <b>{formater(carts.time)}</b> { " " + carts.date} </small>
                            : null}
                           <div className="row" style={{padding:"5px 0px 0px 0px"}}>
                             <div className="d-none d-md-block col-md-6 text-danger" >
                                 <center>
                                     <small>
                                    <div onClick={()=> this.deletecart(carts.id)} style={{cursor:"pointer"}}> <span className="fa fa-trash" ></span> REMOVE </div>
                                    </small>
                                 </center>
                             </div>
                             <div className="d-none d-md-block col-md-6">
                                 <center>                                     
                                    <span className={this.props.userdetails.savedItems && JSON.parse(this.props.userdetails.savedItems).includes(parseInt(carts.productId)) ? "fa fa-heart dodo" : "far fa-heart dodo"} onClick={()=>this.saveItem({"detail":carts.details,"id":carts.productId})} style={{color:"orange"}}></span>                                    
                                 </center>
                             </div>
                           </div>
                       </div>
                       <div className="col-1 d-md-none">
                         <span className="fa fa-ellipsis-v">
                         </span>
                       </div>
                       <div className="col-4 col-md-2" style={{padding:"0px",margin:"0px",borderLeft:"1px solid lightgrey",borderRight:"1px solid lightgrey"}}>
                      <center className="topmarginer" style={{padding:"10px"}}>
<small style={{fontSize:"15px",cursor:"pointer",backgroundColor:"brown",borderRadius:"50%",color:"white"}} className="badge" onClick={()=> this.decreaseCart(carts.id)}>
-</small> 
<small style={{fontSize:"15px",padding:"5px"}}> {carts.quantity}</small>
<small style={{fontSize:"15px",cursor:"pointer",backgroundColor:"orange",borderRadius:"50%",color:"white"}} className="badge" onClick={()=> this.increaseCart(carts.id)}>
  +</small><br/>
            </center>
                      
                       </div>
                       <div className="col-3 col-md-2" style={{borderRight:"1px solid lightgrey"}}>
                       <center>
                       <p className="topmarginer">{carts.mainprice}</p>
                       </center>                          
                       </div>
                       <div className="col-5 col-md-2">
                       <center>
                           <p className="topmarginer" style={{padding:"auto",fontWeight:"bold"}}>{carts.subtotal}</p>
                       </center>
                       
                       </div>
    
                          </div>
                    ) : null} 
                 </div>
                 <br/>
                 {this.props.cart.length === 0 && !this.props.loading && this.state.loading ?
                <div className="row" style={{height:"100%"}}>
                  <div className="col-12">
                   <center>
<small className="text-warning" style={{fontSize:"35px",fontWeight:"bolder"}}>o</small><small className="text-warning" style={{fontSize:"30px",fontWeight:"bolder"}}>o</small>
<small className="text-warning" style={{fontSize:"25px",fontWeight:"bolder"}}>p</small><small className="text-warning" style={{fontSize:"25px",fontWeight:"bolder"}}>s!</small><br/>
                     <span className="fa fa-frown-o text-warning" style={{fontSize:"120px"}}></span>
                     <p className="text-warning" style={{fontStyle:"italics",fontWeight:"bold"}}>Sorry!. You have no pre-selected cart </p><br/>
                     <small className="text-muted">Click <button className="btn btn-warning" style={{padding:"3px",color:"white"}}>Continue</button> to return to Shopping Page</small>
                   </center>
                  </div>
                </div> 
                :null}
                 <br/>
                 {this.props.cart.length > 0 ?
                <div className="row">
                   <div className="col-8"></div>
                   <div className="col-12 col-md-4" style={{fontWeight:"bolder"}}>
                       <div style={{float:"right"}}>
                       <small className="text-muted">Subtotal</small> : {this.props.totalcartprice} <br/>
                       <small style={{color:"lightgrey"}}>Delivery fee not included</small><hr/>
                       <small style={{fontSize:"20px"}}>Total Due</small> : <small style={{fontSize:"20px"}}>{this.props.totalcartprice}</small>
                       </div>
                   </div>
                </div>
                : null}
                <br/><br/>
                <div className="row">
                <div className="col-12">
                     <small className="text-muted">
                       Dear user, <br/>
                       Only after confirmation of goods or items should you Click on the black tick beside each products.
                       <br/>Note: Only a buyer can clear a cart.
                     </small>
                   </div>
                </div>
                <div style={{display:`${this.props.cart.length >0 ? "block" : "none"}`,backgroundColor:"white",boxShadow:"1px 1px lightgrey"}}>
              <div style={{padding:"20px 10px"}} className="row" >
                  <div className="col-4 col-md-6">
                      <center>
                     <button onClick={this.submitCart} className="btn btn-success" style={{boxShadow:"2px 2px lightgrey",width:"100%"}}>Check Out</button>
                     </center>
                  </div>
                  <div className="col-8 col-md-6">
                  <center>
                     <button className="btn btn-warning" style={{boxShadow:"2px 2px lightgrey",width:"80%"}}>Continue Shopping</button>
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
const mapStateToProps =(store)=>{
    return{           
        totalcartprice:store.totalcartprice,
      cart:store.shoppingcart,
      loading:store.loading,
      issave:store.issave,
      cartMessage:store.cartMessage,
      display:store.display,
      saveResponse: store.saveResponse,
      displaysavemodal:store.displaysavemodal,
      userdetails:store.userdetails,
      redirect:store.redirect
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
   undisplaysavemodal: ()=>dispatch(undisplaysavemodal()),
     setredirect:()=>dispatch(setredirect())
   }
  }
export default connect(mapStateToProps,mapDispatchToProps)(CheckOut);
=======
                    </div>
            </div>
         );
    }
}
 
export default CheckOut;
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
