class AuthUseCase {
  constructor(authRepository) {
    this.authRepository = authRepository;
  }

  async login(userData) {
    const user = await this.authRepository.loginUser(userData.email);
    if(user === null) {
        throw {status: 404, message: "user not found"}
    }
    return user;
  }
}

module.exports = AuthUseCase;
