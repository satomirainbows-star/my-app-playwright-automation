const axios = require('axios');
// create reusable axios instance
const apiClient = axios.create({
  // backend docker api
  baseURL: 'http://localhost:8887',
  headers: {
    'Content-Type': 'application/json'
  },
  // timeout
  timeout: 10000
});
module.exports = apiClient;

