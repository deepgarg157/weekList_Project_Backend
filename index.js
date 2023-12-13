const express = require("express");

const app = express();
const authRoute = require("./routes/authRoute");
const listRoute = require("./routes/listRoute");
const weekListRoute = require("./routes/weekListRoute");
require("./config/dbConfig");
app.use(express.json());
app.listen(5000, () => {
  console.log("Server running successfully on port 5000");
});

app.get("/", (req, res) => {
  res.send("Server running successfully");
});

app.get("/health", (req, res) => {
  let state = "OK";
  const healthData = {
    serverName: "WeekList Server",
    currentTime: new Date(),
    state: state,
  };
  try {
    res.send(healthData);
  } catch (error) {
    state = error.message;
    res.send(healthData);
  }
});

app.use("/auth", authRoute);
app.use("/api", listRoute);
app.use("/api", weekListRoute);
