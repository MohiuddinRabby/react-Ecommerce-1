import React, { useContext, useEffect } from "react";
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebase.config";
import { useState, createContext } from "react";
import { Route, Redirect } from "react-router-dom";

firebase.initializeApp(firebaseConfig);
const AuthContex = createContext();

export const AuthContexProvider = (props) => {
  const auth = Auth();
  return (
    <AuthContex.Provider value={auth}>{props.children}</AuthContex.Provider>
  );
};
//custom hook useAuth
export const useAuth = () => useContext(AuthContex);
const getUser = (user) => {
  const { displayName, email, photoURL } = user;
  return { name: displayName, email, photo: photoURL };
};
//auth route
export const PrivateRoute = ({ children, ...rest }) => {
  const auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
//
const Auth = () => {
  const [user, setUser] = useState(null);
  const provider = new firebase.auth.GoogleAuthProvider();
  const signInWithGoogle = () => {
    return firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => {
        const signInUser = getUser(res.user);
        setUser(signInUser);
        return res.user;
      })
      .catch((err) => {
        setUser(null);
        console.log(err);
        return err.message;
      });
  };
  const signOut = () => {
   return  firebase
      .auth()
      .signOut()
      .then((res) => {
        setUser(null);
        return true
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  };
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        const currentUser = getUser(user);
        setUser(currentUser);
        console.log(currentUser);
      } else {
        // No user is signed in.
      }
    });
  }, []);
  return {
    user,
    signInWithGoogle,
    signOut,
  };
};

export default Auth;
