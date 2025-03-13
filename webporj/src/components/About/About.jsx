import Button from "../Button/Button"
import "./About.css"
import CardMember from "./CardMember";
import React from "react";

    const Team = () => {
        const teamMembers = [
            {
                photo: 'https://i.pinimg.com/originals/c7/11/15/c7111512016083ed6afd260e4ccbc6fd.jpg', // URL фото участника
                name: 'Седлецкий Антон',
                role: 'Frontend Developer',
                link: '/about/anton', // путь на карточку указывть через router в app.js
            },
            {
                photo: 'https://i.pinimg.com/originals/c7/11/15/c7111512016083ed6afd260e4ccbc6fd.jpg',
                name: 'Костерин Дмитрий',
                role: 'Backend Developer',
                link: '/about/dmitry',
            },
            {
                photo: 'https://i.pinimg.com/originals/c7/11/15/c7111512016083ed6afd260e4ccbc6fd.jpg',
                name: 'Дёмочкин Владислав',
                role: 'UX/UI Designer',
                link: '/about/vladislav',
            },
            {
                photo: 'https://i.pinimg.com/originals/c7/11/15/c7111512016083ed6afd260e4ccbc6fd.jpg',
                name: 'Базулин Илья',
                role: 'Project Manager',
                link: '/about/ilya',
            },
            {
                photo: 'https://i.pinimg.com/originals/c7/11/15/c7111512016083ed6afd260e4ccbc6fd.jpg',
                name: 'Молодов Виталий',
                role: 'Project Manager',
                link: '/about/vitaliy',
            },
        ];

        return (
            <div>
                <h1 className="teamtext">О проекте</h1>
                <div className="about">
                    <p>Wishlify — это умный и современный сервис для создания и управления вишлистами, который делает
                        процесс выбора и покупки подарков и желаемых товаров максимально удобным и выгодным.</p>
                    <p>Мы понимаем, что найти идеальный товар — это только половина дела. Именно поэтому Wishlify
                        предлагает не просто список ваших желаний, а интеллектуальный инструмент, который позволяет:</p>
                    <ul>
                        <li>Создавать персонализированные вишлисты и делиться ими с друзьями и семьей.</li>
                        <li>Автоматически искать аналоги выбранных товаров на других маркетплейсах, чтобы предложить
                            лучшие альтернативы.
                        </li>
                        <li>Отслеживать скидки и промокоды, помогая вам сэкономить и сделать выгодную покупку.</li>
                    </ul>
                    <p>Наша цель — сделать процесс планирования покупок максимально прозрачным, а ваши желания —
                        доступными. С Wishlify вы всегда будете знать, где купить желаемое быстрее, дешевле и
                        удобнее.</p>
                    <p>Присоединяйтесь к Wishlify и начните собирать свои идеальные списки желаний уже сегодня!</p>
                </div>
                <h1 className="teamtext">Команда проекта</h1>
                <div className="team">

                    {teamMembers.map((member, index) => (
                        <CardMember
                            key={index}        // Используем ключ для каждого элемента
                            photo={member.photo}
                            name={member.name}
                            role={member.role}
                            link={member.link}
                        />
                    ))}
                </div>
            </div>
        )
        ;
    };
export default Team