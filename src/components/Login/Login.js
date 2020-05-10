import React from 'react';
import Auth from './user-auth';

const Login = () => {
    const auth = Auth();
    console.log(auth.user)
    return (
        <div>
            <h1>Login page</h1>
           {
               auth.user ? <button onClick={auth.signOut}>SignOut</button> :
               <button onClick={auth.signInWithGoogle}>SignIn with Google</button>
            }
        </div>
    );
};

export default Login;