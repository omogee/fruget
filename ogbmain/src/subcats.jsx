import React, { Component } from 'react';
import axios from 'axios';
import "./main.css"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {getdetails,getseller,getfilteredSuggestions,getProducts,allcategories,allsubcategories} from "./store"
import {Carousel} from 'react-bootstrap'
import {connect} from "react-redux"
<<<<<<< HEAD
import {Link,Redirect} from "react-router-dom"
import {category} from "./state"
import Suggestions from "./suggestions"
import ModalSideNavbar from "./modalsidenavbar"
import Profilesidenavbar from "./profilesidenavbar"
import querystring from "query-string"
import csc from "country-state-city"
import cookies from "js-cookie"
=======
import {Link} from "react-router-dom"
import Suggestions from "./suggestions"
import ModalSideNavbar from "./modalsidenavbar"
const bgimage = require("./images/binble-BLG-595MK2.jpg")
const logo = require("./images/binble-BLG-595MK2.jpg")
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac

const bgimage = require("./images/kitchen appliance/small appliance/binble-BLG-595MK2.jpg")
const logo = require("./images/kitchen appliance/small appliance/binble-BLG-595MK2.jpg")

class Subcats extends Component {
    constructor(props) {
        super(props);
        this.state = { 
           loading: true,
            category:[],
             sectionOne:[],
             sectionTwo:[], 
             sectionThree:[],
             sectionFour:[],
             subcatmodal:"none",
             modalities:{},
             showsubcat:false,
             hoverapp:""
         }
    }
    
    componentDidMount = () =>{
<<<<<<< HEAD
    //  console.log(csc.getCitiesOfCountry("NG"))
   if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(function(position){
      console.log("latitude",position.coords.latitude)
      console.log("longitude",position.coords.longitude)
     })
    } else { 
     console.log("Geolocation is not supported by this browser.")
     alert("Noooooo")
    }
    

        axios.get("http://localhost:5000/products/distinct/subcats")
        .then(res => this.setState({category: res.data}))
        .catch(err => console.warn(err))
      
      axios.get("http://localhost:5000/products/section/one")
        .then(res => this.setState({sectionOne: res.data}))
        .catch(err => console.warn(err))
    
      axios.get("http://localhost:5000/products/section/two")
      .then(res => this.setState({sectionTwo: res.data}))
      .catch(err => console.warn(err))

      axios.get("http://localhost:5000/products/section/three")
      .then(res => this.setState({sectionThree: res.data}))
      .catch(err => console.warn(err))

      axios.get("http://localhost:5000/products/section/four")
=======
  
        axios.get("http://fruget.herokuapp.com/products/distinct/subcats")
        .then(res => this.setState({category: res.data}))
        .catch(err => console.warn(err))
      
      axios.get("http://fruget.herokuapp.com/products/section/one")
        .then(res => this.setState({sectionOne: res.data}))
        .catch(err => console.warn(err))
      
      axios.get("http://fruget.herokuapp.com/products/section/two")
      .then(res => this.setState({sectionTwo: res.data}))
      .catch(err => console.warn(err))

      axios.get("http://fruget.herokuapp.com/products/section/three")
      .then(res => this.setState({sectionThree: res.data}))
      .catch(err => console.warn(err))

      axios.get("http://fruget.herokuapp.com/products/section/four")
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
      .then(res => this.setState({sectionFour: res.data}))
      .catch(err => console.warn(err))

