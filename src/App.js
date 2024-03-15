import { useContext, useEffect }  from 'react';
import './App.scss';
import Header from './components/Header';
import Container from 'react-bootstrap/Container';
import { ToastContainer} from 'react-toastify';
import {UserContext} from './UseContext/UseContext'
import AppRoutes from './routes/AppRoutes';
import { useSelector, useDispatch } from 'react-redux'
import { handleRefetch } from './redux/actions/userAction';



function App(props) {

  const dispatch = useDispatch()
  useEffect(() => {
    if(localStorage.getItem('token')){
      dispatch(handleRefetch())

    }
  }, [])
  const dataRedux = useSelector((state) => state.user.user)
  console.log(">>check redux: ", dataRedux)
  return (<>
    <div className='app-container'>
      <Container>
         <Header/> 
          <AppRoutes />
      </Container>
   
       
    </div>
    <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        
        />
        
  </>
  
  );
}

export default App;
