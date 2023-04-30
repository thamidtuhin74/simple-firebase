import React, { useContext, useRef, useState } from 'react';
import {FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signInWithEmailAndPassword, signOut, sendPasswordResetEmail} from 'firebase/auth'
import app from '../../firebase/firebase.init';
import { AuthContext } from '../../Provider/AuthProviders';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';


const Login = () => {

    // useNavigate
    const navigate = useNavigate();

    //Load COntextapi

    const {signIn , loading} = useContext(AuthContext);

    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    console.log(from);


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

        // // *rivate LoGIN
        // signInWithEmailAndPassword(auth, email, password)
        
        // Global Login
        signIn(email, password)
            .then(result => {
                const user  = result.user;
                setSuccess('User Login successfully');
                navigate(from, {replace: true});
                
            })
            .catch(error => {
                // console.error(error.code);
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
            <h3 className='text-4xl font-bold my-10'>PLease Login</h3>

            <form onSubmit={handleLoginSubmit}>
                <input className="input w-full max-w-xs" type="email" name="email" ref={emailRef} id="email" placeholder='Your Email' required /><br /><br />
                <input className="input w-full max-w-xs" onBlur={onBlurhandeler} type={seePassword?'text':'password'} name="password" id="password" placeholder='password' required/><br /><br />

                <input className="btn btn-primary" type="submit" value="Login" /><br />
                <p><small>Forget Password? Please <button onClick={handleResetPassword} className='btn btn-link'>Reset Password</button></small></p>
                <p className='text-danger'>{error}</p>
                <p className='text-success'>{success}</p>
            </form>

            {/* {/* ? */}

            
            {
                user ? 
                <button onClick={()=>signOutHndler()}>Sign Out</button>:
                <div>
                    <button className='btn bg-blue-500 btn-ghost normal-case text-xl ml-2' onClick={()=>googleLoginHandler()}>Google Login</button>
                    <button className='btn bg-blue-500 btn-ghost normal-case text-xl ml-2' onClick={()=>githubLoginHandler()}>GitHub Login</button>
                    <button className='btn bg-blue-500 btn-ghost normal-case text-xl ml-2' onClick={()=>facebookLoginHandler()}>Facebook Login</button>    

                </div>

            }
            {user&&<div>
                <h3>name : {user.displayName}</h3>
                <p>email : {user.email}</p>
                <img src={user.photoURL} alt="" />
            </div>}
            
        </div>

        // <div className="hero min-h-screen bg-base-200">
        //     <div className="hero-content flex-col lg:flex-row-reverse">
        //         <div className="text-center lg:text-left">
        //             <h1 className="text-3xl font-bold">Login now!</h1>
        //         </div>
        //         <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        //             <div className="card-body">
        //             <div className="form-control">
        //                 <label className="label">
        //                 <span className="label-text">Email</span>
        //                 </label>
        //                 <input type="text" placeholder="email" className="input input-bordered" />
        //             </div>
        //             <div className="form-control">
        //                 <label className="label">
        //                 <span className="label-text">Password</span>
        //                 </label>
        //                 <input type="text" placeholder="password" className="input input-bordered" />
        //                 <label className="label">
        //                 <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
        //                 </label>
        //             </div>
        //             <div className="form-control mt-6">
        //                 <button className="btn btn-primary">Login</button>
        //             </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    );
};

export default Login;
