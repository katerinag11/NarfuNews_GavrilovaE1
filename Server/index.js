require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3010;

app.use(cors());
app.use(express.json());

// Импортируем контроллеры
const UserController = require('./controllers/UserController');
const LoginController = require('./controllers/LoginController');

app.use('/api/users', UserController);
app.use('/api/login', LoginController);  // ← Должен быть именно так

app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});