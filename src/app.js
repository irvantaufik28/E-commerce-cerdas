require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const tokenManager = require("./helpers/tokenManager");
const cloudinary = require('./helpers/mediaHandler')
const app = express();


const authRouter = require("./routes/authRouter");
const authRepository = require("./repository/authRepository");
const userDetailRepository = require("./repository/userDetailRepository");

const authUseCase = require("./use_case/authUseCase");

const authUC = new authUseCase(
  new authRepository(),
  new userDetailRepository(),
  bcrypt,
  tokenManager,
  cloudinary
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
