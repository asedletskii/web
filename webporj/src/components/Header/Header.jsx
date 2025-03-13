import React from "react";
import Button from "../Button/Button";
import './Header.css'
import { Link } from 'react-router-dom';
import About from "../About/About";

export default function Header() {
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
                <Button className="signup">Регистрация</Button>
            </div>
        </header>
    )
}