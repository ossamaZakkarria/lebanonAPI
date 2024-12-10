const express = require("express");
const xlsx = require("xlsx");
const app = express();
const cors = require("cors");
app.use(cors());

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get("/drugsAPI", function (req, res) {
  const workbook = xlsx.readFile("drugs.xlsx");
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const rawData = xlsx.utils.sheet_to_json(worksheet);

  const data = rawData.map((row, index) => ({
    id: index + 1,
    ATC: row.ATC || null,
    Name: row.Name || null,
    "B/G": row["B/G"] || null,
    Ingredient: row.Ingredient || null,
    Dosage: row.Dosage || null,
    Form: row.Form || null,
    Price: row.Price || null,
  }));

  //console.log(data);
  res.send(data);
});

app.listen(3000);
