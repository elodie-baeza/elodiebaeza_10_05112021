import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import { selectLogin } from "utils/selectors";

const PrivateRoute = ({ children }) => {
    const token = useSelector(selectLogin).data.token

    return token != null ? children : <Navigate to='/login' />
}

export default PrivateRoute
