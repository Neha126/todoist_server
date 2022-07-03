var mongoose = require("mongoose");
const todoSchema = mongoose.Schema(
  { label: String, is_completed: Boolean },
  { timestamps: true }
);
const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
