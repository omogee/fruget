import React, { Component } from 'react';
import {connect} from "react-redux"
import Cookies from 'js-cookie';
import {fetchfollowing, followseller} from "./store"

class Following extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            orientation:"computer"
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
        this.props.fetchfollowing(this.props.match.params.email)
            }      
    
            let uri = window.location.href
            uri = uri.split("/")[6]
            this.setState({currentCategory:uri})
    }
    followseller=(data)=>{
        this.props.followseller(data)
    }

    render() { 
        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        return (        
                <div>
            <div  className="container">                
                <div  className="row" style={{padding:"0px",margin:"0px"}}> 
                <div className="col-12 " style={{padding:"0px",msOverflowY:"scroll",OverflowY:"scroll"}}>              
{this.props.following.map((following)=>
<div className="row" key={following.userId} style={{padding: "10px"}}>
                      <div className="col-1" style={{padding:"0px"}}>
<img src={following.profileImage ? `https://res.cloudinary.com/fruget-com/image/upload/profile/${following.profileImage}`: require(`./images/maleprofile.png`)}  style={{paddingTop: "2px",borderRadius:"50%",width:"120%",height:"35px"}}  alt=""/>
                      </div>
                      <div className="col-8">
                          <span>
                          <small style={{fontWeight:"bold",fontSize:"13px",marginBottom:"0px",paddingBottom:"0px"}} >{following.fullName}</small><br/>
                         <div style={{marginTop:"0px",paddingTop:"0px",position:"relative"}}>
                         <small className="text-muted" style={{fontSize:"12px",position:"absolute", top:"0px"}}>{following.businessName}</small>
                         </div>
                          </span>
                      </div>
                      <div className="col-3">
<button className={`btn btn-sm ${following.following && JSON.parse(following.following).includes(this.props.sellerdetails.userId) ? "btn-link text-muted" : "btn-primary"}`} style={{border:"1px solid lightgrey",padding:"3px",width:"100%"}}>
  <small>
         {following.following && JSON.parse(following.following).includes(this.props.sellerdetails.userId) ? "Following" : "Follow"}
         </small>
</button>
                      </div>
                  </div>
                        )}       
    
  </div>
            </div>
        </div>
        </div>
        );
    }
    else{
    return(
  <div  style={{}}>
      <div className="container">
      <div className="followdiv" style={{position:"absolute",border:"1px solid lightgrey",height:"60%",backgroundColor:"white"}}>
      <span className="fa fa-times text-muted" onClick={()=>window.history.back()} style={{padding:"5px",float:"right",fontSize:"15px"}}></span>    
      <center>
          <p className="text-muted">Following</p>
      </center>
      <div className="row"> 
                <div className="col-12 " style={{marginLeft:"10px",padding:"0px 25px",msOverflowY:"scroll",OverflowY:"scroll"}}>              
{this.props.following.map((following)=>
<div className="row" key={following.userId} style={{padding: "10px"}}>
                      <div className="col-1" style={{padding:"0px"}}>
<img src={following.profileImage ? `https://res.cloudinary.com/fruget-com/image/upload/profile/${following.profileImage}`: require(`./images/maleprofile.png`)}  style={{paddingTop: "2px",borderRadius:"50%",width:"120%",height:"35px"}}  alt=""/>
                      </div>
                      <div className="col-8">
                          <span>
                          <small style={{fontWeight:"bold",fontSize:"13px",marginBottom:"0px",paddingBottom:"0px"}} >{following.fullName}</small><br/>
                         <div style={{marginTop:"0px",paddingTop:"0px",position:"relative"}}>
                         <small className="text-muted" style={{fontSize:"12px",position:"absolute", top:"0px"}}>{following.businessName}</small>
                         </div>
                          </span>
                      </div>
                      <div className="col-3">
<button onClick={()=>this.followseller(following.userId)} className="btn btn-sm btn-primary" style={{border:"1px solid lightgrey",padding:"3px",width:"100%"}}>
  <small>
         {"Unfollow"}
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
/**
 * 
 *  {<div  style={{}}>
      <div className="container">
      <div className="followdiv" style={{position:"absolute",border:"1px solid lightgrey",height:"60%",backgroundColor:"white"}}>
      <span className="fa fa-times text-muted" onClick={()=>window.history.back()} style={{padding:"5px",float:"right",fontSize:"15px"}}></span>    
      <center>
          <p className="text-muted">Following</p>
      </center>
      <div className="row"> 
                <div className="col-12 " style={{marginLeft:"10px",padding:"0px 25px",msOverflowY:"scroll",OverflowY:"scroll"}}>              
{this.props.following.map((following)=>
<div className="row" key={following.userId} style={{padding: "10px"}}>
                      <div className="col-1" style={{padding:"0px"}}>
<img src={following.profileImage ? `https://res.cloudinary.com/fruget-com/image/upload/profile/${following.profileImage}`: require(`./images/maleprofile.png`)}  style={{paddingTop: "2px",borderRadius:"50%",width:"110%",height:"35px"}}  alt=""/>
                      </div>
                      <div className="col-8">
                          <span>
                          <small style={{fontWeight:"bold",fontSize:"13px",marginBottom:"0px",paddingBottom:"0px"}} >{following.fullName}</small><br/>
                          <small className="text-muted" style={{fontSize:"12px",marginTop:"0px",paddingTop:"0px"}}>{following.businessName}</small>
                          </span>
                      </div>
                      <div className="col-3">
<button className={`btn btn-sm ${following.following && JSON.parse(following.following).includes(this.props.sellerdetails.userId) ? "btn-link text-muted" : "btn-primary"}`} style={{border:"1px solid lightgrey",padding:"3px",width:"100%"}}>
  <small>
         {following.following && JSON.parse(following.following).includes(this.props.sellerdetails.userId) ? "Following" : "Follow"}
         </small>
</button>
                      </div>
                  </div>
                        )}       
    
  </div>
            </div>
            
      </div>
      </div>
  </div>} store 
 */
const mapStateToProps =(store)=>{
    return{           
     following:store.following,
     sellerdetails:store.sellerdetails,
     userdetails:store.userdetails
     }
  }
  const mapDispatchToProps =(dispatch)=>{
   return{
    fetchfollowing: (data)=>dispatch(fetchfollowing(data)),
    followseller:(data)=>dispatch(followseller(data))
   }
  }
export default connect(mapStateToProps, mapDispatchToProps)(Following);