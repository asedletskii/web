// server.js - Main server file
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Data storage path (using JSON file for simplicity)
const USERS_FILE = path.join(__dirname, 'data', 'users.json');

// Ensure data directory exists
async function ensureDataDir() {
    const dataDir = path.join(__dirname, 'data');
    try {
        await fs.mkdir(dataDir, { recursive: true });
    } catch (err) {
        console.error('Error creating data directory:', err);
    }
}

// Read users from file
async function readUsers() {
    try {
        await ensureDataDir();
        const data = await fs.readFile(USERS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        // If file doesn't exist or has invalid JSON, return empty array
        return [];
    }
}

// Write users to file
async function writeUsers(users) {
    await ensureDataDir();
    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2), 'utf8');
}

// Registration endpoint
app.post('/api/register', async (req, res) => {
    try {
        const { email, password, username } = req.body;

        // Validation
        if (!email || !password || !username) {
            return res.status(400).json({ error: 'Все поля должны быть заполнены' });
        }

        // Read existing users
        const users = await readUsers();

        // Check if email already exists
        if (users.some(user => user.email === email)) {
            return res.status(400).json({ error: 'Пользователь с таким email уже существует' });
        }

        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create new user
        const newUser = {
            id: Date.now().toString(),
            email,
            username,
            password: hashedPassword,
            createdAt: new Date().toISOString()
        };

        // Add user to array and save
        users.push(newUser);
        await writeUsers(users);

        // Return user data without password
        const { password: _, ...userData } = newUser;
        res.status(201).json(userData);
    } catch (err) {
        console.error('Error in registration:', err);
        res.status(500).json({ error: 'Ошибка сервера при регистрации' });
    }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({ error: 'Все поля должны быть заполнены' });
        }

        // Read users
        const users = await readUsers();

        // Find user by email
        const user = users.find(user => user.email === email);
        if (!user) {
            return res.status(401).json({ error: 'Неверный email или пароль' });
        }

        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Неверный email или пароль' });
        }

        // Return user data without password
        const { password: _, ...userData } = user;
        res.json(userData);
    } catch (err) {
        console.error('Error in login:', err);
        res.status(500).json({ error: 'Ошибка сервера при входе' });
    }
});

// Get user profile
app.get('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const users = await readUsers();
        const user = users.find(user => user.id === id);

        if (!user) {
            return res.status(404).json({ error: 'Пользователь не найден' });
        }

        // Return user data without password
        const { password, ...userData } = user;
        res.json(userData);
    } catch (err) {
        console.error('Error fetching user:', err);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});