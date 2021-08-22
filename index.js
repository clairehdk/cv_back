const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(formidable());
app.use(cors());

const mailgun = require("mailgun-js")({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN,
});

app.get("/", (req, res) => {
  res.json({ message: "Bienvenue" });
});

app.post("/form", (req, res) => {
  console.log(req.fields);

  const { name, mail, message } = req.fields;

  if (name && mail && message) {
    const data = {
      from: `${req.fields.name} <${req.fields.mail}>`,
      to: "c.hartdekeating@gmail.com",
      subject: `Formulaire de contact par ${req.fields.mail}`,
      text: `${req.fields.message}`,
    };

    mailgun.messages().send(data, (error, body) => {
      console.log(body);
      console.log(error);
      if (error) {
        res.status(400).json({ message: "Une erreur s'est produite" });
      } else {
        res.status(200).json({ message: "Message envoyé !" });
      }
    });
  } else {
    res.status(400).json({ message: "Merci de compléter tous les champs." });
  }
});

app.all("*", (req, res) => {
  res.json({ message: "Page introuvable" });
});

app.listen(3000, () => {
  console.log("Serveur démarré");
});
