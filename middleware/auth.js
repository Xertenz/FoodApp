const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];
  if (!token) {
    return res
      .status(400)
      .json({ message: "Access denied, no token provided." });
  }
  token = token.split(" ")[1];
  jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
    if (error) {
      return res.status(400).json({ message: "Invalid token." });
    } else {
      console.log(decoded);
      req.user = decoded;
      next();
    }
  });
};

module.exports = verifyToken;
