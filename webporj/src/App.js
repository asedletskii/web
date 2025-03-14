import React, { useState } from 'react';
import { AuthProvider, useAuth, AuthModal } from './components/Auth/Auth';
import './App.css';

// Header component with authentication buttons
const Header = () => {
    const { user, logout } = useAuth();
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [authMode, setAuthMode] = useState('login');

    const handleShowLogin = () => {
        setAuthMode('login');
        setShowAuthModal(true);
    };

    const handleShowRegister = () => {
        setAuthMode('register');
        setShowAuthModal(true);
    };

    const handleAuthSuccess = (userData) => {
        console.log('Authentication successful:', userData);
        // Any additional actions after successful authentication
    };

    return (
        <header className="app-header">
            <div className="logo">Wishlify</div>
            <div className="auth-controls">
                {user ? (
                    <>
                        <span className="welcome-text">Привет, {user.username}!</span>
                        <button onClick={logout} className="button">Выйти</button>
                    </>
                ) : (
                    <>
                        <button onClick={handleShowLogin} className="button">Войти</button>
                        <button onClick={handleShowRegister} className="button button-primary">Регистрация</button>
                    </>
                )}
            </div>

            <AuthModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
                initialMode={authMode}
                onAuthSuccess={handleAuthSuccess}
            />
        </header>
    );
};

// Main App component
const App = () => {
    return (
        <AuthProvider>
            <div className="app">
                <Header />
                <main className="app-content">
                    {/* Your app content here */}
                    <ProtectedContent />
                </main>
            </div>
        </AuthProvider>
    );
};

// Example of a protected component that requires authentication
const ProtectedContent = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (!user) {
        return (
            <div className="welcome-container">
                <h1>Добро пожаловать в Wishlify!</h1>
                <p>Пожалуйста, войдите или зарегистрируйтесь, чтобы продолжить.</p>
            </div>
        );
    }

    return (
        <div className="protected-content">
            <h1>Ваш личный кабинет</h1>
            <p>Добро пожаловать, {user.username}! Теперь у вас есть доступ к системе.</p>
            {/* Your protected app content here */}
        </div>
    );
};

export default App;