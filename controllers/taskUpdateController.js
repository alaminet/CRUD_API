const Task = require("../models/taskModel");
const User = require("../models/userModel");

const taskUpdateController = async (req, res) => {
  const { taskBy, status } = req.body;
  try {
    if (!taskBy || !status) {
      res.status(401).send({ message: "Field should not be empty" });
    } else {
      const userExist = await User.findById(taskBy);
      if (userExist) {
        const allUpdate = await Task.updateMany(
          { status: status },
          {
            $set: {
              status:
                status == "todo"
                  ? "inprogress"
                  : status == "inprogress"
                  ? "complete"
                  : "inprogress",
            },
          },
          { new: true }
        );
        res
          .status(200)
          .send({
            allUpdate,
            message: `${allUpdate.modifiedCount} Task Updated`,
          });
        // const newTask = await Task.findByIdAndUpdate(
        //   taskID,
        //   {
        //     status:
        //       status == "todo"
        //         ? "inprogress"
        //         : status == "inprogress"
        //         ? "complete"
        //         : "inprogress",
        //   },
        //   { new: true }
        // );
        // res.status(200).send({ newTask, message: `Task Updated to ${newTask.status}` });
      } else {
        res.status(401).send({ message: "User Not Matched" });
      }
    }
  } catch (error) {
    res.status(401).send(error);
  }
};

module.exports = taskUpdateController;
