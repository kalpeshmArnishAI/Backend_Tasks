require('dotenv').config();
const express = require("express");
const PORT = process.env.PORT;
const sequelize = require("../Login_System/db");
const User = require("./model/user")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());



sequelize.sync({ alter: true })
    .then(() => console.log("Table is created "))
    .catch(err => console.error("Error:", err))


// routes 
app.get('/welcome', (req, res) => {
    res.send("Welcome to Login System");
})


// Post data in signup
app.post('/signup', async (req, res) => {
    try {
        const { email, password } = req.body;

        const existing = await User.findOne({ where: { email } });
        if (existing) return res.status(409).json({ message: 'User already exists' });

        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password, salt);

        const user = await User.create({ email, hashpassword });

        res.status(201).json({ id: user.id, email: user.email });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// for login api 
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(401).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.hashpassword);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        // Only safe fields
        const payload = { id: user.id, email: user.email };

        const accessToken = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: "1h" });

        res.json({ message: "Login successful", accessToken });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
});

app.get("/profile", async (req, res) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Access denied" });

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

        // Fetch fresh data from DB if needed
        const user = await User.findByPk(decoded.id, {
            attributes: ["id", "email", "createdAt"]
        });

        if (!user) return res.status(404).json({ error: "User not found" });

        res.json({ message: "Profile data", user });
    } catch (err) {
        res.status(403).json({ error: "Invalid token" });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});