import React, { useState, useEffect } from 'react';
import './Profile.css';

const Profile = () => {
    const [lists, setLists] = useState([
        {
            id: 1,
            name: 'Название списка',
            itemCount: 3,
            items: [
                { id: 1, title: 'Товар', marketplace: 'маркетплейс', price: 'Цена', imageUrl: '/api/placeholder/300/300' },
                { id: 2, title: 'Товар', marketplace: 'маркетплейс', price: 'Цена', imageUrl: '/api/placeholder/300/300' },
                { id: 3, title: 'Товар', marketplace: 'маркетплейс', price: 'Цена', imageUrl: '/api/placeholder/300/300' }
            ]
        },
        {
            id: 2,
            name: 'Название списка',
            itemCount: 3,
            items: [
                { id: 4, title: 'Товар', marketplace: 'маркетплейс', price: 'Цена', imageUrl: '/api/placeholder/300/300' },
                { id: 5, title: 'Товар', marketplace: 'маркетплейс', price: 'Цена', imageUrl: '/api/placeholder/300/300' },
                { id: 6, title: 'Товар', marketplace: 'маркетплейс', price: 'Цена', imageUrl: '/api/placeholder/300/300' }
            ]
        },
        {
            id: 3,
            name: 'Название списка',
            itemCount: 3,
            items: [
                { id: 7, title: 'Товар', marketplace: 'маркетплейс', price: 'Цена', imageUrl: '/api/placeholder/300/300' },
                { id: 8, title: 'Товар', marketplace: 'маркетплейс', price: 'Цена', imageUrl: '/api/placeholder/300/300' },
                { id: 9, title: 'Товар', marketplace: 'маркетплейс', price: 'Цена', imageUrl: '/api/placeholder/300/300' }
            ]
        }
    ]);

    const [showCreateList, setShowCreateList] = useState(false);
    const [newListName, setNewListName] = useState('');
    const [selectedList, setSelectedList] = useState(null);
    const [newItemUrl, setNewItemUrl] = useState('');
    const [confirmAction, setConfirmAction] = useState(null);

    // Создание нового списка
    const handleCreateList = () => {
        if (newListName.trim()) {
            const newList = {
                id: Date.now(),
                name: newListName,
                itemCount: 0,
                items: []
            };
            setLists([...lists, newList]);
            setNewListName('');
            setShowCreateList(false);
        }
    };

    // Удаление списка
    const handleDeleteList = (listId) => {
        setConfirmAction({
            title: 'Удаление списка',
            message: 'Вы уверены, что хотите удалить этот список? Это действие нельзя отменить.',
            onConfirm: () => {
                const updatedLists = lists.filter(list => list.id !== listId);
                setLists(updatedLists);
                setConfirmAction(null);
            },
            onCancel: () => setConfirmAction(null)
        });
    };

    // Добавление товара по URL
    const handleAddItem = (listId) => {
        if (newItemUrl.trim()) {
            const updatedLists = lists.map(list => {
                if (list.id === listId) {
                    // Заготовка для товара на основе URL
                    const newItem = {
                        id: Date.now(),
                        title: 'Товар', // Заполняется парсером
                        marketplace: 'маркетплейс', // Заполняется парсером
                        price: 'Цена', // Заполняется парсером
                        imageUrl: '/api/placeholder/300/300', // Заполняется парсером
                        url: newItemUrl
                    };
                    return {
                        ...list,
                        items: [...list.items, newItem],
                        itemCount: list.itemCount + 1
                    };
                }
                return list;
            });

            setLists(updatedLists);
            setNewItemUrl('');
        }
    };

    // Удаление товара
    const handleDeleteItem = (listId, itemId) => {
        setConfirmAction({
            title: 'Удаление товара',
            message: 'Вы уверены, что хотите удалить этот товар из списка?',
            onConfirm: () => {
                const updatedLists = lists.map(list => {
                    if (list.id === listId) {
                        const updatedItems = list.items.filter(item => item.id !== itemId);
                        return {
                            ...list,
                            items: updatedItems,
                            itemCount: updatedItems.length
                        };
                    }
                    return list;
                });
                setLists(updatedLists);

                // Обновляем selectedList если он был изменен
                if (selectedList && selectedList.id === listId) {
                    const updatedSelectedList = updatedLists.find(list => list.id === listId);
                    setSelectedList(updatedSelectedList);
                }

                setConfirmAction(null);
            },
            onCancel: () => setConfirmAction(null)
        });
    };

    return (
        <div className="wislify-container">
            <h1 className="wislify-title">Мой профиль</h1>

            {/* Секция профиля */}
            <div className="profile-section">
                <div className="profile-image"></div>
                <div>
                    <h2 className="profile-name">Имя</h2>
                    <p className="profile-stats">Кол-во списков: {lists.length} (статистика)</p>
                </div>
            </div>

            {/* Декоративная линия */}
            <div className="decorative-line"></div>

            {/* Список вишлистов */}
            <div className="list-grid">
                {lists.map(list => (
                    <div key={list.id} className="list-item">
                        <div className="list-header">
                            <div className="list-header-content">
                                <h3 className="list-name">{list.name}</h3>
                                <p className="list-count">кол-во товаров в списке: {list.itemCount}</p>
                            </div>
                            <button
                                onClick={() => handleDeleteList(list.id)}
                                className="button-icon button-danger"
                                title="Удалить список"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Превью товаров */}
                        <div className="items-grid">
                            {list.items.slice(0, 3).map(item => (
                                <div key={item.id} className="item-preview"></div>
                            ))}
                        </div>

                        {/* Кнопка для открытия списка */}
                        <button
                            onClick={() => setSelectedList(list)}
                            className="list-link"
                        >
                            Открыть список
                        </button>
                    </div>
                ))}

                {/* Кнопка добавления списка */}
                <div className="add-list-container">
                    <button
                        onClick={() => setShowCreateList(true)}
                        className="add-button"
                        title="Добавить новый список"
                    >
                        +
                    </button>
                </div>
            </div>

            {/* Модальное окно создания списка */}
            {showCreateList && (
                <div className="modal">
                    <div className="modal-content">
                        <h2 className="modal-title">Создать новый список</h2>
                        <input
                            type="text"
                            value={newListName}
                            onChange={(e) => setNewListName(e.target.value)}
                            placeholder="Название списка"
                            className="input"
                        />
                        <div className="button-group">
                            <button
                                onClick={() => setShowCreateList(false)}
                                className="button"
                            >
                                Отмена
                            </button>
                            <button
                                onClick={handleCreateList}
                                className="button button-primary"
                            >
                                Создать
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Модальное окно просмотра списка */}
            {selectedList && (
                <div className="modal">
                    <div className="list-modal-content">
                        <div className="list-modal-header">
                            <h2 className="modal-title">{selectedList.name}</h2>
                            <button
                                onClick={() => setSelectedList(null)}
                                className="close-button"
                            >
                                ×
                            </button>
                        </div>

                        {/* Форма добавления товара по URL */}
                        <div className="add-item-form">
                            <input
                                type="text"
                                value={newItemUrl}
                                onChange={(e) => setNewItemUrl(e.target.value)}
                                placeholder="Вставьте ссылку на товар"
                                className="add-item-input"
                            />
                            <button
                                onClick={() => handleAddItem(selectedList.id)}
                                className="button button-primary"
                            >
                                Добавить
                            </button>
                        </div>

                        {/* Список товаров */}
                        <div className="products-grid">
                            {selectedList.items.map(item => (
                                <div key={item.id} className="product-card">
                                    <img src={item.imageUrl} alt={item.title} className="product-image" />
                                    <button
                                        onClick={() => handleDeleteItem(selectedList.id, item.id)}
                                        className="product-delete"
                                        title="Удалить товар"
                                    >
                                        ✕
                                    </button>
                                    <div className="product-info">
                                        <h3 className="product-title">{item.title}</h3>
                                        <p className="product-marketplace">{item.marketplace}</p>
                                        <p className="product-price">{item.price}</p>
                                        {item.url && (
                                            <a
                                                href={item.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="product-link"
                                            >
                                                {item.url}
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Модальное окно подтверждения */}
            {confirmAction && (
                <div className="modal">
                    <div className="confirm-dialog">
                        <h3 className="confirm-title">{confirmAction.title}</h3>
                        <p className="confirm-message">{confirmAction.message}</p>
                        <div className="confirm-buttons">
                            <button
                                onClick={confirmAction.onCancel}
                                className="button"
                            >
                                Отмена
                            </button>
                            <button
                                onClick={confirmAction.onConfirm}
                                className="button button-danger"
                            >
                                Удалить
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;