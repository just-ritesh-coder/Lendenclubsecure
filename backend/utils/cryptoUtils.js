const crypto = require('crypto');

// Algorithm and Key
const algorithm = 'aes-256-cbc';
// Ensure your ENCRYPTION_KEY in .env is 32 bytes (64 hex characters)
const key = Buffer.from(process.env.ENCRYPTION_KEY, 'hex');

/**
 * AI-Generated Utility: Encrypts text using AES-256-CBC
 * @param {string} text - The text to encrypt
 * @returns {object} - Object containing IV and encrypted content in hex
 */
const encrypt = (text) => {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString('hex'), content: encrypted.toString('hex') };
};

/**
 * AI-Generated Utility: Decrypts data using AES-256-CBC
 * @param {object} hash - Object containing IV and encrypted content in hex
 * @returns {string} - The decrypted text
 */
const decrypt = (hash) => {
    const iv = Buffer.from(hash.iv, 'hex');
    const encryptedText = Buffer.from(hash.content, 'hex');
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
};

module.exports = {
    encrypt,
    decrypt
};
