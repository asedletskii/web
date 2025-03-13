import React from 'react';
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import About from "./components/About/About";
import Profile from "./components/Profile/Profile";
import { AuthProvider } from './components/Auth/Auth';
import './App.css';

export default function App() {
    return (
        <AuthProvider>
            <Router>
                <Header/>
                <Routes>
                    <Route path="/" element={<Hero/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                </Routes>
            </Router>
        </AuthProvider>
    )
}