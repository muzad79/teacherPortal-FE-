import Dashboard from "../src/pages/Dashboard";
import Login from "../src/pages/Login";
import Register from "../src/pages/Register";
import Home from "../src/pages/Home";

const routes = [
  { path: '/', element: <Home/> },
  { path: '/login', element:<Login/> },
  { path: '/register', element: <Register/> },
 
];

const protectedRoutes = [
  { path: '/dashboard', element: <Dashboard/> }
]

export {routes,protectedRoutes}
