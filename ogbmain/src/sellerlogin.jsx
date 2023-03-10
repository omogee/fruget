import React, { Component } from 'react';
import axios from "axios";
import {connect} from "redux"

class SellerLogin extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          email:"",
          password:"",
          token:"",
          user:"",
          Message:"",
          displayMessage:"none",
          colorMessage:""
       }
  }
  componentDidMount= ()=>{
  
  }
  change =(e)=>{
   this.setState({[e.target.name]:e.target.value})
   this.props.history.pushState("/seller/11222344")

  }
  submit =(e)=>{
      e.preventDefault();
      const data ={
          email: this.state.email,
          password:this.state.password
      }
      axios.post("http://localhost:5000/customer/submit/seller/login", {data:JSON.stringify(data)})
      .then(res => this.setState({token:res.data.token, user:res.data.user,displayMessage:"block"},()=>{
          if(res.data.message === "Login Successful"){
  localStorage.setItem("vdhgaujhahjjsbhsjjbxhsfgwwhsywh726781819bahuhvgaygavvxgvxvvcvgsvsvid",res.data.sellerid)
              this.setState({Message:res.data.message,colorMessage:"lightgreen",email:"",password:""}, ()=>{
        //          setTimeout(()=>  this.props.history.push("/") ,5000)
              })
                    
          }else{
              this.setState({Message:res.data,colorMessage:"red"})
          }
      } ))
      .catch(err => console.log(err))
  }
    render() { 
        return ( 
            <div className="container">
            <div className="row">
            <div className="col-md-6 col-xs-12" style={{padding:"2vw",borderRight:"1px solid rgba(242,242,242,0.7)"}}>
    <h5 style={{fontWeight:"bolder",color:"#004d99", textShadow: "0.5px 0.5px #ff0000"}}>Seller Login</h5>

    <div className="alert" style={{backgroundColor:`${this.state.colorMessage}`,display:`${this.state.displayMessage}`}}>
      {this.state.Message}
    </div>
   <form method="post" action="/customers/login" onSubmit={this.submit}>
   <label for="email">Email/Business Name</label>
<input type="text" id="email"  name="email"  onChange={this.change} value={this.state.email} placeholder="" className="form-control" /><br/>

<label for="password">Password</label><br/>
 <div className="input-group ">     
<input type="password" className="form-control" onChange={this.change} value={this.state.password} pattern="[a-zA-Z0-9/]+" title="<b>Must contain text and numbers</b>" name="password" id="password" placeholder="" style={{padding:"5px",borderRight:"none"}}/>
            <div className="input-group-btn">
              <button className="btn " className="eye" onclick='changepassType()'  style={{paddingRight: "3px",borderLeft:"0px",border:"1px solid lightgrey",backgroundColor:"white"}}><i className="fa fa-eye-slash fa-2x"></i></button>
            </div>
             </div><br/>
 <small style={{fontWeight:"bolder",color:"black"}}><input type="checkbox"/>  <span>  Remember  me</span></small> <small style={{float:"right",color:"#004d99"}}>Forgot your password</small>
<br/><br/>
<div style={{minWidth: "100%"}}>
 <button type="submit" className="" style={{width: "100%",backgroundColor:"#004d99",borderRadius: "5px",padding: "7px",color:"white"}}><span className="fa fa-sign-in" style={{float:"left",fontSize:"25px"}}></span><span style={{fontWeight:"bolder",color:"white"}}>LOGIN</span></button><br/><br/>
      </div>
</form>  
  </div>
  <div className="d-none d-md-block col-md-6" style={{padding:"2vw"}}>
<div style={{height:"15vw"}}>
<h3 style={{fontWeight: "bolder",color:"#004d99",textShadow: "0.5px 0.5px #ff0000"}}>Register A Seller Account</h3><br/>

<p>
Create a seller account with us in just few steps and gain access to numerous services including uploading your goods and monitoring customers orders through your profile. You can register with either your email address or get a verification tag using your BVN.
</p>
</div><br/><br/>
<a href="/customer/register"><button type="button" style={{width: "100%",border:"1px solid grey",boxShadow:"1px 5px 5px 1px lightgrey",backgroundColor:"#white",borderRadius:"5px",padding: "7px",color:"#004d99"}}><span style={{fontWeight:"bolder"}}>CREATE AN EMAIL ACCOUNT</span></button></a><br/><br/>
<button type="button" style={{width: "100%",backgroundColor:"#004d99",border:"1px solid grey",borderRadius:"5px",padding: "7px",boxShadow:"1px 5px 5px 1px lightgrey",color:"white"}}><span style={{fontWeight:"bolder",color:"white"}}>CREATE A BVN ACCOUNT</span></button>
</div>
            </div>
        </div>
         );
    }
}
 
export default SellerLogin;