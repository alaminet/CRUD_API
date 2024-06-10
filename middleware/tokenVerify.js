var jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  // const token = req.headers.token;
  const { token } = req.body;
  if (!token) {
    res.status(401).send({ message: "Token Required" });
  } else {
    jwt.verify(token, process.env.PRIVATEKEY, function (err, decoded) {
      if (decoded) {
        next();
      } else {
        res.status(401).send({ message: "Invalid Token" });
      }
    });
  }
};

module.exports = verifyToken;
