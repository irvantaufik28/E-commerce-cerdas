const errorHandler = require("../helpers/Error-Handler");
class AuthUseCase {
  constructor(
    userRepository,
    userDetailRepository,
    bcrypt,
    tokenManager,
    cloudinary,
    func
  ) {
    this._userRepository = userRepository;
    this._userDetailRepository = userDetailRepository;
    this._bcrypt = bcrypt;
    this._tokenManager = tokenManager;
    this._cloudinary = cloudinary;
    this._func = func;
  }

  async login(request) {
    const user = await this._userRepository.getByEmail(request.email);
    if (user === null) {
      throw new errorHandler("user not found", 404);
    }
    const comparePassword = await this._bcrypt.compareSync(
      request.password,
      user.password
    );
    if (!comparePassword) {
      throw new errorHandler("password or email incorect", 400);
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
    const verifyEmail = await this._userRepository.getByEmail(request.email);
    if (verifyEmail) {
      throw new errorHandler("email not available", 400);
    }
    const verifyPhone = await this._userRepository.getByPhone(
      request.phone_number
    );
    if (verifyPhone) {
      throw new errorHandler("phone not available", 400);
    }

    if (request.password !== request.confirmPassword) {
      throw new errorHandler("password and confirm Password not match", 400);
    }

    request.password = this._bcrypt.hashSync(request.password, 10);
    request.phone_number = this._func.verifyPhoneNumber(request.phone_number);
    const include = ["user_detail"];
    const user = await this._userRepository.create(request);

    request.user_id = user.id;
    const image = await this._cloudinary.uploadCloudinary(request.image);
    request.image = image;
    await this._userDetailRepository.create(request);

    const userData = await this._userRepository.getById(user.id, {
      include,
    });

    return userData;
  }
}

module.exports = AuthUseCase;
