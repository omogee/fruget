import React, { Component } from 'react';
import GoogleMapReact from "google-map-react"

class mapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            lat:"",
            lng:""
         }
         
    }
    
    componentDidMount=()=>{
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(position=>{
                this.setState({lat:position.coords.latitude,lng:position.coords.longitude})
            })
        }
    }
    render() { 
        console.log("lat",this.props.lat)
        return ( 
            <div style={{height:"650px",width:"800px"}}>
     <GoogleMapReact 
     bootstrapURLKeys={{key:"AIzaSyCcK91pYj645VtbOVXYMAbtbVJotq8wn0E"}}
     defaultCenter={{
         lat:this.props.lat,
         lng:this.props.lng
     }}
     defaultZoom={5}
     >  
     <Marker lat={this.state.lat} lng={this.state.lng}/>
     <Location lat={this.props.lat} lng={this.props.lng}/>
     
     </GoogleMapReact>
     </div>
         ); 
    }
}   
const coord={
    lat:6.5244905,
    lng:3.3792885
}

const Marker =mycoord=>{
    return(
        <span style={{color:"green",fontSize:"20px"}} className="fa fa-user"></span>
    )
}
const Location =coord=>{
    return(
        <span style={{color:"red",fontSize:"20px"}} className="fa fa-map-marker"></span>
    )
}
export default mapContainer;