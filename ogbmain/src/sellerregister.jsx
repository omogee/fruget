import React, { Component } from 'react';
import {states} from "./state";
import axios from "axios"
<<<<<<< HEAD
import { Link } from 'react-router-dom';
=======
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac

class SellerRegister extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            Message:"",
            displayMessage:"",
            displayColor:"",
            firstname:"",
            firstnameerr:"",
            lastname:"",
            lastnameerr:"",
            email:"",
            emailerr:"",
            contact:"",
<<<<<<< HEAD
            contactTwo:"",
=======
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
            contacterr:"",
            gender:"male",
            gendererr:"",
            password:"",
<<<<<<< HEAD
            passwordType:"password",
            passwordClass:"fa-eye-slash",
            passworderr:"",
            confirmpassword:"",
            confirmpasswordmatch:"",
            confirmpasswordType:"password",
            confirmpasswordClass:"fa-eye-slash",
=======
            passworderr:"",
            confirmpassword:"",
            confirmpasswordmatch:"",
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
            confirmpasswordmatchsign:"none",
            businessname:"",
            aboutbusiness:"",
            aboutbusinesserr:"",
            address:"",
            state:null,
            stateerr:"",
            lgaerr:"",
            lga:null,
            bustop:"",
            bustoperr:"",
<<<<<<< HEAD
            navigation:[],
            bvn:"",
            bvnerr:"",
            showbvn:false,
            displaybvn:"none",
            submitloading:false,
            file:false,
            sellerdisplay:"block",
            priviledge:"",
            imgdata:""

         }
    }
    componentDidMount=()=>{
     const priviledge =this.props.match.params.priviledge;
      if(priviledge === "user"){
        this.setState({sellerdisplay:"none"})
      }
      this.setState({priviledge})
    }
=======
            navigation:[]

         }
    }
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
    validate=()=>{
   let patternOne = /[A-Za-z]+/
   let patternTwo = /^[0-9]+$/
   let patterThree = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/
   let patternFour = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/
   let patternFive = /[A-Za-z0-9]+/
   let isValidFirstName = this.state.firstname.match(patternOne)
   let isValidLastName = this.state.lastname.match(patternOne)
   let isValidEmail= this.state.email.match(patternFour)
   let isValidPassword = this.state.password.match(patterThree)
   let isValidContact = this.state.contact.match(patternTwo)
   if(this.state.password !== this.state.confirmpassword){
    this.setState({passworderr:"password do not match, kindly confirm password again"})
    return false; 
   }
   if(!isValidFirstName){
     this.setState({firstnameerr:"please enter a valid name"})
     return(false)
   }
   if(!isValidLastName){
     this.setState({lastnameerr:"please enter a valid last name"})
     return false;
   }
   if(!isValidEmail){
     this.setState({emailerr:"enter the correct format for your email address"})
     return false;
   }
   if(!isValidPassword){
     this.setState({passworderr:"must contain letters and numbers and must exceed 8 characters"})
     return false;
   }
   if(!isValidContact){
    this.setState({contacterr:"enter a valid phone number"})
    return false;
   }
   if(this.state.state ==="" || this.state.state === null){
    this.setState({stateerr:"please choose a preffered state of sales"})
    return false;
   }
   if(this.state.lga === null || this.state.lga === ""){
     this.setState({lgaerr:"please choose a preffered lga of sales"})
     return false;
   }
<<<<<<< HEAD
   if(this.state.bvn.length < 11 && this.state.displaybvn === "block"){
    this.setState({bvnerr:"please enter 11 digit bvn or uncheck the use bvn method"})
    return false;
  }
=======
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
  return true;
    }
    change=(e)=>{
      this.setState({[e.target.name]:e.target.value}, ()=>{
        if(this.state.password !== this.state.confirmpassword){
            this.setState({confirmpasswordmatch:"", confirmpasswordmatchsign:"none"})
          }
          else{
              this.setState({confirmpasswordmatch:"Password Match", confirmpasswordmatchsign:"inline-block"})  
          }
      })
    }
<<<<<<< HEAD
    checkstate =()=>{
      this.setState({showbvn:!this.state.showbvn}, ()=>{
        if(this.state.showbvn){
          this.setState({displaybvn:"block"})
        }else{
          this.setState({displaybvn:"none"})
        }
      })
    }
