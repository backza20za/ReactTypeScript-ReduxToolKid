import * as React from "react";
import { Layout } from 'antd';
import { logout } from '../../store/slices/authenSlices'
import { useAppDispatch } from '../../store/store'
type HeaderProps = {
    //
};
const { Header } = Layout;
const HeaderComponent: React.FC<any> = () => {
    const dispatch = useAppDispatch()
    const logOut = async () => {
        await dispatch(logout)
        await localStorage.removeItem("token")
    }
    return (
        <>
            <Header className="header">
                <div className="logo" />

                <button style={{ float: "right" }} onClick={logOut}>logOut</button>
            </Header>
        </>);
};

export default HeaderComponent;
