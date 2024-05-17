import React,{useContext} from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {routes,protectedRoutes} from '../config/routes';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import { AuthContext } from '../context/AuthContext'; // Assuming you have an AuthContext


const App = () => {
  const { user,logout,isAuthenticated} = useContext(AuthContext);
  return (
    <>
    
    <BrowserRouter>
    <Navbar isLoggedIn={isAuthenticated} name={user?.name || "Guest"}  onLogout={()=>
    {
      logout()

    }}/>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
         {protectedRoutes.map((route, index) => (
        <Route exact path='/' key={index} element={<ProtectedRoute/>}>
        <Route exact path={route.path} element={route.element}/>
      </Route>
        ))}
      </Routes>
    </BrowserRouter>
  </>
  )
}

export default App