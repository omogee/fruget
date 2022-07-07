import React, { Component } from 'react';
import {connect} from 'react-redux'
import {getProducts, setLoadingtoTrue,getsidenav,allsubcategories} from './store'
import {compose} from 'redux'
import {withRouter,Redirect} from 'react-router-dom'
import queryString from 'query-string'
import {checkfilter} from "./store"
import axios from 'axios';

class Sidenavbar extends Component {
    constructor(props) {
        super(props);
        this.state = { 
           customerrating:null,
             displaybrand: "",
             displayvendor: "",
             displayinches: "",
             displaylitres:"",
             filteredbrand:[],
             filteredvendor:[],
             filteredlitres:[],
             filteredinches:[],
             filteredwattage:[],
             first:true,
             testedproducts:[],
             highestprice : 0,
             lowestprice:0,
             price:{},
             parsedUrl: {},
             applycolour : "black",
             val:[],
             loading:"You Can Upload Your Items with so  much Ease",
             parsedQuery:{
               brand:[],
               color:[],
               sizes:[]
             },
             brand:[],
             color:[],
             vendor:[],
             inches:[],
             litres:[],
             wattage:[],
             subcats:[],
             
         }
    }
    componentDidMount =()=>{
  //      getProducts(this.props.category)
 
  const parsedQuery = queryString.parse(this.props.location.search);
  
  let val =[] 

  for (var i=0; i<Object.values(parsedQuery).length; i++){
    if(Object.values(parsedQuery)[i].split(",").length === 1 ){
    val.push(Object.values(parsedQuery)[i]);
    }else{
      Object.values(parsedQuery)[i].split(",").reverse().map((p)=>{
        val.push(p); 
      })
    }
   }
  
   this.setState({val})
   
      const {brand, color,inches,litres} = parsedQuery;
      if(parsedQuery.brand && parsedQuery.brand.length > 0){
        this.setState({brand:parsedQuery.brand.split(",")}); 
      }
      if(parsedQuery.color && parsedQuery.color.length > 0){
        this.setState({color:parsedQuery.color.split(",")}); 
      }
      if(parsedQuery.vendor && parsedQuery.vendor.length > 0){
        this.setState({vendor:parsedQuery.vendor.split(",")}); 
      }
      if(parsedQuery.inches && parsedQuery.inches.length > 0){
        this.setState({inches:parsedQuery.inches.split(",")}); 
      }
      if(parsedQuery.litres && parsedQuery.litres.length > 0){
        this.setState({litres:parsedQuery.litres.split(",")}); 
      }
      if(parsedQuery.wattage && parsedQuery.wattage.length > 0){
        this.setState({wattage:parsedQuery.wattage.split(",")}); 
      }

this.inputelement.max= `${this.state.highestprice}`
this.inputelement.min =`${this.state.lowestprice}`
this.inputelement.value=`${this.state.highestprice}`
console.log(this.state)

    }
    
