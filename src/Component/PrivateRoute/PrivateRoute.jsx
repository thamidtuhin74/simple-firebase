import React, { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProviders';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {

    const  location = useLocation();
    console.log(location);

    const {user , loading} = useContext(AuthContext);
    if(loading){
        return <progress className="progress w-56"></progress>
    }
    // if(user){
    //     return children;
    // }
    // else{
    //     <Navigate to="/login" replace={true}></Navigate>
    // }

    return (
        <div>
            {
                user ? children : <Navigate to="/login" state={{from: location}} replace={true}></Navigate>
            }
            
        </div>
    );
};

export default PrivateRoute;