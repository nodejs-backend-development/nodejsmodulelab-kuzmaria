// server.js
const http = require('http');
const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    const outputPath = path.join(__dirname, 'received', 'file.txt');
    const gunzip = zlib.createGunzip();
    const writeStream = fs.createWriteStream(outputPath);

    // Створюємо директорію, якщо її немає
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });

    req.pipe(gunzip).pipe(writeStream);

    writeStream.on('finish', () => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Файл отримано і збережено.');
    });

    writeStream.on('error', (err) => {
      console.error('Помилка при записі:', err);
      res.writeHead(500);
      res.end('Помилка при збереженні файлу');
    });
  } else {
    res.writeHead(405);
    res.end('Метод не підтримується');
  }
});

server.listen(3000, () => {
  console.log('Сервер слухає на порту 3000');
}); 