    brandchange=(e) =>{
      this.setState({displaybrand: e.target.value})
      var filteredbrand = []
      this.props.brands.map(brand => {
        if(brand.brand.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1){
         filteredbrand.push({"brand":brand.brand,"brandy":brand.brandy})
        }
        this.setState({filteredbrand})
      })
    }
    vendorchange=(e) =>{
      this.setState({displayvendor: e.target.value})
      var filteredvendor = []
      this.props.vendors.map(vendor => {
        if(vendor.store.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1){
         filteredvendor.push(vendor.store)
        }
        this.setState({filteredvendor})
      })
    }
    incheschange=(e) =>{
      this.setState({displayinches: e.target.value})
      var filteredinches = []
      this.props.inches.map(size => {
        if(size.inches !== null){
        if(size.inches.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1){
          filteredinches.push({"inches":size.inches,"inchesy":size.inchesy})
        }
        this.setState({filteredinches}) 
      }
      })
    }
    litreschange=(e) =>{
      this.setState({displaylitres: e.target.value})
      var filteredlitres = []
      this.props.litres.map(size => {
        if(size.litres !== null){
        if(size.litres.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1){
          filteredlitres.push({"litres":size.litres,"litresy":size.litresy})
        }
        this.setState({filteredlitres}) 
      }
      })
    }
    change = (e)=>{
      const uri = window.location.href;
     const  parsedQuery = queryString.parse(this.props.location.search);
  
      if(parsedQuery[e.target.name] !== undefined){
       // const query = parsedQuery[e.target.name]
        if(uri.indexOf(encodeURI(e.target.value)) > -1){
          var query = parsedQuery[e.target.name].split(",");
          console.log(query) 
          if(query.length <= 1){
            console.log("deleting")
            let currentUrlParams = new URLSearchParams(window.location.search);
            currentUrlParams.delete(e.target.name);
            if(currentUrlParams.get("q")===e.target.name){
              currentUrlParams.delete("q");
            }
          window.location.assign(window.location.pathname +"?"+ currentUrlParams.toString());
          }else{
            console.log("updating")
            const index = query.indexOf(`${e.target.value}`);
            console.log("index",index)
             query.splice(query.indexOf(`${e.target.value}`), 1)
            query = query.join()
        //    const spliturl2 = spliturl.join()
            let currentUrlParams = new URLSearchParams(window.location.search);
           currentUrlParams.set(e.target.name,query);
        window.location.assign(window.location.pathname +"?"+ currentUrlParams.toString());
          }
        }else{  
          console.log("increasing")
           let currentUrlParams = new URLSearchParams(window.location.search);
           currentUrlParams.set("q",e.target.name);
      currentUrlParams.set(e.target.name,(e.target.value + "," +parsedQuery[e.target.name]) );
     window.location.assign(window.location.pathname +"?"+ currentUrlParams.toString());
        }    
      }
      else{
        let currentUrlParams = new URLSearchParams(window.location.search);
        currentUrlParams.set(e.target.name, e.target.value);
        currentUrlParams.set("q",e.target.name);
      window.location.assign(window.location.pathname +"?"+ currentUrlParams.toString());
      }   

    }  
   
