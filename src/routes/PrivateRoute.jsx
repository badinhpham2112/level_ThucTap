import { UserContext } from '../UseContext/UseContext';
import {useContext} from "react"
import Alert from 'react-bootstrap/Alert';
const PrivateRoute = (props) => {
    const { user } = useContext(UserContext);
    if(user && user.auth === false){
        return(
            // <span>Bạn cần đăng nhập để có thể vào trang này</span>

            <Alert variant="danger">
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <p>
                Bạn cần đăng nhập để có thể vào trang này
            </p>
          </Alert>

        )
          
    }
    return(
        <>
         {props.children}
        </>
        
    )
}

export default PrivateRoute