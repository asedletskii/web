import React, { useState } from 'react';
import './Auth.css';
import { createContext, useContext, useEffect } from 'react';

// Registration Component
export const Registration = ({ onClose, onSwitchToLogin, onRegisterSuccess }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        username: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        // Validation
        if (!formData.email || !formData.password || !formData.confirmPassword || !formData.username) {
            setError('Все поля должны быть заполнены');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Пароли не совпадают');
            return;
        }

        // Here you would typically send the registration data to your backend
        // For now, we'll simulate a successful registration
        const user = {
            email: formData.email,
            username: formData.username,
            id: Date.now() // Mock user ID
        };

        // Store user in localStorage (for demo purposes)
        localStorage.setItem('wishlifyUser', JSON.stringify(user));

        // Call the success callback
        onRegisterSuccess(user);
        onClose();
    };

    return (
        <div className="auth-form">
            <h2>Регистрация</h2>
            {error && <div className="auth-error">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Имя пользователя</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Введите имя пользователя"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Электронная почта</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Введите email"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Пароль</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Введите пароль"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Подтверждение пароля</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Повторите пароль"
                    />
                </div>
                <div className="auth-buttons">
                    <button type="button" onClick={onClose} className="button">Отмена</button>
                    <button type="submit" className="button button-primary">Зарегистрироваться</button>
                </div>
            </form>
            <p className="auth-switch">
                Уже есть аккаунт? <button onClick={onSwitchToLogin} className="link-button">Войти</button>
            </p>
        </div>
    );
};

// Login Component
export const Login = ({ onClose, onSwitchToRegistration, onLoginSuccess }) => {
    // ... оставляем без изменений
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        // Validation
        if (!formData.email || !formData.password) {
            setError('Все поля должны быть заполнены');
            return;
        }

        // Check if user exists (simulated)
        const storedUser = localStorage.getItem('wishlifyUser');

        if (storedUser) {
            const user = JSON.parse(storedUser);

            // In a real app, you would check the password on the server
            // For this demo, we'll just check if the email matches
            if (user.email === formData.email) {
                onLoginSuccess(user);
                onClose();
                return;
            }
        }

        setError('Неверный email или пароль');
    };

    // Login Component


        return (
            <div className="auth-form">
                <h2>Вход в аккаунт</h2>
                {error && <div className="auth-error">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Электронная почта</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Введите email"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Пароль</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Введите пароль"
                        />
                    </div>
                    <div className="auth-buttons">
                        <button type="button" onClick={onClose} className="button">Отмена</button>
                        <button type="submit" className="button button-primary">Войти</button>
                    </div>
                </form>
                <p className="auth-switch">
                    Нет аккаунта? <button onClick={onSwitchToRegistration} className="link-button">Зарегистрируйтесь!</button>
                </p>
            </div>
        );
    };

// AuthModal Component
export const AuthModal = ({ isOpen, onClose, initialMode = 'login', onAuthSuccess }) => {
    const [mode, setMode] = useState(initialMode);

    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content auth-modal">
                {mode === 'login' ? (
                    <Login
                        onClose={onClose}
                        onSwitchToRegistration={() => setMode('register')}
                        onLoginSuccess={onAuthSuccess}
                    />
                ) : (
                    <Registration
                        onClose={onClose}
                        onSwitchToLogin={() => setMode('login')}
                        onRegisterSuccess={onAuthSuccess}
                    />
                )}
            </div>
        </div>
    );
};

// AuthContext for managing authentication state across the app


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is already logged in
        const storedUser = localStorage.getItem('wishlifyUser');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('wishlifyUser', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('wishlifyUser');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};