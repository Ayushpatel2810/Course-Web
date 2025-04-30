// const jwt = require('jsonwebtoken');

// const verifyToken = (req, res, next) => {
//     const token = req.headers['authorization'];
//     if (!token) return res.status(403).json({ error: 'No token provided' });

//     jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (err, decoded) => {
//         if (err) return res.status(401).json({ error: 'Failed to authenticate token' });
//         req.user = decoded;
//         next();
//     });
// };

// module.exports = verifyToken;
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).json({ error: 'No token provided or bad format' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
    req.user = decoded;
   
    next();
  });
};

module.exports = verifyToken;

