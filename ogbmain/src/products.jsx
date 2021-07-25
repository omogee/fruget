import React, { Component, lazy, Suspense} from 'react';
//import App from "./App"
import {connect} from "react-redux"
import {Redirect} from "react-router-dom"
import Sidenavbar from "./sidenavbar"
 //const App =lazy(()=>import("./App"))
 import Header from "./productheader"
 import "./main.css"
 import querystring from "query-string"
 
 const App = lazy(() => {
    return Promise.all([
      import("./App"),
      new Promise(resolve => setTimeout(resolve, 10000))
    ])
    .then(([moduleExports]) => moduleExports);
  });
 
class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
     
    render() { 
        if(this.props.redirect){
            return <Redirect to={{ pathname: '/customer/login',state: { from: this.props.location }}} />
}
const parsedQuery = querystring.parse(this.props.location.search);
  let view;
  if(!parsedQuery.view || parsedQuery.view === "grid"){
   view = "grid"
  }else{
    view = "list"
  }
if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    return ( 
       <div className="navbarcomponentlg">
            <div className={"contain"}>
                <div className="row">
                    <div className="col-12">
                        <Header  category={this.props.match.params.category}/>
                    </div>
                </div>
            <div className="row" >
                <div className={!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? "col-3" :"d-none"} style={{padding:"5px"}}>
                   <Sidenavbar category={this.props.match.params.category} />
                </div>
                <div className={!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ?"col-9":"col-12"} style={{padding:"5px"}}>
                    <Suspense style={{padding:"10px"}} fallback={
                                new Array(8).fill("lalala").map((product) =>          
                                   <div className="col-12 col-md-6 col-lg-3 rowclass"  style={{display:`${view === "grid" ? "inline-block" : "none"}`,width:"100%",padding:"3px"}}  key={product.productId} >        
                                 
                                   <div  className={`hoveredapp unhoveredapp`} style={{backgroundColor:`${this.props.userdetails.background || "white"}`,padding:"5px"}}>
                                  <div>
                                    <center>
                                   
                                    <div className="mainImg img-responsive" style={{backgroundColor:"rgba(242,242,242,0.6)"}} data-src={`https://res.cloudinary.com/fruget-com/image/upload/${product.generalcategory}/${product.category}/${product.mainimg || 'emptyimg.jpg'}`} ></div>
                                    </center>
                                  </div>
                                  <div> 
                        <div className="row" style={{width:"100%"}}>
                        <div className="col-12">
                        <small style={{float:"left"}}>{product.brand}</small>
                        <small style={{float:"right",color:`${product.viewrating > 0 ? "orange" : "grey"}`}}>{product.viewrating}</small>
                        </div>
                          </div>
                            <div className="detaildiv" style={{lineHeight:"16px"}}> 
                            <br/>
                            <div  className="details" style={{backgroundColor:"rgba(242,242,242,0.6)",width:"90%",height:"30px"}}>  
                             <small className="detailtext" onClick={()=>this.openDetails(product.productId)} style={{color:`${this.props.userdetails.background === "black" ? "white" : this.props.userdetails.background === "white"?"black" : "black"}`,display:`${this.state.griddetails}`,fontSize:"11px"}}></small>  
                                </div> 
                                <small style={{fontWeight:"bold",fontSize:"14px"}}>{product.mainprice}</small> <br/>
                               <div><small class="text-muted" style={{textDecoration:"line-through",fontSize:"12px"}}>{product.discount ? product.mainprice : null}</small><b className="badge" style={{fontSize:"12px",fontWeight:"bolder",color:"rgba(0, 119, 179)",backgroundColor:"rgba(0, 119, 179,0.1)",float:"right"}}>{product.discount ? `-${product.discount}%` : null}</b></div> 
                               <div style={{backgroundColor:"rgba(242,242,242,0.6)",height:"40px",width:"100%",color:"rgba(242,242,242,0.6)"}}>
                                 <div >     
                                  <div  style={{width:`${product.productrating*20}%`}}>    
                                  ..........
                                  </div> 
                                  </div>  <small style={{fontSize:"12px"}}>{product.numofrating} </small>
                                  <small style={{fontStyle:"italic",float:"right",fontSize:"11px"}}></small></div> 
                                  <small className="text-muted" style={{letterSpacing:"-1px",textTransform:"capitalize",fontSize:"10px"}}>.</small>
                                  <div style={{display:"none"}}><img src={require(`./images/fruget.jpg`)} className="imgSymbol" style={{float:"right"}}></img></div>
                                 </div>       
                                <center className={`${view}`} >
                              
                                <button  type="button" ref={this.detailsRef} className="btn addtocartbtn" onClick={()=>this.addtocart({productId:product.productId,color:product.color})}>
                                 <small>
                                 ADD TO CART
                                 </small>
                                 </button>
                                </center>
                            
                                </div>     
                                </div> 
                          </div> 
                                )}>
                <App category={this.props.match.params.category}/>
                </Suspense>
                </div>
            </div>
        </div>
       </div>
     );
}else{
    return ( 
        <div className={"container"}>
            <div className="row" >
                <div className={!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? "col-5 col-md-4 col-lg-3" :"d-none"} style={{padding:"5px"}}>
                   <Sidenavbar category={this.props.match.params.category} />
                </div>
                <div className={!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ?"col-7 col-md-8 col-lg-9":"col-12"} style={{padding:"5px"}}>
                    <Suspense style={{padding:"10px"}} fallback={
                         <div className="row">
                             <center>
                             <h1 style={{padding:"50px"}}>Fetching Products...</h1>
                             </center>
                         </div>
                    }>
                <App category={this.props.match.params.category}/>
                </Suspense>
                </div>
            </div>
        </div>
     );
}
      
    }
}
const mapStateToProps =(store)=>{
    return{           
     following:store.following,
     sellerdetails:store.sellerdetails,
     userdetails:store.userdetails,
     redirect:store.redirect

     }
  }
 
export default connect(mapStateToProps)(Products);