import React from 'react';
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import About from "./components/About/About";
import Profile from "./components/Profile/Profile";

export default function App() {
    return (
            <Router>
            <Header/>
            <Routes>
                <Route path="/" element={<Hero/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/profile" element={<Profile/>}/>
            </Routes>
        </Router>
    )
}