import React, { Component } from 'react';
import {connect} from "react-redux"
import "./main.css"
import {setredirect,followservice,services,viewuserdetailsbyuserId,undisplaycategorymodal,unloading} from "./store"
import Cookies from "js-cookie"
import querystring from "query-string"
import {compose} from "redux"
import {withRouter,Link, Redirect} from 'react-router-dom'
import csc from "country-state-city"
import {getDistanceFromLatLonInKm} from "./mapdistance"
import {getData} from "country-list"

class Services extends Component {
    constructor(props) {
        super(props);
        this.state = {
            csc:[],
            location:"",
            suggestedlocations:[],
            displayLocation:"none",
            uselocation:"" ,
            displaylocationsdiv:"none",
            searchvalue:"",
            searchedservices:[],
            userlat:"",
            userlng:"",
            bounce:"",
            selectedcity:"",
            selectedcountry:""
          }
    }
    componentDidMount=()=>{
        const parsedQuery = querystring.parse(this.props.location.search);
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(position =>{
              this.setState({userlat:position.coords.latitude,userlng:position.coords.longitude})
            })
          }
if(parsedQuery.center || !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
       if(Cookies.get("lgx") && Cookies.get("ltf")){
           const data={
            lat:Cookies.get("ltf"),long:Cookies.get("lgx")
           }
        this.props.services(data)
       }     
        }     
this.setState({csc:csc.getAllCities()},()=>console.log(this.state.csc))
    }
    componentDidUpdate=(prevProps)=>{
  if(prevProps.service !== this.props.service){
      this.props.unloading()
  }
    }
    undisplaycategorymodal=()=>{
        let currentUrlParams = new URLSearchParams(window.location.search);
           this.props.undisplaycategorymodal()
                    currentUrlParams.delete("lat");
                    currentUrlParams.delete("long");
                    currentUrlParams.delete("center");
                   this.props.history.push(window.location.pathname+"?"+ currentUrlParams.toString())
       
    }
    addlocation=()=>{
        let currentUrlParams = new URLSearchParams(window.location.search);
        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        if(this.state.uselocation === "device location"){
            alert("its a phone")
            if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition(position =>{
                    currentUrlParams.set("lat", position.coords.latitude);
                    currentUrlParams.set("long", position.coords.longitude);
    
     window.location.assign("http://localhost:3000/fruget/services"+"?"+ currentUrlParams.toString());
                })
            }else{
                alert("sorry ! failed to enable device location")
            }
        }else if(this.state.uselocation === "registered location"){
            currentUrlParams.set("lat", "registered lat");
            currentUrlParams.set("long", "registered long");
     window.location.assign("http://localhost:3000/fruget/services"+"?"+ currentUrlParams.toString());
        }
        else if(this.state.uselocation === "enter location"){
            currentUrlParams.set("lat", "enter lat");
            currentUrlParams.set("long", "enter long");
     window.location.assign("http://localhost:3000/fruget/services"+"?"+ currentUrlParams.toString());
        }
    }else{
        if(this.state.uselocation === "device location"){
            if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition(position =>{
          //          currentUrlParams.set("lat", position.coords.latitude);
           //         currentUrlParams.set("long", position.coords.longitude); 
                      currentUrlParams.set("center", "true");                     
                      Cookies.set("ltf",position.coords.latitude, { expires: 0.055 })
                      Cookies.set("lgx",position.coords.longitude, { expires: 0.055 })
                this.props.history.push(window.location.pathname +"?"+ currentUrlParams.toString());
                })
            }else{
                alert("sorry ! failed to enable device location")
            }
        }else if(this.state.uselocation === "registered location"){     
            currentUrlParams.set("location", "registered");
              currentUrlParams.set("center", "true");
              if(!Cookies.get("token") || !this.props.userdetails.lat || !this.props.userdetails.lng){
                this.props.history.push(window.location.pathname+"?"+ currentUrlParams.toString());
                  this.props.setredirect()
              }else{
                  alert("registered lat and long")
                Cookies.set("ltf",this.props.userdetails.lat, { expires: 0.055 })
                Cookies.set("lgx",this.props.userdetails.lng, { expires: 0.055 })
               window.location.assign(window.location.pathname+"?"+ currentUrlParams.toString());
              }       
        }
        else if(this.state.uselocation === "enter location"){
            let location = this.state.selectedcity.split(",")[0] || this.state.selectedcity
            let currentlocation = this.state.csc.find(a => a.name === location)
            if (currentlocation !== undefined){
                Cookies.set("ltf",currentlocation.latitude, { expires: 0.055 })
                Cookies.set("lgx",currentlocation.longitude, { expires: 0.055 })
              currentUrlParams.set("center", "true");
           window.location.assign(window.location.pathname +"?"+ currentUrlParams.toString());
            }
        }
    }
    }
    addlocationOnSmalldevice=()=>{
        let currentUrlParams = new URLSearchParams(window.location.search);
        if(this.state.uselocation === "device location"){
            if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition(position =>{
                    currentUrlParams.set("lat", position.coords.latitude);
                    currentUrlParams.set("long", position.coords.longitude);
                    currentUrlParams.set("center", "true");
                    window.location.assign("http://localhost:3000/fruget/services"+"?"+ currentUrlParams.toString());
                })
            }else{
                alert("sorry ! failed to enable device location")
            }
        }else if(this.state.uselocation === "registered location"){
            currentUrlParams.set("lat", "registered lat");
            currentUrlParams.set("long", "registered long");
            currentUrlParams.set("center", "true");
            window.location.assign("http://localhost:3000/fruget/services"+"?"+ currentUrlParams.toString());
        }
        else if(this.state.uselocation === "enter location"){
            currentUrlParams.set("lat", "enter lat");
            currentUrlParams.set("long", "enter long");
            currentUrlParams.set("center", "true");
            window.location.assign("http://localhost:3000/fruget/services" +"?"+ currentUrlParams.toString());
        }
    }
    change=(e)=>{
        let newArray =[]
        this.setState({[e.target.name]:e.target.value},()=>{
            if(this.state.selectedcity.length === 0){
                this.setState({displaylocationsdiv:"none"})
            }
       
        let countries = getData() 
        let selected = countries.find(a => a.name === this.state.selectedcountry)
        console.log("selected",selected,this.state.selectedcountry)
   if(this.state.selectedcountry.length > 0 && this.state.selectedcity.length > 0){
        this.state.csc.map((c,i)=>{
if(c.countryCode === selected.code && c.name.toLowerCase().indexOf(this.state.selectedcity.toLowerCase()) > -1){
            newArray.push(c)
         }
        })
        if(newArray.length > 0){
            this.setState({suggestedlocations:newArray.slice(0,50),displaylocationsdiv:"block"})
            }else{
                this.setState({suggestedlocations:[],displaylocationsdiv:"none"})   
            }
   }
         })
    }
    changedisplayLocation=(e)=>{
        this.setState({uselocation:e.target.value})
    if(e.target.value === "enter location"){
        this.setState({displayLocation:"block"})
    }else{
        this.setState({displayLocation:"none"})
    }
    }
    selectlocation=(data)=>{
      this.setState({selectedcity:data})
    }
    searchchange=(e)=>{
        this.setState({searchvalue:e.target.value}, ()=>{
            let searchedservices =[]
           this.props.service.map(services =>{
           if(services.businessName.toLowerCase().indexOf(this.state.searchvalue.toLowerCase()) > -1){
                    searchedservices.push(services)
                }
                this.setState({searchedservices})  
           })
                     
        })
    }
    followservice =(e,data)=>{
        this.props.followservice(data.data)
        let element = e.currentTarget
        this.props.services()
        element.classList.add("animated") 
        element.classList.add("bounce")
        setTimeout(()=> returnClass(element), 2000);
        function returnClass(element){
            
         element.classList.remove("animated")
         element.classList.remove("bounce")
         
        }
        }
    render() {       
     //   console.log(getData())
    //  console.log("state searched services ", this.state.csc)
     if(this.props.redirect){
        return <Redirect to={{ pathname: '/customer/login',state: { from: this.props.location }}} />
    }
        const parsedQuery = querystring.parse(this.props.location.search);
        if(!Cookies.get("ltf") || !Cookies.get("lgx")){
            return (
                <div>
                <div style={{padding:"30px"}} className="d-none d-md-block">
                <span onClick={this.undisplaycategorymodal} style={{float:"right",fontSize:"15px",cursor:"pointer"}}>x</span>
             <center>
                <div>
             <input type="radio" name="location" value="enter location" checked={this.state.uselocation === "enter location" ? true : false} onChange={this.changedisplayLocation}/> Type in location <br/>
            </div>
            
            <div style={{display:`${this.state.displayLocation}`}}>
                <span style={{float:"left",padding:"10px",color:"grey"}} onClick={()=>this.setState({uselocation:"",displayLocation:"none"})} className="fa fa-arrow-left"></span>
            <select name="selectedcountry" onChange={this.change} className="form-control" value={this.state.selectedcountry}  >
   <option value="">Select Country</option>
    {getData().map(cat =>
            <option value={`${cat.name}`}>{cat.name}</option>
        )}
</select><br/>
            <p>Enter city and country code</p>
                <input type="text" name="selectedcity" value={this.state.selectedcity}  onChange={this.change} style={{marginBottom:"10px"}} placeholder="Enter City" className="form-control navsearch"/>
            <div style={{position:"relative",display:`${this.state.displaylocationsdiv}`}}>
              <div style={{position:"absolute",height:"200px",overflow:"auto",width:"100%",padding:"20px",top:"0px",backgroundColor:"white"}}>
                  {this.state.suggestedlocations.map((locations)=>
                 <small key={locations.name}>
                      <small onClick={()=>this.selectlocation(locations.name +","+ locations.stateCode)} style={{fontSize:"14px",cursor:"pointer"}}>
                        {locations.name +", "} <b>{locations.stateCode}</b>
                  </small><br/>
                 </small>
                    )}
              </div>
            </div>
            </div>
            <br/> <br/>
            <div>
                <input type="radio" name="location" value="device location" checked={this.state.uselocation === "device location" ? true : false} onChange={this.changedisplayLocation}/> Use my current device location <br/>
            </div>
             <br/> <br/>
            <div>
                <input type="radio" name="location" value="registered location" checked={this.state.uselocation === "registered location" ? true : false} onChange={this.changedisplayLocation}/> Use my registered location <br/>
                <small className="text-muted"><b>Note</b> must be a registered user</small>
            </div>
            <br/> <br/>
            <button className="btn-primary" onClick={this.addlocation}>Submit</button><br/>
            </center>
            </div>   


            <div style={{padding:"30px"}} className="d-block d-md-none">
                        <span onClick={this.undisplaycategorymodal} style={{float:"right",fontSize:"15px"}}>x</span>
             <center>
                <div>
             <input type="radio" name="location" value="enter location" onChange={this.changedisplayLocation}/> Type in location <br/>
            </div>
            
            <div style={{display:`${this.state.displayLocation}`}}>
            <small>Enter city and country code</small><br/>
                <input type="text" value={this.state.location}  onChange={this.change} style={{marginBottom:"10px"}} placeholder="City, Country Code" className="form-control"/>
            <div style={{position:"relative",display:`${this.state.displaylocationsdiv}`}}>
              <div style={{position:"absolute",height:"200px",overflow:"auto",width:"100%",padding:"20px",top:"0px",backgroundColor:"white"}}>
                  {this.state.suggestedlocations.map((locations)=>
                 <small key={locations.name}>
                      <small onClick={()=>this.selectlocation(locations.name +", "+locations.countryCode)} style={{fontSize:"14px",cursor:"pointer"}}>
                        {locations.name +", "} <b>{locations.countryCode}</b>
                  </small><br/>
                 </small>
                    )}
              </div>
            </div>
            </div>
            <br/> <br/>
            <div>
                <input type="radio" name="location" value="device location" onChange={this.changedisplayLocation}/> Use my current device location <br/>
            </div>
             <br/> <br/>
            <div>
                <input type="radio" name="location" value="registered location" onChange={this.changedisplayLocation}/> Use my registered location <br/>
                <small className="text-muted"><b>Note</b> must be a registered user</small>
            </div>
            <br/> <br/>
            <button className="btn-primary" onClick={this.addlocation}>Submit</button><br/>
            </center>
            </div>
            </div>
            )
        }else if( !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
            return (  
            <div className="container-fluid" style={{color:`${this.props.userdetails.background==="black"?"white":"black"}`,backgroundColor:`${this.props.userdetails.background === "black" ? "black":"white"}`}}>   
<div className="row" style={{backgroundColor:"white",position:"sticky",top:"0px",zIndex:"4"}}>
    <div className="col-12" >
        <p >Services <small>({this.state.searchvalue.length > 0 ? this.state.searchedservices.length : this.props.service.length} Found Near You)</small></p>
    </div>
    <div className="col-8 col-md-9">
        <input type="text" onChange={this.searchchange} value={this.state.searchvalue} style={{border:"none",borderBottom:"1px solid grey",borderRadius:"0px"}} placeholder='Search Services' className="form-control navsearch"/>
    </div> 
    <div className="col-2" style={{padding:"10px"}}>
        <button className="btn btn-warning" style={{color:"white"}}>
           <small> Submit</small>
        </button>
    </div> 
    <div className="col-1">
    <span onClick={this.undisplaycategorymodal} style={{float:"right",fontSize:"15px",padding:"10px"}} className="fa fa-times text-muted"></span>
    </div>
    </div>
 
    <div className="row" style={{padding:"10px"}}> 
       { this.state.searchvalue.length > 0 && this.state.searchedservices.length === 0 ?
      <div className="col-12">
           <p>No service Match</p>
      </div>
       : this.state.searchvalue.length > 0 && this.state.searchedservices.length > 0 ?
        this.state.searchedservices.map(services =>
            <div className="col-6" style={{padding:"10px"}}>
        <div key={services.store}  style={{marginBottom:"5px",backgroundColor:"white",boxShadow:"1px 2px 5px 2px lightgrey",borderRadius:"5px"}}>                  
                         <small className="ml-2" style={{color:"rgb(0, 119, 179)",textTransform:"capitalize",fontSize:"18px"}}>{services.store}</small>
                         <small className="ml-3" style={{fontsSize:"11px"}}>
                             <div className="outer">
                                 <div className="inner" style={{width:"20px"}}>
                                 </div>
                             </div>
                         </small><br/>
                         <small style={{cursor:"pointer",float:"right",fontSize:"12px",marginRight:"2px"}} ><b> {getDistanceFromLatLonInKm(Cookies.get("ltf"),Cookies.get("lgx"),parseFloat(services.storelat),parseFloat(services.storelong)).toFixed(2)} </b> KM</small>
                         <small className="ml-2" style={{color:"orange"}}> Service </small><small> : {services.aboutbusiness}</small><br/>
        <img src={services.profileImage ? `https://res.cloudinary.com/fruget-com/image/upload/profile/${services.profileImage}`: require(`./images/maleprofile.png`)} className="img-responsive"  style={{padding:"10px 0px",width:"100%",height:"300px"}}  alt=""/>
        <div style={{padding:"3px 10px"}}>
        <small style={{fontSize:"15px",color:"orange"}}><span className="fa fa-eye"></span> 0</small> <small style={{float:"right",fontSize:"15px",color:"orange"}}> 0 Followers</small> <br/>
        <small ><span className="fa fa-map-marker" style={{fontWeight:"bold",color:"orange"}}></span> {services.lga},{services.state}</small><br/>
        <small> <span className="fa fa-check-circle" style={{color:"orange"}}></span> Verified Transactions : 0</small> <br/>
        <small> <span style={{fontWeight:"bold",color:"orange"}} className="fa fa-envelope 2x"></span> @<span>{services.email}</span></small><br/>
        <small> <span style={{fontWeight:"bold",color:"orange"}} className="fab fa-twitter 2x mr-2"></span> <span>AdeIsCrown</span></small><br/>
        <small> <span className="fab fa-facebook-square 2x mr-2" style={{fontWeight:"bold",color:"orange"}}></span><span> Eze Ogbonnaya</span></small><br/>
        <small> <span className="fa fa-link mr-2" style={{fontWeight:"bold"}}></span><span ><a style={{color:"green"}} href={`/fruget/myproducts/${services.businessName}`}> {` http://fruget/myproducts/${services.businessName}`}</a></span> <span title="click to share link" className="fa fa-reply ml-2"></span></small><br/>
        <small style={{fontSize:"10px", color:"grey"}}><span className="fa fa-clock-o" style={{color:"orange"}}></span> {JSON.parse(services.dateOfReg)["date"]} AT <b>{JSON.parse(services.dateOfReg)["time"]}</b></small>
        <small style={{float:"right",fontSize:"12px"}}><small style={{color:"orange"}}>Last Seen :</small><small> 09:30 PM </small></small><br/>
         </div>
        </div>       
       </div>
             ) : this.props.service.map(services =>
<div key={services.store} className="col-6" style={{padding:"10px"}}>                  
<div key={services.store} style={{marginBottom:"5px",backgroundColor:"white",boxShadow:"1px 2px 5px 2px lightgrey",borderRadius:"5px"}}>
                 <small className="ml-2" style={{color:"rgb(0, 119, 179)",textTransform:"capitalize",fontSize:"18px"}}>{services.store}</small>
                 <small className="ml-3" style={{fontSize:"11px"}}>
                     <div className="outer">
                         <div className="inner" style={{width:"20px"}}>

                         </div>
                     </div>
                 </small>
                 <small style={{cursor:"pointer",float:"right",fontSize:"12px",marginRight:"2px"}} ><b> {getDistanceFromLatLonInKm(Cookies.get("ltf"),Cookies.get("lgx"),parseFloat(services.storelat),parseFloat(services.storelong)).toFixed(2)} </b> KM</small><br/>
                 <small className="ml-2" style={{color:"orange"}}> Service </small><small> : {services.aboutbusiness}</small><br/>
<img src={services.profileImage ? `https://res.cloudinary.com/fruget-com/image/upload/profile/${services.profileImage}`: require(`./images/maleprofile.png`)} className="img-responsive"  style={{padding:"10px 0px",width:"100%",height:"300px"}}  alt=""/>
<div style={{padding:"3px 10px"}}>
<small style={{fontSize:"15px",color:"orange"}}><span className="fa fa-eye"></span> 0</small> <small style={{float:"right",fontSize:"15px",color:"orange"}}> 0 Followers</small> <br/>
<small ><span className="fa fa-map-marker" style={{fontWeight:"bold",color:"orange"}}></span> {services.lga},{services.state}</small><br/>
<small> <span className="fa fa-check-circle" style={{color:"orange"}}></span> Verified Transactions : 0</small> <br/>
<small> <span style={{fontWeight:"bold",color:"orange"}} className="fa fa-envelope 2x"></span> @<span>{services.email}</span></small><br/>
<small> <span style={{fontWeight:"bold",color:"orange"}} className="fab fa-twitter 2x mr-2"></span> <span>AdeIsCrown</span></small><br/>
<small> <span className="fab fa-facebook-square 2x mr-2" style={{fontWeight:"bold",color:"orange"}}></span><span> Eze Ogbonnaya</span></small><br/>
<small> <span className="fa fa-link mr-2" style={{fontWeight:"bold"}}></span><span ><a style={{color:"green"}} href={`/fruget/myproducts/${services.businessName}`}> {` http://fruget/myproducts/${services.businessName}`}</a></span> <span title="click to share link" className="fa fa-reply ml-2"></span></small><br/>
<small style={{fontSize:"10px", color:"grey"}}><span className="fa fa-clock-o" style={{color:"orange"}}></span> {JSON.parse(services.dateOfReg)["date"]} AT <b>{JSON.parse(services.dateOfReg)["time"]}</b></small>
<small style={{float:"right",fontSize:"12px"}}><small style={{color:"orange"}}>Last Seen :</small><small> 09:30 PM </small></small><br/>
 </div>
</div>       
 </div>  
     )}
 </div>
 
</div>
        
         );
    }else{
        return (  
            <div className="container-fluid" style={{color:`${this.props.userdetails.background==="black"?"white":"black"}`,backgroundColor:`${this.props.userdetails.background === "black" ? "black":"white"}`}}>   
<div className="row" style={{backgroundColor:"white",position:"fixed",zIndex:"4"}}>
    <div className="col-12" >
        <p >Services <small>({this.state.searchvalue.length > 0 ? this.state.searchedservices.length : this.props.service.length} Found Near You)</small></p>
    </div>
    <div className="col-10">
        <input type="text" onChange={this.searchchange} value={this.state.searchvalue} style={{border:"none",borderBottom:"1px solid grey",borderRadius:"0px"}} placeholder='Search Services' className="form-control navsearch"/>
    </div> 
    <div className="col-2" style={{padding:"10px"}}>
        <button className="btn btn-warning" style={{color:"white"}}>
           <small> Submit</small>
        </button>
    </div> 
   
    </div>
 
    <div className="row" > 
    <div className="d-none d-md-block d-md-12 " style={{padding:"10px"}}>
    <div className="row" style={{padding:"10px"}}> 
       { this.state.searchvalue.length > 0 && this.state.searchedservices.length === 0 ?
       <p>No service Match</p>
       : this.state.searchvalue.length > 0 && this.state.searchedservices.length > 0 ?
        this.state.searchedservices.map(services =>
        <div key={services.store} className="" style={{width:"50%",marginBottom:"5px",backgroundColor:"white",boxShadow:"1px 2px 5px 2px lightgrey",borderRadius:"5px",padding:"10px"}}>                  
                         <small className="ml-2" style={{color:"rgb(0, 119, 179)",textTransform:"capitalize",fontSize:"18px"}}>{services.store}</small>
                         <small className="ml-3" style={{fontsSize:"11px"}}>
                             <div className="outer">
                                 <div className="inner" style={{width:"20px"}}>
        
                                 </div>
                             </div>
                         </small>
                         <small style={{cursor:"pointer",float:"right",fontSize:"12px",marginRight:"2px"}} ><b> {getDistanceFromLatLonInKm(Cookies.get("ltf"),Cookies.get("lgx"),parseFloat(services.storelat),parseFloat(services.storelong)).toFixed(2)} </b> KM</small>
                         <small className="ml-2" style={{color:"orange"}}> Service </small><small> : {services.aboutbusiness}</small><br/>
        <img src={services.profileImage ? `https://res.cloudinary.com/fruget-com/image/upload/profile/${services.profileImage}`: require(`./images/maleprofile.png`)} className="img-responsive"  style={{padding:"10px 0px",width:"100%",height:"300px"}}  alt=""/>
        <div style={{padding:"3px 10px"}}>
        <small style={{fontSize:"15px",color:"orange"}}><span className="fa fa-eye"></span> 0</small> <small style={{float:"right",fontSize:"15px",color:"orange"}}> 0 Followers</small> <br/>
        <small ><span className="fa fa-map-marker" style={{fontWeight:"bold",color:"orange"}}></span> {services.lga},{services.state}</small><br/>
        <small> <span className="fa fa-check-circle" style={{color:"orange"}}></span> Verified Transactions : 0</small> <br/>
        <small> <span style={{fontWeight:"bold",color:"orange"}} className="fa fa-envelope 2x"></span> @<span>{services.email}</span></small><br/>
        <small> <span style={{fontWeight:"bold",color:"orange"}} className="fab fa-twitter 2x mr-2"></span> <span>AdeIsCrown</span></small><br/>
        <small> <span className="fab fa-facebook-square 2x mr-2" style={{fontWeight:"bold",color:"orange"}}></span><span> Eze Ogbonnaya</span></small><br/>
        <small> <span className="fa fa-link mr-2" style={{fontWeight:"bold"}}></span><span ><a style={{color:"green"}} href={`/fruget/myproducts/${services.businessName}`}> {` http://fruget/myproducts/${services.businessName}`}</a></span> <span title="click to share link" className="fa fa-reply ml-2"></span></small><br/>
        <small style={{fontSize:"10px", color:"grey"}}><span className="fa fa-clock-o" style={{color:"orange"}}></span> {JSON.parse(services.dateOfReg)["date"]} AT <b>{JSON.parse(services.dateOfReg)["time"]}</b></small>
        <small style={{float:"right",fontSize:"12px"}}><small style={{color:"orange"}}>Last Seen :</small><small> 09:30 PM </small></small><br/>
         </div>
        </div>       
       
             ) : this.props.service.map(services =>
<div key={services.store} className="col-6" style={{padding:"10px"}}>                  
<div key={services.store} style={{marginBottom:"5px",backgroundColor:"white",boxShadow:"1px 2px 5px 2px lightgrey",borderRadius:"5px"}}>
                 <small className="ml-2" style={{color:"rgb(0, 119, 179)",textTransform:"capitalize",fontSize:"18px"}}>{services.store}</small>
                 <small className="ml-3" style={{fontSize:"11px"}}>
                     <div className="outer">
                         <div className="inner" style={{width:"20px"}}>

                         </div>
                     </div>
                 </small> 
                 <small style={{cursor:"pointer",float:"right",fontSize:"12px",marginRight:"2px"}} ><b> {getDistanceFromLatLonInKm(Cookies.get("ltf"),Cookies.get("lgx"),parseFloat(services.storelat),parseFloat(services.storelong)).toFixed(2)} </b> KM</small><br/>
                 <small className="ml-2" style={{color:"orange"}}> Service </small><small> : {services.aboutbusiness}</small><br/>
<img src={services.profileImage ? `https://res.cloudinary.com/fruget-com/image/upload/profile/${services.profileImage}`: require(`./images/maleprofile.png`)} className="img-responsive"  style={{padding:"10px 0px",width:"100%",height:"300px"}}  alt=""/>
<div style={{padding:"3px 10px"}}>
<small style={{fontSize:"15px",color:"orange"}}><span className="fa fa-eye"></span> 0</small> <small style={{float:"right",fontSize:"15px",color:"orange"}}> 0 Followers</small> <br/>
<small ><span className="fa fa-map-marker" style={{fontWeight:"bold",color:"orange"}}></span> {services.lga},{services.state}</small><br/>
<small> <span className="fa fa-check-circle" style={{color:"orange"}}></span> Verified Transactions : 0</small> <br/>
<small> <span style={{fontWeight:"bold",color:"orange"}} className="fa fa-envelope 2x"></span> @<span>{services.email}</span></small><br/>
<small> <span style={{fontWeight:"bold",color:"orange"}} className="fab fa-twitter 2x mr-2"></span> <span>AdeIsCrown</span></small><br/>
<small> <span className="fab fa-facebook-square 2x mr-2" style={{fontWeight:"bold",color:"orange"}}></span><span> Eze Ogbonnaya</span></small><br/>
<small> <span className="fa fa-link mr-2" style={{fontWeight:"bold"}}></span><span ><a style={{color:"green"}} href={`/fruget/myproducts/${services.businessName}`}> {` http://fruget/myproducts/${services.businessName}`}</a></span> <span title="click to share link" className="fa fa-reply ml-2"></span></small><br/>
<small style={{fontSize:"10px", color:"grey"}}><span className="fa fa-clock-o" style={{color:"orange"}}></span> {JSON.parse(services.dateOfReg)["date"]} AT <b>{JSON.parse(services.dateOfReg)["time"]}</b></small>
<small style={{float:"right",fontSize:"12px"}}><small style={{color:"orange"}}>Last Seen :</small><small> 09:30 PM </small></small><br/>
 </div>
</div>       
 </div>  
     )}
 </div>
 </div>

        <div className="col-12 d-md-none" style={{margin:"0px",padding:"0px",width:"100%"}}>         
        { this.state.searchvalue.length > 0 && this.state.searchedservices.length === 0 ?
        <p>No service match </p> 
       : this.state.searchvalue.length > 0 && this.state.searchedservices.length > 0 ? 
        this.state.searchedservices.map(services =>
            <div key={services.store} style={{marginBottom:"5px",backgroundColor:"white",boxShadow:"1px 2px 5px 2px lightgrey"}}>
            <div className="row" style={{padding:"0px 20px"}}>
                <div className="col-5" style={{padding:"3px"}}>
                <small> <span className="fa fa-check-circle" style={{color:"orange"}}></span> Verified Transactions : 0</small> <br/>
                <img src={services.profileImage ? `https://res.cloudinary.com/fruget-com/image/upload/profile/${services.profileImage}`: require(`./images/maleprofile.png`)} className="img-responsive"  style={{padding:"10px 0px",width:"100%",height:"180px"}}  alt=""/>
                <small style={{fontSize:"15px",color:"orange"}}><span className="fa fa-eye"></span> 0</small> 
                <small style={{float:"right",fontSize:"15px",color:"orange"}}>
                <i className={`far fa-heart ${this.state.bounce}`}></i>  0 Followers</small> <br/>
                </div>
                <div className="col-7" style={{padding:"5px"}}>
              <small className="ml-2" style={{color:"rgb(0, 119, 179)",textTransform:"capitalize",fontSize:"18px"}}>
                   {services.store}</small>
               <small className="ml-3" style={{fontsSize:"11px"}}>
                   <div className="outer">
                       <div className="inner" style={{width:"20px"}}>

                       </div>
                   </div>
               </small> <br/>
               <small style={{cursor:"pointer",float:"right",fontSize:"12px",marginRight:"2px"}} ><b> {getDistanceFromLatLonInKm(Cookies.get("ltf"),Cookies.get("lgx"),parseFloat(services.storelat),parseFloat(services.storelong)).toFixed(2)} </b> KM</small><br/>
       <small> {services.aboutbusiness}</small><br/>
<div style={{padding:"2px 10px 2px 0px"}}>
<small><span className="fa fa-clock-o"></span> {"February " +JSON.parse(services.dateOfReg)["date"]} | <b>{JSON.parse(services.dateOfReg)["time"]}</b></small><br/>
<small ><span className="fa fa-map-marker-alt" style={{fontWeight:"bold"}}></span> {services.lga},{services.state}</small><br/>
<small> <span style={{fontWeight:"bold"}} className="fa fa-envelope 2x"></span> @<span>{services.email}</span></small><br/>
<small> <span className="fa fa-link mr-2" style={{fontWeight:"bold"}}></span><span ><a style={{color:"green"}} href={`/fruget/myproducts/${services.businessName}`}> {` http://fruget/myproducts/${services.businessName}`}</a></span> <span title="click to share link" className="fa fa-reply ml-2"></span></small><br/>
<small style={{float:"right",fontSize:"12px"}}><small >Last Seen :</small><small> 09:30 PM </small></small><br/>
</div>
                </div>
            </div>
</div>          
)
      : this.props.service.map(services =>
                <div key={services.store} style={{marginBottom:"5px",backgroundColor:"white",boxShadow:"1px 2px 5px 2px lightgrey"}}>
              <div className="row" style={{padding:"0px 20px"}}>
                  <div className="col-5" style={{padding:"3px"}}>
                  <small> <span className="fa fa-check-circle" style={{color:"orange"}}></span> Verified Transactions : {services.verifiedsales || 0}</small> <br/>
                  <img src={services.profileImage ? `https://res.cloudinary.com/fruget-com/image/upload/profile/${services.profileImage}`: require(`./images/maleprofile.png`)} className="img-responsive"  style={{padding:"10px 0px",width:"100%",height:"180px"}}  alt=""/>
                  <small style={{fontSize:"15px",color:"orange"}}><span className="fa fa-eye"></span> {services.viewrating || 0}</small> 
                  <small style={{float:"right",fontSize:"15px",color:"orange"}}>
                  <i onClick={(e)=>this.followservice(e,{data:services.userId})} className={ this.props.userdetails.following && JSON.parse(this.props.userdetails.following).includes(parseInt(services.userId)) ? "fa fa-heart" : "far fa-heart"} style={{color:"orange"}}></i> 
                   {services.followers ? JSON.parse(services.followers).length : null} Followers</small> <br/>
      </div>
                  <div className="col-7" style={{padding:"5px"}}>
                      <Link to={`/profile/${services.email}`}>
                <small className="ml-2" style={{color:"rgb(0, 119, 179)",textTransform:"capitalize",fontSize:"18px"}}>
                     {services.store}</small>
                     </Link>
                 <small className="ml-3" style={{fontsSize:"11px"}}>
                     <div className="outer">
                         <div className="inner" style={{width:"20px"}}>

                         </div>
                     </div>
                 </small> ({services.numofrating})<br/>
                 <small style={{cursor:"pointer",float:"right",fontSize:"12px",marginRight:"2px"}} ><b> {getDistanceFromLatLonInKm(this.state.userlat,this.state.userlng,parseFloat(services.storelat),parseFloat(services.storelong)).toFixed(2)} </b> KM</small><br/>
         <small> {services.aboutbusiness}</small><br/>
<div style={{padding:"2px 10px 2px 0px"}}>
<small><span className="fa fa-clock-o"></span> {"February " +JSON.parse(services.dateOfReg)["date"]} | <b>{JSON.parse(services.dateOfReg)["time"]}</b></small><br/>
<small ><span className="fa fa-map-marker-alt" style={{fontWeight:"bold"}}></span> {services.lga},{services.state}</small><br/>
<small> <span style={{fontWeight:"bold"}} className="fa fa-envelope 2x"></span> @<span>{services.email}</span></small><br/>
<small> <span className="fa fa-link mr-2" style={{fontWeight:"bold"}}></span><span ><a style={{color:"green"}} href={`/fruget/myproducts/${services.businessName}`}> {` http://fruget/myproducts/${services.businessName}`}</a></span> <span title="click to share link" className="fa fa-reply ml-2"></span></small><br/>
<small style={{float:"right",fontSize:"12px"}}><small >Last Seen :</small><small> 09:30 PM </small></small><br/>
 </div>
                  </div>
              </div>
    
</div>       
                )}
            </div>        
    </div>
</div>
        
         );
    }
} 
}
/*
    <div key={services.store} style={{marginBottom:"5px",backgroundColor:"white",boxShadow:"1px 2px 5px 2px lightgrey"}}>
                 <small className="ml-2" style={{color:"rgb(0, 119, 179)",textTransform:"capitalize",fontSize:"18px"}}>{services.store}</small>
                 <small className="ml-3" style={{fontsSize:"11px"}}>
                     <div className="outer">
                         <div className="inner" style={{width:"20px"}}>

                         </div>
                     </div>
                 </small> <br/>
                 <small style={{cursor:"pointer",float:"right",fontSize:"12px",marginRight:"2px"}} ><b> {getDistanceFromLatLonInKm(this.state.userlat,this.state.userlng,parseFloat(services.storelat),parseFloat(services.storelong)).toFixed(2)} </b> KM</small><br/>
                 <small className="ml-2" style={{color:"orange"}}> Service </small><small> : {services.aboutbusiness}</small><br/>
<img src={services.profileImage ? `https://res.cloudinary.com/fruget-com/image/upload/profile/${services.profileImage}`: require(`./images/maleprofile.png`)} className="img-responsive"  style={{padding:"10px 0px",width:"100%",height:"300px"}}  alt=""/>
<div style={{padding:"3px 10px"}}>
<small style={{fontSize:"15px",color:"orange"}}><span className="fa fa-eye"></span> 0</small> <small style={{float:"right",fontSize:"15px",color:"orange"}}> 0 Followers</small> <br/>
<small ><span className="fa fa-map-marker" style={{fontWeight:"bold",color:"orange"}}></span> {services.lga},{services.state}</small><br/>
<small> <span className="fa fa-check-circle" style={{color:"orange"}}></span> Verified Transactions : 0</small> <br/>
<small> <span style={{fontWeight:"bold",color:"orange"}} className="fa fa-envelope 2x"></span> @<span>{services.email}</span></small><br/>
<small> <span style={{fontWeight:"bold",color:"orange"}} className="fab fa-twitter 2x mr-2"></span> <span>AdeIsCrown</span></small><br/>
<small> <span className="fab fa-facebook-square 2x mr-2" style={{fontWeight:"bold",color:"orange"}}></span><span> Eze Ogbonnaya</span></small><br/>
<small> <span className="fa fa-link mr-2" style={{fontWeight:"bold"}}></span><span ><a style={{color:"green"}} href={`/fruget/myproducts/${services.businessName}`}> {` http://fruget/myproducts/${services.businessName}`}</a></span> <span title="click to share link" className="fa fa-reply ml-2"></span></small><br/>
<small style={{fontSize:"10px", color:"grey"}}><span className="fa fa-clock-o" style={{color:"orange"}}></span> {JSON.parse(services.dateOfReg)["date"]} AT <b>{JSON.parse(services.dateOfReg)["time"]}</b></small>
<small style={{float:"right",fontSize:"12px"}}><small style={{color:"orange"}}>Last Seen :</small><small> 09:30 PM </small></small><br/>
 </div>
</div>       
 */
//<span onClick={this.undisplaycategorymodal} style={{float:"right",fontSize:"15px"}}>x</span>
const mapStateToProps =(store)=>{
    return{           
     service:store.services,
     userdetails:store.userdetails,
     categoryModaldisplay:store.categoryModaldisplay,
     redirect:store.redirect
     }
  }
  const mapDispatchToProps =(dispatch)=>{
   return{
    services:(data)=>dispatch(services(data)),
     viewuserdetailsbyuserId:(data)=>dispatch(viewuserdetailsbyuserId(data)),
     undisplaycategorymodal:()=>dispatch(undisplaycategorymodal()),
     unloading:()=>dispatch(unloading()),
     followservice:(data)=>dispatch(followservice(data)),
     setredirect:()=>dispatch(setredirect())
     }
  }
export default compose(withRouter ,connect(mapStateToProps,mapDispatchToProps))(Services);