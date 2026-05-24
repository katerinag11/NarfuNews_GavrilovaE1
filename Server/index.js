require('dotenv').config();
const express = require('express');
const cors = require('cors');
const UserController = require('./controllers/UserController');
const LoginController = require('./controllers/LoginController');

const app = express();
const port = process.env.PORT || 3010;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use('/api/users', UserController);
app.use('/api/login', LoginController);
app.get('/api/health', (req, res) => res.json({ ok: true }));

app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));