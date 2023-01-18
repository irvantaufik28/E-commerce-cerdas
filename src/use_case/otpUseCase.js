class Otp {
  constructor(otpRepository, email, email_message) {
    this._otpRepository = otpRepository;
    this._email = email;
    this._email_message = email_message;
  }
  async generateOTP(email, otp_type) {

    let otp = await this.getOTPByEmail(email);
    if (otp !== null) {
      throw { status: 400, message: "wait until : " + otp.expired_at };
    }

    let content = this._email_message[otp_type.toUpperCase()];
    if (typeof content === undefined) {
      return;
    }

    otp = await this._otpRepository.generateOTP(email, otp_type);
    let text = content.text_value.replace("{otp}", otp.otp_code);
    let html = content.html_value.replace("{otp}", otp.otp_code);
    await this._email.sendEmail("OTP Code", email, text, html);
    return { message: "check your email" };
  }
  async verifyOTP(email, otp_code, otp_type) {
    let otp = await this._otpRepository.getOTP(email, otp_code, otp_type);
    if (otp === null) {
      throw { status: 400, message: "invalid otp" };
    }

    return { message: "otp valid" };
  }
  async getOTPByEmail(email) {
    return await this._otpRepository.getOTPByEmail(email);
  }
  async deleteAllOtp(email) {
    await this._otpRepository.deleteAllOtp(email);
  }
}
module.exports = Otp;
