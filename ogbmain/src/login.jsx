import React, { Component } from 'react';
import {Redirect} from "react-router-dom"
<<<<<<< HEAD
import { instanceOf } from 'prop-types';
import {connect} from "react-redux"
=======
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
import axios from "axios"
 import { withCookies} from "react-cookie"
 import {unsetredirect,unshowcolormodal,showcolormodal,unloading} from "./store"
// import Cookies from 'universal-cookie';
import Cookies from "js-cookie"

class Login extends Component {
 //   static propTypes = {
   //     cookies: instanceOf(Cookies).isRequired
    //  };

    constructor(props) {
//      const { cookies } = props;

        super(props);
        this.state = { 
            email:"",
            password:"",
            _csrf:"",
            token:"",
            user:"",
            Message:"",
            displayMessage:"none",
<<<<<<< HEAD
            colorMessage:"",
            passwordType:"password",
            passwordClass:"fa-eye-slash"
         }
    }
    componentDidMount= ()=>{
      this.props.unsetredirect()
   //   Cookies.remove("token",{path:"/"})
    //  Cookies.remove("cm_pp",{path:"/"})
    //  Cookies.remove("ado_f",{path:"/"})
     
    }
    componentDidUpdate=()=>{
      this.props.unloading()
=======
            colorMessage:""
         }
    }
    componentDidMount= ()=>{
        axios.get("http://fruget.herokuapp.com/customer/csrftoken")
        .then(res => this.setState({_csrf: res.data}))
        .catch(err => console.log(err))
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
    }
    change =(e)=>{
     this.setState({[e.target.name]:e.target.value})
    }

   

    submit = async (e)=>{
        e.preventDefault();
  //      const { cookies } = this.props;
        const navigation={
            appCodeName:navigator.appCodeName,
            appVersion:navigator.appVersion,
            userAgent:navigator.userAgent,
            navigator:navigator.platform,
            product:navigator.product,     
          };
        
console.log("submitting")
          let data ={
            email: this.state.email,
            password:this.state.password,
<<<<<<< HEAD
            _csrf: this.state._csrf,
            navigation:JSON.stringify(navigation)
        }
         data =JSON.stringify(data)
        axios.post("http://localhost:5000/customer/submit/login", {data},  {
            headers: {
              'Content-Type': 'application/json'
            },
       //      withCredentials: true 
             })
        .then( async res => this.setState({token:res.data.token, user:res.data.user,displayMessage:"block"},()=>{
            if(res.data.token){
                localStorage.clear();
       //         console.log(res.data[`userIexypoxy${res.data.messageId.charAt(0)+res.data.messageId.charAt(1)+res.data.messageId.charAt(2)}2gwy6g`])
   //  localStorage.setItem(`fruget152019081996b9gh2991hvhyb`, res.data[`userIexypoxy${res.data.messageId}2gwy6g`])
   console.log("m bc")
   //,{path:"/",maxAge: 60 * 60 * 60 * 1000}
  // Cookies.remove("token",{path:"/"})
  // Cookies.remove("cm_pp",{path:"/"})
  // Cookies.remove("ado_f",{path:"/"})
   localStorage.setItem("cm_pp", `${res.data.cm_p}`)
   localStorage.setItem("token", `${res.data.token}`)
   localStorage.setItem("ado_f", `${res.data.username}`)
   Cookies.set("token", `${res.data.token}`, { expires: 0.0255 })
   Cookies.set("cm_pp", `${res.data.cm_p}`, { expires: 0.0255 })
   Cookies.set("ado_f", `${res.data.username}`, { expires: 0.0255 })
   //   this.setState({Message:res.data.message,colorMessage:"lightgreen",email:"",password:""}, ()=>{
 // await this.props.showcolormodal()
 // this.setState({Message:"",colorMessage:"",email:"",password:""}, ()=>{
  //  const { from } = this.props.location.state;
    if(this.props.location.state && this.props.location.state.from){
     this.props.history.push(this.props.location.state.from)
    } else{
      alert("/")
     this.props.history.push("/")
    }
  // })
       //         })                 
            }else{
                this.setState({Message:res.data,colorMessage:"pink"})
=======
            _csrf: this.state._csrf
        }
        axios.post("http://fruget.herokuapp.com/customer/submit/login", {data:JSON.stringify(data)})
        .then(res => this.setState({token:res.data.token, user:res.data.user,displayMessage:"block"},()=>{
            if(res.data.token){
                localStorage.setItem("user", res.data)
                localStorage.setItem("id",res.data.userId)
                localStorage.setItem("token", res.data.token)
                this.setState({Message:res.data.message,colorMessage:"lightgreen",email:"",password:""}, ()=>{
                    setTimeout(()=>  this.props.history.push("/") ,5000)
                })
                      
            }else{
                this.setState({Message:res.data,colorMessage:"red"})
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
            }
        } ))
        .catch(err => console.log(err))
    }
    render() { 
<<<<<<< HEAD
      if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        return (         
            <div className="navbarcomponentlg" style={{backgroundColor:`${this.props.userdetails.background || "white"}`,color:`${this.props.userdetails.background === "black"? "white":"black"}`}}>
            <div className="contain">
                <div style={{display:"flex",flexWrap:"nowrap"}}>
                <div style={{width:"50%",padding:"2vw",borderRight:"1px solid rgba(242,242,242,0.7)"}}>
        <h5 style={{fontWeight:"bolder",color:"#004d99",textShadow: `0.5px 0.5px ${this.props.userdetails.background === "black"?"white":"grey"}`}}> Login</h5>
=======
        return ( 
            <div className="container">
                <div className="row">
                <div className="col-md-6 col-xs-12" style={{padding:"2vw",borderRight:"1px solid rgba(242,242,242,0.7)"}}>
        <h5 style={{fontWeight:"bolder",color:"#004d99", textShadow: "0.5px 0.5px #ff0000"}}> Login</h5>
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
    
        <div className="alert" style={{backgroundColor:`${this.state.colorMessage}`,display:`${this.state.displayMessage}`}}>
          {this.state.Message}
        </div>
       <form method="post" action="/customers/login" onSubmit={this.submit}>
       <label for="email">Email/User</label>
<input type="text" id="email"  name="email"  onChange={this.change} value={this.state.email} placeholder="" className="form-control" /><br/>

    <label for="password">Password</label><br/>
  
                 <div class="input-group mb-3">
                  <input type={this.state.passwordType} title="<b>Must contain text and numbers</b>" name="password" id="password" placeholder="" onChange={this.change} pattern="[a-zA-Z0-9/]+" value={this.state.password} style={{borderRight:"0px"}} className="form-control" ></input>
                <div class="input-group-append" style={{border:"1px solid lightgrey",borderTopRightRadius:"5px",borderBottomRightRadius:"5px",borderLeft:"0px"}} className="text-primary">
                      <span style={{padding:"10px 10px 0px 10px",fontSize:"16px"}} onClick={()=>this.state.passwordType === "password" ? this.setState({passwordType:"text",passwordClass:"fa-eye"}) : this.setState({passwordClass:"fa-eye-slash",passwordType:"password"})} className={`fa ${this.state.passwordClass} `}></span>
                  </div>
                 </div><br/>
<<<<<<< HEAD
     <small style={{fontWeight:"bolder"}}><input type="checkbox"/>  <span>  Remember  me</span></small> <small style={{float:"right",color:"#004d99"}}>Forgot your password</small>
<input type="text" name="_csrf"  value={this.state._csrf} />
    <br/><br/>
    <div style={{position:"absolute",bottom:"20%"}} className="loginbtn">
=======
     <small style={{fontWeight:"bolder",color:"black"}}><input type="checkbox"/>  <span>  Remember  me</span></small> <small style={{float:"right",color:"#004d99"}}>Forgot your password</small>
<input type="text" name="_csrf"  value={this.state._csrf} />
    <br/><br/>
    <div style={{minWidth: "100%"}}>
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
     <button type="submit" className="" style={{width: "100%",backgroundColor:"#004d99",borderRadius: "5px",padding: "7px",color:"white"}}><span className="fa fa-sign-in" style={{float:"left",fontSize:"25px"}}></span><span style={{fontWeight:"bolder",color:"white"}}>LOGIN</span></button><br/><br/>
 <button type="button" className="" style={{width: "100%",backgroundColor:"white",borderRadius: "5px",padding: "7px",boxShadow:"1px 1px 1px 1px lightgrey",color:"#004d99"}}><span className="fab fa-facebook" style={{float:"left",fontSize:"20px"}}></span>  <span style={{fontWeight:"bolder"}}>LOGIN WITH FACEBOOK</span></button>
          </div>
     </form>  
      </div>
      <div style={{padding:"2vw",width:"50%"}}>
<div style={{height:"15vw"}}>
<h3 style={{fontWeight: "bolder",color:"#004d99",textShadow: `0.5px 0.5px ${this.props.userdetails.background === "black"?"white":"grey"}`}}>Register An Account</h3><br/>
<p>
 Create an account with us in just few steps and gain access to numerous services and platform. You can register with either your email address or facebook account.
</p>
</div><br/><br/>
<<<<<<< HEAD
<div style={{position:"absolute",bottom:"20%"}} className="registerbtn">
<a href="/customer/seller/register" style={{width:"100%"}}><button type="button" style={{width: "100%",border:"1px solid grey",boxShadow:"1px 5px 5px 1px lightgrey",backgroundColor:"#white",borderRadius:"5px",padding: "7px",color:"#004d99"}}><span style={{fontWeight:"bolder"}}>CREATE AN EMAIL ACCOUNT</span></button></a><br/><br/>
=======
<a href="/customer/register"><button type="button" style={{width: "100%",border:"1px solid grey",boxShadow:"1px 5px 5px 1px lightgrey",backgroundColor:"#white",borderRadius:"5px",padding: "7px",color:"#004d99"}}><span style={{fontWeight:"bolder"}}>CREATE AN EMAIL ACCOUNT</span></button></a><br/><br/>
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
 <button type="button" style={{width: "100%",backgroundColor:"#004d99",border:"1px solid grey",borderRadius:"5px",padding: "7px",boxShadow:"1px 5px 5px 1px lightgrey",color:"white"}}><span className="fab fa-facebook-square" style={{float:"left",fontsSize:"25px"}}></span><span style={{fontWeight:"bolder",color:"white"}}>REGISTER WITH FACEBOOK</span></button>
</div>
</div>
                </div>
            </div>
            </div>
            
         );
    }else{
      return (         
        <div style={{backgroundColor:`${this.props.userdetails.background || "white"}`,color:`${this.props.userdetails.background === "black"? "white":"black"}`}}>
        <div className="container">
            <div className="row">
            <div className="col-md-6 col-xs-12" style={{padding:"2vw",borderRight:"1px solid rgba(242,242,242,0.7)"}}>
    <h5 style={{fontWeight:"bolder",color:"#004d99",textShadow: `0.5px 0.5px ${this.props.userdetails.background === "black"?"white":"grey"}`}}> Login</h5>

    <div className="alert" style={{backgroundColor:`${this.state.colorMessage}`,display:`${this.state.displayMessage}`}}>
      {this.state.Message}
    </div>
   <form method="post" action="/customers/login" onSubmit={this.submit}>
   <label for="email">Email/User</label>
<input type="text" id="email"  name="email"  onChange={this.change} value={this.state.email} placeholder="" className="form-control" /><br/>

<label for="password">Password</label><br/>

<div class="input-group mb-3">
                  <input type={this.state.passwordType} title="<b>Must contain text and numbers</b>" name="password" id="password" placeholder="" onChange={this.change} pattern="[a-zA-Z0-9/]+" value={this.state.password} style={{borderRight:"0px"}} className="form-control" ></input>
                <div class="input-group-append" style={{border:"1px solid lightgrey",borderTopRightRadius:"5px",borderBottomRightRadius:"5px",borderLeft:"0px"}} className="text-primary">
                      <span style={{padding:"10px 10px 0px 10px",fontSize:"16px"}} onClick={()=>this.state.passwordType === "password" ? this.setState({passwordType:"text",passwordClass:"fa-eye"}) : this.setState({passwordClass:"fa-eye-slash",passwordType:"password"})} className={`fa ${this.state.passwordClass} `}></span>
                  </div>
                 </div><br/>
 <small style={{fontWeight:"bolder"}}><input type="checkbox"/>  <span>  Remember  me</span></small> <small style={{float:"right",color:"#004d99"}}>Forgot your password</small>
<input type="text" name="_csrf"  value={this.state._csrf} />
<br/><br/>
<div style={{minWidth: "100%"}}>
 <button type="submit" className="" style={{width: "100%",backgroundColor:"#004d99",borderRadius: "5px",padding: "7px",color:"white"}}><span className="fa fa-sign-in" style={{float:"left",fontSize:"25px"}}></span><span style={{fontWeight:"bolder",color:"white"}}>LOGIN</span></button><br/><br/>
<button type="button" className="" style={{width: "100%",backgroundColor:"white",borderRadius: "5px",padding: "7px",boxShadow:"1px 1px 1px 1px lightgrey",color:"#004d99"}}><span className="fab fa-facebook" style={{float:"left",fontSize:"20px"}}></span>  <span style={{fontWeight:"bolder"}}>LOGIN WITH FACEBOOK</span></button>
      </div>
</form>  
  </div>
  <div className="d-none d-md-block col-md-6" style={{padding:"2vw"}}>
<div style={{height:"15vw"}}>
<h3 style={{fontWeight: "bolder",color:"#004d99",textShadow: `0.5px 0.5px ${this.props.userdetails.background === "black"?"white":"grey"}`}}>Register An Account</h3><br/>

<p>
Create an account with us in just few steps and gain access to numerous services and platform. You can register with either your email address or facebook account.
</p>
</div><br/><br/>
<a href="/customer/register"><button type="button" style={{width: "100%",border:"1px solid grey",boxShadow:"1px 5px 5px 1px lightgrey",backgroundColor:"#white",borderRadius:"5px",padding: "7px",color:"#004d99"}}><span style={{fontWeight:"bolder"}}>CREATE AN EMAIL ACCOUNT</span></button></a><br/><br/>
<button type="button" style={{width: "100%",backgroundColor:"#004d99",border:"1px solid grey",borderRadius:"5px",padding: "7px",boxShadow:"1px 5px 5px 1px lightgrey",color:"white"}}><span className="fab fa-facebook-square" style={{float:"left",fontsSize:"25px"}}></span><span style={{fontWeight:"bolder",color:"white"}}>REGISTER WITH FACEBOOK</span></button>
</div>
            </div>
        </div>
        </div>
        
     );
    }
  }
}
 
const mapStateToProps =(store)=>{
    return{           
       userdetails:store.userdetails
  }
}
  const mapDispatchToProps =(dispatch)=>{
   return{
    unshowcolormodal:()=>dispatch(unshowcolormodal()),
    showcolormodal:()=>dispatch(showcolormodal()),
   unloading:()=>dispatch(unloading()),
   unsetredirect:()=>dispatch(unsetredirect())
   }
  }
 
export default connect(mapStateToProps,mapDispatchToProps)(Login);