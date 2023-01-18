class ProductsUseCase {
  constructor(productsRepository, cloudinary) {
    this._productRepository = productsRepository;
    this._cloudinary = cloudinary;
  }

  async getAll() {
    const products = await this._productRepository.getAll();
    return products;
  }

  async getByid() {
    const products = await this._productRepository.getByid();
    if (!products) {
      throw { status: 404, message: "Products not found" };
    }
    return products;
  }

  async create(products) {
    const result = await this._productRepository.create(products);
    return result;
  }

  async update(id, products) {
    const product = await this._productsRepository.getByid(id);
    if (!product) {
      throw { status: 404, message: "Products not found" };
    }
    await this._productRepository._update(id, products);
    const newProducts = await this._productRepository.getByid(id);

    return newProducts;
  }

  async delete(id) {
    const products = await this._productsRepository.getByid(id);
    if (!products) {
      throw { status: 404, message: "Products not found" };
    }
    await this._productRepository.delete(id);

    return;
  }
}

module.exports = ProductsUseCase;
