const express = require('express');
const router = express.Router();
const users = require('../../users.json');

router.get('/:id', async (req, res) => {
  const user = users.find(u => u.userId === req.params.id);
  if (user) res.json({ fields: { Name: user.name, Surname: user.lastName, Patronymic: user.secondName } });
  else res.status(404).json({ error: 'Пользователь не найден' });
});

module.exports = router;