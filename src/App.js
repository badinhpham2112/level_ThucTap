import { useContext, useEffect }  from 'react';
import './App.scss';
import Header from './components/Header';
import Container from 'react-bootstrap/Container';
import { ToastContainer} from 'react-toastify';
import {UserContext} from './UseContext/UseContext'
import AppRoutes from './routes/AppRoutes';


function App() {
  const { user, loginContext } = useContext(UserContext);
  console.log(">>> check useContext: ", user)

  useEffect(() => {
    if(localStorage.getItem('token')){
      loginContext(localStorage.getItem('email'), localStorage.getItem('token'))

    }
  }, [])

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
