const router = require("express").Router();
const authController = require("../controller/authController");
const handleUpload = require("../helpers/mediaHandler");

router.post("/api/v1/login", authController.login);
router.post(
  "/api/v1/register",
  handleUpload.upload.single("image"),
  authController.register
);

module.exports = router;
