const express = require('express');
const router = express.Router();
const users = require('../../users.json');

router.post('/', async (req, res) => {
  const { login, password } = req.body;
  const user = users.find(u => (u.login === login || u.email === login) && u.password === password);
  if (user) res.json({ success: true, recordId: user.userId, user: { Name: user.name, Surname: user.lastName, Patronymic: user.secondName } });
  else res.status(401).json({ success: false, message: 'Неверный логин или пароль' });
});

router.post('/register', async (req, res) => {
  const { email, password, name, lastName, secondName } = req.body;
  if (users.find(u => u.login === email)) return res.status(400).json({ success: false, message: 'Пользователь уже существует' });
  const newUser = { login: email, email, password, name, lastName, secondName: secondName || '', userId: String(users.length + 1) };
  users.push(newUser);
  res.json({ success: true, recordId: newUser.userId, user: { Name: name, Surname: lastName, Patronymic: secondName } });
});

module.exports = router;