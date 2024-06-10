const Task = require("../models/taskModel");
const taskViewController = async (req, res) => {
  try {
    const taskList = await Task.find();
    res.status(200).send(taskList);
  } catch (error) {
    res.status(401).send(error);
  }
};

module.exports = taskViewController;
