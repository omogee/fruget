import React, { Component } from 'react';
import { connect } from 'react-redux';
import {allcategories, subcat2, subcat3} from "./store"
import {category} from "./state"
import "./main.css"
<<<<<<< HEAD
import axios from 'axios';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
=======
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac


class ProductUpload extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            category:"",
<<<<<<< HEAD
            categorycolor:"lightgrey",
            generalcategory:"",
            generalcategorycolor:"lightgrey",
            subcat1:"",
            subcat1color:"lightgrey",
=======
            generalcategory:"",
            subcat1:"",
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
            subcat2:"",
            subcat3:"",
            brand:"",
            entrytext:"",
            details:"",
<<<<<<< HEAD
            detailscolor:"lightgrey",
            color:"",
            size:"",
            sizecolor:"lightgrey",
=======
            color:"",
            size:"",
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
            feature1:"",
            feature2:"",
            feature3:"",
            feature4:"",
            feature5:"",
<<<<<<< HEAD
            price:null,
            pricecolor:"black",
            initialprice:null,
            operatingsystem:"",
            megapixel:"",
            currentsize:"",
            discount:null,
            model:"",
            power:"",
            aboutbrand:"",
            weight:"",
            files:[],
            singlefile:"",
            allDetails:[],
            displayifdetailsmatch:"none",
            uploadmessage:"",
            displayMessage:"none"
         }
    }
    componentDidMount=()=>{
    axios.get("http://localhost:5000/details/fetch/details")
    .then(res => this.setState({allDetails:res.data}))
    .catch(err => console.warn(err))

        this.props.allcategories()
    }
    changefile=(e)=>{
        let files =e.target.files
        console.log(files)
           if(this.state.files.length === 10){
               this.setState({uploadmessage:"file length exceeds 10"})
        } else if(files[0].type === "image/jpeg" || files[0].type === "image/png"){
 this.setState({uploadmessage:"",files:[... this.state.files, ...files],singlefile:files}) 
      }
        else{
            alert(files[0].type)
            this.setState({uploadmessage:"file format is not supported"})
        }
    }
=======
            price:"",
            discount:"",
            model:"",
            power:"",
            aboutbrand:""

         }
    }
    componentDidMount=()=>{
        this.props.allcategories()
    }
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
    change=(e)=>{
        this.setState({[e.target.name]:e.target.value}, ()=>{
    //        this.props.subcat2(this.state.selectedSubcat1)
    //    this.props.subcat3(this.state.selectedSubcat1)
<<<<<<< HEAD
  //  console.log(this.state.allDetails)
  this.state.allDetails.map(checker =>{
    if(checker.details === this.state.details){
       this.setState({displayifdetailsmatch:"block"})
    }
}) 
if(this.state.initialprice !== null  && this.state.price !== null){
 const discount = 100 - ((parseInt(this.state.price)/parseInt(this.state.initialprice))*100)+"%"
 this.setState({discount})
}
   })       
    }
    fillform=()=>{ 
        
        this.state.allDetails.map(checker =>{
            if(checker.details === this.state.details){
        console.log(checker)        
               this.setState({category:checker.generalcategory,generalcategory:checker.category,
subcat1:checker.subcat1,subcat2:checker.subcat2,subcat3:checker.subcat3 || null,brand:checker.brand,
entrytext:checker.entrytext,feature1:(JSON.parse(checker.features)).split(",")[0],
feature2:(JSON.parse(checker.features)).split(",")[1],feature3:(JSON.parse(checker.features)).split(",")[2],
feature4:(JSON.parse(checker.features)).split(",")[3],feature5:(JSON.parse(checker.features)).split(",")[4],
price:checker.sellingprice,model:checker.model,power:checker.power,weight:checker.weight,aboutbrand:checker.maintenance,
color:JSON.parse(checker.color),currentsize:checker.size,size:checker.sizesavail,files:Object.values(JSON.parse(checker.img1))}) 
}                                                                                                                                                                               
        })
    }
    popImage=(file)=>{
   const newState=  this.state.files.filter(statefiles =>{ 
         return statefiles.name!== file
   })
  this.setState({files:newState})
    }
    popImagebyfile=(file)=>{
        const newState=  this.state.files.filter(statefiles =>{ 
              return statefiles !== file
        })
       this.setState({files:newState})
         }
