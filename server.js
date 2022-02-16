const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const PORT = process.env.PORT || 3000;

const Users = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/register', async (req, res) => {
    const { name, username, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = { name, username, password: hash };
    Users.push(user);
    res.status(201).json(user);
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = Users.find(user => user.username === username);
    if (!user || !(await bcrypt.compare(password, user.password))) return res.status(403).json({ message: 'Invalid credentials' });
    res.status(200).json({ success: true, user });
});

app.listen(PORT, () => console.log(`Server running on Port ${PORT}...`));
