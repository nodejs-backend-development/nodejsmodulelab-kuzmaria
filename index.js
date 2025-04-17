const http = require('http');

const PORT = 3000;
const VALID_TOKEN = "Bearer ekV5Rk4wMlgvYVpCbmp5WUh5bHVPMktwMzktY05QeDRjT3FlWlNiUTJhbVpraHc5d3Y5a3YtU2pM";

const server = http.createServer((req, res) => {
    const authHeader = req.headers['authorization'];

    if (authHeader === VALID_TOKEN) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Authorized\n');
    } else {
        res.writeHead(401, { 'Content-Type': 'text/plain' });
        res.end('Unauthorized\n');
    }
});

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
