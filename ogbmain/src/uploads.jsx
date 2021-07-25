import React, { Component } from 'react';
import axios from "axios"
import {Link} from "react-router-dom";
import Cookies from "js-cookie"
import querystring from "query-string"
import {fetchsavedItem,unsaveItem} from "./store"
import {connect} from "react-redux"
import "./main.css"

class Uploads extends Component {
    state = { 
        products:[],
        viewrow:"col-6 col-md-4 col-lg-3",
        viewcol:"",
        hoverapp :"",
        view:"",
        unsavingDetail:"",
        displayaskdiv:"none",unsavingDetailId:"",userId:""
     }
    componentDidMount =()=>{
      let mainToken

      if(Cookies.get("cm_pp")){
          const myToken = Cookies.get("cm_pp")
          let myMainTokenlen = parseInt(myToken.split("%")[0])
           let userIdlen = parseInt(myToken.split("%")[1])
           let userIdpos = parseInt(myToken.split("%")[2].charAt(0)+myToken.split("%")[2].charAt(1))
           let userId = myToken.slice(userIdpos, userIdpos+userIdlen)
            mainToken = myToken.slice(userIdpos+userIdlen, myMainTokenlen)
           let userId2 = mainToken.slice(userIdpos, userIdpos+userIdlen)
        this.setState({userId})
        
          }      
          var parsedQuery = querystring.parse(this.props.location.search);
          if(!parsedQuery.view || parsedQuery.view === "grid"){
            this.setState({view:"grid"})
          }else{
            this.setState({view:"list"})
          }
          this.scrollIntoview()
    }
    scrollIntoview=()=>{
      this.uploads.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
    }
    hoverapp=()=>{
      this.setState({hoverapp:"hoveredapp"})
    }
    grid =() =>{
      let currentUrlParams = new URLSearchParams(window.location.search);
      currentUrlParams.set('view',"grid");
      window.location.assign(window.location.pathname +"?"+ currentUrlParams.toString());
    }
    list =() =>{
      let currentUrlParams = new URLSearchParams(window.location.search);
      currentUrlParams.set('view',"list");
      window.location.assign(window.location.pathname +"?"+ currentUrlParams.toString());
    }
   askToUnsave=(data)=>{
     let details= data.split(",")[0]
     let id = data.split(",")[1]
    this.setState({unsavingDetailId:id,unsavingDetail:details,displayaskdiv:"block"})
   }
    unsaveItem =(data)=>{
      this.setState({displayaskdiv:"none"})
     this.props.unsaveItem(data)
     this.props.fetchsavedItem(this.state.userId)
  console.log(this.state.userId)
    }
  