      this.setState({loading:false})
<<<<<<< HEAD
     this.props.allcategories()
    }
    hoverapp=()=>{
      this.setState({hoverapp:"hoveredsubcatapp"})
=======
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
    }
    display = (e) =>{
       const me = e.currentTarget.textContent
      
        this.setState({subcatmodal : "block"})
    }
    undisplay = () =>{
        this.setState({subcatmodal : "none"})
    }
    showsubcatmodal=(data)=>{
      this.setState({subcategoryheight:"smsubcategory",showsubcat:true},()=>{
        this.props.allsubcategories(data)
      })
    }
    selectcategory=(data)=>{
      this.setState({selectedcategory:data})
    }
    openproduct=(data)=>{
      if(cookies.get("token")){
      const datum ={productId:data.id,details:data.details,userId:this.state.userId}
      this.props.getdetails(datum)
      this.props.getseller(datum)
      this.props.history.push(`/product/202029190128891%2C${data.id}%2C245719/${data.details}`)
      }else{
        this.props.history.push(`/customer/login`)
      }
    }
    render() { 
<<<<<<< HEAD
         if(this.props.redirect){
          return <Redirect to={{ pathname: '/customer/login',state: { from: this.props.location }}} />
      }
      //<div style={{display:`${this.props.mainbgcolor==="white" ? "none" : "block"}`,backgroundColor:"rgba(242,242,242,0.5)",width:"100%",height:"200%",position:"absolute",top:"0px",zIndex:"2"}}>
   //   x</div>
   /**
    *  <div className="sidenavbar" style={{zIndex:"1",display:`${this.props.modalsidenavbardisplay}`,position:"absolute",top:"0px",width:`${this.props.modalsidenavbarwidth}`}}>
              <ModalSideNavbar/>            
             </div>     
               {this.props.allcategory.map(allcat =>
      <div style={{cursor:"pointer"}} title={allcat.generalcategory} onMouseOver={()=>this.setState({showsubcat:true})} onMouseLeave={()=>this.setState({showsubcat:false})} key={allcat.details}>
        <small onClick={()=>this.openCategory(allcat.generalcategory)} onMouseEnter={()=>this.showsubcatmodal(allcat.generalcategory)} onMouseOver={()=>this.showsubcatmodal(allcat.generalcategory)}  style={{padding:"8px 0px",textTransform:"capitalize"}}>
        {allcat.generalcategory}
      </small>
                  </div>
    )}
    */
   console.log("category",category)
   let loading;
        const ranoo =Math.floor(Math.random()*100)
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
      if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        return (
           <div className="navbarcomponentlg contain" style={{backgroundColor: "#f5f5f0"}}>
      
   <div style={{display:`${this.props.appDisplay}`}}>          
        <div >         
            <div  style={{position:`${this.props.mainbgcolor==="white" ? "" : "fixed"}`}}>
              <div className="row mb-1" style={{padding:"10px 0px"}}>    
              <div className="col-3" style={{borderRadius:"3px"}}>
              <div style={{backgroundColor:"white",padding:"12px",height:"100%"}} className="boxshadower">
              <small style={{fontWeight:"bold",fontSize:"15px",color:"rgb(0, 119, 179)"}}>Popular Category</small>
    {Object.keys(category).map(allcat =>
      <div style={{cursor:"pointer"}} title={allcat} onMouseOver={()=>this.setState({showsubcat:true,selectedcategory:allcat})} onMouseLeave={()=>this.setState({showsubcat:false})} key={allcat.details}>
        <small onClick={()=>this.openCategory(allcat)} onMouseEnter={()=>this.showsubcatmodal(allcat)} onMouseOver={()=>this.showsubcatmodal(allcat)}  style={{padding:"8px 0px",textTransform:"capitalize"}}>
        {allcat}
      </small>
                  </div>
    )}
    </div>
    </div>
     <div className="col-6 caro #f5f5f0" style={{padding:"0px",margin:"0px"}} >
      {this.state.showsubcat ?     
       <div className={`smsubcategory boxshadower`} onMouseEnter={()=>this.setState({showsubcat:true})} onMouseOver={()=>this.setState({showsubcat:true})} onMouseLeave={()=>this.setState({showsubcat:false})} style={{height:"100%",borderLeft:"1px solid lightgrey",width:"105%",position:"absolute",left:"-5%",zIndex:"10",overflow:"hidden",transition:"all 2s",backgroundColor:"white"}}>
  <div style={{padding:"3px 5px",color:"grey",borderRadius:"6px",zIndex:"3"}}>
  <div style={{overflow:"hidden"}}>
        {this.state.selectedcategory ? 
      <div className="row">
        {  category[`${this.state.selectedcategory}`].map(allsubcat => 
      <div style={{cursor:"pointer"}} className="col-4"  key={allsubcat.name}>
        <b style={{textTransform:"capitalize"}}>  {allsubcat.name.length > 15 ? allsubcat.name.slice(0,15) + "..." : allsubcat.name } </b><br/>
 <small onClick={()=>this.openCategory(allsubcat.name)}  style={{lineHeight:"0.1px",padding:"8px 0px",fontSize:"12px"}}>
        {allsubcat.subcat1 ? 
      allsubcat.subcat1.map(subcat1 =>
      <span><span className="linker" title={subcat1} style={{fontWeight:"13px"}} key={subcat1}>  {subcat1} <span style={{color:"black",fontWeight:"bold"}}>{ " | "}</span></span></span>
        )  : null
      }
      {allsubcat.subcat2 ? 
      allsubcat.subcat2.map(subcat2 =>
      <span><span key={subcat2} className="linker" title={subcat2}>  {subcat2} <span style={{color:"black",fontWeight:"bold"}}>{ " | "}</span> </span></span>
        )  : null
      }
       {allsubcat.subcat3 ? 
      allsubcat.subcat3.map(subcat3 =>
      <span><span key={subcat3} className="linker" title={subcat3}>  {subcat3} <span style={{color:"black",fontWeight:"bold"}}>{ " | "}</span> </span></span>
        )  : null
      }
      </small>
      </div>
      ) }
        </div>
      : null }
    </div>
    </div>
       </div>
       : null}
             <Carousel className="caro boxshadower">
=======
      if(this.state.loading){
        return (
          <div>Hi, I am still loading</div>
        )
      }
      //<div style={{display:`${this.props.mainbgcolor==="white" ? "none" : "block"}`,backgroundColor:"rgba(242,242,242,0.5)",width:"100%",height:"200%",position:"absolute",top:"0px",zIndex:"2"}}>
   //   x</div>
        return (
           <div>
          <div style={{display:`${this.props.inputval.length > 0 ? "block" : "none"}`,zIndex:"2",width:"100%",height:"100%",position:"absolute"}} className="indexer"> 
          <Suggestions></Suggestions>       
          </div>
          <div style={{display:`${this.props.appDisplay}`}}>            
             <div className="sidenavbar" style={{zIndex:"1",display:`${this.props.modalsidenavbardisplay}`,position:"absolute",top:"0px",width:`${this.props.modalsidenavbarwidth}`}}>
              <ModalSideNavbar/>            
             </div>           
        <div style={{backgroundColor: "#f5f5f0"}}>   
<div style={{display:`${this.props.inputval.length > 0 ? "block" : "none"}`,zIndex:"2",width:"100%",height:"100%",backgroundColor:"rgba(0,0,0,0.3)",width:"100%", height:"300%",position:"absolute"}} className="indexer"> 
             <Suggestions></Suggestions>       
             </div>
            <div className="container" style={{position:`${this.props.mainbgcolor==="white" ? "" : "fixed"}`}}>
              <div className="row">              
             <div className="col-12  col-lg-9 caro #f5f5f0 mt-2" >
             <Carousel className="caro">
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
             <Carousel.Item>
           <img
             className="d-block w-100 img-responsive"
             src={`https://ng.jumia.is/cms/Homepage/2020/WK30/SHOES--_1424x768-min.jpg`}
             alt="First slide"
<<<<<<< HEAD
             style={{maxWidth:"100%" , maxHeight:"500px",zIndex:"-1",margin:"0px",padding:"0px"}}
=======
             style={{maxWidth:"100%" , maxHeight:"500px",zIndex:"-1"}}
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
          />
        <Carousel.Caption style={{position:"absolute",top:"50px",right:"-250px",zIndex:"1", color:"black", fontWeight:"bolder"}}>
            <center>
                <h1 style={{fontWeight:"bolder", color:"red"}}>First slide label</h1>
          <h3 style={{fontWeight:"bolder"}}>Nulla vitae elit libero</h3>
          <button className="btn btn-danger">shop now</button>
            </center>        
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 img-responsive"
          src={`https://ng.jumia.is/cms/8-18/fs-dod/fs-pilot/s-flash_salev3.jpg`}
          alt="Second slide"
        />
<Carousel.Caption style={{position:"absolute",top:"50px",right:"-250px",zIndex:"1", color:"black", fontWeight:"bolder"}}>
            <center>
                <h1 style={{fontWeight:"bolder", color:"red"}}>First slide label</h1>
          <h3 style={{fontWeight:"bolder"}}>Nulla vitae elit libero</h3>
          <button className="btn btn-danger">shop now</button>
            </center>        
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={`https://ng.jumia.is/cms/Homepage/2020/WK30/CLEARANCE_S_GENERIC.jpg`}
          alt="Second slide"
          style={{}}
        />
<Carousel.Caption style={{position:"absolute",top:"50px",left:"-200px",zIndex:"1", color:"black", fontWeight:"bolder"}}>
            <center>
                <h1 style={{fontWeight:"bolder", color:"red"}}>First slide label</h1>
          <h3 style={{fontWeight:"bolder"}}>Nulla vitae elit libero</h3>
          <button className="btn btn-danger">shop now</button>
            </center>        
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={`https://ng.jumia.is/cms/8-18/fs-dod/fs-pilot/s-flash_salev3.jpg`}
          alt="Second slide"
          style={{}}
        />
<Carousel.Caption style={{position:"absolute",top:"50px",right:"-250px",zIndex:"1", color:"black", fontWeight:"bolder"}}>
            <center>
                <h1 style={{fontWeight:"bolder", color:"red"}}>First slide label</h1>
          <h3 style={{fontWeight:"bolder"}}>Nulla vitae elit libero</h3>
          <button className="btn btn-danger">shop now</button>
            </center>        
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={`https://ng.jumia.is/cms/8-18/fs-dod/fs-pilot/s-flash_salev3.jpg`}
          alt="Second slide"
          style={{maxWidth:"100%", maxHeight:"500px"}}
        />
<Carousel.Caption style={{position:"absolute",top:"50px",right:"-250px",zIndex:"1", color:"black", fontWeight:"bolder"}}>
            <center>
                <h1 style={{fontWeight:"bolder", color:"red"}}>First slide label</h1>
          <h3 style={{fontWeight:"bolder"}}>Nulla vitae elit libero</h3>
          <button className="btn btn-danger">shop now</button>
            </center>        
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
                </div>
<<<<<<< HEAD
                <div className="col-3" style={{width:"100%"}}>
                  <div style={{backgroundColor:"white",padding:"12px"}} className="boxshadower">
   <span style={{color:"rgb(255, 133, 51)",padding:"6px",borderRadius:"20px",border:"2px solid black"}} className="fab fa-opencart mb-1"></span>
   <small style={{padding:"7px"}}>Sell On Fruget</small><br/>
   <span style={{color:"rgb(255, 133, 51)",padding:"6px",borderRadius:"20px",border:"2px solid #e60000"}} className="fa fa-wrench mb-1"></span>
   <small style={{padding:"7px"}}>Visit Service Centre</small><br/>
   <span style={{color:"rgb(255, 133, 51)",padding:"8px",borderRadius:"20px",border:"2px solid #e60000"}} className="fa fa-backward"></span>
   <small style={{padding:"7px"}}>Return back policy</small><br/>
                  </div>
                  
                  <div className="mt-5" className="boxshadower">
                    <img src="https://ng.jumia.is//cms/Homepage/2020/W14/BSB-stay-safe.gif" className="img-responsive subcatimg" style={{width:"100%"}}/>
=======
                <div className="col-3 d-none  d-lg-block" style={{width:"100%", padding:"0px"}}>
                  <div style={{backgroundColor:"white",padding:"12px"}}>
   <span style={{color:"rgb(255, 133, 51)",padding:"8px",borderRadius:"20px",border:"2px solid black"}} className="fa fa-shopping-cart"></span>
   <small style={{padding:"7px"}}>Sell On Fruget</small><br/><br/>
   <span style={{color:"rgb(255, 133, 51)",padding:"8px",borderRadius:"20px",border:"2px solid #e60000"}} className="fa fa-wrench"></span>
   <small style={{padding:"7px"}}>Visit Service Centre</small><br/><br/>
   <span style={{color:"rgb(255, 133, 51)",padding:"8px",borderRadius:"20px",border:"2px solid #e60000"}} className="fa fa-backward"></span>
   <small style={{padding:"7px"}}>Return back policy</small><br/>
                  </div>
                  <br/>
                  <div >
                    <img src="https://ng.jumia.is//cms/Homepage/2020/W14/BSB-stay-safe.gif" className="img-responsive" style={{width:"100%", height:"100%"}}/>
                  </div>
                </div>
              </div>
              <div className="row" style={{backgroundColor:"white",margin:"5px 2px"}}>
                <div className="col-4 col-md-2">
                 <img src={require("./images/htc-logo.jpg")} style={{width:"100%",marginBottom:"5px"}} alt=""/>
                </div>
                 
                <div className="col-4 col-md-2">
                 <img src={require("./images/lglogo.png")} style={{width:"100%",marginBottom:"5px"}} alt=""/>
                </div>
                <div className="col-4 col-md-2">
                 <img src={require("./images/hisenselogo.png")} style={{width:"100%",marginBottom:"5px"}} alt=""/>
                </div>
                <div className="col-4 col-md-2">
                 <img src={require("./images/biancoofficial.png")} style={{width:"100%",marginBottom:"5px"}} alt=""/>
                </div>
                <div className="col-4 col-md-2">
                 <img src={require("./images/nexuslogo.png")} style={{width:"100%",marginBottom:"5px"}} alt=""/>
                </div>
                <div className="col-4 col-md-2">
                 <img src={require("./images/midealogo.jpg")} style={{width:"100%",marginBottom:"5px"}} alt=""/>
                </div>
              </div>


              <div className="row" style={{padding:"10px"}}>
              <div className="col-12" style={{backgroundColor: "rgb(0, 119, 179)",color:"rgb(64, 64, 64)", borderTopRadius: "4px"}}>
              <p>
                <span style={{fontWeight:"bold",color: "white"}}>SUPER DEALS</span>  
                </p> 
                </div>
              <div className="col-12 col-md-2" style={{padding:"10px",border:"1px solid lightgrey",backgroundColor:"white"}}>
                <div className="row">
                  <div className="col-8  d-md-none" style={{}}>
                   <p>Bianco Basket Standing Fan</p>
                   <small className="text-muted"  style={{fontSize:"10px"}}> With as low as N 5500 you can order an all plastic a/c fan from  fruget with warranty of 6 months</small>
                  </div>
                  <div className="col-4 col-md-12">
                  <img style={{width:"100%",float:"right"}} className="img-thumbnail mainImg" src={require("./images/bia-bask.jpg")} alt=""/>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-2" style={{padding:"10px",border:"1px solid lightgrey",backgroundColor:"white"}}>
                <div className="row" style={{padding:"0px"}}>
                  <div className="col-8  d-md-none" style={{}}>
                    <p>Get a set of TV, wall hanger and power regulator</p>
                   <small className="text-muted"  style={{fontSize:"10px"}}></small>
                  </div>
                  <div className="col-4 col-md-12">
                  <img style={{width:"100%",float:"right"}} className="img-thumbnail mainImg" src="https://www-konga-com-res.cloudinary.com/image/upload/w_auto,f_auto,fl_lossy,dpr_auto,q_auto/v1595215707/contentservice/3.jpg_rk7D1qGeP.jpg" alt=""/>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-2" style={{padding:"10px",border:"1px solid lightgrey",backgroundColor:"white"}}>
                <div className="row" style={{padding:"0px"}}>
                  <div className="col-8  d-md-none" >
                    <p>Bianco Basket Standing Fan</p>
                   <small className="text-muted"  style={{fontSize:"10px"}}> With as low as N 5500 you can order an all plastic a/c fan from  fruget with warranty of 6 months</small>
                  </div>
                  <div className="col-4 col-md-12">
                  <img style={{width:"100%",float:"right"}} className="img-thumbnail mainImg" src="https://www-konga-com-res.cloudinary.com/image/upload/w_auto,f_auto,fl_lossy,dpr_auto,q_auto/v1595215707/contentservice/3.jpg_rk7D1qGeP.jpg" alt=""/>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-2" style={{padding:"10px",border:"1px solid lightgrey",backgroundColor:"white"}}>
                <div className="row" style={{padding:"0px"}}>
                  <div className="col-8  d-md-none" >
                    <p>Bianco Basket Standing Fan</p>
                   <small className="text-muted"  style={{fontSize:"10px"}}> With as low as N 5500 you can order an all plastic a/c fan from  fruget with warranty of 6 months</small>
                  </div>
                  <div className="col-4 col-md-12">
                  <img style={{width:"100%",float:"right"}} className="img-thumbnail mainImg" src="https://www-konga-com-res.cloudinary.com/image/upload/w_auto,f_auto,fl_lossy,dpr_auto,q_auto/v1595215707/contentservice/3.jpg_rk7D1qGeP.jpg" alt=""/>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-2" style={{padding:"10px",border:"1px solid lightgrey",backgroundColor:"white"}}>
                <div className="row" style={{padding:"0px"}}>
                  <div className="col-8  d-md-none" >
                    <p>Bianco Basket Standing Fan</p>
                   <small className="text-muted"  style={{fontSize:"10px"}}> With as low as N 5500 you can order an all plastic a/c fan from  fruget with warranty of 6 months</small>
                  </div>
                  <div className="col-4 col-md-12">
                  <img style={{width:"100%",float:"right"}} className="img-thumbnail mainImg" src="https://www-konga-com-res.cloudinary.com/image/upload/w_auto,f_auto,fl_lossy,dpr_auto,q_auto/v1595215707/contentservice/3.jpg_rk7D1qGeP.jpg" alt=""/>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-2" style={{padding:"10px",border:"1px solid lightgrey",backgroundColor:"white"}}>
                <div className="row" style={{padding:"0px"}}>
                  <div className="col-8  d-md-none" style={{}}>
                    <p>Bianco Basket Standing Fan</p>
                   <small className="text-muted"  style={{fontSize:"10px"}}> With as low as N 5500 you can order an all plastic a/c fan from  fruget with warranty of 6 months</small>
                  </div>
                  <div className="col-4 col-md-12">
                  <img style={{width:"100%",float:"right"}} className="img-thumbnail mainImg" src="https://www-konga-com-res.cloudinary.com/image/upload/w_auto,f_auto,fl_lossy,dpr_auto,q_auto/v1595215707/contentservice/3.jpg_rk7D1qGeP.jpg" alt=""/>
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
                  </div>
                </div>
              </div>                          
              </div>
<<<<<<< HEAD
         
             <div className="mb-1 boxshadower" style={{backgroundColor:"white",padding:"0px 10px",borderRadius:"3px"}}>
             <div style={{width:"100%",padding:"0px"}}>
 <small style={{textTransform:"capitalize",fontWeight:"bold",fontSize:"18px"}}>Cooling Appliances </small><small style={{float:"right",fontWeight:"bold"}}><a href="" style={{color:"black",marginRight:"30px"}}><span className="fa fa-chevron-right"></span> </a></small>
=======


              <div className="row" style={{padding:"10px"}}>
              <div className="col-12" style={{backgroundColor: "white",color:"grey", borderTopRadius: "4px"}}>
              <p>
                <span style={{fontWeight:"bold",color: "rgb(0, 119, 179)"}}>POPULAR CATEGORY</span>  
                </p> 
                </div>
              <div className="col-4 col-md-3 col-lg-2" style={{padding:"10px",border:"1px solid lightgrey",backgroundColor:"white"}}>
                <div className="row">
                  <div className="d-none d-md-block col-md-6  d-lg-none" style={{}}>
                   <small style={{fontWeight:"bold"}}> Refrigerators <br/><small>Lg, Hisense, Syinix, Thermocool, midea etc</small></small>                  
                  </div>
                  <div className="col-12 col-md-6 col-lg-12">
                  <img style={{width:"100%",float:"right"}} className="img-thumbnail" src={require ('./images/hisense535L-2.jpg')} alt=""/>
                  </div>
                </div>
              </div>
              <div className="col-4 col-md-3 col-lg-2" style={{padding:"10px",border:"1px solid lightgrey",backgroundColor:"white"}}>
                <div className="row" style={{padding:"0px"}}>
                  <div className="d-none d-md-block col-md-6  d-lg-none" style={{}}>
                  <small style={{fontWeight:"bold"}}> Generators <br/><small>sumec, elepaq, tigmax, tiger freezer,Lutian etc</small></small>
                  </div>
                  <div className="col-12 col-md-6 col-lg-12">
                  <img style={{width:"100%",float:"right"}} className="img-thumbnail" src={require ("./images/hisenseWM-WM1014v-2.jpg")} alt=""/>
                  </div>
                </div>
              </div>
              <div className="col-4 col-md-3 col-lg-2" style={{padding:"10px",border:"1px solid lightgrey",backgroundColor:"white"}}>
                <div className="row" style={{padding:"0px"}}>
                  <div className="d-none d-md-block col-md-6  d-lg-none" style={{}}>
                  <small style={{fontWeight:"bold"}}> A/C <br/><small>Lg, Hisense, Midea, Nexus etc</small></small>
                  </div>
                  <div className="col-12 col-md-6 col-lg-12">
                  <img style={{width:"100%",float:"right"}} className="img-thumbnail" src={require ("./images/hisenseWM-WM1014v-2.jpg")} alt=""/>
                  </div>
                </div>
              </div>
              <div className="col-4 col-md-3 col-lg-2" style={{padding:"10px",border:"1px solid lightgrey",backgroundColor:"white"}}>
                <div className="row" style={{padding:"0px"}}>
                  <div className="d-none d-md-block col-md-6  d-lg-none" style={{}}>
                  <small style={{fontWeight:"bold"}}> Cookers <br/><small>Table Top, Standing,Electric and Gas cookers</small></small>
                  </div>
                  <div className="col-12 col-md-6 col-lg-12">
                  <img style={{width:"100%",float:"right"}} className="img-thumbnail" src={require ("./images/hisenseWM-WM1014v-2.jpg")} alt=""/>
                  </div>
                </div>
              </div>
              <div className="col-4 col-md-3 col-lg-2" style={{padding:"10px",border:"1px solid lightgrey",backgroundColor:"white"}}>
                <div className="row" style={{padding:"0px"}}>
                  <div className="d-none d-md-block col-md-6  d-lg-none" style={{}}>
                  <small style={{fontWeight:"bold"}}> Fan <br/><small>Ox, Orl, Binatone, Fanafrik, Century, Panasonic etc</small></small>
                  </div>
                  <div className="col-12 col-md-6 col-lg-12">
                  <img style={{width:"100%",float:"right"}} className="img-thumbnail" src={require ("./images/B-ES-1800-(2).jpg")} alt=""/>
                  </div>
                </div>
              </div>
              <div className="col-4 col-md-3 col-lg-2" style={{padding:"10px",border:"1px solid lightgrey",backgroundColor:"white"}}>
                <div className="row" style={{padding:"0px"}}>
                  <div className="d-none d-md-block col-md-6  d-lg-none" style={{}}>
                  <small style={{fontWeight:"bold"}}> Television <br/><small>Smart, Android, Plasma etc</small></small>
                  </div>
                  <div className="col-12 col-md-6 col-lg-12">
                  <img style={{width:"100%",float:"right"}} className="img-thumbnail" src={require ("./images/hisense-N2176F-hd.jpg")} alt=""/>
                  </div>
                </div>
              </div>  
              <div className="col-4 col-md-3 col-lg-2" style={{padding:"10px",border:"1px solid lightgrey",backgroundColor:"white"}}>
                <div className="row" style={{padding:"0px"}}>
                  <div className="d-none d-md-block col-md-6  d-lg-none" style={{}}>
                  <small style={{fontWeight:"bold"}}> Microwave <br/><small>automatic, Manual, wash&spin etc</small></small>
                  </div>
                  <div className="col-12 col-md-6 col-lg-12">
                  <img style={{width:"100%",float:"right"}} className="img-thumbnail" src={require ("./images/hisenseWM-WM1014v-2.jpg")} alt=""/>
                  </div>
                </div>
              </div>    
              <div className="col-4 col-md-3 col-lg-2" style={{padding:"10px",border:"1px solid lightgrey",backgroundColor:"white"}}>
                <div className="row" style={{padding:"0px"}}>
                  <div className="d-none d-md-block col-md-6  d-lg-none" style={{}}>
                  <small style={{fontWeight:"bold"}}> Power & Inverters <br/><small>Stabilizers, Ups, Inverters etc</small></small>
                  </div>
                  <div className="col-12 col-md-6 col-lg-12">
                  <img style={{width:"100%",float:"right"}} className="img-thumbnail" src={require ("./images/bin-2000w.jpg")} alt=""/>
                  </div>
                </div>
              </div>    
              <div className="col-4 col-md-3 col-lg-2" style={{padding:"10px",border:"1px solid lightgrey",backgroundColor:"white"}}>
                <div className="row" style={{padding:"0px"}}>
                  <div className="d-none d-md-block col-md-6  d-lg-none" style={{}}>
                  <small style={{fontWeight:"bold"}}> Blender <br/><small>Smart, Android, Plasma etc</small></small>
                  </div>
                  <div className="col-12 col-md-6 col-lg-12">
                  <img style={{width:"100%",float:"right"}} className="img-thumbnail" src={require ("./images/hisenseWM-WM1014v-2.jpg")} alt=""/>
                  </div>
                </div>
              </div>    
              <div className="col-4 col-md-3 col-lg-2" style={{padding:"10px",border:"1px solid lightgrey",backgroundColor:"white"}}>
                <div className="row" style={{padding:"0px"}}>
                  <div className="d-none d-md-block col-md-6  d-lg-none" style={{}}>
                  <small style={{fontWeight:"bold"}}> Television <br/><small>Smart, Android, Plasma etc</small></small>
                  </div>
                  <div className="col-12 col-md-6 col-lg-12">
                  <img style={{width:"100%",float:"right"}} className="img-thumbnail" src={require ("./images/hisenseWM-WM1014v-2.jpg")} alt=""/>
                  </div>
                </div>
              </div>    
              <div className="col-4 col-md-3 col-lg-2" style={{padding:"10px",border:"1px solid lightgrey",backgroundColor:"white"}}>
                <div className="row" style={{padding:"0px"}}>
                  <div className="d-none d-md-block col-md-6  d-lg-none" style={{}}>
                  <small style={{fontWeight:"bold"}}> Television <br/><small>Smart, Android, Plasma etc</small></small>
                  </div>
                  <div className="col-12 col-md-6 col-lg-12">
                  <img style={{width:"100%",float:"right"}} className="img-thumbnail" src={require ("./images/hisenseWM-WM1014v-2.jpg")} alt=""/>
                  </div>
                </div>
              </div>    
              <div className="col-4 col-md-3 col-lg-2" style={{padding:"10px",border:"1px solid lightgrey",backgroundColor:"white"}}>
                <div className="row" style={{padding:"0px"}}>
                  <div className="d-none d-md-block col-md-6  d-lg-none" style={{}}>
                  <small style={{fontWeight:"bold"}}> Television <br/><small>Smart, Android, Plasma etc</small></small>
                  </div>
                  <div className="col-12 col-md-6 col-lg-12">
                  <img style={{width:"100%",float:"right"}} className="img-thumbnail" src={require ("./images/hisenseWM-WM1014v-2.jpg")} alt=""/>
                  </div>
                </div>
              </div>               
              </div>

              {this.props.loading ?     
          <center style={{position:"absolute", top:"50%",left:"50%"}}>
            <img src={require(`./images/35.gif`)} />
          </center>
        : null}

        
             <div className="row mb-1" style={{padding:"0px",backgroundColor:"white"}}>
             <div style={{width:"100%",padding:"5px"}}>
 <small style={{fontSize:"14px",textTransform:"capitalize"}}>Cooling Appliances </small><small style={{float:"right",fontWeight:"bold"}}><a href="" style={{color:"black",marginRight:"30px"}}><span className="fa fa-chevron-right"></span> </a></small>
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
                 </div>
               <div className="row noscrolling">
                   {this.state.sectionOne.map(section1 => 
<<<<<<< HEAD
                    <div className="col-3 col-lg-2" onMouseOver={this.hoverapp} key={section1.productId} style={{padding:"5px"}} >
                      <div className={`${this.state.hoverapp} unhoveredsubcatapp`} style={{backgroundColor:"white",width:"100%"}}>         
                      <img src={ `https://res.cloudinary.com/fruget-com/image/upload/${section1.generalcategory}/${section1.category}/${Object.values(JSON.parse(section1.img1))[0]}`} onMouseOver={e => Object.values(JSON.parse(section1.img1))[1] !== undefined ? e.currentTarget.src= `https://res.cloudinary.com/fruget-com/image/upload/${section1.generalcategory}/${section1.category}/${Object.values(JSON.parse(section1.img1))[1]}` : e.currentTarget.src= `https://res.cloudinary.com/fruget-com/image/upload/${section1.generalcategory}/${section1.category}/${Object.values(JSON.parse(section1.img1))[0]}`} onMouseLeave={e => e.currentTarget.src=  `https://res.cloudinary.com/fruget-com/image/upload/${section1.generalcategory}/${section1.category}/${Object.values(JSON.parse(section1.img1))[0]}`} style={{padding:"0px"}} className="mainImg" alt=""/> 
<small onClick={()=>this.openproduct({details:section1.details,id:section1.productId})} style={{cursor:"pointer",textTransform:"capitalize",whiteSpace:"nowrap",textOverflow:"ellipsis",overflow:"hidden", width:"100%",display:"block"}}>{ section1.details}</small>
                   <b style={{color:"black"}}>{section1.mainprice}</b> 
                   <small className="ml-1" style={{color:"black"}}>
                            {section1.initialprice ?                                 
                 <span style={{textDecoration:"line-through",color:"grey"}}> {" ₦" + section1.initialprice}</span>                
                   : null} 
                   <br/>
                    <span style={{color:"orange"}} className="fa fa-map-marker-alt mr-1"></span>
                   <span className="text-muted">{section1.lga}, <b>{section1.state}</b></span>
                   </small> 
=======
                    <div className="col-5 col-md-3 col-lg-2" key={section1.productId}  style={{boxShadow:"2px 2px 3px  lightgrey"}}>
                      <div style={{backgroundColor:"white",width:"110%",padding:"8px"}}>         
<img src={require( `./images/${Object.values(JSON.parse(section1.img1))[0]}`)} onMouseOver={e => Object.values(JSON.parse(section1.img1))[1] !== undefined ? e.currentTarget.src= require( `./images/${Object.values(JSON.parse(section1.img1))[1]}`) : e.currentTarget.src= require( `./images/${Object.values(JSON.parse(section1.img1))[0]}`)} onMouseLeave={e => e.currentTarget.src= require( `./images/${Object.values(JSON.parse(section1.img1))[0]}`)} style={{padding:"0px"}} className="mainImg" alt=""/> 
<small><Link to= { `/product/${section1.details}`} style={{color:"black",textTransform:"capitalize",whiteSpace:"nowrap",textOverflow:"ellipsis",overflow:"hidden", width:"100%",display:"block"}}>{ section1.details}</Link> </small>
                   <b>{section1.mainprice}</b> <br/>
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
                    </div>
                    </div>
                    )}
               </div>
             </div>
            
<<<<<<< HEAD
             <div className="mt-2 mb-1 boxshadower" style={{padding:"0px 10px",backgroundColor:"white",borderRadius:"3px"}}>
             <div style={{width:"100%",padding:"0px"}}>
<small style={{textTransform:"capitalize",fontWeight:"bold",fontSize:"18px"}}>Mobile Phones </small><small style={{float:"right",fontWeight:"bold"}}><a href="" style={{color:"black",marginRight:"30px"}}><span className="fa fa-chevron-right"></span> </a></small>
=======
             <div className="row mb-1" style={{padding:"0px",backgroundColor:"white"}}>
             <div style={{width:"100%",padding:"5px"}}>
<small style={{fontSize:"13px",textTransform:"uppercase"}}>Power Regulating Appliances </small><small style={{float:"right",fontWeight:"bold"}}><a href="" style={{color:"black",marginRight:"30px"}}><span className="fa fa-chevron-right"></span> </a></small>
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
                 </div>
               <div className="row noscrolling">
                   {this.state.sectionTwo.map(section2 => 
<<<<<<< HEAD
                    <div className="col-3 col-lg-2" key={section2.productId} style={{padding:"5px"}} >
                    <div  className="unhoveredsubcatapp" style={{backgroundColor:"white",width:"100%",padding:"0px"}}>  
<img src={ `https://res.cloudinary.com/fruget-com/image/upload/${section2.generalcategory}/${section2.category}/${Object.values(JSON.parse(section2.img1))[0]}`} onMouseOver={e => Object.values(JSON.parse(section2.img1))[1] !== undefined ? e.currentTarget.src= `https://res.cloudinary.com/fruget-com/image/upload/${section2.generalcategory}/${section2.category}/${Object.values(JSON.parse(section2.img1))[1]}` : e.currentTarget.src= `https://res.cloudinary.com/fruget-com/image/upload/${section2.generalcategory}/${section2.category}/${Object.values(JSON.parse(section2.img1))[0]}`} onMouseLeave={e => e.currentTarget.src=  `https://res.cloudinary.com/fruget-com/image/upload/${section2.generalcategory}/${section2.category}/${Object.values(JSON.parse(section2.img1))[0]}`} style={{padding:"0px"}} className="mainImg" alt=""/> 

 <small  onClick={()=>this.openproduct({details:section2.details,id:section2.productId})} style={{cursor:"pointer",textTransform:"capitalize",whiteSpace:"nowrap",textOverflow:"ellipsis",overflow:"hidden", width:"100%",display:"block"}}>{ section2.details}</small>
                   <b  style={{color:"black"}}>{section2.mainprice}</b>            
                   <small className="ml-1"  style={{color:"black"}}>
                      {section2.initialprice ?              
                 <span style={{textDecoration:"line-through",color:"grey"}}> {" ₦" + section2.initialprice}</span>                
                   : null} 
                    <br/>
                    <span style={{color:"orange"}} className="fa fa-map-marker-alt mr-1"></span>
                   <span className="text-muted">{section2.lga}, <b>{section2.state}</b></span>
                   </small> 
=======
                    <div className="col-5  col-md-3 col-lg-2" key={section2.productId} style={{boxShadow:"2px 2px 3px  lightgrey"}}>
                      <div style={{backgroundColor:"white",minWidth:"110%",padding:"8px"}}>
<img src={require( `./images/${Object.values(JSON.parse(section2.img1))[0]}`)} onMouseOver={e => Object.values(JSON.parse(section2.img1))[1] !== undefined ? e.currentTarget.src= require( `./images/${Object.values(JSON.parse(section2.img1))[1]}`) : e.currentTarget.src= require( `./images/${Object.values(JSON.parse(section2.img1))[0]}`)} onMouseLeave={e => e.currentTarget.src= require( `./images/${Object.values(JSON.parse(section2.img1))[0]}`)} style={{padding:"0px"}} className="mainImg" alt=""/> 

 <small><a href="" style={{color:"black",textTransform:"capitalize",whiteSpace:"nowrap",textOverflow:"ellipsis",overflow:"hidden", width:"100%",display:"block"}}>{ section2.details}</a> </small>
                   <b>{section2.mainprice}</b> <br/>
                  
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
                    </div>
                    </div>
                    )}
               </div>
             </div>
<<<<<<< HEAD
             <div className="boxshadower mt-2 mb-1" style={{padding:"0px 10px",backgroundColor:"white",borderRadius:"3px"}}>
             <div style={{width:"100%",padding:"0px"}}>
<small style={{fontSize:"18px",textTransform:"capitalize",fontWeight:"bold"}}>Kitchen Appliances </small><small style={{float:"right",fontWeight:"bold"}}><a href="" style={{color:"black",marginRight:"30px"}}><span className="fa fa-chevron-right"></span> </a></small>
=======

             <div className="row mb-1" style={{padding:"0px",backgroundColor:"white"}}>
             <div style={{width:"100%",padding:"5px"}}>
<small style={{fontSize:"13px",textTransform:"uppercase"}}>Kitchen Appliances </small><small style={{float:"right",fontWeight:"bold"}}><a href="" style={{color:"black",marginRight:"30px"}}><span className="fa fa-chevron-right"></span> </a></small>
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
                 </div>
               <div className="row noscrolling">
                   {this.state.sectionThree.map(section3 => 
<<<<<<< HEAD
                    <div className="col-3 col-lg-2" key={section3.productId}  style={{padding:"5px"}}>
                      <div  className="unhoveredsubcatapp" style={{backgroundColor:"white",width:"100%",padding:"0px"}}>
<img src={ `https://res.cloudinary.com/fruget-com/image/upload/${section3.generalcategory}/${section3.category}/${Object.values(JSON.parse(section3.img1))[0]}`} onMouseOver={e => Object.values(JSON.parse(section3.img1))[1] !== undefined ? e.currentTarget.src= `https://res.cloudinary.com/fruget-com/image/upload/${section3.generalcategory}/${section3.category}/${Object.values(JSON.parse(section3.img1))[1]}` : e.currentTarget.src= `https://res.cloudinary.com/fruget-com/image/upload/${section3.generalcategory}/${section3.category}/${Object.values(JSON.parse(section3.img1))[0]}`} onMouseLeave={e => e.currentTarget.src=  `https://res.cloudinary.com/fruget-com/image/upload/${section3.generalcategory}/${section3.category}/${Object.values(JSON.parse(section3.img1))[0]}`} style={{padding:"0px"}} className="mainImg" alt=""/> 
<small  onClick={()=>this.openproduct({details:section3.details,id:section3.productId})} style={{cursor:"pointer",textTransform:"capitalize",whiteSpace:"nowrap",textOverflow:"ellipsis",overflow:"hidden", width:"100%",display:"block"}}>{ section3.details}</small>
                   <b  style={{color:"black"}}>{section3.mainprice}</b>
                    <small className="ml-1"  style={{color:"black"}}>
                      {section3.initialprice ?              
                 <span style={{textDecoration:"line-through",color:"grey"}}> {" ₦" + section3.initialprice}</span>                
                   : null} 
                    <br/>
                    <span style={{color:"orange"}} className="fa fa-map-marker-alt mr-1"></span>
                   <span className="text-muted">{section3.lga}, <b>{section3.state}</b></span>
                   </small>
=======
                    <div className="col-5 col-md-3 col-lg-2" key={section3.productId}  style={{boxShadow:"2px 2px 3px  lightgrey"}}>
                      <div style={{backgroundColor:"white",width:"110%",padding:"8px"}}>
<img src={require( `./images/${Object.values(JSON.parse(section3.img1))[0]}`)} onMouseOver={e => Object.values(JSON.parse(section3.img1))[1] !== undefined ? e.currentTarget.src= require( `./images/${Object.values(JSON.parse(section3.img1))[1]}`) : e.currentTarget.src= require( `./images/${Object.values(JSON.parse(section3.img1))[0]}`)} onMouseLeave={e => e.currentTarget.src= require( `./images/${Object.values(JSON.parse(section3.img1))[0]}`)} style={{padding:"0px"}} className="mainImg" alt=""/> 
<small><a href="" style={{color:"black",textTransform:"capitalize",whiteSpace:"nowrap",textOverflow:"ellipsis",overflow:"hidden", width:"100%",display:"block"}}>{ section3.details}</a> </small>
                   <b>{section3.mainprice}</b> <br/>
                  
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
                   </div>
                    </div>
                    )}
               </div>
             </div>

<<<<<<< HEAD
             <div className="mt-2 mb-1 boxshadower" style={{padding:"0px 10px",backgroundColor:"white",borderRadius:"3px"}}>
             <div style={{width:"100%",padding:"0px"}}>
<small style={{textTransform:"capitalize",fontWeight:"bold",fontSize:"18px"}}>Refrigerating </small><small style={{float:"right",fontWeight:"bold"}}><a href="" style={{color:"black",marginRight:"30px"}}><span className="fa fa-chevron-right"></span> </a></small>
=======
             <div className="row mb-1" style={{padding:"0px",backgroundColor:"white"}}>
                 <div style={{width:"100%",padding:"5px"}}>
<small style={{fontSize:"13px",textTransform:"uppercase"}}>Cooling Appliances </small><small style={{float:"right",fontWeight:"bold"}}><a href="" style={{color:"black",marginRight:"30px"}}><span className="fa fa-chevron-right"></span> </a></small>
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
                 </div>
               <div className="row noscrolling">
                   {this.state.sectionFour.map(section4 => 
<<<<<<< HEAD
                    <div className="col-2" key={section4.productId} style={{padding:"5px"}}>
                      <div  className="unhoveredsubcatapp" style={{backgroundColor:"white",width:"100%",padding:"0px"}}>
<img src={ `https://res.cloudinary.com/fruget-com/image/upload/${section4.generalcategory}/${section4.category}/${Object.values(JSON.parse(section4.img1))[0]}`} onMouseOver={e => Object.values(JSON.parse(section4.img1))[1] !== undefined ? e.currentTarget.src= `https://res.cloudinary.com/fruget-com/image/upload/${section4.generalcategory}/${section4.category}/${Object.values(JSON.parse(section4.img1))[1]}` : e.currentTarget.src= `https://res.cloudinary.com/fruget-com/image/upload/${section4.generalcategory}/${section4.category}/${Object.values(JSON.parse(section4.img1))[0]}`} onMouseLeave={e => e.currentTarget.src=  `https://res.cloudinary.com/fruget-com/image/upload/${section4.generalcategory}/${section4.category}/${Object.values(JSON.parse(section4.img1))[0]}`} style={{padding:"0px"}} className="mainImg" alt=""/> 

<small  onClick={()=>this.openproduct({details:section4.details,id:section4.productId})} style={{cursor:"pointer",textTransform:"capitalize",whiteSpace:"nowrap",textOverflow:"ellipsis",overflow:"hidden", width:"100%",display:"block"}}>{ section4.details}</small>
                   <b style={{color:"black"}}>{section4.mainprice}</b>
                    <small className="ml-1"  style={{color:"black"}}>
                      {section4.initialprice ?              
                 <span style={{textDecoration:"line-through",color:"grey"}}> {" ₦" + section4.initialprice}</span>                
                   : null} 
                    <br/>
                    <span style={{color:"orange"}} className="fa fa-map-marker-alt mr-1"></span>
                   <span className="text-muted">{section4.lga}, <b>{section4.state}</b></span>
                   </small>
=======
                    <div className="col-5 col-md-3 col-lg-2" key={section4.productId} style={{boxShadow:"2px 2px 3px  lightgrey"}}>
                      <div style={{backgroundColor:"white",width:"110%",padding:"8px"}}>
<img src={require( `./images/${Object.values(JSON.parse(section4.img1))[0]}`)} onMouseOver={e => Object.values(JSON.parse(section4.img1))[1] !== undefined ? e.currentTarget.src= require( `./images/${Object.values(JSON.parse(section4.img1))[1]}`) : e.currentTarget.src= require( `./images/${Object.values(JSON.parse(section4.img1))[0]}`)} onMouseLeave={e => e.currentTarget.src= require( `./images/${Object.values(JSON.parse(section4.img1))[0]}`)} style={{padding:"0px"}} className="mainImg" alt=""/> 

<small><a href="" style={{color:"black",textTransform:"capitalize",whiteSpace:"nowrap",textOverflow:"ellipsis",overflow:"hidden", width:"100%",display:"block"}}>{ section4.details}</a> </small>
                   <b>{section4.mainprice}</b> <br/>
                  
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
                    </div>
                    </div>
                    )}
               </div>
             </div>
            </div>
            </div>
            </div>
            </div>
<<<<<<< HEAD
          );}else{
            return (
              <div>
                         
            {this.props.loading  ?
             <div style={{position:"absolute", top:"0%",left:"0%",zIndex:"4",backgroundColor:"lightgrey",width:"100%",minHeight:"100%",opacity:"0.4"}}>
              <div className="loadingdiv">
               <center >
               <img src={require(`./images/35.gif`)} />    <br/>
                <small style={{textTransform:"capitalize"}}>{loading}</small>       
               </center>    
               </div>
             </div>
           : null} 
         
         
      <div style={{display:`${this.props.appDisplay}`}}>          
           <div style={{backgroundColor: "#f5f5f0"}}> 
        
               <div className="container"  style={{position:`${this.props.mainbgcolor==="white" ? "" : "fixed"}`}}>
                 <div className="row">              
                <div className="col-12 col-md-9 caro #f5f5f0 mt-2" >
                <Carousel className="caro">
                <Carousel.Item>
              <img
                className="d-block w-100 img-responsive"
                src={`https://ng.jumia.is/cms/Homepage/2020/WK30/SHOES--_1424x768-min.jpg`}
                alt="First slide"
                style={{maxWidth:"100%" , maxHeight:"500px",zIndex:"-1",margin:"0px",padding:"0px"}}
             />
           <Carousel.Caption style={{position:"absolute",top:"50px",right:"-250px",zIndex:"1", color:"black", fontWeight:"bolder"}}>
               <center>
                   <h1 style={{fontWeight:"bolder", color:"red"}}>First slide label</h1>
             <h3 style={{fontWeight:"bolder"}}>Nulla vitae elit libero</h3>
             <button className="btn btn-danger">shop now</button>
               </center>        
           </Carousel.Caption>
         </Carousel.Item>
         <Carousel.Item>
           <img
             className="d-block w-100 img-responsive"
             src={`https://ng.jumia.is/cms/8-18/fs-dod/fs-pilot/s-flash_salev3.jpg`}
             alt="Second slide"
           />
   <Carousel.Caption style={{position:"absolute",top:"50px",right:"-250px",zIndex:"1", color:"black", fontWeight:"bolder"}}>
               <center>
                   <h1 style={{fontWeight:"bolder", color:"red"}}>First slide label</h1>
             <h3 style={{fontWeight:"bolder"}}>Nulla vitae elit libero</h3>
             <button className="btn btn-danger">shop now</button>
               </center>        
           </Carousel.Caption>
         </Carousel.Item>
         <Carousel.Item>
           <img
             className="d-block w-100"
             src={`https://ng.jumia.is/cms/Homepage/2020/WK30/CLEARANCE_S_GENERIC.jpg`}
             alt="Second slide"
             style={{}}
           />
   <Carousel.Caption style={{position:"absolute",top:"50px",left:"-200px",zIndex:"1", color:"black", fontWeight:"bolder"}}>
               <center>
                   <h1 style={{fontWeight:"bolder", color:"red"}}>First slide label</h1>
             <h3 style={{fontWeight:"bolder"}}>Nulla vitae elit libero</h3>
             <button className="btn btn-danger">shop now</button>
               </center>        
           </Carousel.Caption>
         </Carousel.Item>
         <Carousel.Item>
           <img
             className="d-block w-100"
             src={`https://ng.jumia.is/cms/8-18/fs-dod/fs-pilot/s-flash_salev3.jpg`}
             alt="Second slide"
             style={{}}
           />
   <Carousel.Caption style={{position:"absolute",top:"50px",right:"-250px",zIndex:"1", color:"black", fontWeight:"bolder"}}>
               <center>
                   <h1 style={{fontWeight:"bolder", color:"red"}}>First slide label</h1>
             <h3 style={{fontWeight:"bolder"}}>Nulla vitae elit libero</h3>
             <button className="btn btn-danger">shop now</button>
               </center>        
           </Carousel.Caption>
         </Carousel.Item>
         <Carousel.Item>
           <img
             className="d-block w-100"
             src={`https://ng.jumia.is/cms/8-18/fs-dod/fs-pilot/s-flash_salev3.jpg`}
             alt="Second slide"
             style={{maxWidth:"100%", maxHeight:"500px"}}
           />
   <Carousel.Caption style={{position:"absolute",top:"50px",right:"-250px",zIndex:"1", color:"black", fontWeight:"bolder"}}>
               <center>
                   <h1 style={{fontWeight:"bolder", color:"red"}}>First slide label</h1>
             <h3 style={{fontWeight:"bolder"}}>Nulla vitae elit libero</h3>
             <button className="btn btn-danger">shop now</button>
               </center>        
           </Carousel.Caption>
         </Carousel.Item>
       </Carousel>
                   </div>
                   <div className="d-none d-lg-block col-lg-3" style={{width:"100%", padding:"0px"}}>
                     <div style={{backgroundColor:"white",padding:"12px"}}>
      <span style={{color:"rgb(255, 133, 51)",padding:"8px",borderRadius:"20px",border:"2px solid black"}} className="fa fa-shopping-cart"></span>
      <small style={{padding:"7px"}}>Sell On Fruget</small><br/><br/>
      <span style={{color:"rgb(255, 133, 51)",padding:"8px",borderRadius:"20px",border:"2px solid #e60000"}} className="fa fa-wrench"></span>
      <small style={{padding:"7px"}}>Visit Service Centre</small><br/><br/>
      <span style={{color:"rgb(255, 133, 51)",padding:"8px",borderRadius:"20px",border:"2px solid #e60000"}} className="fa fa-backward"></span>
      <small style={{padding:"7px"}}>Return back policy</small><br/>
                     </div>
                     <br/>
                     <div >
                       <img src="https://ng.jumia.is//cms/Homepage/2020/W14/BSB-stay-safe.gif" className="img-responsive" style={{width:"100%", height:"100%"}}/>
                     </div>
                   </div>
                 </div>
            
                <div className="row mb-1" style={{backgroundColor:"white"}}>
                <div style={{width:"100%",padding:"5px"}}>
    <small style={{fontSize:"14px",textTransform:"capitalize"}}>Cooling Appliances </small><small style={{float:"right",fontWeight:"bold"}}><a href="" style={{color:"black",marginRight:"30px"}}><span className="fa fa-chevron-right"></span> </a></small>
                    </div>
                  <div className="noscrolling">
                      {this.state.sectionOne.map(section1 => 
                       <div className="col-5 col-md-3 col-" key={section1.productId} >
                         <div style={{backgroundColor:"white",width:"100%"}}>         
   <img src={ `https://res.cloudinary.com/fruget-com/image/upload/${section1.generalcategory}/${section1.category}/${Object.values(JSON.parse(section1.img1))[0]}`} onMouseOver={e => Object.values(JSON.parse(section1.img1))[1] !== undefined ? e.currentTarget.src= `https://res.cloudinary.com/fruget-com/image/upload/${section1.generalcategory}/${section1.category}/${Object.values(JSON.parse(section1.img1))[1]}` : e.currentTarget.src= `https://res.cloudinary.com/fruget-com/image/upload/${section1.generalcategory}/${section1.category}/${Object.values(JSON.parse(section1.img1))[0]}`} onMouseLeave={e => e.currentTarget.src=  `https://res.cloudinary.com/fruget-com/image/upload/${section1.generalcategory}/${section1.category}/${Object.values(JSON.parse(section1.img1))[0]}`} style={{padding:"0px"}} className="mainImg" alt=""/> 
   <small><Link to= { `/product/${section1.details}`} style={{color:"black",textTransform:"capitalize",whiteSpace:"nowrap",textOverflow:"ellipsis",overflow:"hidden", width:"100%",display:"block"}}>{ section1.details}</Link> </small>
                      <b>{section1.mainprice}</b> <br/>
                       </div>
                       </div>
                       )}
                  </div>
                </div>
               
                <div className="row mb-1" style={{padding:"0px",backgroundColor:"white"}}>
                <div style={{width:"100%",padding:"5px"}}>
   <small style={{fontSize:"13px",textTransform:"uppercase"}}>Power Regulating Appliances </small><small style={{float:"right",fontWeight:"bold"}}><a href="" style={{color:"black",marginRight:"30px"}}><span className="fa fa-chevron-right"></span> </a></small>
                    </div>
                  <div className="noscrolling">
                      {this.state.sectionTwo.map(section2 => 
                       <div className="col-5  col-md-3 col-lg-2" key={section2.productId} style={{boxShadow:"2px 2px 3px  lightgrey"}}>
                         <div style={{backgroundColor:"white",minWidth:"110%",padding:"8px"}}>
   <img src={ `https://res.cloudinary.com/fruget-com/image/upload/${section2.generalcategory}/${section2.category}/${Object.values(JSON.parse(section2.img1))[0]}`} onMouseOver={e => Object.values(JSON.parse(section2.img1))[1] !== undefined ? e.currentTarget.src= `https://res.cloudinary.com/fruget-com/image/upload/${section2.generalcategory}/${section2.category}/${Object.values(JSON.parse(section2.img1))[1]}` : e.currentTarget.src= `https://res.cloudinary.com/fruget-com/image/upload/${section2.generalcategory}/${section2.category}/${Object.values(JSON.parse(section2.img1))[0]}`} onMouseLeave={e => e.currentTarget.src=  `https://res.cloudinary.com/fruget-com/image/upload/${section2.generalcategory}/${section2.category}/${Object.values(JSON.parse(section2.img1))[0]}`} style={{padding:"0px"}} className="mainImg" alt=""/> 
    <small><a href="" style={{color:"black",textTransform:"capitalize",whiteSpace:"nowrap",textOverflow:"ellipsis",overflow:"hidden", width:"100%",display:"block"}}>{ section2.details}</a> </small>
                      <b>{section2.mainprice}</b> <br/>
                     
                       </div>
                       </div>
                       )}
                  </div>
                </div>
   
                <div className="row mb-1" style={{padding:"0px",backgroundColor:"white"}}>
                <div style={{width:"100%",padding:"5px"}}>
   <small style={{fontSize:"13px",textTransform:"uppercase"}}>Kitchen Appliances </small><small style={{float:"right",fontWeight:"bold"}}><a href="" style={{color:"black",marginRight:"30px"}}><span className="fa fa-chevron-right"></span> </a></small>
                    </div>
                  <div className="noscrolling">
                      {this.state.sectionThree.map(section3 => 
                       <div className="col-5 col-md-3" key={section3.productId}  style={{boxShadow:"2px 2px 3px  lightgrey"}}>
                         <div style={{backgroundColor:"white",width:"110%",padding:"8px"}}>
 <img src={ `https://res.cloudinary.com/fruget-com/image/upload/${section3.generalcategory}/${section3.category}/${Object.values(JSON.parse(section3.img1))[0]}`} onMouseOver={e => Object.values(JSON.parse(section3.img1))[1] !== undefined ? e.currentTarget.src= `https://res.cloudinary.com/fruget-com/image/upload/${section3.generalcategory}/${section3.category}/${Object.values(JSON.parse(section3.img1))[1]}` : e.currentTarget.src= `https://res.cloudinary.com/fruget-com/image/upload/${section3.generalcategory}/${section3.category}/${Object.values(JSON.parse(section3.img1))[0]}`} onMouseLeave={e => e.currentTarget.src=  `https://res.cloudinary.com/fruget-com/image/upload/${section3.generalcategory}/${section3.category}/${Object.values(JSON.parse(section3.img1))[0]}`} style={{padding:"0px"}} className="mainImg" alt=""/> 

   <small><a href="" style={{color:"black",textTransform:"capitalize",whiteSpace:"nowrap",textOverflow:"ellipsis",overflow:"hidden", width:"100%",display:"block"}}>{ section3.details}</a> </small>
                      <b>{section3.mainprice}</b> <br/>
                     
                      </div>
                       </div>
                       )}
                  </div>
                </div>
   
                <div className="row mb-1" style={{padding:"0px",backgroundColor:"white"}}>
                    <div style={{width:"100%",padding:"5px"}}>
   <small style={{fontSize:"13px",textTransform:"uppercase"}}>Cooling Appliances </small><small style={{float:"right",fontWeight:"bold"}}><a href="" style={{color:"black",marginRight:"30px"}}><span className="fa fa-chevron-right"></span> </a></small>
                    </div>
                  <div className="noscrolling">
                      {this.state.sectionFour.map(section4 => 
                       <div className="col-5 col-md-3" key={section4.productId} style={{boxShadow:"2px 2px 3px  lightgrey"}}>
                         <div style={{backgroundColor:"white",width:"110%",padding:"8px"}}>
 <img src={ `https://res.cloudinary.com/fruget-com/image/upload/${section4.generalcategory}/${section4.category}/${Object.values(JSON.parse(section4.img1))[0]}`} onMouseOver={e => Object.values(JSON.parse(section4.img1))[1] !== undefined ? e.currentTarget.src= `https://res.cloudinary.com/fruget-com/image/upload/${section4.generalcategory}/${section4.category}/${Object.values(JSON.parse(section4.img1))[1]}` : e.currentTarget.src= `https://res.cloudinary.com/fruget-com/image/upload/${section4.generalcategory}/${section4.category}/${Object.values(JSON.parse(section4.img1))[0]}`} onMouseLeave={e => e.currentTarget.src=  `https://res.cloudinary.com/fruget-com/image/upload/${section4.generalcategory}/${section4.category}/${Object.values(JSON.parse(section4.img1))[0]}`} style={{padding:"0px"}} className="mainImg" alt=""/> 

   
   <small><a href="" style={{color:"black",textTransform:"capitalize",whiteSpace:"nowrap",textOverflow:"ellipsis",overflow:"hidden", width:"100%",display:"block"}}>{ section4.details}</a> </small>
                      <b>{section4.mainprice}</b> <br/>
                     
                       </div>
                       </div>
                       )}
                  </div>
                </div>
               </div>
               </div>
               </div>
               </div>
             )
          }
=======
          );
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
    }
}
const mapStateToProps =(store)=>{
  return{           
     products: store.products,
     searching:store.searching,
     status:store.status,
     filteredSuggestions: store.filteredSuggestions,
     suggestions: store.suggestions,
     showSuggestions: store.showSuggestions,
     inputval: store.inputval,
     loading:store.loading,
<<<<<<< HEAD
     categoryloading:store.categoryloading,
     mainbgcolor:store.mainbgcolor,
     modalsidenavbarwidth: store.modalsidenavbarwidth,
     modalsidenavbardisplay: store.modalsidenavbardisplay,
     appDisplay:store.appDisplay,
     allcategory:store.allcategories,
     allsubcategory:store.allcategory,
     redirect:store.redirect
=======
     mainbgcolor:store.mainbgcolor,
     modalsidenavbarwidth: store.modalsidenavbarwidth,
     modalsidenavbardisplay: store.modalsidenavbardisplay,
     appDisplay:store.appDisplay
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
   }
}
const mapDispatchToProps =(dispatch)=>{
 return{
   getfilteredSuggestions: (data) => dispatch(getfilteredSuggestions(data)),
<<<<<<< HEAD
   getProducts:(data)=>dispatch(getProducts(data)),
   allcategories:()=>dispatch(allcategories()),
   allsubcategories:(data)=> dispatch(allsubcategories(data)),
   getdetails:(data)=>dispatch(getdetails(data)),
   getseller:(data)=>dispatch(getseller(data))
=======
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac

 }
}
export default connect(mapStateToProps, mapDispatchToProps)(Subcats);