import React, { Component } from 'react';
import axios from "axios"
import {allcategories,getProducts, allsubcategories, unshowmodalsidenavbar} from "./store"
import {connect} from "react-redux"
import {Link,Redirect} from "react-router-dom"

class ModalSideNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category:[],
            subcategory:[],
            currentcategory:"",
            set:"Category",
            subcategorydisplay:"none",
          }
    }
    componentDidMount =()=>{
     this.props.allcategories()
    }
    
    subcat=(e)=>{
      this.props.allsubcategories(e.currentTarget.textContent)
      this.setState({currentcategory:e.currentTarget.textContent,set:"Sub-Category",subcategorydisplay:"block"})

    }
    undisplaysidenav =()=>{
      this.props.showmodalsidenavbar()
      }
      opencategory=(e)=>{
        const data ={
          category:e.currentTarget.textContent,
          page:1
        }
        this.props.getProducts(data)
      }
    render() { 
<<<<<<< HEAD
        
=======
      console.log(this.props.products)
      if(this.props.products.length > 0){
        return <Redirect to={`/category/${this.props.currentCategory}`} />;
      }
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
        return ( 
            <div>
               <div id="mySidebar" className="container"  style={{backgroundColor:"white",zIndex:"1000000"}}>
              <div className="row">
                <div className="col-1">
                  <a href="javascript:void(0)" className="closebtn" onClick={this.undisplaysidenav} style={{color:"black",textDecoration:"none",fontSize:"25px"}}>x</a>
                  </div>
              <div style={{zIndex:"1000000"}} className="col-4">
          <img src={require("./images/fruget.jpg")} className="mt-2" style={{width:"100%",height:"80%"}}/>
         </div>
       <div className="col-7"></div>
       </div>  
       <hr/>   

       {this.props.loading ?     
          <center style={{position:"absolute", top:"50%",left:"50%"}}>
            <img src={require(`./images/35.gif`)} />
          </center>
        : null}

   <p>Account</p>
<div className="row" style={{padding:"0px 10px"}}>
<div className="col-6">
<button className="btn" onClick={()=> window.location.assign("/customer/login")} style={{backgroundColor:"orange",textDecoration:"none",borderRadius:"3px",width: "100%",color:"white",padding:"2px"}}>
   <span className="far fa-user"></span> Login</button>
</div>

 <div className="col-6">
<button className="btn btn-link" onClick={()=> window.location.assign("/customer/register")}  style={{backgroundColor:"orange",textDecoration:"none",borderRadius:"3px",width:"100%",padding:"2px",color:"white"}}> <span className="fa fa-heart"></span> Register</button>
</div>
</div> <br/>
<div  className="row" style={{padding:"0px 10px"}}>
 <div className="col-6">
<button className="btn btn-link" onClick={()=> window.location.assign("/customer/login")}  style={{backgroundColor:"orange",borderRadius:"3px",textDecoration:"none",width: "100%",color:"white",padding:"2px"}}> <span className="fa fa-map-marker"></span> Track Order  ID</button>
</div>

 <div className="col-6">
<button className="btn btn-link" onClick={()=> window.location.assign("/customer/savedItems")}  style={{backgroundColor:"orange",borderRadius:"3px",textDecoration:"none",width:"100%",padding:"2px",color:"white"}}> <span className="fa fa-heart"></span> Saved Items</button>
</div>

</div>
<br/>

 <p>{this.state.set}</p>
 <p onClick={(e)=>this.opencategory(e)} style={{backgroundColor:"black", color:"white",padding:"10px",display:`${this.state.subcategorydisplay}`}}>
  {this.state.currentcategory}
   <i style={{float:"right"}} className="fas fa-chevron-down ml-1"></i>
 </p>
 <div style={{paddingLeft:"30px"}} className="row">
<<<<<<< HEAD
 <div className="col-12">
    {this.props.allcategory.length > 0 ? this.props.allcategory.map((categories) =>
        <div key={categories.generalcategory } style={{color:"black",cursor:"pointer"}}>
             <p onClick={(e)=>this.subcat(e)} ><small style={{textTransform:"capitalize"}} >{categories.generalcategory}</small>
             </p>
            <hr/>
        </div>
        ) : null}
      </div>
   <div className="col-12">
    {this.props.allsubcategory.length > 0 ? this.props.allsubcategory.map((categories) =>
        <div key={categories.category } style={{color:"black",cursor:"pointer"}}>
             <p onClick={(e)=>this.subcat(e)} ><small style={{textTransform:"capitalize"}} >{categories.category}</small>
=======
   <div className="col-12">
    {this.props.allcategory.length > 0 ? this.props.allcategory.map((categories) =>
        <div key={categories.subcat1 || categories.subcat2} style={{color:"black",cursor:"pointer"}}>
             <p onClick={(e)=>this.subcat(e)} ><small style={{textTransform:"capitalize"}} >{categories.subcat1 || categories.subcat2}</small>
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
             </p>
            <hr/>
        </div>
        ) : null}
      </div>
      <div>
      <p>Our Services :</p>
      </div>
 </div>
</div>
            </div>
         );
    }
}
 const mapStateToProps =(store)=>{
   return{
   allcategory:store.allcategories,
<<<<<<< HEAD
   allsubcategory:store.allcategory,
=======
   allsubcategory:store.allsubcategories,
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
   products:store.products,
   loading:store.loading,
   currentCategory:store.currentCategory
   }
 }
 const mapDispatchToProps =(dispatch)=>{
   return{
     getProducts:(data)=> dispatch(getProducts(data)),
     allcategories: ()=>dispatch(allcategories()),
     allsubcategories:(data)=> dispatch(allsubcategories(data)),
     showmodalsidenavbar:()=>dispatch(unshowmodalsidenavbar()),
     unshowmodalsidenavbar:()=>dispatch(unshowmodalsidenavbar())
   }
 }
export default connect(mapStateToProps,mapDispatchToProps)(ModalSideNavbar);