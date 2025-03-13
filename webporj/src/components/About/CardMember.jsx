import React from 'react';
import { Link } from 'react-router-dom';
import './CardMember.css'; // импорт стилей

const CardMember = ({ photo, name, role, link}) => {
    return (
        <Link to={link} className="card-member">
            <div className="card-member-image">
                <img src={photo} alt={name} />
            </div>
            <div className="card-member-info">
                <h3>{name}</h3>
                <p>{role}</p>
            </div>
        </Link>
    );
};

export default CardMember;
