const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3010;

app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/mainPage.vue';
import PopularView from '../views/popularPage.vue';
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/popular',
    name: 'popular',
    component: PopularView,
  },
];
const router = createRouter({history: createWebHistory(),routes,});
export default router;
require('dotenv').config();

const express = require('express');
const { resolve } = require('path');
const UserController = require('./controllers/UserController');
const LoginController = require('./controllers/LoginController');

const app = express();
const port = process.env.PORT || 3010;

app.use(express.static('static'));

app.use('/api/users', UserController);
app.use('/api/login', LoginController);

app.listen(port, () => {
    console.log('process.env', process.env);
    console.log('Example app listening at http://localhost:${port}');
});