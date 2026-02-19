const rateLimit = require('express-rate-limit');

// Configure limits using environment variables
const rateLimitPerIP = process.env.RATE_LIMIT_PER_IP || 100; // requests per IP
const rateLimitPerSession = process.env.RATE_LIMIT_PER_SESSION || 50; // requests per session

// Rate Limiter for per-IP
const limiterPerIP = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: rateLimitPerIP, // limit each IP to the specified number
    message: 'Too many requests from this IP, please try again later.'
});

// Rate Limiter for per-Session
const sessionLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: rateLimitPerSession, // limit each session to the specified number
    message: 'Too many requests from this session, please try again later.'
});

module.exports = {
    limiterPerIP,
    sessionLimiter
};