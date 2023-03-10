import React, { Component } from 'react';
import {connect} from 'react-redux'
import {getProducts,submitsearcher} from './store'
import {compose} from 'redux'
import {withRouter} from 'react-router-dom'
import queryString from 'query-string'
import axios from "axios"

class SearchSideNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = { 
             first:true,
             applycolour:"black",
             highestprice : 0,
             lowestprice:0,
             price:{},
             displaybrand:"",
             displaysize:"",
             displayinches:"",
             displaylitres:"",
             filteredbrand:[],
             filteredsize:[],
             filteredinches:[],
             filteredlitres:[],
             filteredvendor:[],
             data:[],
             parsedQuery:[],
             brand:[],
             color:[],
             sizes:[],
             inches:[],
             litres:[],
             vendor:[],
             subcats:[],
             val:[]
         }
    }
    componentWillMount =()=>{
      const parsedQuery = queryString.parse(this.props.location.search);
      delete parsedQuery.page;
      delete parsedQuery.view;
      let val =[]
      for (var i=0; i<Object.values(parsedQuery).length; i++){
        if(Object.values(parsedQuery)[i].split(",").length === 1){
        val.push(Object.values(parsedQuery)[i]);
        }else{
          Object.values(parsedQuery)[i].split(",").map((p)=>{
            val.push(p);
          })
        }

       }
      
     
     console.log("val", val)
      this.setState({val})
 
}
          
    componentDidMount =()=>{
      const parsedQuery = queryString.parse(this.props.location.search);
      this.setState({parsedQuery})
      const {brand, color,inches,litres} = parsedQuery;
      if(parsedQuery.brand && parsedQuery.brand.length > 0){
        this.setState({brand}); 
      }
      if(parsedQuery.color && parsedQuery.color.length > 0){
        this.setState({color}); 
      }
      if(parsedQuery.inches && parsedQuery.inches.length > 0){
        this.setState({inches}); 
      }
      if(parsedQuery.litres && parsedQuery.litres.length > 0){
        this.setState({litres}); 
      }
     
      const data={
        search: parsedQuery.search,
        category:this.props.category,
        brand: parsedQuery.brand,
        inches: parsedQuery.inches,
        litres:parsedQuery.litres,
        colour:parsedQuery.color,
        page:parsedQuery.page,
        max:parsedQuery.max,
        min:parsedQuery.min,
        currentq:parsedQuery.q
      }
     this.props.submitsearcher(data)
      this.setState({data: Object.values(data)})
   
     axios.get(`http://localhost:5000/search/category/searched/price?search=${data.search}&brand=${data.brand}&size=${data.size}&colour=${data.colour}`)
 .then(res=> this.setState({price:res.data}, ()=>{
   for(var i=0; i<res.data.length; i++){
    console.log (res.data[i].highestprice)
    this.setState({highestprice:res.data[i].highestprice, lowestprice:res.data[i].lowestprice}, ()=> {
      this.inputelement.max= `${this.state.highestprice}`
      this.inputelement.min =`${this.state.lowestprice}`
    })
   }
 }))
 .then(err => console.warn(err))
 
    }



 change = (e)=>{
      const uri = window.location.href;
      const  parsedQuery = queryString.parse(this.props.location.search);
       if(parsedQuery[e.target.name] !== undefined){
        // const query = parsedQuery[e.target.name]
         if(uri.indexOf(e.target.value) > -1){
           var query = parsedQuery[e.target.name].split(",");
           console.log(query)
           if(query.length <= 1){
             let currentUrlParams = new URLSearchParams(window.location.search);
             currentUrlParams.delete(e.target.name);
             currentUrlParams.delete("q");
             currentUrlParams.set("page",1)
             window.location.assign(window.location.pathname +"?"+ currentUrlParams.toString());
           }else{
             const index = query.indexOf(`${e.target.value}`);
             console.log("index",index)
              query.splice(query.indexOf(`${e.target.value}`), 1)
             query = query.join()
         //    const spliturl2 = spliturl.join()
             let currentUrlParams = new URLSearchParams(window.location.search);
            currentUrlParams.set(e.target.name,query);
            currentUrlParams.set("page",1)
           window.location.assign(window.location.pathname +"?"+ currentUrlParams.toString());
           }
         }else{
            let currentUrlParams = new URLSearchParams(window.location.search);
            currentUrlParams.set("page",1)
            currentUrlParams.set("q",e.target.name)
       currentUrlParams.set(e.target.name,(e.target.value + "," +parsedQuery[e.target.name]) );
         window.location.assign(window.location.pathname +"?"+ currentUrlParams.toString());
       
         }    
       }
       else{
         let currentUrlParams = new URLSearchParams(window.location.search);
         currentUrlParams.set("page",1)
         currentUrlParams.set("q",e.target.name)
         currentUrlParams.set(e.target.name, e.target.value);
         window.location.assign(window.location.pathname +"?"+ currentUrlParams.toString());
       }         
     }  
    pricechange = (e)=>{
      this.setState({highestprice : e.target.value, applycolour :"blue"})
    }
    highestpricechange = (e) =>{
     this.setState({highestprice : e.target.value, applycolour :"blue"})
    }
    lowestpricechange = (e) => {
     this.setState({lowestprice : e.target.value, applycolour : "blue"})
    }
     
   pricechange = (e)=>{
    this.setState({highestprice : e.target.value,applycolour : "blue"})
  }
  highestpricechange = (e) =>{
   this.setState({highestprice : e.target.value,applycolour: "blue"})
  }
  lowestpricechange = (e) => {
   this.setState({lowestprice : e.target.value, applycolour : "blue"})
  }
  brandchange=(e) =>{
    this.setState({displaybrand: e.target.value})
    var filteredbrand = []
    this.props.searchedbrands.map(brand => {
      if(brand.brand.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1){
       filteredbrand.push({"brand":brand.brand,"brandy":brand.brandy})
      }
      this.setState({filteredbrand})
    })
  } 
  incheschange=(e) =>{
    this.setState({displayinches: e.target.value})
    var filteredinches = []
    this.props.searchedinches.map(size => {
      if(size.inches !== null && size.inches !== ""){
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
    this.props.searchedlitres.map(size => {
      if(size.litres !== null || size.litres !== ""){
      if(size.litres.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1){
       filteredlitres.push({"litres":size.litres,"litresy":size.litresy})
      }
      this.setState({filteredlitres})
    }
    })
  }
  pricefilter=(e)=>{
    e.preventDefault();
   let currentUrlParams = new URLSearchParams(window.location.search);
   currentUrlParams.set("max",this.state.highestprice);
   console.log("max", this.state.highestprice)
   currentUrlParams.set("min",this.state.lowestprice);
   window.location.assign(window.location.pathname +"?"+ currentUrlParams.toString()); 
  }
    render() { 
/**
 * 
 {this.props.searchedsizes.length > 1 && this.state.filteredsize.length > 0 ? 

this.state.filteredsize.map(product =>  <div key={product}>
  <small> <ul style={{lineHeight:'1px'}}>
<li style={{listStyleType:'none'}}> 
<input type='checkbox' onChange={this.change} checked={this.state.sizes.includes(product) ? true : false } name='sizes' value={product}/>
<a style={{color:`${this.props.userdetails.background === "black" ? "white" : this.props.userdetails.background === "white"?"black" : "black"}`}} href={`/product/${product}?search=standing fan&size=${product}`}> {product}
</a> 
</li>
  </ul></small>
</div>)
: this.props.searchedsizes.map(product =>  <div key={product.size}>
              <small> <ul style={{lineHeight:'1px'}}>
            <li style={{listStyleType:'none'}}> 
<input type='checkbox' onChange={this.change} checked={this.state.sizes.includes(product.size) ? true : false } name='sizes' value={product.size}/>
            <a style={{color:`${this.props.userdetails.background === "black" ? "white" : this.props.userdetails.background === "white"?"black" : "black"}`}} href={`/product/${product.size}?search=standing fan&size=${product.size}`}> {product.size}
         </a> 
            </li>
              </ul></small>
            </div>)}
 */
        return ( 
            <div className="hoversidenav" style={{backgroundColor:`${this.props.userdetails.background ||"white"}`,color:`${this.props.userdetails.background === "black" ? "white" : this.props.userdetails.background === "white"?"black" : "black"}`,padding:"5px 10px"}}>
              <small>FILTERS SELECTED</small>
              <div className="row" style={{padding:"5px"}}>
              {this.state.val.length > 1 ? this.state.val.map(value => 
                <div key={value} className="col-3" style={{padding:"2px"}}>
                <div className="alert alert-dismissible" style={{backgroundColor:"rgb(0, 119, 179)",color:"white",padding:"2px"}}>
               <center>
               <small style={{fontSize:"11px"}}> {value.length > 8 ? value.slice(0,8)+"..." : value}</small>
               </center>
              </div>
               </div>            
      ) :  this.state.val.length === 1 ? 
      <div className="col-4" style={{padding:"2px"}}>
      <div className="alert alert-dismissible" style={{backgroundColor:`${this.state.val.length > 0 ? "rgb(0, 119, 179)" : ""}`,color:"white",padding:"2px"}}>
     <center>
     <small> {this.state.val[0].length > 13 ? this.state.val[0].slice(0,13)+"..." : this.state.val[0]}</small>
     </center>
    </div>
     </div>   
      : null}
              </div>
             
              <div style={{width:"100",borderTop:"1px solid lightgrey",padding:"5px"}}>
                <small style={{fontWeight:"bold",padding:"5px"}}>CATEGORY</small>
              </div>
              <ul>
              {this.props.subcategories.map((subcategory,index) =>
                <div key={subcategory}>
                  <a href="" style={{color:`${this.props.userdetails.background === "black" ? "white" : this.props.userdetails.background === "white"?"black" : "black"}`}}><small> {subcategory.subcat2}</small></a>
                  <a href="" style={{color:`${this.props.userdetails.background === "black" ? "white" : this.props.userdetails.background === "white"?"black" : "black"}`}}><small> {subcategory.subcat3}</small> </a>                
                </div>
                )}
                </ul>
                <hr/>

   
   
{this.props.searchedvendor.length > 0 ?
              <div>
                 <div style={{width:"100",borderTop:"1px solid lightgrey",padding:"5px"}}>
                <small style={{fontWeight:"bold",padding:"5px"}}>POPULAR VENDORS </small>
              </div>
<div className="input-group mb-3 input-group-sm">
<div className="input-group-prepend" >
<span className="input-group-text" style={{backgroundColor:"white"}}><span className="fa fa-search"></span></span>
</div>
 <input type="text" placeholder="Search Vendors" onChange={this.incheschange} value={this.state.displayinches} className="form-control" style={{borderLeft:"none"}} />
 </div>
<div style={{height:`${this.props.searchedvendor > 10 ? "200px" : ""}`,overflow:"auto",padding:"10px"}}>
{this.props.searchedvendor.length > 1 && this.state.filteredvendor.length > 0 ? 
this.state.filteredvendor.map(product =>  <div key={product}>
  <small>
<input type='checkbox' onChange={this.change} checked={this.state.vendor.includes(encodeURI(product)) ? true : false }  name='vendor' value={product}/>
<a style={{color:`${this.props.userdetails.background === "black" ? "white" : this.props.userdetails.background === "white"?"black" : "black"}`,textTransform:"capitalize"}} href={`/product/${product}?search=standing fan&size=${product}`}> {product}
</a> 
</small>
</div>)
: this.props.searchedvendor.map(product =>  <div key={product.store}>
              <small style={{fontSize:"12px"}}>
<input type='checkbox' onChange={this.change} checked={this.state.vendor.includes(encodeURI(product.store)) ? true : false } name='vendor' value={encodeURI(product.store)}/>
            <a style={{color:`${this.props.userdetails.background === "black" ? "white" : this.props.userdetails.background === "white"?"black" : "black"}`,padding:"5px 5px 10px 5px",textTransform:"capitalize"}} href={`/product/${product.size}?search=standing fan&size=${product.store}`}> {product.store}
         </a> <small style={{float:"right",fontWeight:"bolder",color:"grey"}}>{product.storey}</small>
            </small>
            </div>)}
            </div>
            </div>
             :null }

                <div style={{width:"100",borderTop:"1px solid lightgrey",padding:"5px"}}>
                <small style={{fontWeight:"bold",padding:"5px"}}>SELLER RATING</small>
              </div>
              <small>
  <small style={{padding:"0px 5px"}}><input type="radio" name="customerrating"  onChange={this.customerratingchange} value="4&above"/> </small>
   <div className="outer"> <div className="inner" style={{width:"80%"}}></div></div> 
   <small style={{fontSize:"10px",float:"right"}}>greater than 4.0 </small>
</small><br/>
<small>
  <small style={{padding:"0px 5px"}}><input type="radio" name="customerrating" onChange={this.customerratingchange}  value="3&above"/> </small>
   <div className="outer"> <div className="inner" style={{width:"60%"}}></div></div> 
   <small style={{fontSize:"10px",float:"right"}}>greater than 3.0 </small>
</small><br/>
<small>
  <small style={{padding:"0px 5px"}}><input type="radio" name="customerrating" onChange={this.customerratingchange}  value="2&above"/> </small>
   <div className="outer"> <div className="inner" style={{width:"40%"}}></div></div> 
   <small style={{fontSize:"10px",float:"right"}}>greater than 2.0 </small>
</small><br/>
<small>
  <small style={{padding:"0px 5px"}}><input type="radio" name="customerrating" onChange={this.customerratingchange}  value="1&above"/> </small>
   <div className="outer"> <div className="inner" style={{width:"20%"}}></div></div> 
   <small style={{fontSize:"10px",float:"right"}}>greater than 1.0 </small>
</small><br/>
<small>
  <small style={{padding:"0px 5px"}}><input type="radio" name="customerrating" onChange={this.customerratingchange}  value="4&above"/> </small>
   <div className="outer"> <div className="inner" style={{width:"0%"}}></div></div> 
   <small style={{fontSize:"10px",float:"right"}}>yet to be reviewed </small>
</small><br/>

              <hr/>

                <small>PRICES (₦)</small> <small style={{float:"right"}}> <a href="" style={{color:`${this.state.applycolour}`}} onClick={this.pricefilter}>Apply Filter</a></small><br/>
                 <center>
                <input type="range" ref={(a)=> this.inputelement = a} name="price" min="" max="" value={this.state.highestprice} onChange={this.pricechange}/>
                <br/>
                <div className="row">
                  <div className="col-5">
                    <input type="number" value={this.state.lowestprice} name="lowestprice" onChange={this.lowestpricechange} style={{width:"100%"}}/>
                  </div>
                  -
                  <div className="col-5">
                  <input type="number" value={this.state.highestprice} style={{width:"100%"}} name="highestprice"  onChange={this.highestpricechange}/>
                  </div>
                </div>              
              </center>
              <hr/>
              <div style={{width:"100",borderTop:"1px solid lightgrey",padding:"5px"}}>
                <small style={{fontWeight:"bold",padding:"5px"}}>PRODUCT RATING</small>
              </div>
              <small>
  <small style={{padding:"0px 5px"}}><input type="radio" name="customerrating"  onChange={this.customerratingchange} value="4&above"/> </small>
   <div className="outer"> <div className="inner" style={{width:"80%"}}></div></div> 
   <small style={{fontSize:"10px",float:"right"}}>greater than 4.0 </small>
</small><br/>
<small>
  <small style={{padding:"0px 5px"}}><input type="radio" name="customerrating" onChange={this.customerratingchange}  value="3&above"/> </small>
   <div className="outer"> <div className="inner" style={{width:"60%"}}></div></div> 
   <small style={{fontSize:"10px",float:"right"}}>greater than 3.0 </small>
</small><br/>
<small>
  <small style={{padding:"0px 5px"}}><input type="radio" name="customerrating" onChange={this.customerratingchange}  value="2&above"/> </small>
   <div className="outer"> <div className="inner" style={{width:"40%"}}></div></div> 
   <small style={{fontSize:"10px",float:"right"}}>greater than 2.0 </small>
</small><br/>
<small>
  <small style={{padding:"0px 5px"}}><input type="radio" name="customerrating" onChange={this.customerratingchange}  value="1&above"/> </small>
   <div className="outer"> <div className="inner" style={{width:"20%"}}></div></div> 
   <small style={{fontSize:"10px",float:"right"}}>greater than 1.0 </small>
</small><br/>
<small>
  <small style={{padding:"0px 5px"}}><input type="radio" name="customerrating" onChange={this.customerratingchange}  value="4&above"/> </small>
   <div className="outer"> <div className="inner" style={{width:"0%"}}></div></div> 
   <small style={{fontSize:"10px",float:"right"}}>yet to be reviewed </small>
</small><br/>

              
              <div style={{width:"100",borderTop:"1px solid lightgrey",padding:"5px"}}>
                <small style={{fontWeight:"bold",padding:"5px"}}>BRAND</small>
              </div>
              <div className="input-group mb-3 input-group-sm">
          <div className="input-group-prepend" >
           <span className="input-group-text" style={{backgroundColor:"white"}}><span className="fa fa-search"></span></span>
         </div>
         <input type="text" placeholder="search brands.." onChange={this.brandchange} value={this.state.displaybrand} className="form-control" style={{borderLeft:"none"}} />
        </div>

        {this.state.filteredbrand.length > 0 ? 
this.state.filteredbrand.map(product => 
 <div key={product.brand}>
  <small> 
<input type='checkbox' onChange={this.change} checked={this.state.brand.includes(product.brand) ? true : false } name='brand' value={product.brand}/>
<a style={{color:`${this.props.userdetails.background === "black" ? "white" : this.props.userdetails.background === "white"?"black" : "black"}`,textTransform:"capitalize"}} href={`/product/?search=standing fan&brand=${product.brand}`}> {product.brand}
</a> <small style={{float:"right",fontWeight:"bolder",color:"grey"}}>{product.brandy}</small>
</small>
</div>)
: this.props.searchedbrands.map(product =>  <div key={product.brand}>
              <small style={{fontSize:"12px"}}><input type='checkbox' onChange={this.change} checked={this.state.brand.includes(encodeURI(product.brand))  ? true : false } name='brand' value={encodeURI(product.brand)}/>
            <a style={{color:`${this.props.userdetails.background === "black" ? "white" : this.props.userdetails.background === "white"?"black" : "black"}`,padding:"5px 5px 10px 5px",textTransform:"capitalize"}} href={`/product/${product.brand}?search=standing fan&brand=${product.brand}`}> {product.brand}
         </a> <small style={{float:"right",fontWeight:"bolder",color:"grey"}}>{product.brandy}</small>
           </small>
            </div>)}
           
            <div style={{width:"100",borderTop:"1px solid lightgrey",padding:"5px"}}>
                <small style={{fontWeight:"bold",padding:"5px"}}>COLOR</small>
              </div>
               
            {this.props.searchedcolours.map(product =>  <div key={product.color}>
              <small style={{fontSize:"12px"}}>  
<input type='checkbox' onChange={this.change} checked={this.state.color.includes(encodeURI(product.color)) ? true : false } name='color' value={encodeURI(product.color)}/>
            <a style={{color:`${this.props.userdetails.background === "black" ? "white" : this.props.userdetails.background === "white"?"black" : "black"}`,textTransform:"capitalize",padding:"5px 5px 10px 5px"}} href={`/product/${product.color}?search=standing fan&color=${product.color}`}> {product.color}
         </a> <small style={{float:"right",fontWeight:"bolder",color:"grey"}}>{product.colory}</small>
           </small>
            </div>)}
            
            {this.props.searchedinches.length > 1 ?
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
{this.props.searchedinches.length > 1 && this.state.filteredinches.length > 0 ? 

this.state.filteredinches.map(product =>  
<div key={product.inches}>
  <small>
<input type='checkbox' onChange={this.change} checked={this.state.inches.includes(encodeURI(product.inches)) ? true : false }  name='inches' value={product.inches}/>
<a style={{color:`${this.props.userdetails.background === "black" ? "white" : this.props.userdetails.background === "white"?"black" : "black"}`,textTransform:"capitalize"}} href={`/product/?search=standing fan&size=${product.inches}`}> {product.inches}
</a> <small style={{float:"right",fontWeight:"bolder",color:"grey"}}>{product.inchesy}</small>
</small>
</div>)

: this.props.searchedinches.map(product =>  <div key={product.inches}>
              <small style={{fontSize:"12px"}}>
<input type='checkbox' onChange={this.change} checked={this.state.inches.includes(encodeURI(product.inches)) ? true : false } name='inches' value={encodeURI(product.inches)}/>
            <a style={{color:`${this.props.userdetails.background === "black" ? "white" : this.props.userdetails.background === "white"?"black" : "black"}`,padding:"5px 5px 10px 5px",textTransform:"capitalize"}} href={`/product/${product.size}?search=standing fan&size=${product.inches}`}> {product.inches}
         </a> <small style={{float:"right",fontWeight:"bolder",color:"grey"}}>{product.inchesy}</small>
            </small>
            </div>)}
            </div>
            </div>
             :null }

{this.props.searchedlitres.length > 1 ?
              <div>
                 <div style={{width:"100",borderTop:"1px solid lightgrey",padding:"5px"}}>
                <small style={{fontWeight:"bold",padding:"5px"}}>CAPACITY  <small style={{fontWeight:"bold"}} className="text-muted"> (inches)</small></small>
              </div>

              <div className="input-group mb-3 input-group-sm">
          <div className="input-group-prepend" >
           <span className="input-group-text" style={{backgroundColor:"white"}}><span className="fa fa-search"></span></span>
         </div>
         <input type="text" placeholder="Search litres..." onChange={this.litreschange} value={this.state.displaylitres} className="form-control" style={{borderLeft:"none"}} />
        </div>

<div style={{height:"200px",overflow:"auto",padding:"10px"}}>
{this.props.searchedlitres.length > 1 && this.state.filteredlitres.length > 0 ? 
this.state.filteredlitres.map(product =>  <div key={product.litres}>
  <small>
<input type='checkbox' onChange={this.change} checked={this.state.litres.includes(encodeURI(product.litres)) ? true : false }  name='litres' value={product.litres}/>
<a style={{color:`${this.props.userdetails.background === "black" ? "white" : this.props.userdetails.background === "white"?"black" : "black"}`,textTransform:"capitalize"}} href={`/product/?search=standing fan&size=${product.litres}`}> {product.litres}
</a> <small style={{float:"right",fontWeight:"bolder",color:"grey"}}>{product.litresy}</small>
</small>
</div>)

: this.props.searchedlitres.map(product =>  <div key={product.litres}>
              <small style={{fontSize:"12px"}}>
<input type='checkbox' onChange={this.change} checked={this.state.litres.includes(encodeURI(product.litres)) ? true : false } name='litres' value={encodeURI(product.litres)}/>
            <a style={{color:`${this.props.userdetails.background === "black" ? "white" : this.props.userdetails.background === "white"?"black" : "black"}`,padding:"5px 5px 10px 5px",textTransform:"capitalize"}} href={`/product/${product.size}?search=standing fan&size=${product.litres}`}> {product.litres}
         </a> <small style={{float:"right",fontWeight:"bolder",color:"grey"}}>{product.litresy}</small>
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
    searchedbrands:store.searchedbrands,
    searchedcolours: store.searchedcolours,
    searchedsizes: store.searchedsizes,
    subcategories:store.subcategories,
    searchedlitres:store.searchedlitres,
    searchedinches:store.searchedinches,
    searchedwattage:store.searchedwattage,
    searchedvendor:store.searchedvendor,
    userdetails:store.userdetails
    
   }
 }
 const mapDispatchToProps = (dispatch) =>{
   return{
    getProducts: (data)=> dispatch(getProducts(data)),
    submitsearcher:(data) => dispatch(submitsearcher(data))
   }
 }
export default compose(withRouter ,connect(mapStateToProps,mapDispatchToProps))(SearchSideNavbar);