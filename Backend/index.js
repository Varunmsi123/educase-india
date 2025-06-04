// Backend/index.js

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// User Schema renamed as Xyz
const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  isAgency: {
    type: String,
    required: true,
    enum: ['Yes', 'No'],
  },
}, { timestamps: true });

const Xyz = mongoose.model('Xyz', userSchema);

// Middleware
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60,
  }
}));

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ MongoDB Error:', err));

// Register Route
app.post('/register', async (req, res) => {
  const { fullName, phone, email, password, company, isAgency } = req.body;

  try {
    const existingUser = await Xyz.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Xyz({
      fullName,
      phone,
      email,
      password: hashedPassword,
      company,
      isAgency
    });

    await newUser.save();
    res.json({ message: 'User registered successfully' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login Route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Xyz.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    req.session.userId = user._id;
    res.json({ message: 'Login successful' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Profile Route
app.get('/profile', async (req, res) => {
  if (!req.session.userId) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const user = await Xyz.findById(req.session.userId).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Logout Route
app.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.json({ message: 'Logged out successfully' });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
