const mongoose = require("mongoose");
const { Schema } = mongoose;

const taskSchema = new Schema({
  title: String,
  details: String,
  taskBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    enum: ["todo", "inprogress", "complete"],
    default: "todo",
  },
});

module.exports = mongoose.model("Task", taskSchema);
