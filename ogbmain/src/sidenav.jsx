import React, { Component } from 'react';
import axios from 'axios'
// import {Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { withRouter} from 'react-router-dom'
import queryString from 'query-string'
class SideNav extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      first : true,
      products:[],
      search: '',
      colourdata: [],
      sizedata: [],
      branddata: [],
      defaultcheck: false,
      ischecked: false,
        brands: [],
        colour:[],
        mysize:[]
     }
  }
  componentWillMount = () =>{
    const parsedQuery = queryString.parse(this.props.location.search);
    
    if(parsedQuery.brands){
      const spliter= parsedQuery.brands.split(',');
      this.setState({brands: spliter})
   }
   if(parsedQuery.colour){
    const Cspliter= parsedQuery.colour.split(',');
    this.setState({colour: Cspliter})
 }
 if(parsedQuery.mysize){
  const Sspliter= parsedQuery.mysize.split(',');
  this.setState({mysize: Sspliter})
}
  }
  componentDidMount =()=>{
    

    axios.get('http://fruget.herokuapp.com/fetch')
    .then(res => this.setState({products: res.data}))
    .catch(err => console.warn(err))

    axios.get('http://fruget.herokuapp.com/sizes')
    .then(res => this.setState({sizedata: res.data}))
    .catch(err => console.warn(err))
    axios.get('http://fruget.herokuapp.com/colour')
    .then(res => this.setState({colourdata: res.data}))
    .catch(err => console.warn(err))
    axios.get('http://fruget.herokuapp.com/brands')
    .then(res => this.setState({branddata: res.data}))
    .catch(err => console.warn(err))
  }  
  change = (e)=>{   

     const uri = window.location.href;
     console.log(uri)         
     var pos = uri.indexOf(e.target.name)
     console.log(uri.indexOf(e.target.name))
     
     if (uri.indexOf('?') === -1){
      const value = e.target.value;
      const seperator = uri.indexOf('?'+e.target.name) !== -1 ? "%2C" : "product/"+e.target.value+"?"+e.target.name+"=";
           window.location.assign(uri + seperator + value)
     }
     else if(uri.indexOf(e.target.name) === -1){
      const seperator =  "&"+e.target.name+"=";
      window.location.assign(uri + seperator + e.target.value)
       }
      else{
         window.location.assign(uri.slice(0, pos+7) + e.target.value+'%2C'+ uri.slice(pos+7))  
      }   
  }
  
  render() {
    return (   
    <div>       <br/><br/>
         
        <div className='row'>
          <div className=''>
            {this.state.branddata.map(product =>  <div key={product.name}>
              <small>
              <ul>
            <li style={{listStyleType:'none'}}>

  <input type='checkbox' onChange={this.change} checked={this.state.brands.includes(product.name) ? true : false }  name='brands' value={product.name}/>
   <a href={`/product/${product.name}?search=standing fan&brand=${product.name}`}> {product.name}
</a> </li>
              </ul>
              </small>
            </div>)}
            <hr></hr>
            {this.state.colourdata.map(product =>  <div key={product.colour}>
              <small> <ul>
            <li style={{listStyleType:'none'}}> 
            <input type='checkbox' onChange={this.change} checked={this.state.colour.includes(product.colour) ? true : false }  name='colour' value={product.colour}/>
            <a href={`/product/${product.colour}?search=standing fan&brand=${product.colour}`}> {product.colour}
         </a> 
            </li>
              </ul></small>
            </div>)}
            <hr></hr>
            {this.state.sizedata.map(product =>  <div key={product.size}>
              <small> <ul>
            <li style={{listStyleType:'none'}}> 
            <input type='checkbox' onChange={this.change} checked={this.state.mysize.includes(product.size) ? true : false }  name='mysize' value={product.size}/>
            <a href={`/product/${product.size}?search=standing fan&brand=${product.size}`}> {product.size}
         </a> 
            </li>
              </ul></small>
            </div>)}
          </div>
        </div> 
        
      </div>
     );
  }
}
 
export default withRouter(SideNav);