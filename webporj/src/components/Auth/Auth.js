import React, { useState } from 'react';
import './Auth.css';
import { createContext, useContext, useEffect } from 'react';

// Backend API URL
const API_URL = 'http://localhost:5000';

// Registration Component
export const Registration = ({ onClose, onSwitchToLogin, onRegisterSuccess }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        username: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Validation
        if (!formData.email || !formData.password || !formData.confirmPassword || !formData.username) {
            setError('Все поля должны быть заполнены');
            setIsLoading(false);
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Пароли не совпадают');
            setIsLoading(false);
            return;
        }

        try {
            // Send registration request to backend
            const response = await fetch(`${API_URL}/api/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                    username: formData.username
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Ошибка при регистрации');
            }

            // Store user in localStorage
            localStorage.setItem('wishlifyUser', JSON.stringify(data));

            // Call the success callback
            onRegisterSuccess(data);
            onClose();
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
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
                    <button
                        type="submit"
                        className="button button-primary"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
                    </button>
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
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Validation
        if (!formData.email || !formData.password) {
            setError('Все поля должны быть заполнены');
            setIsLoading(false);
            return;
        }

        try {
            // Send login request to backend
            const response = await fetch(`${API_URL}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Ошибка при входе');
            }

            // Store user in localStorage
            localStorage.setItem('wishlifyUser', JSON.stringify(data));

            // Call success callback
            onLoginSuccess(data);
            onClose();
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

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
                    <button
                        type="submit"
                        className="button button-primary"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Вход...' : 'Войти'}
                    </button>
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

    // Get user profile from API
    const fetchUserProfile = async (userId) => {
        try {
            const response = await fetch(`${API_URL}/api/users/${userId}`);
            if (response.ok) {
                const userData = await response.json();
                setUser(userData);
                localStorage.setItem('wishlifyUser', JSON.stringify(userData));
            } else {
                // If user not found in API, remove from localStorage
                logout();
            }
        } catch (err) {
            console.error('Error fetching user profile:', err);
        }
    };

    useEffect(() => {
        // Check if user is already logged in
        const storedUser = localStorage.getItem('wishlifyUser');
        if (storedUser) {
            const userData = JSON.parse(storedUser);
            setUser(userData);

            // Verify user with backend (optional)
            // fetchUserProfile(userData.id);
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
    return