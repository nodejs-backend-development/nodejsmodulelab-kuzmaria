// client.js
const http = require('http');
const fs = require('fs'); // для роботи з файлами
const zlib = require('zlib'); // для стиснення
const path = require('path'); // для роботи зі шляхами

const filePath = path.join(__dirname, 'to_send', 'file.txt');
const VALID_TOKEN = "Bearer ekV5Rk4wMlgvYVpCbmp5WUh5bHVPMktwMzktY05QeDRjT3FlWlNiUTJhbVpraHc5d3Y5a3YtU2pM";

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/',
  method: 'POST', //відправляємо
  headers: {
    'Content-Encoding': 'gzip',
    'Authorization': VALID_TOKEN,        // ← додаємо цей заголовок
    'Content-Type': 'application/octet-stream'
  }
};

const req = http.request(options, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log(`Відповідь від сервера: ${data} (statusCode: ${res.statusCode})`);
  });
});

req.on('error', (err) => {
  console.error('Помилка клієнта:', err);
});

// Створюємо директорію, якщо її немає
fs.mkdirSync(path.dirname(filePath), { recursive: true });

// Читаємо файл → стискаємо → відправляємо
fs.createReadStream(filePath)
  .pipe(zlib.createGzip())
  .pipe(req);