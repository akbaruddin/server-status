const express = require("express");
const statusMonitor = require("express-status-monitor")();
const app = express();
const port = 3000;

app.use(statusMonitor);

app.get('/status', statusMonitor.pageRoute)

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
