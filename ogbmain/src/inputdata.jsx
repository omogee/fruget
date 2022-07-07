import React, { Component } from 'react';
import {connect} from "react-redux"
import {compose} from "redux"
import "bootstrap/dist/css/bootstrap.min.css"
import queryString from "query-string"
import {withRouter} from "react-router-dom"
import {submitsearcher} from "./store"
class Inputdata extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            val :[]
         }
    }
    componentDidMount = () => {
        let parsedQuery = queryString.parse(this.props.location.search)

    this.setState({val:parsedQuery.search})       
    }
    render() { 
        let parsedQuery = queryString.parse(this.props.location.search)
        return ( 
            <div>
                <div style={{textTransform:"capitalize",padding:"10px"}}>
                  <small style={{color:"lightgrey"}}> RESULT <span className="fa fa-arrow-right"></span></small> 
                  <div className="row" >
                  {this.props.inputval || parsedQuery.search}
                      </div>
                </div>
            </div>
         );
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
       inputval: store.inputval
     }
  } 
 const mapDispatchToProps = (dispatch) =>{
     return{
         submitsearcher: (data) => dispatch(submitsearcher(data))
     }
 }
export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(Inputdata);