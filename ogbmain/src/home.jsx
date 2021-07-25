import React, { Component } from 'react';
import {viewsellerdetails,getfilteredSuggestions,searcher,allcategories,allsubcategories} from "./store"
import { connect } from "react-redux"
import {Link} from "react-router-dom"
import Suggestions from "./suggestions"
import {Dropdown} from 'react-bootstrap'
import cookies from "js-cookie"
import queryString from "query-string"

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            inputval: "",
            inputbtnclass:"",
            subcategorydisplay:"none",
            currentcategory:""
         }
    }
    componentDidMount =()=>{
        this.props.allcategories()
        console.log([1,2,3])
        console.log([1,2,3].toString())
    }
   
      subcat=(data)=>{
          //e.currentTarget.textContent
        this.props.allsubcategories(data)
        this.setState({currentcategory:data,set:"Sub-Category",subcategorydisplay:"block"})
  
      }
    render() { 
        console.log(this.props.allcategoriesie)
        return ( 
            <div className="container">        
                <div className="row">
               <div className="col-12 col-md-4">
                
               <p onClick={(e)=>this.opencategory(e)} style={{backgroundColor:"black", color:"white",padding:"10px",display:`${this.state.subcategorydisplay}`}}>
              {this.state.currentcategory}
               <i style={{float:"right"}} className="fas fa-chevron-down ml-1"></i>
                  </p>
                   <small style={{color:"orange"}}><span className="fa fa-list-alt" style={{backgroundColor:"orange",color:"white"}}></span> Popular categories</small>
                   {this.props.allcategory.length > 0 ? this.props.allcategory.map((categories) =>
        <div key={categories.generalcategory } style={{color:"black",cursor:"pointer"}}>
             <p style={{padding:"5px 2px",borderBottom:"1px solid lightgrey",borderTop:"1px solid lightgrey"}} onClick={()=>this.subcat(categories.generalcategory)} >
                 <small style={{textTransform:"capitalize"}} >
                 {categories.generalcategory}</small>
                 <small style={{margin:"0px 10px",float:"right"}}>
                     <Link to={`/${categories.generalcategory}`}>
   <button className="btn btn-sm" style={{color:"white",backgroundColor:"orange",padding:"3px",fontSize:"11px"}}>Open category</button>
   </Link>
                   </small>
             </p>
           
            {this.props.allcategoriesie.length > 0 && categories.generalcategory=== this.state.currentcategory ? this.props.allcategoriesie.map((categories) =>
        <div key={categories.category } style={{color:"black",cursor:"pointer"}}>
             <p onClick={(e)=>this.subcat(e)} ><small style={{textTransform:"capitalize"}} >{categories.category}</small>
             <small style={{margin:"0px 10px",float:"right"}}>
   <button className="btn btn-sm" style={{color:"white",backgroundColor:"orange",padding:"3px",fontSize:"11px"}}>Open category</button>
                   </small>
             </p>
        </div>
        ) : null}
       
        </div>
        ) : null}
               <div className="input-group mb-3 input-group-sm">
                    <div className="input-group-prepend" >
                    <span className="input-group-text" style={{backgroundColor:"white"}}><span className="fa fa-search"></span></span>
                     </div>
                     <input type="text" className="form-control"  value={this.state.inputval} name="search" onChange={this.change2} placeholder="Search vendors"/>                      
                     </div>
  
                     <div style={{display:`${this.props.inputval.length > 0 ? "block" : "none"}`,width:"100%",height:"100%",position:"absolute"}} > 
             <Suggestions></Suggestions>       
                  </div>
               </div>
                </div>
            </div>
         );
    }
}
const mapStateToProps=(store)=>{
    return{
        sellerdetails :store.sellerdetails,
        sellerproducts:store.sellerproducts,
        inputval:store.inputval,
        allcategory:store.allcategories,
        allcategoriesie:store.allcategory
    }
     }
     const mapDispatchToProps=(dispatch)=>{
         return{
             viewsellerdetails:(data)=>dispatch(viewsellerdetails(data)),
             getfilteredSuggestions :(data)=>dispatch(getfilteredSuggestions(data)),
             searcher : (data)=>dispatch(searcher(data)),
             allcategories: ()=>dispatch(allcategories()),
             allsubcategories:(data)=>dispatch(allsubcategories(data))

         }
     }
export default connect(mapStateToProps,mapDispatchToProps)(Home);