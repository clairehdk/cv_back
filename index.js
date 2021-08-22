const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(formidable());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Bienvenue" });
});

app.all("*", (req, res) => {
  res.json({ message: "Page introuvable" });
});

app.listen(3000, () => {
  console.log("Serveur démarré");
});
