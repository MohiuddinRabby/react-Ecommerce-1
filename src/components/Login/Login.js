import React from "react";
import Auth from "./user-auth";

const Login = () => {
  const auth = Auth();
  const handleSignIn = () => {
    auth.signInWithGoogle()
    .then(res=>{
        window.location.pathname = "/review";
    })
  };
  const handleSignOut = () =>{
      auth.signOut()
      .then(res=>{
          window.location.pathname="/"
      })
  }
  return (
    <div>
      <h1>SingIn  SignOut page</h1>
      {auth.user ? (
        <button onClick={handleSignOut}>SignOut</button>
      ) : (
        <button onClick={handleSignIn}>SignIn with Google</button>
      )}
    </div>
  );
};

export default Login;
