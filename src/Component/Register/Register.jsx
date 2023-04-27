import React, { useState } from 'react';
// import {getAuth, } from 'firebase/auth';
import {signInWithEmailAndPassword, getAuth, createUserWithEmailAndPassword, signOut, sendEmailVerification} from 'firebase/auth'

import app from '../../firebase/firebase.init';
import { Alert } from 'bootstrap';



const Register = () => {
    
    const auth = getAuth(app);


    //Validation Begin
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    //Validation End


    const [newuser , setNewUser] = useState({})
    const [password , setPassword] = useState('')
    const [seePassword , setSeePassword] = useState(false);



    //3 ways of taking input value from input field: 
    
    // 1. Using State component & onChange 
    const [email , setEmail] =  useState('');

    const handleEmailChange =(event) =>{
        console.log(event.target.value);
        setEmail(event.target.value);
    }

    // 2. Using onBlur:

    const handlePasswordBlur =(event) =>{
        console.log(event.target.value);
        setSeePassword(true);

    }
    // /(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%/\^&*])(?=.{8,})/.test('wea!1sdasA')
    // (?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})
    // 3. Using onSummit : 

    const handleSubmit =(event)=>{
        event.preventDefault();//to stop reloading After submitting

        setError('');
        setSuccess('')

        console.log(event.target.email.value);
        const email = event.target.email.value;
        const password = event.target.password.value;
        const name = event.target.name.value;
        //validation in one expression
        // if(!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(password)){
        //     setError('Make sure a strong password that contains atleast one Uppercase letter,one digit(0-9),one special character, length should be 8 or more');
        //     return;

        // }
        //validation in multiple expression
        if(!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(password)){
            setError('Make sure a strong password that contains atleast one Uppercase letter,one digit(0-9),one special character, length should be 8 or more');
            return;

        }
        else if(!/(?=.*[A-Z])/.test(password)){
            setError('Make sure password contains atleast one Uppercase letter');
            return;
        }
        else if(!/(?=.*[0-9])/.test(password)){
            setError('Make sure password contains atleast one digit(0-9)');
            return;
        }
        else if(!/(?=.*[!@#\$%\^&\*])/.test(password)){
            setError('Make sure password contains atleast one special character');
            return;
        }
        
        setPassword(password);

        console.log(email + '  '+ password + name);

        createUserWithEmailAndPassword(auth, email, password, name)
        .then(result =>{
            const logInUser = result.user;
            console.log(logInUser);
            setSuccess('User has been added Successfully');
            event.target.reset();//clear input field after successfull submission
            setNewUser(logInUser);

            // EMail Varification

            emailVarification(logInUser);
            updateUserHandler(logInUser , name)

        })
        .catch(error=>{
            console.error(error.code);
            console.error(error.message);
            setError(error.message);
            
        })

    }

    const emailVarification = user =>{
        sendEmailVerification(user)
            .then(result=>{
                // console.log(result.user);
                alert('please Varify your email');
            })
    }

    const updateUserHandler = (user, name) =>{
        updateProfile(user , {
            displayName : name
        })
            .then(()=>{
                console.log(user.displayName);
            })
            .catch(error=>{
                setError(error.message);
            })
    }

    return (
        <div>
            <h3>This is register</h3>
            <form onSubmit={handleSubmit}>
                
                 <input type="text" name="name" id="name" placeholder='Your Name' required /><br /><br />
                <input onChange={handleEmailChange} type="email" name="email" id="email" placeholder='Your Email' required /><br /><br />
                <input onBlur={handlePasswordBlur} type={seePassword?'text':'password'} name="password" id="password" placeholder='password' required/><br />
                
                <p className='text-warning'>{error}</p>
                <p className='text-success'>{success}</p>

                <input type="submit" value="Register" />
            </form>
            <h4>User EMAIL : {newuser?.email}</h4>
            <h4>User Password : {password}</h4>
            <h2>Last SignIn at  : {newuser?.metadata?.lastSignInTime}</h2>
            {/* <h2>EMAIL : {password}</h2> */}

        </div>
    );
};

export default Register;