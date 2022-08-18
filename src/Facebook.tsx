import {getAuth, signInWithPopup, FacebookAuthProvider} from "firebase/auth";
import {initializeApp} from "firebase/app";
import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
} from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyAJVU14uGCka8Yi4i3BJ8ogpCuynzqLL_A",
    authDomain: "react-lakara-login.firebaseapp.com",
    projectId: "react-lakara-login",
    storageBucket: "react-lakara-login.appspot.com",
    messagingSenderId: "620424597739",
    appId: "1:620424597739:web:5b13be4949215bf8326eae"
};

const provider = new FacebookAuthProvider();
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export const SingFacebook = ():any => {
    signInWithPopup(auth, provider)
        .then(async (result) => {
            const user = result.user;
            const credential = FacebookAuthProvider.credentialFromResult(result);
            const accessToken = credential?.accessToken;
            const q = query(collection(db, "users"), where("uid", "==", user.uid));
            const docs = await getDocs(q);
            if (docs.docs.length === 0) {
                await addDoc(collection(db, "users"), {
                    uid: user.uid,
                    name: user.displayName,
                    authProvider: "google",
                    email: user.email,
                });
            }
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = FacebookAuthProvider.credentialFromError(error);
            console.log(credential, errorMessage, errorCode, email);
        });
}
