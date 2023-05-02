const User = require('../models/User')
// API to register a user
const register = async (req, res) => {
    const { name, username, email, password } = req.body;

    try {
        const result = await User.create({
            name,
            email,
            username,
            password,
        })

        res.json({ result });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Error creating user' });
    }
};

// API to login
const login = async (req, res, next) => {
    const { username, password } = req.body;
    const { isActive } = req.body;
    try {
        const user = await User.findOne({ username });
        console.log(user)
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        const updatedUser = await User.findOneAndUpdate(
            username,
            { isActive: true })
        res.status(200).json({ updatedUser });
    } catch (err) {
        next(err);
    }
};

// API to get user info
const fetchUserData = async (req, res) => {
    const { username } = req.body;

    try {
        const result = await User.findOne({ username });

        if (result) {
            res.json({ name: result.name, email: result.email, username: result.username });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Error getting user info' });
    }
};

// API to update user info
const updateUserData = async (req, res) => {
    const { username, name, email } = req.body;
    const result = await User.findOne({ username });
    console.log(result);
    if (!result._id) return res.status(400).json({ message: 'Invalid userId' });
    try {
        const updatedUser = await User.findByIdAndUpdate(
            result._id,
            { username, name, email },
        );
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ user: updatedUser });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Error updating user info' });
    }
};

// API to logout
const logout = async (req, res) => {
    const { username } = req.body;
    const result = await User.findOne({ username });
    try {
        const updatedUser = await User.findOneAndUpdate(
            result._id,
            { isActive: false },
        )
        if (!updatedUser) {
            return res.status(404).json({ message: 'User does not exist' });
        }
        res.status(200).json({ updatedUser });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
};

module.exports = {
    register,
    login,
    fetchUserData,
    updateUserData,
    logout
}