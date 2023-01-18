const router = require("express").Router();
const userController = require("../controller/userController");

const handleUpload = require("../helpers/mediaHandler");

const authorized = require("../middlerware/authorization")

router.get("/user",authorized, userController.profile);
router.put("/user", authorized, handleUpload.upload.single("image"), userController.update)
router.delete("/user", authorized, userController.deleteAccount)
router.post("/user/reset-password", userController.forgetPassword)
module.exports = router;
