import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./signout.css";
import Form from "react-bootstrap/Form";
import loginIcon from "../images/newlogo.png";
import Background from "../images/background.png";

export default function Signout({ updateLoginStatus, setIsAdmin }) {
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(true);

    const handleSignout = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("isAdmin");
        updateLoginStatus(false);
        setIsAdmin(false);
        navigate("/login");
    };

    const handleCancel = () => {
        setShowPopup(false);
    };

    const handleBackToHome = () => {
        navigate("/");
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowPopup(true);
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="signout-container">
            <img
                src={Background}
                alt="Background"
                className="backimg-signout"
            />
            {showPopup && (
                <div className="popup">
                    <Form className="signout-form">
                        <img
                            src={loginIcon}
                            alt="Login Icon"
                            className="icon-img"
                        />
                        <h3 className="signout">Do you want to sign out?</h3>
                        <button
                            type="button"
                            className="yes"
                            onClick={handleSignout}
                        >
                            Yes
                        </button>
                        <button
                            type="button"
                            className="cancel"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                    </Form>
                </div>
            )}
            {!showPopup && (
                <button
                    type="button"
                    className="back-home"
                    onClick={handleBackToHome}
                >
                    Back to Home
                </button>
            )}
        </div>
    );
}