submit =(e)=>{
    e.preventDefault();
 //   let encryptedId=localStorage.getItem("vdhgaujhahjjsbhsjjbxhsfgwwhsywh726781819bahuhvgaygavvxgvxvvcvgsvsvid")
  // let id =encryptedId.split("%")[3]
 //  id = parseInt(id)
const features =`${this.state.feature1},${this.state.feature2}.${this.state.feature3},${this.state.feature4},${this.state.feature5}`
if(this.state.files.length === 0){
    this.setState({displayMessage:"block",Message:"No Image was selected"})
    window.scrollTo(0,  0)
  } else if(this.state.category.length === 0){
    this.setState({displayMessage:"block",categorycolor:"red",Message:" `category` is a required field"})
    window.scrollTo(0,  0)
  } else if(this.state.generalcategory.length === 0){
    this.setState({displayMessage:"block",generalcategorycolor:"red",Message:"`general category` is a required field"})
    window.scrollTo(0,  0)
    } else if(this.state.subcat1.length === 0){
    this.setState({displayMessage:"block",subcat1color:"red",Message:" `Sub-Category` is a required field"})
    window.scrollTo(0,  0)
  }else if(this.state.details.length === 0){
    this.setState({displayMessage:"block",detailscolor:"red",Message:" `Details` is a required field"})
    window.scrollTo(0,  0)
  }
  else if(this.state.price.length === 0){
     this.setState({displayMessage:"block",pricecolor:"red",Message: `" Price is a required field"`})
     window.scrollTo(0,  0)
 }else{
    this.setState({displayMessage:"none",pricecolor:"grey",Message: ``})
     const colours = this.state.color;
     const currentColor= this.state.color.split(",")[0].toString()
  
const formdata = new FormData();
  this.state.files.map(file=>{
    formdata.append("files",file)
  })
  formdata.append("generalcategory",this.state.category)
  formdata.append("category",this.state.generalcategory)
  formdata.append("subcat1",this.state.subcat1)
  formdata.append("subcat2",this.state.subcat2)
  formdata.append("subcat3",this.state.subcat3)
  formdata.append("brand",this.state.brand)
  formdata.append("entrytext",this.state.entrytext)
  formdata.append("details",this.state.details)
  formdata.append("currentColor",currentColor)
  formdata.append("colors",colours)
  formdata.append("size",this.state.size)
  formdata.append("currentsize",this.state.currentsize)
  formdata.append("features",features)
  formdata.append("price",this.state.price)
  formdata.append("initialprice",this.state.initialprice)
  formdata.append("discount",this.state.discount)
  formdata.append("model",this.state.model)
  formdata.append("weight",this.state.weight)
  formdata.append("power",this.state.power)
  formdata.append("aboutbrand",this.state.aboutbrand)
 // formdata.append("id",id)
  
  const config ={
      headers:{
          'content-type':'multipart/form-data'
      }
  }
  
  axios.post(`http://localhost:5000/products/seller/productupload`, formdata, config)
    .then(res => {
        if(res.data.failure){
            this.setState({Message:res.data.message,displayMessage:"block"})
        }else{
            this.setState({Message:res.data.message,displayMessage:"block",category:"",generalcategory:"",subcat1:"",subcat2:"",subcat3:"",brand:"", entrytext:"",
            details:"",feature1:"", feature2:"",feature3:"", feature4:"",feature5:"",price:"",model:"",power:"",weight:"",aboutbrand:"",
                color:"",currentsize:"",size:"",files:[]})
        }
           window.scrollTo(0, 0)
    })
    .catch(err => console.log(err))
  // console.log("formdata",formdata.get("files"),formdata.get("name"))
} 
}
 
    render() { 
=======
        })       
    }

    render() { 
        {Object.keys(category).map(cat =>
           console.log(cat)
            )}
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
        return ( 
            <div>
                <div className="container">
                <p> <span style={{color:"#004d99",textShadow: "0.5px 0.5px #ff0000"}}>Upload</span> Product On Fruget</p><small className="mr-5" style={{float:"right",fontSize:"20px"}}>30/30</small>
<<<<<<< HEAD
                <div className="row">
                <div className="col-12 col-md-6 alert alert-danger" style={{display:`${this.state.displayMessage}`, backgroundColor:`${this.state.displayColor}`}}>
                 <small>{this.state.Message}</small>
                 </div>
                </div>
                 <form action="" method="get" onSubmit={this.submit}>
=======
                 <div className="alert" style={{display:`${this.state.displayMessage}`, backgroundColor:`${this.state.displayColor}`}}>
                 <small>{this.state.Message}</small>
                 </div>
                 <form action="">
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
                     <div className="row">
                        <div className="col-12 col-md-6">
                            <div style={{padding:"10px"}}>
                            <label htmlFor="category">Category</label> 
<<<<<<< HEAD
<select type="text" style={{border:`1px solid ${this.state.categorycolor}`}} id="category" name="category" onChange={this.change} className="form-control" value={this.state.category}  placeholder="Enter Category e.g home Appliance,clothing, accessories etc">
=======
<select type="text" id="category" name="category" onChange={this.change} className="form-control" value={this.state.category}  placeholder="Enter Category e.g home Appliance,clothing, accessories etc">
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
   <option value="">select general category</option>
    {Object.keys(category).map(cat =>
            <option value={`${cat}`}>{cat}</option>
        )}
</select>
                        </div>
                        </div>
                        {this.state.category.length > 0 ?
                        <div className="col-12 col-md-6">
                        <div style={{padding:"10px"}}>
                            <label htmlFor="gencategory">Generalcategory</label>
<<<<<<< HEAD
   <select style={{backgroundColor:"white",border:`1px solid ${this.state.generalcategorycolor}`}} type="text" onChange={this.change} id="gencategory" name="generalcategory" className="form-control" value={this.state.generalcategory} >
=======
   <select style={{backgroundColor:"white"}} type="text" onChange={this.change} id="gencategory" name="generalcategory" className="form-control" value={this.state.generalcategory} >
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
   <option value="">select category</option>     
                         {category[`${this.state.category}`].map(subcat=>
                        <option value={`${subcat.name}`}>{subcat.name}</option>
                          )}
   </select>
                         </div>
                        </div> 
                    :null}
<<<<<<< HEAD
                    
                        <div className="col-12 col-md-6">
                        <div style={{padding:"10px"}}>
                         <label >Image Upload <b>{10-this.state.files.length}</b>/10</label>
                 <input type="file" multiple className="form-control" onChange={this.changefile}  name="files"/>
                         <small className="text-danger">Make sure image is clear enough and in jpeg or png format</small>
                         </div>
                        </div>
                        <div className="col-12">
                            <p className="text-danger animated bounce" style={{textTransform:"capitalize"}}>{this.state.uploadmessage}</p>
                        <div className="row" >
                       {this.state.files.length > 0 ? this.state.files.map((file)=>
                       <div key={file.lastmodified} className="col-3 col-md-2">
                      <span className="fa fa-times text-danger" onClick={file.name ?()=>this.popImage(file.name) : ()=>this.popImagebyfile(file)} style={{fontSize:"15px",fontWeight:"bolder"}}></span>
                       <img style={{width:"100%"}} src={file.name ? require(`./images/${file.name}`) : `https://res.cloudinary.com/fruget-com/image/upload/${this.state.category}/${this.state.generalcategory}/${file}`} alt=""/>
                       </div>
                       ) : <p className="text-danger">No image selected</p>}
                         </div>
                        </div>
=======
                        
                        <div className="col-12 col-md-6">
                        <div style={{padding:"10px"}}>
                        <label >Image Upload</label>
                         <input type="file"  className="form-control"  />
                         <small className="text-danger">Make sure image is clear enough and in jpeg or png format</small>
                         </div>
                        </div>
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
                        {this.state.generalcategory.length > 0 ?
                        <div className="col-12 col-md-6">
                        <div style={{padding:"10px"}}> 
                            <label htmlFor="subcat1">Select sub-category</label>
                            <select className="form-control" onChange={this.change} value={`${this.state.subcat1}`} name="subcat1" id="subcat1">
                           {category[`${this.state.category}`].map(cat=>
                             cat.name === this.state.generalcategory ?
                               cat.subcat1.map(cat1=>
                                <option value={`${cat1}`}>{cat1}</option>
                                ) : null
                            )}
                            </select>
                        </div>
                        </div>
                        : null}
                         {this.state.generalcategory.length > 0 ?
                        <div className="col-12 col-md-6">
                            <div style={{padding:"10px"}}>
                            <label htmlFor="subcat2" >Select sub-category2</label>
                            <select className="form-control" id="subcat2" name="subcat2" onChange={this.change} value={`${this.state.subcat2}`}>
                            {category[`${this.state.category}`].map(cat=>
                             cat.name === this.state.generalcategory ?
                               cat.subcat2.map(cat2=>
                                <option value={`${cat2}`}>{cat2}</option>
                                ) : null
                            )}
                            </select>
                            </div>
                        </div>
                        : null}
                         {this.state.generalcategory.length >  0 ?
                        <div className="col-12 col-md-6">
                            <div style={{padding:"10px"}}>
                            <label htmlFor="subcat3" >Select sub-category3</label>
                            <select className="form-control" name="subcat3" id="subcat3" onChange={this.change} value={`${this.state.subcat3}`}>
                            {category[`${this.state.category}`].map(cat=>
                             cat.name === this.state.generalcategory && cat.subcat3?
                               cat.subcat3.map(cat3=>
                                <option value={`${cat3}`}>{cat3}</option>
                                ) : null
                            )}
                            </select>
                            </div>
                        </div>
                        : null}
                        <div className="col-12 col-md-6">
                             <div style={{padding:"10px"}}>
                            <label htmlFor="brand">brand</label>
         <input type="text" id="brand"  name="brand" onChange={this.change} className="form-control" value={this.state.brand} placeholder="Note : No spacing inbetween E.g lg, hisense, tummyhilfiger"/>
                        </div>
                        </div>
                        <div className="col-12 col-md-6">
                             <div style={{padding:"10px"}}>
                            <label htmlFor="entrytext">Entry Text</label>
<input type="text" id="entrytext"  name="entrytext" onChange={this.change} className="form-control" value={this.state.entrytext} placeholder="convince your seller in less than 100 words.."/>
<small className="text-muted" style={{fontSize:"10px"}}>get off the wether with quality and affordable jackets from tummyhilfiger</small>
                        </div>
                        </div>
                        <div className="col-12 col-md-6">
                        <div style={{padding:"10px"}}>
                            <label htmlFor="details">details</label>
<<<<<<< HEAD
    <input type="text"  id="details" name="details" style={{border:`1px solid ${this.state.detailscolor}`}} onChange={this.change} className="form-control" value={this.state.details} placeholder="e.g bianco standing fan, lg copper double door refrigerator...etc(50)"/>
                        </div>
                        <small style={{display:`${this.state.displayifdetailsmatch}`}} className="text-danger">This product already exist on fruget community...<span className="btn btn-danger btn-sm" onClick={this.fillform}>Click Here</span> to update all columns then submit ro register as a seller of this product</small>                        
=======
    <input type="text"  id="details" name="details" onChange={this.change} className="form-control" value={this.state.details} placeholder="e.g bianco standing fan, lg copper double door refrigerator...etc(50)"/>
                        </div>
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
                        </div>
                        <div className="col-12 col-md-6">
                        <div style={{padding:"10px"}}>
                            <label htmlFor="colors">colours available <span style={{color:"red", fontSize:"20px"}}>*</span></label>
<<<<<<< HEAD
                         <input type="text" id="colors" name="color" onChange={this.change} style={{fontSize:"14px"}} className="form-control" value={this.state.color} placeholder="Enter all the colours available in your store seperated by commas ( , )"/>
                         <small style={{fontSize:"11px"}} className="text-danger">E.g red , blue, black e.t.c( ensure to begin with the color of this exact product)</small>
=======
                         <input type="text" id="colors" name="colors" onChange={this.change} style={{fontSize:"14px"}} className="form-control" value={this.state.color} placeholder="Enter all the colours available in your store seperated by commas ( , )"/>
                         <small style={{fontSize:"14px"}} className="text-muted">E.g red , blue, black...</small>
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
                        </div>
                        </div>
                        <div className="col-12 col-md-4">
                        <div style={{padding:"10px"}}>
<<<<<<< HEAD
                            <label htmlFor="currentsize">size <span style={{color:"red", fontSize:"20px"}}>*</span></label>
 <input type="text" id="currentsize" name="currentsize" style={{fontSize:"14px"}} onChange={this.change} className="form-control" value={this.state.currentsize} placeholder="Enter size of the this product"/>
                         <small style={{fontSize:"11px"}} className="text-danger">E.g 16 inches (ensure the unit of measurement is specified e.g inches,litres,kilogram,watts etc)</small>
                        </div>
                        </div>
                        <div className="col-12 col-md-4">
                        <div style={{padding:"10px"}}>
                            <label htmlFor="size">other size available </label>
 <input type="text" id="size" name="size" style={{fontSize:"14px"}} onChange={this.change} className="form-control" value={this.state.size} placeholder="Enter all the sizes available in your store seperated by commas ( , )"/>
                         <small style={{fontSize:"11px"}} className="text-danger">E.g 16 inches, 20 inches etc (ensure the units of measurement are specified e.g inches,litres,kilogram,watts etc)</small>
                        </div>
                        </div>
                        <div className="col-12 col-md-4">
                        <div style={{padding:"10px"}}>
                            <label htmlFor="operatingsystem">operating systems available<span style={{color:"red", fontSize:"20px"}}>{this.state.generalcategory === "computer & accessories" ? "*" : null}</span></label>
 <input type="text" id="operatingsystem" name="operatingsystem" style={{fontSize:"14px"}} onChange={this.change} className="form-control" value={this.state.operatingsystem} placeholder="Enter size of the this product"/>
                         <small style={{fontSize:"11px"}} className="text-danger"> (ensure the unit of measurement is specified)</small>
                        </div>
                        </div>
                        <div className="col-12 col-md-4">
                        <div style={{padding:"10px"}}>
                            <label htmlFor="megapixel">mega pixel<span style={{color:"red", fontSize:"20px"}}>{this.state.category === "phones" ? "*" : null}</span></label>
 <input type="text" id="megapixel" name="megapixel" style={{fontSize:"14px"}} onChange={this.change} className="form-control" value={this.state.megapixel} placeholder="Enter size of the this product"/>
                         <small style={{fontSize:"11px"}} className="text-danger"> (ensure the unit of measurement is specified)</small>
=======
                            <label htmlFor="size">size <span style={{color:"red", fontSize:"20px"}}>*</span></label>
 <input type="text" id="size" name="size" style={{fontSize:"14px"}} onChange={this.change} className="form-control" value={this.state.size} placeholder="Enter all the sizes available in your store seperated by commas ( , )"/>
                         <small style={{fontSize:"14px"}} className="text-muted">E.g 16 inches , 20 inches , 2 litres ...</small>
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
                        </div>
                        </div>
                        <div className="col-12 col-md-4">
                        <div style={{padding:"10px"}}>
                            <label htmlFor="feature1">Feature 1 <span style={{color:"red", fontSize:"20px"}}>*</span></label>
                         <input type="text" id="feature1" name="feature1" className="form-control" onChange={this.change} value={this.state.feature1} />
                        </div>
                        </div>
                        <div className="col-12 col-md-4">
                        <div style={{padding:"10px"}}>
                            <label htmlFor="feature2">Feature 2 <span style={{color:"red", fontSize:"20px"}}>*</span></label>
                         <input type="text" id="feature2" name="feature2" className="form-control" onChange={this.change} value={this.state.feature2} />
                        </div>
                        </div>
                        <div className="col-12 col-md-4">
                        <div style={{padding:"10px"}}>
                            <label htmlFor="feature3">Feature 3 <span style={{color:"red", fontSize:"20px"}}>*</span></label>
                         <input type="text" id="feature3" name="feature3" className="form-control" onChange={this.change} value={this.state.feature3} />
                        </div>
                        </div>
                        <div className="col-12 col-md-4">
                        <div style={{padding:"10px"}}>
                            <label htmlFor="feature4">Feature 4</label>
                         <input type="text" id="feature4" name="feature4" className="form-control" onChange={this.change} value={this.state.feature4} />
                        </div>
                        </div>
                        <div className="col-12 col-md-4">
                        <div style={{padding:"10px"}}>
                            <label htmlFor="feature5">Feature 5</label>
                         <input type="text" id="feature5"  name="feature5" className="form-control" onChange={this.change} value={this.state.feature5} />
                        </div>
                        </div>
<<<<<<< HEAD
                        <div className="col-12 col-md-3">
                        <div style={{padding:"10px"}}>
                            <label htmlFor="price">Selling Price <span style={{color:"red", fontSize:"20px"}}>*</span></label>
                         <input type="text" id="price" name="price" className="form-control" onChange={this.change} value={this.state.price}/>
    <small className="text-danger">Kindly enter the best release price as prices on fruget are not negotiable</small>
                        </div>
                        </div>
                        <div className="col-6 col-md-3">
                        <div style={{padding:"10px"}}>
                            <label htmlFor="initialprice">initial Price <span style={{color:"red", fontSize:"20px"}}>*</span></label>
                         <input type="text" id="initialprice" name="initialprice" className="form-control" onChange={this.change} value={this.state.initialprice}/>
                               <small className="text-danger">if there is a discount from {this.state.price || "selling price"} so customers can see it </small>
=======
                        <div className="col-6 col-md-3">
                        <div style={{padding:"10px"}}>
                            <label htmlFor="price">Price <span style={{color:"red", fontSize:"20px"}}>*</span></label>
                         <input type="text" id="price" name="price" className="form-control" onChange={this.change} value={this.state.price}/>
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
                        </div>
                        </div>
                        <div className="col-6 col-md-3">
                        <div style={{padding:"10px"}}>
                            <label htmlFor="discount">discount</label>
<<<<<<< HEAD
            <input type="text" id="discount" readOnly name="discount" className="form-control" Onchange={this.change} value={this.state.discount || "0%"} />
=======
            <input type="text" id="discount" name="discount" className="form-control" Onchange={this.change} value={this.state.discount} />
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
                        </div>
                        </div>
                        <div className="col-6 col-md-3">
                        <div style={{padding:"10px"}}>
                            <label htmlFor="model">model</label>
   <input type="text" id="model" name="model" className="form-control" onChange={this.change} value={this.state.model} placeholder="Enter the model number for easier identification"/>
                        </div>
                        </div>
                        <div className="col-6 col-md-3">
                        <div style={{padding:"10px"}}>
                            <label htmlFor="power">power</label>
 <input type="text" id="power" name="power" className="form-control" onChange={this.change} value={this.state.power} placeholder="Enter the wattage e.g 20w, 30w, 50w etc"/>
                        </div>
                        </div>
<<<<<<< HEAD
                        <div className="col-6 col-md-3">
                        <div style={{padding:"10px"}}>
                            <label htmlFor="weight">weight</label>
 <input type="text" id="weight" name="weight" className="form-control" onChange={this.change} value={this.state.weight} placeholder="Enter weight in Kg"/>
                        </div>
                        </div>
=======
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
                        <div className="col-12 col-md-6">
                        <div style={{padding:"10px"}}>
                            <label htmlFor="aboutbrand">About Brand </label>
         <textarea  id="aboutbrand" className="form-control" onChange={this.change} name="aboutbrand" value={this.state.aboutbrand} placeholder="Enter the wattage e.g 20w, 30w, 50w etc"/>
                        <small className="text-muted" style={{size:"10px"}}>You can save this to be used while uploading other products of same brand</small>
                        </div>
                        </div>
                     </div>
<<<<<<< HEAD
                     <div style={{padding:"10px"}}>
                  <button type="submit" className="btn btn-success">Upload</button>
                     </div>
=======
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
                 </form>
                </div>
            </div>
         );
    }
}
 const mapStateToProps=(store)=>{
     return{
         allcategory:store.allcategories,
         secondsubcat:store.subcat2,
         thirdsubcat:store.subcat3
     }
 }
 const mapDispatchToProps =(dispatch)=>{
     return{
        allcategories: ()=>dispatch(allcategories()),
        subcat2:(data)=>dispatch(subcat2(data)),
        subcat3:(data)=>dispatch(subcat3(data))
     }
 }
export default connect(mapStateToProps,mapDispatchToProps)(ProductUpload);