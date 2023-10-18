const { default: axios } = require("axios");
const express = require("express");
const path = require("path");
const app = express();
require("dotenv").config();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/auth", (req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}`
  );
});

app.get("/callback", (req, res) => {
  axios
    .post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: `${process.env.CLIENT_ID}`,
        client_secret: `${process.env.CLIENT_SECRET}`,
        code: req.query.code
      },
      {
        headers: {
          Accept: "application/json"
        }
      }
    )
    .then((result) => {
      console.log(result.data.access_token);
      res.send("you are authorized " + result.data.access_token);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(8000, () => {
  console.log("its running!!!");
});
