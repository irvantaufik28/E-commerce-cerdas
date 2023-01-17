require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const tokenManager = require("./helpers/tokenManager");
const cloudinary = require('./helpers/mediaHandler')
const func = require('./helpers/functions')
const app = express();


const authRouter = require("./routes/authRouter");
const userRepository = require("./repository/userRepository");
const userDetailRepository = require("./repository/userDetailRepository");

const authUseCase = require("./use_case/authUseCase");

const authUC = new authUseCase(
  new userRepository(),
  new userDetailRepository(),
  bcrypt,
  tokenManager,
  cloudinary,
  func
);

app.use((req, res, next) => {
  req.authUC = authUC;
  next();
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", authRouter);
app.use("/uploads", express.static("public/uploads"));

module.exports = app;
