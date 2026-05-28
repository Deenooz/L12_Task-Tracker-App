const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

let tasks = [
    { id: 1, name: "Week 6 CA1 Test", category: "School", status: "Upcoming" },
    { id: 2, name: "Hackathon Submission", category: "School", status: "Upcoming" },
    { id: 3, name: "C237 Assignment", category: "School", status: "In Progress" },
    { id: 4, name: "Gaming Session", category: "Gaming", status: "In Progress" },
    { id: 5, name: "E-Learning", category: "School", status: "Completed" },
    { id: 6, name: "Buy Groceries", category: "Personal", status: "Missed" }
];

app.get('/', (req, res) => {
    res.render('home', {
        upcoming: tasks.filter(t => t.status === "Upcoming"),
        progress: tasks.filter(t => t.status === "In Progress"),
        completed: tasks.filter(t => t.status === "Completed"),
        missed: tasks.filter(t => t.status === "Missed")
    });
});

app.get('/tracking', (req, res) => {

    const search = req.query.search || "";

    const filtered = tasks.filter(t =>
        t.category.toLowerCase().includes(search.toLowerCase()) ||
        t.name.toLowerCase().includes(search.toLowerCase())
    );

    res.render('tracking', { tasks: filtered, search });
});

app.get('/add', (req, res) => res.render('add'));

app.post('/add', (req, res) => {
    const { name, category, status } = req.body;

    tasks.push({
        id: tasks.length + 1,
        name,
        category,
        status
    });

    res.redirect('/tracking');
});

app.get('/edit/:id', (req, res) => {
    const task = tasks.find(t => t.id == req.params.id);
    res.render('edit', { task });
});

app.post('/edit/:id', (req, res) => {
    const task = tasks.find(t => t.id == req.params.id);

    task.name = req.body.name;
    task.category = req.body.category;
    task.status = req.body.status;

    res.redirect('/tracking');
});

app.post('/delete/:id', (req, res) => {
    tasks = tasks.filter(t => t.id != req.params.id);
    res.redirect('/tracking');
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});