const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const userRegisterController = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(401).send({ message: "Field should not be empty" });
  }

  if (password && password.length < 6) {
    return res.status(401).send({ message: "Password should be 6 charecters" });
  }

  const userExist = await User.find({ email: email });

  if (userExist.length > 0) {
    return res
      .status(401)
      .send({ message: "User already exist, Login please" });
  } else {
    try {
      bcrypt.hash(password, 10, function (err, hash) {
        jwt.sign(
          { email: email },
          process.env.PRIVATEKEY,
          { expiresIn: "5m" },
          async function (err, token) {
            const userNew = await new User({
              name: name,
              email: email,
              password: hash,
              token: token,
            });
            await userNew.save();
            res
              .status(200)
              .send({ userNew, message: "Registration Successfull" });
          }
        );
      });
    } catch (error) {
      return res.status(401).send(error);
    }
  }
};

module.exports = userRegisterController;
