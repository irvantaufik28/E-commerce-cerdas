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
      data : product.rows,
      pagination
    }
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
