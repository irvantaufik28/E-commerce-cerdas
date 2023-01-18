const errorHandler = require("../helpers/Error-Handler");
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

  async create(request) {
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
    request.is_admin = false;
    const include = ["user_detail"];
    const user = await this._userRepository.create(request);

    request.user_id = user.id;
    if (request.image) {
      const image = await this._cloudinary.uploadCloudinary(request.image);
      request.image = image;
    }
    await this._userDetailRepository.create(request);

    const userData = await this._userRepository.getById(user.id, {
      include,
    });

    return userData;
  }

  async getAll(params) {
    const page = params.page ?? 1;
    const limit = parseInt(params.limit ?? 10);

    const offset = parseInt((page - 1) * limit);
    const orderBy = params.orderBy ?? "created_at";
    const orderDirection = params.orderDir ?? "DESC";

    const order = [[orderBy, orderDirection]];

    const users = await this._userRepository.getAll(params, {
      offset,
      limit,
      order,
    });

    const start = 0 + (page - 1) * limit;
    const end = page * limit;
    const countFiltered = users.count;

    const pagination = {
      totalRow: users.count,
      totalPage: Math.ceil(countFiltered / limit),
      page,
      limit,
    };

    if (end < countFiltered) {
      pagination.next = {
        page: page + 1,
      };
    }

    if (start > 0) {
      pagination.prev = {
        page: page - 1,
      };
    }
    return {
      data: users.rows,
      pagination,
    };
  }

  async geUserByid(id) {
    const include = ["user_detail"];
    const user = await this._userRepository.getById(id, { include });
    return user;
  }

  async profile(id) {
    const include = ["user_detail"];
    const user = await this._userRepository.getById(id, { include });
    return user;
  }

  async update(id, request) {
    await this._userRepository.update(id, request);

    const oldUser = await this._userRepository.getById(id);
    if (request.image) {
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
      throw new errorHandler("password not match", 400);
    }
    const user = await this._userRepository.getByEmail(request.email);
    if (!user) {
      throw new errorHandler("email not available", 404);
    }
    const otp = await this._otpRepository.getOTP(
      request.email,
      request.otp_code,
      "FORGETPASSWORD"
    );
    if (!otp) {
      throw new errorHandler("invalid OTP Code", 400);
    }
    request.password = request.newPassword;
    request.password = this._bcrypt.hashSync(request.password, 10);

    await this._userRepository.update(user.id, request);

    return { message: "Success Reset password" };
  }
}

module.exports = UserUseCase;
