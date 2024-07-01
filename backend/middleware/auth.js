const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authJwt = async (req, res, next) => {
    // Get token from headers
    const token = req.header('Authorization');

    // Check if token exists
    if (!token) {
        return res.status(401).json({ message: 'Authorization denied. No token provided.' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if user exists
        const user = await User.findById(decoded._id);
        if (!user) {
            return res.status(401).json({ message: 'Authorization denied. User not found.' });
        }

        // Attach user object to request object for further use in route handlers
        req.user = user;
        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ message: 'Authorization denied. Invalid token.' });
    }
};

module.exports = { authJwt };
