import React, { Component } from 'react';
import Home from "./home"
import profileSide from "./profilesidenavbar"
import {viewsellerdetails} from "./store"
import {connect} from "react-redux"
import Uploads from "./uploads"
import SellerProfile from "./sellerdetail"
import {BrowserRouter as Router, Route, Switch, withRouter} from "react-router-dom"
class ProfileCategory extends Component {
    constructor(props) {
        super(props);
        this.state = { 
           
         }
    }
componentDidMount=()=>{
    console.log("profilecategory")
    const userId = this.props.match.params.userId.split("%2C")[1]
    console.log("userId", userId)
    if(this.props.sellerdetails.length === 0){
        this.props.viewsellerdetails(userId)
    }
    this.setState({details:this.props.match.params.details || "none"})
}
    render() { 
        console.log("sellerdetails",this.props.sellerdetails)
        return (    
            <div> 
          <h1>This is the category page</h1>
            
            </div>
           
          );
    }
}
const mapStateToProps=(store)=>{
    return{
        sellerdetails :store.sellerdetails,
        sellerproducts:store.sellerproducts
    }
     }
     const mapDispatchToProps=(dispatch)=>{
         return{
             viewsellerdetails:(data)=>dispatch(viewsellerdetails(data))
         }
     }
export default connect(mapStateToProps,mapDispatchToProps) (ProfileCategory);