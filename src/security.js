// src/security.js

// Authentication Middleware
const jwt = require('jsonwebtoken');

function authenticateJWT(req, res, next) {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
}

// Authorization Middleware
function authorize(roles = []) {
    return (req, res, next) => {
        if (!req.user || (roles.length && !roles.includes(req.user.role))) {
            return res.sendStatus(403);
        }
        next();
    };
}

// Input Validation
function validateInput(input) {
    // Implement validation logic here
    return true; // Return true if valid, false otherwise
}

// Error Handling
function handleErrors(err, req, res, next) {
    console.error(err);
    res.status(500).send({ error: 'Something went wrong!' });
}

// Logging
function logSecurityEvent(event) {
    console.log('Security Event:', event);
}

module.exports = { authenticateJWT, authorize, validateInput, handleErrors, logSecurityEvent };