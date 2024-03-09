import { useEffect, useState } from 'react';
import '../App.scss'
import { login } from '../services/useService';
import {  toast } from 'react-toastify';
import { useNavigate} from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
import { UserContext } from '../UseContext/UseContext';
import {useContext} from "react"
const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const { loginContext } = useContext(UserContext);

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
        setLoading(true)
        let res = await login(email.trim(), password)
      
        if(res && res.token){
            loginContext(email, res.token)
            navigate("/")
            toast.success("Login thành công")
          
        }else{
            if(res && res.status === 400){
                toast.error(res.data.error)

            }
        }
        setLoading(false)
          
    }

    const handleKeyDown = (event) => {
    
        if(event && event.key === "Enter"){
            handleLogin()
        }

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
            disabled={loading || (!email || !password)}
            className={email && password ? "btn btn-danger border-0" : "py-1 border-0"}>
               {loading &&
               <Spinner
               as="span"
               animation="border"
               size="sm"
               role="status"
               aria-hidden="true"
               />
               } 
                Login</button>
            <h2 className="fs-6 my-4 text-center "><i className="fas fa-chevron-left"></i> Go back</h2>
        </div>
    )

}

export default Login;