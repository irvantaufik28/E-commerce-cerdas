const router = require("express").Router();
const otpController = require("../controller/otpController");

router.get("/otp/verify", otpController.verifyOTP);
router.post("/otp/request", otpController.generateOTP);


module.exports = router;
