const router = require("express").Router();
const userController = require("../controller/userController");

const handleUpload = require("../helpers/mediaHandler");

const authorized = require("../middlerware/authorization")

router.get("/api/v1/user",authorized, userController.profile);
router.put("/api/v1/user", authorized, handleUpload.upload.single("image"), userController.update)
router.delete("/api/v1/user", authorized, userController.deleteAccount)
router.post("/api/v1/user/reset-password", userController.forgetPassword)
module.exports = router;
