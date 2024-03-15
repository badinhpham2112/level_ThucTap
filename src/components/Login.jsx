import { useEffect, useState } from 'react';
import '../App.scss'
import {  toast } from 'react-toastify';
import { useNavigate} from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
import { handleLoginRedux } from '../redux/actions/userAction';
import { useDispatch, useSelector } from 'react-redux'
const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const isLoading = useSelector(state => state.user.isLoading)
    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch()
    useEffect(() => {
        let token = localStorage.getItem('token');
        if(token){
            navigate("/")
            toast.success("Đã login")
        }
    })

    const handleLogin = async () => {
        if(!email || !password){
            toast.error("Chưa đăng nhập email và password")
            return;
        }
        
            dispatch(handleLoginRedux(email, password))
          
    }

    useEffect(() => {
        if(user && user.auth === true){
            navigate('/')
        }

    }, [user])

    const handleKeyDown = (event) => {
    
        if(event && event.key === "Enter"){
            handleLogin()
        }

    }

    const handleGoBack = () => {
        navigate("/")
    }
    return(
        <div className="col-10 col-sm-6 col-xl-3 mx-auto d-flex flex-column">
            <h3 className="text-center fs-5">Log in</h3>
            <div className="d-flex justify-content-between py-1">
                <b>Email or Usename</b>
                <b>Log in with phone</b>     
            </div>
            <input type="text"
            placeholder='EnterEmail...' 
            onChange={(event) => setEmail(event.target.value)}
           
            value={email}
            className="mb-2 p-2 input-email"/>
            <div className="input-password">
               <input type={showPassword === true  ? "text" : "password" }
               placeholder='Enter Password...' 
               className="p-2 w-100 text-input"
               value={password}
               onChange={(event) => setPassword(event.target.value)}
               onKeyDown={(event) => handleKeyDown(event)}
               />
               <i className={showPassword === true ?  "fas fa-eye" : "fas fa-eye-slash"} 
               onClick={() =>setShowPassword(!showPassword)}></i>
           

            </div>
          
            <div className="py-2">Forgot password?</div>
            <button
            onClick={() => handleLogin()}
           
            // disabled={email && password || loading === true ? false : true } 
            disabled={isLoading || (!email || !password)}
            className={email && password ? "btn btn-danger border-0" : "py-1 border-0"}>
               {isLoading &&
               <Spinner
               as="span"
               animation="border"
               size="sm"
               role="status"
               aria-hidden="true"
               />
               } 
                Login</button>
            <h2 style={{cursor: 'pointer'}}  
            onClick={() => handleGoBack()} 
            className="fs-6 my-4 text-center "><i className="fas fa-chevron-left"></i> Go back</h2>
        </div>
    )

}

export default Login;