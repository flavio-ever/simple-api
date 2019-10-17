const express = require('express');
const server = express();

// Modules
server.use(express.json());

// Port
server.listen(3000);

// Temp
let projects = [];
let countReq = 0;

// Middlewares
server.use((req, res, next) => {
  countReq++;
  console.log(`Requests: ${countReq}`);
  return next();
});

function consistirId (req, res, next) {
  const {id} = req.params;
  if (!projects[id]) {
    return res.status(400).json({'message': 'Ops! ID não encontado.'})
  }
  return next();
}

// Routes
server.get('/projects', (req, res) => {
  return res.json(projects);
});

server.post('/projects', (req, res) => {
  const { id, title, tasks } = req.body;
  projects.push({id, title, tasks});
  return res.status(201).send('Created!');
});

server.post('/projects/:id/tasks', consistirId, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  projects[id].tasks.push(title);
  return res.status(201).send('Created!');
});

server.put('/projects/:id', consistirId, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  projects[id].title = title;
  return res.status(200).send('Changed!');
});

server.delete('/projects/:id', consistirId, (req, res) => {
  const { id } = req.params;
  projects.splice(id, 1);
  return res.status(200).send('Deleted!');
});



