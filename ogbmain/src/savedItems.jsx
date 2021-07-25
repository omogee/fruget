import React, { Component } from 'react';
import axios from "axios"
import {Link} from "react-router-dom";
<<<<<<< HEAD
import Cookies from "js-cookie"
import querystring from "query-string"
import {fetchsavedItembyemail,fetchsavedItembyuserId,unsaveItem,unloading} from "./store"
import {connect} from "react-redux"
=======
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
import "./main.css"

class SavedItems extends Component {
    state = { 
        products:[],
<<<<<<< HEAD
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
         this.props.fetchsavedItembyuserId()
          }      
          var parsedQuery = querystring.parse(this.props.location.search);
          if(!parsedQuery.view || parsedQuery.view === "grid"){
            this.setState({view:"grid"})
          }else{
            this.setState({view:"list"})
          }
          this.scrollIntoview()
    }
    componentDidUpdate=(prevProps)=>{
      if(prevProps.savedProducts !== this.props.savedProducts){
        setTimeout(()=> this.props.unloading(),2000) 
      }
    }
    scrollIntoview=()=>{
      this.SavedItems.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
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
    this.setState({unsavingDetailId:id,unsavingDetail:details}, ()=>{
      this.setState({displayaskdiv:"block"})
    })
   }
    unsaveItem = async (data)=>{
      this.setState({displayaskdiv:"none"})
    await this.props.unsaveItem(data)
    this.fetchsavedItem()
    }
    fetchsavedItem =()=>{
      this.props.fetchsavedItembyemail(this.props.match.params.email)
    }
  
    render() { 
      console.log(this.props.savedProducts, "products")
        return ( 
          <div style={{backgroundColor:`${this.props.userdetails.background || "white"}`,color:`${this.props.userdetails.background === "black" ? "white" : "black"}`}}>
            <div className="container">
                <div className="container-fluid" ref={(el)=> this.SavedItems= el}>
                   


              <div className="row" style={{backgroundColor:`${this.props.userdetails.background || "white"}`,zIndex:"2",position:"sticky",top:"35px"}}>               
 <div className="col-5 col-md-6" style={{fontSize:"20px",padding:"10px"}}>                     
                           <small > {this.props.savedProducts.length > 0 ? `Saved Items (${this.props.savedProducts.length})`  : null}</small>
                               </div>                           
        <div className="col-4 col-md-3" >                
              
                               </div>                                          
               <div style={{padding:"10px",display:`${this.props.savedProducts.length > 0 ? "block" :"none"}`}}>
              <i class="fa fa-th" style={{color:`${this.state.view === "grid"  ? "rgb(0, 119, 179)" : this.props.userdetails.background === "black" ? "white" : "black"}`}} onClick={this.grid}></i>
              </div>
              <div style={{padding:"10px",display:`${this.props.savedProducts.length > 0 ? "block" :"none"}`}}>
              <i class="fa fa-grip-vertical" style={{color:`${this.state.view === "list" ? "rgb(0, 119, 179)" : this.props.userdetails.background === "black" ? "white" : "black"}`}} onClick={this.list}></i>
              </div>
              <div style={{padding:"10px",fontSize:"20px"}}>
              <span className="fa fa-cloud" style={{color:"orange"}}></span>
              </div>
              </div>


              <div className="savemodaldiv" ref={(a) => this.savemodaldiv =a} id="savemodaldiv"
               style={{display:`${this.state.displayaskdiv}`,zIndex:"1",width:"100%",height:"100%",backgroundColor:"rgba(0,0,0,0.4)"}}>
              <div className="savediv" style={{padding:"5px",border:"1px solid lightgrey",backgroundColor:`${this.props.userdetails.background || "rgba(0,0,0,0.4)"}`}}>
              <span className="fa fa-times"  onClick={()=>this.setState({displayaskdiv:"none"})} style={{float:"right"}}></span>
              <center>
               <h5 style={{padding:"40px"}}>
               <span style={{color:"red"}}>Unsave</span> <br/>
               {`" ${this.state.unsavingDetail} "`}
               </h5>
               <div className="row" style={{padding:"10px"}}>  
                    <div className="col-6">  
               <button className="btn btn-danger" onClick={()=>this.setState({displayaskdiv:"none"})} style={{boxShadow:"2px 3px lightgrey",padding:"8px",color:"white",width:"100%"}} type="button">
                 Cancel</button> 
               </div>
               <div className="col-6">
              <button className="btn btn-success" onClick={()=>this.unsaveItem(this.state.unsavingDetailId)} style={{padding:"8px",color:"white",width:"100%",boxShadow:"2px 3px lightgrey"}} >
                Proceed</button>
              </div>         
               </div>
     </center>
     </div>
 </div> 
     <div className="row"  style={{backgroundColor:`${this.props.userdetails.background==="black"?"rgb(38,38,38)":"rgb(242,242,242)"}`}}>
       {this.props.savedProducts.length > 0 ? this.props.savedProducts.map((product) =>          
 <div className="col-6 col-md-4 col-lg-2 rowclass"  style={{display:`${this.state.view==="grid" ? "block" : "none"}`,padding:"3px"}}  key={product.productId} >        
    {parseInt(this.state.userId) === this.props.userdetails.userId ? 
      <div className="col-12">
          <span onClick={()=>this.askToUnsave(`${product.details},${product.productId}`)} className="text-danger fa fa-times-circle" style={{fontSize:"20px",position:"absolute",top:"10px"}}></span>
        </div>
        : null}
         <div onMouseOver={this.hoverapp} className={`${this.state.hoverapp} unhoveredapp`} style={{backgroundColor:`${this.props.userdetails.background || "white"}`,color:`${this.props.userdetails.background === "black" ? "white" : "black"}`,padding:"5px"}}>
          <div>
            <center>
            <img className="mainImg img-responsive" src={`https://res.cloudinary.com/fruget-com/image/upload/${product.generalcategory}/${product.category}/${product.mainimg || 'emptyimg.jpg'}`} ></img>
            </center>
          </div>
          <div> 
<small style={{float:"left",width:"100%",textTransform:"capitalize"}}>{product.brand}</small>
           <div className="detaildiv" style={{lineHeight:"16px",color:"white"}}> 
            <div  className="details"> 
   
     <small onClick={()=>this.openDetails(product.productId)} style={{fontSize:"11px",color:`${this.props.userdetails.background === "black" ? "white" : "black"}`}}>
       {product.details.length > 40 ? product.details.slice(0,40)+ "..." : product.details +"-"+ product.model +"-"+ product.color}</small>  
        </div> 
        <small style={{fontWeight:"bold",fontSize:"14px"}}>{product.mainprice}</small> <br/>
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
        <button  type="button" ref={this.detailsRef} className="btn addtocartbtn" onClick={()=>this.addtocart(product.productId)}>
         <small>
         ADD TO CART
         </small>
         </button><br/>
        </center>
        </div>
      
        </div>
           </div> 
         ): 
         <center>
          
         </center>
           }
                       </div>
                    
                       <div className="row" style={{backgroundColor:`${this.props.userdetails.background || "white"}`,padding:"0px"}}>
                       {this.props.savedProducts.length > 0 ? this.props.savedProducts.map((product) =>          
           <div className="col-12  rowclasslist"  style={{boxShadow:"0px",display:`${this.state.view==="list" ? "block" : "none"}`,padding:"3px",margin:"2px 0px"}}  key={product.productId} >        
      <div className="row">
      {parseInt(this.state.userId) === this.props.userdetails.userId ? 
      <div className="col-12">
          <span onClick={()=>this.askToUnsave(`${product.details},${product.productId}`)} className="text-danger fa fa-times-circle" style={{fontSize:"20px",position:"absolute",top:"10px"}}></span>
        </div>
        : null}
          <div className="col-5 col-md-4 col-lg-3">
            <center>
            <img className="mainImg img-responsive" src={`https://res.cloudinary.com/fruget-com/image/upload/${product.generalcategory}/${product.category}/${product.mainimg || 'emptyimg.jpg'}`} ></img>
            </center>
          </div>
          <div className="col-7">
<small style={{float:"left",width:"100%",textTransform:"capitalize"}}>{product.brand}</small>
           <div className="detaildiv" style={{lineHeight:"16px"}}> 
            <div  className="details"> 
   
     <small onClick={()=>this.openDetails(product.productId)} style={{fontSize:"11px",color:`${this.props.userdetails.background === "black" ? "white" : "black"}`}}>
       {product.details.length > 40 ? product.details.slice(0,40)+ "..." : product.details +"-"+ product.model +"-"+ product.color}</small>  
        </div> 
        <small style={{fontWeight:"bold",fontSize:"14px"}}>{product.mainprice}</small> <br/>
       <div><small class="text-muted" style={{textDecoration:"line-through",fontSize:"12px"}}>{product.discount ? product.mainprice : null}</small><b className="badge" style={{fontSize:"12px",fontWeight:"bolder",color:"rgba(0, 119, 179)",backgroundColor:"rgba(0, 119, 179,0.1)",float:"right"}}>{product.discount ? `-${product.discount}%` : null}</b></div> 
        <div>
       <div className="outer">     
          <div className="inner" style={{width:`${product.productrating*20}%`}}>    
          </div> 
          </div>  <small style={{fontSize:"12px"}}>({product.numofrating}) </small></div> 
          <small className="text-muted" style={{letterSpacing:"-1px",textTransform:"capitalize",fontSize:"10px"}}><b style={{color:"orange"}}>{product.store}</b> @ <span className="fa fa-map-marker-alt"></span>{product.lga}</small>
          <div style={{display:"none"}}><img src={require(`./images/fruget.jpg`)} className="imgSymbol" style={{float:"right"}}></img></div>
         </div>
         
        <center   style={{display:`${window.innerWidth >= 600 ? this.state.viewaddtocartbutton : `none`}`}}>
        <br/>
        <button  type="button" ref={this.detailsRef} className="btn addtocartbtn" onClick={()=>this.addtocart(product.productId)}>
         <small>
         ADD TO CART
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
    savedProducts:store.savedProducts,
    loading:store.loading,
    userdetails:store.userdetails
   }
}
const mapDispatchToProps =(dispatch)=>{
 return{
  unsaveItem:(data)=>dispatch(unsaveItem(data)),
  fetchsavedItembyemail :(data)=>dispatch(fetchsavedItembyemail(data)),
  fetchsavedItembyuserId :()=>dispatch(fetchsavedItembyuserId()),
  unloading:()=>dispatch(unloading())
 }
}
export default connect(mapStateToProps,mapDispatchToProps)(SavedItems);
=======
        viewrow:"col-6 col-md-4 col-lg-2",
        viewcol:""
     }
    componentDidMount =()=>{
      if(!this.props.match){
        var userId =  localStorage.getItem("id");
      }else{
        let userId = this.props.match.params.userId;
        userId= userId.split(",")[1] 
      }
        axios.get(`http://fruget.herokuapp.com/customer/${userId}/saveditems`)
        .then(res =>{
        if(res.data.message){
          this.setState({products:res.data.files})
        }else{
          console.log("sorry dad")
        }
        })
        .catch(err => console.warn(err))
    }
    render() { 
      console.log(this.state)
        return ( 
            <div>
                <div className="container">
                   <h1>{ this.state.products === [] ? " No Saved Items" : "Saved Items"}</h1>
                   <div className="row">                   
                       <div className="col-12">
                         <div className="row">
                       {this.state.products.map((product) =>          
           <div className={`${this.state.viewrow} rowclass`}   key={product.productId} >         
          <div className={`${this.state.viewcol}`}>
            <img className="mainImg img-responsive" src={require (`./images/${product.mainimg}`)} style={{maxWidth:"100%"}} ></img>
          </div>
          <div className={`${this.state.viewcol}`}> 
        <small style={{float:"left"}}>{product.brand} </small><br/>
           <small style={{height:"30px"}}>
            <div  className="details">
    <Link to ={`/product/${product.details}`} style={{color:'black'}}>
       {product.details.length > 50 ? product.details.slice(0,50)+ "..." : product.details +"-"+ product.model +"-"+ product.color}
       </Link>
        </div>
        <b>{product.mainprice}</b><br/>
        <div className="outer">  
          <div className="inner" style={{width:`${product.percentrating || 0}%`}}>

          </div>
        </div> <small style={{fontSize:"12px"}}>({product.numOfRating || 0})</small>
         </small>
        <br/><br/>
        <center style={{display:"none"}}>
        <button type="button" onClick={()=>this.addtocart(product.productId)} style={{width: "100%",backgroundColor:"rgba(0, 119, 179,0.9)",borderRadius:"5px",padding: "1px",color:"white"}}>
         <span style={{fontWeight:"bold"}}>ADD TO CART</span></button>
        </center>
        <br/>
        </div>
           </div> 
           
         )}
                       </div>
                   </div>
                </div>
                </div>
            </div>
         );
    }
}
 
export default SavedItems;
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
