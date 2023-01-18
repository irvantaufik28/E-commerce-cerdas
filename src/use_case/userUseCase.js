class UserUseCase {
  constructor(
    userRepository,
    detailRepository,
    otpRepository,
    cloudinary,
    bcrypt
  ) {
    this._userRepository = userRepository;
    this._detailRepository = detailRepository;
    this._otpRepository = otpRepository;
    this._cloudinary = cloudinary;
    this._bcrypt = bcrypt;
  }

  async profile(id) {
    const include = ["user_detail"];
    const user = await this._userRepository.getById(id, { include });
    return user;
  }

  async update(id, request) {
    await this._userRepository.update(id, request);

    const oldUser = await this._userRepository.getById(id);
    if (request.image === undefined) {
      request.image === oldUser.image;
    } else {
      const image = await this._cloudinary.uploadCloudinary(request.image);
      request.image = image;
    }

    await this._detailRepository.update(oldUser.id, request);
    const include = ["user_detail"];
    const user = await this._userRepository.getById(id, { include });
    return user;
  }

  async deleteAccount(id) {
    await this._userRepository.delete(id);
    await this._detailRepository.delete(id);

    return;
  }

  async forgetPassword(request) {
    if (request.newPassword !== request.confirmNewPassword) {
      throw { status: 404, message: "passwor not match" };
    }
    const user = await this._userRepository.getByEmail(request.email);
    if (!user) {
      throw { status: 404, message: "password not match" };
    }
    const otp = await this._otpRepository.getOTP(
      request.email,
      request.otp_code,
      "FORGETPASSWORD"
    );
    if (!otp) {
      throw { status: 404, message: "invalid otp code" };
    }
    request.password = request.newPassword;
    request.password = this._bcrypt.hashSync(request.password, 10);

    await this._userRepository.update(user.id, request);

    return { message: "Success Reset password" };
  }
}

module.exports = UserUseCase;
