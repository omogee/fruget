import {createStore, applyMiddleware, bindActionCreators} from 'redux'
import thunk from 'redux-thunk'
import axios from 'axios'
import Cookies from 'js-cookie';
import { getCookie, setCookie, expireCookie,createCookieMiddleware } from 'redux-cookie';
import { push,  browserHistory } from 'react-router-redux';


const navigation={
  appCodeName:navigator.appCodeName,
  appVersion:navigator.appVersion,
  userAgent:navigator.userAgent,
  navigator:navigator.platform,
  product:navigator.product   
};

let mainToken = ""
let userdetails ={}
let isLoggedin = false
let status;
    if (Cookies.get("cm_pp")) {
      const myToken = Cookies.get("cm_pp")
let myMainTokenlen = parseInt(myToken.split("%")[0])
 let userIdlen = parseInt(myToken.split("%")[1])
 let userIdpos = parseInt(myToken.split("%")[2].charAt(0)+myToken.split("%")[2].charAt(1))
 let userId = myToken.slice(userIdpos, userIdpos+userIdlen)
  mainToken = myToken.slice(userIdpos+userIdlen, myMainTokenlen)
 let userId2 = mainToken.slice(userIdpos, userIdpos+userIdlen)

axios.get(`http://localhost:5000/details/product/display/userdetailsbyuserId?userId=${userId}`,{ headers: {"Authorization" : `Markaranter ${Cookies.get("token")}`,"markaranterTwo":mainToken,"navigation":JSON.stringify(navigation)} })
.then(res => {
  userdetails = res.data.userdetails;
  isLoggedin = res.data.isLogged;
  status= res.data.status
}) 
.catch(err => console.log(err))
    } else {
      //follow
    }
 const initialState ={
  numOfRows:"",
    products: [],
    searchedproducts:[],
    searchedbrands:[],
    searchedcolours:[],
    searchedsizes:[],
    searching:"",
    status:"none",
    statos:"",
    isLoggedin: false,
    brands: [],
    colours: [],
    vendor:[],
    inches: [],
    wattage:[],
    litres:[],
    price : 0,
    subcats:[],
    subcategories:[],
    filteredSuggestions:[],
    filteredbrands:[],
    suggestions:[],
    showSuggestions: false,
    inputval:"",
    cartMessage:"",
<<<<<<< HEAD
    cartHeader:"",
    cartOpacity:"1",
    display:"none",
    loading: false,
    categoryloading:false,
    allcategories:[],
    allcategory:[],
    allsubcat3:[],
    allsubcat2:[],
    allsubcat1:[],
=======
    display:"none",
    loading: false,
    allcategories:[],
    allsubcategories:[],
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
    subcat2:[],
    subcat3:[],
    mainbgcolor:"white",
    modalsidenavbarwidth:"0%",
<<<<<<< HEAD
    modaliconopacity:"0",
    navbariconopacity:"1",
=======
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
    modalsidenavbardisplay:"none",
    modalsidenavbarwidthmargin:"0%",
    save:"",
    productDetails:[],
<<<<<<< HEAD
    seller:[],
    sellerdetails:[],
    otherstores:[],
    userdetails: {},
    otheruserdetails:[],
    myprofiledetails:[],
    myprofileproducts:[],
    myprofilenumOfRows:"",
    sellerproducts:[],
    othersellerproducts:[],
=======
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
    similiarDetails:[],
    similiarBrandDetails:[],
    appDisplay:"",
    currentCategory:"",
<<<<<<< HEAD
    currentDetailcategory:"",
    currentProductIdcategory:"",
    min:null,
    max:null,
    overallMax:null,
    overallMin:null,
    checkfollow:null,
    followers:[],
    following:[],
    saveResponse:"", 
    saveHeader:"",
     saveOpacity:"1",
    unsaveResponse:"",
    displaysavemodal:"none",
    issave:"",
    savedProducts:[],
    sellernumOfRows:"",
    totalcartprice: 0,
    shoppingcart:[],
    submittedcartprice:0,
    submittedcart:[],
    orders:[],
    totalorderprice:0,
    invoicebuyer:[],
    invoiceseller:[],
    invoicecart:[],
    clearcartresponse:"",
    searchedlitres:[],
    searchedinches:[],
    searchedwattage:[],
    searchedvendor:[],
    messages:[],
    messageproductDetails:[],userconnection:[],
    services:[],
    categoryModalclass:"undisplaydiv",
    categoryModalSmallwidth:"0%",
    categoryModalheight:"0%",
    categoryModaldisplay:"none",
    colormodaldisplay:"none",
    ratingmodaldisplay:"none",
    clearcartdisplay:"none",
    clearcartvendor:"",
    clearcartId:"",
    clearcartdetails:"",
    clearcartimage:"",
    clearcartgencat:"",clearcartcat:"",clearcartproductId:"",
    clearcartsellerratingdisplay:"none",
    clearcartproductratingdisplay:"none",
    settingsheight:"0px",
    productcomments:[],
    usercomments:[],
    displayclearcartsuccess:"none",
    otherusernumOfRows:null,
    groupedorders:[],
    groupedordersprice:"",
    connectedclients:[],
    otheruserlastseen:"",
    allmessages:[],
    sender:[],
    messagedisplay:"none",
    noofunreadmessages:0,
    noofcontacts:0,
    redirect:false
  }

