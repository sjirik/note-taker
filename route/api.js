const api = require('express').Router();

api.get('/', (req, res) => {
    readFromFile('./db/tips.json').then((data) => res.json(JSON.parse(data)));
  });

