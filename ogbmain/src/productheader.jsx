import React, { Component } from 'react';
import {connect} from "react-redux"
import querystring from "query-string"
import {compose} from "redux"
import {Link, withRouter} from "react-router-dom"
import {setredirect,saveItem,undisplaysavemodal,unloading,viewuserdetailsbyuserId,getvendorProducts ,getProducts,checksaveItem,getseller,getdetails,getsidenav,getvendorsidenav,checkfilter,checkvendorfilter,addtocart,undisplaymodal,setLoadingtoTrue,allsubcategories,allvendorsubcategories} from './store'


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          dropdownwidth:"0%",
          dropdownclass:"fa fa-chevron-up"
         }
    }
    
    displayfilterdropdown=()=>{
      if(this.state.dropdownwidth === "0%"){
      this.setState({dropdownwidth:"15%",dropdownclass:"fa fa-chevron-down"})
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
      const parsedQuery = querystring.parse(this.props.location.search);
      let currentUrlParams = new URLSearchParams(window.location.search);
        currentUrlParams.set('sort', value);
        if(parsedQuery.page){
          currentUrlParams.set('page', 1);
        }  
        this.setState({dropdownwidth:"0%",dropdownclass:"fa fa-chevron-up"})
        if(this.props.category){
     const checker =  Object.keys(parsedQuery).includes("brand") || Object.keys(parsedQuery).includes("litres") || Object.keys(parsedQuery).includes("sizes") || Object.keys(parsedQuery).includes("inches") || Object.keys(parsedQuery).includes("color")
       if(!checker ){
        const data ={
          category: this.props.category,
                page:  1,
                sort:value, 
                min:parsedQuery.min ,
                max:parsedQuery.max,
                rating:parsedQuery.rating
              }
           this.props.getsidenav(data)
             this.props.getProducts(data)
          //    this.props.allsubcategories(this.props.category)
             } 
              else if(checker){ 
            const data ={
              brand : parsedQuery.brand,
              inches: parsedQuery.inches, 
              litres:parsedQuery.litres,
              colour: parsedQuery.color,
              vendor: parsedQuery.vendor,
              category:this.props.category,
            max:parsedQuery.max,
            min:parsedQuery.min,
              page: 1,
              sort:value,
              q :parsedQuery.q || "brand",
              rating:parsedQuery.rating
            }
           
            this.props.checkfilter(data)
            this.props.getsidenav(data)
            this.props.allsubcategories(this.props.category)
          }
        }else{
          const checker =  Object.keys(parsedQuery).includes("vendor") || Object.keys(parsedQuery).includes("brand") || Object.keys(parsedQuery).includes("litres") || Object.keys(parsedQuery).includes("sizes") || Object.keys(parsedQuery).includes("inches") || Object.keys(parsedQuery).includes("color")
          if(!checker  ){
          const data ={
            vendor: this.props.vendor,
            page:  1,
            sort:value, 
            min:parsedQuery.min ,
            max:parsedQuery.max,
            rating:parsedQuery.rating
          }    
                this.props.getvendorProducts(data)
                this.props.getvendorsidenav(data)
                this.props.allvendorsubcategories(this.props.vendor)
              }
              else if(checker ){ 
                const data ={
                  brand : parsedQuery.brand,
                  inches: parsedQuery.inches, 
                  litres:parsedQuery.litres,
                  colour: parsedQuery.color,
                  vendor: parsedQuery.vendor,
                  vendor:this.props.vendor,
                max:parsedQuery.max,
                min:parsedQuery.min,
                  page: 1,
                  sort:value ,
                  q :parsedQuery.q || "brand",
                  rating:parsedQuery.rating
                }
               
                this.props.checkvendorfilter(data)
                this.props.getvendorsidenav(data)
               this.props.allvendorsubcategories(this.props.vendor)
              }
              }  
        this.props.history.push(window.location.pathname +"?"+ currentUrlParams.toString());
    } 

    render() { 
       const parsedQuery = querystring.parse(this.props.location.search);
       let view;
       if(!parsedQuery.view || parsedQuery.view === "grid"){
        view = "grid"
       }else{
         view = "list"
       }
        return ( 
            <div>
            <div className="row">
            <div className="col-6 col-md-8"> 
              <small>
                <Link to={`/`} style={{color:`${this.props.userdetails.background === "black" ? "white" : this.props.userdetails.background === "white"?"black" : "black"}`}}>Home <span classae="fa fa-chevron-right"></span>
                </Link> 
                 <Link to={`/fan`} style={{color:"rgb(0, 119, 179)",textTransform:"capitalize"}}>{this.props.category}</Link></small>
          <p style={{ textTransform:"capitalize",fontWeight:"bolder",padding:"0px"}}>{this.props.category || this.props.vendor}</p>
                        </div>
                        <div className="col-6 col-md-4">
                        <small>
                        {this.props.numOfRows > 0 ? 
                      <small style={{float:"right"}}>
                      ({(((this.props.currentPage || 1)-1)*40) + 1} - {(this.props.currentPage || 1)*(this.props.numOfRows < 40 ? this.props.numOfRows : 40)}) of  
                      <span >
                       {" " +this.props.numOfRows} products
                      </span>
                      </small>
                      : null}
                    </small>
                    <br/>
                        <center>
                      <div style={{display:"flex",flexWrap:"nowrap"}}>
                        <div style={{marginTop:"8px"}}>
                          <small >
                          Sort By :  <b style={{color:"orange", cursor:"pointer"}} onClick={this.displayfilterdropdown}> {parsedQuery.sort || "popularity"} 
                          <span style={{color:"orange"}} className="fa fa-chevron-down ml-2"></span></b>
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
            </div>
         );
    }
}
/**
 * <div className="col-12" style={{width:"100%"}}>
                     <center>
          <div >
                    <p style={{fontWeight:"bold",textTransform:"capitalize",padding:"0px",margin:"0px"}}>{this.props.category}</p>
                    <small>
                    {this.props.numOfRows > 0 ? 
          <small>
                      ({(((this.props.currentPage || 1)-1)*40) + 1} - {(this.props.currentPage || 1)*(this.props.numOfRows < 20 ? this.props.numOfRows : 20)}) of  
                      <span >
                       {" " +this.props.numOfRows} products
                      </span>
                       </small>
           : null }
                     
                    </small>
                    </div>
                      </center>
                     </div>
 */
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
     currentDetailcategory:store.currentDetailcategory,
     currentProductIdcategory:store.currentProductIdcategory,
     min:store.min,
     max:store.max,
     userdetails:store.userdetails,
     cart:store.shoppingcart,
     redirect:store.redirect
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
  }
}

export default compose(withRouter,connect(mapStateToProps,mapDispatchToProps))(Header);
