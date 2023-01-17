const { sequelize } = require("../models");

class AuthUseCase {
  constructor(
    authRepository,
    userDetailRepository,
    bcrypt,
    tokenManager,
    cloudinary
  ) {
    this._authRepository = authRepository;
    this._userDetailRepository = userDetailRepository;
    this._bcrypt = bcrypt;
    this._tokenManager = tokenManager;
    this._cloudinary = cloudinary;
  }

  async login(request) {
    const user = await this._authRepository.getByEmail(request.email);
    if (user === null) {
      throw { status: 404, message: "user not found" };
    }
    const comparePassword = await this._bcrypt.compareSync(
      request.password,
      user.password
    );
    if (!comparePassword) {
      throw { status: 400, message: "password or email incorect" };
    }
    let payload = {
      id: user.id,
      email: user.email,
      phone_number: user.phone_number,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
    const token = this._tokenManager.generateToken(payload);

    payload.token = token;

    return payload;
  }

  async register(request) {
    const verifyEmail = await this._authRepository.getByEmail(request.email);
    if (verifyEmail) {
      throw { status: 400, message: "email not available" };
    }
    const verifyPhone = await this._authRepository.getByPhone(
      request.phone_number
    );
    if (verifyPhone) {
      throw { status: 400, message: "phone not available" };
    }

    if (request.password !== request.confirmPassword) {
      throw { status: 400, message: "password and confirm Password not match" };
    }

    request.password = this._bcrypt.hashSync(request.password, 10);

    const include = ["userDetail"];
    const user = await this._authRepository.create(request);

    request.user_id = user.id;
    request.gender = request.gender.toUpperCase();
    
    if (request.gender !== "MALE" && request.gender !== "FEMALE") {
      await user.destroy()
      throw {
        status: 400,
        message: "Gender must be filled with MALE or FEMALE ",
      };
    }
    const image = await this._cloudinary.uploadCloudinary(request.image);
    request.image = image;
    await this._userDetailRepository.create(request);

    const userData = await this._authRepository.getById(user.id, {
      include,
    });

    return userData;
  }
}

module.exports = AuthUseCase;
