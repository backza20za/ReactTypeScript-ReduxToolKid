import React from "react";
import { useSelector } from "react-redux";
import { authenSelector } from '../store/slices/authenSlices'
import { Navigate, Outlet } from "react-router-dom";

const PublicRoutes = () => {
    const getLogin = useSelector(authenSelector)
    const auth = getLogin.isLogin
    return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PublicRoutes;