=======
    currentDetailcategory:""
}
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
const reducer= (state = initialState, action)=>{
  
  if(action.type === "redirect"){
    state ={...state,redirect:true}
    return state;
  }
  if(action.type === "unredirect"){
    state ={...state,redirect:false}
    return state;
  }
  if(action.type === "unloading"){
    state ={...state,loading:false}
    return state;
  }
  if(action.type === "ratevendor"){
    state ={...state,categoryloading:false}
    return state;
  }
  if(action.type === "rateproduct"){
    state ={...state,categoryloading:false}
    return state;
  }
  if(action.type === "undisplayclearcartmodal"){
    state ={...state,clearcartdisplay:"none",categoryloading:false}
    return state;
  }
 if(action.type === "increasesettingsheight"){
   state ={...state, settingsheight:"100%"}
   return state;
 }
 if(action.type === "decreasesettingsheight"){
   state ={...state,settingsheight:"0px"}
   return state;
 }
  if(action.type === "setdisplayvendorrating"){
    state = {...state,clearcartsellerratingdisplay:"block",categoryloading:false}
    return state;
  }
  if(action.type==="undisplayclearcartsuccess"){
    state ={...state,displayclearcartsuccess:"none",categoryloading:false}
    return state;
  }
  if(action.type==="undisplaysellerrating"){
    state ={...state,clearcartsellerratingdisplay:"none",categoryloading:false}
    return state;
  }
if(action.type === "setdisplayproductrating"){
  state ={...state, loading:false,clearcartproductratingdisplay:"block",categoryloading:false}
  return state;
}
  if(action.type === "confirmtoclearcart"){
    state={...state,clearcartdisplay:"block",categoryloading:false,clearcartvendor:action.payloadvendor,clearcartId:action.payloadcartId,
  clearcartdetails:action.payloaddetails,clearcartimage:action.payloadimage,clearcartgencat:action.payloadgencat,
clearcartcat:action.payloadcat,clearcartproductId:action.payloadproductId}
return state;
  }
  if(action.type === "undisplayproductrating"){
    state ={...state,clearcartproductratingdisplay:"none",categoryloading:false}
    return state;
  }
  if(action.type === 'showcolormodal'){
    state = {...state,colormodaldisplay:"block"}
    return state;
}
if(action.type === 'unshowcolormodal'){
  state = {...state,colormodaldisplay:"none"}
  return state;
}
  if(action.type === 'displaycategorymodal'){
    state = {...state,loading:false,categoryModaldisplay:"block",categoryModalheight:"50%",categoryModalclass:"servicediv",categoryModalSmallwidth:"80%"}
    return state;
}
if(action.type === 'undisplaycategorymodal'){
  state = {...state,categoryModalheight:"0%",categoryModalclass:"undisplaydiv",categoryModaldisplay:"none",categoryModalSmallwidth:"0%"}
  return state;
}
  if(action.type === 'changecolor'){
    state = {...state,userdetails:action.payload[0]}
    return state;
}
 if(action.type === 'services'){
    state = {...state,services:action.payload}
    return state;
}
  if(action.type === 'fetchconnections'){
    state = {...state, userconnection :action.payload}
    return state;
  }
  if(action.type === 'sendmessage'){
    state = {...state}
    return state;
  }
  if(action.type === 'fetchmessage'){
    state = {...state, messages:action.payload}
    return state;
  }
    if(action.type === 'loading'){
      state = {...state , loading:true}
<<<<<<< HEAD
      return state;
    }
    if(action.type === 'catloading'){
      state = {...state , categoryloading:true}
      return state;
    }
    else if(action.type === 'loaded'){
        state = {...state,mainbgcolor: "white",currentCategory:action.payload, products: action.payloadOne,currentPage:action.payloadThree,totalPages:action.payloadTwo,numOfRows:action.payloadFour,max:action.payloadmax,min:action.payloadmin,overallMax:action.payloadoverallMax,overallMin:action.payloadoverallMin}
        return state;
      }
      //getfilteredSuggestions
      else if(action.type === 'vendorproductsloaded'){
        state = {...state,mainbgcolor: "white",loading:false,currentCategory:action.payload, products: action.payloadOne,currentPage:action.payloadThree,totalPages:action.payloadTwo,numOfRows:action.payloadFour,max:action.payloadmax,min:action.payloadmin,overallMax:action.payloadoverallMax,overallMin:action.payloadoverallMin}
        console.log("no need for filter for vendor products", action.payloadFour)
=======
      return state;
    }
    else if(action.type === 'loaded'){
        state = {...state,mainbgcolor: "white",loading: false,currentCategory:action.payload, products: action.payloadOne,currentPage:action.payloadThree,totalPages:action.payloadTwo,numOfRows:action.payloadFour}
        console.log("no need for filter", action.payloadOne)
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
        return state;
      }
      else if(action.type==='setLoadingtoTrue'){
        state ={...state, loading: true}
        return state;
      }
      else if(action.type === 'filteritems'){
        state = {...state , status: 'filtering',loading:false, products: action.payload,currentPage:action.payloadThree, totalPages:action.payloadTwo,numOfRows:action.payloadFour,max:action.payloadmax,min:action.payloadmin,overallMax:action.payloadoverallMax,overallMin:action.payloadoverallMin}
        return state;
      }
      else if(action.type === 'filtervendoritems'){
        state = {...state , status: 'filtering',loading:false, products: action.payload,currentPage:action.payloadThree, totalPages:action.payloadTwo,numOfRows:action.payloadFour,max:action.payloadmax,min:action.payloadmin,overallMax:action.payloadoverallMax,overallMin:action.payloadoverallMin}
        return state;
      }
      else if(action.type === 'searched'){
        state = {...state , status: 'searched', test: action.payload}
        return state;
      }
      else if(action.type === 'searching'){
        state = {...state , status: 'searching', searchedproducts: action.payload,currentPage:action.payloadThree, totalPages:action.payloadTwo,numOfRows:action.payloadFour}
        return state;
      }
      else if(action.type === 'submitsearched'){
        state = {...state , status: 'submitsearched', test: action.payload}
        return state;
      }
      else if(action.type === 'submitsearching'){
        state = {...state , status: 'submitsearching',loading:false,searchedproducts: action.payload,currentPage:action.payloadThree, totalPages:action.payloadTwo,numOfRows:action.payloadFour}
        return state;
      }
      else if(action.type === 'brandloaded'){
        state = {...state , status: 'brandloaded', brands: action.payload}
        console.log(action.payload)
        return state;
      } 
      else if(action.type === 'vendorbrandloaded'){
        state = {...state , loading:false,status: 'brandloaded', brands: action.payload}
        console.log(action.payload)
        return state;
      }
      else if(action.type === 'categoryloaded'){
        state = {...state , status: 'categoryloaded', subcategories: action.payload}
        return state;
      }
      else if(action.type === 'colorloaded'){
        state = {...state , status: 'colorloaded', colours: action.payload}
        return state;
      }
      else if(action.type === 'vendorcolorloaded'){
        state = {...state ,loading:false, status: 'colorloaded', colours: action.payload}
        return state;
      }
      //saveItem
      else if(action.type === 'sellerbycategory'){
        state = {...state , status: 'sellerbycategory', vendor: action.payload}
        return state;
      }
      else if(action.type === 'priceloaded'){
        state = {...state , status: 'priceloaded', price: action.payload}
        return state;
      }
      else if(action.type === 'sizeloaded'){
        state = {...state , status: 'sizeloaded',inches: action.payloadInches,litres: action.payloadLitres,wattage:action.payloadWattage}
        return state;
      }
      else if(action.type === 'vendorsizeloaded'){
        state = {...state ,loading:false,status: 'sizeloaded',inches: action.payloadInches,litres: action.payloadLitres,wattage:action.payloadWattage}
        return state;
      }
      else if(action.type === 'brandsearched'){
        state = {...state , status: 'brandloaded', searchedbrands: action.payload}
        return state;
      }
      else if(action.type === 'colorsearched'){
        state = {...state , status: 'colorloaded', searchedcolours: action.payload}
        return state;
      }
      else if(action.type === 'sizesearched'){
        state = {...state , status: 'sizeloaded', searchedsizes: action.payload}
        return state;
      }
      else if(action.type === 'submitbrandsearched'){
        state = {...state , status: 'brandloaded', searchedbrands: action.payload}
        return state;
      }
      else if(action.type === 'submitcolorsearched'){
        state = {...state , status: 'colorloaded', searchedcolours: action.payload}
        return state;
      }
      else if(action.type === 'submitvendorsearched'){
        state = {...state , status: 'vendorloaded', searchedvendor: action.payload}
        return state;
      } 
      else if(action.type === 'submitsizesearched'){
        state = {...state , status: 'sizeloaded', searchedinches: action.payloadInches,searchedlitres:action.payloadLitres,searchedwattage:action.payloadWattage}
        return state;
      } 
      else if(action.type === 'addedtocart'){
        state = {...state, status:'addedtocart', cartMessage : action.payloadOne,cartHeader:action.payloadheader, display:action.payloadTwo,shoppingcart:action.payloadcart}
        return state;
      }
      else if(action.type === 'fetchinvoice'){
        state = {...state,status:'fetchinvoice',invoicecart:action.payloadcart,invoicebuyer:action.payloadbuyer,invoiceseller:action.payloadseller}
        return state;
      }
      else if(action.type === 'fetchcartbyinvoiceId'){
        state = {...state,status:'fetchcartbyinvoiceId',invoicecart:action.payloadcart,invoicebuyer:action.payloadbuyer,invoiceseller:action.payloadseller}
        console.log("fetching invoice")
        return state;
      }
      else if(action.type === 'fetchorders'){
        state = {...state,status:'fetchorderscart',orders:action.payloadorders, totalorderprice:action.payloadtotalorderprice}
        return state;
      }
      //addtocart
      else if(action.type === 'fetchgroupedcartbyinvoiceId'){
        state = {...state,status:'fetchgroupedcartbyinvoiceId',groupedorders:action.payloadcart,groupedordersprice:action.payloadtotalprice}
        return state; 
      }
      else if(action.type === 'submittedcart'){
        state = {...state,status:'fetchsubmittedcart',submittedcart:action.payloadsubmittedcart,submittedcartprice:action.payloadtotalprice}
        return state;
      }
      else if(action.type === 'submittingshoppingcart'){
        state = {...state, loading:false}
        return state;
      }
      else if(action.type === 'clearcart'){
        state = {...state, categoryloading:false,clearcartdisplay:"none", clearcartresponse: action.payload,displayclearcartsuccess:"block",submittedcart:action.payloadcart}
        return state;
      }
      else if(action.type === 'submitshoppingcart'){
        state = {...state, loading:false, cartMessage : action.payload, display:action.payloadTwo}
        return state;
      }else if(action.type === 'shoppingcart'){
        state = {...state, status:'shoppingcart', shoppingcart : action.payloadcart,restart:false, totalcartprice:action.payloadtotalprice}
        return state;
      } 
      else if(action.type === 'increaseshoppingcart'){
        state = {...state, shoppingcart: action.payloadcart,totalcartprice:action.payloadtotalprice, loading:false}
        return state;
      }   
      else if(action.type === 'decreaseshoppingcart'){
        state = {...state,shoppingcart: action.payloadcart,totalcartprice:action.payloadtotalprice, loading:false}
        return state;
      }
      else if(action.type === 'removeshoppingcart'){
        state = {...state, loading:false}
        return state;
      }  
      else if(action.type === 'undisplaymodal'){
        state ={...state, status:'undisplaymodal',cartOpacity:"0"}
        return state;
      }
      else if(action.type === "completelyundisplaymodal"){
        state ={...state, display:"none"}
        return state;
      }
      else if(action.type === 'allcategories'){
        state = {...state, status:'allcategories',categoryloading:false, allcategories : action.payload}
        return state;
      }
      else if(action.type === 'allsubcategories'){
        state = {...state, status:'allsubcategories',categoryloading:false, allcategory: action.payloadcategory,allsubcat1:action.payloadsub1,allsubcat2:action.payloadsub2,allsubcat3:action.payloadsub3}
        return state;
      }
      else if(action.type === 'allvendorsubcategories'){
        state = {...state, status:'allsubcategories', loading:false, allcategory: action.payloadcategory,allsubcat1:action.payloadsub1,allsubcat2:action.payloadsub2,allsubcat3:action.payloadsub3}
        return state;
      }  
      else if(action.type === 'showmodalsidenavbar'){
        state = {...state, status:'showmodalsidenavbar', mainbgcolor: "rgba(242,242,242,0.7)",modalsidenavbarwidth:"50%",modalsidenavbarwidthmargin:"0%",navbariconopacity:"0",modaliconopacity:"1",modalsidenavbardisplay:"block"}
        return state;  
      }
      else if(action.type === 'unshowmodalsidenavbar'){
        state = {...state, status:'unshowmodalsidenavbar',mainbgcolor: "white",modalsidenavbarwidth:"0%", modalsidenavbarwidthmargin:"0%",modaliconopacity:"0",navbariconopacity:"1",modalsidenavbardisplay:"none"}
        return state;
      }
      else if(action.type === 'fetchsavedItembyemail'){
        state = {...state, status:'fetchingsaveditem',savedProducts:action.payload}
        return state;
      }
      else if(action.type === 'fetchsavedItembyuserId'){
        state = {...state, status:'fetchingsaveditem',savedProducts:action.payload}
        return state;
      }
      else if(action.type === 'check-save-item'){
        state = {...state, status:'checkingsavingitem',issave:action.payload}
        return state;
      }
      else if(action.type === 'save-item'){
        state = {...state, loading:false,saveOpacity:"1",categoryloading:false,status:'savingitem',saveResponse:action.payload,saveHeader:action.payloadheader,userdetails:action.payloaduser, displaysavemodal:"block"}
        console.log("saved item",action.payloaduser)
        return state;
      }
    //submitsearcher
      else if(action.type === 'unsave-item'){
        state = {...state, loading:false,categoryloading:false,status:'unsavingitem',unsaveResponse:action.payload}
        return state;
      }
      else if(action.type === 'undisplaysavemodal'){
        state = {...state, loading:false,status:'undisplaysavemodal',saveOpacity:"0"}
        return state;
      }
      else if(action.type === "completelyundisplaysavemodal"){
        state ={...state, displaysavemodal:"none"}
        return state;
      }
      else if(action.type==="dislikecomment"){
        state ={...state, productcomments:action.payloadcomments,categoryloading:false}
        return state;
      }
      else if(action.type==="likecomment"){
        state ={...state, productcomments:action.payloadcomments,categoryloading:false}
        return state;
      }
      else if(action.type === 'detailsloaded'){
        state = {...state, status:'detailsloaded',similiarBrandDetails:action.payloadSimiliar,currentProductIdcategory:action.payloadTwo,currentDetailcategory:action.payloadOne,productDetails:action.payload,similiarDetails:action.payloadverySimiliar,productcomments:action.payloadcomments}
        return state;
      }
      else if(action.type === 'sellerloaded'){
        state = {...state, status:'sellerloaded',seller:action.payload,messageproductDetails:action.payloadItem, otherstores:action.payloadotherstores}
        return state;
      }
     else if(action.type === 'sellerdetailsloaded'){   
       state = {...state, status:'sellerdetailsloaded',sellernumOfRows:action.payloadnumOfRows[0].numOfRows,sellerdetails: action.payloadseller[0],sellerproducts:action.payloadproducts}
       console.log(action.payloadnumOfRows)
       return state;
     }     
       else if(action.type === 'userdetailsbyid'){  
        state = {...state,failed:action.payloadFailure,statos:action.payloadstatus,isLoggedin:action.payloadisLoggedin,sellernumOfRows:action.payloadnumOfRows[0].numOfRows,userdetails: action.payloaduser,sellerproducts:action.payloadproducts}      
        return state;
        }
        else if(action.type === 'otheruserdetailsbyid'){  
          state = {...state,failed:action.payloadFailure,statos:action.payloadstatus,otheruserdetails: action.payloaduser}      
          return state;
          }      
        else if(action.type === 'errorOutput'){
      //    alert(`${action.payloaderr} payloaderr`)
        }
        //fetchconnections:
       else if(action.type === 'userdetailsbyemail'){   
        state = {...state, status:'userdetailsbyemail',usercomments:action.payloadcomments,otherusernumOfRows:action.payloadnumOfRows[0].numOfRows,otheruserdetails: action.payloadotheruser,othersellerproducts:action.payloadproducts}
        return state;
        }
        else if(action.type === 'myprofiledetailsloaded'){   
          state = {...state, status:'myprofiledetailsloaded',myprofilenumOfRows:action.payloadnumOfRows[0].numOfRows,myprofiledetails: action.payloaduser[0],myprofileproducts:action.payloadproducts}
          console.log(action.payloadnumOfRows)
          return state;
          }
       else if(action.type === 'followseller'){   
        state = {...state, status:'followseller',categoryloading:false,userdetails:action.payloaduser,seller:action.payloadseller}
        return state;
      }
      //searcher
      else if(action.type === 'followservice'){   
        state = {...state, status:'followservice',categoryloading:false,userdetails:action.payloaduser,service:action.payloadservice}
        return state;
      }
      else if(action.type === 'fetchfollowers'){    
        state = {...state, status:'fetchfollowers', followers:action.payload}
        console.log(action.payload)
        return state;
      }
      else if(action.type === 'fetchfollowing'){   
        state = {...state, status:'fetchfollowing', following:action.payload}
        console.log(action.payload)
        return state;
      }
      else if(action.type === 'displayApp'){   
        state = {...state, status:'displayApp', appDisplay: "",showSuggestions:false}
        return state;
      }
      else if(action.type === 'undisplayApp'){   
        state = {...state, status:'undisplayApp', appDisplay: "none"}
        return state;
      }
      else if(action.type === 'getsubcat2'){   
        state = {...state, status:'gettingsubcat2', subcat2: action.payload}
        return state;
      }
      else if(action.type === 'getsubcat3'){   
        state = {...state, status:'gettingsubcat3', subcat3: action.payload}
        console.log(action.payload)
        return state;
      }      
      else if(action.type === "connectedusers"){
        state ={...state,connectedclients:action.payloadconnusers}
        return state;
      }
      else if(action.type === "setlastseen"){
        state ={...state,otheruserlastseen:action.payloaddata}
        return state;
      }
      else if(action.type === "pushmessages"){
        state ={...state,messagedisplay:"block",allmessages:[...state.allmessages,action.payloaddata]}
        return state;
      }
      //searcher
      else if(action.type === "viewsender"){
        state ={...state,sender:action.payloaduser}
        return state;
      }
      else if(action.type === "fetchunreadmessages"){
        state ={...state,noofunreadmessages:action.payload,noofcontacts:action.payloadcontacts} 
        return state;
      }
      else if(action.type === "unshowsuggestions"){
        state ={...state, showSuggestions:false,inputval:""}
        return state;
      }
      else if(action.type === 'addedtocart'){
        state = {...state, status:'addedtocart', cartMessage : action.payloadOne, display:action.payloadTwo}
        return state;
      }
      else if(action.type === 'undisplaymodal'){
        state ={...state, status:'undisplaymodal', display:action.payload}
      }
      else if(action.type === 'allcategories'){
        state = {...state, status:'allcategories',loading:false, allcategories : action.payload}
        return state;
      }
      else if(action.type === 'allsubcategories'){
        state = {...state, status:'allsubcategories', loading:false, allcategories: action.payload}
        return state;
      }
      else if(action.type === 'showmodalsidenavbar'){
        state = {...state, status:'showmodalsidenavbar', mainbgcolor: "rgba(242,242,242,0.7)",modalsidenavbarwidth:"95%",modalsidenavbarwidthmargin:"0%",modalsidenavbardisplay:"block"}
        return state;
      }
      else if(action.type === 'unshowmodalsidenavbar'){
        state = {...state, status:'unshowmodalsidenavbar',mainbgcolor: "white",modalsidenavbarwidth:"0%", modalsidenavbarwidthmargin:"0%",modalsidenavbardisplay:"none"}
        return state;
      }
      else if(action.type === 'checkifsaved'){
        state = {...state, status:'checkingifsaved',save:action.payload}
        return state;
      }
      else if(action.type === 'detailsloaded'){
        state = {...state, status:'detailsloaded',currentDetailcategory:action.payloadOne,productDetails:action.payload,loading:false}
        console.log("am loaded")
        return state;
      }
      else if(action.type === 'similiarproducts'){
        state = {...state, status:'similiarproductsloaded',similiarDetails:action.payload}
        return state;
      }
      else if(action.type === 'similiarproductsbybrand'){   
        state = {...state, status:'similiarbrandsloaded', similiarBrandDetails: action.payload}
        return state;
      }
      else if(action.type === 'undisplayApp'){   
        state = {...state, status:'undisplayApp', appDisplay: "none"}
        return state;
      }
      else if(action.type === 'getsubcat2'){   
        state = {...state, status:'gettingsubcat2', subcat2: action.payload}
        return state;
      }
      else if(action.type === 'getsubcat3'){   
        state = {...state, status:'gettingsubcat3', subcat3: action.payload}
        console.log(action.payload)
        return state;
      }
      else if(action.type === 'suggestionloaded'){
<<<<<<< HEAD
        const suggestions = action.payload;         
=======
        const suggestions = action.payload;
         
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
        var filteredSuggestions =[];
        var filteredbrands =[];
       const inputval = action.input;
       
      state = {...state , status: 'suggestionloaded', suggestions: action.payload,inputval, filteredSuggestions,filteredbrands, showSuggestions: true}
      return state;
    }
    return state;
  }
  //getvendorsidenav,allvendorsubcategories,checkvendorfilter
