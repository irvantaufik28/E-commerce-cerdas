require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const tokenManager = require("./helpers/tokenManager");
const cloudinary = require("./helpers/mediaHandler");
const func = require("./helpers/functions");
const email = require("./helpers/mailer");
const email_message = require("./internal/constant/email_message");
const swaggerUi = require('swagger-ui-express');
const serverError = require("./middlerware/server-error");
const app = express();

const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");
const productsRouter = require("./routes/productRouter");
const otpRouter = require("./routes/otpRouter");

const userRepository = require("./repository/userRepository");
const userDetailRepository = require("./repository/userDetailRepository");
const productsRepository = require("./repository/productsRepository");
const otpRepository = require("./repository/otpRepository");

const authUseCase = require("./use_case/authUseCase");
const userUseCase = require("./use_case/userUseCase");
const productsUseCase = require("./use_case/productsUseCase");
const otpUseCase = require("./use_case/otpUseCase");

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
  new otpRepository(),
  cloudinary,
  bcrypt
);

const productsUC = new productsUseCase(new productsRepository(), cloudinary);

const otpUC = new otpUseCase(new otpRepository(), new email(), email_message);

app.use((req, res, next) => {
  req.authUC = authUC;
  req.userUC = userUC;
  req.productsUC = productsUC;
  req.otpUC = otpUC;
  next();
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", authRouter);
app.use("/", userRouter);
app.use("/", productsRouter);
app.use("/", otpRouter);

app.use("/uploads", express.static("public/uploads"));
app.use(serverError)

const swaggerDocument = require('./docs/docs.json');

app.use(
  '/docs',
  swaggerUi.serveFiles(swaggerDocument),
  swaggerUi.setup(swaggerDocument),
);

module.exports = app;