   componentWillReceiveProps =(props)=>{
     this.setState({highestprice:props.max,lowestprice:props.min},()=>{
 this.inputelement.max= `${this.state.highestprice}`
this.inputelement.min =`${this.state.lowestprice}`
//this.inputelement.value=`${this.state.highestprice}`
     })   
   }
   pricechange = (e)=>{
     this.setState({highestprice : e.target.value,price:e.target.value, applycolour :"blue"})
   }
   highestpricechange = (e) =>{
    this.setState({highestprice : e.target.value, applycolour :"blue"})
    console.log(this.state.highestprice)
   }
   lowestpricechange = (e) => {
    this.setState({lowestprice : e.target.value, applycolour : "blue"})
   }
   pricefilter=(e)=>{
     e.preventDefault();
    let currentUrlParams = new URLSearchParams(window.location.search);
    currentUrlParams.set("max",this.state.highestprice);
    console.log("max", this.state.highestprice)
    currentUrlParams.set("min",this.state.lowestprice);
    window.location.assign(window.location.pathname +"?"+ currentUrlParams.toString()); 
   }
   navigate =(category)=>{
     console.log("navigating")
     const data ={
      category,
      page:1
    }
     this.props.getProducts(data)
     this.props.getsidenav(category)
     this.props.allsubcategories(category)
     this.compoUpdate()
   }
   compoUpdate=(prevprop)=>{
    if(prevprop.products !== this.props.products){
      this.props.history.push(`/category/${this.props.currentCategory}`)
    }
  }
   customerratingchange =(e)=>{
    e.preventDefault();
    let currentUrlParams = new URLSearchParams(window.location.search);
    currentUrlParams.set("rating",e.target.value);
    window.location.assign(window.location.pathname +"?"+ currentUrlParams.toString()); 
   }
    render() { 
        return (
            <div className="hoversidenav" style={{backgroundColor:`${this.props.userdetails.background ||"white"}`,color:`${this.props.userdetails.background === "black" ? "white" : this.props.userdetails.background === "white"?"black" : "black"}`,padding:"5px 10px"}}>
               <small>FILTERS SELECTED</small>
              <div className="row" style={{padding:"5px"}}>
              {this.state.val.length > 1 ? this.state.val.map(value => 
                <div key={value} className="col-3" style={{padding:"2px"}}>
                <div className="alert alert-dismissible" style={{backgroundColor:"rgb(0, 119, 179)",display:`${value==="brand"||value==="color"||value==="sizes"||value==="grid"||value==="list" ? "none" :"block"}`,color:"white",padding:"2px"}}>
               <center>
               <small style={{fontSize:"11px"}}> {value.length > 8 ? value.slice(0,8)+"..." : value}</small>
               </center>
              </div>
               </div>            
      ) : this.state.val.length === 1 ?
      <div className="col-4" style={{padding:"2px"}}>
      <div className="alert alert-dismissible" style={{backgroundColor:"rgb(0, 119, 179)",color:"white",padding:"2px"}}>
      <small> {this.state.val.length > 8 ? this.state.val.slice(0,8)+"..." : this.state.val}</small>
    </div>
     </div>   
     : null }
              </div>
              <hr/>
              <small> POPULAR CATEGORIES</small>
              <hr/>
            
              {this.props.allcategory.length > 1 ?
                this.props.allcategory.map((category) => 
                <div key={category}>
         <small  style={{textAlign:"left",cursor:"pointer",textTransform:"capitalize"}}  onClick={() => this.navigate(category.category)}>
            {category.category}</small>       
                </div>
                )
                :
                this.props.allsubcat1.map((subcat1) => 
                <div key={subcat1.subcat1}>
         <small  style={{textAlign:"left",cursor:"pointer",textTransform:"capitalize"}} onClick={() => this.navigate(subcat1.subcat1)}>
            {subcat1.subcat1}</small> 
            <small  style={{textAlign:"left",cursor:"pointer",textTransform:"capitalize"}} onClick={() => this.navigate(subcat1.subcat2)}>
            {subcat1.subcat2}</small> 
            <small  style={{textAlign:"left",cursor:"pointer",textTransform:"capitalize"}} onClick={() => this.navigate(subcat1.subcat3)}>
            {subcat1.subcat3}</small> 
                </div>
                )}
                <hr/>
                <small>PRICES (₦)</small> <small   className={this.state.applycolour !== "black" ?"btn btn-warning btn-sm" : null} style={{float:"right"}}> <a href="" style={{color:`${this.state.applycolour}`}} onClick={this.state.applycolour !== "black" ? this.pricefilter : null}>Apply Filter</a></small><br/>
                 <center>
                <input type="range"  ref={(a)=> this.inputelement = a} name="price" min="" max="" value={this.state.highestprice} onChange={this.pricechange}/>
                <br/>
                <div className="row">
                  <div className="col-5">
                  ₦ <input type="number" value={this.state.lowestprice} name="lowestprice" onChange={this.lowestpricechange} style={{width:"100%"}}/>
                  </div>
                  -
                  <div className="col-5">
                  ₦ <input type="number" value={this.state.highestprice} style={{width:"100%"}} name="highestprice"  onChange={this.highestpricechange}/>
                  </div>
                  <div className="col-5">
                  <small><b>/{this.props.overallMin}</b></small>
                  </div>
                  <div className="col-5">
                  <small><b>/{this.props.overallMax}</b></small>
                  </div>

                </div>              
              </center>
              <hr/>
              <small>MAJOR SELLERS</small>
              <hr/>
              <small> CUSTOMER RATINGS</small> <br/>
              <small>
  <small style={{padding:"0px 5px"}}><input type="radio" name="customerrating"  onChange={this.customerratingchange} value="4&above"/> </small>
   <div className="outer"> <div className="inner" style={{width:"80%"}}></div></div> 
   <small  style={{fontSize:"10px",float:"right"}}>greater than 4.0 </small>
</small><br/>
<small>
  <small style={{padding:"0px 5px"}}><input type="radio" name="customerrating" onChange={this.customerratingchange}  value="3&above"/> </small>
   <div className="outer"> <div className="inner" style={{width:"60%"}}></div></div> 
   <small  style={{fontSize:"10px",float:"right"}}>greater than 3.0 </small>
</small><br/>
<small>
  <small style={{padding:"0px 5px"}}><input type="radio" name="customerrating" onChange={this.customerratingchange}  value="2&above"/> </small>
   <div className="outer"> <div className="inner" style={{width:"40%"}}></div></div> 
   <small  style={{fontSize:"10px",float:"right"}}>greater than 2.0 </small>
</small><br/>
<small>
  <small style={{padding:"0px 5px"}}><input type="radio" name="customerrating" onChange={this.customerratingchange}  value="1&above"/> </small>
   <div className="outer"> <div className="inner" style={{width:"20%"}}></div></div> 
   <small  style={{fontSize:"10px",float:"right"}}>greater than 1.0 </small>
</small><br/>
<small>
  <small style={{padding:"0px 5px"}}><input type="radio" name="customerrating" onChange={this.customerratingchange}  value="4&above"/> </small>
   <div className="outer"> <div className="inner" style={{width:"0%"}}></div></div> 
   <small  style={{fontSize:"10px",float:"right"}}>yet to be reviewed </small>
</small><br/>

<div style={{width:"100",borderTop:"1px solid lightgrey",padding:"5px"}}>
                <small style={{fontWeight:"bold",padding:"5px"}}>VENDORS</small>
              </div>
              <div className="input-group mb-3 input-group-sm">
          <div className="input-group-prepend" >
           <span className="input-group-text" style={{backgroundColor:"white"}}><span className="fa fa-search"></span></span>
         </div>
         <input type="text" placeholder="search vendors.." name="displaybrand" onChange={this.vendorchange} value={this.state.displayvendor} className="form-control" style={{borderLeft:"none"}} />
        </div>
        <div style={{overflow:"auto",padding:"10px",height:`${this.props.vendors.length>12 ? "200px" : null}`}}>
{this.state.filteredvendor.length > 0 ? 
this.state.filteredvendor.map(product => 
 <div key={product} >
  <small style={{fontSize:"12px"}}> 
<input type='checkbox' onChange={this.change} checked={this.state.vendor.includes(encodeURI(product)) ? true : false } name='vendor' value={encodeURI(product)}/>
<a style={{color:`${this.props.userdetails.background === "black" ? "white" : this.props.userdetails.background === "white"?"black" : "black"}`,textTransform:"capitalize"}} href={`/product/${product}?search=standing fan&vendor=${product}`}> {product}
</a> <small style={{float:"right",fontWeight:"bolder",color:"grey"}}>{product.storey}</small>
</small>
</div>)
:
 this.props.vendors.map(product => 
     <div key={product.store}>
              <small style={{fontSize:"12px"}}><input type='checkbox' onChange={this.change} checked={this.state.vendor.includes(encodeURI(product.store))  ? true : false } name='vendor' value={encodeURI(product.store)}/>
            <a style={{color:`${this.props.userdetails.background === "black" ? "white" : this.props.userdetails.background === "white"?"black" : "black"}`,padding:"5px 5px 10px 5px",textTransform:"capitalize"}} href={`/product/${product.store}?search=standing fan&vendor=${product.store}`}> {product.store}
         </a> <small style={{float:"right",fontWeight:"bolder",color:"grey"}}>{product.storey}</small>
           </small>             
            </div>)}
            </div>
            <hr/>



              <div style={{width:"100",borderTop:"1px solid lightgrey",padding:"5px"}}>
                <small style={{fontWeight:"bold",padding:"5px"}}>BRAND</small>
              </div>
              <div className="input-group mb-3 input-group-sm">
          <div className="input-group-prepend" >
           <span className="input-group-text" style={{backgroundColor:"white"}}><span className="fa fa-search"></span></span>
         </div>
         <input type="text" placeholder="search brands.." name="displaybrand" onChange={this.brandchange} value={this.state.displaybrand} className="form-control" style={{borderLeft:"none"}} />
        </div>
    <div style={{overflow:"auto",padding:"10px",height:`${this.props.brands.length>12 ? "200px" : null}`}}>
{this.state.filteredbrand.length > 0 ? 
this.state.filteredbrand.map(product => 
 <div key={product.brand} >
  <small style={{fontSize:"12px"}}> 
<input type='checkbox' onChange={this.change} checked={this.state.brand.includes(encodeURI(product.brand)) ? true : false } name='brand' value={encodeURI(product.brand)}/>
<a style={{color:`${this.props.userdetails.background === "black" ? "white" : this.props.userdetails.background === "white"?"black" : "black"}`,textTransform:"capitalize"}} href={`/product/?search=standing fan&brand=${product.brand}`}> {product.brand}
</a> <small style={{float:"right",fontWeight:"bolder",color:"grey"}}>{product.brandy}</small>
</small>
</div>)
: 
 this.props.brands.map(product => 
     <div key={product.brand}>
              <small style={{fontSize:"12px"}}><input type='checkbox' onChange={this.change} checked={this.state.brand.includes(encodeURI(product.brand))  ? true : false } name='brand' value={encodeURI(product.brand)}/>
            <a style={{color:`${this.props.userdetails.background === "black" ? "white" : this.props.userdetails.background === "white"?"black" : "black"}`,padding:"5px 5px 10px 5px",textTransform:"capitalize"}} href={`/product/${product.brand}?search=standing fan&brand=${product.brand}`}> {product.brand}
         </a> <small style={{float:"right",fontWeight:"bolder",color:"grey"}}>{product.brandy}</small>
           </small>             
            </div>)}
            </div>
            <hr/>
              <small style={{fontWeight:"bold",padding:"5px"}}> SELLER RATINGS</small> <br/>
<small>
  <small style={{padding:"0px 5px"}}><input type="radio"/> </small>
   <div className="outer"> <div className="inner" style={{width:"80%"}}></div></div> 
   <small  style={{fontSize:"10px",float:"right"}}>greater than 4.0 </small>
</small><br/>
<small>
  <small style={{padding:"0px 5px"}}><input type="radio"/> </small>
   <div className="outer"> <div className="inner" style={{width:"60%"}}></div></div> 
   <small  style={{fontSize:"10px",float:"right"}}>greater than 3.0 </small>
</small><br/>
<small>
  <small style={{padding:"0px 5px"}}><input type="radio"/> </small>
   <div className="outer"> <div className="inner" style={{width:"40%"}}></div></div> 
   <small  style={{fontSize:"10px",float:"right"}}>greater than 2.0 </small>
</small><br/>
<small>
  <small style={{padding:"0px 5px"}}><input type="radio"/> </small>
   <div className="outer"> <div className="inner" style={{width:"20%"}}></div></div> 
   <small  style={{fontSize:"10px",float:"right"}}>greater than 1.0 </small>
</small><br/>
<small>
  <small style={{padding:"0px 5px"}}><input type="radio"/> </small>
   <div className="outer"> <div className="inner" style={{width:"0%"}}></div></div> 
   <small  style={{fontSize:"10px",float:"right"}}>yet to be reviewed </small>
</small><br/>
              
<div style={{width:"100",borderTop:"1px solid lightgrey",padding:"5px"}}>
                <small style={{fontWeight:"bold",padding:"5px"}}>COLOR</small>
              </div>
<div style={{overflow:"auto",padding:"10px",height:`${this.props.colours.length>12 ? "200px" : null}`}}>
            {this.props.colours.map(product =>  <div key={product.color}>
              <small style={{fontSize:"12px"}}>  
<input type='checkbox' onChange={this.change} checked={this.state.color.includes(encodeURI(product.color)) ? true : false } name='color' value={encodeURI(product.color)}/>
            <a style={{color:`${this.props.userdetails.background === "black" ? "white" : this.props.userdetails.background === "white"?"black" : "black"}`,textTransform:"capitalize",padding:"5px 5px 10px 5px"}} href={`/product/${product.color}?search=standing fan&color=${product.color}`}>
           
               {product.color}          

               <span className="ml-1 mr-1 mb-5" style={{borderRadius:"60%",fontSize:"8px",lineHeight:"0.2px",margin:"0px",padding:"0px 5px",border:"1px solid grey",backgroundColor:`${product.color}`,color:`${product.color}`}}><small>.</small></span> 
         </a> <small style={{float:"right",fontWeight:"bolder",color:"grey"}}>{product.colory}</small>
           </small>
            </div>)}
            <hr/>
            </div>
              {this.props.inches.length > 1 ?
              <div>
                 <div style={{width:"100",borderTop:"1px solid lightgrey",padding:"5px"}}>
                <small style={{fontWeight:"bold",padding:"5px"}}>SIZE  <small style={{fontWeight:"bold"}} className="text-muted"> (inches)</small></small>
              </div>

              <div className="input-group mb-3 input-group-sm">
          <div className="input-group-prepend" >
           <span className="input-group-text" style={{backgroundColor:"white"}}><span className="fa fa-search"></span></span>
         </div>
         <input type="text" placeholder="Search Sizes" onChange={this.incheschange} value={this.state.displayinches} className="form-control" style={{borderLeft:"none"}} />
        </div>

<div style={{height:"200px",overflow:"auto",padding:"10px"}}>
{this.props.inches.length > 1 && this.state.filteredinches.length > 0 ? 

this.state.filteredinches.map(product =>  <div key={product.inches}>
  <small>
<input type='checkbox' onChange={this.change} checked={this.state.inches.includes(encodeURI(product.inches)) ? true : false }  name='inches' value={product.inches}/>
<a style={{color:`${this.props.userdetails.background === "black" ? "white" : this.props.userdetails.background === "white"?"black" : "black"}`,textTransform:"capitalize"}} href={`/product?search=standing fan&size=${product.inches}`}> {product.inches}
</a> <small style={{float:"right",fontWeight:"bolder",color:"grey"}}>{product.inchesy}</small>
</small>
</div>)

: this.props.inches.map(product =>  <div key={product.inches}>
              <small style={{fontSize:"12px"}}>
<input type='checkbox' onChange={this.change} checked={this.state.inches.includes(encodeURI(product.inches)) ? true : false } name='inches' value={encodeURI(product.inches)}/>
            <a style={{color:`${this.props.userdetails.background === "black" ? "white" : this.props.userdetails.background === "white"?"black" : "black"}`,padding:"5px 5px 10px 5px",textTransform:"capitalize"}} href={`/product/${product.size}?search=standing fan&size=${product.inches}`}> {product.inches}
         </a> <small style={{float:"right",fontWeight:"bolder",color:"grey"}}>{product.inchesy}</small>
            </small>
            </div>)}
            </div>
            </div>
             :null }


{this.props.litres.length > 1 ?
              <div>
                 <div style={{width:"100",borderTop:"1px solid lightgrey",padding:"5px"}}>
                <small style={{fontWeight:"bold",padding:"5px"}}>CAPACITY  <small style={{fontWeight:"bolder"}} className="text-muted"> (ℓ)</small></small>
              </div>
 
              <div className="input-group mb-3 input-group-sm">
          <div className="input-group-prepend" >
           <span className="input-group-text" style={{backgroundColor:"white"}}><span className="fa fa-search"></span></span>
         </div>
         <input type="text" placeholder="Search Sizes" onChange={this.litreschange} value={this.state.displaylitres} className="form-control" style={{borderLeft:"none"}} />
        </div>

<div style={{height:"200px",overflow:"auto",padding:"10px"}}>
{this.props.litres.length > 1 && this.state.filteredlitres.length > 0 ? 

this.state.filteredlitres.map(product =>  <div key={product.litres}>
  <small> 
<input type='checkbox' onChange={this.change} checked={this.state.litres.includes(encodeURI(product.litres)) ? true : false } name='litres' value={product.litres}/>
<a style={{color:`${this.props.userdetails.background === "black" ? "white" : this.props.userdetails.background === "white"?"black" : "black"}`,textTransform:"capitalize"}} href={`/product/?search=standing fan&size=${product.litres}`}> {product.litres}
</a> <small style={{float:"right",fontWeight:"bolder",color:"grey"}}>{product.litresy}</small>
</small>
</div>)

: this.props.litres.map(product =>  <div key={product.litres}>
              <small style={{fontSize:"12px"}}>
<input type='checkbox' onChange={this.change} checked={this.state.litres.includes(encodeURI(product.litres)) ? true : false } name='litres' value={encodeURI(product.litres)}/>
     <a style={{color:`${this.props.userdetails.background === "black" ? "white" : this.props.userdetails.background === "white"?"black" : "black"}`,textTransform:"capitalize",padding:"5px 5px 10px 5px"}} href={`/product/${product.size}?search=standing fan&size=${product.litres}`}> {product.litres}
         </a> <small style={{float:"right",fontWeight:"bolder",color:"grey"}}>{product.litresy}</small>
           </small>
            </div>)}
            </div>
            </div>
             :null }

{this.props.wattage.length > 1 ?
              <div>
                 <div style={{width:"100",borderTop:"1px solid lightgrey",padding:"5px"}}>
                <small style={{fontWeight:"bold",padding:"5px"}}>SIZE  <small style={{fontWeight:"bold"}} className="text-muted"> (wattage)</small></small>
              </div>

              <div className="input-group mb-3 input-group-sm">
          <div className="input-group-prepend" >
           <span className="input-group-text" style={{backgroundColor:"white"}}><span className="fa fa-search"></span></span>
         </div>
         <input type="text" placeholder="Search Sizes" onChange={this.wattagechange} value={this.state.displaywattage} className="form-control" style={{borderLeft:"none"}} />
        </div>

<div style={{height:`${this.props.wattage.length > 12 ? "200px" : null}`,overflow:"auto",padding:"10px"}}>
{this.props.wattage.length > 1 && this.state.filteredwattage.length > 0 ? 

this.state.filteredwattage.map(product =>  <div key={product}>
  <small>
<input type='checkbox' onChange={this.change} checked={this.state.wattage.includes(encodeURI(product)) ? true : false } name='wattage' value={product}/>
<a style={{color:`${this.props.userdetails.background === "black" ? "white" : this.props.userdetails.background === "white"?"black" : "black"}`,textTransform:"capitalize"}} href={`/product/${product}?search=standing fan&size=${product}`}> {product}
</a> 
</small>
</div>)

: this.props.wattage.map(product =>  <div key={product.wattage}>
              <small style={{fontSize:"12px"}}>
<input type='checkbox' onChange={this.change} checked={this.state.wattage.includes(encodeURI(product.wattage)) ? true : false } name='wattage' value={encodeURI(product.wattage)}/>
            <a style={{color:`${this.props.userdetails.background === "black" ? "white" : this.props.userdetails.background === "white"?"black" : "black"}`,padding:"5px 5px 10px 5px",textTransform:"capitalize"}} href={`/product/${product.wattage}?search=standing fan&size=${product.wattage}`}> {product.wattage}
         </a> <small style={{float:"right",fontWeight:"bolder",color:"grey"}}>{product.wattagey}</small>
            </small>
            </div>)}
            </div>
            </div>
             :null }


            </div>
         );
    }
}
 const mapStateToProps =(store) =>{
   return{
    products:store.products,
    brands:store.brands,
    colours: store.colours,
    inches: store.inches,
    wattage:store.wattage,
    litres:store.litres,
    allsubcat1:[...store.allsubcat1,...store.allsubcat2,...store.allsubcat3],
    allsubcat2:store.allsubcat2,
    allsubcat3:store.allsubcat3,
    allcategory :store.allcategory,
    price: store.price,
    currentCategory:store.currentCategory,
    min:store.min,
    max:store.max,
    overallMin:store.overallMin,
    overallMax:store.overallMax,
    loading:store.loading,
    vendors:store.vendor,
    userdetails:store.userdetails
   }
 }
 const mapDispatchToProps = (dispatch) =>{
   return{
    getProducts:(data)=> dispatch(getProducts(data)),
    checkfilter:(data)=> dispatch(checkfilter(data)),
    setLoadingtoTrue:()=> dispatch(setLoadingtoTrue()),
    checkfilter:(data)=>dispatch(checkfilter(data)),
    getsidenav:(data)=>dispatch(getsidenav(data)),
    allsubcategories:(data)=>dispatch(allsubcategories(data))
   }
 }
export default compose(withRouter ,connect(mapStateToProps,mapDispatchToProps))(Sidenavbar);