=======
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
    confirmpasswordchange=(e)=>{
       this.setState({confirmpassword: e.target.value}, ()=>{
        if(this.state.confirmpassword === this.state.password){
            this.setState({confirmpasswordmatch:"Password Match", confirmpasswordmatchsign:"inline-block"})
          }
          else{
            this.setState({confirmpasswordmatch:"", confirmpasswordmatchsign:"none"})
          }
       })
    }
    submit=(e)=>{
      e.preventDefault();
<<<<<<< HEAD
      this.setState({submitloading:true})
=======
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
      if(!this.validate()){
        this.setState({Message:"Data is not valid",displayMessage:"block",displayColor:"pink"})
      }else{
          const navigation={
            appCodeName:navigator.appCodeName,
            appVersion:navigator.appVersion,
            userAgent:navigator.userAgent,
            navigator:navigator.platform,
            product:navigator.product,
            geolocation:navigator.geolocation      
          };
     const data ={
       navigation:navigation,
       firstname:this.state.firstname,
       lastname:this.state.lastname,
       email:this.state.email,
       businesscontact:this.state.contact,
       gender:this.state.gender,
       password:this.state.password,
     state:this.state.state,
     lga: this.state.lga,
    bustop: this.state.bustop,
  address:this.state.address,
  businessname:this.state.businessname,
aboutbusiness:this.state.aboutbusiness
      }
<<<<<<< HEAD
      
      const formdata = new FormData();
      formdata.append("files",this.state.file)
       formdata.append("navigation",JSON.stringify(navigation))
       formdata.append("firstname",this.state.firstname)
       formdata.append("lastname",this.state.lastname)
       formdata.append("email",this.state.email)
       formdata.append("address",this.state.address)
       formdata.append( "bustop", this.state.bustop)
       formdata.append("contact",this.state.contact)
       formdata.append("contactTwo",this.state.contactTwo )
       formdata.append("gender",this.state.gender)
       formdata.append("businessname",this.state.businessname)
       formdata.append("aboutbusiness",this.state.aboutbusiness)
       formdata.append("password",this.state.password)   
       formdata.append("state",this.state.state)  
       formdata.append("lga",this.state.lga)
       formdata.append("priviledge",this.state.priviledge)
       formdata.append("bvn",this.state.bvn)
    /*  axios.get(`https://ravesandboxapi.flutterwave.com/v2/kyc/bvn/${this.state.bvn}?seckey=FLWSECK-6430b23e6563fa9407ea6c13832b431d-X`)
      .then(res => console.log(res.data))
      .catch(err => console.log(err))
      
    */  
      axios.post("http://localhost:5000/customer/submit/register",formdata)
=======
      axios.post("http://fruget.herokuapp.com/customer/submit/sellerregister", {data:JSON.stringify(data)})
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
      .then(res => { 
        if(res.data.register){
          this.setState({Message:res.data.message,displayMessage:"block",
          displayColor:"lightgreen",firstname:"",lastname:"",email:"",
          password:"",confirmpassword:"",confirmpasswordmatchsign:"none",confirmpasswordmatch:"",contact:"",
<<<<<<< HEAD
        businessname:"",aboutbusiness:"",submitloading:false})
        }
        else{
          this.setState({Message:res.data,displayMessage:"block",displayColor:"pink",
          password:"",confirmpassword:"",confirmpasswordmatchsign:"none",confirmpasswordmatch:"",submitloading:false})
          console.log(res.data)
        }
      })
      .catch(err => console.log(err))   
   } 
  }
