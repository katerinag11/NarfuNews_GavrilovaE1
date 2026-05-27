const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const router = express.Router();

const usersFilePath = path.join(__dirname, '../../users.json');

async function readUsers() {
  const raw = await fs.readFile(usersFilePath, 'utf-8');
  return JSON.parse(raw);
}

router.get('/:id', async (req, res) => {
  try {
    const users = await readUsers();
    const user = users.find(u => u.userId === req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }

    res.json({ fields: { Name: user.name, Surname: user.lastName, Patronymic: user.secondName } });
  } catch (error) {
    console.error('Ошибка запроса пользователя:', error);
    res.status(500).json({ error: 'Ошибка сервера при получении пользователя' });
  }
});

module.exports = router;