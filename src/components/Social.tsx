import React from 'react';
import '../App.css';
import {useNavigate} from "react-router-dom";
import {logout} from "../firebase";

const Caisse = () =>{
    let navigate = useNavigate();
    const routeChange = () =>{
        let path = `/`;
        navigate(path);
    }
    return(
<>
    <div className="container-fluid">
        <div className="row align-items-center justify-content-center d-flex" >
            <div className="text-dark d-flex justify-content-center align-items-center col-4">
                <h1 className="text-dark">You are connected </h1>
            </div>
            <div className="text-dark d-flex justify-content-center align-items-center col-4">
                <button className="btn bg-primary one input100 mt-5 mb-4 text-light text-uppercase" id={"Caisse"} onClick={routeChange} onChange={logout}> Log Out </button>
            </div>
        </div>
    </div>
</>
    );
};
export default Caisse;
