import React, { Component } from 'react';
import {fetchcartbyinvoiceId} from "./store"
import querystring from "query-string"
import {connect} from "react-redux"

class GroupedInvoiceDetails extends Component {
    constructor(props) {
        super(props);
        this.state = { 

         }
    }
    componentDidMount=()=>{
        const parsedQuery = querystring.parse(this.props.location.search);
        this.props.fetchcartbyinvoiceId(parsedQuery.invoiceId)
    }
    render() { 
        console.log(this.props.invoicecart)
        return ( 
            <div>
            <div className="container">
                <div className="row" style={{padding:"20px",backgroundColor:"white",boxShadow:"2px 3px 5px 2px lightgrey"}}>
             <div className="col-12" style={{padding:"20px"}}> 
             <h1>
                  <center>
                      Invoice 
                        {this.props.invoicecart.length > 0 ?
                   <small><span className="fa fa-shopping-cart" style={{color:"orange",padding:"3px"}}> ({this.props.invoicecart.length})</span></small> 
                    : null}
                  </center>
              </h1>
             </div>
          
          <div className="row">
             <div className="col-12">  
             <div className="row">
                 <div className="col-12 col-md-6">
                 {this.props.invoicebuyer.map((buyer)=>
                  <p key={buyer.userId}>
                      <b>BUYER : </b> {buyer.fullName} <br/><br/>
                      <b>Contact : </b> {buyer.contact} / {buyer.contactTwo} <br/> <br/>             
                      <b>bus-stop : </b> {buyer.bustop}  <br/><br/>
                      <b>Address :</b> {buyer.address} <br/><hr/>
                  </p>
                  )}

{this.props.invoiceseller.map((Vendor)=>
                  <p key={Vendor.userId}>
                      <b>Vendor : </b> {Vendor.businessName} <br/><br/>
                      <b>Contact : </b> {Vendor.contact} / {Vendor.contactTwo} <br/> <br/> 
                      <b>Rating : </b> <div className="outer">     
                      <div className="inner" style={{width:`65%`}}>  
                     </div> 
                     </div>  <br/><br/>
                   <b>Number Of verified sales : </b> 21<br/><br/>            
                      <b>bus-stop : </b> {Vendor.bustop}  <br/><br/>
                      <b>Address :</b> {Vendor.address} <br/><hr/>
                  </p>
                  )}
                 </div>
                
                 <div className="col-12 col-md-6">
                    
                      {this.props.invoicecart.map((cart)=>
                  <p key={cart.id}>   
                  <b>Product :</b>  {cart.details}  <br/>    
                       <div className="row">
                           <div className="col-7 col-md-8">
                     <b>Color :</b> {cart.color} <br/>
                    <b>Code :</b> cart0000{cart.id} <br/>
                    <b>Price :</b> {cart.mainprice} <br/>
                    <b>Quantity :</b> {cart.quantity} <br/>
                    <b>Amount :</b> <b>{cart.subtotal}</b> <br/> 
                    <b>Date :</b> {cart.dateoforder.split("T")[0]} <br/>
                    <b>Time :</b> {cart.dateoforder.split("T")[1]} <br/> 
                    <b>Status :</b> Pending  <hr/>
                           </div>
                           <div className="col-5 col-md-4">
<img  src={`https://res.cloudinary.com/fruget-com/image/upload/${cart.generalcategory}/${cart.category}/${cart.mainimg}`} style={{padding:"3px"}} className="img-responsive cartImg"></img> 
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
const mapStateToProps=(store)=>{
    return{
        invoicecart:store.invoicecart,
        invoicebuyer:store.invoicebuyer,
        invoiceseller:store.invoiceseller
    }
     }
     const mapDispatchToProps=(dispatch)=>{
         return{
            fetchcartbyinvoiceId:(data)=>dispatch(fetchcartbyinvoiceId(data))
         }
     }
export default connect(mapStateToProps,mapDispatchToProps)(GroupedInvoiceDetails);