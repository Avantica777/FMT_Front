import {
    APP_IS_READY,
    APP_IS_NOT_READY,
    SIGN_IN,
    SIGN_OUT,
    SIGN_ON
  } from '../constants';
import Axios from 'axios';
import APIPath from '../components/api.js';

  export const AppIsReady = payload => ({
    type: APP_IS_READY,
    payload
  });
  
  export const AppIsNotReady = payload => ({
    type: APP_IS_NOT_READY,
    payload
  });
  
  export const actionSignIn = payload => ({
    type: SIGN_IN,
    payload
  });
  
  export const actionSignOut = payload => ({
    type: SIGN_OUT,
    payload
  });
  
  export const actionSignOn = payload => ({
    type: SIGN_ON,
    payload
  });
  
  export const getStock = (username) => async (dispatch) => {
    await Axios({
      method: 'POST',
      url: APIPath + '/api/getUserStocks',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        _username:username
      }
    })
    .then(res => {
      console.log("STOCKS",res);
      if(res.data === 'No stocks found')
        dispatch({
          type: 'GET_STOCK',
          payload:[]
        })
        else
        dispatch({
        type: 'GET_STOCK',
        payload:res.data
      })
    }).catch(err => {
      console.log(err);
    })
    
  };

  export const getPortfolio = (username) => async (dispatch) => {
    await Axios({
      method: 'POST',
      url: APIPath + '/api/getUserPortfolios',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        _username:username
      }
    })
    .then(res => {
      console.log("Portfolios:",res.data);
      if(res.data == 'No stocks found')
        dispatch({
          type: 'GET_PORTFOLIO',
          payload:[]
        })
      else
        dispatch({
          type: 'GET_PORTFOLIO',
          payload:res.data
        })
    })
    
  };