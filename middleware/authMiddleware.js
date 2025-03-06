const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');

    console.log("Received Token:", token); 

    if (!token) {
        
        return res.status(401).json({ message: 'Access Denied' });
    }

    try {
        const verified = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
        console.log("✅ Verified Token:", verified); 

        req.user = verified;
        next();
    } catch (error) {
       
        res.status(400).json({ message: 'Invalid Token' });
    }
};

module.exports = authMiddleware;
