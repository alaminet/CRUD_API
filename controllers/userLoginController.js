const User = require("../models/userModel");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const userLoginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      bcrypt.compare(password, userExist.password, async (err, result) => {
        if (result) {
          if (userExist.verify) {
            jwt.sign(
              { email: userExist.email },
              process.env.PRIVATEKEY,
              { expiresIn: "24h" },
              async (err, token) => {
                const userLogin = await User.findOneAndUpdate(
                  { email: userExist.email },
                  { $set: { token: token } },
                  { new: true }
                );
                res
                  .status(200)
                  .send({ userLogin, message: "login Successfully" });
              }
            );
          } else {
            res.status(401).send({ message: "Email not verifyed" });
          }
        } else {
          res.status(401).send({ message: "Password not matched" });
        }
      });
    } else {
      res.status(401).send({ message: "mail not matched" });
    }
  } catch (error) {
    res.status(401).send(error);
  }
};

module.exports = userLoginController;
