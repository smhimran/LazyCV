const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).json({
      message: "Invalid token!",
    });
  }

  const token = authorization.split(" ")[1];

  if (!token) {
    res.status(401).json({
      message: "Invalid token!",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(401).json({
        message: "Invalid token!",
      });
    } else {
      req.username = decoded.username;
      req.userId = decoded.userId;

      next();
    }
  });
};

module.exports = isAuthenticated;
