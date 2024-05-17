import React, { createContext, useEffect, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Initialize isAuthenticated based on the presence of token in localStorage
    return localStorage.getItem("token") ? true : false;
  });
  let [user,setUser] = useState(JSON.parse(localStorage.getItem("user")))


  // useEffect(()=>{
  //   if(localStorage.getItem("token"))
  //     setIsAuthenticated(true);
  // },[])
  const login = (data) => {
    // Implement your login logic here
    localStorage.setItem("user",JSON.stringify(data?.user))
    localStorage.setItem("token",data?.token)
    setIsAuthenticated(true);
  };

  const logout = () => {
    // Implement your logout logic here
    setIsAuthenticated(false);
    localStorage.setItem("token","")
  };
console.log(user)
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout ,setUser,user}}>
      {children}                                         
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
