const router = require("express").Router();
const userController = require("../controller/userController");

const handleUpload = require("../helpers/mediaHandler");

const authorized = require("../middlerware/authorization")

router.get("/profile",authorized, userController.profile);
router.put("/profile", authorized, handleUpload.upload.single("image"), userController.update)

module.exports = router;
