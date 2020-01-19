const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(cors());

let statusList = "";

let switchCommand = "";

app.post("/temperature", (req, res) => {
  const { temperature, humidity, status_led } = req.body;

  const data = {
    temperature,
    humidity,
    status_led,
    date: new Date()
  };
  statusList = data;
  res.json(data);
});

app.get("/temperature", (req, res) => {
  return res.json(statusList);
});

app.get("/command", (req, res) => {
  res.json({ command: switchCommand });
});

app.post("/switch", (req, res) => {
  const status_led = statusList.status_led;

  if (status_led == true) {
    switchCommand = "off";
  } else {
    switchCommand = "on";
  }

  res.json({ ok: true });
});

app.listen(3000, console.log("Executando na porta 3000"));
