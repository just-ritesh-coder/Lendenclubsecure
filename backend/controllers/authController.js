const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { encrypt, decrypt } = require('../utils/cryptoUtils');
const { generateToken } = require('../utils/jwtUtils');

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
    const { name, email, password, aadhaar } = req.body;

    if (!name || !email || !password || !aadhaar) {
        return res.status(400).json({ message: 'Please add all fields' });
    }

    // Check if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Encrypt Aadhaar/ID using AI-generated utility
    const encryptedAadhaar = encrypt(aadhaar);

    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        aadhaar: encryptedAadhaar,
    });

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
};

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Check for user email
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(400).json({ message: 'Invalid credentials' });
    }
};

// @desc    Get user data
// @route   GET /api/auth/profile
// @access  Private
const getProfile = async (req, res) => {
    // req.user is already fetched by the middleware, but it has encrypted aadhaar
    // We need to pass the FULL encrypted object (iv + content) to decrypt

    // Safety check just in case
    if (!req.user) {
        return res.status(404).json({ message: 'User not found' });
    }

    // Decrypt Aadhaar for the response
    const decryptedAadhaar = decrypt(req.user.aadhaar);

    res.status(200).json({
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        aadhaar: decryptedAadhaar, // Sending decrypted data
    });
};

module.exports = {
    registerUser,
    loginUser,
    getProfile,
};
