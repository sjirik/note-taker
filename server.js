const express = require('express');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3001;

const app = express();

const userInput = require('./db/db.json');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
    res.json(userInput.slice(1));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

function newNote(body, notesEl) {
    const newUserInput = body;
    if (!Array.isArray(notesEl))
        notesEl = [];
    
    if (notesEl.length === 0)
        notesEl.push(0);

    body.id = notesEl[0];
    notesEl[0]++;

    notesEl.push(newUserInput);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(notesEl, null, 2)
    );
    return newUserInput;
}

app.post('/api/notes', (req, res) => {
    const newNotes = newNote(req.body, userInput);
    res.json(newNotes);
});

