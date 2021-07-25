import React, { Component } from 'react';
import {Link, Redirect, withRouter} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
// import {test, undisplaymodal} from './store'
<<<<<<< HEAD
import {setredirect,saveItem,undisplaysavemodal,unloading,viewuserdetailsbyuserId,getvendorProducts ,getProducts,checksaveItem,getseller,getdetails,getsidenav,getvendorsidenav,checkfilter,checkvendorfilter,addtocart,undisplaymodal,setLoadingtoTrue,allsubcategories,allvendorsubcategories} from './store'
=======
import {getProducts,getdetails,getsidenav,checkfilter,addtocart,undisplaymodal,setLoadingtoTrue} from './store'
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
import {compose} from 'redux'
import {connect} from 'react-redux'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {withCookies} from 'react-cookie'
import Sidenavbar from "./sidenavbar"
import Suggestions from "./suggestions"
import querystring from 'query-string'
import axios from "axios"
<<<<<<< HEAD
import {formater} from "./formatTime"
=======
import ModalSideNavbar from "./modalsidenavbar"
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
import ReactHtmlParser from "react-html-parser"
import {Pagination, Dropdown} from 'react-bootstrap'
import './main.css'
// 
import { LazyLoadImage, trackWindowScroll } from 'react-lazy-load-image-component';
import { LazyLoad } from 'react-observer-api';
import Cookies from "js-cookie"
import Profilesidenavbar from "./profilesidenavbar"
import Header from "./productheader"

class App extends Component {
  constructor(props) {
  //  const { cookies } = props; 
    super(props); 
    this.state = { 
      productss:props.products,
      products:[],
      search: '',
      token: {},
      currentPage: 1,
      noPages:0,
      parsedUrl:{},
      parsedQuery:{},
      sidenavbarclass: "d-none d-lg-block col-lg-3 stick",
      appclass: "col-12 col-lg-9",
      displayfilter:"none",
      price:"",
      highestprice:"",
      lowestprice:"",
      viewrow:"col-6 col-md-4 col-lg-3 rowclass",
      viewcol:"",
      viewcoldetails:"",
      loading:true,
      viewborder:"",
      viewaddtocartbutton:"block",
      viewcartbtnwidth: "100%",
      displayviewbrand:"block",
      viewbgcolor:"white",
      griddetails: "block",
      listdetails:"none",
      frugetshow:"",
<<<<<<< HEAD
      listmargin:"",
      hoverapp:"",
      view:"grid",
      dropdownwidth:"0%",
      dropdownclass:"fa fa-chevron-up"
     }
  }

