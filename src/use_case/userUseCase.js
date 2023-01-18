class UserUseCase {
  constructor(userRepository, detailRepository, cloudinary) {
    this._userRepository = userRepository;
    this._detailRepository = detailRepository;
    this._cloudinary = cloudinary;
  }

  async profile(id) {
    const include = ["user_detail"];
    const user = await this._userRepository.getById(id, { include });
    console.log(user)
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
}

module.exports = UserUseCase;
