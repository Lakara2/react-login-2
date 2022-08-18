import React from 'react';
import './App.css';
import {BrowserRouter, Link, Route, Router, Routes} from "react-router-dom";
import Login from "./components/Login";
import Social from "./components/Social";


function App() {
    return(
           <BrowserRouter>
                  <Routes>
                        <Route path="/" element={<Login/>}/>
                        <Route path="/Social" element={<Social/>}/>
                  </Routes>
           </BrowserRouter>
    );
}
export default App;