  componentDidMount =()=>{
    let mainToken
    if(Cookies.get("cm_pp") ){
        const myToken = Cookies.get("cm_pp")
        let myMainTokenlen = parseInt(myToken.split("%")[0])
         let userIdlen = parseInt(myToken.split("%")[1])
         let userIdpos = parseInt(myToken.split("%")[2].charAt(0)+myToken.split("%")[2].charAt(1))
         let userId = myToken.slice(userIdpos, userIdpos+userIdlen)
          mainToken = myToken.slice(userIdpos+userIdlen, myMainTokenlen)
         let userId2 = mainToken.slice(userIdpos, userIdpos+userIdlen)
    //     this.props.viewuserdetailsbyuserId(userId)
        }      
    const parsedQuery = querystring.parse(this.props.location.search);
     
    setTimeout(()=> this.setState({loading:false}), 6000)

     if(!parsedQuery.view ||parsedQuery.view === "grid"){
  this.setState({view:"grid"})
  }
  else{
    this.setState({view:"list",viewborder:"10px",frugetshow:"right"})
    }   
 if(this.props.category){
    const checker =  Object.keys(parsedQuery).includes("brand") || Object.keys(parsedQuery).includes("litres") || Object.keys(parsedQuery).includes("sizes") || Object.keys(parsedQuery).includes("inches") || Object.keys(parsedQuery).includes("color")
 if(!checker  && this.props.products.length === 0){
  const data ={
    category: this.props.category,
=======
      listmargin:""
     }
  }
  componentWillMount =()=>{
    var parsedQuery = querystring.parse(this.props.location.search);
    if(window.innerWidth <= 800){
      this.setState({displayviewbrand:"none"})
    }
    if(parsedQuery.view === "grid" || !parsedQuery.view){
    this.setState({viewrow:"col-6 col-md-4 col-lg-3 rowclass", viewcol:""})
    }
    else if(parsedQuery.view === "list"){
      this.setState({viewrow:"col-12 row rowclasslist", viewcol:"col-5",listmargin:"2px 0px",viewcoldetails:"col-7",viewborder:"10px",frugetshow:"right",viewcartbtnwidth:"40%",viewbgcolor:"lightgrey",displayviewbrand:"none",griddetails:"none",listdetails:"block"})
      if(window.innerWidth <= 600){ 
        this.setState({viewaddtocartbutton:"none"})
      }
    }
    axios.get(`http://fruget.herokuapp.com/products/${this.props.match.params.category}/price`)
 .then(res=> this.setState({price:res.data}, ()=>{
   for(var i=0; i<res.data.length; i++){
    this.setState({highestprice:res.data[i].highestprice, lowestprice:res.data[i].lowestprice}, () =>{
     // var parsedQuery = querystring.parse(this.props.location.search);
      this.setState({parsedUrl:parsedQuery, parsedQuery})  
      console.log(Object.keys(parsedQuery))
      const checker = Object.keys(parsedQuery).includes("brand") || Object.keys(parsedQuery).includes("sizes") || Object.keys(parsedQuery).includes("color")
if(!checker){
  console.log("hello i am here")     
  const data ={
          category: this.props.match.params.category,
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
          page: parsedQuery.page || 1,
          sort:parsedQuery.sort, 
          min:parsedQuery.min ,
          max:parsedQuery.max,
          rating:parsedQuery.rating
        }
<<<<<<< HEAD
     this.props.getsidenav(data)
       this.props.getProducts(data)
    //    this.props.allsubcategories(this.props.category)
       } 
        else if(checker && this.props.products.length === 0){ 
=======
        if(this.props.products.length === 0){
   this.props.getProducts(data)
        }
     }
      else{ 
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
      const data ={
        brand : parsedQuery.brand,
        inches: parsedQuery.inches, 
        litres:parsedQuery.litres,
        colour: parsedQuery.color,
        vendor: parsedQuery.vendor,
        category:this.props.category,
      max:parsedQuery.max,
      min:parsedQuery.min,
        page:parsedQuery.page || 1,
        sort:parsedQuery.sort ,
        q :parsedQuery.q || "brand",
        rating:parsedQuery.rating
      }
<<<<<<< HEAD
     
      this.props.checkfilter(data)
      this.props.getsidenav(data)
      this.props.allsubcategories(this.props.category)
    }
  }else{
    const checker =  Object.keys(parsedQuery).includes("vendor") || Object.keys(parsedQuery).includes("brand") || Object.keys(parsedQuery).includes("litres") || Object.keys(parsedQuery).includes("sizes") || Object.keys(parsedQuery).includes("inches") || Object.keys(parsedQuery).includes("color")
    if(!checker  && this.props.products.length === 0){
    const data ={
      vendor: this.props.vendor,
      page: parsedQuery.page || 1,
      sort:parsedQuery.sort, 
      min:parsedQuery.min ,
      max:parsedQuery.max,
      rating:parsedQuery.rating
    }    
          this.props.getvendorProducts(data)
          this.props.getvendorsidenav(data)
          this.props.allvendorsubcategories(this.props.vendor)
        }
        else if(checker && this.props.products.length === 0){ 
          const data ={
            brand : parsedQuery.brand,
            inches: parsedQuery.inches, 
            litres:parsedQuery.litres,
            colour: parsedQuery.color,
            vendor: parsedQuery.vendor,
            vendor:this.props.vendor,
          max:parsedQuery.max,
          min:parsedQuery.min,
            page:parsedQuery.page || 1,
            sort:parsedQuery.sort ,
            q :parsedQuery.q || "brand",
            rating:parsedQuery.rating
          }
         
          this.props.checkvendorfilter(data)
          this.props.getvendorsidenav(data)
         this.props.allvendorsubcategories(this.props.vendor)
        }
        }   
      window.addEventListener("click", this.handlemodalclick) 
=======
      console.log("i would filter")
      this.props.checkfilter(data)
    }  

    })
   }
 }))
 .then(err => console.warn(err))

 this.setState({loading:false})
   
    this.props.getsidenav(this.props.match.params.category)
    window.addEventListener("click", this.handlemodalclick)
    
  }
  componentDidMount =()=>{
    this.setState({ productss: this.props.products });
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
  }
  /*
  componentDidUpdate(prevProps){
    if(prevProps.productDetails !== this.props.productDetails)
    {
      this.props.history.push(`/product/202029190128891%2C${this.props.currentProductIdcategory}%2C245719/${this.props.currentDetailcategory}`)
     }     
 }
 */
  handleChange=(e)=>{
    this.setState({search:e.target.value})
  } 
  paginate = (pages) =>{
    const parsedQuery = querystring.parse(this.props.location.search);
    let currentUrlParams = new URLSearchParams(window.location.search);
    currentUrlParams.set('page', pages);
    window.location.assign(window.location.pathname +"?"+ currentUrlParams.toString());
   // const uri= window.location.href
  //  window.location.assign(`${uri}?page=${pages}`)
///category/${this.props.category}
  }
displayfilter=()=>{
//  this.setState({displayfilter:"block"})
let currentUrlParams = new URLSearchParams(window.location.search);
currentUrlParams.set('q', this.props.category);
window.location.assign("/select/filter" +"?"+ currentUrlParams.toString());
// this.setState({sidenavbarclass: "d-block col-sm-12 d-none", appclass:"d-none"})
}
sort =(value) =>{
  let currentUrlParams = new URLSearchParams(window.location.search);
    currentUrlParams.set('sort', value);
    if(this.state.parsedQuery.page){
      currentUrlParams.set('page', 1);
    }  
    window.location.assign(window.location.pathname +"?"+ currentUrlParams.toString());
} 

changeview =() =>{
  if(this.state.view === "list"){
 let currentUrlParams = new URLSearchParams(window.location.search);
  currentUrlParams.set('view',"grid");
 // window.location.assign(window.location.pathname +"?"+ currentUrlParams.toString());
 this.setState({view:"grid"})
 window.history.pushState({}, "", window.location.pathname +"?"+ currentUrlParams.toString())
  }else{
  let currentUrlParams = new URLSearchParams(window.location.search);
  currentUrlParams.set('view',"list");
 // window.location.assign(window.location.pathname +"?"+ currentUrlParams.toString());
 this.setState({view:"list"})
 window.history.pushState({}, "", window.location.pathname +"?"+ currentUrlParams.toString())
  }
}
<<<<<<< HEAD
undisplaycartmodal =() =>{
  this.props.undisplaycartmodal()
 }
addtocart=(datum)=>{
  const data ={
    id:datum.productId,
    color:datum.color
  }
   this.props.addtocart(data) 
   if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    setTimeout(()=>this.props.undisplaymodal(), 10000)
    }
=======
addtocart=(id)=>{
   this.props.addtocart(id) 
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
  }
undisplaymodal =() =>{
 this.props.undisplaymodal()
}
handlemodalclick =(e) =>{
  if(e.target == this.modaldiv){
     this.props.undisplaymodal()
  }
}
displaycartbtn =(e)=>{
  e.currentTarget.button.style.display ="block";
}
<<<<<<< HEAD
openDetails=(datum)=>{
  const data = {
  productId :datum.id,
  details:datum.details
  }
  if(!Cookies.get("token")){
    this.props.setredirect()
  }else{
 this.props.getdetails(data)
 this.props.getseller(data)
   this.props.history.push(`/product/202029190128891%2C${datum.id}%2C245719/${datum.details}`)
  }
}  

hoverapp=()=>{
  this.setState({hoverapp:"hoveredapp"})
}
displayfilterdropdown=()=>{
  if(this.state.dropdownwidth === "0%"){
  this.setState({dropdownwidth:"40%",dropdownclass:"fa fa-chevron-down"})
  }else{
    this.setState({dropdownwidth:"0%",dropdownclass:"fa fa-chevron-up"})
  }
}
save =(datum)=>{
  let data={
    productId :datum.productId,
    details: datum.details
   }
this.props.saveItem(data)  
if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
setTimeout(()=>this.props.undisplaysavemodal(), 10000)
}
  }
  
