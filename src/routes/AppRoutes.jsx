import {Router, Routes, Route} from'react-router-dom';
import Home from '../components/Home';
import TableUser from '../components/TableUser';
import Login from '../components/Login';
import PrivateRoute from './PrivateRoute';
import NotFound from '../components/NotFound';
const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element = { <Home/>}/>          
                <Route path='/login' element={ <Login/> }/>
                <Route
                    path="/user"
                    element={
                        <PrivateRoute>
                        <TableUser/>
                        </PrivateRoute>
                    }
                />
                   <Route path='*' element={ <NotFound/>  }/>
            </Routes>
        </>

    )
  
}
export default AppRoutes