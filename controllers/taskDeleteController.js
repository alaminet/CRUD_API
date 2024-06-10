const Task = require("../models/taskModel");

const taskDeleteController = async (req, res) => {
  const { taskBy } = req.params;
  try {
    await Task.deleteMany({
      status: "complete",
      taskBy: taskBy,
    });
    res.status(200).send({ message: "Your All complete Task deleted" });
  } catch (error) {
    res.status(401).send(error);
  }
};
module.exports = taskDeleteController;
