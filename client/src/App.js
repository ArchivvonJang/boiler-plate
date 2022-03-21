import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


//Routing 관련된 일을 처리한다.
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import Auth from './hoc/auth'

function App() {
  return (
    <BrowserRouter>

    <Routes>                                                    
                                      
        <Route exact path="/" element = {Auth(LandingPage, null, true)}/>
        <Route path="/login" element = {Auth(LoginPage, false)}/>
        <Route path="/register" element = {Auth(RegisterPage, false)}/>
        
    </Routes>
    
  </BrowserRouter>
  );
}


export default App;