const store = createStore(reducer, applyMiddleware(thunk,createCookieMiddleware(Cookies)))
export const setredirect=()=>{
  return({type:"redirect"})
}
export const unsetredirect=()=>{
  return(dispatch)=>{
    dispatch({type:"unredirect"})
  }
}
export const unshowsuggestions =()=>{ 
  return(
    {type: 'unshowsuggestions'}
  )
}
export const test =()=>{ 
  return(
    {type: 'test'}
  )
}
<<<<<<< HEAD
export const connectedusers =(data)=>{
  return(dispatch)=>{
    dispatch({type:"connectedusers",payloadconnusers:data})
  }
}
export const setlastseen =(data)=>{
  return(dispatch)=>{
    dispatch({type:"setlastseen",payloaddata:data})
  }
}
export const pushmessages=(data)=>{
 return(dispatch)=>{
   dispatch({type:"pushmessages",payloaddata:data})
 }
}
export const fetchunreadmessages =(data)=>{
  return(dispatch)=>{
    axios.get(`http://localhost:5000/details/messages/unread`,{ headers: {"Authorization" : `Markaranter ${Cookies.get("token")}`,"markaranterTwo":mainToken,"navigation":JSON.stringify(navigation)} })
    .then(res => dispatch({type:"fetchunreadmessages",payload:res.data[0].unread,payloadcontacts:res.data[0].contacts}))
      .catch(err =>{
      console.log(JSON.stringify(err.response.data.error),(JSON.stringify(err.response.status)),(JSON.stringify(err.response.headers)))
     // dispatch({type: 'fetchingcarterr', payload: err})
      if(err.response.status != 200){
        dispatch({type:"unloading"})
        dispatch({type: 'redirect'})
      }
    })
  }
}
export const viewsender =(data)=>{
  return(dispatch)=>{
    axios.get(`http://localhost:5000/details/product/display/otheruserdetailsbyuserId?userId=${data}`,{ headers: {"Authorization" : `Markaranter ${Cookies.get("token")}`,"markaranterTwo":mainToken,"navigation":JSON.stringify(navigation)} })
    .then(res => dispatch({type:"viewsender",payloaduser:res.data.otheruserdetails}))
      .catch(err =>{
      console.log(JSON.stringify(err.response.data.error),(JSON.stringify(err.response.status)),(JSON.stringify(err.response.headers)))
     // dispatch({type: 'fetchingcarterr', payload: err})
      if(err.response.status != 200){
        dispatch({type:"unloading"})
        dispatch({type: 'redirect'})
      }
    })
  }
}
export const dislikecomment =(data)=>{
  return(dispatch)=>{
    dispatch({type:"catloading"})
    axios.get(`http://localhost:5000/customer/dislike/comment?commentId=${data.commentId}&productId=${data.productId}`, { headers: {"Authorization" : `Markaranter ${Cookies.get("token")}`,"markaranterTwo":mainToken,"navigation":JSON.stringify(navigation)} })
    .then(res => dispatch({type:"dislikecomment", payloadcomments:res.data}))
    .catch(err => dispatch({type:"err", payload:err}))
  }
}
export const likecomment =(data)=>{
  return(dispatch)=>{
    dispatch({type:"catloading"})
    axios.get(`http://localhost:5000/customer/like/comment?commentId=${data.commentId}&productId=${data.productId}`, { headers: {"Authorization" : `Markaranter ${Cookies.get("token")}`,"markaranterTwo":mainToken,"navigation":JSON.stringify(navigation)} })
    .then(res => dispatch({type:"likecomment", payloadcomments:res.data}))
    .catch(err => dispatch({type:"err", payload:err}))
  }
}
//getdetails
export const unloading =()=>{
  return(dispatch)=>{
   dispatch({type:"unloading"})
  }
}

