import React, { Component } from 'react';
import Cookies from "js-cookie"
import {fetchgroupedcartbyinvoiceId} from "./store"
import ReactHtmlParser from "react-html-parser"
import { connect } from 'react-redux';
import {Link} from "react-router-dom"
import {formater} from "./formatTime"

class GroupedInvoice extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    componentDidMount= ()=>{ 
     this.props.fetchgroupedcartbyinvoiceId()
     }
    render() { 
let uri = window.location.href;
if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
  return (  
            <div style={{backgroundColor:"white"}} className="navbarcomponentlg">
               <div className="container">
               <div className="row mt-2" style={{backgroundColor:`${this.props.userdetails.background || "white"}`,zIndex:"2",position:"sticky",top:"0px"}}>               
 <div className="col-4" style={{fontSize:"20px",padding:"0px 10px"}}>                     
                           <small > Orders ({this.props.groupedorders?this.props.groupedorders.length : null})</small>
                               </div>                           
 <div className="col-7" style={{padding:"0px 10px",display:`${this.props.groupedorders.length > 0 ? "block" :"none"}`}}>                
 <div style={{padding:"10px"}}>
                           <small>
                           Click <Link to={`/lg/orders`} style={{color:"orange"}}> Here </Link> to order by cart
                        </small>
                         </div>         
   </div>                                          
               <div style={{padding:"10px",display:`${this.props.groupedorders.length > 0 ? "block" :"none"}`,float:"right"}}>
               <Link to={`/lg/orders`} >
              <i class="fa fa-th" style={{color:`${uri.indexOf("group") === -1  ? "orange" : this.props.userdetails.background === "black" ? "white" : "black"}`}} ></i>
             </Link>
              </div>
              <div style={{padding:"10px",display:`${this.props.groupedorders.length > 0 ? "block" :"none"}`}}>
              <Link to={`/lg/group_orders`} >
              <i class="fa fa-grip-vertical" style={{color:`${uri.indexOf("group") > -1 ? "orange" : this.props.userdetails.background === "black" ? "white" : "black"}`}} ></i>
              </Link>
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
      {this.props.groupedorders.length > 0 ?
                    <div className="row text-muted mt-3">
                           <div className="col-5">         
                           <small style={{textTransform:"uppercase",fontSize:"15px",fontWeight:"bold"}}>Products</small>                         
                           </div>
                           <div className="col-1">
                             <center>
                             <small style={{textTransform:"uppercase",fontSize:"15px",fontWeight:"bold"}}> invoice </small>
                             </center>
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
                              </div> : null}
                              <div style={{margin:"0px",padding:"0px"}}>
                              {this.props.groupedorders.map(carts=>
                        <div  className="row mb-1" key={carts.id} style={{borderRadius:"3px",boxShadow:"1px 2px 5px 2px lightgrey",width:"100%",backgroundColor:"white",margin:"0px",padding:"0px"}} >
                            <div className="col-2" style={{padding:"0px",margin:"0px"}}>
                            <img  src={`https://res.cloudinary.com/fruget-com/image/upload/${carts.generalcategory}/${carts.category}/${carts.mainimg}`} style={{padding:"3px",width:"100%",height:"110px"}} className="img-responsive mt-1 mb-1"></img>                           
                            </div>
                           <div className="col-4" style={{padding:"0px",margin:"0px"}}> 
                              <small  style={{textTransform:"capitalize",fontSize:"12px"}}>{carts.details}
                                <small style={{fontSize:"17px"}}> {parseInt(carts.colory) - 1 >  1 ? " + " : null} <b>{parseInt(carts.colory) - 1 >  1 ?  parseInt(carts.colory) - 1 + " Items": null}</b></small><br/>
                                Name : <small style={{fontWeight:"bold",fontSize:"12px"}}>{carts.fullName}</small><br/>
                                contact : <small style={{fontWeight:"bold",fontSize:"12px"}}>{carts.contact}</small>/ <small style={{fontSize:"12px"}}>{carts.contactTwo}</small><br/>
                               Invoice : <small style={{textTransform:"capitalize",fontWeight:"bold",fontSize:"12px"}}>Inv0000{carts.invoiceId}</small>
                               <small className="mr-1" style={{fontweight:"bold",fontSize:"12px",float:"right"}}>{formater(carts.time)}</small>
                               </small>                          
                           </div>
                          
                           <div className="col-1" style={{borderLeft:"1px solid lightgrey",borderRight:"1px solid lightgrey"}}>
                          <center className="topmarginer">
 <small style={{fontSize:"17px"}}> {carts.colory}</small> <br/>
                          </center>                
                           </div>
                          
                           <div className="col-1" style={{borderRight:"1px solid lightgrey"}}>
                           <center className="topmarginer">
                           <p>{carts.mainprice}</p>
                           </center>                         
                           </div>
                           <div className="col-2">
                           <center className="topmarginer"> 
                               <b style={{padding:"auto"}}>{carts.subtotal}</b>
                           </center>                  
                           </div>
                         
                       <div className="col-2" style={{borderLeft:"1px solid lightgrey",borderRight:"1px solid lightgrey"}}>
                                  <center>
                             <small style={{width:"100%",fontSize:"12px"}}>
                         {carts.address && carts.address.length > 60 ? carts.address.slice(0,60)+ "..." : carts.address} 
                           <Link to={`/lg/invoice?invoiceId=${carts.invoiceId}`}> <br/>
                          view carts details
                          </Link>
                             </small>
                                  </center>                               
                                   </div>
                          </div>
                        )} 
                     </div>
                     <br/>
                     {this.props.groupedorders.length === 0 ?
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
                    <div className="row">
                       <div className="col-8"></div>
                       <div className="col-12 col-md-4" style={{fontWeight:"bolder"}}>
                           <div style={{float:"right"}}>
                           <small className="text-muted">Subtotal</small> : {this.props.groupedordersprice} <br/>
                           <small style={{color:"lightgrey"}}>Delivery fee not included</small><hr/>
                           <small style={{fontSize:"20px"}}>Total Due</small> : <small style={{fontSize:"20px"}}>{this.props.groupedordersprice}</small>
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
                    <div style={{display:`${this.props.groupedorders.length >0 ? "block" : "none"}`,backgroundColor:"white",boxShadow:"1px 1px lightgrey"}}>
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
                       <small > Orders ({this.props.groupedorders?this.props.groupedorders.length : null})</small>
                           </div>                           
<div className="col-4 col-m4-3" style={{padding:"10px",display:`${this.props.groupedorders.length > 0 ? "block" :"none"}`}}>                
          
</div>                                          
           <div style={{padding:"10px",display:`${this.props.groupedorders.length > 0 ? "block" :"none"}`}}>
           <Link to={`/lg/orders`} style={{color:"orange"}}>
          <i class="fa fa-th" style={{color:`${uri.indexOf("group") === -1  ? "rgb(0, 119, 179)" : this.props.userdetails.background === "black" ? "white" : "black"}`}} ></i>
         </Link>
          </div>
          <div style={{padding:"10px",display:`${this.props.groupedorders.length > 0 ? "block" :"none"}`}}>
          <Link to={`/lg/group_orders`} style={{color:"orange"}}>
          <i class="fa fa-grip-vertical" style={{color:`${uri.indexOf("group") > -1 ? "rgb(0, 119, 179)" : this.props.userdetails.background === "black" ? "white" : "black"}`}} ></i>
          </Link>
          </div>
          <div style={{padding:"10px",fontSize:"20px"}}>
          <a href={`/lg/orders`}><i class="fa fa-shopping-basket" style={{color:`orange`}} ></i></a>
          </div>
          </div>
          <br/>
          <div style={{padding:"10px"}}>
                       <small>
                       Click <Link to={`/lg/orders`} style={{color:"orange"}}> Here </Link> to order by cart
                    </small>
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
  {this.props.groupedorders.length > 0 ?
                <div className="row text-muted dodo">
                       <div className="col-5">         
                       <small style={{textTransform:"uppercase",fontSize:"15px",fontWeight:"bold"}}>Products</small>                         
                       </div>
                       <div className="col-1">
                         <center>
                         <small style={{textTransform:"uppercase",fontSize:"15px",fontWeight:"bold"}}> invoice </small>
                         </center>
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
                          </div> : null}
                          <div style={{margin:"0px",padding:"0px"}}>
                          {this.props.groupedorders.map(carts=>
                    <div  className="row" key={carts.id} style={{borderRadius:"10px",boxShadow:"1px 2px 5px 2px lightgrey",width:"100%",backgroundColor:"white",margin:"0px",padding:"0px"}} >
                        <div className="col-4 col-md-2" style={{padding:"0px",margin:"0px"}}>
                        <img  src={`https://res.cloudinary.com/fruget-com/image/upload/${carts.generalcategory}/${carts.category}/${carts.mainimg}`} style={{padding:"3px",width:"100%",height:"110px"}} className="img-responsive mt-1 mb-1"></img>                           
                        </div>
                       <div className="col-8 col-md-4" style={{padding:"0px",margin:"0px"}}> 
                          <small  style={{textTransform:"capitalize",fontSize:"12px"}}>{carts.details}
                            <small style={{fontSize:"17px"}}> {parseInt(carts.colory) - 1 >  1 ? " + " : null} <b>{parseInt(carts.colory) - 1 >  1 ?  parseInt(carts.colory) - 1 + " Items": null}</b></small><br/>
                            Name : <small style={{fontWeight:"bold",fontSize:"12px"}}>{carts.fullName}</small><br/>
                            contact : <small style={{fontWeight:"bold",fontSize:"12px"}}>{carts.contact}</small>/ <small style={{fontSize:"12px"}}>{carts.contactTwo}</small><br/>
                           Invoice : <small style={{textTransform:"capitalize",fontWeight:"bold",fontSize:"12px"}}>Inv0000{carts.invoiceId}</small>
                           <small className="mr-1" style={{fontweight:"bold",fontSize:"12px",float:"right"}}>{formater(carts.time)}</small>
                           </small>
                           <div className="row" style={{padding:"25px 0px 0px 0px"}}>
                             <div className="d-none col-4 col-md-6 text-danger" >
                                 <center>
                                     <small>   
                                    <div onClick={()=> this.deletecart(carts.details)} style={{cursor:"pointer",fontSize:"18px"}}> <span className="fa fa-trash" ></span>  </div>
                                    </small>
                                 </center>
                             </div>
                             <div className="d-none col-4 col-md-6" title="Click here! if you have recieved and confirmed this item">
                             <center>
                                   <small>
                                     <span className="fa fa-check-circle" style={{cursor:"pointer",fontSize:"18px"}}  onClick={()=>this.saveItem({"detail":carts.details,"id":carts.productId})}></span> 
                                 </small>
                                </center>
                             </div>
                           
                           </div>                              
                       </div>
                      
                       <div className="col-3 col-md-1" style={{borderLeft:"1px solid lightgrey",borderRight:"1px solid lightgrey"}}>
                      <center className="topmarginer">
<small style={{fontSize:"17px"}}> {carts.colory}</small> <br/>
                      </center>                
                       </div>
                       <div className="col-3 d-md-none" style={{borderLeft:"1px solid lightgrey",borderRight:"1px solid lightgrey"}}>
                      <center  className="topmarginer">
               <small style={{fontSize:"17px"}}> {carts.quantity}</small> <br/>
                      </center>                
                       </div>
                       <div className="col-3 col-md-1" style={{borderRight:"1px solid lightgrey"}}>
                       <center className="topmarginer">
                       <p>{carts.mainprice}</p>
                       </center>                         
                       </div>
                       <div className="col-3 col-md-2">
                       <center className="topmarginer"> 
                           <b style={{padding:"auto"}}>{carts.subtotal}</b>
                       </center>                  
                       </div>
                       <div className="col-sm-3 col-md-2 d-lg-none" style={{padding:"5px",borderLeft:"1px solid lightgrey",borderRight:"1px solid lightgrey"}}>
                              <center>
                         <small style={{width:"100%",fontSize:"12px"}}>
                         <Link to={`/lg/invoice?invoiceId=${carts.invoiceId}`}>                   
                        <button className="btn btn-sm" style={{padding:"2px",backgroundColor:"orange",color:"white",width:"100%"}}>
                      view details
                       </button>
                       </Link>
                        </small>
                              </center>                               
                               </div> 
                               <div className="d-none d-lg-block col-lg-2 text-muted" style={{borderLeft:"1px solid lightgrey",borderRight:"1px solid lightgrey"}}>
                              <center>
                         <small style={{width:"100%",fontSize:"12px"}}>
                     {carts.address && carts.address.length > 60 ? carts.address.slice(0,60)+ "..." : carts.address} 
                       <Link to={`/lg/invoice?invoiceId=${carts.invoiceId}`}> <br/>
                      view carts details
                      </Link>
                         </small>
                              </center>                               
                               </div>
                      </div>
                    )} 
                 </div>
                 <br/>
                 {this.props.groupedorders.length === 0 ?
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
                <div className="row">
                   <div className="col-8"></div>
                   <div className="col-12 col-md-4" style={{fontWeight:"bolder"}}>
                       <div style={{float:"right"}}>
                       <small className="text-muted">Subtotal</small> : {this.props.groupedordersprice} <br/>
                       <small style={{color:"lightgrey"}}>Delivery fee not included</small><hr/>
                       <small style={{fontSize:"20px"}}>Total Due</small> : <small style={{fontSize:"20px"}}>{this.props.groupedordersprice}</small>
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
                <div style={{display:`${this.props.groupedorders.length >0 ? "block" : "none"}`,backgroundColor:"white",boxShadow:"1px 1px lightgrey"}}>
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
        shoppingcarts:store.shoppingcart,
        groupedordersprice:store.groupedordersprice,
        groupedorders:store.groupedorders,
       loading:store.loading,
       issave:store.issave,
       userdetails:store.userdetails
    }
     }
     const mapDispatchToProps =(dispatch)=>{
      return{
        fetchgroupedcartbyinvoiceId : ()=>dispatch(fetchgroupedcartbyinvoiceId())
      }
     }
export default connect(mapStateToProps,mapDispatchToProps)(GroupedInvoice)