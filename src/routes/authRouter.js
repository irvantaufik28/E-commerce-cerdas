const router = require("express").Router();
const authController = require("../controller/authController");
const handleUpload = require("../helpers/mediaHandler");

router.post("/login", authController.login);
router.post(
  "/register",
  handleUpload.upload.single("image"),
  authController.register
);

module.exports = router;
