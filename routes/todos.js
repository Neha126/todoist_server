var express = require("express");
const Todo = require("../Models/todo");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.json({ title: "Welcome to todoist" });
});
router.post("/add", function (req, res) {
  var { label } = req.body;
  if (!label) {
    res.json({
      success: false,
      message: "Label not passed",
    });
  }
  var newTodo = new Todo({
    label,
    is_completed: false,
  });
  newTodo
    .save()
    .then(() => res.json({ success: true, message: "Saved Successfully" }))
    .catch((err) =>
      res.json({ success: false, message: "Something went wrongi" })
    );
});
// read from db and send as json
router.get("/get", function (req, res) {
  Todo.find(function (err, labels) {
    if (err) {
      console.log(err);
      res.json({
        success: false,
      });
    }
    res.json({
      success: true,
      data: labels,
    });
  });
});
// update todo by id
router.patch("/update", async function (req, res) {
  var { label, id } = req.body;
  try {
    await Todo.findByIdAndUpdate(id, { label });
    const updatedDoc = await Todo.findById(id);
    res.json({
      success: true,
      data: updatedDoc,
    });
  } catch (err) {
    res.json({
      success: false,
      message: "Unable to update todo",
    });
  }
});
// delete todo by id
router.delete("/delete", function (req, res) {});

module.exports = router;
