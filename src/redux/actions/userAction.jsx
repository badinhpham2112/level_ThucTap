

import { login } from '../../services/useService';
import {  toast } from 'react-toastify';

export const USER_LOGIN_REQUIRES = 'USER_LOGIN_REQUIRES';

export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';

export const USER_LOGIN_ERROR = 'USER_LOGIN_ERROR';


export const USER_LOGOUT = 'USER_LOGOUT';

export const USER_REFETCH = 'USER_REFETCH';





export const handleLoginRedux = (email, password) => {
    return async (dispatch, getState) => {
        dispatch({type: USER_LOGIN_REQUIRES});
        let res = await login(email.trim(), password)
       
        if(res && res.token){
            localStorage.setItem('token', res.token)
            localStorage.setItem('email', email)
            dispatch({
                type: USER_LOGIN_SUCCESS, 
                data: {email: email.trim(), token: res.token}}
                );        
        }else{
            if(res && res.status === 400){
                toast.error(res.data.error)

            }
            dispatch({
                type: USER_LOGIN_ERROR
             
            });
        }
    }

}

export const handleLogoutRedux = () => {
    return (dispatch, getState) => {
        dispatch({type: USER_LOGOUT})
      
        

    }
}

export const handleRefetch = () => {
    return(dispatch, getState) => {
        dispatch({type: USER_REFETCH})
    }
}