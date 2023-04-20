import React, { useState } from 'react';
// import {getAuth, } from 'firebase/auth';
import {signInWithEmailAndPassword, getAuth, createUserWithEmailAndPassword, signOut} from 'firebase/auth'

import app from '../../firebase/firebase.init';



const Register = () => {
    
    const auth = getAuth(app);


    //Validation Begin
    const [error, setError] = useState('');
    //Validation End


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

    }
    
    // 3. Using onSummit : 

    const handleSubmit =(event)=>{
        event.preventDefault();//to stop reloading After submitting
        console.log(event.target.email.value);
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(email + '  '+ password);
        createUserWithEmailAndPassword(auth, email, password)
        .then(result =>{
            const logInUser = result.user;
            console.log(logInUser);
        })
        .catch(error=>{
            console.error(error.code);
            console.error(error.message);
            setError(error.message);
        })

    }

    return (
        <div>
            <h3>This is register</h3>
            <form onSubmit={handleSubmit}>
                <input onChange={handleEmailChange} type="email" name="email" id="email" placeholder='Your Email' required /><br />
                <input onBlur={handlePasswordBlur} type="password" name="password" id="password" placeholder='password' required/><br />
                <input type="submit" value="Register" />
            </form>
            <h2>EMAIL : {email}</h2>
            {/* <h2>EMAIL : {password}</h2> */}

        </div>
    );
};

export default Register;