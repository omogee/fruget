import React, { Component } from 'react';
import axios from "axios"
import "./main.css"
class ConfirmEmail extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            confirmingmail:true,
            forbidden:"",
            email:"",
            confirmmessage:""
         }
    }
    componentWillMount=()=>{ 
      let confirmUseraccount = this.props.match.params.confirmUseraccount
      let getdetailsarray = this.props.match.params.getdetailsarray
      let  randalphaarray= this.props.match.params.randalphaarray;
      let randuser = this.props.match.params.randuser
      let run= parseInt(getdetailsarray.charAt(0)+getdetailsarray.charAt(1))
      let run2 = parseInt(getdetailsarray.split("mnv")[1]) + 1
      console.log(randalphaarray.slice(run,run+10))
    
      axios.get(`http://localhost:5000/customer/retrieve/user/email/${randuser.slice(run+1,run+run2)}`)
      .then(res =>{
        if(res.data.length === 0){
          console.log("its empty")
          this.setState({forbidden:"You are forbidden from this page"})
        }else{
          this.setState({email:res.data[0].email})
          console.log("hello")
          axios.get(`http://localhost:5000/customer/confirm/user/${this.state.email}/email/${randalphaarray.slice(run,run+10)}`)
          .then(res =>this.setState({confirmingmail:false,confirmmessage:res.data}) )
          .catch(err => console.log(err))   
        }      
      }
      
    )
      .catch(err => console.log(err))

    }
    componentDidMount =()=>{
  }
    render() { 
      console.log(this.state.confirmmessage, "message")
      if(this.state.forbidden.length > 0){
        return(
         <div>
             <div style={{width:"100%",height:`100%`,opacity:"0.7"}}>
            <center>
              <span style={{fontSize:"300px"}}  className="fa fa-ban text-danger"></span>
           <h1>{this.state.forbidden}</h1>
           <br/>
          <a href="">Kindly click this link to sign up </a> 
            </center>
            </div>
         </div>
        )
      }
        return ( 
            <div>
              <h1>Heoo</h1>
                {this.state.confirmingmail ?     
          <div style={{width:"100%",height:`100%`,opacity:"0.8"}}>
            <center>
            <img src={require(`./images/35.gif`)} className="gifclass"/>
            <h1>Kindly wait, Confirming {this.state.email || "email"} </h1>
            </center>
          </div>
        : 
        <div>
        <div style={{width:"100%",height:`100%`,opacity:"0.7"}}>
       <center>
         <span style={{fontSize:"300px"}}  className="fa fa-check-circle text-success"></span>
                <h1>{this.state.confirmmessage}</h1>
      <br/>
      <p>
        Dear Email user, Your email has been verified successfully <br/>
        Get ready to explore a world of trade with relative ease and as frugal as possible with consistency and monitored traders and buyers
      </p>
       </center>
       </div>
    </div>}
            </div>
         );
    }
}
 
export default ConfirmEmail;