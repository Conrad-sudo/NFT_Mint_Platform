import './App.css';
//allows us to use different state elements from react
//state is the data which we want the component to render
import React from "react";

//files that havent been created yet
import Admin from "./Admin"
import Home from "./Home"
import { BrowserRouter as Router ,Route,Link, Routes } from 'react-router-dom';



function App() {

  return (
  
  <Router>

    <Routes>

    <Route  path ="/" element={<Home/>}/>
    <Route  path ="/citadel" element={<Admin/>}/>
   

    </Routes>
   
    

  </Router>



 
  
  );



}

export default App;
