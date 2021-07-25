import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {getfilteredSuggestions} from "./store"
import axios from 'axios';
import {unshowsuggestions,shoppingcart,unsetAppDisplay,getsidenav,getProducts,allcategories,allsubcategories,viewuserdetailsbyuserId,displaycategorymodal,searcher, submitsearcher,showmodalsidenavbar, unshowmodalsidenavbar,setAppDisplay} from './store'
import {connect} from 'react-redux';
import {Redirect,withRouter} from "react-router-dom"
import {compose} from "redux"
import queryString from "query-string"
import "./main.css"
import {Link} from "react-router-dom"
import {Dropdown} from 'react-bootstrap'
import querystring from "query-string"
import Cookies from "js-cookie"
import Suggestions from "./suggestions"

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          inputval:"",
          showSuggestion:false,
          filteredSuggestions:[],
          suggestions:[],
          searcheddata: [],
          cart:[],
          inputbtnclass:"fa fa-search",
          navInputclass:"",
          navInputbtnclass:"mynavbtn",
          navInputrow:"col-12",
          inputwidth:"0%",
          inputdisplay:"block",
          categoryheight:"normal",
          subcategoryheight:"normal",
          accountheight:"0%",
          bgcolor:"whitebg"
         }
    }
    componentDidUpdate=(prevProps)=>{
      if(prevProps.userdetails !== this.props.userdetails && this.props.userdetails && this.props.userdetails.background === "black"){
        this.setState({bgcolor:"blackbg"})
      }
    }
    componentDidMount = () =>{
      this.props.allcategories()
      let mainToken
      if(Cookies.get("cm_pp")){
          const myToken = Cookies.get("cm_pp")
          let myMainTokenlen = parseInt(myToken.split("%")[0])
           let userIdlen = parseInt(myToken.split("%")[1])
           let userIdpos = parseInt(myToken.split("%")[2].charAt(0)+myToken.split("%")[2].charAt(1))
           let userId = myToken.slice(userIdpos, userIdpos+userIdlen)
            mainToken = myToken.slice(userIdpos+userIdlen, myMainTokenlen)
           let userId2 = mainToken.slice(userIdpos, userIdpos+userIdlen)
         
           this.props.viewuserdetailsbyuserId(userId)
       this.props.shoppingcart()
          }      
  
      this.setState({inputval:this.props.inputval})
      const parsedQuery = querystring.parse(this.props.location.search);
     if(parsedQuery.center){
       this.props.displaycategorymodal()
     }

    }
   
    change2 = (e)=>{
      this.setState({inputval:e.target.value,inputbtnclass:"fa fa-times"})
      const parsedQuery = queryString.parse(this.props.location.search)
      this.props.searcher(e.target.value)      
    this.props.getfilteredSuggestions(e.target.value)
    const url = window.location.href;
    if(url.indexOf("/category/search") > -1 && parsedQuery.search){
      let currentUrlParams = new URLSearchParams(window.location.search);
      currentUrlParams.set('search', e.target.value);
     this.props.history.push(window.location.pathname +"?"+ currentUrlParams.toString());
     }
     if(e.target.value.length === 0){
   
      const uri = url.split("?")[0]
   //   window.location.assign(uri)
   
     }
    }
    focus =(e) =>{
       this.props.setAppDisplay()
       this.setState({navInputclass:"",inputval:"",navInputbtnclass:"mynavbtn",navInputrow:"col-12"})
    } 
    offocus =(e)=>{
      this.props.unsetAppDisplay()
      this.setState({navInputclass:"onfocus",navInputbtnclass:"onfocusbtn",navInputrow:"col-11"})
     
    }
    displaycategorymodal=()=>{
      this.props.displaycategorymodal()
    }
    displaysidenav =()=>{
    this.props.showmodalsidenavbar()
    }
    clearinput=()=>{
      this.setState({inputval:""})
      this.props.unshowsuggestions()
    }
    submit=(e)=>{
   /* e.preventDefault();
    let currentUrlParams = new URLSearchParams(window.location.search);
    currentUrlParams.set('search', e.target.value);
    window.location.assign(window.location.pathname +"?"+ currentUrlParams.toString());
    <img  src={require("./images/fruget.jpg")} style={{width:"100%",height:"80%",marginTop:"5px"}} alt=""/>
     <img  src={require("./images/fruget.jpg")} className="navImg"  alt=""/>
    */
 console.log(e.target.value) 
  }
  extendinput=()=>{
    this.setState({inputwidth:"100%"})
  }
  showsubcatmodal=(data)=>{
    this.props.allsubcategories(data)
    this.setState({subcategoryheight:"smsubcategory"})
  }
  openCategory=(category)=>{
    const data ={
      category,
      page:1
          }
  this.props.getsidenav(data)
   this.props.getProducts(data)
   this.props.history.push(`/${category}`)
  }
      render() {     
     
        console.log("allsubcategory",this.props.allsubcategory)
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
     /**
      * <div style={{width:"7%"}} onMouseLeave={()=>this.setState({categoryheight:"normal",subcategoryheight:"normal"})}>
                    <center>
                    <small  onMouseEnter={()=>this.setState({categoryheight:"smcategory"})}><span>Categories</span></small> 
                    </center>
                    <div style={{position:"relative",zIndex:"11"}} onMouseEnter={()=>this.setState({categoryheight:"smcategory"})}>
<div className={`${this.state.categoryheight}`} style={{position:"fixed",zIndex:"11",overflow:"hidden",transition:"all 2s",backgroundColor:`${this.props.userdetails.background || "white"}`}}>
  <div style={{padding:"15px",color:`${this.props.userdetails.background === "black"? "white":"black"}`,border:"0.5px solid lightgrey",borderRadius:"6px",zIndex:"10"}}>
  <div style={{overflow:"hidden"}}>
    <small style={{fontWeight:"bold",fontSize:"12px",color:"rgb(0, 119, 179)"}}>Popular Category</small>
    {this.props.allcategory.map(allcat =>
      <div style={{cursor:"pointer"}} title={allcat.generalcategory} key={allcat.generalcategory}>
        <small onClick={()=>this.openCategory(allcat.generalcategory)} onMouseEnter={()=>this.showsubcatmodal(allcat.generalcategory)} style={{padding:"8px 0px",textTransform:"capitalize"}}>
        {allcat.generalcategory.length > 15 ? allcat.generalcategory.slice(0,15) + "..." : allcat.generalcategory }
      </small>
      </div>
      )}
    </div>
    </div>
       </div>

      
       <div className={`${this.state.subcategoryheight}`} style={{position:"fixed",zIndex:"3",overflow:"hidden",transition:"all 2s",backgroundColor:"white"}}>
  <div style={{padding:"15px",color:"grey",border:"0.5px solid lightgrey",borderRadius:"6px",zIndex:"3"}}>
  <small style={{fontWeight:"bold",fontSize:"12px",color:"red"}}>Sub Category</small>
  <div style={{overflow:"hidden"}}>
    {this.props.categoryloading ?     
           <div>
            <center >
            <img src={require(`./images/35.gif`)} style={{width:"50%"}}/> <br/>
             <small style={{textTransform:"capitalize"}}>{loading}</small>       
            </center>    
         </div>
:
    this.props.allsubcategory.map(allsubcat => 
      <div style={{cursor:"pointer"}} title={allsubcat.category} key={allsubcat.category}>
        <small onClick={()=>this.openCategory(allsubcat.category)} style={{padding:"8px 0px",textTransform:"capitalize"}}>
        {allsubcat.category.length > 15 ? allsubcat.category.slice(0,15) + "..." : allsubcat.category }
      </small>
      </div>
      )}
    </div>
    </div>
       </div>

        </div>
                    </div>
                     <small style={{fontWeight:"bolder",fontSize:"30px",color:"rgb(0, 119, 179)"}}>FRU</small>
              <small style={{fontWeight:"bolder",fontSize:"30px",color:"red"}}>GET</small>
      */
     const uri = window.location.href;
      if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        return (         
 <div className="navbarcomponentlg " style={{position:"sticky",top:"0px",zIndex:"11",boxShadow:" 0 4px 2px -2px lightgrey"}}>          
         
       <div className="contain"  style={{backgroundColor:"white"}}>
          <div>
            <div  style={{backgroundColor:`${this.props.userdetails.background || "white"}`,display:"flex",flexWrap:"nowrap",color:`${this.props.userdetails.background === "black" ? "white" :"black"}`,marginBottom:"0px",padding:"10px 20px 0px 20px"}}>            
            <div style={{width:"10%",padding:"0px",margin:"0px"}}>
             <img src={require (`./images/fruget.jpg`)} style={{width:"100%",padding:"0px",margin:"0px"}}></img>
               </div>

                    <div style={{width:"15%",position:"relative",padding:"0px",margin:"0px"}}>
                    <div style={{position:"absolute",bottom:"20%",left:"25%"}}>
                    <p><span className="point" onClick={this.displaycategorymodal}>Our Services<span className="fa fa-question-circle-o ml-1"> </span></span></p>
                    </div>
                    </div>
                   {
                     //style={{width:`${this.state.inputwidth}`}}
                   }
               <div style={{width:"48%"}} >
                    <form action="/category/search" style={{width:"100%",display:"flex",flexWrap:"nowrap"}} method="get" onSubmit={this.submit} >
                    <div style={{width:"80%"}}>
                 <center>
                    <div class="input-group mb-3">
                    <input type="text" className="form-control navsearch" onBlur={()=>this.setState({inputwidth:"10%"})} onFocus={this.extendinput} style={{paddingBottom:"0px",paddingTop:"0px",borderRight:"0px"}} value={this.state.inputval} name="search" onChange={this.change2} placeholder="Search products , brand and categories here..."/>
                <div class="input-group-append" style={{border:"1px solid lightgrey",borderTopRightRadius:"5px",borderBottomRightRadius:"5px",borderLeft:"0px"}} className="text-muted">
                      <span style={{display:`${this.props.inputval.length > 0 ? "block" :"none"}`,cursor:"pointer",padding:"10px 10px 0px 10px",fontSize:"20px",fontWeigth:"normal"}} onClick={this.clearinput} className="fa fa-times"></span>
                  </div>
                 </div>
                  </center>
                 </div>
               <div style={{width:"20%"}}>
                 <button type="submit" className="btn" style={{backgroundColor:"rgb(0, 119, 179)",float:"right",color:"white",boxShadow:"1px 2px 2px grey"}}><small>SEARCH</small></button>            
               </div>
               </form>  
               </div>
             
                    <div style={{width:"12%",position:"relative",padding:"0px",margin:"0px"}} onMouseLeave={()=>this.setState({accountheight:"0%"})}>
                    <div style={{position:"absolute",bottom:"20%",left:"25%"}}>
                    <p  onMouseEnter={()=>this.setState({accountheight:"120px"})}>
                      <span> Account<i className="fas fa-chevron-down ml-1"></i></span>
                  
                  </p> 
                    </div>
<div style={{position:"relative",padding:"0px",margin:"0px"}} onMouseEnter={()=>this.setState({accountheight:"120px"})}>
  <div  style={{position:"absolute",zIndex:"3",top:"50px",width:"110%",boxShadow:"1px 2px 5px 2px lightgrey",overflow:"hidden",height:`${this.state.accountheight}`,transition:"height 2s",backgroundColor:`${this.props.userdetails.background || "white"}`}}>
  <div className="smhoveredapp" style={{padding:"10px",color:"grey",height:"100%",borderRadius:"5px",zIndex:"3"}}>
  <div className="account" style={{overflow:"hidden"}}>
  <small style={{padding:"10px",fontSize:"14px"}}><Link className={`${this.state.bgcolor}`} to={`/${Math.floor(Math.random()*100000000000000)}/lg`} style={{textDecoration:"none"}}><span className="far fa-user"></span> My Profile</Link></small><br/>
    <small style={{padding:"10px",fontSize:"14px"}}> <Link className={`${this.state.bgcolor}`} to="/customer/login" style={{textDecoration:"none"}} ><span className="fa fa-sign-in-alt" ></span> Login</Link></small><br/>
    <small style={{padding:"10px",fontSize:"14px"}}> <Link className={`${this.state.bgcolor}`} to="/customer/seller/register" style={{textDecoration:"none"}} ><span className="fa fa-user-plus"> </span> Register</Link></small><br/>
    <small style={{padding:"10px",fontSize:"14px"}}> <Link className={`${this.state.bgcolor}`} to={`/${Math.floor(Math.random()*100000000000000)}/lg/saved_items`} style={{textDecoration:"none"}}><i class="fas fa-cloud-download-alt"></i> Saved Items</Link></small><br/>
    </div>
    </div>
       </div>
        </div>
                    </div>
                    <div style={{width:"15%",position:"relative",padding:"0px",margin:"0px"}}>
                    <div style={{position:"absolute",bottom:"20%",left:"25%"}}>
                      <Link to="/checkout/cart">
                     <p> <span className="fab fa-opencart ml-1" style={{fontWeight:"bold",color:"brown",padding:"5px"}}></span>
                      <span style={{color:"black"}}>Cart</span>
                      <small className="badge ml-2" style={{backgroundColor:"brown",color:"white",padding:"3px",borderRadius:"50%"}}>
        {this.props.shoppingcarts?this.props.shoppingcarts.length: null}
    </small></p>
                      </Link>
                    </div>
                    </div>
               
            </div>
          </div>
          <div style={{display:`${uri.indexOf("/category/search") > -1 ? "none" : this.props.inputval.length > 0 ? "block" : "none"}`,zIndex:"10",backgroundColor:"rgba(0,0,0,0.8)", position:"absolute",height:`${window.innerHeight}px`,left:"0px",width:"100%"}} className="indexer"> 
   <center style={{height:"100%"}}>
     <div className="subsuggestions" style={{zIndex:"10"}}>
          <Suggestions searchlength={5} device={false}></Suggestions> 
     </div>     
      </center>      
       </div> 
       </div>
       </div>
         );   
    }else{
      return(
       <div style={{width:"100%"}}>
        <div  className="" style={{width:"100%",position:"sticky", top:"0"}}>
        <div className="container" style={{backgroundColor:`${this.props.userdetails.background || "white"}`,color:`${this.props.userdetails.background === "black" ? "white" :"black"}`,height:"100%",width:"100%"}}>
<div className="row navdivsm" style={{paddingRight:"10px",display:`${this.props.appDisplay}`,backgroundColor:`${this.props.userdetails.background || "white"}`,color:`${this.props.userdetails.background === "black" ? "white" :"black"}`,zIndex:"2",paddingTop:"6px"}}>
             <div className="col-5">
            <div style={{padding:"0px",float:"left"}}>
<span onClick={this.displaysidenav} className="fa fa-bars nav-margin" style={{fontSize:"18px",paddingRight:"2px"}}></span>
             <small style={{fontWeight:"bolder",fontSize:"20px",color:"rgb(0, 119, 179)"}}>FRU</small>
            <small style={{fontWeight:"bolder",fontSize:"20px",color:"red"}}>GET</small>
            </div>
             </div>
             <div className="col-5">               
             </div>
             <div className="col-xs-1 d-sm-none"></div>

             <div className="col-1">
             <div style={{float:"left"}}>
                  <small style={{color:`${this.props.userdetails.background === "black"?"white" :"rgb(38,38,38)"}`,fontWeight:"bold",fontSize:"18px"}} onMouseLeave={()=>this.setState({accountheight:"0px"})} onMouseEnter={()=>this.setState({accountheight:"300px",categoryheight:"0%"})}>
                    <span className="far fa-user nav-margin"></span>
                </small> 
                  </div>
                  <div style={{position:"relative"}} onMouseEnter={()=>this.setState({accountheight:"150px",categoryheight:"0%"})}>
<div style={{position:"absolute",zIndex:"3",top:"5px",width:"300%",height:`${this.state.accountheight}`,overflow:"hidden",transition:"height 2s",backgroundColor:`${this.props.userdetails.background || "white"}`}}>
<div style={{padding:"15px",color:"grey",border:"0.5px solid lightgrey",height:"100%",borderRadius:"6px",zIndex:"3"}}>
<center style={{overflow:"hidden"}}>
<small style={{padding:"10px"}}><Link style={{color:`${this.props.userdetails.background==="black"?"white":"grey"}`}}><span className="far fa-user"></span> My Profile</Link></small><br/>
  <small style={{padding:"10px"}}> <Link style={{color:`${this.props.userdetails.background==="black"?"white":"grey"}`}} to="/customer/login"><span className="fa fa-sign-in-alt" ></span> Login</Link></small><br/>
  <small style={{padding:"10px"}}> <Link style={{color:`${this.props.userdetails.background==="black"?"white":"grey"}`}} to="/customer/register"><span className="fa fa-user-plus"> </span> Register</Link></small><br/>
  <small style={{padding:"10px"}}> <Link style={{color:`${this.props.userdetails.background==="black"?"white":"grey"}`}} to={`/saveditems`}><i class="fas fa-cloud-download-alt"></i> Saved Items</Link></small><br/>
  </center>
  </div>
     </div>
      </div>
             </div>
            
             <div className="col-1">
<Link style={{color:`${this.props.userdetails.background === "black"?"white" :"rgb(38,38,38)"}`}} to={`/${Math.floor(Math.random()*1000000000)}/lg/cart`}>
          <small className="mb-5">
            <span className="fab fa-opencart ml-1" style={{fontSize:"22px"}}></span>
            <div style={{position:"absolute",top:"-5px",left:"25px"}}>
            <small className="badge ml-1" style={{backgroundColor:"brown",color:"white",padding:"3px",borderRadius:"50%"}}>
        {this.props.shoppingcarts?this.props.shoppingcarts.length: null}
    </small>
    </div>
          </small>
          </Link>
        </div>
                  
          </div>

          <div className="row" style={{}}>
            <div className="col-1 mt-2" style={{display:`${this.state.navInputrow === "col-11" ? "block" : "none"}`}}>
            <span className="fa fa-arrow-left" onClick={this.focus}></span>
            </div>
            <div className={`${this.state.navInputrow}`}>
               <center>
               <form   action="/search" method="get" onSubmit={this.submit}>
                <div className="input-group mb-3">
               <input type="text" onFocus={this.offocus} className={`form-control ${this.state.navInputclass}`} name="search" style={{borderRight:"none"}} value={this.state.inputval}  onChange={this.change2} placeholder="Search products , brand etc" />
              <div className="input-group-append">
             <button className={`btn ${this.state.navInputbtnclass}`} type="submit"><span onClick={this.clearinput} className={`${this.state.inputbtnclass}`}></span></button>  
              </div>
             </div>
              </form>
               </center>
               </div>
          </div>
        </div>
     </div>
     
   <div style={{display:`${this.props.inputval.length > 0 ? "block" : "none"}`,zIndex:"2",height:"100%",backgroundColor:"white", height:"300%"}} className="indexer"> 
   <center>
     <div>
          <Suggestions searchlength={50} device={true}></Suggestions> 
     </div>     
      </center>      
   </div>  
     </div>
      )
    }
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
     searchedproducts:store.searchedproducts,
     appDisplay:store.appDisplay,
     modalsidenavbarwidth:store.modalsidenavbarwidth,
     userdetails:store.userdetails,
     shoppingcarts:store.shoppingcart,
     allcategory:store.allcategories,
     allsubcategory:store.allcategory,
     loading: store.loading,
     categoryloading:store.categoryloading,
     redirect:store.redirect
  }
}
const mapDispatchToProps =(dispatch)=>{
 return{
  submitsearcher: (data)=> dispatch(submitsearcher(data)),
  unshowsuggestions:()=>dispatch(unshowsuggestions()),
   searcher: (data)=> dispatch(searcher(data)),
   getfilteredSuggestions: (data) => dispatch(getfilteredSuggestions(data)),
   showmodalsidenavbar:()=>dispatch(showmodalsidenavbar()),
   unshowmodalsidenavbar:()=>dispatch(unshowmodalsidenavbar()),
   setAppDisplay:()=>dispatch(setAppDisplay()),
   unsetAppDisplay:()=>dispatch(unsetAppDisplay()),
   displaycategorymodal:()=>dispatch(displaycategorymodal()),
   viewuserdetailsbyuserId:(data)=>dispatch(viewuserdetailsbyuserId(data)),
   allcategories:()=>dispatch(allcategories()),
   allsubcategories:(data)=> dispatch(allsubcategories(data)),
   getsidenav:(data)=>dispatch(getsidenav(data)),
   getProducts:(data)=>dispatch(getProducts(data)),
   shoppingcart:()=>dispatch(shoppingcart())
 }
}
export default compose(withRouter, connect(mapStateToProps,mapDispatchToProps))(Navbar);