const router = require("express").Router();
const otpController = require("../controller/otpController");

router.get("/api/v1/otp/verify", otpController.verifyOTP);
router.post("/api/v1/otp/request", otpController.generateOTP);


module.exports = router;
