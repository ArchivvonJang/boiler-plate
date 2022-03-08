import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";


//Routing 관련된 일을 처리한다.
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from "./components/views/RegisterPage/RegisterPage";


function App() {
  return (
    <BrowserRouter>

    <Routes>
        <Route exact path="/" element = {<LandingPage/>}/>
        <Route path="/login" element = {<LoginPage/>}/>
        <Route path="/register" element = {<RegisterPage/>}/>
    </Routes>
    
  </BrowserRouter>
  );
}


export default App;
