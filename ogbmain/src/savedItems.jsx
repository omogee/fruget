import React, { Component } from 'react';
import axios from "axios"
import {Link} from "react-router-dom";
import Cookies from "js-cookie"
import querystring from "query-string"
import {fetchsavedItembyemail,fetchsavedItembyuserId,unsaveItem,unloading} from "./store"
import {connect} from "react-redux"
import "./main.css"
import {formater} from "./formatTime"


class SavedItems extends Component {
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
  alert(this.props.match.params.compass)
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
   //  this.SavedItems.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
    }
    hoverapp=()=>{
      this.setState({hoverapp:"hoveredapp"})
    }
    grid =() =>{
      let currentUrlParams = new URLSearchParams(window.location.search);
      currentUrlParams.set('view',"grid");
      this.props.history.push(window.location.pathname +"?"+ currentUrlParams.toString());
    }
    list =() =>{
      let currentUrlParams = new URLSearchParams(window.location.search);
      currentUrlParams.set('view',"list");
      this.props.history.push(window.location.pathname +"?"+ currentUrlParams.toString());
    }
   askToUnsave=(data)=>{
     let details= data.details
     let id = data.id
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
      this.props.fetchsavedItembyuserId()
    }
  
    render() { 
      const preloadcartimage =(img)=>{
        img.src=require("./images/cart.png")
    }
   const preloadImage=(img)=>{
     const src = img.getAttribute("data-src")
     if(!src){
       return;
     }
     img.src=src
   }
   let options ={
        root:null,
        rootMargin:"2px",
        threshold:0.25
      }
      let imgObserver = new IntersectionObserver((entries,imgObserver)=>{
         entries.map(entry =>{
           if(!entry.isIntersecting){
             preloadcartimage(entry.target)
        //     imgObserver.unobserve(entry.target)
             //return;
           }else{
             preloadImage(entry.target);
             imgObserver.unobserve(entry.target)
           }
         })
      },options)
      const images = document.querySelectorAll("[data-src]")
images.forEach(image=>{
 imgObserver.observe(image)
})

      const parsedQuery = querystring.parse(this.props.location.search);
      let view;
      if(!parsedQuery.view || parsedQuery.view === "grid"){
       view = "grid"
      }else{
        view = "list"
      }
  
      console.log(this.state.unsavingDetail, "products")
      if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        return (       
                <div style={{display:`${this.props.appDisplay}`,backgroundColor:`${this.props.userdetails.background==="black"?"rgb(38,38,38)":"rgb(242,242,242)"}`}}>
<div  className="container-fluid" style={{backgroundColor:`${this.props.userdetails.background || "white"}`}}> 
                 {this.props.savedProducts.length > 0 ?              
              
            <div className='row'  style={{padding:"2px"}}>
              <div className="col-12" style={{backgroundColor: `${this.props.userdetails.background ==="black" ?"black" : "#f5f5f0" }`}}>                                   
              <div  style={{display:"flex",flexWrap:"nowrap",backgroundColor:`${this.props.userdetails.background || "white"}`,zIndex:"2",position:"sticky",top:"35px"}}>               
 <div  style={{fontSize:"20px",padding:"10px",width:"70%"}}>                     
                           <small > {this.props.savedProducts.length > 0 ? `Saved Items (${this.props.savedProducts.length})`  : null}</small>
                               </div>                                                                  
               <div style={{width:"10%",padding:"10px",display:`${this.props.savedProducts.length > 0 ? "block" :"none"}`}}>
              <i class="fa fa-th" style={{color:`${view === "grid"  ? "rgb(0, 119, 179)" : this.props.userdetails.background === "black" ? "white" : "black"}`}} onClick={this.grid}></i>
              </div>
              <div style={{width:"10%",padding:"10px",display:`${this.props.savedProducts.length > 0 ? "block" :"none"}`}}>
              <i class="fa fa-grip-vertical" style={{color:`${view === "list" ? "rgb(0, 119, 179)" : this.props.userdetails.background === "black" ? "white" : "black"}`}} onClick={this.list}></i>
              </div>
              <div style={{width:"10%",padding:"10px",fontSize:"20px"}}>
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
 
               {view === "grid" ? this.props.savedProducts.map((product) =>          
               <div className="col-6 col-md-3 col-lg-2 mb-1"  style={{marginBottom:"0px",width:"100%",padding:"1px",display:"inline-block"}}  key={product.productId} >        
               <div className={`${this.state.hoverapp} savedsmhoveredapp`} style={{boxShadow:"1px 2px 5px 2px lightgrey",backgroundColor:`${this.props.userdetails.background || "white"}`,padding:"5px"}}>
              <div>
              <span onClick={()=>this.askToUnsave({details:product.details,id:product.productId})} className={this.props.userdetails.savedItems && JSON.parse(this.props.userdetails.savedItems).includes(parseInt(product.productId)) ? "fa fa-heart" : "far fa-heart"} style={{position:"absolute",fontSize:"20px",top:"10px",left:"10px", color:"orange"}}></span>
                <center>
                <img className="mainImg img-responsive"  data-src={`https://res.cloudinary.com/fruget-com/image/upload/${product.generalcategory}/${product.category}/${product.mainimg || 'emptyimg.jpg'}`} ></img>
                </center>
              </div>
              <div> 
    <div className="row" style={{width:"100%"}}>
    <div className="col-12">
    <small style={{float:"left"}}>{product.brand}</small>
    <small style={{float:"right",color:`${product.viewrating > 0 ? "orange" : "grey"}`}}><span className="fa fa-eye" ></span> {product.viewrating}</small>
    </div>
      </div>
    <div className="" style={{lineHeight:"16px"}}> 
     <div  className="details">  
         <small className="detailtext" onClick={()=>this.openDetails({details:product.details,id:product.productId})} style={{color:`${this.props.userdetails.background === "black" ? "white" : this.props.userdetails.background === "white"?"black" : "black"}`,display:`${this.state.griddetails}`,fontSize:"11px"}}>
           {product.details ? product.details : <br/>}</small>  
            </div> 
          
              <small className="text-muted" style={{letterSpacing:"-1px",textTransform:"capitalize",fontSize:"10px"}}><b style={{color:"orange"}}>{product.store}</b> @ <span className="fa fa-map-marker-alt"></span>{product.lga}</small>
              <small style={{fontStyle:"italic",color:"red",float:"right",fontSize:"11px"}}>{formater(product.date)}</small>
             </div>       
            <center className={`${this.state.view}`}  >     
            <button  type="button"  className="btn smaddtocartbtn" onClick={()=>this.addtocart({productId:product.productId,color:product.color})}>
             <small>
             ADD TO CART
         
             </small>
             </button>
            </center>
            </div>    
            </div>      
      </div> 
             ): null}     
                
    
               <div className='row' style={{backgroundColor:`${this.props.userdetails.background || "white"}`,color:`${this.props.userdetails.background === "black" ? "white" : this.props.userdetails.background === "white"?"black" : "black"}`,padding:"2px"}}>   
               {view === "list" ?this.props.savedProducts.map((product) =>
                      
    <div className="col-12" onMouseOver={this.hoverapp}  style={{boxShadow:"1px 2px 5px 2px lightgrey",margin:"2px 0px",padding:"3px"}}  key={product.productId} >               
           <div className="row" style={{padding:"10px"}}>
              <div className="col-5 col-md-4 col-lg-3"  style={{padding:"5px"}}>
              <span onClick={()=>this.askToUnsave({details:product.details,id:product.productId})} className={this.props.userdetails.savedItems && JSON.parse(this.props.userdetails.savedItems).includes(parseInt(product.productId)) ? "fa fa-heart" : "far fa-heart"} style={{position:"absolute",fontSize:"20px",top:"10px",left:"10px", color:"orange"}}></span>
                <center>
                <img className="mainImg img-responsive" data-src={`https://res.cloudinary.com/fruget-com/image/upload/${product.generalcategory}/${product.category}/${product.mainimg || 'emptyimg.jpg'}`} ></img>           
                </center>
                <div className="row" style={{width:"100%"}}>
    <div className="col-12 d-md-none">
    <small style={{float:"left"}}>{product.brand}</small>
    <small style={{float:"right",color:`${product.viewrating > 0 ? "orange" : "grey"}`}}><span className="fa fa-eye" ></span> {product.viewrating}</small>
    </div>
      </div>
              </div>
              <div className="col-7 col-md-8 col-lg-9" style={{margin:"0px"}}> 
              <div className="row" style={{width:"100%"}}>
    <div className="d-none d-md-block col-md-12">
    <small style={{float:"left"}}>{product.brand}</small>
    <small style={{float:"right",color:`${product.viewrating > 0 ? "orange" : "grey"}`}}><span className="fa fa-eye" ></span> {product.viewrating}</small>
    </div>
      </div>
               <div className="smdetaildiv" style={{lineHeight:"16px"}}> 
                <div  className="details">  
         <small className="detailtext" onClick={()=>this.openDetails({details:product.details,id:product.productId})} style={{cursor:"pointer",color:`${this.props.userdetails.background === "black" ? "white" : this.props.userdetails.background === "white"?"black" : "black"}`,fontSize:"11px"}}>
           { product.details +"-"+ product.model +"-"+ product.color}</small>  
            </div> 
            <small style={{fontStyle:"italic",color:"red",float:"right",fontSize:"11px"}}>{formater(product.date)}</small>
          <br/>
         
              <small className="text-muted" style={{letterSpacing:"-1px",textTransform:"capitalize",fontSize:"10px"}}><b style={{color:"orange"}}>{product.store}</b> @ <span className="fa fa-map-marker-alt"></span>{product.lga}</small>
                         </div>       
            <center >
            <button  type="button" style={{padding:"0px",marginTop:"3px"}}  className="btn smaddtocartbtn" onClick={()=>this.addtocart({productId:product.productId,color:product.color})}>
             <small>
             ADD TO CART
         
        
             </small>
             </button><br/>
            </center>
            </div>     
            </div>
            </div>
             ) : null}  
                
                 </div>
                 <center>
                
                 <br/><br/>
                 </center>
             
             </div>
             </div>
     
    
          :  this.props.loading ?
          new Array(8).fill("lalala").map((product) =>          
     <div className="col-6 col-md-3 col-lg-3 rowclass"  style={{display:`${this.state.view === "grid" ? "inline-block" : "none"}`,width:"100%",padding:"3px"}}  key={product.productId} >        
    
    <div className={`${this.state.hoverapp} smhoveredapp unhoveredapp`} style={{backgroundColor:`${this.props.userdetails.background || "white"}`,padding:"5px"}}>
    <div>
      <center>
     
      <div className="mainImg img-responsive" style={{backgroundColor:"rgba(242,242,242,0.6)"}}  ></div>
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
    <small className="detailtext" onClick={()=>this.openDetails({details:product.details,id:product.productId})} style={{color:`${this.props.userdetails.background === "black" ? "white" : this.props.userdetails.background === "white"?"black" : "black"}`,display:`${this.state.griddetails}`,fontSize:"11px"}}></small>  
    </div> 
    <small style={{fontWeight:"bold",fontSize:"14px"}}>{product.mainprice}</small> <br/>
    <div><small class="text-muted" style={{textDecoration:"line-through",fontSize:"12px"}}>{product.discount ? product.mainprice : null}</small><b className="badge" style={{fontSize:"12px",fontWeight:"bolder",color:"rgba(0, 119, 179)",backgroundColor:"rgba(0, 119, 179,0.1)",float:"right"}}>{product.discount ? `-${product.discount}%` : null}</b></div> 
    <div style={{backgroundColor:"rgba(242,242,242,0.6)",height:"40px",width:"100%",color:"rgba(242,242,242,0.6)"}}>
    <div >     
    <div  style={{width:`${product.productrating*20}%`}}>    
    ..........
    </div> 
    </div>  <small style={{fontSize:"12px"}}>{product.numofrating} </small>
</div> 
    <small className="text-muted" style={{letterSpacing:"-1px",textTransform:"capitalize",fontSize:"10px"}}>.</small>
    <div style={{display:"none"}}><img src={require(`./images/fruget.jpg`)} className="imgSymbol" style={{float:"right"}}></img></div>
    </div>       
    <center className={`${this.state.view}`} >
    
    <button  type="button" ref={this.detailsRef} className="btn addtocartbtn" onClick={()=>this.addtocart({productId:product.productId,color:product.color})}>
    <small>
    ADD TO CART
    </small>
    </button>
    </center>
    
    </div>     
    </div> 
    </div> 
    )     : 
                 <div className="row">
                 <center>
                 <h1 style={{padding:"50px"}}>Fetching savedProducts...</h1>
                 </center>
             </div>}
             </div>
          </div>
         
         );
                      }else{
                        return(
                          <div className="navbarcomponentlg">
    <div className="contain" style={{display:`${this.props.appDisplay}`,color:`${this.props.userdetails.background === "black" ? "white" : this.props.userdetails.background === "white"?"black" : "black"}`,backgroundColor:`${this.props.userdetails.background || "white"}`}}>                  
    <div className="savemodaldiv" ref={(a) => this.savemodaldiv =a} id="savemodaldiv"
               style={{display:`${this.state.displayaskdiv}`,zIndex:"4",width:"100%",height:"100%",backgroundColor:"rgba(0,0,0,0.4)"}}>
              <div className="savediv" style={{padding:"5px",border:"1px solid lightgrey",backgroundColor:`${this.props.userdetails.background || "rgba(0,0,0,0.4)"}`}}>
              <span className="fa fa-times"  onClick={()=>this.setState({displayaskdiv:"none"})} style={{float:"right"}}></span>
              <center>
               <h5 style={{padding:"40px",color:"black"}}>
               <span style={{color:"red"}}>Unsave</span> <br/>
             {this.state.unsavingDetail}
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
    {this.props.savedProducts.length > 0 ?
                         <div className='row' style={{height:`${this.props.loading?"100%":""}`,padding:"0px 15px"}}>                   
                  <div className="col-12">
                  <div className="row " style={{backgroundColor:`${this.props.userdetails.background || "white"}`,zIndex:"2",position:"sticky",top:"35px"}}>               
 <div className="col-5 col-md-6" style={{fontSize:"20px",padding:"10px"}}>                     
                           <small > {this.props.savedProducts.length > 0 ? `Saved Items (${this.props.savedProducts.length})`  : null}</small>
                               </div>                           
        <div className="col-4 col-md-3" >                
              
                               </div>                                          
               <div style={{padding:"10px",display:`${this.props.savedProducts.length > 0 ? "block" :"none"}`}}>
              <i class="fa fa-th" style={{color:`${view === "grid"  ? "rgb(0, 119, 179)" : this.props.userdetails.background === "black" ? "white" : "black"}`}} onClick={this.grid}></i>
              </div>
              <div style={{padding:"10px",display:`${this.props.savedProducts.length > 0 ? "block" :"none"}`}}>
              <i class="fa fa-grip-vertical" style={{color:`${view === "list" ? "rgb(0, 119, 179)" : this.props.userdetails.background === "black" ? "white" : "black"}`}} onClick={this.list}></i>
              </div>
              <div style={{padding:"10px",fontSize:"20px"}}>
              <span className="fa fa-cloud" style={{color:"orange"}}></span>
              </div>
              </div>                    
              </div>
                         {view === "grid" && this.props.savedProducts.length > 0 ? this.props.savedProducts.map((product) =>          
                         <div className="col-3 col-md-2"  style={{margin:"0px",display:`${view === "grid" ? "inline-block" : "none"}`,width:"100%",padding:"3px"}}  key={product.productId} >                          
                         <div onMouseOver={this.hoverapp} className={`${this.state.hoverapp} unhoveredapp`} style={{backgroundColor:`${this.props.userdetails.background || "white"}`,padding:"5px"}}>
                        <div>
                        <span onClick={()=>this.askToUnsave({details:product.details,id:product.productId})} className={this.props.userdetails.savedItems && JSON.parse(this.props.userdetails.savedItems).includes(parseInt(product.productId)) ? "fa fa-heart" : "far fa-heart"} style={{position:"absolute",fontSize:"20px",top:"10px",left:"10px", color:"orange"}}></span>
                          <center>
    <img className="mainImg img-responsive" data-src={`https://res.cloudinary.com/fruget-com/image/upload/${product.generalcategory}/${product.category}/${product.mainimg || 'emptyimg.jpg'}`} ></img>
                          </center>
                        </div>
                        <div> 
              <div className="row" style={{width:"100%"}}>
              <div className="col-12">
              <small style={{float:"left"}}>{product.brand}</small>
              <small style={{float:"right",color:`${product.viewrating > 0 ? "orange" : "grey"}`}}><span className="fa fa-eye" ></span> {product.viewrating}</small>
              </div>
                </div>
                         <div className="" style={{lineHeight:"16px"}}> 
                          <div  className="details">  
                   <small className="detailtext" onClick={()=>this.openDetails({details:product.details,id:product.productId})} style={{color:`${this.props.userdetails.background === "black" ? "white" : this.props.userdetails.background === "white"?"black" : "black"}`,display:`${this.state.griddetails}`,fontSize:"11px"}}>{product.details}</small>  
                      </div>   
                      <div>
                        <small style={{fontStyle:"italic",color:"red",float:"right",fontSize:"11px"}}>{formater(product.date)}</small>
                        <small className="text-muted" style={{letterSpacing:"-1px",textTransform:"capitalize",fontSize:"10px"}}><b style={{color:"orange"}}>{product.store}</b> @ <span className="fa fa-map-marker-alt"></span>{product.lga}</small>
                      </div> 
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
                       ) : null}     
                              
                     <div className='col-12' style={{boxShadow:"1px 2px 5px 2px lightgrey",width:"100%",backgroundColor:`${this.props.userdetails.background==="black" || "white"}`,color:`${this.props.userdetails.background === "black" ? "white" : this.props.userdetails.background === "white"?"black" : "black"}`,padding:"2px"}}>                  
                         {view === "list" && this.props.savedProducts.length > 0  ? this.props.savedProducts.map((product) =>          
            <div className="row">
            <div className="col-12 rowclasslist" onMouseOver={this.hoverapp} className={`${this.state.hoverapp} `}  style={{width:"100%",backgroundColor:`${this.props.userdetails.background || "white"}`,margin:"2px 0px",padding:"3px"}}  key={product.productId} >               
                      <div className="row"  style={{margin:"0px"}}>
                        <div className="col-5 col-md-4 col-lg-3"  style={{margin:"0px"}}>
                        <span onClick={()=>this.askToUnsave({details:product.details,id:product.productId})} className={this.props.userdetails.savedItems && JSON.parse(this.props.userdetails.savedItems).includes(parseInt(product.productId)) ? "fa fa-heart" : "far fa-heart"} style={{position:"absolute",fontSize:"20px",top:"10px",left:"10px", color:"orange"}}></span>
                          <center>
                          <img className="mainImg img-responsive" src={`https://res.cloudinary.com/fruget-com/image/upload/${product.generalcategory}/${product.category}/${product.mainimg || 'emptyimg.jpg'}`} ></img>
                          </center>
                        </div>
                        <div className="col-7" style={{margin:"0px"}}> 
                        <div className="row" style={{width:"100%"}}>
              <div className="col-12">
              <small style={{float:"left"}}>{product.brand}</small>
              <small style={{float:"right",color:`${product.viewrating > 0 ? "orange" : "grey"}`}}><span className="fa fa-eye" ></span> {product.viewrating}</small>
              </div>
                </div>
                         <div className="detaildiv" style={{lineHeight:"16px"}}> 
                          <div  className="details">  
                   <small className="detailtext" onClick={()=>this.openDetails({details:product.details,id:product.productId})} style={{cursor:"pointer",color:`${this.props.userdetails.background === "black" ? "white" : this.props.userdetails.background === "white"?"black" : "black"}`,fontSize:"11px"}}>{product.details}</small>  
                      </div>                    
                        <small className="text-muted" style={{letterSpacing:"-1px",textTransform:"capitalize",fontSize:"10px"}}><b style={{color:"orange"}}>{product.store}</b> @ <span className="fa fa-map-marker-alt"></span>{product.lga}</small>
                        <small style={{fontStyle:"italic",color:"red",float:"right",fontSize:"11px"}}>{formater(product.date)}</small>
                       </div>       
                      <center   style={{width:`${this.state.viewcartbtnwidth}`}}>
                      <br/>
                      <button  type="button" ref={this.detailsRef} className="btn addtocartbtn" onClick={()=>this.addtocart({productId:product.productId,color:product.color})}>
                       <small>
                       ADD TO CART
                  
                       </small>
                       </button>
                      </center>
                      </div>     
                      </div>
                      </div>
                      </div>
                       ): 
                       <center>
                        <span></span>   
                       </center>}     
                           </div>
                           <br/><br/>
                           <center>
                          
                           <br/><br/>
                           </center>
                          
                       
                    </div>
    
                    : this.props.loading ?
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
                <small className="detailtext" onClick={()=>this.openDetails({details:product.details,id:product.productId})} style={{color:`${this.props.userdetails.background === "black" ? "white" : this.props.userdetails.background === "white"?"black" : "black"}`,display:`${this.state.griddetails}`,fontSize:"11px"}}></small>  
                   </div> 
                   <small style={{fontWeight:"bold",fontSize:"14px"}}>{product.mainprice}</small> <br/>
                  <div><small class="text-muted" style={{textDecoration:"line-through",fontSize:"12px"}}>{product.discount ? product.mainprice : null}</small><b className="badge" style={{fontSize:"12px",fontWeight:"bolder",color:"rgba(0, 119, 179)",backgroundColor:"rgba(0, 119, 179,0.1)",float:"right"}}>{product.discount ? `-${product.discount}%` : null}</b></div> 
                  <div style={{backgroundColor:"rgba(242,242,242,0.6)",height:"40px",width:"100%",color:"rgba(242,242,242,0.6)"}}>
                    <div >     
                     <div  style={{width:`${product.productrating*20}%`}}>    
                     ..........
                     </div> 
                     </div>  <small style={{fontSize:"12px"}}>{product.numofrating} </small>
                  </div> 
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
                    )     : 
                                  <div className="row">
                                  <center>
                                  <h1 style={{padding:"50px"}}>No Porducts</h1>
                                  </center>
                              </div>
                                 }
                    </div>
                    </div>
                        )
                      }
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
