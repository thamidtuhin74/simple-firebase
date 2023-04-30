import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Header.css'
import { AuthContext } from '../../Provider/AuthProviders';

const Header = () => {

    // COntext API load

    const {user, logout} = useContext(AuthContext);
    // console.log('header : ' + user.email);


    const logoutHandler = () =>{
        logout()
            .then(()=>{

            })
            .catch(error =>{
                console.log()
            })

        }
    

    return (
        // <div>
        //     <Link to={'/'}>Home</Link>
        //     <Link to={'/login'}>Login</Link>
        //     <Link to={'/register'}>Register</Link>

        // </div>

        <div className="navbar bg-primary text-primary-content">
            <div className="flex-1">
                <a className="btn btn-ghost normal-case text-xl">Firebase Auth</a>
            </div>
            <div>
                <Link className="btn btn-ghost normal-case text-xl" to={'/'}>Home</Link>
                <Link className="btn btn-ghost normal-case text-xl" to={'/order'}>Order</Link>
                <Link className="btn btn-ghost normal-case text-xl" to={'/profile'}>Profile</Link>

                {user?
                    <div className="userinfo flex items-center">
                        
                        <p className='bg-black rounded-lg'>{user?.email}</p>
                        
                        <Link onClick={logoutHandler} className="btn btn-ghost normal-case text-xl" to={'/register'}>Sign Out</Link>
                    </div>:
                    <div className="login-register">
                        <Link className="btn btn-ghost normal-case text-xl" to={'/login'}>Login</Link>
                        <Link className="btn btn-ghost normal-case text-xl" to={'/register'}>Register</Link>
                    </div>
                    
                }
            </div>
            <div>
                
            </div>
        </div>
    );
};

export default Header;