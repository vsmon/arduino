const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(cors());

let statusList = [];

let switchCommand = statusList[statusList.length - 1];

app.post("/temperatura", (req, res) => {
  const { status } = req.body;

  const data = {
    status,
    date: new Date()
  };
  statusList.push(data);
  res.json(data);
});

app.get("/temperatura", (req, res) => {
  return res.json(statusList);
});

app.get("/command", (req, res) => {
  res.json({ command: switchCommand });
});

app.post("/switch", (req, res) => {
  const status = statusList[statusList.length - 1].status;
  if (status == true) {
    switchCommand = "off";
  } else {
    switchCommand = "on";
  }

  res.json({ ok: true });
});

app.listen(3000, console.log("Executando na porta 3000"));