export const undisplayclearcartsuccess =()=>{
  return(dispatch)=>{
  dispatch({type:"undisplayclearcartsuccess"})
  }
}
export const ratevendor =(data)=>{
  return(dispatch)=>{
    dispatch({type:"catloading"})
  axios.post(`http://localhost:5000/details/${data.vendor}/rate/vendor`, {data: JSON.stringify(data)},
  { headers: {"Authorization" : `Markaranter ${Cookies.get("token")}`,"markaranterTwo":mainToken,"navigation":JSON.stringify(navigation)} })
  .then(res => dispatch({type:"ratevendor",payload:res.data}))
  .catch(err => dispatch({type:"err"})) 

  }
}
export const rateproduct =(data)=>{
  return(dispatch)=>{
    dispatch({type:"catloading"})
  axios.post(`http://localhost:5000/details/${data.details}/rate/product`, {data: JSON.stringify(data)},
  { headers: {"Authorization" : `Markaranter ${Cookies.get("token")}`,"markaranterTwo":mainToken,"navigation":JSON.stringify(navigation)} })
  .then(res => dispatch({type:"rateproduct",payload:res.data}))
  .catch(err => dispatch({type:"err"})) 

  }
}
export const increasesettingsheight=()=>{
  return(dispatch)=>{
    dispatch({type:"catloading"})
    dispatch({type:"increasesettingsheight"})
  }
}
export const decreasesettingsheight =()=>{
  return(dispatch)=>{
    dispatch({type:"catloading"})
    dispatch({type:"decreasesettingsheight"})
  }
}
export const setdisplayvendorrating =()=>{
  return(dispatch)=>{
    dispatch({type:"catloading"})
    dispatch({type:"setdisplayvendorrating"})
  }
}
export const undisplayclearcartmodal =()=>{
  return(dispatch)=>{
    dispatch({type:"undisplayclearcartmodal"})
  }
}
export const undisplaysellerrating =()=>{
  return( dispatch)=>{
    dispatch({type:"undisplaysellerrating"})
  }
}

export const setdisplayproductrating=()=>{
  return(dispatch)=>{
    dispatch({type:"catloading"})
    dispatch({type:"setdisplayproductrating"})
  }
}
export const confirmtoclearcart =(data)=>{
  return(dispatch)=>{
    dispatch({type:"catloading"})
    dispatch({type:"confirmtoclearcart",payloaddisplay:"block",payloadvendor:data.vendor,payloadcartId:data.cartId,
  payloaddetails:data.details,payloadimage:data.image,payloadgencat:data.gencat,payloadcat:data.cat,
payloadproductId:data.productId})
  }
}
export const undisplayproductrating =()=>{
  return(dispatch)=>{
    dispatch({type:"undisplayproductrating"})
  }
}
export const unshowcolormodal =()=>{
  return(dispatch)=>{
    dispatch({type:"unshowcolormodal"})
  }
}
export const showcolormodal =()=>{
  return(dispatch)=>{
    dispatch({type:"showcolormodal"})
  }
}
export const displaycategorymodal =()=>{
  return(dispatch)=>{
   // dispatch({type:"loading"})  
    dispatch({type:"displaycategorymodal"})
  }
}
export const undisplaycategorymodal =()=>{
  return(dispatch)=>{
  //  dispatch({type:"loading"})  
    dispatch({type:"undisplaycategorymodal"})
  }
}
export const undisplaysavemodal =()=>{
  return(dispatch)=>{
    dispatch({type:"undisplaysavemodal"})
    setTimeout(()=>dispatch({type:"completelyundisplaysavemodal"}),700)
  }
}
export const services =(data)=>{
  return(dispatch)=>{
  //  dispatch({type:"loading"})  displaycategorymodal
    axios.get(`http://localhost:5000/customer/fetch/services?lat=${data.lat}&long=${data.long}`)
    .then(res => dispatch({type:"services", payload:res.data}))
    .catch(err => dispatch({type:"err", payload:err}))
   }
}
export const changecolor =(data)=>{
  return(dispatch)=>{
    dispatch({type:"loading"})  
    axios.get(`http://localhost:5000/customer/change/bgcolor?color=${data.color}`, { headers: {"Authorization" : `Markaranter ${Cookies.get("token")}`,"markaranterTwo":mainToken,"navigation":JSON.stringify(navigation)} })
    .then(res => dispatch({type:"changecolor", payload:res.data}))
    .catch(err =>{
      console.log(JSON.stringify(err.response.data.error),(JSON.stringify(err.response.status)),(JSON.stringify(err.response.headers)))
     // dispatch({type: 'fetchingcarterr', payload: err})
      if(err.response.status != 200){
        dispatch({type:"unloading"})
        dispatch({type: 'redirect'})
      }
    })
   }
}
//categoryModalclass
export const fetchfollowing =(data)=>{
  return(dispatch)=>{
    dispatch({type:"catloading"})
    axios.get(`http://localhost:5000/customer/fetch/following?email=${data}`, { headers: {"Authorization" : `Markaranter ${Cookies.get("token")}`,"markaranterTwo":mainToken,"navigation":JSON.stringify(navigation)} })
    .then(res => dispatch({type:"fetchfollowing", payload:res.data}))
    .catch(err => dispatch({type:"err", payload:err}))
  }
}

export const fetchfollowers =(data)=>{
  return(dispatch)=>{
    dispatch({type:"catloading"})
    axios.get(`http://localhost:5000/customer/fetch/followers?email=${data}`, { headers: {"Authorization" : `Markaranter ${Cookies.get("token")}`,"markaranterTwo":mainToken,"navigation":JSON.stringify(navigation)} })
    .then(res => dispatch({type:"fetchfollowers", payload:res.data}))
    .catch(err => dispatch({type:"err", payload:err}))
  }
}

export const fetchsavedItembyemail =(data)=>{
  return(dispatch)=>{
    dispatch({type:"loading"})
    axios.get(`http://localhost:5000/customer/fetchbyemail/saveditems?email=${data}`,{ headers: {"Authorization" : `Markaranter ${Cookies.get("token")}`,"markaranterTwo":mainToken,"navigation":JSON.stringify(navigation)} })
    .then(res => dispatch({type:"fetchsavedItembyemail", payload:res.data}))
    .catch(err =>{
      console.log(JSON.stringify(err.response.data.error),(JSON.stringify(err.response.status)),(JSON.stringify(err.response.headers)))
     // dispatch({type: 'fetchingcarterr', payload: err})
      if(err.response.status != 200){
        dispatch({type:"unloading"})
        dispatch({type: 'redirect'})
      }
    })
  }
}
export const fetchsavedItembyuserId =(data)=>{
  return(dispatch)=>{
    dispatch({type:"loading"})
    axios.get(`http://localhost:5000/customer/fetchbyuserId/saveditems`,{ headers: {"Authorization" : `Markaranter ${Cookies.get("token")}`,"markaranterTwo":mainToken,"navigation":JSON.stringify(navigation)} })
    .then(res => dispatch({type:"fetchsavedItembyuserId", payload:res.data}))
    .catch(err =>{
      console.log(JSON.stringify(err.response.data.error),(JSON.stringify(err.response.status)),(JSON.stringify(err.response.headers)))
     // dispatch({type: 'fetchingcarterr', payload: err})
      if(err.response.status != 200){
        dispatch({type:"unloading"})
        dispatch({type: 'redirect'})
      }
    })
  }
}

//getseller
export const checksaveItem =()=>{
  return(dispatch)=>{
   // dispatch({type:"loading"})
    dispatch({type:"catloading"})
    axios.get(`http://localhost:5000/customer/check/save`,{ headers: {"Authorization" : `Markaranter ${Cookies.get("token")}`,"markaranterTwo":mainToken,"navigation":JSON.stringify(navigation)} })
    .then(res => dispatch({type:"check-save-item", payload:res.data}))
    .catch(err => dispatch({type:"err", payload:err}))
  }
}

export const saveItem =(data)=>{
  return(dispatch)=>{
   // dispatch({type:"loading"})
    dispatch({type:"catloading"})
    axios.get(`http://localhost:5000/customer/save?productId=${data.productId}&details=${data.details}`, { headers: {"Authorization" : `Markaranter ${Cookies.get("token")}`,"markaranterTwo":mainToken,"navigation":JSON.stringify(navigation)} })
    .then(res => dispatch({type:"save-item", payload:res.data.messages.message,payloadheader:res.data.messages.header, payloaduser:res.data.userdetails}))
    .catch(err =>{
      console.log(JSON.stringify(err.response.data.error),(JSON.stringify(err.response.status)),(JSON.stringify(err.response.headers)))
     // dispatch({type: 'fetchingcarterr', payload: err})
      if(err.response.status != 200){
        dispatch({type:"unloading"})
        dispatch({type: 'redirect'})
      }
    })
  }
}
export const unsaveItem =(data)=>{
  return(dispatch)=>{
   // dispatch({type:"loading"})
    dispatch({type:"catloading"})
    axios.get(`http://localhost:5000/customer/unsave?productId=${data}`, { headers: {"Authorization" : `Markaranter ${Cookies.get("token")}`,"markaranterTwo":mainToken,"navigation":JSON.stringify(navigation)} })
    .then(res => dispatch({type:"unsave-item", payload:res.data}))
    .catch(err =>{
      console.log(JSON.stringify(err.response.data.error),(JSON.stringify(err.response.status)),(JSON.stringify(err.response.headers)))
     // dispatch({type: 'fetchingcarterr', payload: err})
      if(err.response.status != 200){
        dispatch({type:"unloading"})
        dispatch({type: 'redirect'})
      }
    })
  }
}

