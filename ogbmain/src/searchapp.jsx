import React, { Component } from 'react';
import {viewuserdetailsbyuserId} from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import {test} from './store'
import {getProducts} from './store'
import {compose} from 'redux'
import {connect} from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {withCookies} from 'react-cookie'
import Cookies from "js-cookie"
import {formater} from "./formatTime"
import SearchSideNavbar from "./searchsidenavbar"
import Inputdata from "./inputdata"
import queryString from 'query-string'
import {Redirect} from "react-router-dom"
import {submitsearcher} from "./store"
import {Pagination, Dropdown} from 'react-bootstrap'
import axios from "axios"
import './main.css'

class SearchApp extends Component {
  constructor(props) {
    const { cookies } = props;
    super(props); 
    this.state = { 
      products:[],
      search: '',
      username: " ",
      password: "",
      signupMessage: '', 
      isLoggedin: false,
      token: {},
      parsedQuery:{},
      sidenavbarclass: "d-none d-lg-block col-lg-3 stick",
      displayfilter:"none",
      price:"",
      highestprice:"",
      lowestprice:"",
      viewrow:"col-6 col-md-4 col-lg-3 rowclass",
<<<<<<< HEAD
      view:"",
      displayviewbrand:"block",
      viewborder:"",
      griddetails:"block",
      hoverapp:"",
      loading:true,
      dropdownwidth:"0%",
      dropdownclass:"fa fa-chevron-up"
=======
      viewcol:"",
      viewcolTwo:"",
      displayviewbrand:"block",
      viewborder:"",
      griddetails:"block",
      listdetails:"none",
      listpadding:5,
      listmargin:""
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
     }
  }
  componentDidMount =()=>{
    let mainToken
    if(Cookies.get("cm_pp") && this.props.userdetails.length === 0){
        const myToken = Cookies.get("cm_pp")
        let myMainTokenlen = parseInt(myToken.split("%")[0])
         let userIdlen = parseInt(myToken.split("%")[1])
         let userIdpos = parseInt(myToken.split("%")[2].charAt(0)+myToken.split("%")[2].charAt(1))
         let userId = myToken.slice(userIdpos, userIdpos+userIdlen)
          mainToken = myToken.slice(userIdpos+userIdlen, myMainTokenlen)
         let userId2 = mainToken.slice(userIdpos, userIdpos+userIdlen)
         this.props.viewuserdetailsbyuserId(userId)
        }      
  const parsedQuery = queryString.parse(this.props.location.search)
<<<<<<< HEAD
  setTimeout(()=> this.setState({loading:false}), 6000)
  if(parsedQuery.view === "grid" || !parsedQuery.view){
    this.setState({view:"grid"})
=======
  if(parsedQuery.view === "grid" || !parsedQuery.view){
    this.setState({viewrow:"col-6 col-md-4 col-lg-3 rowclass", viewcolOne:"",viewcolTwo:"",griddetails:"block",listdetails:"none"})
    }
    else if(parsedQuery.view === "list"){
      this.setState({viewrow:"col-12 row rowclasslist",listmargin:"2px 0px", viewcolOne:"col-5",viewcolTwo:"col-7",listpadding: "30px 10px",displayviewbrand:"none",viewborder:"10px",listdetails:"block",griddetails:"none"})
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
    }
    else{
      this.setState({view:"list",viewborder:"10px",frugetshow:"right"})
      }   
 let data={
  search: parsedQuery.search,
  category:this.props.category,
  brand: parsedQuery.brand,
  size: parsedQuery.sizes,
  colour:parsedQuery.color,
}
<<<<<<< HEAD
 axios.get(`http://localhost:5000/search/category/searched/price?search=${data.search}&brand=${data.brand}&size=${data.size}&colour=${data.colour}`)
=======
 axios.get(`http://fruget.herokuapp.com/search/category/searched/price?search=${data.search}&brand=${data.brand}&size=${data.size}&colour=${data.colour}`)
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
 .then(res=> this.setState({price:res.data}, ()=>{
   for(var i=0; i<res.data.length; i++){
    console.log (res.data[i].highestprice)
    this.setState({highestprice:res.data[i].highestprice, lowestprice:res.data[i].lowestprice, parsedQuery}, ()=> {
      let data={
        search: parsedQuery.search,
        category:this.props.category,
        brand: parsedQuery.brand,
        vendor: parsedQuery.vendor,
        inches:parsedQuery.inches,
        litres:parsedQuery.litres,
        colour:parsedQuery.color,
        page:parsedQuery.page,
        currentq:parsedQuery.q,
        sort:parsedQuery.sort,
        max:parsedQuery.max !== undefined ? parsedQuery.max : this.state.highestprice,
        min:parsedQuery.min !== undefined ? parsedQuery.min : this.state.lowestprice
      }
    
      console.log(data)
      this.props.submitsearcher(data)
    })
   }
 }))
 .then(err => console.warn(err))
  
}
handleChange=(e)=>{
  this.setState({search:e.target.value})
  }
  handleChange=(e)=>{
    this.setState({search:e.target.value})
  }
  paginate = (pages) =>{
   const parsedQuery = queryString.parse(this.props.location.search)
    let currentUrlParams = new URLSearchParams(window.location.search);
    if(parsedQuery.search === undefined || this.props.inputval.length > 0){
      currentUrlParams.set('search', this.props.inputval);
      currentUrlParams.set('page', 1)
    }
    else{    
      currentUrlParams.set('page', pages);
    }
    
    window.location.assign(window.location.pathname +"?"+ currentUrlParams.toString());
  
  }
  displayfilterdropdown=()=>{
    if(this.state.dropdownwidth === "0%"){
    this.setState({dropdownwidth:"20%",dropdownclass:"fa fa-chevron-down"})
    }else{
      this.setState({dropdownwidth:"0%",dropdownclass:"fa fa-chevron-up"})
    }
  }
  changeview =(data) =>{
   let currentUrlParams = new URLSearchParams(window.location.search);
    currentUrlParams.set('view',data);
   // window.location.assign(window.location.pathname +"?"+ currentUrlParams.toString());
   this.props.history.push(window.location.pathname +"?"+ currentUrlParams.toString())
 
  }
  sort =(value) =>{
    this.setState({dropdownwidth:"0%",dropdownclass:"fa fa-chevron-up"})
    const parsedQuery = queryString.parse(this.props.location.search)
    let currentUrlParams = new URLSearchParams(window.location.search);
      currentUrlParams.set('sort', value);
      if(this.state.parsedQuery.page){
        currentUrlParams.set('page', 1);
      }  
      let data={
        search: parsedQuery.search,
        category:this.props.category,
        brand: parsedQuery.brand,
        vendor: parsedQuery.vendor,
        inches:parsedQuery.inches,
        litres:parsedQuery.litres,
        colour:parsedQuery.color,
        page:parsedQuery.page,
        currentq:parsedQuery.q,
        sort:value,
        max:parsedQuery.max !== undefined ? parsedQuery.max : this.state.highestprice,
        min:parsedQuery.min !== undefined ? parsedQuery.min : this.state.lowestprice
      }
      this.props.submitsearcher(data)
      this.props.history.push(window.location.pathname +"?"+ currentUrlParams.toString());
  } 

  hoverapp=()=>{
    this.setState({hoverapp:"hoveredapp"})
  }
  
  render() {
    if(this.props.redirect){
      return <Redirect to={{ pathname: '/customer/login',state: { from: this.props.location }}} />
  }
  //  const parsedQuery = querystring.parse(this.props.location.search);
  const parsedQuery = queryString.parse(this.props.location.search);
  let view;
  if(!parsedQuery.view || parsedQuery.view === "grid"){
   view = "grid"
  }else{
    view = "list"
  }
    let active = parseInt(this.props.currentPage) || 1;
    var PageNumbers = [];
    for (var i=1; i<=this.props.totalPages; i++){
       PageNumbers.push(i)
    }
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

  if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    return (  
          <div className="navbarcomponentlg" style={{backgroundColor:`${this.props.userdetails.background==="black"?"rgb(38,38,38)":"rgb(242, 242, 242)"}`,color:`${this.props.userdetails.background === "black" ? "white" : this.props.userdetails.background === "white"?"black" : "black"}`}}>
          <div className="contain">
            <div className="row" style={{padding:"0px"}}>
              <div className="col-9">
              <Inputdata></Inputdata>
              <div>
<small> <span style={{fontWeight:"bolder"}}>{this.props.numOfRows}</span> Products Found</small>           
              </div>
              </div>          
              <div className="col-3">
              <small>
            <small>
            ({(((this.props.currentPage || 1)-1)*20) + 1} - {(this.props.currentPage || 1)*(this.props.numOfRows < 20 ? this.props.numOfRows : 20)}) of  
            <span >
             {" " +this.props.numOfRows} products
            </span>
            </small>
          </small><br/>
          <center>
                      <div style={{display:"flex",flexWrap:"nowrap"}}>
                        <div style={{marginTop:"8px"}}>
                          <small >
                          Sort By :  <b style={{color:"orange", cursor:"pointer"}} onClick={this.displayfilterdropdown}> {parsedQuery.sort || "popularity"} 
                          <span style={{color:"orange"}} className={`ml-2 ${this.state.dropdownclass}`}></span></b>
                          </small>
                        </div>
                        <div>
                     </div>       
                        <div style={{padding:"10px"}}>
                        <i class="fa fa-th" style={{color:`${view === "grid"  ? "rgb(0, 119, 179)" : "black"}`}} onClick={()=>this.changeview("grid")}></i>
                        </div>
                        <div style={{padding:"10px"}}>
                        <i class="fa fa-grip-vertical" style={{color:`${view === "list" ? "rgb(0, 119, 179)" : "black"}`}} onClick={()=>this.changeview("list")}></i>
                        </div>
                      </div>
                      </center>
          </div>
<<<<<<< HEAD
            </div>    
            <div className="row" style={{position:"relative",backgroundColor:`${this.props.userdetails.background || "white"}`,color:`${this.props.userdetails.background==="black"?"white":"black"}`}}>                
                 <div style={{transition:"width 2s",width:`${this.state.dropdownwidth}`,overflow:"hidden",backgroundColor:"white",position:"absolute",top:"0px",right:"17%",zIndex:"3"}}>
                  <div style={{padding:"10px",border:"0.8px solid lightgrey"}}>
                 <p className="linker" onClick={() => this.sort("low-high")}><small>Price : Lowest - Highest</small></p>
                   <p  className="linker" onClick={() => this.sort("high-low")}><small>Price : Highest - Lowest</small></p>
                   <p  className="linker" onClick={() => this.sort("popularity")}><small>Popularity</small></p>
                   <p  className="linker" onClick={() => this.sort("warranty")}><small>Warranty</small></p>
                   <p  className="linker" onClick={() => this.sort("most-searched")}><small>Most Searched</small></p>
                   <p  className="linker" onClick={() => this.sort("most-viewed")}><small>Most Viewed</small></p></div>             
                  </div>
                           
                          </div>   
        <div className='row'>
        <div className="col-3" >
          <SearchSideNavbar category={this.props.match.params.category}/>
        </div>
          <div className='col-9 boxshadower' style={{backgroundColor:"white",padding:"10px"}}>
    <div className='row' style={{padding:"5px"}}>            
          <div className="col-12" style={{borderBottom:"1px solid lightgrey",padding:"0px 5px"}}>
                      <small style={{fontSize:'20px',textTransform:"capitalize"}}>{this.props.inputval || parsedQuery.search}
                      {this.props.vendor ? 
                      <span style={{fontSize:"15px",padding:"2px"}} className="fa fa-check-circle text-warning"></span>
                      : null }
                      </small>
                      {this.props.numOfRows > 0 ?
                      <small style={{float:"right",clear:"both"}}>{" " +this.props.numOfRows || 0} Products Found </small>
                      : null}
                    </div> 
                  
        {view === "grid" && this.props.searchedproducts.length > 0 ? this.props.searchedproducts.map((product) =>          
                     <div className="col-4 col-lg-3"  style={{width:"100%",padding:"3px"}}  key={product.productId} >        
                     <div onMouseOver={this.hoverapp} className={`${this.state.hoverapp} unhoveredapp`} style={{backgroundColor:`${this.props.userdetails.background ||"white"}`,color:`${this.props.userdetails.background === "black" ? "white" : this.props.userdetails.background === "white"?"black" : "black"}`,padding:"5px"}}>
                      <div>
                      <center>
<img className="mainImg img-responsive" data-src={`https://res.cloudinary.com/fruget-com/image/upload/${product.generalcategory}/${product.category}/${Object.values(JSON.parse(product.img1))[0] || 'emptyimg.jpg'}`} onMouseOver={e => Object.values(JSON.parse(product.img1))[1] !== undefined ? e.currentTarget.src=`https://res.cloudinary.com/fruget-com/image/upload/${product.generalcategory}/${product.category}/${Object.values(JSON.parse(product.img1))[1]}` : e.currentTarget.src= `https://res.cloudinary.com/fruget-com/image/upload/${product.generalcategory}/${product.category}/${Object.values(JSON.parse(product.img1))[0]}`} onMouseLeave={e => e.currentTarget.src=  `https://res.cloudinary.com/fruget-com/image/upload/${product.generalcategory}/${product.category}/${Object.values(JSON.parse(product.img1))[0]}`} style={{padding:"0px"}} ></img>
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
           {view ==="list" && this.props.searchedproducts.length > 0 ? this.props.searchedproducts.map((product) =>          
           <div className="col-12  rowclasslist" onMouseOver={this.hoverapp} className={`${this.state.hoverapp} `}  style={{backgroundColor:`${this.props.userdetails.background || "white"}`,display:`${view === "list" ? "block" : "none"}`,margin:"2px 0px",padding:"3px"}}  key={product.productId} >               
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
             




=======
            </div>
          
        <div className='row'>
        <div className="d-none d-lg-block col-lg-3 stick" style={{backgroundColor:"rgba(242, 242, 242,0.4)"}}>
          <SearchSideNavbar category={this.props.match.params.category}/>
        </div>
          <div className='col-12 col-lg-9' style={{backgroundColor:"#f5f5f0"}}>
          <div className='row'> 
        {this.props.searchedproducts.map((product) =>          
           <div className={`${this.state.viewrow}`}   key={product.productId} style={{margin:`${this.state.listmargin}`,boxShadow:"2px 1px 2px lightgrey",backgroundColor:"white"}}> 
                <div className={`${this.state.viewcolOne}`} >
           <img className="mainImg img-responsive" src={require (`./images/${product.mainimg}`)} style={{maxWidth:"100%"}} ></img>
           </div>
           <div className={`${this.state.viewcolTwo}`} >
        <small style={{float:"left",textTransform:"capitalize",display:`${this.state.displayviewbrand}`}}>{product.brand} <br/></small>
           <div className="detaildiv" style={{lineHeight:"16px"}}>
             
            <div  className="details">
            <Link to ={`/product/${product.details}`} style={{color:'black',display:`${this.state.griddetails}`}}>
     <small style={{display:"inline-block",fontSize:"13px"}}>{product.details.length > 40 ? product.details.slice(0,40)+ "..." : product.details +"-"+ product.model +"-"+ product.color}</small>  
       </Link>
       <Link to ={`/product/${product.details}`} style={{color:'black',display:`${this.state.listdetails}`}}>
     <small style={{display:"inline-block",fontSize:"13px"}}>{product.details.length > 60 ? product.details.slice(0,60)+ "..." : product.details +"-"+ product.model +"-"+ product.color}</small>  
       </Link>
        </div>
        <small style={{fontWeight:"bold",fontSize:"14px"}}>{product.mainprice}</small> <br/>
       <div><small class="text-muted" style={{textDecoration:"line-through",fontSize:"12px"}}>{product.discount ? product.mainprice : null}</small><b className="badge" style={{fontSize:"12px",fontWeight:"bolder",color:"rgba(0, 119, 179)",backgroundColor:"rgba(0, 119, 179,0.1)",float:"right"}}>{product.discount ? `-${product.discount}%` : null}</b></div>
       {product.numOfRating > 0 ?
       <div>
         <div className="outer">     
          <div className="inner" style={{width:`${product.percentrating}%`}}>   
  
          </div> 
          </div>
          <small style={{fontSize:"12px"}}>({product.numOfRating || 0}) </small></div> : null }<br/>
       <small className="text-muted" style={{letterSpacing:"-1px",textTransform:"capitalize"}}><b style={{color:"orange"}}>{product.store}</b> @ <span className="fa fa-map-marker-alt"></span>{product.lga}</small>
          <div><img src={require(`./images/fruget.jpg`)} className="imgSymbol" style={{float:"right"}}></img></div>
         </div>
         <br/>
        <center   style={{display:`${window.innerWidth >= 600 ? this.state.viewaddtocartbutton : `none`}`,width:`${this.state.viewcartbtnwidth}`}}>
        <br/>
        <button style={{display:"none"}} type="button" className="btn addtocartbtn" onClick={()=>this.addtocart(product.productId)} >
         <span>ADD TO CART</span></button><br/>
        </center><br/>
        </div>
           </div> 
           
         )}
         
             </div>
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
             <center>
             <Pagination size="sm">
             <Pagination.First />
             <Pagination.Prev />
               <ul className="pagination pagination-circle pg-blue">
                  {PageNumbers.map(pages =>
                    <Pagination.Item key={pages} onClick={() =>this.paginate(pages)} active={pages === active}>
                      {pages}
                    </Pagination.Item>
                    )}
               </ul>
               <Pagination.Next />
               <Pagination.Last />
             </Pagination>
             </center>
            
<<<<<<< HEAD
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
                    Filter 
                  </button>
               
                 </div>
               </div>
             </div>

>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
          </div>
        </div>
      </div>
      </div>
     );
                  }else{
                    return (  
                      <div  style={{backgroundColor:`${this.props.userdetails.background==="black"?"rgb(38,38,38)":"rgb(242, 242, 242)"}`,color:`${this.props.userdetails.background === "black" ? "white" : this.props.userdetails.background === "white"?"black" : "black"}`}}>
                      <div className="container">
                        <div className="row" style={{padding:"0px",display:"none"}}>
                          <div className="col-12">
                          <Inputdata></Inputdata>
                          </div>
                          <div className="col-9">
            <small> <span style={{fontWeight:"bolder"}}>{this.props.numOfRows}</span> Products Found</small>           
                          </div>
                          <div className="col-3 dodo">
                          <small>
                        <small>
                        ({(((this.props.currentPage || 1)-1)*20) + 1} - {(this.props.currentPage || 1)*(this.props.numOfRows < 20 ? this.props.numOfRows : 20)}) of  
                        <span >
                         {" " +this.props.numOfRows} products
                        </span>
                        </small>
                      </small><br/>
                          <center>
                        <div style={{display:"flex",flexWrap:"nowrap"}}>
                          <div style={{marginTop:"8px"}}>
                            <small >
                            Sort By : 
                            </small>
                          </div>
                          <div>
                          <Dropdown>
              <Dropdown.Toggle style={{ border:"none",fontWeight:"bolder",color:"rgb(0, 119, 179)"}} id="dropdown-basic">
               <small> {this.state.parsedQuery.sort || "popularity"}</small>
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
                          <div style={{padding:"10px"}}>
                          <i class="fa fa-th" style={{color:`${this.state.parsedQuery.view === "grid"  ? "rgb(0, 119, 179)" : this.props.userdetails.background === "black" ? "white" : this.props.userdetails.background === "white"?"black" : "black"}`}} onClick={this.grid}></i>
                          </div>
                          <div style={{padding:"10px"}}>
                          <i class="fa fa-grip-vertical" style={{color:`${this.state.parsedQuery.view === "list" ? "rgb(0, 119, 179)" : this.props.userdetails.background === "black" ? "white" : this.props.userdetails.background === "white"?"black" : "black"}`}} onClick={this.list}></i>
                          </div>
                        </div>
                        </center>
                      </div>
                        </div>       
                    <div className='row'>
                    <div className="d-none d-lg-block col-lg-3" style={{backgroundColor:"white",padding:"5px"}}>
                      <SearchSideNavbar category={this.props.match.params.category}/>
                    </div>
                      <div className='col-12 col-lg-9 boxshadower' style={{backgroundColor:"white",padding:"10px"}}>
                <div className='row' style={{display:`${this.state.view === "grid" ? "inline-block" : "none"}`,padding:"5px"}}>   
                      <div className="col-12" style={{borderBottom:"1px solid lightgrey",backgroundColor:`${this.props.userdetails.background ||"white"}`,color:`${this.props.userdetails.background === "black" ? "white" : this.props.userdetails.background === "white"?"black" : "black"}`}}>
                        <small style={{fontSize:'20px',textTransform:"capitalize"}}>{this.props.inputval || parsedQuery.search}</small>
                        <small style={{float:"right"}}>{" " +this.props.numOfRows} Products Found </small>
                      </div>   
                     
                      {this.state.view === "grid" ? this.props.searchedproducts.map((product) =>          
           <div className="col-6 col-md-4 col-lg-3 mb-1 "  style={{marginBottom:"0px",width:"100%",padding:"3px",display:"inline-block"}}  key={product.productId} >        
           <div className={`${this.state.hoverapp} smhoveredapp smunhoveredapp`} style={{backgroundColor:`${this.props.userdetails.background || "white"}`,padding:"5px"}}>
          <div>
          <span onClick={()=>this.save({productId:product.productId,details:product.details})} className={this.props.userdetails.savedItems && JSON.parse(this.props.userdetails.savedItems).includes(parseInt(product.productId)) ? "fa fa-heart" : "far fa-heart"} style={{position:"absolute",fontSize:"20px",top:"10px",left:"10px", color:"orange"}}></span>
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
            
            
            
            
            
                         <div className='row' style={{display:`${this.state.view === "list" ? "inline-block" : "none"}`,padding:"3px"}}>   
                      <div className="col-12" style={{borderBottom:"1px solid lightgrey",backgroundColor:`${this.props.userdetails.background ||"white"}`,color:`${this.props.userdetails.background === "black" ? "white" : this.props.userdetails.background === "white"?"black" : "black"}`}}>
                        <small style={{fontSize:'20px',textTransform:"capitalize"}}>fan</small>
                        <small style={{float:"right"}}>{" " +this.props.numOfRows} Products Found </small>
                      </div>   
                      
                       {this.props.searchedproducts.length > 0 ? this.props.searchedproducts.map((product) =>          
            <div className="col-12  rowclasslist" onMouseOver={this.hoverapp}  style={{backgroundColor:`${this.props.userdetails.background ||"white"}`,color:`${this.props.userdetails.background === "black" ? "white" : this.props.userdetails.background === "white"?"black" : "black"}`,display:`${this.state.view === "list" ? "block" : "none"}`,margin:"2px 0px",padding:"3px"}}  key={product.productId} >               
                    <div className="row"  style={{margin:"0px"}}>
                      <div className="col-5 col-md-4 col-lg-3"  style={{margin:"0px"}}>
                        <center>
                        <img className="mainImg img-responsive" src={`https://res.cloudinary.com/fruget-com/image/upload/${product.generalcategory}/${product.category}/${product.mainimg || 'emptyimg.jpg'}`} ></img>
                        </center>
                      </div>
                      <div className="col-7" style={{margin:"0px"}}> 
            <small style={{float:"left",width:"100%",textTransform:"capitalize"}}>{product.brand}</small>
                       <div className="detaildiv" style={{lineHeight:"16px"}}> 
                        <div  className="details">  
                 <small onClick={()=>this.openDetails(product.productId)} style={{color:`${this.props.userdetails.background === "black" ? "white" : this.props.userdetails.background === "white"?"black" : "black"}`,fontSize:"11px"}}>{product.details.length > 50 ? product.details.slice(0,50)+ "..." : product.details +"-"+ product.model +"-"+ product.color}</small>  
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
                      <span></span>   
                     </center>}     
                         </div>
            
            
            
            
                         <center>
                         <Pagination size="sm">
                         <Pagination.First />
                         <Pagination.Prev />
                           <ul className="pagination pagination-circle pg-blue">
                              {PageNumbers.map(pages =>
                                <Pagination.Item key={pages} onClick={() =>this.paginate(pages)} active={pages === active}>
                                  {pages}
                                </Pagination.Item>
                                )}
                           </ul>
                           <Pagination.Next />
                           <Pagination.Last />
                         </Pagination>
                         </center>
                        
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
                                Filter 
                              </button>
                           
                             </div>
                           </div>
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
       searchedproducts: store.searchedproducts,
       test:store.test,
       status:store.status,
       searcher: store.searcher,
       inputval: store.inputval,
       searchedbrands : store.searchedbrands,
       searchedsizes : store.searchedsizes,
       searchedcolours: store.searchedcolours,
       currentPage: store.currentPage,
       totalPages: store.totalPages,
       numOfRows:store.numOfRows,
       userdetails:store.userdetails,
        cart:store.shoppingcart
     }
 }
 const mapDispatchToProps =(dispatch)=>{
   return{
     test: ()=> dispatch(test()),
     submitsearcher: (data)=> dispatch(submitsearcher(data)),
     viewuserdetailsbyuserId:(data)=>dispatch(viewuserdetailsbyuserId(data))
   }
 }
 export default compose(withCookies, connect(mapStateToProps, mapDispatchToProps))(SearchApp);