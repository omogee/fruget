import React, { Component } from 'react';
import {connect} from "react-redux"
import Cookies from 'js-cookie';
import {fetchfollowers,followseller} from "./store"
import { Link } from 'react-router-dom';

class Followers extends Component {
    constructor(props) {
        super(props);
        this.state = { 
      userId:""
         }
    }

    componentDidMount=()=>{
        console.log("Cookies.get(cm_ppp)",Cookies.get("cm_pp"))    
        let mainToken
        if(Cookies.get("cm_pp") ){
            const myToken = Cookies.get("cm_pp")
            let myMainTokenlen = parseInt(myToken.split("%")[0])
             let userIdlen = parseInt(myToken.split("%")[1])
             let userIdpos = parseInt(myToken.split("%")[2].charAt(0)+myToken.split("%")[2].charAt(1))
             let userId = myToken.slice(userIdpos, userIdpos+userIdlen)
             this.setState({userId})
              mainToken = myToken.slice(userIdpos+userIdlen, myMainTokenlen)
             let userId2 = mainToken.slice(userIdpos, userIdpos+userIdlen)
        this.props.fetchfollowers(this.props.match.params.email)
            }      
    
            let uri = window.location.href
            uri = uri.split("/")[6]
            this.setState({currentCategory:uri})
    }
    followseller =(data)=>{
        this.props.followseller(data)
        }
    render() { 
        if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        return (
            <div >
                <div  className="container">                
                    <div  className="row" style={{padding:"0px",margin:"0px"}}> 
                    
                    <div className="col-12" style={{paddingTop:"10px"}}> 
                    <span className="fa fa-times text-muted" style={{float:"right",fontSize:"12px"}}></span>    
                    <small className="text-muted" style={{float:"left"}}>Followers</small>
                    
                    </div>
                    <div className="col-12 " style={{padding:"0px",msOverflowY:"scroll",OverflowY:"scroll"}}>              
{this.props.followers.map((follower)=>
<a key={follower.userId} href={`/profile/${follower.email}`}>
    <div className="row"  style={{padding: "10px",marginBottom:"0px",paddingBottom:"0px"}}>
                          <div className="col-1" style={{padding:"0px"}}>
<img src={follower.profileImage ? `https://res.cloudinary.com/fruget-com/image/upload/profile/${follower.profileImage}`: require(`./images/maleprofile.png`)}  style={{paddingTop: "2px",borderRadius:"50%",width:"120%",height:"35px"}}  alt=""/>
                          </div>
                          <div className="col-8">
                          <span>
                          <small style={{fontWeight:"bold",fontSize:"13px",marginBottom:"0px",paddingBottom:"0px"}} >{follower.fullName}</small><br/>
                         <div style={{marginTop:"0px",paddingTop:"0px",position:"relative"}}>
                         <small className="text-muted" style={{fontSize:"12px",position:"absolute", top:"0px"}}>{follower.businessName}</small>
                         </div>
                          </span>
                      </div>
                          <div className="col-3">
  <button  className={`btn btn-sm ${follower.followers && JSON.parse(follower.followers).includes(this.props.userdetails.userId) ? "btn-link text-muted" : "btn-primary"}`} style={{border:"1px solid lightgrey",padding:"3px",width:"100%"}}>
      <small>
             {follower.followers && JSON.parse(follower.followers).includes(this.props.userdetails.userId) ? "Following" : "Follow"}
             </small>
   </button>
                          </div>
                      </div>
                      </a>
                            )}       
        
      </div>
                </div>
            </div>
            </div>
         );
}else{
    return(
        <div  style={{}}>
            <div className="container">
            <div className="followdiv" style={{position:"absolute",border:"1px solid lightgrey",height:"60%",backgroundColor:"white"}}>
            <span className="fa fa-times text-muted" onClick={()=>window.history.back()} style={{padding:"5px",float:"right",fontSize:"15px"}}></span>    
            <center>
                <p className="text-muted">Followers</p>
            </center>
            <div className="row"> 
                      <div className="col-12 " style={{marginLeft:"10px",padding:"0px 25px",msOverflowY:"scroll",OverflowY:"scroll"}}>              
      {this.props.followers.map((followers)=>
      <div className="row" key={followers.userId} style={{padding: "10px",marginBottom:"0px",paddingBottom:"0px"}}>
                            <div className="col-1" style={{padding:"0px"}}>
      <img src={followers.profileImage ? `https://res.cloudinary.com/fruget-com/image/upload/profile/${followers.profileImage}`: require(`./images/maleprofile.png`)}  style={{paddingTop: "2px",borderRadius:"50%",width:"120%",height:"35px"}}  alt=""/>
                            </div>
                            <div className="col-8">
                          <span>
                          <small style={{fontWeight:"bold",fontSize:"13px",marginBottom:"0px",paddingBottom:"0px"}} >{followers.fullName}</small><br/>
                         <div style={{marginTop:"0px",paddingTop:"0px",position:"relative"}}>
                         <small className="text-muted" style={{fontSize:"12px",position:"absolute", top:"0px"}}>{followers.businessName}</small>
                         </div>
                          </span>
                      </div>
                            <div className="col-3">
<button onClick={()=>this.followseller(followers.userId)} className={`btn btn-sm ${this.props.userdetails.following && JSON.parse(this.props.userdetails.following).includes(parseInt(followers.userId)) ? "btn-link text-muted" : "btn-primary"}`} style={{border:"1px solid lightgrey",padding:"3px",width:"100%"}}>
        <small>
               {this.props.userdetails.following && JSON.parse(this.props.userdetails.following).includes(parseInt(followers.userId)) ? "Unfollow" : "Follow"}
               </small>
      </button>
                            </div>
                        </div>
                              )}       
          
        </div>
                  </div>
                  
            </div>
            </div>
        </div>
          )
      }
    }
}

const mapStateToProps =(store)=>{
    return{           
     followers:store.followers,
     sellerdetails:store.sellerdetails,
     userdetails:store.userdetails
     }
  }
  const mapDispatchToProps =(dispatch)=>{
   return{
    fetchfollowers: (data)=>dispatch(fetchfollowers(data)),
    followseller:(data)=>dispatch(followseller(data))
   }
  }
export default connect(mapStateToProps, mapDispatchToProps)(Followers);