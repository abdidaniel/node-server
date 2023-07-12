const http = require('http');

const port = 3000;

let tasks = [
  { id: 1, description: 'Hacer la compra', completed: false },
  { id: 2, description: 'Lavar los platos', completed: true },
  { id: 3, description: 'Sacar la basura', completed: false }
];

const server = http.createServer((req, res) => {
  if (req.url === '/tasks') {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.end(JSON.stringify(tasks));
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

server.listen(port, () => {
  console.log(`Servidor corriendo en el puerto: ${port}`);
});