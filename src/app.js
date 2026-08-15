const express = require("express");
const cors = require("cors");
const boardRoutes = require("./routes/boardRoutes");
const taskRoutes = require("./routes/taskRoutes");
const errorHandler = require("./middleware/errorHandler");
const { Log } = require("./models");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", async (req, res) => {
  await Log.create({ action: "Health check endpoint hit" });
  res.json({ status: "ok" });
});

app.use("/api/boards", boardRoutes);
app.use("/api/tasks", taskRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.use(errorHandler);

module.exports = app;
