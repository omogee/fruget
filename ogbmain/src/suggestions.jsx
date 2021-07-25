import React, { Component } from 'react';
import {connect} from "react-redux"
import 'bootstrap/dist/css/bootstrap.min.css'
class Suggestions extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const suggestions = this.props.searchedproducts
    console.log(this.props.searchedproducts)
        const filteredbrands =[]
        const filteredcategories = []
        let filteredcategory;
        for(var i=0; i<suggestions.length; i++){
            const found = filteredbrands.some(el => el.brand === suggestions[i].brand);
if(this.props.inputval === suggestions[i].brand && (!filteredcategories.includes(suggestions[i].generalcategory) || !filteredcategories.includes(suggestions[i].category))){
               filteredcategories.push(suggestions[i].generalcategory)
               filteredcategories.push(suggestions[i].category)
            }
            if((suggestions[i].brand.toLowerCase().indexOf(this.props.inputval.toLowerCase()) > -1 || suggestions[i].details.toLowerCase().indexOf(this.props.inputval.toLowerCase()) > -1) && !found){
              const brand = suggestions[i].brand
              const logo = suggestions[i].officialimg && suggestions[i].officialimg[1] !== undefined && JSON.parse(suggestions[i].officialimg) !== undefined ? JSON.parse(suggestions[i].officialimg)[1] : null
            //  const items = suggestions[i].category
              filteredbrands.push({brand,logo})
            }
        }  
        console.log(filteredbrands)
        return ( 
<<<<<<< HEAD
            <div className="container">
            <div style={{display:`${this.props.inputval.length > 0 ? "block" : "none"}`}} className="suggestion">
=======
            <div>
            <div>
                <div>
                    <center>
<div style={{display:`${this.props.inputval.length > 0 ? "block" : "none"}`}} className="suggestion">
<ul style={{listStyleType:"none", textAlign:"left"}}>
         <p style={{color:"lightgrey",fontSize:"12px",borderBottom:"1px solid lightgrey",width:"100%"}}>BRANDS</p>
{ this.props.showSuggestions === true && this.props.inputval.length > 0 && this.props.filteredSuggestions.length > 0 ?
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac

{ this.props.showSuggestions === true && this.props.inputval.length > 0 && filteredcategories.length > 0 ?
<div>
 <p style={{color:"grey",fontSize:"12px",borderBottom:"1px solid lightgrey",width:"100%",fontWeight:"bold"}}>POPULAR CATEGORIES</p>
 <div className="row" style={{borderBottom:"1px solid lightgrey"}}>
 {filteredcategories.map((suggests, index) =>
 <div  className="col-6" key={suggests}>
<small> 
<a href="" className="ml-2 mb-1" style={{color:"black",float:"left",textDecoration:"none"}}>  
<span style={{fontWeight:"bold",textTransform:"capitalize"}}>{this.props.inputval}</span>
<span className="ml-1">{suggests}</span>
    </a>  
    </small>
    </div>
     )}
     </div>
               
                </div> : null}
        

 
{ this.props.showSuggestions === true && this.props.inputval.length > 0 && filteredbrands.length > 0 ?
    <div>
<p style={{color:"grey",fontSize:"12px",borderBottom:"1px solid lightgrey",width:"100%",fontWeight:"bold"}}>POPULAR BRANDS</p>
<div className="row">
    {filteredbrands.slice(0, 8).map((suggests, index) =>
 <div  className="col-6" key={suggests.brand} >  
<small> 
<a href="" className="ml-2 mb-1" style={{color:"black",float:"left",textDecoration:"none"}}>  
 <div style={{display:"flex",flexWrap:"nowrap"}}>
     <div style={{width:"30%"}}>
{suggests.logo !== null && suggests.logo !== undefined ?
    <img src={ require (`./images/${suggests.logo}`)} style={{width:"100%"}} />              
    : null
}        
   </div>
 <div>
<b className="ml-1" style={{textTransform:"capitalize"}}>{suggests.brand}</b> <br/>
    </div> 
     </div>    
    </a>  
    </small>
    </div>  
    )}
     </div>
     </div>  :null}
       
{ this.props.showSuggestions === true && this.props.inputval.length > 0 && this.props.searchedproducts.length > 0 ?
 <div>
        <div style={{borderBottom:"1px solid lightgrey",borderTop:"1px solid lightgrey",width:"100%"}}>   
 <small style={{padding:"5px",color:"grey",fontSize:"14px",fontWeight:"bold"}}>POPULAR PRODUCTS</small>
<small style={{float:"right",padding:"5px",color:"grey"}}>{this.props.numOfRows}</small>
</div>
{this.props.searchedproducts.slice(0, this.props.searchlength).map((suggests, index) =>
<div className="ml-2" key={suggests.details}>
<a href="" style={{color:"black",textDecoration:"none"}}> 
<div className={this.props.device ? "mb-2" :"mb-1"} style={{borderBottom:`${this.props.device ? "1px solid lightgrey" : "none"}`,display:"flex",flexWrap:"nowrap"}}>
    <div style={{width:`${this.props.device ? "10%":"5%"}`,height:"7px"}}>
       <img style={{width:"100%"}}  src={`https://res.cloudinary.com/fruget-com/image/upload/${suggests.generalcategory}/${suggests.category}/${suggests.img1 && suggests.img1 !== undefined ? Object.values(JSON.parse(suggests.img1))[0] : ""}`} />    
    </div>
    <div>
         <small className="ml-1" style={{textTransform:"capitalize"}}>{suggests.details.length > 50 && this.props.device ? suggests.details.slice(0,50) + "...": suggests.details.length > 70 && !this.props.device ? suggests.details.slice(0,70) + "..." : suggests.details }</small>
    </div>
</div>   
    </a>  
 </div>
                )}
             <div><small><a style={{textDecoration:"none"}} href={`/category/search?search=${this.props.inputval}`}>See More</a></small></div></div> : this.props.showSuggestions === true && this.props.inputval.length > 1 ? 
                 <p>No PRODUCTS Found! <small>Check your spellings and kindly search again </small></p>
                : null}
                 <hr/>
                   
                </div>      
            </div>
                   
         );
    }
}
 const mapStateToProps = (store) =>{
     return {
        products: store.products,
        searching:store.searching,
        status:store.status,
        filteredSuggestions: store.filteredSuggestions,
        filteredbrands:store.filteredbrands, 
        suggestions: store.suggestions,
        showSuggestions: store.showSuggestions,
        inputval: store.inputval,
        searchedproducts:store.searchedproducts,
        numOfRows:store.numOfRows
     }
 }
export default connect(mapStateToProps)(Suggestions);