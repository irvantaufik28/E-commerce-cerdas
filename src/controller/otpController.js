module.exports = {
  generateOTP: async (req, res) => {
    try {
      const otp_type = req.body.otp_type;
      const email = req.body.email;

      const otp = await req.otpUC.generateOTP(email, otp_type);
      return res.status(200).json(otp);
    } catch (error) {
      return res.status(error.status).json({ message: error.message });
    }
  },
  verifyOTP: async (req, res) => {
    try {
      const otp_code = req.query.otp_code;
      const otp_type = req.query.otp_type;
      const email = req.query.email;

      const otp = await req.otpUC.verifyOTP(email, otp_code, otp_type);

      return res.status(200).json(otp);
    } catch (error) {
      return res.status(error.status).json({ message: error.message });
    }
  },
};
