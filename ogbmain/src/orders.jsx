import React, { Component } from 'react';
import Cookies from "js-cookie"
import {undisplaymodal,shoppingcart, increaseshoppingcart, decreaseshoppingcart,removeshoppingcart,saveItem,checksaveItem,submitshoppingcart, fetchorders} from "./store"
import { connect } from 'react-redux';
import ReactHtmlParser from "react-html-parser"
import {Link} from "react-router-dom"
import {formater} from './formatTime';
import ProfileSideNavbar from "./profilesidenavbar"

class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    componentDidMount= async ()=>{
     await this.props.fetchorders()
    }
    clearcart=()=>{
      alert("A prompt has been sent to the buyer to clear this cart")
    }
    render() { 
       let uri = window.location.href;
       if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        return (         
                    <div className="navbarcomponentlg" style={{backgroundColor:"white"}}>
                       <div className="contain">
                         <div className="row" style={{backgroundColor:`${this.props.userdetails.background || "white"}`,zIndex:"2",position:"sticky",top:"0px"}}>               
 <div className="col-4" style={{fontSize:"20px",padding:"0px 20px"}}>                     
                           <small > Orders ({this.props.orders?this.props.orders.length : null})</small>
                               </div>                           
 <div className="col-5" style={{padding:"10px",display:`${this.props.orders.length > 0 ? "block" :"none"}`}}>                
 <div style={{padding:"0px 10px"}}>
                           <small>
                           Click <Link to={`/lg/group_orders`} style={{color:"orange"}}> Here </Link> to group Orders by Invoice
                        </small>
                         </div>
   </div>                                          
               <div style={{padding:"10px",display:`${this.props.orders.length > 0 ? "block" :"none"}`}}>
               <Link to={`/lg/orders`} style={{color:"orange"}}>
              <i class="fa fa-th" style={{color:`${uri.indexOf("group") === -1  ? "rgb(0, 119, 179)" : this.props.userdetails.background === "black" ? "white" : "black"}`}} ></i>
             </Link>
              </div>
              <div style={{padding:"10px",display:`${this.props.orders.length > 0 ? "block" :"none"}`}}>
              <Link to={`/lg/group_orders`} style={{color:"orange"}}>
              <i class="fa fa-grip-vertical" style={{color:`${uri.indexOf("group") > -1 ? "rgb(0, 119, 179)" : this.props.userdetails.background === "black" ? "white" : "black"}`}} ></i>
              </Link>
              </div>

              <div style={{padding:"10px",fontSize:"20px"}}>
              <a href={`/lg/orders`}><i class="fa fa-order" style={{color:`orange`}} ></i></a>
              </div>
              </div>
              
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
                        {this.props.orders.length > 0 ?
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
                                      {this.props.orders.map(carts=>
                                <div  className="row mb-1" key={carts.id} style={{borderRadius:"3px",boxShadow:"1px 2px 5px 2px lightgrey",width:"100%",backgroundColor:"white",margin:"0px",padding:"0px"}} >
                                <div className="col-2" > 
                            <img  src={`https://res.cloudinary.com/fruget-com/image/upload/${carts.generalcategory}/${carts.category}/${carts.mainimg}`} style={{width:"100%",height:"100px"}} className="img-responsive mb-1 mt-2"></img>                           
                            </div>
                                   <div className="col-4">
                                      <small  style={{textTransform:"capitalize",fontSize:"14px",margin:"auto"}}>{carts.details}
                                      <br/>
                                <small className="text-muted">Color :</small> <small style={{textTransform:"capitalize",fontSize:"13px",fontWeight:"bold"}}>{carts.color}</small><br/>
                               <small className="text-muted">Cart Code :</small> <small style={{textTransform:"capitalize",fontSize:"13px",fontWeight:"bold"}}>cart0000{carts.id}</small><br/>
                               <small className="text-muted">Invoice :</small> <small style={{textTransform:"capitalize",fontSize:"13px",fontWeight:"bold"}}>invoice0000{carts.invoiceId}</small><br/>
                              <small >{formater(carts.time)} </small>
                                       </small>
                                       <div className="row" style={{display:"none",padding:"10px 0px 0px 0px"}}>
                                         <div className={`${carts.status === "cleared" ? "col-4 text-danger" : "d-none"}`}>
                                             <center>
                                                 <small>
                                                <div onClick={()=> this.deletecart(carts.details)} style={{cursor:"pointer",fontSize:"18px"}}> <span className="fa fa-trash" ></span>  </div>
                                                </small>
                                             </center>
                                         </div>
                                         <div className="col-3" style={{color:`${this.props.issave.includes(parseInt(carts.productId)) ? "green" : "orange"}`}}>
                                             <center>
                                                <small>
                                                
                                             </small>
                                             </center>
                                         </div>
                                         <div className="col-5" title="Note! Only the buyer can clear a cart after confirmation within 2 days">
                                         <center>
                                               <small>
                                                 {carts.status === "pending" ?
                                                  <button onClick={this.clearcart} className="btn btn-sm" style={{padding:"3px",backgroundColor:"white",border:"1px solid red"}}>
                                               {carts.status} <span className="fa fa-clock-o" style={{cursor:"pointer",color:"red"}}  ></span> 
                                                 </button>
                                                 :
                                                 <button className="btn btn-sm btn-success" style={{padding:"3px",color:"white"}}>
                                                 {carts.status} <span className="fa fa-check-circle"  style={{cursor:"pointer",color:"white"}}  ></span> 
                                                   </button>
                                                }
                                              
                                             </small>
                                            </center>
                                         </div>
                                       </div>
                                       
                                   </div>
                                   <div className="col-1" style={{borderLeft:"1px solid lightgrey",borderRight:"1px solid lightgrey"}}>
                                  <center className="topmarginer mt-5">
   <small style={{fontSize:"17px",fontWeight:"bold"}} > {carts.quantity}</small> <br/>
                                  </center>
                                  
                                   </div>
                                   <div className="col-1" style={{borderRight:"1px solid lightgrey"}}>
                                 <center   className="topmarginer mt-5" >
                 <p  style={{fontWeight:"bold",color:"grey"}}>{carts.mainprice}</p>
                                   </center>                                   
                                   </div>
                                   <div className="col-2 ">
                                   <center className="topmarginer mt-5">
                                       <b >{carts.subtotal}</b>
                                   </center>                      
                                   </div>
                                   
                                   <div className="col-2" style={{borderLeft:"1px solid lightgrey",borderRight:"1px solid lightgrey"}}>
                                  <center>
                             <small style={{width:"100%",fontSize:"12px"}}>
                            {carts.fullName}  <br/> 
                            {carts.contact}  <br/> 
                            {carts.address.length > 50 ? carts.address.slice(0,40)+ "..." : carts.address} 
                           <Link to={`/lg/groupedinvoice?cartId=${carts.id}`}>
                          view carts details
                          </Link>
                             </small>
                                  </center>                               
                                   </div>
                                      </div>
                                )} 
                                   
                             </div>
                          <br/>
                        {this.props.orders.length === 0 && !this.props.loading ?
                            <div className="row" style={{height:"100%"}}>
                              <div className="col-12">
                               <center>
        <small className="text-warning" style={{fontSize:"45px",fontWeight:"bolder"}}>o</small><small className="text-warning" style={{fontSize:"40px",fontWeight:"bolder"}}>o</small>
        <small className="text-warning" style={{fontSize:"35px",fontWeight:"bolder"}}>p</small><small className="text-warning" style={{fontSize:"50px",fontWeight:"bolder"}}>s!</small><br/>
        <div style={{position:"relative"}}> 
                                <span className="fa fa-user-circle text-warning" style={{fontSize:"150px",padding:"0px"}}></span>
                                <span className="fa fa-comment-dollar" style={{color:"pink",position:"absolute",top:"0px",fontSize:"80px",padding:"0px"}}></span>
                                <span className="fa fa-shopping-cart text-danger" style={{position:"absolute",bottom:"0px",fontSize:"50px",padding:"0px"}}></span>
                               </div> 
                                 <p className="text-warning text-danger" style={{fontStyle:"italics",fontWeight:"bolder",fontSize:"30px"}}>Sorry!. You have no order yet </p><br/>
                                 <small className="text-muted" style={{fontStyle:"italics",fontWeight:"bolder"}}>Click <button className="btn btn-warning" style={{padding:"3px",color:"white"}}>Continue</button> to return to Shopping Page</small>
                               </center>
                              </div>
                            </div> 
                            :null}
                             <br/>
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
                            <div style={{display:`${this.props.orders.length >0 ? "block" : "none"}`,backgroundColor:"white",boxShadow:"1px 1px lightgrey"}}>
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
                                 <div className="row" style={{backgroundColor:`${this.props.userdetails.background || "white"}`,zIndex:"2",position:"sticky",top:"0px"}}>               
         <div className="col-5 col-md-6" style={{fontSize:"20px",padding:"10px"}}>                     
                                   <small > Orders ({this.props.orders?this.props.orders.length : null})</small>
                                       </div>                           
         <div className="col-4 col-m4-3" style={{padding:"10px",display:`${this.props.orders.length > 0 ? "block" :"none"}`}}>                
                      
           </div>                                          
                       <div style={{padding:"10px",display:`${this.props.orders.length > 0 ? "block" :"none"}`}}>
                       <Link to={`/lg/orders`} style={{color:"orange"}}>
                      <i class="fa fa-th" style={{color:`${uri.indexOf("group") === -1  ? "rgb(0, 119, 179)" : this.props.userdetails.background === "black" ? "white" : "black"}`}} ></i>
                     </Link>
                      </div>
                      <div style={{padding:"10px",display:`${this.props.orders.length > 0 ? "block" :"none"}`}}>
                      <Link to={`/lg/group_orders`} style={{color:"orange"}}>
                      <i class="fa fa-grip-vertical" style={{color:`${uri.indexOf("group") > -1 ? "rgb(0, 119, 179)" : this.props.userdetails.background === "black" ? "white" : "black"}`}} ></i>
                      </Link>
                      </div>
        
                      <div style={{padding:"10px",fontSize:"20px"}}>
                      <a href={`/lg/orders`}><i class="fa fa-order" style={{color:`orange`}} ></i></a>
                      </div>
                      </div>
                      <br/>
                      <div style={{padding:"10px"}}>
                                   <small>
                                   Click <Link to={`/lg/group_orders`} style={{color:"orange"}}> Here </Link> to group Orders by Invoice
                                </small>
                                 </div>
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
                                {this.props.orders.length > 0 ?
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
                                              {this.props.orders.map(carts=>
                                        <div  className="row mb-1" key={carts.id} style={{borderRadius:"3px",boxShadow:"1px 2px 5px 2px lightgrey",width:"100%",backgroundColor:"white",margin:"0px",padding:"0px"}} >
                                        <div className="col-4 col-md-2" > 
                                    <img  src={`https://res.cloudinary.com/fruget-com/image/upload/${carts.generalcategory}/${carts.category}/${carts.mainimg}`} style={{width:"100%",height:"100px"}} className="img-responsive mb-1 mt-2"></img>                           
                                    </div>
                                           <div className="col-8 col-md-4">
                                              <small  style={{textTransform:"capitalize",fontSize:"14px",margin:"auto"}}>{carts.details}
                                              <br/>
                                        <small className="text-muted">Color :</small> <small style={{textTransform:"capitalize",fontSize:"13px",fontWeight:"bold"}}>{carts.color}</small><br/>
                                       <small className="text-muted">Cart Code :</small> <small style={{textTransform:"capitalize",fontSize:"13px",fontWeight:"bold"}}>cart0000{carts.id}</small><br/>
                                       <small className="text-muted">Invoice :</small> <small style={{textTransform:"capitalize",fontSize:"13px",fontWeight:"bold"}}>invoice0000{carts.invoiceId}</small><br/>
                                      <small >{formater(carts.time)} </small>
                                               </small>
                                               <div className="row" style={{display:"none",padding:"10px 0px 0px 0px"}}>
                                                 <div className={`${carts.status === "cleared" ? "col-4 text-danger" : "d-none"}`}>
                                                     <center>
                                                         <small>
                                                        <div onClick={()=> this.deletecart(carts.details)} style={{cursor:"pointer",fontSize:"18px"}}> <span className="fa fa-trash" ></span>  </div>
                                                        </small>
                                                     </center>
                                                 </div>
                                                 <div className="col-3" style={{color:`${this.props.issave.includes(parseInt(carts.productId)) ? "green" : "orange"}`}}>
                                                     <center>
                                                        <small>
                                                        
                                                     </small>
                                                     </center>
                                                 </div>
                                                 <div className="col-5" title="Note! Only the buyer can clear a cart after confirmation within 2 days">
                                                 <center>
                                                       <small>
                                                         {carts.status === "pending" ?
                                                          <button onClick={this.clearcart} className="btn btn-sm" style={{padding:"3px",backgroundColor:"white",border:"1px solid red"}}>
                                                       {carts.status} <span className="fa fa-clock-o" style={{cursor:"pointer",color:"red"}}  ></span> 
                                                         </button>
                                                         :
                                                         <button className="btn btn-sm btn-success" style={{padding:"3px",color:"white"}}>
                                                         {carts.status} <span className="fa fa-check-circle"  style={{cursor:"pointer",color:"white"}}  ></span> 
                                                           </button>
                                                        }
                                                      
                                                     </small>
                                                    </center>
                                                 </div>
                                               </div>
                                               
                                           </div>
                                           <div className="col-2 col-md-1" style={{borderLeft:"1px solid lightgrey",borderRight:"1px solid lightgrey"}}>
                                          <center className="topmarginer">
           <small style={{fontSize:"17px",fontWeight:"bold"}} > {carts.quantity}</small> <br/>
                                          </center>
                                          
                                           </div>
                                           <div className="col-3 col-md-1" style={{borderRight:"1px solid lightgrey"}}>
                                         <center   className="topmarginer" >
                         <p >{carts.mainprice}</p>
                                           </center>                                   
                                           </div>
                                           <div className="col-4 col-md-2 ">
                                           <center className="topmarginer">
                                               <b >{carts.subtotal}</b>
                                           </center>                      
                                           </div>
                                           <div className="col-sm-3 col-md-2 d-lg-none" style={{padding:"5px",borderLeft:"1px solid lightgrey",borderRight:"1px solid lightgrey"}}>
                                          <center>
                                     <small style={{width:"100%",fontSize:"12px"}}>
                                     <Link to={`/lg/groupedinvoice?cartId=${carts.id}`}>
                                    <button className="btn btn-sm" style={{padding:"2px",backgroundColor:"orange",color:"white",width:"100%"}}>
                                  view details
                                   </button>
                                   </Link>
                                    </small>
                                          </center>                               
                                           </div>
                                           <div className="d-none d-lg-block col-lg-2" style={{borderLeft:"1px solid lightgrey",borderRight:"1px solid lightgrey"}}>
                                          <center>
                                     <small style={{width:"100%",fontSize:"12px"}}>
                                    {carts.fullName}  <br/> 
                                    {carts.contact}  <br/> 
                                    {carts.address.length > 50 ? carts.address.slice(0,40)+ "..." : carts.address} 
                                   <Link to={`/lg/groupedinvoice?cartId=${carts.id}`}>
                                  view carts details
                                  </Link>
                                     </small>
                                          </center>                               
                                           </div>
                                              </div>
                                        )} 
                                           
                                     </div>
                                  <br/>
                                {this.props.orders.length === 0 && !this.props.loading ?
                                    <div className="row" style={{height:"100%"}}>
                                      <div className="col-12">
                                       <center>
                <small className="text-warning" style={{fontSize:"45px",fontWeight:"bolder"}}>o</small><small className="text-warning" style={{fontSize:"40px",fontWeight:"bolder"}}>o</small>
                <small className="text-warning" style={{fontSize:"35px",fontWeight:"bolder"}}>p</small><small className="text-warning" style={{fontSize:"50px",fontWeight:"bolder"}}>s!</small><br/>
                <div style={{position:"relative"}}> 
                                        <span className="fa fa-user-circle text-warning" style={{fontSize:"150px",padding:"0px"}}></span>
                                        <span className="fa fa-comment-dollar" style={{color:"pink",position:"absolute",top:"0px",fontSize:"80px",padding:"0px"}}></span>
                                        <span className="fa fa-shopping-cart text-danger" style={{position:"absolute",bottom:"0px",fontSize:"50px",padding:"0px"}}></span>
                                       </div> 
                                         <p className="text-warning text-danger" style={{fontStyle:"italics",fontWeight:"bolder",fontSize:"30px"}}>Sorry!. You have no order yet </p><br/>
                                         <small className="text-muted" style={{fontStyle:"italics",fontWeight:"bolder"}}>Click <button className="btn btn-warning" style={{padding:"3px",color:"white"}}>Continue</button> to return to Shopping Page</small>
                                       </center>
                                      </div>
                                    </div> 
                                    :null}
                                     <br/>
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
                                    <div style={{display:`${this.props.orders.length >0 ? "block" : "none"}`,backgroundColor:"white",boxShadow:"1px 1px lightgrey"}}>
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
                userdetails:store.userdetails,
                sellernumOfRows:store.sellernumOfRows,
                shoppingcarts:store.shoppingcart,
                submittedcartprice:store.submittedcartprice,
                submittedcarts:store.submittedcart,
                orders :store.orders,
                totalorderprice: store.totalorderprice,
                issave:store.issave,
                loading: store.loading,
                modalsidenavbarwidth:store.modalsidenavbarwidth,
                userdetails:store.userdetails
            }
             }
             const mapDispatchToProps =(dispatch)=>{
              return{
               shoppingcart:()=>dispatch(shoppingcart()),
               increaseshoppingcart:(data)=>dispatch(increaseshoppingcart(data)),
               decreaseshoppingcart:(data)=>dispatch(decreaseshoppingcart(data)),
               removeshoppingcart:(data)=>dispatch(removeshoppingcart(data)),
               saveItem:(data)=>dispatch(saveItem(data)),
               fetchorders:()=>dispatch(fetchorders()),
               submitshoppingcart:()=>dispatch(submitshoppingcart()),
              undisplaycartmodal:()=>dispatch(undisplaymodal())
                
              }
             }
 
export default connect(mapStateToProps,mapDispatchToProps)(Orders)