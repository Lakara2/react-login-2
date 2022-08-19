import React, {useState} from "react";
import validator from "validator";
import '../App.css';
import {useNavigate} from "react-router-dom";
import {auth, logInWithEmailAndPassword, signInWithGoogle} from "../firebase";
import { getAuth, signInWithPopup, GithubAuthProvider } from "firebase/auth";
import {SignInWithFacebook} from "../Facebook";
import {Simulate} from "react-dom/test-utils";

const GitProvider = new GithubAuthProvider();
const SignInWithGithub = async ()=> {
    signInWithPopup(auth, GitProvider)
        .then ((result)=>{
            GithubAuthProvider.credentialFromResult(result);
    }).catch((error)=>{
        GithubAuthProvider.credentialFromError(error); })
}

const Login =() => {
        const [email,setEmail]= useState<string>('');
        const [password,setPassword]= useState<string>('');
        const [emailError,setemailError]= useState('');
        const [pw,setpwError]= useState('');
        const [nav,setnav]= useState('');
        const [pwstyle,setpwStyle]= useState<any>(null);
        const [navstyle,setnavStyle]= useState<any>(null);
        const [stylemail,setemailStyle]= useState<any>(null);


    let navigate = useNavigate();

    const routeChange = () =>{
        let path = `Social`;
        navigate(path);
    }

    const onChangeEmail = (event:any):void => {
      if(event.target.id === "email") {
          setEmail(event.target.value);
      }
    }
    const onChangePassword = (event:any):void => {
        if(event.target.id === "password") {
            setPassword(event.target.value);
        }
    }
    function emailValidator(e:any){
            let email = e.target.value

            if(validator.isEmail(email)){
                setemailError('email est valide');
                setemailStyle({color:'green'});
            }else{
                setemailError('veuillez entrer un email valide');
                setemailStyle({color:'red'});
            }
        }

        const pwValidator = (e:any) => {
            let pw = e.target.value

            if (pw===''){
                setpwError('please enter a valid password');
                setpwStyle({color:'red'});
            }
            if (pw.length<8){
                setpwError('votre password doit avoir plus de 8 caracteres');
                setpwStyle({color:'red'});
            }
            if (pw.length>15){
                setpwError('votre password ne doit pas avoir plus de 15 caracteres');
                setpwStyle({color:'red'});
            }
            else if (pw.length>=8 && pw.length<=15){
                setpwError('password approuver');
                setpwStyle({color:'green'});
            }
        }

        const navigateValid = (e:any) => {
            let nav = e.target.value
            if (pw.valueOf()==='password approuver' && emailError.valueOf()==='email est valide'){
                routeChange();
            }else{
                setnav('email ou password non valide');
                setnavStyle({color:'red'});
            }
        }

        return (
            <>
                <div className="contents order-2 order-md-1 mt-5">

                    <div className="container">
                        <div className="row align-items-center justify-content-center">
                            <div className="col-md-7">
                                <div className="mb-4 container-fluid">
                                    <div className="position-relative d-flex align-items-center justify-content-center mb-lg-5">
                                        <h1 className="text-uppercase text-dark"> SIGN <br/> </h1>
                                        <h1 className="text-uppercase text-primary"> <br/> IN </h1>
                                    </div>
                                    <p className="mb-4">  </p>
                                </div>
                                <form action="#" method="post">

                                    <div className="">
                                        <label htmlFor="username">Email</label>
                                        <input type="text" placeholder="write our email" className="input100 one" onChange={(e)=> {
                                            onChangeEmail(e);
                                            onChangePassword(e);
                                            logInWithEmailAndPassword(email,{password});
                                            emailValidator(e);
                                        }} id="email"/>
                                        <h6 style={stylemail}>{emailError}</h6>
                                    </div>

                                    <div className="">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" placeholder="write our password" className="input100 one" onChange={(e)=> pwValidator(e)} id="password"/>
                                        <h6 style={pwstyle} >{pw}</h6>
                                    </div>

                                    <div>
                                        <button className="btn bg-primary one input100 mt-5 mb-4 text-light text-uppercase" id={"Social"} onClick={(e)=> navigateValid(e)}> Log In </button>
                                        <h6 style={navstyle}>{nav}</h6>
                                    </div>

                                        <div>
                                        </div>
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-4">

                                                    <a onClick={signInWithGoogle}
                                                       className=" bg-warning btn d-flex one input100 justify-content-center align-items-center">
                                                        Google
                                                    </a>

                                                </div>

                                                <div className="col-4">
                                                    <a onClick={SignInWithFacebook}
                                                       className=" text-light btn bg-blue d-flex one input100 justify-content-center align-items-center">
                                                        Facebook
                                                    </a>
                                                </div>

                                                <div className="col-4">
                                                    <a onClick={SignInWithGithub}
                                                       className="bg-dark btn d-flex one input100 justify-content-center align-items-center text-light">
                                                        Github
                                                    </a>
                                                </div>

                                            </div>
                                        </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </>
    );
    };
export default Login;