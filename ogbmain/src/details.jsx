import React, { Component } from 'react';
// import {BrowserRouter as Router} from 'react-router-dom'
import axios from 'axios'
import "./main.css"
import querystring from "query-string"
import ReactHtmlParser from "react-html-parser"
<<<<<<< HEAD
import {Link,Redirect} from "react-router-dom"
import Suggestions from "./suggestions"
import {connect} from "react-redux"
//, Cookies
import MapContainer from "./mapcontainer"
 import {withCookies} from "react-cookie"
import { instanceOf } from 'prop-types';
import {compose} from 'redux'
import Cookies from "js-cookie"
import {unloading,setredirect,likecomment,dislikecomment,setdisplayproductrating,getdetails,undisplaysavemodal,checksaveItem,saveItem,addtocart,getseller,undisplaymodal,viewsellerdetails,followseller} from "./store"
import {getDistanceFromLatLonInKm} from "./mapdistance"
import {formater} from "./formatTime"
import {withRouter} from 'react-router';
=======
import {Link} from "react-router-dom"
import Suggestions from "./suggestions"
import {connect} from "react-redux"
import {getdetails, addtocart, undisplaymodal} from "./store"
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac

const logo = require("./images/goodmark.ico")
const logo2 = require("./images/good16.ico")
const sad = require("./images/sadmain.ico")

