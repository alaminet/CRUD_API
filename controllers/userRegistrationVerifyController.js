const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const userRegistrationVerifyController = async (req, res) => {
  const { email, token } = req.body;
  try {
    var decoded = jwt.verify(token, process.env.PRIVATEKEY);
    if (decoded) {
      console.log(decoded);
      const userExist = await User.find({ email: email });
      if (userExist.length > 0 && !userExist[0].verify) {
        const matchEmail = await User.findOneAndUpdate(
          { email: email },
          { $unset: { token: "" }, $set: { verify: true } },
          { new: true }
        );
        res.status(200).send({ matchEmail, message: "User Verifyed Matched" });
      } else {
        res.status(401).send({ message: "Validation Failed, Try again!" });
      }
    } else {
        res.status(401).send({ message: "token expire" });
    }
  } catch (error) {
    res.status(401).send(error);
  }
};

module.exports = userRegistrationVerifyController;
