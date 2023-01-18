require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const tokenManager = require("./helpers/tokenManager");
const cloudinary = require("./helpers/mediaHandler");
const func = require("./helpers/functions");
const serverError = require("./middlerware/server-error");
const app = express();

const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");
const productsRouter = require("./routes/productRouter")

const userRepository = require("./repository/userRepository");
const userDetailRepository = require("./repository/userDetailRepository");
const productsRepository = require("./repository/productsRepository")

const authUseCase = require("./use_case/authUseCase");
const userUseCase = require("./use_case/userUseCase");
const productsUseCase = require("./use_case/productsUseCase")

const authUC = new authUseCase(
  new userRepository(),
  new userDetailRepository(),
  bcrypt,
  tokenManager,
  cloudinary,
  func
);

const userUC = new userUseCase(
  new userRepository(),
  new userDetailRepository(),
  cloudinary
);

const productsUC = new productsUseCase(new productsRepository(), cloudinary)

app.use((req, res, next) => {
  req.authUC = authUC;
  req.userUC = userUC;
  req.productsUC = productsUC;
  next();
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", authRouter);
app.use("/", userRouter);
app.use("/", productsRouter);

app.use("/uploads", express.static("public/uploads"));
// app.use(serverError)

module.exports = app;