//products
export const subcat2 =(data)=>{
  return(dispatch)=>{
    axios.get(`http://localhost:5000/products/productsellernumOfRows/${data}/subcat2`)
=======
export const subcat2 =(data)=>{
  return(dispatch)=>{
    axios.get(`http://fruget.herokuapp.com/products/productupload/${data}/subcat2`)
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
    .then( res => dispatch({type:"getsubcat2", payload:res.data}))
    .catch(err => dispatch({type:"err", payload:err}))
  }
}
export const subcat3 =(data)=>{
  return(dispatch)=>{
<<<<<<< HEAD
      axios.get(`http://localhost:5000/products/productsellernumOfRows/${data}/subcat3`)
=======
    axios.get(`http://fruget.herokuapp.com/products/productupload/${data}/subcat3`)
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
    .then( res => dispatch({type:"getsubcat3", payload:res.data}))
    .catch(err => dispatch({type:"err", payload:err}))
  }
}
export const setLoadingtoTrue =()=>{
  return (dispatch)=>{
     dispatch ({type:"setLoadingtoTrue"})
  }
<<<<<<< HEAD
}   
export const unsetAppDisplay=()=>{
  return(
    {type:"undisplayApp"}
  )
}   
export const setAppDisplay=()=>{
  return(
    {type:"displayApp"}
  )
}         
export const searcher =(data)=>{
  return (dispatch)=>{
     dispatch({type: 'searched'})
  axios.post('http://localhost:5000/search/search',{data: JSON.stringify(data)})
  .then(res => dispatch({type:'searching',payload:res.data.files,payloadTwo:res.data.numPages,payloadThree: res.data.currentPage,payloadFour:res.data.numOfRows}))
  .catch(err => dispatch({type: 'error', payload: err}))

 // dispatch({type: 'loading'})
    axios.post(`http://localhost:5000/search/searchbrand`, {data: JSON.stringify(data)})
    .then(res=> dispatch({type: 'brandsearched', payload: res.data}))
    .then(err => dispatch({type: 'error', payload: err}))

   // dispatch({type: 'loading'})
    axios.post(`http://localhost:5000/search/searchcolour`, {data: JSON.stringify(data)})
    .then(res=> dispatch({type: 'colorsearched', payload: res.data}))
    .then(err => dispatch({type: 'error', payload: err}))

   // dispatch({type: 'loading'})
    axios.post(`http://localhost:5000/search/searchsize`, {data: JSON.stringify(data)})
=======
}
export const setAppDisplay=()=>{
  return(
    {type:"undisplayApp"}
  )
}
export const searcher =(data)=>{
  return (dispatch)=>{
     dispatch({type: 'searched'})
  axios.post('http://fruget.herokuapp.com/search/search',{data: JSON.stringify(data)})
  .then(res => dispatch({type:'searching',payload:res.data.files,payloadTwo:res.data.numPages,payloadThree: res.data.currentPage,payloadFour:res.data.numOfRows}))
  .catch(err => dispatch({type: 'error', payload: err}))

  dispatch({type: 'brandsearching'})
    axios.post(`http://fruget.herokuapp.com/search/searchbrand`, {data: JSON.stringify(data)})
    .then(res=> dispatch({type: 'brandsearched', payload: res.data}))
    .then(err => dispatch({type: 'error', payload: err}))

    dispatch({type: 'colorsearching'})
    axios.post(`http://fruget.herokuapp.com/search/searchcolour`, {data: JSON.stringify(data)})
    .then(res=> dispatch({type: 'colorsearched', payload: res.data}))
    .then(err => dispatch({type: 'error', payload: err}))

    dispatch({type: 'sizesearching'})
    axios.post(`http://fruget.herokuapp.com/search/searchsize`, {data: JSON.stringify(data)})
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
    .then(res=> dispatch({type: 'sizesearched', payload: res.data}))
    .then(err => dispatch({type: 'error', payload: err}))

  }
}
<<<<<<< HEAD
export const followservice =(data)=>{
  return(dispatch)=>{
    dispatch({type:"catloading"})
    axios.get(`http://localhost:5000/details/follow/service?sellerId=${data}`,{ headers: {"Authorization" : `Markaranter ${Cookies.get("token")}`,"markaranterTwo":mainToken,"navigation":JSON.stringify(navigation)} })
   .then(res =>  dispatch({type: 'followservice', payload: res.data.status,payloaduser:res.data.user,payloadservice:res.data.service}))
   .catch(err =>{
    console.log(JSON.stringify(err.response.data.error),(JSON.stringify(err.response.status)),(JSON.stringify(err.response.headers)))
   // dispatch({type: 'fetchingcarterr', payload: err})
    if(err.response.status != 200){
      dispatch({type:"unloading"})
      dispatch({type: 'redirect'})
    }
  }) 
  }
}
export const followseller =(data)=>{
  return(dispatch)=>{
    dispatch({type:"catloading"})
    axios.get(`http://localhost:5000/details/follow/seller?sellerId=${data}`,{ headers: {"Authorization" : `Markaranter ${Cookies.get("token")}`,"markaranterTwo":mainToken,"navigation":JSON.stringify(navigation)} })
   .then(res =>  dispatch({type: 'followseller', payload: res.data.status,payloaduser:res.data.user,payloadseller:res.data.seller}))
   .catch(err =>{
    console.log(JSON.stringify(err.response.data.error),(JSON.stringify(err.response.status)),(JSON.stringify(err.response.headers)))
   // dispatch({type: 'fetchingcarterr', payload: err})
    if(err.response.status != 200){
      dispatch({type:"unloading"})
      dispatch({type: 'redirect'})
    }
  })
  }
}
export const viewsellerdetails =(data)=>{
  return(dispatch)=>{
    dispatch({type:"loading"})
    
    axios.get(`http://localhost:5000/details/product/display/sellerdetails?userId=${data}`)
  .then(res => dispatch({type:"sellerdetailsloaded",payloadseller:res.data.seller,payloadnumOfRows:res.data.numOfRows,payloadproducts:res.data.products}))
  .catch(err => dispatch({type:"err",payload:err})) 
  }
}

export const viewuserdetails =(data)=>{
  return(dispatch)=>{
    dispatch({type:"loading"})   
    axios.get(`http://localhost:5000/details/product/display/userdetails?email=${data}`,{ headers: {"Authorization" : `Markaranter ${Cookies.get("token")}`,"markaranterTwo":mainToken,"navigation":JSON.stringify(navigation)} })
  .then(res => dispatch({type:"userdetailsbyemail",payloadotheruser:res.data.details,payloadnumOfRows:res.data.numOfRows,payloadproducts:res.data.products,payloadcomments:res.data.comments}))
  .catch(err =>{
    console.log(JSON.stringify(err.response.data.error),(JSON.stringify(err.response.status)),(JSON.stringify(err.response.headers)))
   // dispatch({type: 'fetchingcarterr', payload: err})
    if(err.response.status != 200){
      dispatch({type:"unloading"})
      dispatch({type: 'redirect'})
    }
  }) 
  }
} 

export const viewotheruserdetailsbyuserId =(data)=>{
  return(dispatch)=>{
   // dispatch({type:"loading"})   
    axios.get(`http://localhost:5000/details/product/display/otheruserdetailsbyuserId?userId=${data}`,{ headers: {"Authorization" : `Markaranter ${Cookies.get("token")}`,"markaranterTwo":mainToken,"navigation":JSON.stringify(navigation)} })
  .then(res => dispatch({type:"otheruserdetailsbyid",payloadFailure:res.data.failureMsg,payloadstatus:res.data.status,payloaduser:res.data.otheruserdetails}))
  //,payloadnumOfRows:res.data.numOfRows,payloadproducts:res.data.products
  .catch(err =>{
    console.log(JSON.stringify(err.response.data.error),(JSON.stringify(err.response.status)),(JSON.stringify(err.response.headers)))
   // dispatch({type: 'fetchingcarterr', payload: err})
    if(err.response.status != 200){
      dispatch({type:"unloading"})
      dispatch({type: 'redirect'})
    }
  }) 
  }
}
export const viewuserdetailsbyuserId =(data)=>{
  return(dispatch)=>{
    dispatch({type:"loading"})   
    axios.get(`http://localhost:5000/details/product/display/userdetailsbyuserId?userId=${data}`,{ headers: {"Authorization" : `Markaranter ${Cookies.get("token")}`,"markaranterTwo":mainToken,"navigation":JSON.stringify(navigation)} })
  .then(res => dispatch({type:"userdetailsbyid",payloadFailure:res.data.failureMsg,payloadstatus:res.data.status,payloadisLoggedin:res.data.isLoggedin,payloaduser:res.data.details,payloadnumOfRows:res.data.numOfRows,payloadproducts:res.data.products}))
  .catch(err => dispatch({type:"errorOutput", payloaderr:err})) 
  }
}

export const viewmyprofiledetails =(data)=>{
  return(dispatch)=>{
    dispatch({type:"loading"})   
    axios.get(`http://localhost:5000/details/product/display/myprofiledetails`,{ headers: {"Authorization" : `Markaranter ${Cookies.get("token")} ${mainToken}`,"markaranterTwo":mainToken,"navigation":JSON.stringify(navigation)} })
  .then(res => dispatch({type:"myprofiledetailsloaded",payloaduser:res.data.details,payloadnumOfRows:res.data.numOfRows,payloadproducts:res.data.products}))
  .catch(err =>{
    console.log(JSON.stringify(err.response.data.error),(JSON.stringify(err.response.status)),(JSON.stringify(err.response.headers)))
   // dispatch({type: 'fetchingcarterr', payload: err})
    if(err.response.status != 200){
      dispatch({type:"unloading"})
      dispatch({type: 'redirect'})
    }
  })
  }
}

export const getseller =(data)=>{
  return(dispatch)=>{
    axios.get(`http://localhost:5000/details/product/display/seller?email=${data.email}&details=${data.details}&productId=${data.productId}&user=${data.userId}`,{ headers: {"Authorization" : `Markaranter ${Cookies.get("token")}`,"markaranterTwo":mainToken,"navigation":JSON.stringify(navigation)} })
  .then(res => dispatch({type:"sellerloaded",payloadItem:res.data.item,payload:res.data.sellerdetail,payloadotherstores:res.data.otherstores,payloadFollow: !res.data.follow  ? "follow" : "following"}))
  .catch(err =>{
    console.log(JSON.stringify(err.response.data.error),(JSON.stringify(err.response.status)),(JSON.stringify(err.response.headers)))
   // dispatch({type: 'fetchingcarterr', payload: err})
    if(err.response.status != 200){
      dispatch({type:"unloading"})
      dispatch({type: 'redirect'})
    }
  })
  }
}
//saveItem
export const getdetails =(data)=>{
 return(dispatch)=>{
   /*
  axios.get(`http://localhost:5000/customer/check/save?productId=${data}`,{ headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`} })
  .then(res =>  dispatch({type:"checkifsaved",payload:res.data}))
  .catch(err => dispatch({type:"err",payload:err})) 
 */
  dispatch({type:"loading"})
  axios.get(`http://localhost:5000/details/product/${data.productId}`,{ headers: {"Authorization" : `Markaranter ${Cookies.get("token")}`,"markaranterTwo":mainToken,"navigation":JSON.stringify(navigation)} })
  .then(res => dispatch({type:"detailsloaded",payloadOne:res.data.file[0].details,payloadTwo:res.data.file[0].productId,payload: res.data.file[0],payloadSimiliar:res.data.files2,payloadverySimiliar:res.data.files3,payloadcomments:res.data.productcomments}))
  .catch(err =>{ dispatch({type:"err",payload:err})
  if(err.response.status != 200){
    dispatch({type:"unloading"})
    dispatch({type: 'redirect'})
  }})   
 }
}
=======
export const getdetails =(data)=>{
 return(dispatch)=>{
   dispatch({type:"loading"})
  axios.get(`http://fruget.herokuapp.com/customer/check/save?details=${data}`,{ headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`} })
  .then(res =>  dispatch({type:"checkifsaved",payload:res.data}))
  .catch(err => dispatch({type:"err",payload:err})) 

  axios.get(`http://fruget.herokuapp.com/details/similiar/${data}`)
  .then(res => dispatch({type:"similiarproducts",payload: res.data}))
  .catch(err => dispatch({type:"err",payload:err}))  
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac

  axios.get(`http://fruget.herokuapp.com/details/similiarbrand/${data}`)
  .then(res => dispatch({type:"similiarproductsbybrand",payload: res.data}))
  .catch(err => dispatch({type:"err",payload:err}))  

  axios.get(`http://fruget.herokuapp.com/details/product/${data}`)
  .then(res => dispatch({type:"detailsloaded",payloadOne:data,payload: res.data}))
  .catch(err => dispatch({type:"err",payload:err}))   

  
 }
}
export const submitsearcher =(data)=>{
  return (dispatch)=>{
     dispatch({type: 'submitsearched'})
<<<<<<< HEAD
     console.log(data)
  axios.get(`http://localhost:5000/search/items/search?search=${data.search}&vendor=${data.vendor}&gun=${data.currentq}&sort=${data.sort}&max=${data.max}&min=${data.min}&brand=${data.brand}&inches=${data.inches}&litres=${data.litres}&colour=${data.colour}&page=${data.page}`)
=======
  axios.get(`http://fruget.herokuapp.com/search/items/search?search=${data.search}&sort=${data.sort}&max=${data.max}&min=${data.min}&brand=${data.brand}&size=${data.size}&colour=${data.colour}&page=${data.page}`)
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
  .then(res => dispatch({type:'submitsearching',payload:res.data.files,payloadTwo:res.data.numPages,payloadThree: res.data.currentPage,payloadFour:res.data.numOfRows}))
  .catch(err => dispatch({type:"err",payload:err}))
  

<<<<<<< HEAD
  dispatch({type: 'loading'})
  axios.get(`http://localhost:5000/search/items/searchbrand?search=${data.search}&max=${data.max}&min=${data.min}&brand=${data.brand !== undefined ?data.brand : null}&size=${data.size}&colour=${data.colour}`)
  .then(res=> dispatch({type: 'submitbrandsearched', payload: res.data}))
  .then(err => dispatch({type: 'error', payload: err}))

  dispatch({type: 'loading'})
  axios.get(`http://localhost:5000/search/items/searchcolour?search=${data.search}&max=${data.max}&min=${data.min}&brand=${data.brand}&size=${data.size}&colour=${data.colour}`)
  .then(res=> dispatch({type: 'submitcolorsearched', payload: res.data}))
  .then(err => dispatch({type: 'error', payload: err}))

  dispatch({type: 'loading'})
  axios.get(`http://localhost:5000/search/items/searchsize?search=${data.search}&max=${data.max}&min=${data.min}&brand=${data.brand}&selectedInches=${data.inches}&selectedLitres=${data.litres}&colour=${data.colour}`)
  .then(res=> dispatch({type: 'submitsizesearched',payloadInches: res.data.inches,payloadLitres:res.data.litres,payloadWattage:res.data.wattage}))
  .then(err => dispatch({type: 'error', payload: err}))

  dispatch({type: 'loading'})
  axios.get(`http://localhost:5000/search/items/searchvendor?search=${data.search}&vendor=${data.vendor}`)
  .then(res=> dispatch({type: 'submitvendorsearched', payload: res.data}))
=======
  dispatch({type: 'submitbrandsearching'})
  axios.get(`http://fruget.herokuapp.com/search/items/searchbrand?search=${data.search}&max=${data.max}&min=${data.min}&brand=${data.brand !== undefined ?data.brand : null}&size=${data.size}&colour=${data.colour}`)
  .then(res=> dispatch({type: 'submitbrandsearched', payload: res.data}))
  .then(err => dispatch({type: 'error', payload: err}))

  dispatch({type: 'submitcolorsearching'})
  axios.get(`http://fruget.herokuapp.com/search/items/searchcolour?search=${data.search}&max=${data.max}&min=${data.min}&brand=${data.brand}&size=${data.size}&colour=${data.colour}`)
  .then(res=> dispatch({type: 'submitcolorsearched', payload: res.data}))
  .then(err => dispatch({type: 'error', payload: err}))

  dispatch({type: 'sizesearching'})
  axios.get(`http://fruget.herokuapp.com/search/items/searchsize?search=${data.search}&max=${data.max}&min=${data.min}&brand=${data.brand}&size=${data.size}&colour=${data.colour}`)
  .then(res=> dispatch({type: 'submitsizesearched', payload: res.data}))
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
  .then(err => dispatch({type: 'error', payload: err}))

  dispatch({type:"unloading"})
  }
}

export const checkfilter = data =>{
  return (dispatch) =>{
  dispatch({type: "filter"})
<<<<<<< HEAD
  axios.get(`http://localhost:5000/products/items/filter/${data.category}?page=${parseInt(data.page)}&sort=${data.sort}&max=${data.max}&min=${data.min}&vendor=${data.vendor}&brand=${data.brand}&litres=${data.litres}&inches=${data.inches}&colour=${data.colour}&q=${data.q}&rating=${data.rating}`)
  .then(res => dispatch({type:"filteritems", payload:res.data.files,payloadTwo:res.data.numPages,payloadThree: res.data.currentPage,payloadFour:res.data.numOfRows,payloadoverallMax:res.data.overallMax,payloadoverallMin:res.data.overallMin,payloadmax:res.data.max,payloadmin:res.data.min,input:data.files}))
  .catch(err => console.log(err))
  }
}
//addtocart
export const checkvendorfilter = data =>{
  return (dispatch) =>{
  //dispatch({type: "filter"})
  axios.get(`http://localhost:5000/products/goods/filter/${data.vendor}?page=${parseInt(data.page)}&sort=${data.sort}&max=${data.max}&min=${data.min}&vendor=${data.vendor}&brand=${data.brand}&litres=${data.litres}&inches=${data.inches}&colour=${data.colour}&q=${data.q}&rating=${data.rating}`)
  .then(res => dispatch({type:"filtervendoritems", payload:res.data.files,payloadTwo:res.data.numPages,payloadThree: res.data.currentPage,payloadFour:res.data.numOfRows,payloadoverallMax:res.data.overallMax,payloadoverallMin:res.data.overallMin,payloadmax:res.data.max,payloadmin:res.data.min,input:data.files}))
=======
  axios.get(`http://fruget.herokuapp.com/products/items/filter/${data.category}?page=${parseInt(data.page)}&sort=${data.sort}&max=${data.max}&min=${data.min}&brand=${data.brand}&size=${data.size}&colour=${data.colour}`)
  .then(res => dispatch({type:"filteritems", payload:res.data.files,payloadTwo:res.data.numPages,payloadThree: res.data.currentPage,payloadFour:res.data.numOfRows,input:data.files}))
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
  .catch(err => console.log(err))
  }
}

export const getfilteredSuggestions = data =>{
  return (dispatch) =>{

    
  dispatch({type: "suggestions"})
<<<<<<< HEAD
  dispatch({type:"suggestionloaded", payload:[], input:data})
  /*
  axios.get("http://localhost:5000/suggestions/suggestion")
=======
  axios.get("http://fruget.herokuapp.com/suggestions/suggestion")
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
  .then(res => dispatch({type:"suggestionloaded", payload:res.data, input:data}))
  .catch(err => console.log(err))
  */
  }
}
//setAppDisplay
//,{ headers: {"Authorization" : `Bearer ${Cookies.get("token")} ${mainToken}`,"navigation":JSON.stringify(navigation)} }
 export const getProducts = data =>{
   return (dispatch)=>{
      dispatch({type: 'loading'})
<<<<<<< HEAD
    axios.get(`http://localhost:5000/products/${data.category}?page=${parseInt(data.page)}&sort=${data.sort}&max=${data.max}&min=${data.min}&brand=${data.brand}&size=${data.size}&colour=${data.colour}&rating=${data.rating}`)
    .then(res =>{ dispatch({type: 'loaded',payload:data.category, payloadOne: res.data.file,payloadTwo:res.data.numPages,payloadThree: res.data.currentPage,payloadFour:res.data.numOfRows,payloadoverallMax:res.data.overallMax,payloadoverallMin:res.data.overallMin,payloadmax:res.data.max,payloadmin:res.data.min})
    dispatch({type:"unloading"})
  })
=======
    axios.get(`http://fruget.herokuapp.com/products/${data.category}?page=${parseInt(data.page)}&sort=${data.sort}&max=${data.max}&min=${data.min}&brand=${data.brand}&size=${data.size}&colour=${data.colour}`,{ headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`} })
    .then(res => dispatch({type: 'loaded',payload:data.category, payloadOne: res.data.file,payloadTwo:res.data.numPages,payloadThree: res.data.currentPage,payloadFour:res.data.numOfRows}))
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
    .catch(err => dispatch({type: 'error', payload: err}))
/*
   dispatch({type: 'categoryloading'})
<<<<<<< HEAD
   axios.get(`http://localhost:5000/products/${data.category}/category?page=${data.page}`)
   .then(res=> dispatch({type: 'categoryloaded', payload: res.data}))
   .catch(err => dispatch({type: 'error', payload: err}))
*/
  }
}

export const getvendorProducts = data =>{
  return (dispatch)=>{
     dispatch({type: 'loading'})
   axios.get(`http://localhost:5000/products/goods/${data.vendor}?category=${data.category}&page=${parseInt(data.page)}&sort=${data.sort}&max=${data.max}&min=${data.min}&brand=${data.brand}&size=${data.size}&colour=${data.colour}&rating=${data.rating}`)
   .then(res => dispatch({type: 'vendorproductsloaded',payload:data.category, payloadOne: res.data.file,payloadTwo:res.data.numPages,payloadThree: res.data.currentPage,payloadFour:res.data.numOfRows,payloadoverallMax:res.data.overallMax,payloadoverallMin:res.data.overallMin,payloadmax:res.data.max,payloadmin:res.data.min}))
   .catch(err => dispatch({type: 'error', payload: err}))

  dispatch({type: 'categoryloading'})
  axios.get(`http://localhost:5000/products/${data.category}/category?page=${data.page}`)
  .then(res=> dispatch({type: 'categoryloaded', payload: res.data}))
  .catch(err => dispatch({type: 'error', payload: err}))
 }
}
//colormodal
export const addtocart = data =>{
  return (dispatch) =>{
    dispatch({type:"loading"})
    axios.get(`http://localhost:5000/customer/add-to-cart?id=${data.id}&color=${data.color}&inches=${data.inches}&litres=${data.litres}&wattage=${data.wattage}&kilogram=${data.kilogram}`,
    { headers: {"Authorization" : `Markaranter ${Cookies.get("token")}`,"markaranterTwo":mainToken,"navigation":JSON.stringify(navigation)} })
    .then(res =>{
      if(res.data.success){
        dispatch ({type:"addedtocart",payloadOne:res.data.message,payloadheader:res.data.header,payloadTwo:"block",payloadcart:res.data.cart})
       dispatch({type:"unloading"})
      }else{
        window.location.assign("/customer/login")
      }
    })
    .catch(err =>{
      console.log(JSON.stringify(err.response.data.error),(JSON.stringify(err.response.status)),(JSON.stringify(err.response.headers)))
     // dispatch({type: 'fetchingcarterr', payload: err})
      if(err.response.status != 200){
        dispatch({type:"unloading"})
        dispatch({type: 'redirect'})
      }
    })   
  }
}
export const clearcart =(data)=>{
  return(dispatch)=>{
    dispatch({type:"catloading"})
    axios.get(`http://localhost:5000/customer/clear/cart?cartId=${data.cartId}&productId=${data.productId}&seller=${data.seller}&rating=${data.rating}&comment=${data.comment}`,{ headers: {"Authorization" : `Markaranter ${Cookies.get("token")}`,"markaranterTwo":mainToken,"navigation":JSON.stringify(navigation)} })
    .then(res => dispatch({type:"clearcart",payload: res.data.response, payloadcart:res.data.submittedcart}))
    .catch(err =>{
      console.log(JSON.stringify(err.response.data.error),(JSON.stringify(err.response.status)),(JSON.stringify(err.response.headers)))
     // dispatch({type: 'fetchingcarterr', payload: err})
      if(err.response.status != 200){
        dispatch({type:"unloading"})
        dispatch({type: 'redirect'})
      }
    })
  }
}
export const submitshoppingcart =()=>{
  return(dispatch)=>{
  dispatch({type:"loading"})
    axios.get(`http://localhost:5000/customer/submit-to-cart`,{ headers: {"Authorization" : `Markaranter ${Cookies.get("token")}`,"markaranterTwo":mainToken,"navigation":JSON.stringify(navigation)} })
    .then(res => dispatch({type:"submitshoppingcart",payload: res.data.message,payloadTwo:"block"}))
    .catch(err => dispatch({type: 'submitshoppingcarterr', payload: err}))
  }
}
export const shoppingcart =(data)=>{
  return(dispatch)=>{
    dispatch({type:"loading"})
    axios.get(`http://localhost:5000/customer/checkout?user=${data}`,{ headers: {"Authorization" : `Markaranter ${Cookies.get("token")}`,"markaranterTwo":mainToken,"navigation":JSON.stringify(navigation)} })
    .then(res =>{ dispatch({type:"shoppingcart",payloadcart: res.data.files,payloadtotalprice:res.data.totalprice})
  dispatch({type:"unloading"})
})
    .catch(err =>{
      console.log(JSON.stringify(err.response.data.error),(JSON.stringify(err.response.status)),(JSON.stringify(err.response.headers)))
     // dispatch({type: 'fetchingcarterr', payload: err})
      if(err.response.status != 200){
        dispatch({type:"unloading"})
        dispatch({type: 'redirect'})
      }
    })
  }
}
//checkout
export const submittedcart =(data)=>{
  return(dispatch)=>{
    dispatch({type:"loading"})
    console.log("i am submitting")
    axios.get(`http://localhost:5000/customer/submittedcart?user=${data}`,{ headers: {"Authorization" : `Markaranter ${Cookies.get("token")}`,"markaranterTwo":mainToken,"navigation":JSON.stringify(navigation)} })
    .then(res => dispatch({type:"submittedcart",payloadsubmittedcart: res.data.files,payloadtotalprice:res.data.totalprice}))
    .catch(err =>{
      console.log(JSON.stringify(err.response.data.error),(JSON.stringify(err.response.status)),(JSON.stringify(err.response.headers)))
     // dispatch({type: 'fetchingcarterr', payload: err})
      if(err.response.status != 200){
        dispatch({type:"unloading"})
        dispatch({type: 'redirect'})
      }
    })
  }
}

export const fetchorders  =(data)=>{
  return(dispatch)=>{
    dispatch({type:"loading"})
    axios.get(`http://localhost:5000/customer/orders?user=${data}`,{ headers: {"Authorization" : `Markaranter ${Cookies.get("token")}`,"markaranterTwo":mainToken,"navigation":JSON.stringify(navigation)} })
    .then(res => {dispatch({type:"fetchorders",payloadorders: res.data.files,payloadtotalorderprice:res.data.totalprice})
   // dispatch({type:"unloading"})
  })
  .catch(err =>{
    console.log(JSON.stringify(err.response.data.error),(JSON.stringify(err.response.status)),(JSON.stringify(err.response.headers)))
   // dispatch({type: 'fetchingcarterr', payload: err})
    if(err.response.status != 200){
      dispatch({type:"unloading"})
      dispatch({type: 'redirect'})
    }
  })
  }
}
export const fetchinvoice  =(data)=>{
  return(dispatch)=>{
    dispatch({type:"fetchinginvoice"})
    axios.get(`http://localhost:5000/customer/invoice?cartId=${data}`,{ headers: {"Authorization" : `Markaranter ${Cookies.get("token")}`,"markaranterTwo":mainToken,"navigation":JSON.stringify(navigation)} })
    .then(res => dispatch({type:"fetchinvoice",payloadcart: res.data.cart,payloadbuyer: res.data.buyer,payloadseller:res.data.seller}))
    .catch(err =>{
      console.log(JSON.stringify(err.response.data.error),(JSON.stringify(err.response.status)),(JSON.stringify(err.response.headers)))
     // dispatch({type: 'fetchingcarterr', payload: err})
      if(err.response.status != 200){
        dispatch({type:"unloading"})
        dispatch({type: 'redirect'})
      }
    })
  }
}
export const fetchgroupedcartbyinvoiceId =(data)=>{
  return(dispatch)=>{
    dispatch({type:"fetchinggroupcartbyinvoiceId"})
    axios.get(`http://localhost:5000/customer/group/submittedcart?email=${data}`,{ headers: {"Authorization" : `Markaranter ${Cookies.get("token")}`,"markaranterTwo":mainToken,"navigation":JSON.stringify(navigation)} })
    .then(res => {dispatch({type:"fetchgroupedcartbyinvoiceId",payloadcart: res.data.groupcart,payloadtotalprice:res.data.totalprice})
   //  dispatch({type:"unloading"})
    })
    .catch(err =>{
      console.log(JSON.stringify(err.response.data.error),(JSON.stringify(err.response.status)),(JSON.stringify(err.response.headers)))
     // dispatch({type: 'fetchingcarterr', payload: err})
      if(err.response.status != 200){
        dispatch({type:"unloading"})
        dispatch({type: 'redirect'})
      }
    })
  }
}
export const fetchcartbyinvoiceId =(data)=>{
  return(dispatch)=>{
    dispatch({type:"fetchingcartbyinvoiceId"})
    axios.get(`http://localhost:5000/customer/group/invoice?invoiceId=${data}`,{ headers: {"Authorization" : `Markaranter ${Cookies.get("token")}`,"markaranterTwo":mainToken,"navigation":JSON.stringify(navigation)} })
    .then(res => dispatch({type:"fetchcartbyinvoiceId",payloadcart: res.data.cart,payloadbuyer: res.data.buyer,payloadseller:res.data.seller}))
    .catch(err =>{
      console.log(JSON.stringify(err.response.data.error),(JSON.stringify(err.response.status)),(JSON.stringify(err.response.headers)))
     // dispatch({type: 'fetchingcarterr', payload: err})
      if(err.response.status != 200){
        dispatch({type:"unloading"})
        dispatch({type: 'redirect'})
      }
    })
  }  
}
export const increaseshoppingcart =(data)=>{
  return(dispatch)=>{
    dispatch({type:"loading"})
    axios.get(`http://localhost:5000/customer/increasecart?details=${data}`,{ headers: {"Authorization" : `Markaranter ${Cookies.get("token")}`,"markaranterTwo":mainToken,"navigation":JSON.stringify(navigation)} })
    .then(res => dispatch({type:"increaseshoppingcart",payloadcart: res.data.files,payloadtotalprice:res.data.totalprice}))
    .catch(err =>{
      console.log(JSON.stringify(err.response.data.error),(JSON.stringify(err.response.status)),(JSON.stringify(err.response.headers)))
     // dispatch({type: 'fetchingcarterr', payload: err})
      if(err.response.status != 200){
        dispatch({type:"unloading"})
        dispatch({type: 'redirect'})
      }
    })
  }
}

export const decreaseshoppingcart =(data)=>{
  return(dispatch)=>{
    dispatch({type:"loading"})
    axios.get(`http://localhost:5000/customer/decreasecart?details=${data}`,{ headers: {"Authorization" : `Markaranter ${Cookies.get("token")}`,"markaranterTwo":mainToken,"navigation":JSON.stringify(navigation)} })
    .then(res => dispatch({type:"decreaseshoppingcart",payloadcart: res.data.files,payloadtotalprice:res.data.totalprice}))
    .catch(err =>{
      console.log(JSON.stringify(err.response.data.error),(JSON.stringify(err.response.status)),(JSON.stringify(err.response.headers)))
     // dispatch({type: 'fetchingcarterr', payload: err})
      if(err.response.status != 200){
        dispatch({type:"unloading"})
        dispatch({type: 'redirect'})
      }
    })
  }
}


export const removeshoppingcart =(data)=>{
  return(dispatch)=>{
    dispatch({type:"loading"})
    axios.get(`http://localhost:5000/customer/deletecart?details=${data}`,{ headers: {"Authorization" : `Markaranter ${Cookies.get("token")}`,"markaranterTwo":mainToken,"navigation":JSON.stringify(navigation)} })
    .then(res => dispatch({type:"removeshoppingcart",payload:res.data}))
    .catch(err =>{
      console.log(JSON.stringify(err.response.data.error),(JSON.stringify(err.response.status)),(JSON.stringify(err.response.headers)))
     // dispatch({type: 'fetchingcarterr', payload: err})
      if(err.response.status != 200){
        dispatch({type:"unloading"})
        dispatch({type: 'redirect'})
      }
    })
  }
}
export const undisplaymodal =()=>{
  return (dispatch)=>{
     dispatch({type: "undisplaymodal", payload:"none"})
     setTimeout(()=>dispatch({type:"completelyundisplaymodal"}),700)
  }
}
export const allcategories = ()=>{
  return(dispatch)=>{
     dispatch({type:"catloading"})
    axios.get("http://localhost:5000/products/products/allcategories")
    .then(res => dispatch({type:"allcategories", payload:res.data}))
    .catch(err => dispatch({type:"err", payload:err}))
  }
}
export const allsubcategories = (data)=>{
  return(dispatch)=>{
     dispatch({type:"catloading"})
    axios.get(`http://localhost:5000/products/${data}/category`)
    .then(res => dispatch({type:"allsubcategories", payloadcategory:res.data.distcat,payloadsub1:res.data.distsub1,payloadsub2:res.data.distsub2,payloadsub3:res.data.distsub3}))
    .catch(err => dispatch({type:"err", payload:err}))
  }
}

=======
   axios.get(`http://fruget.herokuapp.com/products/${data.category}/category?page=${data.page}`,{ headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`} })
   .then(res=> dispatch({type: 'categoryloaded', payload: res.data}))
   .catch(err => dispatch({type: 'error', payload: err}))
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac

export const allvendorsubcategories = (data)=>{
  return(dispatch)=>{
     dispatch({type:"loading"})
    axios.get(`http://localhost:5000/products/vendor/${data}/category`)
    .then(res =>{ dispatch({type:"allvendorsubcategories", payloadcategory:res.data.distcat,payloadsub1:res.data.distsub1,payloadsub2:res.data.distsub2,payloadsub3:res.data.distsub3})
    dispatch({type:"unloading"})})
    .catch(err => dispatch({type:"err", payload:err}))
  }
}
export const showmodalsidenavbar =()=>{
  return(dispatch)=>{
    dispatch({type:"showmodalsidenavbar"})
  }
}

export const unshowmodalsidenavbar =()=>{
  return(dispatch)=>{
    dispatch({type:"unshowmodalsidenavbar"})
  }
}
export const addtocart = data =>{
  return (dispatch) =>{
    dispatch({type:"addingtocart"})
    axios.get(`http://fruget.herokuapp.com/customer/add-to-cart?id=${data}`,{ headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`} })
    .then(res =>{
      if(res.data.success){
        dispatch ({type:"addedtocart",payloadOne:res.data.message,payloadTwo:"block"})
      }else{
        window.location.assign("/customer/login")
      }
    })
    .catch(err => dispatch({type: 'addingtocarterror', payload: err}))
    
  }
}
export const undisplaymodal =()=>{
  return (dispatch)=>{
     dispatch({type: "undisplaymodal", payload:"none"})
  }
}
export const allcategories = ()=>{
  return(dispatch)=>{
     dispatch({type:"loading"})
    axios.get("http://fruget.herokuapp.com/products/products/allcategories")
    .then(res => dispatch({type:"allcategories", payload:res.data}))
    .catch(err => dispatch({type:"err", payload:err}))
  }
}
export const allsubcategories = (data)=>{
  return(dispatch)=>{
     dispatch({type:"loading"})
    axios.get(`http://fruget.herokuapp.com/products/${data}/category`)
    .then(res => dispatch({type:"allsubcategories", payload:res.data}))
    .catch(err => dispatch({type:"err", payload:err}))
  }
}
export const showmodalsidenavbar =()=>{
  return(dispatch)=>{
    dispatch({type:"showmodalsidenavbar"})
  }
}
export const unshowmodalsidenavbar =()=>{
  return(dispatch)=>{
    dispatch({type:"unshowmodalsidenavbar"})
  }
}
export const getsidenav = data =>{
  return (dispatch)=>{
<<<<<<< HEAD
   dispatch({type: 'loading'})
   axios.get(`http://localhost:5000/products/${data.category}/brand?selectedBrand=${data.brand}`)
   .then(res=> dispatch({type: 'brandloaded', payload: res.data}))
   .then(err => dispatch({type: 'error', payload: err}))

   axios.get(`http://localhost:5000/products/${data.category}/color?selectedColour=${data.colour}`)
   .then(res=> dispatch({type: 'colorloaded', payload: res.data}))
   .then(err => dispatch({type: 'error', payload: err}))

   axios.get(`http://localhost:5000/products/${data.category}/size?selectedInches=${data.inches}&selectedLitres=${data.litres}`)
   .then(res=> dispatch({type: 'sizeloaded', payloadInches: res.data.inches,payloadLitres:res.data.litres,payloadWattage:res.data.wattage}))
   .then(err => dispatch({type: 'error', payload: err}))

   axios.get(`http://localhost:5000/products/${data.category}/seller?selectedseller=${data.vendor}`)
   .then(res=> dispatch({type:'sellerbycategory', payload: res.data}))
   .then(err => dispatch({type: 'error', payload: err}))
  
   dispatch({type: 'priceloading'})
   axios.get(`http://localhost:5000/products/${data.category}/price`)
=======
   dispatch({type: 'brandloading'})
   axios.get(`http://fruget.herokuapp.com/products/${data}/brand`)
   .then(res=> dispatch({type: 'brandloaded', payload: res.data}))
   .then(err => dispatch({type: 'error', payload: err}))

   dispatch({type: 'colorloading'})
   axios.get(`http://fruget.herokuapp.com/products/${data}/color`)
   .then(res=> dispatch({type: 'colorloaded', payload: res.data}))
   .then(err => dispatch({type: 'error', payload: err}))

   dispatch({type: 'sizeloading'})
   axios.get(`http://fruget.herokuapp.com/products/${data}/size`)
   .then(res=> dispatch({type: 'sizeloaded', payload: res.data}))
   .then(err => dispatch({type: 'error', payload: err}))
  
   dispatch({type: 'priceloading'})
   axios.get(`http://fruget.herokuapp.com/products/${data}/price`)
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
   .then(res=> dispatch({type: 'priceloaded', payload: res.data}))
   .then(err => dispatch({type: 'error', payload: err}))

   dispatch({type:"unloading"})
 }
}
<<<<<<< HEAD
export const getvendorsidenav = data =>{
  return (dispatch)=>{
   dispatch({type: 'loading'})
   axios.get(`http://localhost:5000/products/goods/${data.vendor}/brand?selectedBrand=${data.brand}`)
   .then(res=> {dispatch({type: 'vendorbrandloaded', payload: res.data})
   dispatch({type:"unloading"})})
   .then(err => dispatch({type: 'error', payload: err}))

   dispatch({type: 'loading'})
   axios.get(`http://localhost:5000/products/goods/${data.vendor}/color?selectedColour=${data.colour}`)
   .then(res=> {dispatch({type: 'vendorcolorloaded', payload: res.data})
   dispatch({type:"unloading"})})
   .then(err => dispatch({type: 'error', payload: err}))

   dispatch({type: 'loading'})
   axios.get(`http://localhost:5000/products/goods/${data.vendor}/size?selectedInches=${data.inches}&selectedLitres=${data.litres}`)
   .then(res=> {dispatch({type: 'vendorsizeloaded', payloadInches: res.data.inches,payloadLitres:res.data.litres,payloadWattage:res.data.wattage})
   dispatch({type:"unloading"})})
   .then(err => dispatch({type: 'error', payload: err}))

  
 }
}
export const sendmessage = data =>{
  return (dispatch)=>{
   dispatch({type: 'loading'})
   axios.post(`http://localhost:5000/search/connection/chat/message`,{data:JSON.stringify(data)},{ headers: {"Authorization" : `Markaranter ${Cookies.get("token")}`,"markaranterTwo":mainToken,"navigation":JSON.stringify(navigation)} })
   .then(res=> dispatch({type: 'sendmessage', payload: res.data}))
   .catch(err =>{
    console.log(JSON.stringify(err.response.data.error),(JSON.stringify(err.response.status)),(JSON.stringify(err.response.headers)))
   // dispatch({type: 'fetchingcarterr', payload: err})
    if(err.response.status != 200){
      dispatch({type:"unloading"})
      dispatch({type: 'redirect'})
    }
  })
 }
}
export const fetchmessage = data =>{
  return (dispatch)=>{
   dispatch({type: 'loading'})
   axios.get(`http://localhost:5000/search/fetch/chat/message?otheruserId=${data.otheruserId}`,{ headers: {"Authorization" : `Markaranter ${Cookies.get("token")}`,"markaranterTwo":mainToken,"navigation":JSON.stringify(navigation)} })
   .then(res=> dispatch({type: 'fetchmessage', payload: res.data.messages}))
   .catch(err =>{
    console.log(JSON.stringify(err.response.data.error),(JSON.stringify(err.response.status)),(JSON.stringify(err.response.headers)))
   // dispatch({type: 'fetchingcarterr', payload: err})
    if(err.response.status != 200){
      dispatch({type:"unloading"})
      dispatch({type: 'redirect'})
    }
  })
 }
}

export const fetchconnections = data =>{
  return (dispatch)=>{
 //  dispatch({type: 'loading'})viewsender
   axios.get(`http://localhost:5000/search/fetch/connected/clients?userId=${data}`,{ headers: {"Authorization" : `Markaranter ${Cookies.get("token")}`,"markaranterTwo":mainToken,"navigation":JSON.stringify(navigation)} })
   .then(res=> dispatch({type: 'fetchconnections', payload: res.data}))
   .catch(err =>{
    console.log(JSON.stringify(err.response.data.error),(JSON.stringify(err.response.status)),(JSON.stringify(err.response.headers)))
   // dispatch({type: 'fetchingcarterr', payload: err})
    if(err.response.status != 200){
      dispatch({type:"unloading"})
      dispatch({type: 'redirect'})
    }
  })
 }
}
export default store;
=======
// store.dispatch(getProducts)
export default store;
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