=======
openDetails=(data)=>{
 // console.log(e.currentTarget.textContent)
 this.props.getdetails(data)
 // this.props.setLoadingtoTrue()
}  
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
  render() { 
    if(this.props.redirect){
      return <Redirect to={{ pathname: '/customer/login',state: { from: this.props.location }}} />
  }
  //  const parsedQuery = querystring.parse(this.props.location.search);
  const parsedQuery = querystring.parse(this.props.location.search);
  let view;
  if(!parsedQuery.view || parsedQuery.view === "grid"){
   view = "grid"
  }else{
    view = "list"
  }
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

    let active = parseInt(this.props.currentPage) || 1;
    var PageNumbers = [];
    for (var i=1; i<=this.props.totalPages; i++){
       PageNumbers.push(i)
    }
<<<<<<< HEAD
    let loading;
    const ranoo =Math.floor(Math.random()*100)
    console.log("ranoo", ranoo)
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
 //cartmessage

  if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    return (       
            <div style={{backgroundColor:`${this.props.userdetails.background==="black"?"rgb(38,38,38)":"rgb(242,242,242)"}`}}>
            <div style={{display:`${this.props.inputval.length > 0 ? "block" : "none"}`,zIndex:"2",width:"100%",height:"100%",position:"absolute"}} className="indexer"> 
             <Suggestions></Suggestions>       
             </div>
            
             {this.props.products.length > 0 ?       
           <div style={{display:`${this.props.appDisplay}`}}>         
          <div  className="container main"> 
        <div className='row'  style={{padding:"2px"}}>
          <div className="col-12" style={{backgroundColor: `${this.props.userdetails.background ==="black" ?"black" : "#f5f5f0" }`}}>     
          <div className='row' style={{backgroundColor:`${this.props.userdetails.background || "white"}`,color:`${this.props.userdetails.background === "black" ? "white" : this.props.userdetails.background === "white"?"black" : "black"}`,height:`${this.props.loading?"100%":""}`,display:`${this.state.view === "grid" ? "inline-block" : "none"}`,padding:"2px"}}>   
          <div className="col-12" style={{borderBottom:"1px solid lightgrey"}}>
            <small style={{fontSize:'20px',textTransform:"capitalize"}}>{this.props.category  || this.props.vendor}
            {this.props.vendor ? 
            <span style={{fontSize:"15px",padding:"2px"}} className="fa fa-check-circle text-warning"></span>
            : null }
=======
    console.log(this.props.loading)
    if(this.props.productDetails.length > 0){
      return <Redirect to={`/product/${this.props.currentDetailcategory}`} />
    }
    console.log(window.innerHeight)
  /*  console.log(Object.keys(this.state.parsedQuery).toString())
    if(this.props.products.length === 0){
      return(
        <div style={{width:"100%", height:"100%"}}>
          <center style={{position:"absolute", top:"50%",left:"50%"}}>
            <img src={require(`./images/35.gif`)} /> 
          </center>
        </div>
      ) 
    }else{  */ 
    return (   
            <div>
             <div style={{display:`${this.props.inputval.length > 0 ? "block" : "none"}`,zIndex:"2",width:"100%",height:"100%",position:"absolute"}} className="indexer"> 
             <Suggestions></Suggestions>       
             </div>
           <div style={{display:`${this.props.appDisplay}`}}>
             <div style={{display:`${this.props.mainbgcolor==="white" ? "none" : "block"}`,backgroundColor:"rgba(242,242,242,0.5)",width:"100%",height:"200%",position:"absolute",top:"0px",zIndex:"2"}}>
               x
             <div className="sidenavbar" style={{zIndex:"1",display:`${this.props.modalsidenavbardisplay}`,position:"absolute",top:"0px",width:`${this.props.modalsidenavbarwidth}`}}>
                          
             </div>
             </div>
            
          <div className="container main" style={{position:`${this.props.loading ? "fixed" : ""}`}}>
          {this.props.loading ?     
          <div style={{position:"absolute", top:"0%",left:"0%",zIndex:"2",backgroundColor:"lightgrey",width:"100%",height:`100%`,opacity:"0.2"}}>
            <center style={{position:"absolute", top:"10%",left:"50%"}}>
            <img src={require(`./images/35.gif`)} />
            </center>
          </div>
        : null}
          <div className="row dodo" style={{backgroundColor:"white"}}>
              <div className="col-9" >
    <small><a href="" style={{color:"black"}}>Home</a> > <a href="" style={{color:"rgb(0, 119, 179)",textTransform:"capitalize"}}>{this.props.match.params.category}</a></small>
<p style={{ textTransform:"capitalize",fontWeight:"bolder",padding:"0px"}}>{this.props.match.params.category}</p>
              </div>
              <div className="col-3">
              <small>
            <small>
            ({(((this.props.currentPage || 1)-1)*20) + 1} - {(this.props.currentPage || 1)*(this.props.numOfRows < 20 ? this.props.numOfRows : 20)}) of  
            <span >
             {" " +this.props.numOfRows} products
            </span>
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
            </small>
            {this.props.numOfRows > 0 ?
            <small style={{float:"right"}}>{" " +this.props.numOfRows || 0} Products Found </small>
            : null}
          </div>   
          
           {this.state.view === "grid" ? this.props.products.map((product) =>          
           <div className="col-6 col-md-4 col-lg-3 mb-1"  style={{marginBottom:"0px",width:"100%",padding:"1px",display:"inline-block"}}  key={product.productId} >        
           <div className={`${this.state.hoverapp} smhoveredapp smunhoveredapp`} style={{backgroundColor:`${this.props.userdetails.background || "white"}`,padding:"5px"}}>
          <div>
          <span onClick={()=>this.save({productId:product.productId,details:product.details})} className={this.props.userdetails.savedItems && JSON.parse(this.props.userdetails.savedItems).includes(parseInt(product.productId)) ? "fa fa-heart" : "far fa-heart"} style={{position:"absolute",fontSize:"20px",top:"10px",left:"10px", color:"orange"}}></span>
            <center>
            <img className="mainImg img-responsive"  data-src={`https://res.cloudinary.com/fruget-com/image/upload/${product.generalcategory}/${product.category}/${product.mainimg || 'emptyimg.jpg'}`} ></img>
            </center>
          </div>
<<<<<<< HEAD
          <div> 
<div className="row" style={{width:"100%"}}>
<div className="col-12">
<small style={{float:"left"}}>{product.brand}</small>
<small style={{float:"right",color:`${product.viewrating > 0 ? "orange" : "grey"}`}}><span className="fa fa-eye" ></span> {product.viewrating}</small>
</div>
  </div>
<div className="" style={{lineHeight:"16px"}}> 
 <div  className="details">  
     <small className="detailtext" onClick={()=>this.openDetails(product.productId)} style={{color:`${this.props.userdetails.background === "black" ? "white" : this.props.userdetails.background === "white"?"black" : "black"}`,display:`${this.state.griddetails}`,fontSize:"11px"}}>{product.details.length > 40 ? product.details.slice(0,40)+ "..." : product.details +"-"+ product.model +"-"+ product.color}</small>  
        </div> 
        <small style={{fontWeight:"bold",fontSize:"14px"}}>{product.mainprice}</small> <br/>
       <div><small class="text-muted" style={{textDecoration:"line-through",fontSize:"12px"}}>{product.discount ? product.mainprice : null}</small><b className="badge" style={{fontSize:"12px",fontWeight:"bolder",color:"rgba(0, 119, 179)",backgroundColor:"rgba(0, 119, 179,0.1)",float:"right"}}>{product.discount ? `-${product.discount}%` : null}</b></div> 
       <div>
         <div className="outer">     
          <div className="inner" style={{width:`${product.productrating*20}%`}}>    
          </div> 
          </div>  <small style={{fontSize:"12px"}}>({product.numofrating}) </small>
          <small style={{fontStyle:"italic",float:"right",fontSize:"11px"}}>{formater(product.time)}</small></div> 
          <small className="text-muted" style={{letterSpacing:"-1px",textTransform:"capitalize",fontSize:"10px"}}><b style={{color:"orange"}}>{product.store}</b> @ <span className="fa fa-map-marker-alt"></span>{product.lga}</small>
          <div style={{display:"none"}}><img src={require(`./images/fruget.jpg`)} className="imgSymbol" style={{float:"right"}}></img></div>
         </div>       
        <center className={`${this.state.view}`}  >     
        <button  type="button"  className="btn smaddtocartbtn" onClick={()=>this.addtocart({productId:product.productId,color:product.color})}>
         <small>
         ADD TO CART
          {this.props.cart.map(carts=>
        product.productId == carts.productId ?
        <span style={{fontWeight:"bolder",color:"orange"}}> ({carts.quantity})</span>
          : null
          )}
         </small>
         </button>
        </center>
        </div>    
        </div>      
  </div> 
         ): null}     
             </div>

           <div className='row' style={{backgroundColor:`${this.props.userdetails.background==="black" || "white"}`,color:`${this.props.userdetails.background === "black" ? "white" : this.props.userdetails.background === "white"?"black" : "black"}`,display:`${this.state.view === "list" ? "inline-block" : "none"}`,padding:"2px"}}>   
          <div className="col-12">
            <small style={{fontSize:'20px',textTransform:"capitalize"}}>{this.props.category}</small>
            <small style={{float:"right"}}>{" " +this.props.numOfRows} Products Found </small>
 
          </div>   
          <hr/>

           {this.props.products.map((product) =>          
<div className="col-12  rowclasslist" onMouseOver={this.hoverapp}  style={{backgroundColor:`${this.props.userdetails.background || "white"}`,display:`${this.state.view === "list" ? "block" : "none"}`,margin:"2px 0px",padding:"3px"}}  key={product.productId} >               
        <div className="row"  style={{margin:"0px"}}>
          <div className="col-5 col-md-4 col-lg-3"  style={{margin:"0px"}}>
 <span onClick={()=>this.save({productId:product.productId,details:product.details})} className={this.props.userdetails.savedItems && JSON.parse(this.props.userdetails.savedItems).includes(parseInt(product.productId)) ? "fa fa-heart" : "far fa-heart"} style={{position:"absolute",fontSize:"20px",top:"10px",left:"10px", color:"orange"}}></span>
            <center>
            <img className="mainImg img-responsive" data-src={`https://res.cloudinary.com/fruget-com/image/upload/${product.generalcategory}/${product.category}/${product.mainimg || 'emptyimg.jpg'}`} ></img>
            
            </center>
          </div>
          <div className="col-7" style={{margin:"0px"}}> 
          <div className="row" style={{width:"100%"}}>
<div className="col-12">
<small style={{float:"left"}}>{product.brand}</small>
<small style={{float:"right",color:`${product.viewrating > 0 ? "orange" : "grey"}`}}><span className="fa fa-eye" ></span> {product.viewrating}</small>
</div>
  </div>
           <div className="smdetaildiv" style={{lineHeight:"16px"}}> 
            <div  className="details">  
     <small className="detailtext" onClick={()=>this.openDetails(product.productId)} style={{cursor:"pointer",color:`${this.props.userdetails.background === "black" ? "white" : this.props.userdetails.background === "white"?"black" : "black"}`,fontSize:"11px"}}>{product.details.length > 50 ? product.details.slice(0,50)+ "..." : product.details +"-"+ product.model +"-"+ product.color}</small>  
        </div> 
        <small  style={{fontWeight:"bold",fontSize:"14px"}}>{product.mainprice}</small> 
       <span><small className="text-muted ml-1" style={{textDecoration:"line-through",fontSize:"12px"}}>{product.discount ? product.mainprice : null}</small><b className="badge" style={{fontSize:"12px",fontWeight:"bolder",color:"rgba(0, 119, 179)",backgroundColor:"rgba(0, 119, 179,0.1)",float:"right"}}>{product.discount ? `-${product.discount}%` : null}</b></span> 
      <br/>
      <small>
      <div className="outer">     
                    <div className="inner" style={{width:`${product.productrating*20}%`}}>    
                    </div> 
                    </div>
        </small>  <small style={{fontSize:"12px"}}>({product.numofrating}) </small><br/>
          <small className="text-muted" style={{letterSpacing:"-1px",textTransform:"capitalize",fontSize:"10px"}}><b style={{color:"orange"}}>{product.store}</b> @ <span className="fa fa-map-marker-alt"></span>{product.lga}</small>
          <small style={{fontStyle:"italic",float:"right",fontSize:"11px"}}>{formater(product.time)}</small> 
         </div>       
        <center >
        <button  type="button" style={{papdding:"0px",margin:"0px"}}  className="btn smaddtocartbtn" onClick={()=>this.addtocart({productId:product.productId,color:product.color})}>
         <small>
         ADD TO CART
          {this.props.cart.map(carts=>
        product.productId == carts.productId ?
        <span style={{fontWeight:"bolder",color:"orange"}}> ({carts.quantity})</span>
          : null
          )}
         {this.props.cart.map(carts=>
        product.productId == carts.productId ?
        <span style={{fontWeight:"bolder",color:"orange"}}> ({carts.quantity})</span>
          : null
          )}
         </small>
         </button><br/>
        </center>
        </div>     
        </div>
        </div>
         )}     
=======
            <br/>
            
        <div className='row' >
        <div className={this.state.sidenavbarclass} >
          <div className="row didi">
        <div className="col-9">
                <span className="fa fa-arrow-left"></span>
              </div>
              <div className="col-3">
    <span style={{color:"blue"}}><a href="">Apply</a></span>
              </div> 
              </div>
            
          <Sidenavbar category={this.props.match.params.category} />
        </div>
        

         
          <div className={this.state.appclass} style={{backgroundColor: "#f5f5f0"}}>
     
          <div className="mainmodaldiv" ref={(a) => this.modaldiv =a} id="modaldiv" style={{display:`${this.props.display}`}}>
         <div className="modaldiv"  style={{backgroundColor:"white",borderRadius:"5px"}}>
           <p onClick={this.undisplaymodal}>x</p>
             <div className="inner-modal"> 
               <br/><br/>
               <center>
                 <h5 style={{padding:"10px"}}>{ReactHtmlParser(this.props.cartMessage)} </h5>
               </center>
               <center>                        
               <div className="row" style={{padding:"3px"}}>  
               <div className="col-6">  
<Link to={`/checkout/1996826ysgy7xhau8hzbhxj,${localStorage.getItem("id")},fruget0829?user$login7sgxujaiiahzjk#172`}><button className="btn btn-success checkout" type="button">CheckOut</button> </Link>
</div>
<div className="col-6">
<button className="btn btn-warning continueshopping" onClick={this.undisplaymodal}  type="submit">Continue Shopping</button>
</div>         
               </div> 
             </center> 
         </div> 
 
     </div>
 </div> 
          <div className='row'>      
           {this.props.products.map((product) =>          
           <div className={`${this.state.viewrow}`} style={{backgroundColor:"white",margin:`${this.state.listmargin}`}}  key={product.productId} >        
          <div className={`${this.state.viewcol}`}>
            <center>
            <img className="mainImg img-responsive" src={require (`./images/${product.mainimg || 'emptyimg.jpg'}`)} ></img>
            </center>
          </div>
          <div className={`${this.state.viewcoldetails}`}> 
<small style={{float:"left",textTransform:"capitalize",display:`${this.state.displayviewbrand}`}}>{product.brand}<br/></small>
           <div className="detaildiv" style={{lineHeight:"16px"}}> 
            <div  className="details"> 
   
     <small onClick={()=>this.openDetails(product.details)} style={{display:`${this.state.griddetails}`,fontSize:"12px"}}>{product.details.length > 40 ? product.details.slice(0,40)+ "..." : product.details +"-"+ product.model +"-"+ product.color}</small>  
      

     <small onClick={()=>this.openDetails(product.details)} style={{display:`${this.state.listdetails}`,fontSize:"12px"}}>{product.details.length > 50 ? product.details.slice(0,50)+ "..." : product.details +"-"+ product.model +"-"+ product.color}</small>  

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
          <div><img src={require(`./images/fruget.jpg`)} className="imgSymbol" style={{float:"right"}}></img></div>
         </div>
        <br/>
        <center   style={{display:`${window.innerWidth >= 600 ? this.state.viewaddtocartbutton : `none`}`,width:`${this.state.viewcartbtnwidth}`}}>
        <br/>
        <button style={{display:"none"}} type="button" ref={this.detailsRef} className="btn addtocartbtn" onClick={()=>this.addtocart(product.productId)}>
         <span>ADD TO CART</span></button><br/>
        </center><br/>
        </div>
           </div> 
         )}
         
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
             </div>
             <center>
             <Pagination size="sm">
             <Pagination.First onClick={() =>this.paginate(1)}/>
             <Pagination.Prev onClick={() =>this.paginate(parseInt(this.props.currentPage) > 1 ? parseInt(this.props.currentPage) - 1 : 1)}/>
               <ul className="pagination pagination-circle pg-blue" >
                  {PageNumbers.map(pages =>
                    <Pagination.Item key={pages} onClick={() =>this.paginate(pages)} active={pages === active}>
                      {pages}
                    </Pagination.Item>
                    )}
               </ul>
               <Pagination.Next onClick={()=>this.paginate(this.props.currentPage === Math.floor(this.props.numOfRows/40) ? this.props.currentPage : this.props.currentPage + 1)}/>
               <Pagination.Last onClick={()=>this.paginate(Math.floor(this.props.numOfRows/40))}/>
             </Pagination>
             <br/><br/>
             </center>
<<<<<<< HEAD
             <div style={{width:`${this.state.dropdownwidth}`,transition:"width 2s",overflow:"hidden",backgroundColor:"white",position:"fixed",bottom:"5%",left:"3%",zIndex:"3"}}>
            <div style={{padding:"15px",border:"0.8px solid lightgrey"}}>
           <p className="linker" onClick={() => this.sort("low-high")}><small>Price : Lowest - Highest</small></p>
             <p  className="linker" onClick={() => this.sort("high-low")}><small>Price : Highest - Lowest</small></p>
             <p  className="linker" onClick={() => this.sort("popularity")}><small>Popularity</small></p>
             <p  className="linker" onClick={() => this.sort("warranty")}><small>Warranty</small></p>
             <p  className="linker" onClick={() => this.sort("most-searched")}><small>Most Searched</small></p>
             <p  className="linker" onClick={() => this.sort("most-viewed")}><small>Most Viewed</small></p></div>             
            </div>
             <div className="filterdiv bg-dark" style={{height:"25px"}}>
               <div className="row">
                 <div className="col-4">
                 <center>
                       <small>
                       <b style={{ cursor:"pointer"}} onClick={this.displayfilterdropdown}> {parsedQuery.sort ? parsedQuery.sort : "popularity"} 
                        </b>  <span className={`${this.state.dropdownclass} ml-2`}></span>
                       </small>
            </center>               
                 </div>              
                 <div className="col-4 fiterdiv-col"  style={{borderLeft:"1px solid lightgrey",borderRight:"1px solid lightgrey"}}>
                   <center>
            <i onClick={this.changeview} className={this.state.view && this.state.view === "list"  ? "fa fa-grip-vertical" : "fa fa-th"} ></i>
                   </center>
                 </div>
                 <div className="col-4">  
                      <center>
                        <small style={{fontWeight:"bolder"}} onClick={this.displayfilter}>
                    Filter <small className="badge badge-danger"  style={{display:Object.keys(this.state.parsedUrl).length > 0 ? "inline-block": "none"}}>{Object.keys(this.state.parsedUrl).length}</small>
                  </small>
                  </center>
=======
             <div className="didi bg-dark filterdiv">
               <div className="row">
                 <div className="col-4">
                 <center>
            <div style={{display:"flex",flexWrap:"nowrap"}}>
              <div>
              <Dropdown>
  <Dropdown.Toggle className="bg-dark" id="filterdiv-dropdown">
   <small className="bg-dark"> {this.state.parsedQuery.sort || "popularity"}</small>
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item onClick={() => this.sort("low-high")}><small>Price : Lowest - Highest</small></Dropdown.Item>
    <Dropdown.Item onClick={() => this.sort("high-low")}><small>Price : Highest - Lowest</small></Dropdown.Item>
    <Dropdown.Item onClick={() => this.sort("popularity")}><small>Popularity</small></Dropdown.Item>
    <Dropdown.Item onClick={() => this.sort("warranty")}><small>Warranty</small></Dropdown.Item>
    <Dropdown.Item onClick={() => this.sort("cust-rating")}><small>Customer Rating</small></Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
              </div>
            </div>
            </center>               
                 </div>
                 <div className="col-2 fiterdiv-col" style={{borderLeft:"1px solid lightgrey"}}>
                   <center>    
              <button type="button" className="btn btn-link filter-btn" onClick={this.grid} style={{color:`${this.state.parsedQuery.view === "grid"  ? "white" : "rgb(0, 119, 179)"}`}}>
              <i class="fa fa-th" ></i>
                  </button>
                  </center>
                 </div>
                 <div className="col-2 fiterdiv-col"  style={{borderLeft:"1px solid lightgrey",borderRight:"1px solid lightgrey"}}>
                   <center>
              <button type="button" className="btn btn-link filter-btn" onClick={this.list} style={{color:`${this.state.parsedQuery.view === "list"  ? "white" : "rgb(0, 119, 179)"}`}}>
              <i class="fa fa-grip-vertical" ></i>
                  </button>
                   </center>
                 </div>
                 <div className="col-4">               
                  <button type="button" className="btn btn-link filter-btn" onClick={this.displayfilter} >
                    Filter <small className="badge badge-danger" style={{display:Object.keys(this.state.parsedUrl).length > 0 ? "inline-block": "none"}}>{Object.keys(this.state.parsedUrl).length}</small>
                  </button>
               
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
                 </div>
               </div>
             </div>
         </div>
         </div>





        </div>
      </div>
<<<<<<< HEAD

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
<small style={{fontStyle:"italic",float:"right",fontSize:"11px"}}>{formater(product.time)}</small></div> 
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
             <h1 style={{padding:"50px"}}>Fetching Products...</h1>
             </center>
         </div>}
      </div>
     
=======
      </div>
      </div> 
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
     );
                  }else{
                    return(
<div className={"container-fluid"} style={{backgroundColor:`${this.props.userdetails.background|| "white"}`}}>                  
{this.props.products.length > 0 ?
                     <div style={{display:`${this.props.appDisplay}`,backgroundColor:`${this.props.userdetails.background || "white"}`,color:`${this.props.userdetails.background === "black" ? "white" : this.props.userdetails.background === "white"?"black" : "black"}`,padding:"2px"}}>                   
                    <div className='row' style={{boxShadow:"1px 2px 5px 2px lightgrey",width:"100%",height:`${this.props.loading?"100%":""}`,padding:"0px 5px"}}>   
                    <div className="col-12" style={{borderBottom:"1px solid lightgrey",padding:"8px"}}>
                      <small style={{fontSize:'20px',textTransform:"capitalize"}}>{this.props.category  || this.props.vendor}
                      {this.props.vendor ? 
                      <span style={{fontSize:"15px",padding:"2px"}} className="fa fa-check-circle text-warning"></span>
                      : null }
                      </small>
                      {this.props.numOfRows > 0 ?
                      <small style={{float:"right"}}>{" " +this.props.numOfRows || 0} Products Found </small>
                      : null}
                    </div>                      
                     {view === "grid" && this.props.products.length > 0 ? this.props.products.map((product) =>          
                     <div className="col-4 col-md-3"  style={{margin:"0px",display:`${view === "grid" ? "inline-block" : "none"}`,width:"100%",padding:"3px"}}  key={product.productId} >                          
                     <div onMouseOver={this.hoverapp} className={`${this.state.hoverapp} unhoveredapp`} style={{backgroundColor:`${this.props.userdetails.background || "white"}`,padding:"5px"}}>
                    <div>
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
               <small className="detailtext" onClick={()=>this.openDetails({details:product.details,id:product.productId})} style={{color:`${this.props.userdetails.background === "black" ? "white" : this.props.userdetails.background === "white"?"black" : "black"}`,display:`${this.state.griddetails}`,fontSize:"11px"}}>{product.details.length > 40 ? product.details.slice(0,40)+ "..." : product.details +"-"+ product.model +"-"+ product.color}</small>  
                  </div> 
                  <small style={{fontWeight:"bold",fontSize:"14px"}}>{product.mainprice}</small> <br/>
                 <div><small class="text-muted" style={{textDecoration:"line-through",fontSize:"12px"}}>{product.discount ? product.mainprice : null}</small><b className="badge" style={{fontSize:"12px",fontWeight:"bolder",color:"rgba(0, 119, 179)",backgroundColor:"rgba(0, 119, 179,0.1)",float:"right"}}>{product.discount ? `-${product.discount}%` : null}</b></div> 
                 <div>
                   <div className="outer">     
                    <div className="inner" style={{width:`${product.productrating*20}%`}}>    
                    </div> 
                    </div>  <small style={{fontSize:"12px"}}>({product.numofrating}) </small>
                    <small style={{fontStyle:"italic",float:"right",fontSize:"11px"}}>{formater(product.time)}</small></div> 
                    <small className="text-muted" style={{letterSpacing:"-1px",textTransform:"capitalize",fontSize:"10px"}}><b style={{color:"orange"}}>{product.store}</b> @ <span className="fa fa-map-marker-alt"></span>{product.lga}</small>
                    <div style={{display:"none"}}><img src={require(`./images/fruget.jpg`)} className="imgSymbol" style={{float:"right"}}></img></div>
                   </div>       
                  <center className={`${view}`} >
                
                  <button  type="button" ref={this.detailsRef} className="btn addtocartbtn" onClick={()=>this.addtocart({productId:product.productId,color:product.color})}>
                   <small>
                   ADD TO CART
                    {this.props.cart.map(carts=>
        product.productId == carts.productId ?
        <span style={{fontWeight:"bolder",color:"orange"}}> ({carts.quantity})</span>
          : null
          )}
                   </small>
                   </button>
                  </center>
              
                  </div>     
                  </div>
              
            </div> 
                   ) : null}     
                       </div>        
                 <div className='row' style={{boxShadow:"1px 2px 5px 2px lightgrey",width:"100%",backgroundColor:`${this.props.userdetails.background==="black" || "white"}`,color:`${this.props.userdetails.background === "black" ? "white" : this.props.userdetails.background === "white"?"black" : "black"}`,padding:"2px"}}>   
                    <div className="col-12">
                     
           
                    </div>   
                  
          
                     {view === "list" && this.props.products.length > 0  ? this.props.products.map((product) =>          
          <div className="col-12 rowclasslist" onMouseOver={this.hoverapp} className={`${this.state.hoverapp} `}  style={{width:"100%",backgroundColor:`${this.props.userdetails.background || "white"}`,margin:"2px 0px",padding:"3px"}}  key={product.productId} >               
                  <div className="row"  style={{margin:"0px"}}>
                    <div className="col-5 col-md-4 col-lg-3"  style={{margin:"0px"}}>
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
               <small className="detailtext" onClick={()=>this.openDetails(product.productId)} style={{cursor:"pointer",color:`${this.props.userdetails.background === "black" ? "white" : this.props.userdetails.background === "white"?"black" : "black"}`,fontSize:"11px"}}>{product.details.length > 50 ? product.details.slice(0,50)+ "..." : product.details +"-"+ product.model +"-"+ product.color}</small>  
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
                    <small style={{fontStyle:"italic",float:"right",fontSize:"11px"}}>{formater(product.time)}</small> 
                   </div>       
                  <center   style={{width:`${this.state.viewcartbtnwidth}`}}>
                  <br/>
                  <button  type="button" ref={this.detailsRef} className="btn addtocartbtn" onClick={()=>this.addtocart({productId:product.productId,color:product.color})}>
                   <small>
                   ADD TO CART
                   {this.props.cart.map(carts=>
        product.productId == carts.productId ?
        <span style={{fontWeight:"bolder",color:"orange"}}> ({carts.quantity})</span>
          : null
          )}
                   </small>
                   </button>
                  </center>
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
                       <Pagination size="sm">
                       <Pagination.First onClick={() =>this.paginate(1)}/>
                       <Pagination.Prev onClick={() =>this.paginate(parseInt(this.props.currentPage) > 1 ? parseInt(this.props.currentPage) - 1 : 1)}/>
                         <ul className="pagination pagination-circle pg-blue" >
                            {PageNumbers.map(pages =>
                              <Pagination.Item key={pages} onClick={() =>this.paginate(pages)} active={pages === active}>
                                {pages}
                              </Pagination.Item>
                              )}
                         </ul>
                         <Pagination.Next onClick={()=>this.paginate(this.props.currentPage === Math.floor(this.props.numOfRows/40) ? this.props.currentPage : this.props.currentPage + 1)}/>
                         <Pagination.Last onClick={()=>this.paginate(Math.floor(this.props.numOfRows/40))}/>
                       </Pagination>
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
                 <small style={{fontStyle:"italic",float:"right",fontSize:"11px"}}>{formater(product.time)}</small></div> 
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
            
                    )
                  }
  }
}

 const mapStateToProps =(store)=>{
    return{           
       products: store.products,
       test:store.test,
       status:store.status,
       searcher: store.searcher,
       inputval: store.inputval,
       currentPage: store.currentPage,
       totalPages: store.totalPages,
       numOfRows:store.numOfRows,
       cartMessage:store.cartMessage,
       display:store.display,
       loading:store.loading,
       mainbgcolor:store.mainbgcolor,
       modalsidenavbarwidth: store.modalsidenavbarwidth,
       modalsidenavbardisplay: store.modalsidenavbardisplay,
       appDisplay:store.appDisplay,
       productDetails:store.productDetails,
<<<<<<< HEAD
       currentDetailcategory:store.currentDetailcategory,
       currentProductIdcategory:store.currentProductIdcategory,
       min:store.min,
       max:store.max,
       userdetails:store.userdetails,
       cart:store.shoppingcart,
       redirect:store.redirect
=======
       currentDetailcategory:store.currentDetailcategory
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
     }
 }

 const mapDispatchToProps =(dispatch)=>{
   return{
    saveItem:(data)=>dispatch(saveItem(data)),
     test: ()=> dispatch(test()),
     getProducts: (data)=> dispatch(getProducts(data)),
     getsidenav: (data) => dispatch(getsidenav(data)),
    checkfilter: (data) => dispatch(checkfilter(data)),
    addtocart: (data) => dispatch(addtocart(data)),
    undisplaymodal:()=> dispatch(undisplaymodal()),
    getdetails:(data)=>dispatch(getdetails(data)),
<<<<<<< HEAD
    setLoadingtoTrue:()=>dispatch(setLoadingtoTrue()),
    allsubcategories:(data)=>dispatch(allsubcategories(data)),
    getseller:(data)=>dispatch(getseller(data)),
    checksaveItem:(data)=>dispatch(checksaveItem(data)),
    undisplaycartmodal:()=>dispatch(undisplaymodal()),
    getvendorProducts:(data)=>dispatch(getvendorProducts(data)),
    getvendorsidenav:(data)=>dispatch(getvendorsidenav(data)),
    checkvendorfilter:(data)=>dispatch(checkvendorfilter(data)),
    allvendorsubcategories:(data)=>dispatch(allvendorsubcategories(data)),
    viewuserdetailsbyuserId:(data)=>dispatch(viewuserdetailsbyuserId(data)),
    unloading:()=>dispatch(unloading()),
    undisplaysavemodal:()=>dispatch(undisplaysavemodal()),
    setredirect:()=>dispatch(setredirect())
=======
    setLoadingtoTrue:()=>dispatch(setLoadingtoTrue())
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
   }
 }
 export default compose(withCookies, withRouter, connect(mapStateToProps, mapDispatchToProps))(App);
