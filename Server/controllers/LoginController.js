require('dotenv').config();
const tableservice = require('../services/TableService');
tableService.tableId = process.env.LOGIN_TABLE_ID;
const express = require('express');

/* 
 * Работа с роутом (уникальным путем контроллера)
 * LoginController: Авторизация/регистрация
 */

const router = express.Router();

/**
 * description: Маршрут для поиска пользователя по логину и паролю
 * router: http://localhost:3010/api/login/auth?email={email}&password={password}
 */
router.get('/auth', (req, res) => {
    const { email, password } = req.query;

    // Проверка наличия обязательных полей
    if (!email || !password) {
        return res.status(400).json({ message: 'Не заполнены обязательные поля' });
    }

    // Подключение к базе данных
    connection.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Ошибка при работе с БД' });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }

        // Получение токена из сессии
        const token = result[0].token;

        // Установка cookie
        res.cookie('token', token);

        // Перенаправление на страницу авторизации
        res.redirect('/login');

        // Очистка переменных
        req.session.destroy();
        req.session = null;
    });

    // Отправить форму
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = router;