const Task = require("../models/Task");
const { validateObjectId } = require("../utils/validation");


exports.getTasks = async (req, res) => {
  try {
    let tasks;
    const isAdmin = req.user.isAdmin;
    const { sortBy, searchQuery } = req.query;

    if (isAdmin) {
      // If the user is an admin, fetch all tasks of all users.
      const query = {};

      if (searchQuery) {
        query.description = { $regex: searchQuery, $options: 'i' };
      }

      tasks = await Task.find(query).populate('user', 'name');

      if (sortBy === 'status') {
        tasks.sort((a, b) => a.status.localeCompare(b.status));
      } else if (sortBy === 'priority') {
        tasks.sort((a, b) => a.priority.localeCompare(b.priority));
      }
    } else {
      // If the user is not an admin, fetch their own tasks.
      tasks = await Task.find({ user: req.user.id }).populate('user', 'name');
    }

    res.status(200).json({ tasks, status: true, msg: 'Tasks found successfully..' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: 'Internal Server Error' });
  }
};


exports.getTask = async (req, res) => {
  try {
    if (!validateObjectId(req.params.taskId)) {
      return res.status(400).json({ status: false, msg: "Task id not valid" });
    }

    const task = await Task.findOne({ user: req.user.id, _id: req.params.taskId });
    if (!task) {
      return res.status(400).json({ status: false, msg: "No task found.." });
    }
    res.status(200).json({ task, status: true, msg: "Task found successfully.." });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
}

exports.postTask = async (req, res) => {
  try {
    const { description } = req.body;
    if (!description) {
      return res.status(400).json({ status: false, msg: "Description of task not found" });
    }
    const task = await Task.create({ user: req.user.id, description });
    res.status(200).json({ task, status: true, msg: "Task created successfully.." });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
}

exports.putTask = async (req, res) => {
  try {
    const { description } = req.body;
    if (!description) {
      return res.status(400).json({ status: false, msg: "Description of task not found" });
    }

    if (!validateObjectId(req.params.taskId)) {
      return res.status(400).json({ status: false, msg: "Task id not valid" });
    }

    let task = await Task.findById(req.params.taskId);
    if (!task) {
      return res.status(400).json({ status: false, msg: "Task with given id not found" });
    }

    if (task.user != req.user.id) {
      return res.status(403).json({ status: false, msg: "You can't update task of another user" });
    }

    task = await Task.findByIdAndUpdate(req.params.taskId, { description }, { new: true });
    res.status(200).json({ task, status: true, msg: "Task updated successfully.." });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
}


exports.deleteTask = async (req, res) => {
  try {
    if (!validateObjectId(req.params.taskId)) {
      return res.status(400).json({ status: false, msg: "Task id not valid" });
    }

    let task = await Task.findById(req.params.taskId);
    if (!task) {
      return res.status(400).json({ status: false, msg: "Task with given id not found" });
    }

    if (task.user != req.user.id) {
      return res.status(403).json({ status: false, msg: "You can't delete task of another user" });
    }

    await Task.findByIdAndDelete(req.params.taskId);
    res.status(200).json({ status: true, msg: "Task deleted successfully.." });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
}
const fetchTasks = async () => {
  try {
    const response = await axios.get("/api/tasks");
    setTasks(response.data.tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};
