const express = require("express");
const router = express.Router();
const { getTasks, getTask, postTask, putTask, deleteTask } = require("../controllers/taskControllers");
const { verifyAccessToken, verifyAdmin } = require("../middlewares.js");

// Routes beginning with /api/tasks
router.get("/", verifyAccessToken, getTasks);
router.get("/:taskId", verifyAccessToken, getTask);
router.post("/", verifyAccessToken, postTask);
router.put("/:taskId", verifyAccessToken, putTask);
router.delete("/:taskId", verifyAccessToken, deleteTask);
router.get("/all", verifyAccessToken, verifyAdmin, getTasks); // Duplicate route for fetching all tasks (admin-only)

module.exports = router;