    render() { 
        return ( 
          <div style={{backgroundColor:`${this.props.userdetails.background || "white"}`,color:`${this.props.userdetails.background === "black" ? "white" : "black"}`}}>
            <div className="container" ref={(upload)=> this.uploads =upload}>
                <div className="container-fluid"> 
                     <div className="row" style={{backgroundColor:`${this.props.userdetails.background || "white"}`,zIndex:"2",position:"sticky",top:"35px"}}>               
 <div className="col-5 col-md-6" style={{fontSize:"20px",padding:"10px"}}>                     
                           <small > {this.props.sellerproducts.length > 0 ? "Uploads"  : null}</small>
                               </div>                           
        <div className="col-4 col-m4-3" style={{padding:"10px",display:`${this.props.sellerproducts.length > 0 ? "block" :"none"}`}}>                
               <small style={{fontSize:"12px",fontWeight:"bold"}} className="text-muted"> (1-{this.props.sellerproducts.length}) of {this.props.sellernumOfRows} items</small>
                               </div>                                          
               <div style={{padding:"10px",display:`${this.props.sellerproducts.length > 0 ? "block" :"none"}`}}>
              <i class="fa fa-th" style={{color:`${this.state.view === "grid"  ? "rgb(0, 119, 179)" : this.props.userdetails.background === "black" ? "white" : "black"}`}} onClick={this.grid}></i>
              </div>
              <div style={{padding:"10px",display:`${this.props.sellerproducts.length > 0 ? "block" :"none"}`}}>
              <i class="fa fa-grip-vertical" style={{color:`${this.state.view === "list" ? "rgb(0, 119, 179)" : this.props.userdetails.background === "black" ? "white" : "black"}`}} onClick={this.list}></i>
              </div>
              <div style={{padding:"10px",fontSize:"20px"}}>
              <a href={`/user/productupload`}><i class="fa fa-upload" style={{color:`green`}} onClick={this.list}></i></a>
              </div>
              </div>

              <div className="savemodaldiv" ref={(a) => this.savemodaldiv =a} id="savemodaldiv" style={{display:`${this.state.displayaskdiv}`,zIndex:"1",width:"100%",height:"100%",backgroundColor:"rgba(0,0,0,0.4)"}}>
              <div className="savediv"  style={{backgroundColor:"white"}}>
              <center>
               <h5 style={{padding:"50px"}}>
               {"Unsave " +this.state.unsavingDetail}
               </h5>
               <div className="row" style={{padding:"10px"}}>  
                    <div className="col-6">  
               <button className="btn btn-danger" onClick={()=>this.setState({displayaskdiv:"none"})} style={{boxShadow:"2px 3px lightgrey",padding:"8px",color:"white",width:"100%"}} type="button">Cancel</button> 
               </div>
               <div className="col-6">
              <button className="btn btn-success" onClick={()=>this.unsaveItem(this.state.unsavingDetailId)} style={{padding:"8px",color:"white",width:"100%",boxShadow:"2px 3px lightgrey"}} >Proceed</button>
              </div>         
               </div>
     </center>
     </div>
 </div>
     <div className="row" style={{backgroundColor:`${this.props.userdetails.background==="black"?"rgb(38,38,38)":"rgb(242,242,242)"}`}}>
       {this.props.sellerproducts.length > 0 ? this.props.sellerproducts.map((product) =>          
 <div className="col-6 col-md-4 col-lg-2 rowclass"  style={{display:`${this.state.view==="grid" ? "block" : "none"}`,padding:"3px"}}  key={product.productId} >        
      <div className="col-12">
          <span onClick={()=>this.askToUnsave(`${product.details},${product.productId}`)} className="text-danger fa fa-trash" style={{fontSize:"20px",position:"absolute",top:"10px"}}></span>
        </div>
         <div onMouseOver={this.hoverapp} className={`${this.state.hoverapp} unhoveredapp`} style={{backgroundColor:`${this.props.userdetails.background || "white"}`,color:`${this.props.userdetails.background === "black" ? "white" : "black"}`,padding:"5px"}}>
          <div>
            <center>
            <img className="mainImg img-responsive" src={`https://res.cloudinary.com/fruget-com/image/upload/${product.generalcategory}/${product.category}/${product.mainimg || 'emptyimg.jpg'}`} ></img>
            </center>
          </div>
          <div> 
<small style={{float:"left",width:"100%",textTransform:"capitalize"}}>{product.brand}</small>
           <div className="detaildiv" style={{lineHeight:"16px"}}> 
            <div  className="details"> 
     <small onClick={()=>this.openDetails(product.productId)} style={{color:`${this.props.userdetails.background === "black" ? "white" : "black"}`,fontSize:"11px"}}>
       {product.details.length > 40 ? product.details.slice(0,40)+ "..." : product.details +"-"+ product.model +"-"+ product.color}</small>  
        </div> 
        <small style={{fontWeight:"bold",fontSize:"14px"}}>{product.mainprice || "₦10,000"}</small> <br/>
       <div><small class="text-muted" style={{textDecoration:"line-through",fontSize:"12px"}}>{product.discount ? product.mainprice : null}</small><b className="badge" style={{fontSize:"12px",fontWeight:"bolder",color:"rgba(0, 119, 179)",backgroundColor:"rgba(0, 119, 179,0.1)",float:"right"}}>{product.discount ? `-${product.discount}%` : null}</b></div> 
       <div>
       <div className="outer">     
          <div className="inner" style={{width:`${product.productrating*20}%`}}>    
          </div> 
          </div>  <small style={{fontSize:"12px"}}>({product.numofrating}) </small></div> 
          <small className="text-muted" style={{letterSpacing:"-1px",textTransform:"capitalize",fontSize:"10px"}}><b style={{color:"orange"}}>{product.store}</b> @ <span className="fa fa-map-marker-alt"></span>{product.lga}</small>
          <div style={{display:"none"}}><img src={require(`./images/fruget.jpg`)} className="imgSymbol" style={{float:"right"}}></img></div>
         </div>
         
        <center   style={{display:`${window.innerWidth >= 600 ? this.state.viewaddtocartbutton : `none`}`,width:`${this.state.viewcartbtnwidth}`}}>
       <br/>
        {this.props.userdetails.userId == this.state.userId ? 
        <button  type="button" ref={this.detailsRef} className="btn addtocartbtn" onClick={()=>this.addtocart(product.productId)}>
         <small>
        <span className="fa fa-edit" style={{color:"white"}}></span>  Edit Product ({product.productId})
         </small>
         </button>
   :  
   <div >    
   <button  type="button" style={{padding:"0px",width:"70%"}} ref={this.detailsRef} className="btn addtocartbtn" onClick={()=>this.addtocart(product.productId)}>
   <small style={{fontSize:"12px"}}>Add to cart</small>
   </button>
    
   <button  type="button"  style={{backgroundColor:"orange",padding:"0px 6px",width:"30%"}} ref={this.detailsRef} className="btn addtocartbtn" onClick={()=>this.addtocart(product.productId)}>
   <small style={{fontSize:"12px"}}>Save</small>
   </button> 
   <br/>
   </div>
   }
        <br/>
        </center>
        </div>      
        </div>
           </div> 
         ): 
          null
           }
      </div>

      {this.props.sellerproducts.length === 0 && !this.props.loading  ?
                    <div className="row" style={{height:"100%"}}>
                      <div className="col-12">
                       <center>
<small className="text-warning" style={{fontSize:"35px",fontWeight:"bolder"}}>o</small><small className="text-warning" style={{fontSize:"30px",fontWeight:"bolder"}}>o</small>
<small className="text-warning" style={{fontSize:"25px",fontWeight:"bolder"}}>p</small><small className="text-warning" style={{fontSize:"25px",fontWeight:"bolder"}}>s!</small><br/>
                         <span className="fa fa-frown-o text-warning" style={{fontSize:"150px"}}></span>
                         <span className="fa fa-upload text-danger" style={{fontSize:"80px"}}></span>
                         <p className="text-warning" style={{fontStyle:"italics",fontWeight:"bold"}}>Dear user, You have not uploaded any item yet...</p><br/>
                         <small className="text-muted" style={{fontWeight:"bolder"}}>Click <button className="btn btn-warning" style={{padding:"2px",color:"white"}}>Continue</button> to navigate to upload Page</small>
                       </center>
                      </div>
                    </div> 
                    :null}


      <div className="row" style={{backgroundColor:`${this.props.userdetails.background || "white"}`,color:`${this.props.userdetails.background === "black" ? "white" : "black"}`,padding:"0px"}}>
       {this.props.sellerproducts.length > 0 ? this.props.sellerproducts.map((product) =>          
       <div className="col-12  rowclasslist" onMouseOver={this.hoverapp}  style={{display:`${this.state.view==="list" ? "block" : "none"}`,padding:"3px",margin:"2px 0px"}}  key={product.productId} >        
      <div className="row">
      <div className="col-12" style={{zIndex:"2",position:"absolute",top:"3px",left:"0px"}}>
          <span className="text-danger fa fa-trash" style={{fontSize:"20px"}}></span>
        </div>
          <div className="col-5 col-md-4 col-lg-3">
            <center>
            <img className="mainImg img-responsive" src={`https://res.cloudinary.com/fruget-com/image/upload/${product.generalcategory}/${product.category}/${product.mainimg || 'emptyimg.jpg'}`} ></img>
            </center>
          </div>
          <div className="col-7">
          <small style={{float:"left",width:"100%",textTransform:"capitalize"}}>{product.brand}</small>
           <div className="detaildiv" style={{lineHeight:"16px"}}> 
            <div  className="details"> 
     <small onClick={()=>this.openDetails(product.productId)} style={{color:`${this.props.userdetails.background === "black" ? "white" : "black"}`,fontSize:"13px"}}>
       {product.details}
       </small>  
        </div> 
        <small style={{fontWeight:"bold",fontSize:"14px"}}>{product.mainprice}</small> <br/>
       <div><small class="text-muted" style={{textDecoration:"line-through",fontSize:"12px"}}>{product.discount ? product.mainprice : null}</small><b className="badge" style={{fontSize:"12px",fontWeight:"bolder",color:"rgba(0, 119, 179)",backgroundColor:"rgba(0, 119, 179,0.1)",float:"right"}}>{product.discount ? `-${product.discount}%` : null}</b></div> 
       {product.numOfRating > 0 ?
       <div>
         <div className="outer">     
          <div className="inner" style={{width:`${product.percentrating}%`}}>   
          </div> 
          </div>  <small style={{fontSize:"12px"}}>({product.numOfRating || 0}) </small></div> : null }
          <small className="text-muted" style={{letterSpacing:"-1px",textTransform:"capitalize",fontSize:"10px"}}><b style={{color:"orange"}}>{product.store}</b> @ <span className="fa fa-map-marker-alt"></span>{product.lga}</small>
          <div style={{display:"none"}}><img src={require(`./images/fruget.jpg`)} className="imgSymbol" style={{float:"right"}}></img></div>
         </div>
        <center   style={{display:`${window.innerWidth >= 600 ? this.state.viewaddtocartbutton : `none`}`}}>
        <br/>
        <button  type="button" ref={this.detailsRef} className="btn addtocartbtn" onClick={()=>this.addtocart(product.productId)}>
         <small>
         <span className="fa fa-edit" style={{color:"white"}}></span>  Edit Product ({product.productId})
         </small>
         </button><br/>
        </center>
        </div>
        </div>
        </div>
      
         ): 
         <center>
        <br/><br/><br/><br/>
           <p>Click <Link>Here</Link> to navigate to Our Shop display page</p> 
         </center>
           }
                       </div>
                   </div>
                </div>
           </div>
         );
    }
}  
const mapStateToProps =(store)=>{
  return{           
    sellerproducts:store.sellerproducts,
    sellernumOfRows:store.sellernumOfRows,
    userdetails:store.userdetails,
    loading:store.loading
   }
}
const mapDispatchToProps =(dispatch)=>{
 return{

 }
}
export default connect(mapStateToProps,mapDispatchToProps)(Uploads);