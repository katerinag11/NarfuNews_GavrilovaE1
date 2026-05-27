const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const router = express.Router();

// Тестовые данные
const users = [
  { login: "test", email: "test@example.com", password: "123456", name: "Тест", lastName: "Тестовый", secondName: "Тестович", userId: "1" },
  { login: "kat", email: "kat@example.com", password: "123456", name: "Екатерина", lastName: "Гаврилова", secondName: "Юрьевна", userId: "2" }
];

// POST /api/login - авторизация
router.post('/', (req, res) => {
  console.log('Получен POST запрос на /api/login');
  console.log('Тело запроса:', req.body);

  try {
    const { login, password } = req.body;
    const users = await readUsers();

    const user = users.find(u => (u.login === login || u.email === login) && u.password === password);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Неверный логин или пароль' });
    }

    return res.json({
      success: true,
      recordId: user.userId,
      user: {
        Name: user.name,
        Surname: user.lastName,
        Patronymic: user.secondName,
      },
    });
  } catch (error) {
    console.error('Ошибка в авторизации:', error);
    res.status(500).json({ success: false, message: 'Ошибка сервера при авторизации' });
  }
});

// POST /api/login/register - регистрация
router.post('/register', (req, res) => {
  console.log('Получен POST запрос на /api/login/register');

  try {
    const { email, password, name, lastName, secondName } = req.body;
    const users = await readUsers();

    if (users.find(u => u.login === email || u.email === email)) {
      return res.status(400).json({ success: false, message: 'Пользователь уже существует' });
    }

    const newUser = {
      login: email,
      email: email,
      password: password,
      name: name,
      lastName: lastName,
      secondName: secondName || '',
      userId: String(users.length + 1),
    };

    users.push(newUser);
    await writeUsers(users);

    res.json({
      success: true,
      recordId: newUser.userId,
      user: {
        Name: newUser.name,
        Surname: newUser.lastName,
        Patronymic: newUser.secondName,
      },
    });
  } catch (error) {
    console.error('Ошибка в регистрации:', error);
    res.status(500).json({ success: false, message: 'Ошибка сервера при регистрации' });
  }
});

module.exports = router;