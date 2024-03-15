import { USER_LOGIN_REQUIRES, USER_LOGIN_SUCCESS, USER_LOGIN_ERROR, USER_LOGOUT, USER_REFETCH } from '../actions/userAction';

const INITIAL_STATE = {
   user: {
      email: '',
      auth: null,
      token: ''
   },
   isLoading: false,
   isError: false

};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUIRES:
         console.log('>>check action: ', action)
           return {
             ...state,
             isLoading: true,
             isError: false
           };
       

        case USER_LOGIN_SUCCESS:
         console.log('>>check action: ', action)
      
           return {
              ...state, 
              user: {
               email: action.data.email,
               token: action.data.token,
               auth: true,
             },
             isLoading: false,
             isError: false
           };
         
        case USER_LOGIN_ERROR:
         console.log('>>check action: ', action)
        return {
          ...state,
          user: {
            auth: false,
          },
          isLoading: false,
          isError: true

        };

        case USER_LOGOUT:
         localStorage.removeItem("token");
         localStorage.removeItem("email");
        return {
          ...state,
          user: {
            email: '',
            token: '',
            auth: false,
          },
          isLoading: false,
          isError: false

        };

        case USER_REFETCH:
       
        return {
          ...state,
          user: {
            email: localStorage.getItem('email'),
            token: localStorage.getItem('token'),
          
          },
        
        };
         default: return state;

    }

};

export default userReducer;