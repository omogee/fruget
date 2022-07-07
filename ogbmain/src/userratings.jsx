import React, { Component } from 'react';
import {viewuserdetails} from "./store"
import {connect} from "react-redux"
import {formater} from "./formatTime"
import {Link} from "react-router-dom"


class UserRatings extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
componentDidMount=()=>{
    this.props.viewuserdetails(this.props.match.params.email)
}
    render() { 
        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        return ( 
            <div className="container">
         <div className="row">
  <div className="col-6"></div>
  <div className="col-12 col-md-6">
  <div className="row" id="comments" style={{margin:"2px"}}>
            <div className="col-12" style={{border: "1px solid lightgrey", borderRadius:"5px",backgroundColor:`${this.props.userdetails.background}`,color:`${this.props.userdetails.background === "black" ? "white":"black"}`,padding:"10px"}}>
<small style={{fontSize:"15px"}}>Customer Reviews</small> 
<button style={{float:"right",backgroundColor:"orange",color:"white"}} 
className="btn active" 
onClick={this.displaymodal} >
  <a href="#modaldiv"  style={{color:"white"}}>
    Rate
    </a>
  </button>
             <hr/>
            {this.props.usercomments.length > 0 ?
             <div className="row">
             <div className="col-12 col-md-3">
                 <small style={{padding:"0px",margin:"0px"}}>RATING ({this.props.usercomments.length || 0} ) </small><br/>
            <small style={{fontSize:"20px",fontWeight:"bold"}}>{this.props.otheruserdetails.userrating}</small><br/>
          <div className="outer" style={{fontSize:"10px",padding:"0px"}}>
          <div className="inner" style={{width:`${this.props.otheruserdetails.userrating*20}%`}}>
             </div>
            </div>
             </div>
             <div className="col-12 col-md-9">
             <small style={{padding:"0px",margin:"0px"}}>REVIEWS/ COMMENTS ({this.props.usercomments.length || 0} ) </small>
             <hr/>
             {this.props.usercomments.map((comments)=> 
               <div style={{lineHeight:"16px",fontSize:"12px"}}>       
                      <div className="row">
                       <div className="col-2" style={{padding:"0px",margin:"0px"}}>
                       <img src={comments.userImage ? `https://res.cloudinary.com/fruget-com/image/upload/profile/${comments.userImage}`: require(`./images/maleprofile.png`)} style={{width:"100%",padding:"0px 8px",margin:"3px 0px",height:"70px"}} alt="" />
                       </div>
                       <div className="col-10" style={{padding:"0px",margin:"0px"}}>
                       <small style={{padding:"5px 0px",fontWeight:"bold",color:"brown",fontSize:"12px"}}> {comments.userName} </small>
                       <small className="ml-2 text-muted">{formater(comments.time)}</small>
                       <small style={{float:"right",marginRight:"8px"}}><span className="fa fa-check-circle " style={{color:"orange",fontSize:"15px"}}></span><span className="dodo"> Verified Purchase</span></small>
                                        
                <div style={{padding:"2px"}}>
                    <small style={{padding:"3px 0px"}}>
                     <small style={{fontSize:"13px"}}> {comments.comment}</small></small>
                     <small style={{float:"right",clear:"left",padding:"8px"}}>
                        <div className="outer" style={{fontSize:"10px"}}>
                <div className="inner" style={{fontSize:"8px",width:`${(comments.rating)*20 || 0}%`}}>
                </div>
                </div></small><br/>
                     </div>
               <small  style={{fontSize:"13px"}} onClick={()=>alert("only the admin can reply comments")}>Reply.</small>
               <small className="likebutton ml-2" style={{color:`${comments.likes && JSON.parse(comments.likes).includes(parseInt(this.props.userdetails.userId)) ? "orange" : "grey"}`}} >
                 <span className="fa fa-thumbs-up" onClick={(e)=>this.likecomment(e,{commentId:comments.ratingId,productId:comments.productId})} ></span>
                  <span className="ml-1">
                 {comments.likes && JSON.parse(comments.likes) ? JSON.parse(comments.likes).length : 0}
                  </span>
              </small>
               <small className="likebutton" style={{marginLeft:"40px",color:`${comments.dislikes && JSON.parse(comments.dislikes).includes(parseInt(this.props.userdetails.userId)) ? "orange" : "grey"}`}} >
                 <span className="fa fa-thumbs-down" onClick={(e)=>this.dislikecomment(e,{commentId:comments.ratingId,productId:comments.productId})}></span>
                  <span className="ml-1">
                  {comments.dislikes ? JSON.parse(comments.dislikes).length : 0}
                  </span>
               </small>
               </div>
               <br/>
               </div>
                   <br/>
               </div>            
             )}
             </div>
             </div>
    : <center> 
      <span style={{fontSize:"40px"}} className="text-muted far fa-comments"></span>
      <p>No Reviews Yet</p>
      </center>}
            </div>
        </div>  
  </div>
</div>
            </div>
         );
    }else{
     return(
         <div className="container">
        <div className="userratingdiv" style={{border: "1px solid lightgrey", borderRadius:"5px",position:"absolute",height:"60%",backgroundColor:"white"}}>
        <div className="row">
  <div className="col-12">
  <div className="row" id="comments" style={{margin:"2px"}}>
            <div className="col-12" style={{backgroundColor:`${this.props.userdetails.background}`,color:`${this.props.userdetails.background === "black" ? "white":"black"}`,padding:"10px"}}>
<small style={{fontSize:"15px"}}>Customer Reviews</small> 
<Link to={`/profile/${this.props.match.params.email}`}><span className="fa fa-times" style={{fontSize:"20px",float:"right"}}></span></Link>
             <hr/>
            {this.props.usercomments.length > 0 ?
             <div className="row">
             <div className="col-12 col-md-3">
                 <small style={{padding:"0px",margin:"0px"}}>RATING ({this.props.usercomments.length || 0} ) </small><br/>
            <small style={{fontSize:"20px",fontWeight:"bold"}}>{this.props.otheruserdetails.userrating}</small><br/>
          <div className="outer" style={{fontSize:"10px",padding:"0px"}}>
          <div className="inner" style={{width:`${this.props.otheruserdetails.userrating*20}%`}}>
             </div>
            </div>
             </div>
             <div className="col-12 col-md-9">
             <small style={{padding:"0px",margin:"0px"}}>REVIEWS/ COMMENTS ({this.props.usercomments.length || 0} ) </small>
             <button style={{float:"right",backgroundColor:"orange",color:"white"}} 
className="btn active" 
onClick={this.displaymodal} >
  <a href="#modaldiv"  style={{color:"white"}}>
    Rate
    </a>
  </button>
             <hr/>
             {this.props.usercomments.map((comments)=> 
               <div style={{lineHeight:"16px",fontSize:"12px"}}>       
                      <div className="row">
                       <div className="col-2" style={{padding:"0px",margin:"0px"}}>
                       <img src={comments.userImage ? `https://res.cloudinary.com/fruget-com/image/upload/profile/${comments.userImage}`: require(`./images/maleprofile.png`)} style={{width:"100%",padding:"0px 8px",margin:"3px 0px",height:"70px"}} alt="" />
                       </div>
                       <div className="col-10" style={{padding:"0px",margin:"0px"}}>
                       <small style={{padding:"5px 0px",fontWeight:"bold",color:"brown",fontSize:"12px"}}> {comments.userName} </small>
                       <small className="ml-2 text-muted">{formater(comments.time)}</small>
                       <small style={{float:"right",marginRight:"8px"}}><span className="fa fa-check-circle " style={{color:"orange",fontSize:"15px"}}></span><span className="dodo"> Verified Purchase</span></small>
                                        
                <div style={{padding:"2px"}}>
                    <small style={{padding:"3px 0px"}}>
                     <small style={{fontSize:"13px"}}> {comments.comment}</small></small>
                     <small style={{float:"right",clear:"left",padding:"8px"}}>
                        <div className="outer" style={{fontSize:"10px"}}>
                <div className="inner" style={{fontSize:"8px",width:`${(comments.rating)*20 || 0}%`}}>
                </div>
                </div></small><br/>
                     </div>
               <small  style={{fontSize:"13px"}} onClick={()=>alert("only the admin can reply comments")}>Reply.</small>
               <small className="likebutton ml-2" style={{color:`${comments.likes && JSON.parse(comments.likes).includes(parseInt(this.props.userdetails.userId)) ? "orange" : "grey"}`}} >
                 <span className="fa fa-thumbs-up" onClick={(e)=>this.likecomment(e,{commentId:comments.ratingId,productId:comments.productId})} ></span>
                  <span className="ml-1">
                 {comments.likes && JSON.parse(comments.likes) ? JSON.parse(comments.likes).length : 0}
                  </span>
              </small>
               <small className="likebutton" style={{marginLeft:"40px",color:`${comments.dislikes && JSON.parse(comments.dislikes).includes(parseInt(this.props.userdetails.userId)) ? "orange" : "grey"}`}} >
                 <span className="fa fa-thumbs-down" onClick={(e)=>this.dislikecomment(e,{commentId:comments.ratingId,productId:comments.productId})}></span>
                  <span className="ml-1">
                  {comments.dislikes ? JSON.parse(comments.dislikes).length : 0}
                  </span>
               </small>
               </div>
               <br/>
               </div>
                   <br/>
               </div>            
             )}
             </div>
             </div>
    : <center> 
      <span style={{fontSize:"40px"}} className="text-muted far fa-comments"></span>
      <p>No Reviews Yet</p>
      </center>}
            </div>
        </div>  
  </div>
</div>
        </div>
         </div>
     )
    }
}
}
 
const mapStateToProps=(store)=>{
    return{
        userdetails:store.userdetails,
        otheruserdetails:store.otheruserdetails,
        loading: store.loading,
        otherusernumOfRows:store.otherusernumOfRows,
        usercomments:store.usercomments
    }
     }
     const mapDispatchToProps=(dispatch)=>{
         return{
             viewuserdetails:(data)=>dispatch(viewuserdetails(data))
         }
     }
export default connect(mapStateToProps,mapDispatchToProps)(UserRatings);