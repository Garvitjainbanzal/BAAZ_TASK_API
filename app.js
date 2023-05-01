const express = require('express');
const { connect, getDb } = require('./db');

const app = express();
const port = 3000;

connect().catch((err) => console.log(err));

app.use(express.json());
// API to register a user
app.post('/register', async (req, res) => {
    const { name, username, email, password } = req.body;

    try {
        const db = getDb();

        const result = await db.collection('users').insertOne({
            name,
            username,
            email,
            password,
            created: new Date(),
        });

        res.json({ result });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Error creating user' });
    }
});

// API to login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const db = getDb();

        const result = await db.collection('users').findOne({ username, password });

        if (result) {
            res.json({ result });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Error logging in' });
    }
});

// API to get user info
app.get('/user', async (req, res) => {
    const { username } = req.body;

    try {
        const db = getDb();

        const result = await db.collection('users').findOne({ username });

        if (result) {
            res.json({ name: result.name, email: result.email, username: result.username });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Error getting user info' });
    }
});

// API to logout user
app.post('/logout', (req, res) => {
    // Destroy the session
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Error logging out user' });
        } else {
            res.json({ message: 'User logged out successfully' });
        }
    });
});

// API to update user info
app.put('/user', async (req, res) => {
    const { username, name, email } = req.body;

    try {
        const db = getDb();

        const result = await db.collection('users').updateOne(
            { username },
            { $set: { name, email } }
        );

        if (result.modifiedCount === 1) {
            res.json({ message: 'User info updated successfully' });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Error updating user info' });
    }
});

app.delete('/user', (req, res) => {
    // get the user ID from the session
    const { id } = req.body;

    // delete the user from the database
    prisma.user.delete({
        where: {
            id: userId,
        },
    })
        .then(() => {
            // delete the session
            req.session.destroy((err) => {
                if (err) {
                    console.error('Error destroying session:', err);
                    res.status(500).send('Error destroying session');
                } else {
                    res.send('User deleted successfully');
                }
            });
        })
        .catch((err) => {
            console.error('Error deleting user:', err);
            res.status(500).send('Error deleting user');
        });
});

app.listen(port, (error) => {
    if (!error) console.log("Server is Successfully Running, and App is listening on port " + port)
    else
        console.log("Error occurred, server can't start", error);
}
);