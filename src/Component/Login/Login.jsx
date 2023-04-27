import React, { useRef, useState } from 'react';
import {FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signInWithEmailAndPassword, signOut, sendPasswordResetEmail} from 'firebase/auth'
import app from '../../firebase/firebase.init';


const Login = () => {

    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const emailRef = useRef();
    const [seePassword , setSeePassword] = useState(false);

    const [user , setUser] = useState(null);

    const auth  =  getAuth(app);
    const provider = new GoogleAuthProvider;
    const gitProvider =  new GithubAuthProvider();
    const fbProvider = new FacebookAuthProvider();

    // const seePass = false;

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
        signInWithPopup(auth , fbProvider)
        .then(result => {
            const logInUser = result.user;
            console.log(logInUser);
            setUser(logInUser)
        })
        .catch(result =>{
            console.log(result.message)
        })
    }


    // LOGIN HAndeller With Email & Password

    const handleLoginSubmit = (event) =>{
        
        event.preventDefault();
        setSuccess('');

        const email = event.target.email.value;
        const password = event.target.password.value;

        console.log(email , password);

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user  = result.user;
                setSuccess('User Login successfully');
            })
            .catch(error => {
                console.error(error.code);
                setError(error.code);
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



    //handleResetPassword 

    const handleResetPassword = event =>{
        const email = emailRef.current.value;//get the current email value using useRef hook
        if(!email){
            alert('Please Put Your Email!');
            return
        }
        
        sendPasswordResetEmail(auth, email)
        .then(result=>{
            alert('Check Your Email!');
        })
        .catch(error =>{
            alert(error.message)
        })
        
    }
    const onBlurhandeler = event =>{
        setSeePassword(true);
    }
    

    
    

    return (
        <div>
            <h3>PLease Login</h3>

            <form onSubmit={handleLoginSubmit}>
                <input type="email" name="email" ref={emailRef} id="email" placeholder='Your Email' required /><br /><br />
                <input onBlur={onBlurhandeler} type={seePassword?'text':'password'} name="password" id="password" placeholder='password' required/><br /><br />

                <input type="submit" value="Login" /><br />
                <p><small>Forget Password? Please <button onClick={handleResetPassword} className='btn btn-link'>Reset Password</button></small></p>
                <p className='text-danger'>{error}</p>
                <p className='text-success'>{success}</p>
            </form>
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