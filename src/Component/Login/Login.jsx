import React, { useState } from 'react';
import {FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut} from 'firebase/auth'
import app from '../../firebase/firebase.init';


const Login = () => {

    const [user , setUser] = useState(null);

    const auth  =  getAuth(app);
    const provider = new GoogleAuthProvider;
    const gitProvider =  new GithubAuthProvider();
    const fbProvider = new FacebookAuthProvider();


    // LOGIN Handler

    const googleLoginHandler = () =>{
        signInWithPopup(auth , provider)
        .then(result =>{
            const logInUser = result.user;
            console.log(logInUser);
            setUser(logInUser)
        })
        .catch(result =>{
            console.log(result.message)
        })
        console.log('clicked');
    }
    const githubLoginHandler =() =>{
        signInWithPopup(auth , gitProvider)
        .then(result => {
            const logInUser = result.user;
            console.log(logInUser);
            setUser(logInUser)
        })
        .catch(result =>{
            console.log(result.message)
        })
    }

    const facebookLoginHandler = () =>{
        signInWithPopup(auth , gitProvider)
        .then(result => {
            const logInUser = result.user;
            console.log(logInUser);
            setUser(logInUser)
        })
        .catch(result =>{
            console.log(result.message)
        })
    }


    //LOGOUT Handler

    const signOutHndler =() =>{
        signOut(auth)
        .then(result =>{
            console.log('You Logout Successfully');
            setUser(null);
            console.log(user);
        })
        .catch(error =>{
            console.log(error.message);
            // console.log(user);
        })
    }

    
    

    return (
        <div>
            <h3>This is Login</h3>
            {
                user ? 
                <button onClick={()=>signOutHndler()}>Sign Out</button>:
                <div>
                    <button onClick={()=>googleLoginHandler()}>Google Login</button>
                    <button onClick={()=>githubLoginHandler()}>GitHub Login</button>
                    <button onClick={()=>facebookLoginHandler()}>Facebook Login</button>    

                </div>

            }
            {user&&<div>
                <h3>name : {user.displayName}</h3>
                <p>email : {user.email}</p>
                <img src={user.photoURL} alt="" />
            </div>}
            
        </div>
    );
};

export default Login;