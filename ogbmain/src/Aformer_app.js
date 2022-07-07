import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import {test} from './store'
import {getProducts,getsidenav} from './store'
import {compose} from 'redux'
import {connect} from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {withCookies} from 'react-cookie'
import Sidenavbar from "./sidenavbar"
import Suggestions from "./suggestions"
import querystring from 'query-string'
import {Pagination} from 'react-bootstrap'
import './main.css'

class App extends Component {
  constructor(props) {
    const { cookies } = props; 
    super(props); 
    this.state = { 
      products:[],
      search: '',
      username: " ",
      password: "",
      signupMessage: '', 
      isLoggedin: false,
      token: {},
      currentPage: 1,
      noPages:0
     }
  }
  componentDidMount =()=>{
    const parsedQuery = querystring.parse(this.props.location.search);
    if(parsedQuery.brand === undefined || parsedQuery.size === undefined || parsedQuery.color === undefined){
      const data ={
        category: this.props.match.params.category,
        page: parsedQuery.page || 1
      }
      console.log(data)
      this.props.getProducts(data)
    }
    
    this.props.getsidenav(this.props.match.params.category)
  }
  handleChange=(e)=>{
    this.setState({search:e.target.value})
  }
  paginate = (pages) =>{
    window.location.assign(`/category/${this.props.match.params.category}?page=${pages}`)

  }

  render() { 
    let active = this.props.currentPage;
    var PageNumbers = [];
    for (var i=1; i<=this.props.totalPages; i++){
       PageNumbers.push(i)
    }
    return ( 
           <div>
             
             <div style={{display:`${this.props.inputval.length > 0 ? "block" : "none"}`,zIndex:"2",width:"100%",height:"100%",backgroundColor:"rgba(0,0,0,0.3)",width:"100%", height:"300%",position:"absolute"}} className="indexer"> 
             <Suggestions></Suggestions>       
             </div>
          <div className="container">
        <div className='row' >
        <div className="d-none d-lg-block col-lg-3 stick" style={{backgroundColor:"rgba(242, 242, 242,0.4)"}}>
          <Sidenavbar category={this.props.match.params.category}/>
        </div>
          <div className='col-12 col-lg-9'>
    <p>{this.props.searcher}</p>
          <div className='row' > 
        {this.props.products.map((product) =>          
           <div className='col-6 col-md-4 col-lg-3'   key={product.productId} > 
                <center>
           <img className="mainImg img-responsive" src={require (`./images/${product.mainimg}`)} style={{maxWidth:"100%"}} ></img>
           </center>
        <small style={{float:"left"}}>{product.brand} </small><br/>
           <small style={{height:"40px"}}>
            <div  className="details">
    <Link to ={`/product/${product.details}`} style={{color:'black'}}>
       {product.details.length > 50 ? product.details.slice(0,50)+ "..." : product.details +"-"+ product.model +"-"+ product.color}
       </Link>
        </div>
        <b>{product.mainprice}</b><br/>
        <div className="outer">
          <div className="inner" style={{width:`${product.percentrating || 0}%`}}>

          </div>
        </div> <small style={{fontSize:"12px"}}>({product.numOfRating || 0})</small>
         </small>
        <br/><br/>
        
           </div> 
           
         )}
         
             </div>
             <center>
             <Pagination size="sm">
             <Pagination.First />
             <Pagination.Prev />
               <ul className="pagination pagination-circle pg-blue">
                  {PageNumbers.map(pages =>
                    <Pagination.Item key={pages} onClick={() =>this.paginate(pages)} active={pages === active}>
                      {pages}
                    </Pagination.Item>
                    )}
               </ul>
               <Pagination.Next />
               <Pagination.Last />
             </Pagination>
             </center>
         </div>
        </div>
      </div>
     
      </div> 
     );
  }
}
 const mapStateToProps =(store)=>{
    return{           
       products: store.products,
       test:store.test,
       status:store.status,
       searcher: store.searcher,
       inputval: store.inputval,
       currentPage: store.currentPage,
       totalPages: store.totalPages
     }
 }
 const mapDispatchToProps =(dispatch)=>{
   return{
     test: ()=> dispatch(test()),
     getProducts: (data)=> dispatch(getProducts(data)),
     getsidenav: (data) => dispatch(getsidenav(data))
   }
 }
 export default compose(withCookies, connect(mapStateToProps, mapDispatchToProps))(App);