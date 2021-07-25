import React, { Component } from 'react';
import queryString from "query-string"
import axios from "axios"
import SavedItems from "./savedItems"
import {states} from "./state"
<<<<<<< HEAD
import {Accordion,Card,Button} from 'react-bootstrap'
=======
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = { 
           user:[],
           state:"",
           lga:"",
<<<<<<< HEAD
           dform:"none",
           displaycart:"block",
           displayabout:"none",
           displayclearedcart:"none",
           displayuploads:"none",
           backgroundColor:"white",
           transparentblackbackground:"white",
           color:"black"
=======
           dform:"none"
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
         }
    }
componentDidMount =()=>{
    const userId = this.props.match.params.userId;
<<<<<<< HEAD
    let id= userId.split("community")[2]
 //   id = parseInt(id)
    console.log(id)
    axios.get(`http://localhost:5000/customer/userprofile/${id}`)
=======
    let id= userId.split(",")[1]
    axios.get(`http://fruget.herokuapp.com/customer/userprofile/${id}`)
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
    .then(res => {
        if(res.data.message){
            this.setState({user:res.data.file})
        }else{
            console.log("no saved Items to display")
        }
    })
    .catch(err => console.warn(err))
}
change=(e)=>{
    this.setState({[e.target.name]:e.target.value})
}
displayform=()=>{
this.setState({dform:"block"})
}
undisplayform=()=>{
    this.setState({dform:"none"})  
}
<<<<<<< HEAD
changeBg=()=>{
  if(this.state.backgroundColor === "black"){
    this.setState({backgroundColor:"white",color:"black",transparentblackbackground:"white"})
  }else{
    this.setState({backgroundColor:"black",color:"white",transparentblackbackground:"black"})
  }
}
    render() { 
        console.log(this.state.user)
        return ( 
            <div className="container" style={{backgroundColor:`${this.state.backgroundColor}`,color:`${this.state.backgroundcolor}`}}>
               <div style={{width:"35%",position:"absolute",top:"150px",left:"20px",zIndex:"3"}}>
                  <div style={{position:"absolute",padding:"20px",height:"500px",color:"white",top:"0px",left:"0px",zIndex:"2",backgroundColor:`${this.state.transparentblackbackground}`,color:`${this.state.color}`}}>
                  <small style={{padding:"10px 50px",float:"right"}}>
                  <span className="fa fa-bell" style={{fontSize:"20px"}}>
                  </span>
                  <span className='badge badge-danger' style={{fontSize:"15px"}}>
                    0
                  </span>
                  </small>
                <small style={{padding:"10px 50px",float:"right"}}>
                  <span className="fa  fa-shopping-cart" style={{fontSize:"20px"}}>
                  </span>
                  <span className='badge badge-danger' style={{fontSize:"15px"}}>
                    0
                  </span>
                  </small><br/>
                   <center>
                 <img src={this.state.user.profileImage ? `https://res.cloudinary.com/fruget-com/image/upload/profile/${this.state.user.profileImage}`: require(`./images/maleprofile.png`)} className="rounded-circle" style={{zIndex:"2",width:"40%",height:"200px",border:"2px solid lightgrey"}} alt=""/>
                 </center>
                 <hr/>
                 </div>
                 <p></p>
               </div>
                <div className="row" style={{marginLeft:"30%",position:"relative"}}>
                <div className="col-12 col-md-12" style={{width:"100%",height:"700px",padding:"20px",filter:" blur(8px)",backgroundImage: `url(https://res.cloudinary.com/fruget-com/image/upload/profile/${this.state.user.profileImage})`,backgroundRepeat:"no-repeat",backgroundPosition:"center",backgroundSize:"cover"}}>  </div>
                  <div style={{position:"absolute",padding:"20px",height:"700px",color:"white",top:"0px",left:"0px",backgroundColor:"rgba(0,0,0,0.5)",zIndex:"2"}}>
                    <p className="text-muted">Authorization : <span style={{textTransform:"uppercase",color:"white"}}>{this.state.user.authorization}</span></p> <small style={{float:"right"}}><button style={{color:"white",border:"2px solid white"}} className="btn btn-link">Edit Profile</button> </small><br/>
                        <center style={{padding:"30px"}}>
                            <img src={this.state.user.profileImage ? `https://res.cloudinary.com/fruget-com/image/upload/profile/${this.state.user.profileImage}`: require(`./images/maleprofile.png`)} className="rounded-circle img-thumbnail" style={{width:"50%",height:"300px",border:"2px solid lightgrey"}} alt=""/>
                            <br/>
                            <h3 style={{textTransform:"cah1italize"}}>{this.state.user.fullName}</h3>
                            <small className="text-muted"><span className="fa fa-map-marker-alt"></span> {this.state.user.state +" , "+ this.state.user.lga}</small>
                        </center>                    
                <p style={{color:"white"}}>{this.state.user.aboutbusiness}</p>
        <div className="row">
         <div className="col-4">
          <center>
          <small style={{fontSize:"30px"}}>0</small><br/>
          <small style={{fontSize:"20px"}} className="text-muted">Uploads</small> 
          </center>
         </div>
         <div className="col-4">
         <center>
         <small style={{fontSize:"30px"}}>0</small><br/>
          <small style={{fontSize:"20px"}} className="text-muted">Views</small> 
          </center>
         </div>
         <div className="col-4">
         <center>
         <small style={{fontSize:"30px"}}>0</small><br/>
          <small style={{fontSize:"20px"}} className="text-muted">Orders</small> 
          </center>
         </div>
        </div>
        <small style={{float:"right"}}><span className="fa fa-calendar"> </span> Registered september 2020</small><br/>
        <small style={{float:"left"}}><span className="fa fa-clock"> </span> <b>12:54</b> Mon, sept 2020</small><br/>
                    </div>
                    </div>
                    <div style={{marginLeft:"30%"}}>
                <hr/>
                    <p style={{color:`${this.state.color}`}}><span className="fa fa-globe"></span> : https://fruget.com/{this.state.user.fullName + "  "}<span className="fa fa-reply"></span></p>
                   <hr/>
                
                    <Accordion defaultActiveKey="2">
                    <Card>
    <Card.Header style={{backgroundColor:`${this.state.backgroundColor}`,color:`${this.state.color}`}}>
      <Accordion.Toggle as={Button} variant="link" eventKey="3" style={{color:"grey"}}>
      <span className="fa fa-bell"></span>  Notifications
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey="3">
      <Card.Body style={{backgroundColor:`${this.state.backgroundColor}`,color:`${this.state.color}`}}>
        Hello! I'm another body
        </Card.Body>
    </Accordion.Collapse>
  </Card>
    <Card >
    <Card.Header style={{backgroundColor:`${this.state.backgroundColor}`}} >
      <Accordion.Toggle as={Button} variant="link" eventKey="2" style={{color:"grey"}}>
      <span className="fa fa-cart-plus" ></span> Cart
      <span className='badge badge-danger' style={{fontSize:"15px",marginLeft:"5px"}}>
                    0
                  </span>
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey="2">
      <Card.Body style={{backgroundColor:`${this.state.backgroundColor}`}} >
      <div>
                <table className="table table-stripped">
                    <thead style={{backgroundColor:`${this.state.backgroundColor}`,color:`${this.state.color}`}}>
                        <tr style={{color:`${this.state.color}`}}>
                            <th>s/no</th>
                            <th>Cart order</th>
                            <th>Status</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody style={{color:`${this.state.color}`}}>
                        <tr>
                            <td>1</td>
                            <td>1</td>
                            <td>1</td>
                            <td>1</td>
                        </tr>
                    </tbody>
                    <tbody style={{color:`${this.state.color}`}}>
                        <tr>
                            <td>1</td>
                            <td>1</td>
                            <td>1</td>
                            <td>1</td>
                        </tr>
                    </tbody>
                </table>
                </div>
      </Card.Body>
    </Accordion.Collapse>
  </Card>
  <Card>
    <Card.Header style={{backgroundColor:`${this.state.backgroundColor}`,color:`${this.state.color}`}}>
      <Accordion.Toggle as={Button} variant="link" eventKey="3" style={{color:"grey"}}>
      <span className="fa fa-upload"></span>  Uploads
                <span className='badge badge-danger' style={{fontSize:"15px",marginLeft:"5px"}}>
                    0
                  </span>
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey="3">
      <Card.Body style={{backgroundColor:`${this.state.backgroundColor}`,color:`${this.state.color}`}}>
        Hello! I'm another body
        </Card.Body>
    </Accordion.Collapse>
  </Card>
  <Card>
    <Card.Header style={{backgroundColor:`${this.state.backgroundColor}`,color:`${this.state.color}`}}>
      <Accordion.Toggle as={Button} variant="link" eventKey="3" style={{color:"grey"}}>
      <span className="fa fa-cloud"></span>  Saved Items
      <span className='badge badge-danger' style={{fontSize:"15px",marginLeft:"5px"}}>
                    0
                  </span>
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey="3">
      <Card.Body style={{backgroundColor:`${this.state.backgroundColor}`,color:`${this.state.color}`}}>
        Hello! I'm another body
        </Card.Body>
    </Accordion.Collapse>
  </Card>
  <Card>
    <Card.Header style={{backgroundColor:`${this.state.backgroundColor}`,color:`${this.state.color}`}}>
      <Accordion.Toggle as={Button} variant="link" eventKey="5" style={{color:"grey"}}>
      <span className="fa fa-user"></span>   Followers
      <span className='badge badge-danger' style={{fontSize:"15px",marginLeft:"5px"}}>
                    0
                  </span>
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey="5">
      <Card.Body style={{backgroundColor:`${this.state.backgroundColor}`,color:`${this.state.color}`}}>
        Hello! I'm another body
        </Card.Body>
    </Accordion.Collapse>
  </Card>
  <Card>
    <Card.Header style={{backgroundColor:`${this.state.backgroundColor}`,color:`${this.state.color}`}}>
      <Accordion.Toggle as={Button} variant="link" eventKey="5" style={{color:"grey"}}>
       <span className="fa fa-cog"></span> Settings
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey="5">
      <Card.Body style={{backgroundColor:`${this.state.backgroundColor}`,color:`${this.state.color}`}}>
       <p style={{cursor:"pointer"}} onClick={this.changeBg}>Change background colour</p>
        </Card.Body>
    </Accordion.Collapse>
  </Card>
  <Card>
    <Card.Header style={{backgroundColor:`${this.state.backgroundColor}`,color:`${this.state.color}`}}>
      <Accordion.Toggle as={Button} variant="link" eventKey="0" style={{color:"grey"}}>
      <span className="fa fa-info-circle"></span>  About
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey="0">
      <Card.Body style={{backgroundColor:`${this.state.backgroundColor}`,color:`${this.state.color}`}}>
      <div className="col-12 col-md-12" >
                <p><span className="fa fa-user"></span> {this.state.user.fullName}</p>
                <p><span className="fa fa-phone"></span> {this.state.user.contact}</p>
                <p><span className="fa fa-envelope"></span> {this.state.user.email}</p>
                <p><span className="fa fa-map-marker-alt"></span> {this.state.user.lga}, {this.state.user.state}</p>
                <p><b>Mailing Address :</b> {this.state.user.address}</p>
                <p><b>Date Of Reg :</b> {this.state.user.dateOfReg}</p>
                <p> <b>Gender :</b> {this.state.user.gender === "Mr" ? "Male" : "Female"}</p>
                <p> <b>Authorization :</b> {this.state.user.authorization}</p>
               
=======
    render() { 
        console.log(this.state.user)
        return ( 
            <div className="container">
                <h2>User Profile</h2>
                <small><small>At fruget we are very strict with user details and we ensure you a 100% safety</small></small><br/><br/>
        <p>Welcome {this.state.user.gender = "male" ? "Mr" : "Mrs"} {this.state.user.firstName}</p><br/><br/>
        <small style={{float:"right"}}><button className="btn btn-success">view stores </button> </small><br/>
                <div className="row">
                    <div className="col-7">
                 <b>First Name:</b> {this.state.user.firstName} <br/><br/>
                <b>Last Name:</b> {this.state.user.lastName} <br/><br/>
                <b>Contatc:</b> {this.state.user.contact} <br/><br/>
                <b>Email Address :</b> {this.state.user.email}<br/><br/>
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
 <b>Address</b>: <button className="btn btn-primary" style={{display:`${this.state.dform==="block" ? "none" : "inline-block"}`,padding:"2px"}} onClick={this.displayform}>Add Address</button>
  <span className="fa fa-times ml-5" onClick={this.undisplayform} style={{float:"right",display:`${this.state.dform==="none" ? "none" : "inline-block"}`,fontSize:"20px"}}></span> <br/>
                <div style={{display:`${this.state.dform}`}}>
                 <form action="">
                     <div className="row">
                     <div className="col-12">
                    <div style={{padding:"10px"}}>
                 <label for="male">Select State of Residence </label>
                <select name="state" className="form-control" id="state" onChange={this.change} value={this.state.state}>
                  <option value="">Select state of residence</option>
                 {states.map(state =>                 
                  <option value={`${state.state.name}`}>{state.state.name}</option>
                  )}
                </select>
                <small><small style={{color:"red"}}>{this.state.stateerr}</small></small>
                    </div>                                   
                    </div>
                    <div className="col-12">
                    <div style={{padding:"10px"}}>
                 <label for="male">Select lga of Residence </label>
                 <select name="lga" className="form-control" id="lga" value={this.state.lga} onChange={this.change}>
                 <option value="">Select lga of residence</option>
                 {states.map(state =>  
                 state.state.name === this.state.state ? 
                 state.state.locals.map(mainstate =>
                 <option value={`${mainstate.name}`}>{mainstate.name}</option>
                  )              
                  : null                                
                  )}
                 </select>
                 <small><small style={{color:"red"}}>{this.state.lgaerr}</small></small>
                    </div>                                   
                    </div>
                    <div className="col-12">
                <div style={{padding:"10px"}}>
             <label htmlFor="password">Password <span style={{color:"red",fontSize:"20px"}}>*</span></label>
             <div className="input-group">     
            <input type="password" className="form-control" required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" onChange={this.change} value={this.state.password} title="<b>Must contain text and numbers</b>" name="password" id="password" style={{padding:"5px",borderRight:"none"}}/>
            <div className="input-group-btn">
              <button className="btn btn-link" className="eye" onclick='changepassType()'  style={{border:"1px solid lightgrey"}}>Hide</button>
            </div>
             </div>
             <small><small style={{color:"red"}}>{this.state.passworderr}</small></small>
             </div>
             </div>
  
                     </div>
                     <div style={{padding:"10px"}}>
                     <button className="btn btn-primary" style={{padding:"2px"}} >Change Address</button> 
                     </div><br/>
                 </form>
                </div>
<<<<<<< HEAD
                <br/> 
                   <br/>
                <br/>
                <small>view your <button className="btn btn-primary" style={{padding:"2px"}}> saved </button> items</small>
                <br/><br/>
                </div>                

      </Card.Body>
    </Accordion.Collapse>
  </Card>
  
</Accordion>
                   
</div>
 </div>

=======
                <br/>
                    </div>
                    <div className="col-5">
                        <center>
                            <img src={require(`./images/maleprofile.png`)} className="img-thumbnail" style={{border:"2px solid lightgrey"}} alt=""/>
                        </center>
                    </div>
                </div>
                
                <br/>
                <br/>
                <small>view your <button className="btn btn-primary" style={{padding:"2px"}}> saved </button> items</small>
                <br/><br/>
                <SavedItems userIdentity={localStorage.getItem("id")} style={{display:"none"}}></SavedItems>
               
                <table className="table table-stripped">
                    <thead style={{backgroundColor:"rgb(0, 119, 179)",color:"white"}}>
                        <tr>
                            <th>s/no</th>
                            <th>Cart</th>
                            <th>Status</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>1</td>
                            <td>1</td>
                            <td>1</td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>1</td>
                            <td>1</td>
                            <td>1</td>
                        </tr>
                    </tbody>
                </table>
            </div>
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
         );
    }
}
 
export default Profile;