class Details extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
      };
    constructor(props) {
        super(props);
        this.state = { 
            product:[],
            display: "none",
            userId:null,
            comment:"Excellent Product",
            chooserating:5,
            similiarproducts:[],
            similiarproductsbybrand:[],
            save:"orange",
<<<<<<< HEAD
            displaysavemodal:"none",
            checkfollow:"",
            productId:"",
            viewmap:"none",
            userlat:"",
            userlng:"",
            mapHeight:"0%",
            bounce:"animated bounce",
            mainToken:null,
            preferredcolor:"",
            preferredinches:"",
            preferredlitres:"",
            preferredwattage:"",
            preferredkilogram:""
         }
    }
    componentDidMount =()=>{
setTimeout(() => removeBounce() ,10000)
const removeBounce = ()=>{
  this.setState({bounce:""})
}
if(navigator.geolocation){
  navigator.geolocation.getCurrentPosition(position =>{
    this.setState({userlat:position.coords.latitude,userlng:position.coords.longitude})
  })
}
const {cookies}=this.props
        window.addEventListener("click", this.handlemodalclick)
        window.addEventListener("click", this.handlesavemodalclick)
        window.addEventListener("click", this.handlemodalcartclick)
        if(this.props.productDetails.length === 0){
      let productId = this.props.match.params.productId;
      console.log("productId",productId)
      productId = productId.split("%2C")[1]
      console.log("productId",productId)
     
      let mainToken;
      if(Cookies.get("cm_pp") && this.props.sellerdetails.length === 0){
          const myToken = Cookies.get("cm_pp")
          let myMainTokenlen = parseInt(myToken.split("%")[0])
           let userIdlen = parseInt(myToken.split("%")[1])
           let userIdpos = parseInt(myToken.split("%")[2].charAt(0)+myToken.split("%")[2].charAt(1))
           let userId = myToken.slice(userIdpos, userIdpos+userIdlen)
            mainToken = myToken.slice(userIdpos+userIdlen, myMainTokenlen)
            this.setState({mainToken})
           let userId2 = mainToken.slice(userIdpos, userIdpos+userIdlen)
           console.log(userId)
           this.setState({productId,userId})
           const data ={productId,details:this.props.match.params.details,userId,token:cookies.get("token")}
           this.props.getdetails(data)
           this.props.getseller(data)
        //   this.props.checksaveItem(data)
       } else{
         this.props.setredirect()
       }
          }      
      }
      componentDidUpdate =(prevProps)=>{
        if(prevProps.productDetails !== this.props.productDetails){
          this.setState({preferredcolor:this.props.productDetails.color,preferredinches:this.props.productDetails.inches,
            preferredlitres:this.props.productDetails.litres,preferredwattage:this.props.productDetails.wattage,
            preferredkilogram:this.props.productDetails.kilogram})
        setTimeout(()=>this.props.unloading(),2000)
        }
          
=======
            displaysavemodal:"none"
         }
    }
    componentDidMount =()=>{
        axios.get(`http://fruget.herokuapp.com/customer/check/save?details=${this.props.match.params.details}`,{ headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`} })
        .then(res =>  this.setState({save:res.data}))
        .catch(err => console.warn(err)) 

        axios.get(`http://fruget.herokuapp.com/details/product/${this.props.match.params.details}`)
        .then(res => this.setState({product: res.data}))
        .catch(err => console.warn(err))  
      
        axios.get(`http://fruget.herokuapp.com/details/similiar/${this.props.match.params.details}`)
        .then(res => this.setState({similiarproducts: res.data}))
        .catch(err => console.warn(err))  

        axios.get(`http://fruget.herokuapp.com/details/similiarbrand/${this.props.match.params.details}`)
        .then(res => this.setState({similiarproductsbybrand: res.data}))
        .catch(err => console.warn(err))  
        const parsedquery = querystring.parse(this.props.match.location);
        console.log("parsequery", parsedquery)

        window.addEventListener("click", this.handlemodalclick)
        window.addEventListener("click", this.handlesavemodalclick)
        window.addEventListener("click", this.handlemodalcartclick)
if(this.props.productDetails.length === 0){
    this.props.getdetails(this.props.match.params.details)
}
      }
      save =()=>{
          axios.get(`http://fruget.herokuapp.com/customer/save?details=${this.props.match.params.details}`,{ headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`} })
          .then(res => this.setState({saveResponse:res.data, displaysavemodal:"block"}))
          .catch(err => console.log(err))
      }
      addtocart =()=>{

>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
      }
      handlemodalclick =(e) =>{
        //  this.modaldiv.style.display = "none" 
      }
      handlemodalcartclick =(e) =>{
        if(e.target == this.cartmodaldiv){
           this.props.undisplaymodal()
        }
       }
     //  this.props.secondconfirmationclearcart()
      handlesavemodalclick =(e) =>{
        if(e.target == this.savemodaldiv){
          const data ={
            productId: this.state.productId
          }
        this.props.undisplaysavemodal()
        this.props.checksaveItem(data) 
        }
       }        
      undisplaysavemodal=() =>{
        const data ={
          productId: this.state.productId
        }
        this.props.undisplaysavemodal()
     //   this.props.checksaveItem(data) 
      }
<<<<<<< HEAD
       displaymodal =(data) =>{
        this.setState({display:"block"})
      //   this.props.setdisplayproductrating()
=======
      handlemodalcartclick =(e) =>{
        if(e.target == this.cartmodaldiv){
           this.props.undisplaymodal()
        }
      }
      handlesavemodalclick =(e) =>{
        //  this.modaldiv.style.display = "none"
        if(e.target == this.savemodaldiv){
            this.setState({displaysavemodal:"none"})
        }
      }
      undisplaysavemodal=() =>{
        this.setState({displaysavemodal:"none"})
     }
       displaymodal =() =>{
         this.setState({display:"block"})
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
      }
      undisplaymodal =() =>{
        this.setState({display:"none"})
     }
     addtocart=(id)=>{
<<<<<<< HEAD
       const data ={
         inches:this.state.preferredinches,
         litres:this.state.preferredlitres,
         wattage:this.state.preferredwattage,
         kilogram:this.state.preferredkilogram,
         color:this.state.preferredcolor,
         id
       }
        this.props.addtocart(data) 
=======
        this.props.addtocart(id) 
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
       }
     undisplaycartmodal =() =>{
      this.props.undisplaycartmodal()
     }
     change =(e) =>{
        this.setState({comment:e.target.value})
        if(this.state.comment.length >= 29){
            alert("please!!! comment cannot exceed 30 characters ")
        }
     }
     change2=(e)=>{
         if(e.target.value > 5){
            return this.setState({chooserating:1})
         }
         else if(e.target.value < 1){
            return this.setState({chooserating:1})
         }
            else if(e.target.value >4 && e.target.value <= 5){
            return    this.setState({comment: "Excellent Product",chooserating:e.target.value})
            }
         else if(e.target.value >3 && e.target.value <= 4){
               this.setState({comment: "Very Good Product",chooserating:e.target.value})
           }
          else if(e.target.value >2 && e.target.value <= 3){
               this.setState({comment: "Good Product",chooserating:e.target.value})
           }
           else if(e.target.value >1 && e.target.value <= 2){
               this.setState({comment: "Average Product",chooserating:e.target.value})
           }
          else if(e.target.value == 1){
               this.setState({comment: "Very Poor",chooserating:e.target.value})
           }          
     }
     likecomment=(e,datum)=>{
       const data ={
        commentId:datum.commentId,
        productId:datum.productId
       }
        let element = e.currentTarget
     element.classList.add("animated")
     element.classList.add("bounce")
     setTimeout(()=> returnClass(element), 2000);
     function returnClass(element){
      element.classList.remove("animated")
      element.classList.remove("bounce")
     }
     this.props.likecomment(data)
     }
     dislikecomment=(e,datum)=>{
      const data ={
       commentId:datum.commentId,
       productId:datum.productId
      }
      let element = e.currentTarget
      element.classList.add("animated")
      element.classList.add("bounce")
      setTimeout(()=> returnClass(element), 2000);
      function returnClass(element){
       element.classList.remove("animated")
       element.classList.remove("bounce")
      }
      this.props.dislikecomment(data)
    }
     submitrating =(e)=>{
         e.preventDefault();
         const navigation={
          appCodeName:navigator.appCodeName,
          appVersion:navigator.appVersion,
          userAgent:navigator.userAgent,
          navigator:navigator.platform,
          product:navigator.product   
        };
         const data ={
           productId:this.state.productId,
             rating: this.state.chooserating,
             comment: this.state.comment
         }
<<<<<<< HEAD
        axios.post(`http://localhost:5000/details/${this.props.match.params.details}/rate/product`, {data: JSON.stringify(data)},
        { headers: {"Authorization" : `Markaranter ${Cookies.get("token")}`,"markaranterTwo":this.state.mainToken,"navigation":JSON.stringify(navigation)} })
=======
        axios.post(`http://fruget.herokuapp.com/details/${this.props.match.params.details}/rate`, {data: JSON.stringify(data)})
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
        .then(res => console.log(res.data))
        .catch(err => console.log(err)) 

        this.setState({comment:"Thank you for reviewing"}) 
     }
     changesrc =(src)=>{
    this.imgelement.src = src;    
    this.imgelement.style.boxShadow = "1px 2px 5px 2px lightgrey";
    console.log(this)
    }
    viewsellerdetails=(data)=>{
        this.props.viewsellerdetails(data)
        this.props.history.push(`/in_box/dk/00000${data}000in_box/${Math.floor(Math.random())}`)
    }
    followseller =(data)=>{
    this.props.followseller(data)
    }
    
    save =()=>{
     let data={
       productId :this.props.productDetails.productId,
       details: this.props.productDetails.details
      }
 this.props.saveItem(data)  
     }
     preferredcolorchange=(e)=>{
     this.setState({preferredcolor:e.target.value})
     }
     preferredincheschange=(e)=>{
      this.setState({preferredinches:e.target.value})
      }
      preferredlitreschange=(e)=>{
        this.setState({preferredlitres:e.target.value})
        }
        preferredwattagechange=(e)=>{
          this.setState({preferredwattage:e.target.value})
          }
          preferredkilogramchange=(e)=>{
            this.setState({preferredkilogram:e.target.value})
            }
            
    render() { 
<<<<<<< HEAD
      console.log(this.props.userdetails.savedItems)
      if(this.props.redirect){
        return <Redirect to={{ pathname: '/customer/login',state: { from: this.props.location }}} />
    }
    if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
   return (   
       <div className="navbarcomponentlg" style={{backgroundColor:`${this.props.userdetails.background === "black" ? "black" : "#f5f5f0"}`}}>
         <div className="contain" >
       <div>
=======
        console.log(this.props)
   return (   
       <div className="">
         <div className="container" style={{backgroundColor:"#f5f5f0"}}>
             <Suggestions></Suggestions>
        {this.props.productDetails.map((products) =>
       <div key={products.productId}>
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
           <small style={{textTransform:"capitalize"}}> <a href="">home</a>  / 
             <a href="">{this.props.productDetails.subcat1 }</a>  / <a href="">{this.props.productDetails.subcat2 }</a>  / <a href="">{this.props.productDetails.subcat3 }</a> / <a href="">{this.props.productDetails.brand }</a> 
             <span className="fa fa-arrow-right" style={{padding:"10px"}}></span>
              <span style={{color:"grey"}}>{this.props.productDetails.details }</span> - </small>
           <br/>
        <div> 
           <center> 
<<<<<<< HEAD
        {this.props.productDetails.officialimg && this.props.productDetails.officialimg[1] !== undefined && JSON.parse(this.props.productDetails.officialimg) !== undefined ? 
<img src={ require (`./images/${JSON.parse(this.props.productDetails.officialimg)[1]}`)} style={{maxWidth:"70%"}} /> : null}              
           </center>
           <br/> 
           <div className="row">
           <div className="col-9" style={{padding:"0 15px"}}>
             <div style={{padding:"0px 10px"}}>
        <div className="row boxshadower" style={{backgroundColor:"white"}}> 
            <div className="col-6 imgshowcase" >
            <center>
            <div className="lgdeviceimgshowcaseflex" >
            {this.props.productDetails.img1 ? Object.values(JSON.parse(this.props.productDetails.img1)).map(img =>
=======
        {JSON.parse(products.officialimg)[1] !== undefined && JSON.parse(products.officialimg) !== undefined ? 
        <img src={require (`./images/${JSON.parse(products.officialimg)[1]}`)} style={{maxWidth:"70%"}} /> : null}
               
           </center>
           <br/>
        <div className="row" style={{padding:"0px 10px"}}> 
            <div className="col-12 col-lg-6 imgshowcase">
            <center>
            <div className="bigdeviceimgshowcaseflex" >
            {Object.values(JSON.parse(products.img1)).map(img =>
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
            <div key={img} style={{border:"1px solid grey"}}>           
               <img
onClick={() => this.changesrc(`https://res.cloudinary.com/fruget-com/image/upload/${this.props.productDetails.generalcategory}/${this.props.productDetails.category}/${img}`)} 
src={`https://res.cloudinary.com/fruget-com/image/upload/${this.props.productDetails.generalcategory}/${this.props.productDetails.category}/${img}`} 
className="img-responsive" style={{padding:"0px",maxWidth:"100%"}}>    
</img>
            </div>   
          ) : null} 
          </div>
<<<<<<< HEAD
         <div className="smalldeviceimgshowcase" style={{display:"none"}}>
         {this.props.productDetails.img1 ? Object.values(JSON.parse(this.props.productDetails.img1)).map(img =>                  
 <img src={`https://res.cloudinary.com/fruget-com/image/upload/${this.props.productDetails.generalcategory}/${this.props.productDetails.category}/${img}`} className="img-responsive" style={{borderRadius:"10px",margin:"4px",width:`${Object.values(JSON.parse(this.props.productDetails.img1)).length === 1 ? "100%" : "80%"}`}}></img>
          ) : null} 
        </div>
<img ref={(a)=> this.imgelement = a} src={`https://res.cloudinary.com/fruget-com/image/upload/${this.props.productDetails.generalcategory}/${this.props.productDetails.category}/${this.props.productDetails.img1 ? JSON.parse(this.props.productDetails.img1)[1] : null}`} style={{width:"100%",display:"block"}} className="bigdeviceimgshowcase img-responsive"></img>
              <h2 style={{float:"right",top:"5%",right:"25%", position: "absolute"}} onClick={this.save}>
              {this.props.categoryloading ? 
                   <center>
                   <img src={require(`./images/35.gif`)} style={{width:"38%"}}/>
                   </center>
                :
       <i className={`${this.state.bounce} ${this.props.userdetails.savedItems && JSON.parse(this.props.userdetails.savedItems).includes(parseInt(this.props.productDetails.productId)) ? "fa fa-heart" :"far fa-heart"}`} style={{color:"orange"}}>  
       </i>
               }
             </h2>
             <small><a href=""><span className="fa fa-star-half-alt" style={{color:"orange"}}></span> see our review on this product</a></small><br/>
            <small><a href="">PROMOTIONS</a></small><br/>
            <small>share this product on</small><br/>
                </center>
            </div> 
            <div className="col-5 col-md-6 detailmarginal" style={{width:"100%",backgroundColor:`${this.props.userdetails.background || "white"}`,color:`${this.props.userdetails.background === "black" ? "white" : "black"}`}} >
           <p style={{textTransform:"uppercase"}}>{this.props.productDetails.details} -{this.props.productDetails.model} -{this.props.productDetails.color}</p>
         <small>Brand : {this.props.productDetails.brand} | similiar this.props.productDetails from {this.props.productDetails.brand}</small><br/>
            <div style={{float:"right",fontSize:"20px"}} onClick={()=>this.save(this.props.productDetails.productId)}>
            {this.props.categoryloading ? 
                   <center style={{color:"green"}}>
                    <img src={require(`./images/35.gif`)} style={{width:"38%"}}/>
                   </center>
                :
                <i className={`${this.state.bounce} ${this.props.userdetails.savedItems && JSON.parse(this.props.userdetails.savedItems).includes(parseInt(this.props.productDetails.productId)) ? "fa fa-heart" :"far fa-heart"}`} style={{color:"orange"}}>
                 </i> 
              }
           </div>
            <small>SKU code : 20202908{this.props.productDetails.productId}</small><br/>
         <small style={{textTransform:"capitalize"}}>Seller : {this.props.productDetails.store}</small>
         <small className="badge badge-sm" style={{marginLeft:"4px",color:"white",backgroundColor:"#cc0000",fontSize:"10px"}}><span className="fa fa-shield-alt" ></span></small><br/>
         
            <small>Warranty: {this.props.productDetails.warranty}</small><br/>
            <small>           
=======
         <div className="smalldeviceimgshowcase">
         {Object.values(JSON.parse(products.img1)).map(img =>                  
        <img   src={require(`./images/${img}`)} className="img-responsive" style={{borderRadius:"10px",margin:"4px",width:`${Object.values(JSON.parse(products.img1)).length === 1 ? "100%" : "80%"}`}}></img>
          )} 
              </div>
<img ref={(a)=> this.imgelement = a} src={require (`./images/${JSON.parse(products.img1)[1]}`)} style={{width:"100%"}} className="bigdeviceimgshowcase img-responsive"></img>
              <h2 style={{float:"right",top:"5%",right:"25%", position: "absolute"}} onClick={this.save}>
                    <i className="fab fa-gratipay" style={{color:`${this.props.save}`}}></i>
                </h2>
                </center>
            </div>
            <div className="col-12 col-lg-6 detailmarginal" style={{width:"100%",backgroundColor:"white"}} >
            
           <p style={{textTransform:"uppercase"}}>{products.details} -{products.model} -{products.color}</p>
         <small>Brand : {products.brand} | similiar products from {products.brand}</small><br/>
            <div style={{float:"right",fontSize:"20px"}} onClick={this.save}>
                    <i className="fab fa-gratipay" style={{color:`${this.props.save}`}}></i>
                </div>
            <small>SKU code : 20202908{products.productId}</small><br/>
            <small>Warranty: {products.warranty}</small><br/>
            <small>
                <h4 style={{float:"right"}}>
            <small style={{color:"rgb(0, 119, 179)"}}>{this.props.save === "rgb(0, 119, 179)" ? "saved" : null}</small>
                </h4>
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
            <div className="outer">
          <div className="inner" style={{width:`${this.props.productDetails.productrating*20 || 0}%`}}>
          </div>
        </div> <b>({this.props.productDetails.ratingscount || 0} Reviews) </b>
           </small>          
           {this.props.productDetails.initialprice !== null ? <div>
           <small style={{fontSize:"20px"}}>{this.props.productDetails.mainprice}</small><small className="ml-3" style={{color:"orange"}}>- {this.props.productDetails.discount}%</small><p style={{float:"right",textDecoration:"line-through",color:"grey"}}>{this.props.productDetails.initialcost}</p>
           </div> : <h4>{this.props.productDetails.mainprice}</h4>}
        <br/>
          <div className="row">
              <div className="col-7">
                <div className="row">
                <div className="col-4">
                <small style={{fontWeight:"bold"}}>COLOR </small>
                </div>
                <div className="col-8">
                {this.props.productDetails.coloursavail ? JSON.parse(this.props.productDetails.coloursavail).split(",").map(colors=>
              <div key={colors}>
                  <input type="checkbox" value={colors} onChange={this.preferredcolorchange} checked={this.state.preferredcolor===colors ? true : false}/> 
                  <small style={{textTransform:"uppercase"}}> {colors}</small>
               <span className="ml-1 mr-1 mb-5" style={{borderRadius:"60%",fontSize:"8px",lineHeight:"0.2px",margin:"0px",padding:"0px 5px",border:"1px solid grey",backgroundColor:`${colors}`,color:`${colors}`}}><small>.</small></span> 
              </div>  
           ) : null}   
                </div>  
                </div>
              </div>
                <div className="col-5">
                  <div className="row">
                    <div className="col-4">
                <small style={{fontWeight:"bold"}}>SIZES </small>
                </div>
                <div className="col-8">
                {this.props.productDetails.inchesavail && JSON.parse(this.props.productDetails.inchesavail).split(",").length > 0 ? JSON.parse(this.props.productDetails.inchesavail).split(",").map(inches=>
              <div key={inches}>
                  <input type="checkbox" value={inches} onChange={this.preferredincheschange} checked={this.state.preferredinches===inches ? true : false}/> 
                  <small style={{textTransform:"uppercase"}}> {inches}</small>
              </div>  
           )  : null}
           {this.props.productDetails.litresavail && JSON.parse(this.props.productDetails.litresavail).split(",").length > 0 ? JSON.parse(this.props.productDetails.litersavail).split(",").map(litres=>
              <div key={litres}>
                  <input type="checkbox" value={litres} onChange={this.preferredlitreschange} checked={this.state.preferredlitres===litres ? true : false}/> 
                  <small style={{textTransform:"uppercase"}}> {litres}</small>
              </div>  
<<<<<<< HEAD
           )  :  null}  
          {this.props.productDetails.wattageavail && JSON.parse(this.props.productDetails.wattageavail).split(",").length > 0 ? JSON.parse(this.props.productDetails.wattageavail).split(",").map(wattage=>
              <div key={wattage}>
                  <input type="checkbox" value={wattage} onChange={this.preferredwattagechange} checked={this.state.preferredwattage===wattage ? true : false}/> 
                  <small style={{textTransform:"uppercase"}}> {wattage}</small>
              </div>  
           )  :  null} 
            {this.props.productDetails.kilogramavail && JSON.parse(this.props.productDetails.kilogramavail).split(",").length > 0 ? JSON.parse(this.props.productDetails.kilogramavail).split(",").map(kilogram=>
              <div key={kilogram}>
                  <input type="checkbox" value={kilogram} onChange={this.preferredkilogramchange} checked={this.state.preferredkilogram===kilogram ? true : false}/> 
                  <small style={{textTransform:"uppercase"}}> {kilogram}</small>
              </div>  
           )  :  null}   
                </div>
                  </div>
                </div>
            </div> 
           <br/>
            <button type="button" className="lgcartbutton" onClick={()=>this.addtocart(this.props.productDetails.productId)}>
                <span className="fa fa-cart-plus" style={{float: "left", color:"white"}}></span>
            <small style={{fontSize:"15px",color:"white"}}>ADD TO CART</small></button>
            <small style={{color:`${ this.props.userdetails.savedItems && JSON.parse(this.props.userdetails.savedItems).includes(parseInt(this.state.productId)) ? "green" : "orange"}`}}>
              {this.props.userdetails.savedItems && JSON.parse(this.props.userdetails.savedItems).includes(parseInt(this.state.productId))  ? "you saved this product" : "would you like to add this product to your repository"}`</small><br/>
=======
           )  : <small>{products.color}</small>}   
                </div>
            </div> 
           
            <button type="button" className="cartbutton" onClick={()=>this.addtocart(products.productId)}>
                <span className="fa fa-cart-plus" style={{float: "left", color:"white"}}></span>
            <small style={{fontSize:"15px",color:"white"}}>ADD TO CART</small></button>


>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
            <small><a href=""><span className="fa fa-star-half-alt" style={{color:"orange"}}></span> see our review on this product</a></small><br/>
            <small><a href="">PROMOTIONS</a></small><br/>
            <small>share this product on</small><br/>
            </div>
            </div>   
            <br/>       
            <div className="row boxshadower" style={{backgroundColor:`${this.props.userdetails.background}`,color:`${this.props.userdetails.background === "black" ? "white":"black"}`,padding:"10px"}}>
            <div className="col-12">
                <small>MEET THE SELLER</small>
                <small style={{float:"right"}}><button className="btn btn-danger btn-sm" onClick={()=>this.viewsellerdetails(this.props.seller.userId)}>Message Seller</button></small>
                <hr/>
      <div className="row">
       <div className="col-5" style={{padding:"10px"}} >       
       <img src={this.props.seller.profileImage ? `https://res.cloudinary.com/fruget-com/image/upload/profile/${this.props.seller.profileImage}`: require(`./images/maleprofile.png`)} className="img-thumbnail" style={{borderRadius:"50%",width:"100%",height:"300px"}}  alt=""/>
                 <br/>
                 <br/>
                 <small style={{float:"right"}}>
<button onClick={()=>this.followseller(this.props.seller.userId)} style={{border:"none",backgroundColor:`${this.props.categoryloading ? "white" : "orange"}`,color:"white"}} className="btn btn-sm">
                   {this.props.categoryloading ? 
                   <center>
                   <img src={require(`./images/35.gif`)} style={{width:"38%"}}/>
                   </center>
                   : 
                   this.props.userdetails.following && JSON.parse(this.props.userdetails.following).includes(parseInt(this.props.seller.userId))
                   ? "Following" :"Follow"
                   //cart
                  }
                   </button><br/>
                   </small>
                 </div>  
                   <div className="col-7" style={{padding:"0px 30px"}}>
<small style={{padding:"0px"}}> <span className="fa fa-user-shield"></span> : <span style={{textTransform:"capitalize"}}>{this.props.seller.fullName}</span></small><br/>
 <small className=""> <span className="fa fa-envelope 2x"></span> @<span >{this.props.seller.email}</span></small><br/>
<small className=""> <span className="fa fa-home mr-2"></span> <span style={{fontWeight:"bold",textTransform:"capitalize"}}>"{this.props.seller.businessName}"</span> located at <span >{this.props.seller.state+" , "+this.props.seller.lga}</span></small><br/>
<small className=""> <span className="fab fa-twitter 2x mr-2"></span> <span >AdeIsCrown</span></small><br/>
<small className=""> <span className="fab fa-facebook-square 2x mr-2"></span><span > Eze Ogbonnaya</span></small><br/>
<small className=""> <span className="fa fa-link mr-2"></span><span ><a style={{color:"green"}} href={`http://localhost:3000/fruget/myproducts/${this.props.seller.businessName}`}> {` http://localhost:3000/fruget/myproducts/${this.props.seller.businessName}`}</a></span> <span title="click to share link" className="fa fa-reply ml-2"></span></small><br/>
      <small style={{padding:"0px"}}><span className="fa fa-mobile"></span> : {this.props.seller.contact}</small><br/>
                 <small style={{padding:"0px"}}><span className="fa fa-users"></span> :  {this.props.seller.followers ? JSON.parse(this.props.seller.followers).length : null}
                 <small style={{float:"right",color:"orange"}}>
{this.props.seller.followers && JSON.parse(this.props.seller.followers).includes(parseInt(this.state.userId)) ? 
"You and " + (parseInt(JSON.parse(this.props.seller.followers).length) <= 1 ? 0 : (parseInt(JSON.parse(this.props.seller.followers).length)-1).toString()) + " others followed " + this.props.seller.businessName : null }
                  </small>
                 </small>
                 <br/>
<small><span className="fa fa-check-circle" style={{color:"orange",fontSize:"15px"}}></span> Verified Sales : 20</small> <br/>
                   Seller Rating : <small>
                     <div className="outer">
                         <div className="inner" style={{width:"20px"}}>
                         </div>
                     </div>
                 </small><br/>
                 <small><span className="fa fa-globe-asia"></span> : http://localhost:3000/product/standing%20fan</small><br/>
                 <small style={{cursor:"pointer"}}>Distance in <b>km</b> : <b> {getDistanceFromLatLonInKm(this.state.userlat,this.state.userlng,parseFloat(this.props.seller.storelat),parseFloat(this.props.seller.storelong)).toFixed(2)} </b> KM <small className="text-muted"> (as crow flies)</small></small><br/>
                <small style={{cursor:"pointer"}} onClick={()=>this.setState({viewmap:"block",mapHeight:"100%"})}>view on map</small>
                 </div>
                 {this.state.viewmap === "block" ?  
                 <div className="col-12" style={{width:"100%",transition:"height 3s",height:`${this.state.mapHeight}`}}>
                   <MapContainer lat={parseFloat(this.props.seller.storelat)} lng={parseFloat(this.props.seller.storelong)}/>          
                   </div>  
                    : null}
                 </div>                 
                 </div>        
            </div>
            <br/>
<<<<<<< HEAD
            <p>{this.props.otherstores.length > 0 ? "Other sellers" : null}</p>
            {this.props.otherstores.map(otherseller=>
              <div key={otherseller.userId} className="row" style={{borderBottom:"1px solid lightgrey",padding:"30px"}}>
               <div className="col-5">
               <img src={this.props.seller.profileImage ? `https://res.cloudinary.com/fruget-com/image/upload/profile/${otherseller.profileImage}`: require(`./images/maleprofile.png`)} className="img-thumbnail" style={{borderRadius:"50%",width:"80%",height:"150px"}}  alt=""/>
               <br/>
               <button onClick={()=>this.followseller(otherseller.userId)} style={{backgroundColor:`${this.props.categoryloading ? "white" : "orange"}`,color:"white"}} className="btn btn-sm">
                   {this.props.categoryloading ? 
                   <center>
                   <img src={require(`./images/35.gif`)} style={{width:"38%"}}/>
                   </center>
                   : 
                   this.props.userdetails.following && JSON.parse(this.props.userdetails.following).includes(parseInt(otherseller.userId))
                   ? "Following" :"Follow"
                   //this.props.checkfollow
                  }
                   </button><br/>

               </div>
               <div className="col-7" style={{padding:"0px 30px"}}>
<small style={{padding:"0px"}}> <span className="fa fa-user-shield"></span> : <span style={{textTransform:"capitalize"}}>{otherseller.fullName}</span></small><br/>
 <small className=""> <span className="fa fa-envelope 2x"></span> @<span >{otherseller.email}</span></small><br/>
 <small style={{padding:"0px"}}><span className="fa fa-mobile"></span> : {otherseller.contact}</small><br/>
<small className=""> <span className="fa fa-home mr-2"></span> <span style={{fontWeight:"bold",textTransform:"capitalize"}}>"{otherseller.businessName}"</span> located at <span >{otherseller.state+" , "+otherseller.lga}</span></small><br/>
                 <small style={{cursor:"pointer"}}>Distance in <b>km</b> : <b> {getDistanceFromLatLonInKm(this.state.userlat,this.state.userlng,parseFloat(otherseller.storelat),parseFloat(otherseller.storelong)).toFixed(2)} </b> KM <small className="text-muted"> (as crow flies)</small></small><br/>
<small className=""> <span className="fa fa-link mr-2"></span><span ><a style={{color:"green"}} href={`http://localhost:3000/fruget/myproducts/${otherseller.businessName}`}> {` http://localhost:3000/fruget/myproducts/${otherseller.businessName}`}</a></span> <span title="click to share link" className="fa fa-reply ml-2"></span></small><br/>
    <br/>
      <button className="btn" style={{backgroundColor:"orange",color:"white"}}>
       <small> BUY FROM THIS SELLER</small>
      </button>
               </div>
              </div>
              )}
            <div className="row boxshadower" style={{backgroundColor:`${this.props.userdetails.background}`,color:`${this.props.userdetails.background === "black" ? "white":"black"}`,padding:"10px"}}>
             <div classae="col-12">
               <center>
                   <p style={{textTransform:"uppercase", textAlign:"center"}}>{this.props.productDetails.model}</p>
         <small style={{width:"100%",textTransform:"capitalize"}}>{ReactHtmlParser(this.props.productDetails.entrytext)}</small>
=======
            <div className="row showcase text-muted" style={{position:"sticky",top:"0px",left:"0px",backgroundColor:"white",padding:"10px",zIndex:"2",margin:"5px 2px"}}>
              <div className="col-12">
                 <b style={{textTransform:"uppercase"}}>{products.details} -{products.model} -{products.color}</b><br/>
                <b style={{color:"orange"}}>{products.mainprice}</b><b style={{float:"right"}}>{- products.discount}</b><br/>
              </div>
            </div>
            <div style={{backgroundColor:"white",padding:"10px"}}>
               <center>
                   <p style={{textTransform:"uppercase", textAlign:"center"}}>{products.model}</p>
         <small style={{width:"100%",textTransform:"capitalize"}}>{ReactHtmlParser(products.entrytext)}</small>
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
         <br/>
         
             {this.props.productDetails.brand === "lg" ? <small style={{color:"grey"}}>
             The image of the product are for illustration purpose only and may differ from actual product.
51% Energy Saving In Refrigerator with Inverter Linear Compressor(ILC).
 Based on third party test under standard test conditions (ISO 15502) conducted exclusively for energy consumption,
  Models tested GBB530NSQWB (Reciprocating Compressor),
  GBB530NCXE (Inverter Linear Compressor).
 Actual Results may vary from model to model and also depends upon the kind of usage under general conditions.
             </small> : null}
        
         <div className="row">
            <div style={{display: "flex", flexWrap:"wrap", justifyContent:"space-between",overflow:"auto"}}>
         {this.props.productDetails.img1 && this.props.productDetails.featuresimg !== null && JSON.parse(this.props.productDetails.img1)[2] !== undefined ? Object.keys(JSON.parse(this.props.productDetails.featuresimg)).map(featureimg =>
         <div  key={featureimg} style={{padding:"15px"}}>
              <img src={ require (`./images/${JSON.parse(this.props.productDetails.featuresimg)[featureimg]}`)} style={{maxWidth:"100%",maxHeight:"100%"}} alt=""/>
         <div style={{color:"grey"}}>{ReactHtmlParser(featureimg)}</div>
          </div>         
         ) : null }
         
         </div>
        </div>
        </center> 
<<<<<<< HEAD
        </div>
     </div>
            <br/>
            <div className="row" id="features">
                <div className="col-6 boxshadower" style={{backgroundColor:`${this.props.userdetails.background}`,color:`${this.props.userdetails.background === "black" ? "white":"black"}`}}>
                    <p style={{ padding:"10px",margin:"0px"}}>Key Features :</p>
                {this.props.productDetails.features !== null && this.props.productDetails.features ? JSON.parse(this.props.productDetails.features).split(',').map(feature =>
                <div style={{ padding:"1px",margin:"0px",backgroundColor:`${this.props.userdetails.background}`,color:`${this.props.userdetails.background === "black" ? "white":"black"}`}}>
=======
     </div>
            <br/>
            <div className="row">
                <div className="col-12 col-lg-6" >
                    <p style={{border: "1px solid lightgrey", padding:"10px",margin:"0px",backgroundColor:"white"}}>Key Features :</p>
                {products.features !== null ? JSON.parse(products.features).split(',').map(feature =>
                <div style={{border: "1px solid lightgrey", padding:"2px",margin:"0px",backgroundColor:"white"}}>
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
                <small>
            <ul key={feature} style={{listStyleImage: `url(${logo})`}}>
                <li style={{textTransform: "capitalize"}}>{ReactHtmlParser(feature)}</li>
            </ul>   
            </small>   
            </div>      
                ) : "N/A"}
                </div>
<<<<<<< HEAD
            {this.props.productDetails.img1 ? JSON.parse(this.props.productDetails.img1)[2] !== undefined ? 
           <div className="col-6 detailmarginal ">
              <img src={`https://res.cloudinary.com/fruget-com/image/upload/${this.props.productDetails.generalcategory/this.props.productDetails.category}/${JSON.parse(this.props.productDetails.img1)[2]}`} style={{width:"100%"}} className="img-responsive" alt=""/>
=======
            {JSON.parse(products.img1)[2] !== undefined ? 
           <div className="col-12 col-lg-6 detailmarginal">
              <img src={require (`./images/${JSON.parse(products.img1)[2]}`)} style={{width:"100%"}} className="img-responsive" alt=""/>
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
           </div> : 
           <div className="col-6" style={{display:"flex",flexWrap:"wrap",width:"100%"}}>
           {JSON.parse(this.props.productDetails.featuresimg) !== null ? Object.keys(JSON.parse(this.props.productDetails.featuresimg)).map(featureimg =>
            <div key={featureimg} style={{padding:"15px"}}>
                <img src={`https://res.cloudinary.com/fruget-com/image/upload/${this.props.productDetails.generalcategory/this.props.productDetails.category}/${JSON.parse(this.props.productDetails.featuresimg)[featureimg]}`} alt=""/>
           <p style={{color:"grey"}}>{featureimg}</p>
            </div> 
           ) : null}
           </div>
          : null } 
            </div>
         <br/>
<<<<<<< HEAD
         {this.props.productDetails.productdescription && this.props.productDetails.productdescription.length > 0 ? 
         <center className="boxshadower" id="abouttheproduct" style={{backgroundColor:`${this.props.userdetails.background}`,color:`${this.props.userdetails.background === "black" ? "white":"black"}`,padding:"5px"}}>
=======
         <center style={{backgroundColor:"white",padding:"5px"}}>
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
         <h3>ABOUT THE PRODUCT</h3>
         <small style={{textTransform:"capitalize"}}>
         {ReactHtmlParser(this.props.productDetails.productdescription)}
         </small> <br/>
         </center>
         : null }
        
            <div className="row">
            {this.props.productDetails.img1 && JSON.parse(this.props.productDetails.img1)[3] !== undefined ? 
           <div className="col-6">
              { <img src={`https://res.cloudinary.com/fruget-com/image/upload/${this.props.productDetails.generalcategory/this.props.productDetails.category}/${JSON.parse(this.props.productDetails.img1)[3]}`} style={{width:"100%"}} className="img-responsive" alt=""/> }
           </div> : null} 
        { this.props.productDetails.maintenance && this.props.productDetails.maintenance.length > 0 ?
                <div className="col-6">
                <p>Usage / Maintenance : </p>
                {this.props.productDetails.maintenance && this.props.productDetails.maintenance !== null ? JSON.parse(this.props.productDetails.maintenance)["usage"].split(',').map(usage =>
                <small>                  
                    <ul key={usage} style={{listStyleImage: `url(${logo2})`}}>
                <li style={{textTransform: "capitalize"}}>{usage}</li>
               </ul>   
                </small>           
                ) : null}
                </div>
                : null}
            </div>
<<<<<<< HEAD
        
           {this.props.productDetails.branddescription && this.props.productDetails.branddescription.length > 0 ? 
    <center id="aboutthebrand" className="boxshadower" style={{backgroundColor:`${this.props.userdetails.background}`,color:`${this.props.userdetails.background === "black" ? "white":"black"}`,padding:"5px"}}>
=======
           <br/>

            <center style={{backgroundColor:"white",padding:"5px"}}>
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
           <h3>ABOUT THE BRAND</h3>
         <small style={{textTransform:"capitalize"}}>
         {ReactHtmlParser(this.props.productDetails.branddescription)}
         </small>
         </center>
         : null}
         <br/>
           <div className="row">
<<<<<<< HEAD
                <div className="col-6" >
                    <p style={{border: "1px solid lightgrey", padding:"10px",margin:"0px",backgroundColor:`${this.props.userdetails.background}`,color:`${this.props.userdetails.background === "black" ? "white":"black"}`}}>Key specifications :</p>
                    <div style={{border: "0.5px solid lightgrey", padding:"10px", margin:"0px",backgroundColor:`${this.props.userdetails.background}`,color:`${this.props.userdetails.background === "black" ? "white":"black"}`}}>
                        <small>
                <b>Brand : {this.props.productDetails.brand}</b><hr/>
                <b>Model : {this.props.productDetails.model}</b><br/>
                <b>Colours : </b> {this.props.productDetails.coloursavail && JSON.parse(this.props.productDetails.coloursavail) ?
                 JSON.parse(this.props.productDetails.coloursavail).split(",").map((color, i)=>
                 <span key={color}>
                     <span style={{fontWeight:`${this.props.productDetails.color === color ? "bold" : ""}`}}> {color}
      <span className="ml-1 mr-1 " style={{borderRadius:"60%",fontSize:"8px",lineHeight:"0.2px",margin:"0px",padding:"0px 5px",border:"1px solid grey",backgroundColor:`${color}`,color:`${color}`}}><small>.</small></span> 
     <span>{i + 1 < JSON.parse(this.props.productDetails.coloursavail).split(",").length ? ", " : null}</span>
                     </span>
                 </span>  
              )  : null}
           <br/>
            <b style={{fontWeight:"bold"}}>Sizes : </b>
                {this.props.productDetails.inchesavail && JSON.parse(this.props.productDetails.inchesavail).split(",").length > 0 ? JSON.parse(this.props.productDetails.inchesavail).split(",").map((inches, i)=>
            <span key={inches}>
                  <span style={{fontWeight:`${this.props.productDetails.inches === inches ? "bold" : ""}`}}> {inches}
                  <span>{i + 1 < JSON.parse(this.props.productDetails.inchesavail).split(",").length ? ", " : null}</span>
                  </span>
              </span>  
           )  : null}
           {this.props.productDetails.litresavail && JSON.parse(this.props.productDetails.litresavail).split(",").length > 0 ? JSON.parse(this.props.productDetails.litersavail).split(",").map(litres=>
              <div key={litres}>
                  <span style={{fontWeight:`${this.props.productDetails.litres === litres ? "bold" : ""}`}}> {litres}</span>
              </div>  
           )  :  null}  
          {this.props.productDetails.wattageavail && JSON.parse(this.props.productDetails.wattageavail).split(",").length > 0 ? JSON.parse(this.props.productDetails.wattageavail).split(",").map(wattage=>
              <div key={wattage}>
                  <small > {wattage}</small>
              </div>  
           )  :  null} 
            {this.props.productDetails.kilogramavail && JSON.parse(this.props.productDetails.kilogramavail).split(",").length > 0 ? JSON.parse(this.props.productDetails.kilogramavail).split(",").map(kilogram=>
              <div key={kilogram}>
                  <small style={{textTransform:"uppercase"}}> {kilogram}</small>
              </div>  
           )  :  null} 
          <br/>
                <b>Capacity: {this.props.productDetails.size}{this.props.productDetails.subcat1==="refrigerator" ? " Litres" : this.props.productDetails.subcat1==="fan" ? " inches" : " kg" }</b><br/>
                <b>Weight : {this.props.productDetails.weight || null}</b><br/>
                <b>Sku Code : 20202908{this.props.productDetails.productId}</b><br/>
                <b>Store : {this.props.productDetails.store}</b><br/>
                <b>Ratings : {this.props.productDetails.numOfRating || 0}</b><br/>
                <b>Total no of searches : {this.props.productDetails.rating}</b><br/>
        </small>
                    </div>               
                </div>
            {(this.props.productDetails.img1 && JSON.parse(this.props.productDetails.img1)[4]) !== undefined ? 
           <div className="col-6 detailmarginal" >
              <img src={`https://res.cloudinary.com/fruget-com/image/upload/${this.props.productDetails.generalcategory/this.props.productDetails.category}/${JSON.parse(this.props.productDetails.img1)[4]}`} style={{width:"100%"}} className="img-responsive" alt=""/>
           </div> : null} 
            </div>
          
   
=======
                <div className="col-12 col-lg-6" >
                    <p style={{border: "1px solid lightgrey", padding:"10px",margin:"0px",backgroundColor:"white"}}>Key specifications :</p>
                    <div style={{border: "0.5px solid lightgrey", padding:"10px", margin:"0px",backgroundColor:"white"}}>
                        <small>
                             <b>Brand : {products.brand}</b><hr/>
                <b>Model : {products.model}</b><br/>
                <b>Colour : {products.color}</b><br/>
                <b>Colours Available : {JSON.parse(products.coloursavail) || products.color}</b><br/>
                <b>Capacity: {products.size}{products.subcat1==="refrigerator" ? " Litres" : products.subcat1==="fan" ? " inches" : " kg" }</b><br/>
                <b>Weight : {products.weight || null}</b><br/>
                <b>Sku Code : 20202908{products.productId}</b><br/>
                <b>Store : {products.store}</b><br/>
                <b>Ratings : {products.numOfRating || 0}</b><br/>
                <b>Total no of searches : {products.rating}</b><br/>
                        </small>
                    </div>               
                </div>
            {(JSON.parse(products.img1)[4]) !== undefined ? 
           <div className="col-12 col-lg-6 detailmarginal" >
              <img src={require (`./images/${JSON.parse(products.img1)[4]}`)} style={{width:"100%"}} className="img-responsive" alt=""/>
           </div> : null} 
            </div>
 <div className="savemodaldiv" ref={(a) => this.savemodaldiv =a} id="savemodaldiv" style={{display:`${this.state.displaysavemodal}`,zIndex:"1",width:"100%",height:"100%",backgroundColor:"rgba(0,0,0,0.4)"}}>
 <div className="savediv"  style={{backgroundColor:"white"}}>
     <center>
            <h5 style={{padding:"50px"}}>{ReactHtmlParser(this.state.saveResponse)}</h5>
            
            <div className="row" style={{padding:"10px"}}>  
                    <div className="col-6">  
<button className="btn btn-danger" onClick={this.undisplaymodal} style={{boxShadow:"2px 3px lightgrey",padding:"8px",color:"white",width:"100%"}} type="button">Cancel</button> 
</div>
<div className="col-6">
<button className="btn btn-success"  style={{padding:"8px",color:"white",width:"100%",boxShadow:"2px 3px lightgrey"}} >Saved Items</button>
</div>         
               </div>
     </center>
     </div>
 </div>
 {this.props.loading ?     
   
          <center style={{position:"absolute", top:"50%",left:"50%"}}>
            <img src={require(`./images/35.gif`)} />
          </center>
      
        : null}
         <div className="mainmodaldiv" ref={(a) => this.cartmodaldiv =a} id="modaldiv" style={{display:`${this.props.display}`}}>
         <div className="modaldiv"  style={{backgroundColor:"white",borderRadius:"5px"}}>
           <p onClick={this.undisplaycartmodal}>x</p>
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
<button className="btn btn-warning continueshopping" onClick={this.undisplaycartmodal}  type="submit">Continue Shopping</button>
</div>         
               </div> 
             </center> 
         </div> 
 
     </div>
 </div> 
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
     <div className="mainmodaldiv" ref={(a) => this.modaldiv =a} id="modaldiv" style={{display:`${this.state.display}`,zIndex:"1",width:"100%",height:"100%",backgroundColor:"rgba(0,0,0,0.4)"}}>
         <div className="ratingmodaldiv"  style={{backgroundColor:"white",borderRadius:"10px"}}>
             <div className="inner-modal">
                     <h4 style={{padding:"10px"}}>Comment</h4>
                     <center>   
                       <div className="outer" >
                        <div className="inner" style={{width:`${this.state.chooserating*20}%`}}>
                         </div>
                       </div>
                       <div><br/>
             <form onSubmit={this.submitrating}>
    <input type="number" name=""  maxLength="1" onChange={this.change2}  value={this.state.chooserating} style={{width:"10%",position:"absolute",right:"5%",top:"20%"}}/><br/>
<textarea name="comment"  maxLength="30" cols="5" rows="3" value={this.state.comment} onChange={this.change} className="form-control" style={{width:"70%"}}></textarea>
                     <span style={{color:"grey"}}>{this.state.comment.length}/30</span> <br/><br/><br/>
                     <div className="row" style={{padding:"10px"}}>  
                    <div className="col-6">  
<button className="btn btn-danger" onClick={this.undisplaymodal} style={{boxShadow:"2px 3px lightgrey",padding:"8px",color:"white",width:"100%"}} type="button">Cancel</button> 
</div>
<div className="col-6">
<button className="btn btn-success"  style={{padding:"8px",color:"white",width:"100%",boxShadow:"2px 3px lightgrey"}} type="submit">Submit</button>
</div>         
               </div>
<<<<<<< HEAD
                     </form>              
=======
                     </form>
                
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
               </div>
             </center>
         </div>
     </div>
 </div>
<div className="row" >
<<<<<<< HEAD
{this.props.productDetails.officialimg && typeof(JSON.parse(this.props.productDetails.officialimg)) === "object" ? Object.values(JSON.parse(this.props.productDetails.officialimg)).map(officialimgs => 
=======
{typeof(JSON.parse(products.officialimg)) === "object" ? Object.values(JSON.parse(products.officialimg)).map(officialimgs => 
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
  <div className="col-6">
    <img src={require(`./images/${officialimgs}`)} style={{width:"100%"}} className="img-responsive"/>
  </div>
  ) : null}
</div>
         <br/>
<<<<<<< HEAD
<div className="row" id="comments" style={{margin:"2px"}}>
            <div className="col-12" style={{border: "1px solid lightgrey", borderRadius:"5px",backgroundColor:`${this.props.userdetails.background}`,color:`${this.props.userdetails.background === "black" ? "white":"black"}`,padding:"10px"}}>
<small style={{fontSize:"15px"}}>Customer Reviews</small>
{this.props.productDetails.verifiedsales && JSON.parse(this.props.productDetails.verifiedsales).includes(parseInt(this.state.userId))
? 
<button style={{float:"right",backgroundColor:"orange",color:"white"}} 
className="btn active" 
onClick={this.displaymodal} >
  <a href="#modaldiv"  style={{color:"white"}}>
    Rate
    </a>
  </button>
   :
   <button style={{float:"right"}} 
className="btn btn-default" 
onClick={()=>alert("Dear User, Only verified Sales can rate a product")} >
  <a href="#modaldiv" style={{color:"red"}}>
    Rate <span className="fa fa-ban"></span>
    </a>
  </button>
   }<br/>
             <hr/>
            {this.props.productcomments.length > 0 ?
             <div className="row">
             <div className="col-3">
                 <small style={{padding:"0px",margin:"0px"}}>RATING ({this.props.productcomments.length || 0} ) </small><br/>
            <small style={{fontSize:"20px",fontWeight:"bold"}}>{(this.props.productDetails.productrating).toFixed(2)} </small><br/>
          <div className="outer" style={{fontSize:"10px",padding:"0px"}}>
          <div className="inner" style={{width:`${(this.props.productDetails.productrating)*20 || 0}%`}}>
=======
<div className="row" style={{margin:"2px"}}>
            <div className="col-12" style={{border: "1px solid lightgrey", borderRadius:"5px",backgroundColor:"white",padding:"10px"}}>
<small style={{fontSize:"15px"}}>Customer Reviews</small><button style={{float:"right",display:`${localStorage.getItem("id") ? "block" : "none"}`}} onClick={this.displaymodal}><a href="#modaldiv">Rate</a></button><br/>
             <hr/>
            {products.numOfRating > 0 ?
             <div className="row">
             <div className="col-3">
                 <small style={{padding:"0px",margin:"0px"}}>RATING ({products.numOfRating || 0} ) </small>
            <h3>{(products.percentrating/20).toFixed(2)} </h3>
          <div className="outer">
          <div className="inner" style={{width:`${products.percentrating || 0}%`}}>
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
             </div>
            </div>
             </div>
             <div className="col-9">
<<<<<<< HEAD
             <small style={{padding:"0px",margin:"0px"}}>REVIEWS/ COMMENTS ({this.props.productcomments.length || 0} ) </small>
             <hr/>
             {this.props.productcomments.map((comments)=> 
               <div style={{lineHeight:"16px",fontSize:"12px"}}>       
                      <div className="row">
                       <div className="col-2" style={{padding:"0px",margin:"0px"}}>
                       <img src={comments.userImage ? `https://res.cloudinary.com/fruget-com/image/upload/profile/${comments.userImage}`: require(`./images/maleprofile.png`)} style={{width:"100%",padding:"0px 8px",margin:"3px 0px",height:"70px"}} alt="" />
                       </div>
                       <div className="col-10" style={{padding:"0px",margin:"0px"}}>
                       <small style={{padding:"5px 0px",fontWeight:"bold",color:"brown",fontSize:"12px"}}> {comments.userName} </small>
                       <small className="ml-2 text-muted">{formater(comments.time)}</small>
                       <small style={{float:"right",marginRight:"8px"}}><span className="fa fa-check-circle " style={{color:"orange",fontSize:"15px"}}></span><span className="dodo"> Verified Purchase</span></small>
                                        
                <div style={{padding:"2px"}}>
                    <small style={{padding:"3px 0px"}}>
                     <small style={{fontSize:"13px"}}> {comments.comment}</small></small>
                     <small style={{float:"right",clear:"left",padding:"8px"}}>
                        <div className="outer" style={{fontSize:"10px"}}>
                <div className="inner" style={{fontSize:"8px",width:`${(comments.rating)*20 || 0}%`}}>
=======
             <small style={{padding:"0px",margin:"0px"}}>REVIEWS/ COMMENTS ({products.numOfRating || 0} ) </small>
             {Object.keys(JSON.parse(products.productrating)).map((key)=> 
               <div style={{lineHeight:"14px",fontSize:"12px"}}>                 
                    <small style={{padding:"0px"}}><span className="fa fa-comment-alt text-muted"></span><small style={{fontSize:"14px",fontWeight:"bold"}}> {JSON.parse(products.comments)[key]}</small></small><br/>
                    <small>by {key} </small> <br/>
             <small>{JSON.parse(products.productrating)[key].split(",")[1]}</small>
                <div className="outer" style={{float:"right"}}>
                <div className="inner" style={{width:`${(JSON.parse(products.productrating)[key].split(",")[0])*20 || 0}%`}}>
                </div>
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
                </div>
                </div></small><br/>
                     </div>
               <small  style={{fontSize:"13px"}} onClick={()=>alert("only the admin can reply comments")}>Reply.</small>
               <small className="likebutton ml-2" style={{color:`${comments.likes && JSON.parse(comments.likes).includes(parseInt(this.props.userdetails.userId)) ? "orange" : "grey"}`}} >
                 <span className="fa fa-thumbs-up" onClick={(e)=>this.likecomment(e,{commentId:comments.ratingId,productId:comments.productId})} ></span>
                  <span className="ml-1">
                 {comments.likes && JSON.parse(comments.likes) ? JSON.parse(comments.likes).length : 0}
                  </span>
              </small>
               <small className="likebutton" style={{marginLeft:"40px",color:`${comments.dislikes && JSON.parse(comments.dislikes).includes(parseInt(this.props.userdetails.userId)) ? "orange" : "grey"}`}} >
                 <span className="fa fa-thumbs-down" onClick={(e)=>this.dislikecomment(e,{commentId:comments.ratingId,productId:comments.productId})}></span>
                  <span className="ml-1">
                  {comments.dislikes ? JSON.parse(comments.dislikes).length : 0}
                  </span>
               </small>
               </div>
               <br/>
               </div>
                   <br/>
               </div>            
             )}
             </div>
             </div>
    : <center> 
      <span style={{fontSize:"40px"}} className="text-muted far fa-comments"></span>
      <p>No Reviews Yet</p>
      </center>}
            </div>
        </div>  
        </div>
        </div>
        <div className="col-3 boxshadower" style={{backgroundColor:`${this.props.userdetails.background}`,padding:"0px",margin:"0px"}}>
              <div style={{padding:"3px",color:`${this.props.userdetails.background === "black" ? "white":"black"}`,width:"100%",position:"sticky",top:"80px"}}>
                <div className="row">
                    <div className="col-5">
                      <img style={{width:"100%"}} className="img-thumbnail" src={`https://res.cloudinary.com/fruget-com/image/upload/${this.props.productDetails.generalcategory}/${this.props.productDetails.category}/${this.props.productDetails.img1 ? JSON.parse(this.props.productDetails.img1)[1] : null}`} alt=""/>
                    </div>
                    <hr/>
                    <div className="col-7" style={{padding:"0px 5px"}}>
            <small>Warranty: {this.props.productDetails.warranty}</small><br/>
            <small>
                <h4 style={{float:"right"}}>
            <small style={{color:"rgb(0, 119, 179)"}}>{this.props.save === "rgb(0, 119, 179)" ? "saved" : null}</small>
                </h4>
            <div className="outer">
          <div className="inner" style={{width:`${this.props.productDetails.productrating*20 || 0 || 0}%`}}>

          </div>
        </div> <b>({this.props.productDetails.ratingscount || 0} Reviews) </b>
           </small>
           {this.props.productDetails.initialprice !== null ? <div>
           <small style={{float:"left"}}>{this.props.productDetails.mainprice}</small><small style={{float:"left",textIndent:"10px",color:"orange"}}>- {this.props.productDetails.discount}%</small><small style={{float:"right",textDecoration:"line-through",color:"grey"}}>{this.props.productDetails.initialcost}</small>
           </div> : <small>{this.props.productDetails.mainprice}</small>}
           <br/>
            <button type="button" className="lgcartbutton" style={{padding:"0px"}} onClick={()=>this.addtocart(this.props.productDetails.productId)}>
            <small style={{fontSize:"10px",color:"white"}}>ADD TO CART</small></button>
        
            </div>
            <div className="col-12"><center> <small style={{textTransform:"lowercase"}}>{this.props.productDetails.details} -{this.props.productDetails.model} -{this.props.productDetails.color}</small><br/> </center><hr/></div>
            <div className="col-12"><center><a href="#warranttypolicy" style={{color:`${window.location.href.indexOf('#warranttypolicy')>-1 ? 'brown': 'grey'}`}}><p>Warranty/Return back policy <span className="fa fa-star" style={{color:"orange"}}></span></p> </a></center><hr/></div>
            <div className="col-12"><center><a href="#selfservice" style={{color:`${window.location.href.indexOf('#selfservice')>-1 ? 'brown': 'grey'}`}}><p>Self Service <span className="fa fa-user-cog" style={{color:"orange"}}></span></p></a></center><hr/></div>
             <div className="col-12"><center><a href="#aboutthebrand" style={{color:`${window.location.href.indexOf('#aboutthebrand')>-1 ? 'brown': 'grey'}`}}><p>About the brand <span className="fa fa-info-circle" style={{color:"orange"}}></span></p></a> </center><hr/></div>
            <div className="col-12"><center><a href="#features" style={{color:`${window.location.href.indexOf('#features')>-1 ? 'brown': 'grey'}`}}><p>features '&' specifications</p></a> </center><hr/></div>
            <div className="col-12"><center><a href="#abouttheproduct" style={{color:`${window.location.href.indexOf('#abouttheproduct')>-1 ? 'brown': 'grey'}`}}><p>About the product <span className="fa fa-info-circle" style={{color:"orange"}}></span></p></a> </center><hr/></div>
            <div className="col-12"><center><a href="#comments" style={{color:`${window.location.href.indexOf('#comments')>-1 ? 'brown': 'grey'}`}}><p>view rating from Verified purchases </p> </a></center><hr/></div>
            <div className="col-12"><center><a href="#similiarproducts" style={{color:`${window.location.href.indexOf('#similiarproducts')>-1 ? 'brown': 'grey'}`}}><p>Similiar products from this brand</p></a></center><hr/></div>
            </div>  
            </div> 
           </div>
         </div>
               
<br/>
<<<<<<< HEAD
{this.props.similiarBrandDetails  && this.props.similiarBrandDetails.length > 0 ?
<div className="row mb-1 boxshadower" style={{padding:"0px",backgroundColor:`${this.props.userdetails.background==="white"?"white":"rgb(38,38,38)"}`,color:`${this.props.userdetails.background === "black"?"white":"black"}`}}>
             <div style={{width:"100%",padding:"5px"}}>
<small style={{fontSize:"13px",textTransform:"uppercase"}}>products from similiar brand </small><small style={{float:"right",fontWeight:"bold"}}><a href={`/${this.props.productDetails.generalcategory}?brand=${this.props.productDetails.brand}`} style={{marginRight:"30px",color:"black"}}>see more <span className="fa fa-chevron-right"></span> </a></small>
                 </div>
               <div className="noscrolling" style={{padding:"0px",margin:"0px"}}>
                   {this.props.similiarBrandDetails.map(similiarBrand => 
                    <div className="col-2" key={similiarBrand.productId} style={{width:"100%",padding:"3px",margin:"0px"}}>
                      <div style={{width:"100%",padding:"3px"}}>
<img src={`https://res.cloudinary.com/fruget-com/image/upload/${similiarBrand.generalcategory}/${similiarBrand.category}/${similiarBrand.img1 ? Object.values(JSON.parse(similiarBrand.img1))[0] : null}`} onMouseOver={e => Object.values(JSON.parse(similiarBrand.img1))[1] !== undefined ? e.currentTarget.src= `https://res.cloudinary.com/fruget-com/image/upload/${similiarBrand.generalcategory}/${similiarBrand.category}/${Object.values(JSON.parse(similiarBrand.img1))[1]}` : e.currentTarget.src= `https://res.cloudinary.com/fruget-com/image/upload/${similiarBrand.generalcategory}/${similiarBrand.category}/${Object.values(JSON.parse(similiarBrand.img1))[0]}`} onMouseLeave={e => e.currentTarget.src= `https://res.cloudinary.com/fruget-com/image/upload/${similiarBrand.generalcategory}/${similiarBrand.category}/${Object.values(JSON.parse(similiarBrand.img1))[0]}`} style={{padding:"0px"}} className="mainImg" alt=""/> 
<span className="linker">
 <small style={{fontSize:"11px"}}>
   <span  style={{textTransform:"capitalize",width:"100%",display:"block"}}>
     { similiarBrand.details.length > 50 ? similiarBrand.details.slice(0,50) + "...": similiarBrand.details }
     </span> 
     </small>
     <small>
          <b style={{color:"black"}}>{similiarBrand.mainprice}</b> <br/>
     </small>
     </span>
            </div>
=======
<div className="row" style={{padding:"10px",backgroundColor:"white"}}>
             <div style={{width:"100%",padding:"5px"}}>
<div style={{fontSize:"15px",textTransform:"uppercase"}}>Similiar Products You May Like <small style={{float:"right",fontWeight:"bold"}}><a href="" style={{color:"black",marginRight:"30px"}}><span className="fa fa-chevron-right"></span></a></small></div>
                 </div>
               <div className="noscrolling">
                   {this.props.similiarDetails.map(section3 => 
                    <div className="col-5  col-md-3 col-lg-2" key={section3.productId}  >
                        <div style={{backgroundColor:"white",width:"115%",padding:"8px",boxShadow:"2px 1px 2px lightgrey"}}>
                        <div style={{height:"100%"}}>
                       <img src={require( `./images/${section3.mainimg}`)} className="mainImg" alt=""/> 
                       </div>
                       <small><Link to= { `/product/${section3.details}`} style={{color:"black",textTransform:"capitalize",whiteSpace:"nowrap",textOverflow:"ellipsis",overflow:"hidden", width:"100%",display:"block"}}>{ section3.details}</Link> </small>
                   <b>{section3.mainprice}</b> <br/>
                   </div>
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
                    </div>
                    )}
               </div>
             </div>
  
            : null}
            </div>
           </div>                   
        

  <br/>

  </div>   
  </div>
                
         );
      }else{
        return (   
          <div className="" style={{backgroundColor:`${this.props.userdetails.background === "black" ? "black" : "#f5f5f0"}`}}>
            <div className="container" >
                <Suggestions></Suggestions>
          
          <div>
              <small style={{textTransform:"capitalize"}}> <a href="">home</a>  / 
                <a href="">{this.props.productDetails.subcat1 }</a>  / <a href="">{this.props.productDetails.subcat2 }</a>  / <a href="">{this.props.productDetails.subcat3 }</a> / <a href="">{this.props.productDetails.brand }</a> 
                <span className="fa fa-arrow-right" style={{padding:"10px"}}></span>
                 <span style={{color:"grey"}}>{this.props.productDetails.details }</span> - </small>
              <br/>
           <div> 
              <center> 
           {this.props.productDetails.officialimg && this.props.productDetails.officialimg[1] !== undefined && JSON.parse(this.props.productDetails.officialimg) !== undefined ? 
   <img src={ require (`./images/${JSON.parse(this.props.productDetails.officialimg)[1]}`)} style={{maxWidth:"70%"}} /> : null}              
              </center>
              <br/> 
              <div className="row">
              <div className="col-sm-12 col-md-9" style={{padding:"0 15px"}}>
                <div style={{padding:"0px 10px"}}>
           <div className="row boxshadower" style={{backgroundColor:"white"}}> 
               <div className="col-12 col-lg-6 imgshowcase" >
               <center style={{height:"100%"}}>
               <div className="bigdeviceimgshowcaseflex" >
               {this.props.productDetails.img1 ? Object.values(JSON.parse(this.props.productDetails.img1)).map(img =>
               <div key={img} style={{border:"1px solid grey"}}>           
                  <img
   onClick={() => this.changesrc(`https://res.cloudinary.com/fruget-com/image/upload/${this.props.productDetails.generalcategory}/${this.props.productDetails.category}/${img}`)} 
   src={`https://res.cloudinary.com/fruget-com/image/upload/${this.props.productDetails.generalcategory}/${this.props.productDetails.category}/${img}`} 
   className="img-responsive" style={{padding:"0px",maxWidth:"100%"}}>    
   </img>
               </div>   
             ) : null} 
             </div>
            <div className="smalldeviceimgshowcase">
            {this.props.productDetails.img1 ? Object.values(JSON.parse(this.props.productDetails.img1)).map(img =>                  
    <img src={`https://res.cloudinary.com/fruget-com/image/upload/${this.props.productDetails.generalcategory}/${this.props.productDetails.category}/${img}`} className="img-responsive" style={{borderRadius:"10px",margin:"4px",width:`${Object.values(JSON.parse(this.props.productDetails.img1)).length === 1 ? "100%" : "80%"}`}}></img>
             ) : null} 
           </div>
   <img ref={(a)=> this.imgelement = a} src={`https://res.cloudinary.com/fruget-com/image/upload/${this.props.productDetails.generalcategory}/${this.props.productDetails.category}/${this.props.productDetails.img1 ? JSON.parse(this.props.productDetails.img1)[1] : null}`} style={{width:"100%",heigth:"100%"}} className="bigdeviceimgshowcase img-responsive"></img>
                 <h2 style={{float:"right",top:"5%",right:"25%", position: "absolute"}} onClick={this.save}>
                 {this.props.categoryloading ? 
                      <center>
                      <img src={require(`./images/35.gif`)} style={{width:"38%"}}/>
                      </center>
                   :
          <i className={`${this.state.bounce} ${this.props.userdetails.savedItems && JSON.parse(this.props.userdetails.savedItems).includes(parseInt(this.state.productId)) ? "fa fa-heart" :"far fa-heart"}`} style={{color:"orange",position:"fixed"}}>  
          </i>
                  }
                </h2>
                <small><a href=""><span className="fa fa-star-half-alt" style={{color:"orange"}}></span> see our review on this product</a></small><br/>
               <small><a href="">PROMOTIONS</a></small><br/>
               <small>share this product on</small><br/>
                   </center>
               </div> 
               <div className="col-12 col-lg-6 detailmarginal" style={{width:"100%",backgroundColor:`${this.props.userdetails.background || "white"}`,color:`${this.props.userdetails.background === "black" ? "white" : "black"}`}} >
              <p style={{textTransform:"uppercase"}}>{this.props.productDetails.details} -{this.props.productDetails.model} -{this.props.productDetails.color}</p>
            <small>Brand : {this.props.productDetails.brand} | similiar this.props.productDetails from {this.props.productDetails.brand}</small><br/>
               <div style={{float:"right",fontSize:"20px"}} onClick={()=>this.save(this.props.productDetails.productId)}>
               {this.props.categorycategoryloading ? 
                      <center style={{color:"green"}}>
                       <img src={require(`./images/35.gif`)} style={{width:"38%"}}/>
                      </center>
                   :
                   <i className={`${this.state.bounce} ${this.props.userdetails.savedItems && JSON.parse(this.props.userdetails.savedItems).includes(parseInt(this.state.productId)) ? "fa fa-heart" :"far fa-heart"}`} style={{color:"orange"}}>
                    </i> 
                 }
              </div>
               <small>SKU code : 20202908{this.props.productDetails.productId}</small><br/>
            <small style={{textTransform:"capitalize"}}>Seller : {this.props.productDetails.store}</small>
            <small className="badge badge-sm" style={{marginLeft:"4px",color:"white",backgroundColor:"#cc0000",fontSize:"10px"}}><span className="fa fa-shield-alt" ></span></small><br/>
            
               <small>Warranty: {this.props.productDetails.warranty}</small><br/>
               <small>           
               <div className="outer">
             <div className="inner" style={{width:`${this.props.productDetails.productrating*20 || 0}%`}}>
             </div>
           </div> <b>({this.props.productDetails.ratingscount || 0} Reviews) </b>
              </small>          
              {this.props.productDetails.initialprice !== null ? <div>
              <h4 style={{float:"left"}}>{this.props.productDetails.mainprice}</h4><small style={{float:"left",textIndent:"10px",color:"orange"}}>- {this.props.productDetails.discount}%</small><p style={{float:"right",textDecoration:"line-through",color:"grey"}}>{this.props.productDetails.initialcost}</p>
              </div> : <h4>{this.props.productDetails.mainprice}</h4>}
             <br/>
<<<<<<< HEAD
             <br/>
             <div className="row">
                 <div className="col-6">
                   <div className="row">
                   <div className="col-4">
                   <small style={{fontWeight:"bold"}}>COLOR </small>
                   </div>
                   <div className="col-8">
                   {this.props.productDetails.coloursavail ? JSON.parse(this.props.productDetails.coloursavail).split(",").map(colors=>
                 <div key={colors}>
                     <input type="checkbox" value={colors} onChange={this.preferredcolorchange} checked={this.state.preferredcolor===colors ? true : false}/> 
                     <small style={{textTransform:"uppercase"}}> {colors}</small>
                  <span className="ml-1 mr-1 mb-5" style={{borderRadius:"60%",fontSize:"8px",lineHeight:"0.2px",margin:"0px",padding:"0px 5px",border:"1px solid grey",backgroundColor:`${colors}`,color:`${colors}`}}><small>.</small></span> 
                 </div>  
              ) : null}   
                   </div>  
                   </div>
                 </div>
                   <div className="col-6">
                     <div className="row">
                       <div className="col-4">
                   <small style={{fontWeight:"bold"}}>SIZES </small>
                   </div>
                   <div className="col-8">
                   {this.props.productDetails.inchesavail && JSON.parse(this.props.productDetails.inchesavail).split(",").length > 0 ? JSON.parse(this.props.productDetails.inchesavail).split(",").map(inches=>
                 <div key={inches}>
                     <input type="checkbox" value={inches} onChange={this.preferredincheschange} checked={this.state.preferredinches===inches ? true : false}/> 
                     <small style={{textTransform:"uppercase"}}> {inches}</small>
                 </div>  
              )  : null}
              {this.props.productDetails.litresavail && JSON.parse(this.props.productDetails.litresavail).split(",").length > 0 ? JSON.parse(this.props.productDetails.litersavail).split(",").map(litres=>
                 <div key={litres}>
                     <input type="checkbox" value={litres} onChange={this.preferredlitreschange} checked={this.state.preferredlitres===litres ? true : false}/> 
                     <small style={{textTransform:"uppercase"}}> {litres}</small>
                 </div>  
              )  :  null}  
             {this.props.productDetails.wattageavail && JSON.parse(this.props.productDetails.wattageavail).split(",").length > 0 ? JSON.parse(this.props.productDetails.wattageavail).split(",").map(wattage=>
                 <div key={wattage}>
                     <input type="checkbox" value={wattage} onChange={this.preferredwattagechange} checked={this.state.preferredwattage===wattage ? true : false}/> 
                     <small style={{textTransform:"uppercase"}}> {wattage}</small>
                 </div>  
              )  :  null} 
               {this.props.productDetails.kilogramavail && JSON.parse(this.props.productDetails.kilogramavail).split(",").length > 0 ? JSON.parse(this.props.productDetails.kilogramavail).split(",").map(kilogram=>
                 <div key={kilogram}>
                     <input type="checkbox" value={kilogram} onChange={this.preferredkilogramchange} checked={this.state.preferredkilogram===kilogram ? true : false}/> 
                     <small style={{textTransform:"uppercase"}}> {kilogram}</small>
                 </div>  
              )  :  null}   
                   </div>
                     </div>
=======
<div className="row" style={{padding:"0px",backgroundColor:"white"}}>
             <div style={{width:"100%",padding:"5px"}}>
<small style={{fontSize:"15px",textTransform:"uppercase"}}>Other Products From This Brand </small><small style={{float:"right",fontWeight:"bold"}}><a href="" style={{color:"black",marginRight:"30px"}}><span className="fa fa-chevron-right"></span></a></small>
                 </div>
               <div className="noscrolling">
                   {this.props.similiarBrandDetails.map(section3 => 
                    <div className="col-5  col-md-3 col-lg-2" key={section3.productId}  >
                        <div style={{backgroundColor:"white",width:"115%",padding:"8px",boxShadow:"2px 1px 2px lightgrey"}}>
                       <img src={require( `./images/${section3.mainimg}`)} className="mainImg" alt=""/> 
                       <small><Link to= { `/product/${section3.details}`} style={{color:"black",textTransform:"capitalize",whiteSpace:"nowrap",textOverflow:"ellipsis",overflow:"hidden", width:"100%",display:"block"}}>{ section3.details}</Link> </small>
                   <b>{section3.mainprice}</b> <br/>               
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
                   </div>
               </div> 
              <br/>
               <button type="button" className="cartbutton" onClick={()=>this.addtocart(this.props.productDetails.productId)}>
                   <span className="fa fa-cart-plus" style={{float: "left", color:"white"}}></span>
               <small style={{fontSize:"15px",color:"white"}}>ADD TO CART</small></button>
               <small style={{color:`${ this.props.userdetails.savedItems && JSON.parse(this.props.userdetails.savedItems).includes(parseInt(this.state.productId)) ? "green" : "orange"}`}}>
                 {this.props.userdetails.savedItems && JSON.parse(this.props.userdetails.savedItems).includes(parseInt(this.state.productId))  ? "you saved this product" : "would you like to add this product to your repository"}`</small><br/>
               <small><a href=""><span className="fa fa-star-half-alt" style={{color:"orange"}}></span> see our review on this product</a></small><br/>
               <small><a href="">PROMOTIONS</a></small><br/>
               <small>share this product on</small><br/>
               </div>
               </div>   
               <br/>       
               <div className="row boxshadower" style={{backgroundColor:`${this.props.userdetails.background}`,color:`${this.props.userdetails.background === "black" ? "white":"black"}`,padding:"10px"}}>
               <div className="col-12">
                   <small>MEET THE SELLER</small>
                   <small style={{float:"right"}}><button className="btn btn-danger btn-sm" onClick={()=>this.viewsellerdetails(this.props.seller.userId)}>Message Seller</button></small>
                   <hr/>
         <div className="row">
          <div className="col-sm-12 col-md-5" style={{padding:"10px"}} >       
          <img src={this.props.seller.profileImage ? `https://res.cloudinary.com/fruget-com/image/upload/profile/${this.props.seller.profileImage}`: require(`./images/maleprofile.png`)} className="img-thumbnail" style={{borderRadius:"50%",width:"100%",height:"300px"}}  alt=""/>
                    <br/>
                    <br/>
                    <small style={{float:"right"}}>
   <button onClick={()=>this.followseller(this.props.seller.userId)} style={{border:"none",backgroundColor:`${this.props.categoryloading ? "white" : "orange"}`,color:"white"}} className="btn btn-sm">
                      {this.props.categoryloading ? 
                      <center>
                      <img src={require(`./images/35.gif`)} style={{width:"38%"}}/>
                      </center>
                      : 
                      this.props.userdetails.following && JSON.parse(this.props.userdetails.following).includes(parseInt(this.props.seller.userId))
                      ? "Following" :"Follow"
                      //this.props.checkfollow
                     }
                      </button><br/>
                      </small>
                    </div>  
                      <div className="col-sm-12 col-md-7" style={{padding:"0px 30px"}}>
   <small style={{padding:"0px"}}> <span className="fa fa-user-shield"></span> : <span style={{textTransform:"capitalize"}}>{this.props.seller.fullName}</span></small><br/>
    <small className=""> <span className="fa fa-envelope 2x"></span> @<span >{this.props.seller.email}</span></small><br/>
   <small className=""> <span className="fa fa-home mr-2"></span> <span style={{fontWeight:"bold",textTransform:"capitalize"}}>"{this.props.seller.businessName}"</span> located at <span >{this.props.seller.state+" , "+this.props.seller.lga}</span></small><br/>
   <small className=""> <span className="fab fa-twitter 2x mr-2"></span> <span >AdeIsCrown</span></small><br/>
   <small className=""> <span className="fab fa-facebook-square 2x mr-2"></span><span > Eze Ogbonnaya</span></small><br/>
   <small className=""> <span className="fa fa-link mr-2"></span><span ><a style={{color:"green"}} href={`http://localhost:3000/fruget/myproducts/${this.props.seller.businessName}`}> {` http://localhost:3000/fruget/myproducts/${this.props.seller.businessName}`}</a></span> <span title="click to share link" className="fa fa-reply ml-2"></span></small><br/>
         <small style={{padding:"0px"}}><span className="fa fa-mobile"></span> : {this.props.seller.contact}</small><br/>
                    <small style={{padding:"0px"}}><span className="fa fa-users"></span> :  {this.props.seller.followers ? JSON.parse(this.props.seller.followers).length : null}
                    <small style={{float:"right",color:"orange"}}>
   {this.props.seller.followers && JSON.parse(this.props.seller.followers).includes(parseInt(this.state.userId)) ? 
   "You and " + (parseInt(JSON.parse(this.props.seller.followers).length) <= 1 ? 0 : (parseInt(JSON.parse(this.props.seller.followers).length)-1).toString()) + " others followed " + this.props.seller.businessName : null }
                     </small>
                    </small>
                    <br/>
   <small><span className="fa fa-check-circle" style={{color:"orange",fontSize:"15px"}}></span> Verified Sales : 20</small> <br/>
                      Seller Rating : <small>
                        <div className="outer">
                            <div className="inner" style={{width:"20px"}}>
                            </div>
                        </div>
                    </small><br/>
                    <small><span className="fa fa-globe-asia"></span> : http://localhost:3000/product/standing%20fan</small><br/>
                    <small style={{cursor:"pointer"}}>Distance in <b>km</b> : <b> {getDistanceFromLatLonInKm(this.state.userlat,this.state.userlng,parseFloat(this.props.seller.storelat),parseFloat(this.props.seller.storelong)).toFixed(2)} </b> KM <small className="text-muted"> (as crow flies)</small></small><br/>
                   <small style={{cursor:"pointer"}} onClick={()=>this.setState({viewmap:"block",mapHeight:"100%"})}>view on map</small>
                    </div>
                    {this.state.viewmap === "block" ?  
                    <div className="col-12" style={{width:"100%",transition:"height 3s",height:`${this.state.mapHeight}`}}>
                      <MapContainer lat={parseFloat(this.props.seller.storelat)} lng={parseFloat(this.props.seller.storelong)}/>          
                      </div>  
                       : null}
                    </div>                 
                    </div>        
               </div>
               <br/>
               <p>{this.props.otherstores.length > 0 ? "Other sellers" : null}</p>
               {this.props.otherstores.map(otherseller=>
                 <div key={otherseller.userId} className="row" style={{borderBottom:"1px solid lightgrey",padding:"30px"}}>
                  <div className="col-5">
                  <img src={this.props.seller.profileImage ? `https://res.cloudinary.com/fruget-com/image/upload/profile/${otherseller.profileImage}`: require(`./images/maleprofile.png`)} className="img-thumbnail" style={{borderRadius:"50%",width:"80%",height:"150px"}}  alt=""/>
                  <br/>
                  <button onClick={()=>this.followseller(otherseller.userId)} style={{backgroundColor:`${this.props.categoryloading ? "white" : "orange"}`,color:"white"}} className="btn btn-sm">
                      {this.props.categoryloading ? 
                      <center>
                      <img src={require(`./images/35.gif`)} style={{width:"38%"}}/>
                      </center>
                      : 
                      this.props.userdetails.following && JSON.parse(this.props.userdetails.following).includes(parseInt(otherseller.userId))
                      ? "Following" :"Follow"
                      //this.props.checkfollow
                     }
                      </button><br/>
   
                  </div>
                  <div className="col-sm-12 col-md-7" style={{padding:"0px 30px"}}>
   <small style={{padding:"0px"}}> <span className="fa fa-user-shield"></span> : <span style={{textTransform:"capitalize"}}>{otherseller.fullName}</span></small><br/>
    <small className=""> <span className="fa fa-envelope 2x"></span> @<span >{otherseller.email}</span></small><br/>
    <small style={{padding:"0px"}}><span className="fa fa-mobile"></span> : {otherseller.contact}</small><br/>
   <small className=""> <span className="fa fa-home mr-2"></span> <span style={{fontWeight:"bold",textTransform:"capitalize"}}>"{otherseller.businessName}"</span> located at <span >{otherseller.state+" , "+otherseller.lga}</span></small><br/>
                    <small style={{cursor:"pointer"}}>Distance in <b>km</b> : <b> {getDistanceFromLatLonInKm(this.state.userlat,this.state.userlng,parseFloat(otherseller.storelat),parseFloat(otherseller.storelong)).toFixed(2)} </b> KM <small className="text-muted"> (as crow flies)</small></small><br/>
   <small className=""> <span className="fa fa-link mr-2"></span><span ><a style={{color:"green"}} href={`http://localhost:3000/fruget/myproducts/${otherseller.businessName}`}> {` http://localhost:3000/fruget/myproducts/${otherseller.businessName}`}</a></span> <span title="click to share link" className="fa fa-reply ml-2"></span></small><br/>
       <br/>
         <button className="btn" style={{backgroundColor:"orange",color:"white"}}>
          <small> BUY FROM THIS SELLER</small>
         </button>
                  </div>
                 </div>
                 )}
               <div className="row boxshadower" style={{backgroundColor:`${this.props.userdetails.background}`,color:`${this.props.userdetails.background === "black" ? "white":"black"}`,padding:"10px"}}>
                <div classae="col-12">
                  <center>
                      <p style={{textTransform:"uppercase", textAlign:"center"}}>{this.props.productDetails.model}</p>
            <small style={{width:"100%",textTransform:"capitalize"}}>{ReactHtmlParser(this.props.productDetails.entrytext)}</small>
            <br/>
            
                {this.props.productDetails.brand === "lg" ? <small style={{color:"grey"}}>
                The image of the product are for illustration purpose only and may differ from actual product.
   51% Energy Saving In Refrigerator with Inverter Linear Compressor(ILC).
    Based on third party test under standard test conditions (ISO 15502) conducted exclusively for energy consumption,
     Models tested GBB530NSQWB (Reciprocating Compressor),
     GBB530NCXE (Inverter Linear Compressor).
    Actual Results may vary from model to model and also depends upon the kind of usage under general conditions.
                </small> : null}
           
            <div className="row">
               <div style={{display: "flex", flexWrap:"wrap", justifyContent:"space-between",overflow:"auto"}}>
            {this.props.productDetails.img1 && this.props.productDetails.featuresimg !== null && JSON.parse(this.props.productDetails.img1)[2] !== undefined ? Object.keys(JSON.parse(this.props.productDetails.featuresimg)).map(featureimg =>
            <div  key={featureimg} style={{padding:"15px"}}>
                 <img src={ require (`./images/${JSON.parse(this.props.productDetails.featuresimg)[featureimg]}`)} style={{maxWidth:"100%",maxHeight:"100%"}} alt=""/>
            <div style={{color:"grey"}}>{ReactHtmlParser(featureimg)}</div>
             </div>         
            ) : null }
            
            </div>
           </div>
           </center> 
           </div>
        </div>
               <br/>
               <div className="row" id="features">
                   <div className="col-12 col-lg-6 boxshadower" style={{backgroundColor:`${this.props.userdetails.background}`,color:`${this.props.userdetails.background === "black" ? "white":"black"}`}}>
                       <p style={{ padding:"10px",margin:"0px"}}>Key Features :</p>
                   {this.props.productDetails.features !== null && this.props.productDetails.features ? JSON.parse(this.props.productDetails.features).split(',').map(feature =>
                   <div style={{ padding:"1px",margin:"0px",backgroundColor:`${this.props.userdetails.background}`,color:`${this.props.userdetails.background === "black" ? "white":"black"}`}}>
                   <small>
               <ul key={feature} style={{listStyleImage: `url(${logo})`}}>
                   <li style={{textTransform: "capitalize"}}>{ReactHtmlParser(feature)}</li>
               </ul>   
               </small>   
               </div>      
                   ) : "N/A"}
                   </div>
               {this.props.productDetails.img1 ? JSON.parse(this.props.productDetails.img1)[2] !== undefined ? 
              <div className="col-12 col-lg-6 detailmarginal ">
                 <img src={`https://res.cloudinary.com/fruget-com/image/upload/${this.props.productDetails.generalcategory/this.props.productDetails.category}/${JSON.parse(this.props.productDetails.img1)[2]}`} style={{width:"100%"}} className="img-responsive" alt=""/>
              </div> : 
              <div className="col-12 col-lg-6" style={{display:"flex",flexWrap:"wrap",width:"100%"}}>
              {JSON.parse(this.props.productDetails.featuresimg) !== null ? Object.keys(JSON.parse(this.props.productDetails.featuresimg)).map(featureimg =>
               <div key={featureimg} style={{padding:"15px"}}>
                   <img src={`https://res.cloudinary.com/fruget-com/image/upload/${this.props.productDetails.generalcategory/this.props.productDetails.category}/${JSON.parse(this.props.productDetails.featuresimg)[featureimg]}`} alt=""/>
              <p style={{color:"grey"}}>{featureimg}</p>
               </div> 
              ) : null}
              </div>
             : null } 
               </div>
            <br/>
            {this.props.productDetails.productdescription && this.props.productDetails.productdescription.length > 0 ? 
            <center className="boxshadower" id="abouttheproduct" style={{backgroundColor:`${this.props.userdetails.background}`,color:`${this.props.userdetails.background === "black" ? "white":"black"}`,padding:"5px"}}>
            <h3>ABOUT THE PRODUCT</h3>
            <small style={{textTransform:"capitalize"}}>
            {ReactHtmlParser(this.props.productDetails.productdescription)}
            </small> <br/>
            </center>
            : null }
           
               <div className="row">
               {this.props.productDetails.img1 && JSON.parse(this.props.productDetails.img1)[3] !== undefined ? 
              <div className="col-12 col-lg-6">
                 { <img src={`https://res.cloudinary.com/fruget-com/image/upload/${this.props.productDetails.generalcategory/this.props.productDetails.category}/${JSON.parse(this.props.productDetails.img1)[3]}`} style={{width:"100%"}} className="img-responsive" alt=""/> }
              </div> : null} 
           { this.props.productDetails.maintenance && this.props.productDetails.maintenance.length > 0 ?
                   <div className="col-12 col-lg-6">
                   <p>Usage / Maintenance : </p>
                   {this.props.productDetails.maintenance && this.props.productDetails.maintenance !== null ? JSON.parse(this.props.productDetails.maintenance)["usage"].split(',').map(usage =>
                   <small>                  
                       <ul key={usage} style={{listStyleImage: `url(${logo2})`}}>
                   <li style={{textTransform: "capitalize"}}>{usage}</li>
                  </ul>   
                   </small>           
                   ) : null}
                   </div>
                   : null}
               </div>
           
              {this.props.productDetails.branddescription && this.props.productDetails.branddescription.length > 0 ? 
       <center id="aboutthebrand" className="boxshadower" style={{backgroundColor:`${this.props.userdetails.background}`,color:`${this.props.userdetails.background === "black" ? "white":"black"}`,padding:"5px"}}>
              <h3>ABOUT THE BRAND</h3>
            <small style={{textTransform:"capitalize"}}>
            {ReactHtmlParser(this.props.productDetails.branddescription)}
            </small>
            </center>
            : null}
            <br/>
              <div className="row">
                   <div className="col-12 col-lg-6" >
                       <p style={{border: "1px solid lightgrey", padding:"10px",margin:"0px",backgroundColor:`${this.props.userdetails.background}`,color:`${this.props.userdetails.background === "black" ? "white":"black"}`}}>Key specifications :</p>
                       <div style={{border: "0.5px solid lightgrey", padding:"10px", margin:"0px",backgroundColor:`${this.props.userdetails.background}`,color:`${this.props.userdetails.background === "black" ? "white":"black"}`}}>
                           <small>
                   <b>Brand : {this.props.productDetails.brand}</b><hr/>
                   <b>Model : {this.props.productDetails.model}</b><br/>
                   <b>Colours : </b> {this.props.productDetails.coloursavail && JSON.parse(this.props.productDetails.coloursavail) ?
                    JSON.parse(this.props.productDetails.coloursavail).split(",").map((color, i)=>
                    <span key={color}>
                        <span style={{fontWeight:`${this.props.productDetails.color === color ? "bold" : ""}`}}> {color}
         <span className="ml-1 mr-1 " style={{borderRadius:"60%",fontSize:"8px",lineHeight:"0.2px",margin:"0px",padding:"0px 5px",border:"1px solid grey",backgroundColor:`${color}`,color:`${color}`}}><small>.</small></span> 
        <span>{i + 1 < JSON.parse(this.props.productDetails.coloursavail).split(",").length ? ", " : null}</span>
                        </span>
                    </span>  
                 )  : null}
              <br/>
               <b style={{fontWeight:"bold"}}>Sizes : </b>
                   {this.props.productDetails.inchesavail && JSON.parse(this.props.productDetails.inchesavail).split(",").length > 0 ? JSON.parse(this.props.productDetails.inchesavail).split(",").map((inches, i)=>
               <span key={inches}>
                     <span style={{fontWeight:`${this.props.productDetails.inches === inches ? "bold" : ""}`}}> {inches}
                     <span>{i + 1 < JSON.parse(this.props.productDetails.inchesavail).split(",").length ? ", " : null}</span>
                     </span>
                 </span>  
              )  : null}
              {this.props.productDetails.litresavail && JSON.parse(this.props.productDetails.litresavail).split(",").length > 0 ? JSON.parse(this.props.productDetails.litersavail).split(",").map(litres=>
                 <div key={litres}>
                     <span style={{fontWeight:`${this.props.productDetails.litres === litres ? "bold" : ""}`}}> {litres}</span>
                 </div>  
              )  :  null}  
             {this.props.productDetails.wattageavail && JSON.parse(this.props.productDetails.wattageavail).split(",").length > 0 ? JSON.parse(this.props.productDetails.wattageavail).split(",").map(wattage=>
                 <div key={wattage}>
                     <small > {wattage}</small>
                 </div>  
              )  :  null} 
               {this.props.productDetails.kilogramavail && JSON.parse(this.props.productDetails.kilogramavail).split(",").length > 0 ? JSON.parse(this.props.productDetails.kilogramavail).split(",").map(kilogram=>
                 <div key={kilogram}>
                     <small style={{textTransform:"uppercase"}}> {kilogram}</small>
                 </div>  
              )  :  null} 
             <br/>
                   <b>Capacity: {this.props.productDetails.size}{this.props.productDetails.subcat1==="refrigerator" ? " Litres" : this.props.productDetails.subcat1==="fan" ? " inches" : " kg" }</b><br/>
                   <b>Weight : {this.props.productDetails.weight || null}</b><br/>
                   <b>Sku Code : 20202908{this.props.productDetails.productId}</b><br/>
                   <b>Store : {this.props.productDetails.store}</b><br/>
                   <b>Ratings : {this.props.productDetails.numOfRating || 0}</b><br/>
                   <b>Total no of searches : {this.props.productDetails.rating}</b><br/>
           </small>
                       </div>               
                   </div>
               {(this.props.productDetails.img1 && JSON.parse(this.props.productDetails.img1)[4]) !== undefined ? 
              <div className="col-12 col-lg-6 detailmarginal" >
                 <img src={`https://res.cloudinary.com/fruget-com/image/upload/${this.props.productDetails.generalcategory/this.props.productDetails.category}/${JSON.parse(this.props.productDetails.img1)[4]}`} style={{width:"100%"}} className="img-responsive" alt=""/>
              </div> : null} 
               </div>
    <div className="savemodaldiv" ref={(a) => this.savemodaldiv =a} id="savemodaldiv" style={{display:`${this.props.displaysavemodal}`,zIndex:"1",width:"100%",height:"100%",backgroundColor:"rgba(0,0,0,0.4)"}}>
    <div className="savediv"  style={{backgroundColor:"white"}}>
     <center>
     <h5 style={{padding:"50px"}}>{ReactHtmlParser(this.props.saveResponse)}</h5>          
       <div className="row" style={{padding:"10px"}}>  
          <div className="col-6">  
   <button className="btn btn-danger" onClick={this.undisplaysavemodal} style={{boxShadow:"2px 3px lightgrey",padding:"8px",color:"white",width:"100%"}} type="button">done</button> 
   </div>
   <div className="col-6">
   <button className="btn btn-success"  style={{padding:"8px",color:"white",width:"100%",boxShadow:"2px 3px lightgrey"}} >Saved Items</button>
   </div>         
                  </div>
        </center>
        </div>
    </div>
   
             
            <div className="mainmodaldiv" ref={(a) => this.cartmodaldiv =a} id="modaldiv" style={{display:`${this.props.display}`}}>
            <div className="modaldiv"  style={{backgroundColor:"white",borderRadius:"5px"}}>
              <p onClick={this.undisplaycartmodal}>x</p>
                <div className="inner-modal"> 
                  <br/><br/>
                  <center>
                    <h5 style={{padding:"10px"}}>{ReactHtmlParser(this.props.cartMessage)} </h5>
                  </center>
                  <center>                        
                  <div className="row" style={{padding:"3px"}}>  
                  <div className="col-6">  
   <Link to={`/checkout/cart`}><button className="btn btn-success checkout" type="button">CheckOut</button> </Link>
   </div>
   <div className="col-6">
   <button className="btn btn-warning continueshopping" onClick={this.undisplaycartmodal}  type="submit">Continue Shopping</button>
   </div>         
                  </div> 
                </center> 
            </div> 
        </div>
    </div> 
        <div className="mainmodaldiv" ref={(a) => this.modaldiv =a} id="modaldiv" style={{display:`${this.state.display}`,zIndex:"1",width:"100%",height:"100%",backgroundColor:"rgba(0,0,0,0.4)"}}>
            <div className="ratingmodaldiv"  style={{backgroundColor:"white",borderRadius:"10px"}}>
                <div className="inner-modal">
                        <h4 style={{padding:"10px"}}>Comment</h4>
                        <center>   
                          <div className="outer" >
                           <div className="inner" style={{width:`${this.state.chooserating*20}%`}}>
                            </div>
                          </div>
                          <div><br/>
                <form onSubmit={this.submitrating}>
       <input type="number" name=""  maxLength="1" onChange={this.change2}  value={this.state.chooserating} style={{width:"10%",position:"absolute",right:"5%",top:"20%"}}/><br/>
   <textarea name="comment"  maxLength="30" cols="5" rows="3" value={this.state.comment} onChange={this.change} className="form-control" style={{width:"70%"}}></textarea>
                        <span style={{color:"grey"}}>{this.state.comment.length}/30</span> <br/><br/><br/>
                        <div className="row" style={{padding:"10px"}}>  
                       <div className="col-6">  
   <button className="btn btn-danger" onClick={this.undisplaymodal} style={{boxShadow:"2px 3px lightgrey",padding:"8px",color:"white",width:"100%"}} type="button">Cancel</button> 
   </div>
   <div className="col-6">
   <button className="btn btn-success"  style={{padding:"8px",color:"white",width:"100%",boxShadow:"2px 3px lightgrey"}} type="submit">Submit</button>
   </div>         
                  </div>
                        </form>              
                  </div>
                </center>
            </div>
        </div>
    </div>
   <div className="row" >
   {this.props.productDetails.officialimg && typeof(JSON.parse(this.props.productDetails.officialimg)) === "object" ? Object.values(JSON.parse(this.props.productDetails.officialimg)).map(officialimgs => 
     <div className="col-6">
       <img src={require(`./images/${officialimgs}`)} style={{width:"100%"}} className="img-responsive"/>
     </div>
     ) : null}
   </div>
            <br/>
   <div className="row" id="comments" style={{margin:"2px"}}>
               <div className="col-12" style={{border: "1px solid lightgrey", borderRadius:"5px",backgroundColor:`${this.props.userdetails.background}`,color:`${this.props.userdetails.background === "black" ? "white":"black"}`,padding:"10px"}}>
   <small style={{fontSize:"15px"}}>Customer Reviews</small>
   {this.props.productDetails.verifiedsales && JSON.parse(this.props.productDetails.verifiedsales).includes(parseInt(this.state.userId))
   ? 
   <button style={{float:"right",backgroundColor:"orange",color:"white"}} 
   className="btn active" 
   onClick={this.displaymodal} >
     <a href="#modaldiv"  style={{color:"white"}}>
       Rate
       </a>
     </button>
      :
      <button style={{float:"right"}} 
   className="btn btn-default" 
   onClick={()=>alert("Dear User, Only verified Sales can rate a product")} >
     <a href="#modaldiv" style={{color:"red"}}>
       Rate <span className="fa fa-ban"></span>
       </a>
     </button>
      }<br/>
                <hr/>
               {this.props.productcomments.length > 0 ?
                <div className="row">
                <div className="col-12 col-md-3">
                    <small style={{padding:"0px",margin:"0px"}}>RATING ({this.props.productcomments.length || 0} ) </small><br/>
               <small style={{fontSize:"20px",fontWeight:"bold"}}>{(this.props.productDetails.productrating).toFixed(2)} </small><br/>
             <div className="outer" style={{fontSize:"10px",padding:"0px"}}>
             <div className="inner" style={{width:`${(this.props.productDetails.productrating)*20 || 0}%`}}>
                </div>
               </div>
                </div>
                <div className="col-12 col-md-9">
                <small style={{padding:"0px",margin:"0px"}}>REVIEWS/ COMMENTS ({this.props.productcomments.length || 0} ) </small>
                <hr/>
                {this.props.productcomments.map((comments)=> 
                  <div style={{lineHeight:"16px",fontSize:"12px"}}>       
                         <div className="row">
                          <div className="col-2" style={{padding:"0px",margin:"0px"}}>
                          <img src={comments.userImage ? `https://res.cloudinary.com/fruget-com/image/upload/profile/${comments.userImage}`: require(`./images/maleprofile.png`)} style={{width:"100%",padding:"0px 8px",margin:"3px 0px",height:"70px"}} alt="" />
                          </div>
                          <div className="col-10" style={{padding:"0px",margin:"0px"}}>
                          <small style={{padding:"5px 0px",fontWeight:"bold",color:"brown",fontSize:"12px"}}> {comments.userName} </small>
                          <small className="ml-2 text-muted">{formater(comments.time)}</small>
                          <small style={{float:"right",marginRight:"8px"}}><span className="fa fa-check-circle " style={{color:"orange",fontSize:"15px"}}></span><span className="dodo"> Verified Purchase</span></small>
                                           
                   <div style={{padding:"2px"}}>
                       <small style={{padding:"3px 0px"}}>
                        <small style={{fontSize:"13px"}}> {comments.comment}</small></small>
                        <small style={{float:"right",clear:"left",padding:"8px"}}>
                           <div className="outer" style={{fontSize:"10px"}}>
                   <div className="inner" style={{fontSize:"8px",width:`${(comments.rating)*20 || 0}%`}}>
                   </div>
                   </div></small><br/>
                        </div>
                  <small  style={{fontSize:"13px"}} onClick={()=>alert("only the admin can reply comments")}>Reply.</small>
                  <small className="likebutton ml-2" style={{color:`${comments.likes && JSON.parse(comments.likes).includes(parseInt(this.props.userdetails.userId)) ? "orange" : "grey"}`}} >
                    <span className="fa fa-thumbs-up" onClick={(e)=>this.likecomment(e,{commentId:comments.ratingId,productId:comments.productId})} ></span>
                     <span className="ml-1">
                    {comments.likes && JSON.parse(comments.likes) ? JSON.parse(comments.likes).length : 0}
                     </span>
                 </small>
                  <small className="likebutton" style={{marginLeft:"40px",color:`${comments.dislikes && JSON.parse(comments.dislikes).includes(parseInt(this.props.userdetails.userId)) ? "orange" : "grey"}`}} >
                    <span className="fa fa-thumbs-down" onClick={(e)=>this.dislikecomment(e,{commentId:comments.ratingId,productId:comments.productId})}></span>
                     <span className="ml-1">
                     {comments.dislikes ? JSON.parse(comments.dislikes).length : 0}
                     </span>
                  </small>
                  </div>
                  <br/>
                  </div>
                      <br/>
                  </div>            
                )}
                </div>
                </div>
       : <center> 
         <span style={{fontSize:"40px"}} className="text-muted far fa-comments"></span>
         <p>No Reviews Yet</p>
         </center>}
               </div>
           </div>  
           </div>
           </div>
           <div className="d.none col-md-3 boxshadower" style={{backgroundColor:`${this.props.userdetails.background}`,padding:"0px",margin:"0px"}}>
                 <div style={{padding:"3px",color:`${this.props.userdetails.background === "black" ? "white":"black"}`,width:"100%",position:"sticky",top:"0px"}}>
                   <div className="row">
                       <div className="col-5">
                         <img style={{width:"100%"}} className="img-thumbnail" src={`https://res.cloudinary.com/fruget-com/image/upload/${this.props.productDetails.generalcategory}/${this.props.productDetails.category}/${this.props.productDetails.img1 ? JSON.parse(this.props.productDetails.img1)[1] : null}`} alt=""/>
                       </div>
                       <hr/>
                       <div className="col-7" style={{padding:"0px 5px"}}>
               <small>Warranty: {this.props.productDetails.warranty}</small><br/>
               <small>
                   <h4 style={{float:"right"}}>
               <small style={{color:"rgb(0, 119, 179)"}}>{this.props.save === "rgb(0, 119, 179)" ? "saved" : null}</small>
                   </h4>
               <div className="outer">
             <div className="inner" style={{width:`${this.props.productDetails.productrating*20 || 0 || 0}%`}}>
   
             </div>
           </div> <b>({this.props.productDetails.ratingscount || 0} Reviews) </b>
              </small>
              {this.props.productDetails.initialprice !== null ? <div>
              <small style={{float:"left"}}>{this.props.productDetails.mainprice}</small><small style={{float:"left",textIndent:"10px",color:"orange"}}>- {this.props.productDetails.discount}%</small><small style={{float:"right",textDecoration:"line-through",color:"grey"}}>{this.props.productDetails.initialcost}</small>
              </div> : <small>{this.props.productDetails.mainprice}</small>}
              <br/>
               <button type="button" className="cartbutton" style={{padding:"0px"}} onClick={()=>this.addtocart(this.props.productDetails.productId)}>
               <small style={{fontSize:"10px",color:"white"}}>ADD TO CART</small></button>
           
               </div>
               <div className="col-12"><center> <small style={{textTransform:"lowercase"}}>{this.props.productDetails.details} -{this.props.productDetails.model} -{this.props.productDetails.color}</small><br/> </center><hr/></div>
               <div className="col-12"><center><a href="#warranttypolicy" style={{color:`${window.location.href.indexOf('#warranttypolicy')>-1 ? 'brown': 'grey'}`}}><p>Warranty/Return back policy <span className="fa fa-star" style={{color:"orange"}}></span></p> </a></center><hr/></div>
               <div className="col-12"><center><a href="#selfservice" style={{color:`${window.location.href.indexOf('#selfservice')>-1 ? 'brown': 'grey'}`}}><p>Self Service <span className="fa fa-user-cog" style={{color:"orange"}}></span></p></a></center><hr/></div>
                <div className="col-12"><center><a href="#aboutthebrand" style={{color:`${window.location.href.indexOf('#aboutthebrand')>-1 ? 'brown': 'grey'}`}}><p>About the brand <span className="fa fa-info-circle" style={{color:"orange"}}></span></p></a> </center><hr/></div>
               <div className="col-12"><center><a href="#features" style={{color:`${window.location.href.indexOf('#features')>-1 ? 'brown': 'grey'}`}}><p>features '&' specifications</p></a> </center><hr/></div>
               <div className="col-12"><center><a href="#abouttheproduct" style={{color:`${window.location.href.indexOf('#abouttheproduct')>-1 ? 'brown': 'grey'}`}}><p>About the product <span className="fa fa-info-circle" style={{color:"orange"}}></span></p></a> </center><hr/></div>
               <div className="col-12"><center><a href="#comments" style={{color:`${window.location.href.indexOf('#comments')>-1 ? 'brown': 'grey'}`}}><p>view rating from Verified purchases </p> </a></center><hr/></div>
               <div className="col-12"><center><a href="#similiarproducts" style={{color:`${window.location.href.indexOf('#similiarproducts')>-1 ? 'brown': 'grey'}`}}><p>Similiar products from this brand</p></a></center><hr/></div>
               </div>  
               </div> 
              </div>
            </div>
<<<<<<< HEAD
                  
   <br/>
   {this.props.similiarBrandDetails  && this.props.similiarBrandDetails.length > 0 ?
   <div className="row mb-1 boxshadower" style={{padding:"0px",backgroundColor:`${this.props.userdetails.background==="white"?"white":"rgb(38,38,38)"}`,color:`${this.props.userdetails.background === "black"?"white":"black"}`}}>
                <div style={{width:"100%",padding:"5px"}}>
   <small style={{fontSize:"13px",textTransform:"uppercase"}}>products from similiar brand </small><small style={{float:"right",fontWeight:"bold"}}><a href={`/${this.props.productDetails.generalcategory}?brand=${this.props.productDetails.brand}`} style={{marginRight:"30px",color:"black"}}>see more <span className="fa fa-chevron-right"></span> </a></small>
                    </div>
                  <div className="noscrolling" style={{padding:"0px",margin:"0px"}}>
                      {this.props.similiarBrandDetails.map(similiarBrand => 
                       <div className="col-5  col-md-3 col-lg-2" key={similiarBrand.productId} style={{width:"100%",padding:"3px",margin:"0px"}}>
                         <div style={{width:"100%",padding:"3px"}}>
   <img src={`https://res.cloudinary.com/fruget-com/image/upload/${similiarBrand.generalcategory}/${similiarBrand.category}/${similiarBrand.img1 ? Object.values(JSON.parse(similiarBrand.img1))[0] : null}`} onMouseOver={e => Object.values(JSON.parse(similiarBrand.img1))[1] !== undefined ? e.currentTarget.src= `https://res.cloudinary.com/fruget-com/image/upload/${similiarBrand.generalcategory}/${similiarBrand.category}/${Object.values(JSON.parse(similiarBrand.img1))[1]}` : e.currentTarget.src= `https://res.cloudinary.com/fruget-com/image/upload/${similiarBrand.generalcategory}/${similiarBrand.category}/${Object.values(JSON.parse(similiarBrand.img1))[0]}`} onMouseLeave={e => e.currentTarget.src= `https://res.cloudinary.com/fruget-com/image/upload/${similiarBrand.generalcategory}/${similiarBrand.category}/${Object.values(JSON.parse(similiarBrand.img1))[0]}`} style={{padding:"0px"}} className="mainImg" alt=""/> 
   <span className="linker">
    <small style={{fontSize:"11px"}}>
      <span  style={{textTransform:"capitalize",width:"100%",display:"block"}}>
        { similiarBrand.details.length > 50 ? similiarBrand.details.slice(0,50) + "...": similiarBrand.details }
        </span> 
        </small>
        <small>
             <b style={{color:"black"}}>{similiarBrand.mainprice}</b> <br/>
        </small>
        </span>
               </div>
                       </div>
                       )}
                  </div>
                </div>
     
               : null}
               </div>
              </div>                   
           
   
     <br/>
   
     </div>   
     </div>
                   
            );
   }
=======
           </div>)}
           </div>   
           </div>       
         );
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
    }
}
 const mapStateToProps =(store)=>{
 return{
    display:store.display,
     save:store.save,
     productDetails:store.productDetails,
    similiarDetails:store.similiarDetails,
    similiarBrandDetails:store.similiarBrandDetails,
    loading:store.loading,
<<<<<<< HEAD
    cartMessage:store.cartMessage,
    seller:store.seller,
    sellerdetails:store.sellerdetails,
    otherstores:store.otherstores,
    sellerproducts:store.sellerproducts,
    checkfollow:store.checkfollow,
    saveResponse:store.saveResponse,
     displaysavemodal:store.displaysavemodal,
     saveResponse:store.saveResponse, 
     displaysavemodal:store.displaysavemodal,
     issave :store.issave,
     userdetails: store.userdetails,
     productcomments:store.productcomments,
     categoryloading:store.categoryloading,
     redirect:store.redirect
=======
    cartMessage:store.cartMessage
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
 }
 }
 const mapDispatchToProps =(dispatch)=>{
     return{
         getdetails:(data)=>dispatch(getdetails(data)),
<<<<<<< HEAD
         viewsellerdetails:(data)=>dispatch(viewsellerdetails(data)),
         undisplaycartmodal:()=>dispatch(undisplaymodal()),
         addtocart: (data)=>dispatch(addtocart(data)),
         followseller: (data)=>dispatch(followseller(data)),
         getseller : (data)=>dispatch(getseller(data)),
         saveItem: (data)=>dispatch(saveItem(data)),
         checksaveItem: (data)=>dispatch(checksaveItem(data)),
         undisplaysavemodal: ()=>dispatch(undisplaysavemodal()),
         setdisplayproductrating:()=>dispatch(setdisplayproductrating()),
         unloading:()=>dispatch(unloading()),
         setredirect:()=>dispatch(setredirect()),
         likecomment:(data)=>dispatch(likecomment(data)),
         dislikecomment:(data)=>dispatch(dislikecomment(data))
     }
 }

export default compose(withCookies,withRouter,connect(mapStateToProps, mapDispatchToProps))(Details);
=======
         undisplaycartmodal:()=>dispatch(undisplaymodal()),
         addtocart: (data)=>dispatch(addtocart(data))
     }
 }

export default connect(mapStateToProps,mapDispatchToProps)(Details);
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
