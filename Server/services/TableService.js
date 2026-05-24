// Загружаем переменные из файла .env в process.env
require('dotenv').config();

// Подключаем библиотеку axios для HTTP-запросов
const axios = require('axios');

// Создаем класс
class TablesService {
    // 
    constructor() {
    this.apiKey = process.env.TOKEN; // Берём токен из переменных окружения
    this.baseURL = process.env.TABLES_API_URL; // Базовый URL API
    // Создаём настроенный экземпляр аxios что бы не прописывать постоянно токен
    this.client = axios.create({
    baseURL: this.baseURL, // Базовый URL для всех запросов КОНТРОЛЛЕРА
    headers: {
    'Authorization': `Bearer ${this.apiKey}`, // Токен авторизации
    'Content-Type': 'application/json' // Тип данных
    }
    });
    }

    // Получить все записи
    async _get(tableId, url) {
    try {
    // выполняем запрос
    const response = await this.client.get('/${tableId}/records${url}');
    // Возвращаем только данные
    return response.data;
    } catch (error) {
    //обработка ошибок
    console.error('Ошибка при получении записей:', error.response?.data || error.message);
    throw error;
    }
    }
}
 // Создать новую запись
async _post(tableId, url, data) {
  try {
  // выполняем запрос
  const response = await this.client.post('/{tableId}/records{url}', data);
  // Возвращаем только данные
  return response.data;
  } catch (error) {
  //обработка ошибок
  console.error('Ошибка при создании записи:', error.response?.data || error.message);
  throw error;
  }
}

module.exports = new TablesService();