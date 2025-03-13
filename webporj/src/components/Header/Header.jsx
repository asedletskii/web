import React, { useState } from "react";
import Button from "../Button/Button";
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, AuthModal } from "../Auth/Auth";

export default function Header() {
    const { user, logout } = useAuth();
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [initialAuthMode, setInitialAuthMode] = useState('login');
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const navigate = useNavigate();

    const handleAuthClick = () => {
        setInitialAuthMode('register');
        setShowAuthModal(true);
    };

    const handleLoginClick = () => {
        setInitialAuthMode('login');
        setShowAuthModal(true);
    };

    const handleAuthSuccess = (userData) => {
        // The AuthModal component will handle updating the user context
        setShowAuthModal(false);
    };

    const handleLogout = () => {
        logout();
        setShowProfileMenu(false);
        // Redirect to home if currently on profile page
        if (window.location.pathname === '/profile') {
            navigate('/');
        }
    };

    const getInitials = (name) => {
        if (!name) return '';
        return name.charAt(0).toUpperCase();
    };

    return (
        <header>
            <p>
                <Link to="/" className="text">Wishlify</Link>
            </p>
            <div className="button-container">
                <Button>Тарифы</Button>
                <Link to="/about">
                    <Button>О проекте</Button>
                </Link>

                {user ? (
                    <>
                        <Link to="/profile">
                            <Button>Мои списки</Button>
                        </Link>
                        <div className="profile-menu">
                            <button
                                className="profile-button"
                                onClick={() => setShowProfileMenu(!showProfileMenu)}
                            >
                                <div className="profile-avatar">
                                    {getInitials(user.username)}
                                </div>
                            </button>
                            {showProfileMenu && (
                                <div className="profile-menu-dropdown">
                                    <div className="profile-menu-item">
                                        <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
                                            Профиль
                                        </Link>
                                    </div>
                                    <div className="profile-menu-divider"></div>
                                    <div className="profile-menu-item" onClick={handleLogout}>
                                        Выйти
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <>
                        <Button onClick={handleLoginClick}>Войти</Button>
                        <Button className="signup" onClick={handleAuthClick}>Регистрация</Button>
                    </>
                )}
            </div>

            {/* Authentication Modal */}
            <AuthModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
                initialMode={initialAuthMode}
                onAuthSuccess={handleAuthSuccess}
            />
        </header>
    );
}