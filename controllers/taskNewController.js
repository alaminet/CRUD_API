const Task = require("../models/taskModel");
const User = require("../models/userModel");

const taskNewController = async (req, res) => {
  const { title, details, taskBy } = req.body;
  try {
    if (!title || !details || !taskBy) {
      res.status(401).send({ message: "Field should not be empty" });
    } else {
      const userExist = await User.findById(taskBy);
      if (userExist) {
        const newTask = await new Task({
          title: title,
          details: details,
          taskBy: userExist._id,
        });
        await newTask.save();
        res.status(200).send({ newTask, message: "Task Added on ToDo" });
      } else {
        res.status(401).send({ message: "User Not Matched" });
      }
    }
  } catch (error) {
    res.status(401).send(error);
  }
};

module.exports = taskNewController;
