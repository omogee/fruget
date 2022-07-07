import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import Axios from 'axios';

const initialState = {
    product:[]
}
const reducer = (state = initialState, action)=>{
 if ('loaded'){
     state = {...state, products: action.payload}
     return state;
 }
 return state;
}
const store = createStore(reducer, applyMiddleware(thunk, logger))

const getProducts = async (dispatch) =>{
     dispatch({type:'loading'})
    await Axios.get('')
     .then(res => dispatch({type:'loaded',payload:res.data}))
     .catch(err => dispatch({type:'error',payload:err}))
}
store.dispatch(getProducts)