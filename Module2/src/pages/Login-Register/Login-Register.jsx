import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import Login from "../Login";
import Register from "../Register";
import { useSelector } from "react-redux";

export default function LoginRegister(props) {
    const [isLogin, setIsLogin] = useState(true);
    const registerInfo = useSelector((store) => store.userRegister);

    const handleSwitchPage = () => {
        setIsLogin(!isLogin);
    };

    useEffect(() => {
        setIsLogin(registerInfo.loading);
    }, [registerInfo.loading]);
    return (
        <>
            <Modal
                {...props}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body>
                    {isLogin ? (
                        <Login handleSwitchPage={handleSwitchPage} />
                    ) : (
                        <Register handleSwitchPage={handleSwitchPage} />
                    )}
                </Modal.Body>
            </Modal>
        </>
    );
}
