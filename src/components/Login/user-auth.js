import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebase.config';
import { useState } from "react";
firebase.initializeApp(firebaseConfig)
const Auth = () =>{
    const [user,setUser] = useState(null);
    const provider = new firebase.auth.GoogleAuthProvider();
    const signInWithGoogle =() =>{
        
        firebase.auth().signInWithPopup(provider)
        .then(res=>{
             const {displayName,email,photoURL} = res.user;
             const signInUser = {name:displayName,email,photo:photoURL} ;
             setUser(signInUser);
             console.log(res)
             return res.user;
        })
        .catch(err=>{
            setUser(null)
            console.log(err)
            return err.message;
        })
    }
    const signOut = () =>{
        firebase.auth().signOut().then(res=> {
            console.log(res)
            setUser(null)
          }).catch(err=> {
            console.log(err)
          });
          
    }
    return {
        user,
        signInWithGoogle,
        signOut
    }
}

export default Auth;