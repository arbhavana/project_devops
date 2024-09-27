const express = require('express'); // Importing express
const bodyParser = require('body-parser'); // Importing body-parser
const path = require('path'); // Importing path

const app = express(); // Creating an instance of express

// Middleware to parse POST request data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Sample task data (replace this with a proper database if needed)
let tasks = [
    { id: 1, title: 'Sample Task', done: false }
];

// Route to serve the HTML file and pass task data to it
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Add a new task
app.post('/add', (req, res) => {
    const newTask = { id: tasks.length + 1, title: req.body.title, done: false };
    tasks.push(newTask);
    res.redirect('/');
});

// Mark a task as done
app.get('/done/:id', (req, res) => {
    const task = tasks.find(t => t.id == req.params.id);
    if (task) {
        task.done = true;
    }
    res.redirect('/');
});

// Delete a task
app.get('/delete/:id', (req, res) => {
    tasks = tasks.filter(t => t.id != req.params.id);
    res.redirect('/');
});

// Route to get tasks as JSON
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
