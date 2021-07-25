import React, { Component } from 'react';
import {fetchinvoice, fetchcartbyinvoiceId} from "./store" 
import {connect} from "react-redux"
import querystring from 'query-string'
import { Link } from 'react-router-dom';

class Invoice extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    componentDidMount=()=>{
        const parsedQuery = querystring.parse(this.props.location.search);
        if(parsedQuery.cartId){
        this.props.fetchinvoice(parsedQuery.cartId)
    }else if(parsedQuery.invoiceId){
        this.props.fetchcartbyinvoiceId(parsedQuery.invoiceId)
    }
}
    render() { 
        if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
            return (         
            <div className="navbarcomponentlg">
               <div className="contain">
                   <div style={{padding:"20px",backgroundColor:"white",boxShadow:"2px 3px 5px 2px lightgrey"}}> 
             <h3>
                  <center>
                      Invoice 
                        {this.props.invoicecart.length > 0 ?
                   <small><span className="fa fa-shopping-cart" style={{color:"orange",padding:"3px"}}> ({this.props.invoicecart.length})</span></small> 
                    : null}
                  </center>
              </h3>
             
           
          <div className="row">               
                    {this.props.invoicecart.map((cart)=>
                     <div className="col-12 col-md-6">
                <p key={cart.id}>   
                <b>Product :</b>  {cart.details}  <br/>    
                     <div className="row">
                         <div className="col-7 col-md-7">
                   <b>Color :</b> {cart.color} <br/>
                  <b>Cart Code :</b> <a href={`/lg/invoice?cartId=${cart.id}`}><small>cart0000{cart.id}</small> </a> <br/>
                  <b>Invoice Code :</b> <a href={`/lg/invoice?invoiceId=${cart.invoiceId}`}> <small>invoice0000{cart.invoiceId} </small></a><br/>
                  <b>Price :</b> {cart.mainprice} <br/>
                  <b>Quantity :</b> {cart.quantity} <br/>
                  <b>Amount :</b> <b>{cart.subtotal}</b> <br/> 
                  <b>Date :</b> {cart.dateoforder.split("T")[0]} <br/>
                  <b>Time :</b> {cart.dateoforder.split("T")[1]} <br/> 
                  <b>Status :</b> {cart.status}  <hr/>
                         </div>
                         <div className="col-5 col-md-5">
<img  src={`https://res.cloudinary.com/fruget-com/image/upload/${cart.generalcategory}/${cart.category}/${cart.mainimg}`} style={{padding:"3px"}} className="img-responsive cartImg"></img> 
                         </div>
                     </div>
                 
                </p>  
                  </div>           
                )}
              </div>
            
              <div className="row">
             <div className="col-12">  
             <div className="row">
                 <div className="col-12 col-md-6">
                    <small className="text-muted" style={{textDecoration:"underline"}}>Buyer Details</small>
                 {this.props.invoicebuyer.map((buyer)=>
                  <p key={buyer.userId}>
                      <div className="row">
                      <div className="col-8 col-md-7">
                         <b>BUYER : </b> {buyer.fullName} <br/><br/>
                      <b>Contact : </b> {buyer.contact} / {buyer.contactTwo} <br/> <br/>             
                      <b>bus-stop : </b> {buyer.bustop}  <br/><br/>
                      <b>Address :</b> {buyer.address} <br/><hr/><br/><br/> 
                      </div>
                      <div className="col-4 col-md-5">
                      <img src={buyer.profileImage ? `https://res.cloudinary.com/fruget-com/image/upload/profile/${buyer.profileImage}`: require(`./images/maleprofile.png`)} className="img-thumbnail img-responsive cartImg" style={{padding:"5px"}}  alt=""/>
                      </div>
                      </div>                    
                  </p>
                  )}

<small className="text-muted" style={{textDecoration:"underline"}}>Vendor Details</small>
{this.props.invoiceseller.map((Vendor)=>
                  <p key={Vendor.userId}>
                       <div className="row">
                      <div className="col-8 col-md-7">
                      <b>Vendor : </b> {Vendor.businessName} <br/><br/>
                      <b>Contact : </b> {Vendor.contact} / {Vendor.contactTwo} <br/> <br/> 
                      <b>Rating : </b> <div className="outer">     
                      <div className="inner" style={{width:`65%`}}>  
                     </div> 
                     </div>  <br/><br/>
                   <b>Number Of verified sales : </b> {Vendor.verifiedsales}<br/><br/>            
                      <b>bus-stop : </b> {Vendor.bustop}  <br/><br/>
                      <b>Address :</b> {Vendor.address} <br/><hr/>
                      </div>
                      <div className="col-4 col-md-5">
                      <img src={Vendor.profileImage ? `https://res.cloudinary.com/fruget-com/image/upload/profile/${Vendor.profileImage}`: require(`./images/maleprofile.png`)} className="img-thumbnail img-responsive cartImg" style={{padding:"5px"}}  alt=""/>
                      </div>
                      </div>
                  </p>
                  )}
                 </div>
                
                
                 </div>              
                  </div>
                  <hr/>            
                </div>                               
                   </div>
               </div>
            </div>
         );
         }else{
            return (         
                <div>
                   <div className="container">
                       <div style={{padding:"20px",backgroundColor:"white",boxShadow:"2px 3px 5px 2px lightgrey"}}> 
                 <h3>
                      <center>
                          Invoice 
                            {this.props.invoicecart.length > 0 ?
                       <small><span className="fa fa-shopping-cart" style={{color:"orange",padding:"3px"}}> ({this.props.invoicecart.length})</span></small> 
                        : null}
                      </center>
                  </h3>
                 
               
              <div className="row">               
                        {this.props.invoicecart.map((cart)=>
                         <div className="col-12 col-md-6">
                    <p key={cart.id}>   
                    <b>Product :</b>  {cart.details}  <br/>    
                         <div className="row">
                             <div className="col-7 col-md-7">
                       <b>Color :</b> {cart.color} <br/>
                      <b>Cart Code :</b> <a href={`/lg/invoice?cartId=${cart.id}`}><small>cart0000{cart.id}</small> </a> <br/>
                      <b>Invoice Code :</b> <a href={`/lg/invoice?invoiceId=${cart.invoiceId}`}> <small>invoice0000{cart.invoiceId} </small></a><br/>
                      <b>Price :</b> {cart.mainprice} <br/>
                      <b>Quantity :</b> {cart.quantity} <br/>
                      <b>Amount :</b> <b>{cart.subtotal}</b> <br/> 
                      <b>Date :</b> {cart.dateoforder.split("T")[0]} <br/>
                      <b>Time :</b> {cart.dateoforder.split("T")[1]} <br/> 
                      <b>Status :</b> {cart.status}  <hr/>
                             </div>
                             <div className="col-5 col-md-5">
    <img  src={`https://res.cloudinary.com/fruget-com/image/upload/${cart.generalcategory}/${cart.category}/${cart.mainimg}`} style={{padding:"3px"}} className="img-responsive cartImg"></img> 
                             </div>
                         </div>
                     
                    </p>  
                      </div>           
                    )}
                  </div>
                
                  <div className="row">
                 <div className="col-12">  
                 <div className="row">
                     <div className="col-12 col-md-6">
                        <small className="text-muted" style={{textDecoration:"underline"}}>Buyer Details</small>
                     {this.props.invoicebuyer.map((buyer)=>
                      <p key={buyer.userId}>
                          <div className="row">
                          <div className="col-8 col-md-7">
                             <b>BUYER : </b> {buyer.fullName} <br/><br/>
                          <b>Contact : </b> {buyer.contact} / {buyer.contactTwo} <br/> <br/>             
                          <b>bus-stop : </b> {buyer.bustop}  <br/><br/>
                          <b>Address :</b> {buyer.address} <br/><hr/><br/><br/> 
                          </div>
                          <div className="col-4 col-md-5">
                          <img src={buyer.profileImage ? `https://res.cloudinary.com/fruget-com/image/upload/profile/${buyer.profileImage}`: require(`./images/maleprofile.png`)} className="img-thumbnail img-responsive cartImg" style={{padding:"5px"}}  alt=""/>
                          </div>
                          </div>                    
                      </p>
                      )}
    
    <small className="text-muted" style={{textDecoration:"underline"}}>Vendor Details</small>
    {this.props.invoiceseller.map((Vendor)=>
                      <p key={Vendor.userId}>
                           <div className="row">
                          <div className="col-8 col-md-7">
                          <b>Vendor : </b> {Vendor.businessName} <br/><br/>
                          <b>Contact : </b> {Vendor.contact} / {Vendor.contactTwo} <br/> <br/> 
                          <b>Rating : </b> <div className="outer">     
                          <div className="inner" style={{width:`65%`}}>  
                         </div> 
                         </div>  <br/><br/>
                       <b>Number Of verified sales : </b> {Vendor.verifiedsales}<br/><br/>            
                          <b>bus-stop : </b> {Vendor.bustop}  <br/><br/>
                          <b>Address :</b> {Vendor.address} <br/><hr/>
                          </div>
                          <div className="col-4 col-md-5">
                          <img src={Vendor.profileImage ? `https://res.cloudinary.com/fruget-com/image/upload/profile/${Vendor.profileImage}`: require(`./images/maleprofile.png`)} className="img-thumbnail img-responsive cartImg" style={{padding:"5px"}}  alt=""/>
                          </div>
                          </div>
                      </p>
                      )}
                     </div>
                    
                    
                     </div>              
                      </div>
                      <hr/>            
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
        invoicecart:store.invoicecart,
        invoicebuyer:store.invoicebuyer,
        invoiceseller:store.invoiceseller
    }
     }
     const mapDispatchToProps=(dispatch)=>{
         return{
             fetchinvoice:(data)=>dispatch(fetchinvoice(data)),
             fetchcartbyinvoiceId:(data)=>dispatch(fetchcartbyinvoiceId(data))
         }
     }
export default connect(mapStateToProps,mapDispatchToProps)(Invoice);