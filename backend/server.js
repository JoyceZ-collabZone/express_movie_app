require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");

require("./db/db");

/*
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
*/

//heroku environment variable
//NODE_ENV=production

const isProd = process.env.NODE_ENV === "production";

if (isProd) {
  console.log("express app running in production");
  app.use(express.static("./public"));
}

// SET UP CORS AS MIDDLEWARE, SO any client can make a request to our server
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS allows requests to come in from React
app.use(cors());

// Require the controller after the middleware
const movieController = require("./controllers/movieController");
const authController = require("./controllers/authController");

app.use("/api/v1/movies", movieController);
app.use("/auth", authController);

if (isProd) {
  app.get("/*", (req, res) => {
    res.sendFile("./public/index.html", { root: "./" });
  });
}

const port = process.env.PORT || 9000;
app.listen(port, () => {
  console.log("listening on port " + port);
});
