const jwt = require('jsonwebtoken');

/**
 * AI-Generated Utility: Generates a JWT token
 * @param {string} id - User ID to embed in the token
 * @returns {string} - Signed JWT token
 */
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

/**
 * AI-Generated Utility: Verifies a JWT token
 * @param {string} token - The token to verify
 * @returns {object|null} - Decoded token payload or null if invalid
 */
const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return null;
    }
};

module.exports = { generateToken, verifyToken };
