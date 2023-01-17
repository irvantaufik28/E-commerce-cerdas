class AuthUseCase {
  constructor(authRepository, bcrypt, tokenManager) {
    this._authRepository = authRepository;
    this._bcrypt = bcrypt;
    this._tokenManager = tokenManager;
  }

  async login(request) {
    const user = await this._authRepository.loginUser(request.email);
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
}

module.exports = AuthUseCase;
