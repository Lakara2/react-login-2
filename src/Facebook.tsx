import {getAuth, signInWithPopup, FacebookAuthProvider, GithubAuthProvider} from "firebase/auth";
import {initializeApp} from "firebase/app";
import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
} from "firebase/firestore";
import {auth} from "./firebase";
const firebaseConfig = {
    apiKey: "AIzaSyAJVU14uGCka8Yi4i3BJ8ogpCuynzqLL_A",
    authDomain: "react-lakara-login.firebaseapp.com",
    projectId: "react-lakara-login",
    storageBucket: "react-lakara-login.appspot.com",
    messagingSenderId: "620424597739",
    appId: "1:620424597739:web:5b13be4949215bf8326eae"
};

const FacebookProvider = new FacebookAuthProvider();
export const SignInWithFacebook = async ()=> {
    signInWithPopup(auth, FacebookProvider)
        .then ((result)=>{
            FacebookAuthProvider.credentialFromResult(result);
        }).catch((error)=>{
            FacebookAuthProvider.credentialFromError(error); })
}