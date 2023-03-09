const express = require("express");
const request = require("request");
const csv = require("csv-parser");
const fs = require("fs");
const XLSX = require("xlsx");
const { json } = require("express");
const axios = require("axios");

const app = express();

app.get("/data", (req, res) => {
  // Read The config File

  fs.readFile("extractor-config.json", "utf8", (err, data) => {
    const configData = JSON.parse(data);

    // Read the Google Sheet

    const axios = require("axios");
    const XLSX = require("xlsx");
    const url = configData.sheets[0].url;
    const owner = configData.assignedTo;

    axios
      .get(url, {
        responseType: "arraybuffer",
      })
      .then((response) => {
        const workbook = XLSX.read(response.data, { type: "buffer" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(worksheet);

        let actualData = [];

        data.forEach((item) => {
          if (item.Owner == owner) {
            actualData.push(item);
          }
        });

        res.json(actualData);
      })
      .catch((error) => {
        console.error(error);
      });
  });
});

app.listen(3001, () => {
  console.log("Server running on port 3000");
});
