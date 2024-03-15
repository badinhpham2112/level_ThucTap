import {useSelector} from 'react-redux'
import Alert from 'react-bootstrap/Alert';
const PrivateRoute = (props) => {
    const user  = useSelector(state => state.user.user)
    if(user && user.auth === null || user.auth === false){
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