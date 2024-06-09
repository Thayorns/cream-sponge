import React, { useEffect } from "react";
import { useAddQRcodeMutation } from "../api/apiSlice";
import { RootState } from "../../app/store/store";
import { useSelector } from 'react-redux';
import { Spin } from 'antd';

import './qr.css';
import '../../app/styles/normalize.css';
import '../../app/styles/vars.css';

const Qr: React.FC = () => {

    const [addQRcode, { isLoading: isSaving, error }] = useAddQRcodeMutation();
    
    // использую глобал-стейт авторизованного
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const userLogin = useSelector((state: RootState) => state.auth.login);
    // использую глобал стейт приходящего с сервера qr
    const numberFromStore = useSelector((state: RootState) => state.qr.number);
    const qrUrlFromStore = useSelector((state: RootState) => state.qr.qrCode);
    const loginStatusSuccessFromStore = useSelector((state: RootState) => state.qr.loadingStatus);
    
    console.log('component renders', numberFromStore);
    
    
    useEffect(() => {
        addQRcode({ login: userLogin })
    }, [addQRcode, userLogin]);
    
    let content: React.ReactNode;
    const errorDisplay: React.ReactNode = error as React.ReactNode;

    if(isSaving) {
        content = <Spin/>
    }
    if(isAuthenticated === false){
        content = (
            <div className="auth-error">
                <h2>Пожалуйста, войдите в свой аккаунт, и Вам будет доступна акция подарочного кофе по qr-коду, возможность стать другом "Крем и Корж" и 15% скидкой на всю продукцию.</h2>
            </div>
        )

    }else if(loginStatusSuccessFromStore === 'succeeded'){
        content = (
            <div className="qr-div">
                <h1>ВАШ КОД</h1>
                <span>Покажите или назовите код кассиру в "Крем и Корж", чтобы накопить подарочный кофе.</span>
                <img src={qrUrlFromStore} alt="qr-code"/>
                <h2>{numberFromStore}</h2>
            </div>
        )
    }else content = <div>{errorDisplay}</div>

    return content;
};
export default Qr;