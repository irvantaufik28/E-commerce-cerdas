const errorHandler = require("../helpers/Error-Handler");

class ProductsUseCase {
  constructor(productsRepository, cloudinary) {
    this._productRepository = productsRepository;
    this._cloudinary = cloudinary;
  }

  async getAll(params) {
    const page = params.page ?? 1;
    const limit = parseInt(params.limit ?? 10);

    const offset = parseInt((page - 1) * limit);
    const orderBy = params.orderBy ?? "created_at";
    const orderDirection = params.orderDir ?? "DESC";

    const order = [[orderBy, orderDirection]];

    const product = await this._productRepository.getAll(params, {
      offset,
      limit,
      order,
    });

    const start = 0 + (page - 1) * limit;
    const end = page * limit;
    const countFiltered = product.count;

    const pagination = {
      totalRow: product.count,
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
      data: product.rows,
      pagination,
    };
  }

  async getByid(id) {
    const include = [
      { association: "user", attributes: { exclude: ["password"] } },
    ];
    const products = await this._productRepository.getByid(id, { include });
    if (products === null) {
      throw new errorHandler("product not found", 404)
    }
    return products;
  }

  async create(request) {
    const image = await this._cloudinary.uploadCloudinary(request.image);
    request.image = image;
    const result = await this._productRepository.create(request);
    return result;
  }

  async update(id, request) {
    const product = await this._productRepository.getByid(id);
    if (!product) {
      throw new errorHandler("product not found", 404)
    }
    await this._productRepository.update(id, request);
    const newProducts = await this._productRepository.getByid(id);

    return newProducts;
  }

  async delete(id, user_id) {
    const products = await this._productRepository.getByid(id);

    if (!products) {
      throw new errorHandler("product not found", 404)
    }
    if (products.user_id !== user_id) {
      throw new errorHandler("canot delete product", 404)
    }
    await this._productRepository.delete(id);

    return;
  }
}

module.exports = ProductsUseCase;