filechange=(e)=>{
  if(e.target.files.length > 0){
  if(e.target.files[0].type === "image/gif" || e.target.files[0].type === "image/png" || e.target.files[0].type === "image/jpeg"){
    this.setState({file:e.target.files[0]})
   }else{
    this.setState({displayMessage:"block",displayColor:"pink",Message:"This format is not accepted"})
  }  
  if(e.target.files[0]){
    var file = e.target.files[0]
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      this.setState({imgdata:reader.result})
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    }


  }
}else{
  this.setState({imgdata:null})
}
}
    render() { 
      if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        return ( 
            <div className="navbarcomponentlg">  
            <div className="contain  registerlg">
        <p className="mt-2">Create <span style={{color:"#004d99",fontWeight:"bold"}}>{this.state.priviledge}</span> Account</p>
        Click to select an Account Type<br/> 
     <div>
      <a href="/customer/seller/register" style={{color:`${this.state.priviledge==="seller" ? "#004d99": "black"}`}}><small style={{fontSize:`${this.state.priviledge==="seller" ? "20px": "15px"}`}}>seller</small> <span style={{display:`${this.state.priviledge === "seller" ?"inline":"none"}`}} className="fa fa-check"></span></a><br/>
      <a href="/customer/user/register" style={{color:`${this.state.priviledge==="user" ? "#004d99": "black"}`}}><small style={{fontSize:`${this.state.priviledge==="user" ? "20px": "15px"}`}}>user</small> <span style={{display:`${this.state.priviledge === "user" ?"inline-block":"none"}`}} className="fa fa-check"></span></a>
     </div>
      <div className="alert" style={{display:`${this.state.displayMessage}`, backgroundColor:`${this.state.displayColor}`}}>
        {this.state.Message} <span style={{float:"right"}}>{this.state.submitloading ?  <img style={{width:"60%"}} src={require(`./images/35.gif`)} /> : null}</span>
             </div>
              <form  onSubmit={this.submit} >
                <div className="row">
                <div className="col-sm-12 col-md-5">
                <div style={{padding:"10px"}}>
<img src={this.state.imgdata ? `${this.state.imgdata}` : require(`./images/maleprofile.png`)} className="img-thumbnail passport" style={{border:"2px solid lightgrey"}}  alt=""/>
                </div>  
                </div> 
                <div className="col-6">
                <div style={{padding:"10px"}}>
               <input type="file" name="file" onChange={this.filechange} className="form-control"/>
               <small style={{fontSize:"10px",fontStyle:"italic"}} className="text-danger">Images must be jpeg/png/gif</small>
               </div>  
                </div>
                <div className="col-sm-12 col-md-6"> 
                <div style={{padding:"10px"}}>
<input type="checkbox"  checked={this.state.showbvn} onChange={this.checkstate}/> Verify me using my BVN<br/>
<small className="text-muted" style={{fontSize:"10px"}}>Note: sellers verified using their bvn would be given a tag buyers can see and this would increase customer trust </small>
                </div>                   
                </div>
                <div className="col-sm-12 col-md-6"> 
                <div style={{padding:"10px"}} style={{display:`${this.state.displaybvn}`}}>
                  <label for="bvn" >BVN <span style={{color:"red",fontSize:"20px"}}>*</span></label>
<input type="text" id="bvn" name="bvn"  value={this.state.bvn} onChange={this.change} className="form-control" style={{width:"100%"}}/>
<small><small style={{color:"red"}}>{this.state.bvnerr}</small></small> 
                </div>                  
                </div>
=======
        businessname:"",aboutbusiness:""})
        }
        else{
          this.setState({Message:res.data,displayMessage:"block",displayColor:"pink"})
        }
      })
      .catch(err => console.log(err))   
   }
  }
    render() { 
        return ( 
            <div>
            <div className="container register">
              <p className="mt-2">Create <span style={{color:"#004d99",fontWeight:"bold",}}>Seller</span> Account</p>
              <div className="alert" style={{display:`${this.state.displayMessage}`, backgroundColor:`${this.state.displayColor}`}}>
             {this.state.Message}
             </div>
              <form  onSubmit={this.submit} >
                <div className="row">
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
                <div className="col-sm-12 col-md-6"> 
                <div style={{padding:"10px"}}>
                  <label for="fname" >First Name <span style={{color:"red",fontSize:"20px"}}>*</span></label>
<input type="text" id="fname" name="firstname" required  pattern="[A-Za-z]+" value={this.state.firstname} onChange={this.change} className="form-control " style={{width:"100%"}}/>
    <small><small style={{color:"red"}}>{this.state.firstnameerr}</small></small>
                </div>
<<<<<<< HEAD
                </div>
                <div className="col-sm-12 col-md-6"> 
=======
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
                <div style={{padding:"10px"}}>
                  <label for="lname" >Last Name <span style={{color:"red",fontSize:"20px"}}>*</span></label>
<input type="text" id="lname" name="lastname" required  pattern="[A-Za-z]+" value={this.state.lastname} onChange={this.change} className="form-control " style={{width:"100%"}}/>
<small><small style={{color:"red"}}>{this.state.lastnameerr}</small></small>
                </div>                   
                </div>
<<<<<<< HEAD
                <div className="col-sm-12 col-md-6">
                <div style={{padding:"10px"}}>
                  <label for="email" >Email <span style={{color:"red",fontSize:"20px"}}>*</span></label>
<input type="text" id="email" name="email" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" value={this.state.email} onChange={this.change} className="form-control " style={{width:"100%"}}/>
<small style={{fontSize:"10px"}} className="text-muted">Note : Emails would be verified before acceptance</small>
<small><small style={{color:"red"}}>{this.state.emailerr}</small></small>
                </div>
                </div>
                <div className="col-sm-12 col-md-6" style={{display:`${this.state.sellerdisplay}`}}> 
                <div style={{padding:"10px"}}>
                  <label for="bname" >Business Name <span style={{color:"red",fontSize:"20px"}}>*</span></label>
<input type="text" id="bname" name="businessname"  pattern="[A-Za-z0-9]+" value={this.state.businessname} onChange={this.change} className="form-control " style={{width:"100%"}}/>
                </div>
                </div>
                <div className="col-sm-12 col-md-6" style={{display:`${this.state.sellerdisplay}`}}> 
                <div style={{padding:"10px"}}>
        <label for="aboutbiz" >About {this.state.businessname.length > 0 ? this.state.businessname : "your business"} <span style={{color:"red",fontSize:"20px"}}>*</span></label>
<input type="text" id="aboutbiz" name="aboutbusiness"    value={this.state.aboutbusiness} onChange={this.change} className="form-control " style={{width:"100%"}}/>
=======

                <div className="col-sm-12 col-md-6"> 
                <div style={{padding:"10px"}}>
                  <label for="bname" >Business Name <span style={{color:"red",fontSize:"20px"}}>*</span></label>
<input type="text" id="bname" name="businessname" required  pattern="[A-Za-z0-9]+" value={this.state.businessname} onChange={this.change} className="form-control " style={{width:"100%"}}/>
                </div>
                <div style={{padding:"10px"}}>
        <label for="aboutbiz" >About {this.state.businessname.length > 0 ? this.state.businessname : "your business"} <span style={{color:"red",fontSize:"20px"}}>*</span></label>
<input type="text" id="aboutbiz" name="aboutbusiness" required  pattern="[A-Za-z]+" value={this.state.aboutbusiness} onChange={this.change} className="form-control " style={{width:"100%"}}/>
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
<small><small style={{color:"red"}}>{this.state.aboutbusinesserr}</small></small>
                </div>                   
                </div>

<<<<<<< HEAD
                <div className="col-sm-12 col-md-6">
                <div style={{padding:"10px"}}>
                  <label for="contact">{this.state.priviledge==="seller"?"Business ":""} Phone number <span style={{color:"red",fontSize:"20px"}}>*</span></label>
<input type="text" id="contact" name="contact" required pattern="[0-9]{11}" value={this.state.contact} onChange={this.change} className="form-control " style={{width:"100%"}}/>
<small><small style={{color:"red"}}>{this.state.contacterr}</small></small>
                </div> 
                </div>
                <div className="col-sm-12 col-md-6" style={{display:`${this.state.sellerdisplay}`}}>
                <div style={{padding:"10px"}} >
                  <label for="contactTwo">Business Phone number 2 </label>
<input type="text" id="contactTwo" name="contactTwo" pattern="[0-9]{11}" value={this.state.contactTwo} onChange={this.change} className="form-control " style={{width:"100%"}}/>
<small><small style={{color:"red"}}>{this.state.contacterr}</small></small>
                </div> 
                </div>
               
                
=======

                <div className="col-sm-12 col-md-6">
                <div style={{padding:"10px"}}>
                  <label for="contact">Business Phone number <span style={{color:"red",fontSize:"20px"}}>*</span></label>
<input type="text" id="contact" name="contact" required pattern="[0-9]+" value={this.state.contact} onChange={this.change} className="form-control " style={{width:"100%"}}/>
<small><small style={{color:"red"}}>{this.state.contacterr}</small></small>
                </div> 
                <div style={{padding:"10px"}}>
                  <label for="email" >Email <span style={{color:"red",fontSize:"20px"}}>*</span></label>
<input type="text" id="email" name="email" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" value={this.state.email} onChange={this.change} className="form-control " style={{width:"100%"}}/>
<small style={{fontSize:"10px"}} className="text-muted">Note : Emails would be verified before acceptance</small>
<small><small style={{color:"red"}}>{this.state.emailerr}</small></small>
                </div>
                </div>
               
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
                <div className="col-sm-12 col-md-6">
                  <div style={{padding:"10px"}}>
                 <label for="gender">Gender <span style={{color:"red",fontSize:"20px"}}>*</span></label>
                 <select name="gender" className="form-control" id="gender" onChange={this.change} value={this.state.gender} required>
                 <option value="male">male</option>
                 <option value="female">female</option>
                 </select>
                    </div>
<<<<<<< HEAD
                  </div>              
                  <div className="col-sm-12 col-md-6"> 
                  <div style={{padding:"10px"}}>
               <label for="address">Address <span style={{color:"red",fontSize:"20px"}}>*</span></label>
<textarea name="address" id="address" required cols="60" className="form-control" value={this.state.address} onChange={this.change} rows="3" placeholder="Enter your Address"></textarea>
                    </div>
                    </div>
                    <div className="col-sm-12 col-md-6"> 
=======

                <div style={{padding:"10px"}}>
               <label for="address">Address <span style={{color:"red",fontSize:"20px"}}>*</span></label>
<textarea name="address" id="address" required cols="60" className="form-control" value={this.state.address} onChange={this.change} rows="3" placeholder="Enter your Address"></textarea>
                    </div>
                  </div>              
                  <div className="col-sm-12 col-md-6">
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
                    <div style={{padding:"10px"}}>
                 <label for="state">Select State of Residence <span style={{color:"red",fontSize:"20px"}}>*</span></label>
                <select name="state" required className="form-control" id="state" onChange={this.change} value={this.state.state}>
                  <option value="">Select state of business</option>  
                 {states.map(state =>                 
                  <option value={`${state.state.name}`}>{state.state.name}</option>
                  )}
                </select>
                    </div>                                   
                    </div>
                    <div className="col-sm-12 col-md-6">
                    <div style={{padding:"10px"}}>
                 <label for="lga">Select lga of business <span style={{color:"red",fontSize:"20px"}}>*</span></label>
                 <select name="lga" required className="form-control" id="lga" value={this.state.lga} onChange={this.change}>
                   <option value="">Select lga of business</option>
                 {states.map(state =>  
                 state.state.name === this.state.state ? 
                 state.state.locals.map(mainstate =>
                 <option value={`${mainstate.name}`}>{mainstate.name}</option>
                  )              
                  : null                                
                  )}
                 </select>
                    </div>                                   
                    </div>
<<<<<<< HEAD

                    <div className="col-sm-12 col-md-6" style={{display:`${this.state.sellerdisplay}`}}>
                    <div style={{padding:"10px"}}>
                 <label for="bustop">Popular bustop <span style={{color:"red",fontSize:"20px"}}>*</span></label>
                 <input name="bustop"  className="form-control" id="bustop" value={this.state.bustop} onChange={this.change}  />
=======
                    <div className="col-sm-12 col-md-6">
                    <div style={{padding:"10px"}}>
                 <label for="bustop">Popular bustop <span style={{color:"red",fontSize:"20px"}}>*</span></label>
                 <input name="bustop" required className="form-control" id="bustop" value={this.state.bustop} onChange={this.change}  />
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
                 <small className="text-muted">input a popular bustop closest to your store e.g oyingbo, balogun, douglas etc</small>
                    <small className="text-danger">{this.state.bustoperr}</small>
                    </div>                                   
                    </div>
                <div className="col-sm-12 col-md-6">
                <div style={{padding:"10px"}}>
             <label htmlFor="password">Password <span style={{color:"red",fontSize:"20px"}}>*</span></label>
             <div className="input-group">     
<<<<<<< HEAD
            <input type={`${this.state.passwordType}`} className="form-control" required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" onChange={this.change} value={this.state.password} title="<b>Must contain text and numbers</b>" name="password" id="password" style={{padding:"5px",borderRight:"none"}}/>
            <div class="input-group-append" style={{border:"1px solid lightgrey",borderTopRightRadius:"5px",borderBottomRightRadius:"5px",borderLeft:"0px"}} className="text-primary">
                      <span style={{padding:"10px 10px 0px 10px",fontSize:"16px"}} onClick={()=>this.state.passwordType === "password" ? this.setState({passwordType:"text",passwordClass:"fa-eye"}) : this.setState({passwordClass:"fa-eye-slash",passwordType:"password"})} className={`fa ${this.state.passwordClass} `}></span>
                  </div>
=======
            <input type="password" className="form-control" required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" onChange={this.change} value={this.state.password} title="<b>Must contain text and numbers</b>" name="password" id="password" style={{padding:"5px",borderRight:"none"}}/>
            <div className="input-group-btn">
              <button className="btn btn-link" className="eye" onclick='changepassType()'  style={{border:"1px solid lightgrey"}}>Hide</button>
            </div>
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
             </div>
             <small><small style={{color:"red"}}>{this.state.passworderr}</small></small>
             </div>
             </div>
             <div className="col-sm-12 col-md-6">
                <div style={{padding:"10px"}}>
             <label htmlFor="confirmpassword">confirm Password <span style={{color:"red",fontSize:"20px"}}>*</span></label>
             <div className="input-group">     
<<<<<<< HEAD
            <input type={`${this.state.confirmpasswordType}`} className="form-control" required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" onChange={this.confirmpasswordchange} value={this.state.confirmpassword} title="<b>Must contain text and numbers</b>" name="confirmpassword" id="confirmpassword" style={{padding:"5px",borderRight:"none"}}/>
            <div class="input-group-append" style={{border:"1px solid lightgrey",borderTopRightRadius:"5px",borderBottomRightRadius:"5px",borderLeft:"0px"}} className="text-primary">
                      <span style={{padding:"10px 10px 0px 10px",fontSize:"16px"}} onClick={()=>this.state.confirmpasswordType === "password" ? this.setState({confirmpasswordType:"text",confirmpasswordClass:"fa-eye"}) : this.setState({confirmpasswordClass:"fa-eye-slash",confirmpasswordType:"password"})} className={`fa ${this.state.confirmpasswordClass} `}></span>
                  </div>
=======
            <input type="password" className="form-control" required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" onChange={this.confirmpasswordchange} value={this.state.confirmpassword} title="<b>Must contain text and numbers</b>" name="confirmpassword" id="confirmpassword" style={{padding:"5px",borderRight:"none"}}/>
            <div className="input-group-btn">
              <button className="btn btn-link" className="eye" onclick='changepassType()'  style={{border:"1px solid lightgrey"}}>Hide</button>
            </div>
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
             </div>
   <small style={{color:"green"}}>{this.state.confirmpasswordmatch} <span style={{color:"green", display:`${this.state.confirmpasswordmatchsign}`}} className="fa fa-check"></span></small>
             </div>
             </div>                     
             <div className="col-12">
             <br/>
        <input type="checkbox" checked/> <small>I would love to recieve updates via {this.state.email}</small> <br/><br/>
<<<<<<< HEAD
<button type="submit" className="" style={{marginBottom:"30px",width: "100%",backgroundColor:"#004d99",borderRadius: "5px",padding: "7px",color:"white"}}><span className="fa fa-sign-in" style={{float:"left",fontSize:"25px"}}></span><span style={{fontWeight:"bolder",color:"white"}}>REGISTER</span>
<span style={{float:"right"}}>{this.state.submitloading ?  <img style={{width:"60%"}} src={require(`./images/35.gif`)} /> : null}</span></button><br/>
=======
<button type="submit" className="" style={{marginBottom:"30px",width: "100%",backgroundColor:"#004d99",borderRadius: "5px",padding: "7px",color:"white"}}><span className="fa fa-sign-in" style={{float:"left",fontSize:"25px"}}></span><span style={{fontWeight:"bolder",color:"white"}}>REGISTER</span></button><br/>
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
             </div>
              </div>
              </form> 
            </div>
<<<<<<< HEAD
       </div> 
         );
                 }else{
                  return ( 
                    <div>  
                    <div className="container register">
                <p className="mt-2">Create <span style={{color:"#004d99",fontWeight:"bold"}}>{this.state.priviledge}</span> Account</p>
                Click to select an Account Type<br/> 
             <div>
              <a href="/customer/seller/register" style={{color:`${this.state.priviledge==="seller" ? "#004d99": "black"}`}}><small style={{fontSize:`${this.state.priviledge==="seller" ? "20px": "15px"}`}}>seller</small> <span style={{display:`${this.state.priviledge === "seller" ?"inline":"none"}`}} className="fa fa-check"></span></a><br/>
              <a href="/customer/user/register" style={{color:`${this.state.priviledge==="user" ? "#004d99": "black"}`}}><small style={{fontSize:`${this.state.priviledge==="user" ? "20px": "15px"}`}}>user</small> <span style={{display:`${this.state.priviledge === "user" ?"inline-block":"none"}`}} className="fa fa-check"></span></a>
             </div>
              <div className="alert" style={{display:`${this.state.displayMessage}`, backgroundColor:`${this.state.displayColor}`}}>
                {this.state.Message} <span style={{float:"right"}}>{this.state.submitloading ?  <img style={{width:"60%"}} src={require(`./images/35.gif`)} /> : null}</span>
                     </div>
                      <form  onSubmit={this.submit} >
                        <div className="row">
                        <div className="col-sm-12 col-md-5">
                        <div style={{padding:"10px"}}>
        <img src={this.state.imgdata ? `${this.state.imgdata}` : require(`./images/maleprofile.png`)} className="img-thumbnail passport" style={{border:"2px solid lightgrey"}}  alt=""/>
                        </div>  
                        </div> 
                        <div className="col-6">
                        <div style={{padding:"10px"}}>
                       <input type="file" name="file" onChange={this.filechange} className="form-control"/>
                       <small style={{fontSize:"10px",fontStyle:"italic"}} className="text-danger">Images must be jpeg/png/gif</small>
                       </div>  
                        </div>
                        <div className="col-sm-12 col-md-6"> 
                        <div style={{padding:"10px"}}>
        <input type="checkbox"  checked={this.state.showbvn} onChange={this.checkstate}/> Verify me using my BVN<br/>
        <small className="text-muted" style={{fontSize:"10px"}}>Note: sellers verified using their bvn would be given a tag buyers can see and this would increase customer trust </small>
                        </div>                   
                        </div>
                        <div className="col-sm-12 col-md-6"> 
                        <div style={{padding:"10px"}} style={{display:`${this.state.displaybvn}`}}>
                          <label for="bvn" >BVN <span style={{color:"red",fontSize:"20px"}}>*</span></label>
        <input type="text" id="bvn" name="bvn"  value={this.state.bvn} onChange={this.change} className="form-control" style={{width:"100%"}}/>
        <small><small style={{color:"red"}}>{this.state.bvnerr}</small></small> 
                        </div>                  
                        </div>
                        <div className="col-sm-12 col-md-6"> 
                        <div style={{padding:"10px"}}>
                          <label for="fname" >First Name <span style={{color:"red",fontSize:"20px"}}>*</span></label>
        <input type="text" id="fname" name="firstname" required  pattern="[A-Za-z]+" value={this.state.firstname} onChange={this.change} className="form-control " style={{width:"100%"}}/>
            <small><small style={{color:"red"}}>{this.state.firstnameerr}</small></small>
                        </div>
                        </div>
                        <div className="col-sm-12 col-md-6"> 
                        <div style={{padding:"10px"}}>
                          <label for="lname" >Last Name <span style={{color:"red",fontSize:"20px"}}>*</span></label>
        <input type="text" id="lname" name="lastname" required  pattern="[A-Za-z]+" value={this.state.lastname} onChange={this.change} className="form-control " style={{width:"100%"}}/>
        <small><small style={{color:"red"}}>{this.state.lastnameerr}</small></small>
                        </div>                   
                        </div>
                        <div className="col-sm-12 col-md-6">
                        <div style={{padding:"10px"}}>
                          <label for="email" >Email <span style={{color:"red",fontSize:"20px"}}>*</span></label>
        <input type="text" id="email" name="email" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" value={this.state.email} onChange={this.change} className="form-control " style={{width:"100%"}}/>
        <small style={{fontSize:"10px"}} className="text-muted">Note : Emails would be verified before acceptance</small>
        <small><small style={{color:"red"}}>{this.state.emailerr}</small></small>
                        </div>
                        </div>
                        <div className="col-sm-12 col-md-6" style={{display:`${this.state.sellerdisplay}`}}> 
                        <div style={{padding:"10px"}}>
                          <label for="bname" >Business Name <span style={{color:"red",fontSize:"20px"}}>*</span></label>
        <input type="text" id="bname" name="businessname"  pattern="[A-Za-z0-9]+" value={this.state.businessname} onChange={this.change} className="form-control " style={{width:"100%"}}/>
                        </div>
                        </div>
                        <div className="col-sm-12 col-md-6" style={{display:`${this.state.sellerdisplay}`}}> 
                        <div style={{padding:"10px"}}>
                <label for="aboutbiz" >About {this.state.businessname.length > 0 ? this.state.businessname : "your business"} <span style={{color:"red",fontSize:"20px"}}>*</span></label>
        <input type="text" id="aboutbiz" name="aboutbusiness"    value={this.state.aboutbusiness} onChange={this.change} className="form-control " style={{width:"100%"}}/>
        <small><small style={{color:"red"}}>{this.state.aboutbusinesserr}</small></small>
                        </div>                   
                        </div>
        
                        <div className="col-sm-12 col-md-6">
                        <div style={{padding:"10px"}}>
                          <label for="contact">{this.state.priviledge==="seller"?"Business ":""} Phone number <span style={{color:"red",fontSize:"20px"}}>*</span></label>
        <input type="text" id="contact" name="contact" required pattern="[0-9]{11}" value={this.state.contact} onChange={this.change} className="form-control " style={{width:"100%"}}/>
        <small><small style={{color:"red"}}>{this.state.contacterr}</small></small>
                        </div> 
                        </div>
                        <div className="col-sm-12 col-md-6" style={{display:`${this.state.sellerdisplay}`}}>
                        <div style={{padding:"10px"}} >
                          <label for="contactTwo">Business Phone number 2 </label>
        <input type="text" id="contactTwo" name="contactTwo" pattern="[0-9]{11}" value={this.state.contactTwo} onChange={this.change} className="form-control " style={{width:"100%"}}/>
        <small><small style={{color:"red"}}>{this.state.contacterr}</small></small>
                        </div> 
                        </div>
                       
                        
                        <div className="col-sm-12 col-md-6">
                          <div style={{padding:"10px"}}>
                         <label for="gender">Gender <span style={{color:"red",fontSize:"20px"}}>*</span></label>
                         <select name="gender" className="form-control" id="gender" onChange={this.change} value={this.state.gender} required>
                         <option value="male">male</option>
                         <option value="female">female</option>
                         </select>
                            </div>
                          </div>              
                          <div className="col-sm-12 col-md-6"> 
                          <div style={{padding:"10px"}}>
                       <label for="address">Address <span style={{color:"red",fontSize:"20px"}}>*</span></label>
        <textarea name="address" id="address" required cols="60" className="form-control" value={this.state.address} onChange={this.change} rows="3" placeholder="Enter your Address"></textarea>
                            </div>
                            </div>
                            <div className="col-sm-12 col-md-6"> 
                            <div style={{padding:"10px"}}>
                         <label for="state">Select State of Residence <span style={{color:"red",fontSize:"20px"}}>*</span></label>
                        <select name="state" required className="form-control" id="state" onChange={this.change} value={this.state.state}>
                          <option value="">Select state of business</option>  
                         {states.map(state =>                 
                          <option value={`${state.state.name}`}>{state.state.name}</option>
                          )}
                        </select>
                            </div>                                   
                            </div>
                            <div className="col-sm-12 col-md-6">
                            <div style={{padding:"10px"}}>
                         <label for="lga">Select lga of business <span style={{color:"red",fontSize:"20px"}}>*</span></label>
                         <select name="lga" required className="form-control" id="lga" value={this.state.lga} onChange={this.change}>
                           <option value="">Select lga of business</option>
                         {states.map(state =>  
                         state.state.name === this.state.state ? 
                         state.state.locals.map(mainstate =>
                         <option value={`${mainstate.name}`}>{mainstate.name}</option>
                          )              
                          : null                                
                          )}
                         </select>
                            </div>                                   
                            </div>
        
                            <div className="col-sm-12 col-md-6" style={{display:`${this.state.sellerdisplay}`}}>
                            <div style={{padding:"10px"}}>
                         <label for="bustop">Popular bustop <span style={{color:"red",fontSize:"20px"}}>*</span></label>
                         <input name="bustop"  className="form-control" id="bustop" value={this.state.bustop} onChange={this.change}  />
                         <small className="text-muted">input a popular bustop closest to your store e.g oyingbo, balogun, douglas etc</small>
                            <small className="text-danger">{this.state.bustoperr}</small>
                            </div>                                   
                            </div>
                        <div className="col-sm-12 col-md-6">
                        <div style={{padding:"10px"}}>
                     <label htmlFor="password">Password <span style={{color:"red",fontSize:"20px"}}>*</span></label>
                     <div className="input-group">     
                    <input type={`${this.state.passwordType}`} className="form-control" required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" onChange={this.change} value={this.state.password} title="<b>Must contain text and numbers</b>" name="password" id="password" style={{padding:"5px",borderRight:"none"}}/>
                    <div class="input-group-append" style={{border:"1px solid lightgrey",borderTopRightRadius:"5px",borderBottomRightRadius:"5px",borderLeft:"0px"}} className="text-primary">
                              <span style={{padding:"10px 10px 0px 10px",fontSize:"16px"}} onClick={()=>this.state.passwordType === "password" ? this.setState({passwordType:"text",passwordClass:"fa-eye"}) : this.setState({passwordClass:"fa-eye-slash",passwordType:"password"})} className={`fa ${this.state.passwordClass} `}></span>
                          </div>
                     </div>
                     <small><small style={{color:"red"}}>{this.state.passworderr}</small></small>
                     </div>
                     </div>
                     <div className="col-sm-12 col-md-6">
                        <div style={{padding:"10px"}}>
                     <label htmlFor="confirmpassword">confirm Password <span style={{color:"red",fontSize:"20px"}}>*</span></label>
                     <div className="input-group">     
                    <input type={`${this.state.confirmpasswordType}`} className="form-control" required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" onChange={this.confirmpasswordchange} value={this.state.confirmpassword} title="<b>Must contain text and numbers</b>" name="confirmpassword" id="confirmpassword" style={{padding:"5px",borderRight:"none"}}/>
                    <div class="input-group-append" style={{border:"1px solid lightgrey",borderTopRightRadius:"5px",borderBottomRightRadius:"5px",borderLeft:"0px"}} className="text-primary">
                              <span style={{padding:"10px 10px 0px 10px",fontSize:"16px"}} onClick={()=>this.state.confirmpasswordType === "password" ? this.setState({confirmpasswordType:"text",confirmpasswordClass:"fa-eye"}) : this.setState({confirmpasswordClass:"fa-eye-slash",confirmpasswordType:"password"})} className={`fa ${this.state.confirmpasswordClass} `}></span>
                          </div>
                     </div>
           <small style={{color:"green"}}>{this.state.confirmpasswordmatch} <span style={{color:"green", display:`${this.state.confirmpasswordmatchsign}`}} className="fa fa-check"></span></small>
                     </div>
                     </div>                     
                     <div className="col-12">
                     <br/>
                <input type="checkbox" checked/> <small>I would love to recieve updates via {this.state.email}</small> <br/><br/>
        <button type="submit" className="" style={{marginBottom:"30px",width: "100%",backgroundColor:"#004d99",borderRadius: "5px",padding: "7px",color:"white"}}><span className="fa fa-sign-in" style={{float:"left",fontSize:"25px"}}></span><span style={{fontWeight:"bolder",color:"white"}}>REGISTER</span>
        <span style={{float:"right"}}>{this.state.submitloading ?  <img style={{width:"60%"}} src={require(`./images/35.gif`)} /> : null}</span></button><br/>
                     </div>
                      </div>
                      </form> 
                    </div>
               </div> 
                 );
                 }
=======
       </div>
         );
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
    }
}
 
export default SellerRegister;