module.exports = {
  getAllProducts: async (req, res) => {
    try {

        const limit = parseInt(req.query.record ?? 10);
        const page = parseInt(req.query.page ?? 1)

        const params = {
            ...req.query,
            page,
            limit
        }
    const products = await req.productsUC.getAll(params);
    return res.status(200).json({ products });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
  getByIdProducts: async (req, res) => {
    // try {
      const { id } = req.params;
      const product = await req.productsUC.getByid(id);
      return res.status(200).json({ product });
    // } catch (error) {
    //   return res.status(error.status).json({ message: error.message });
    // }
  },
  createProducts: async (req, res) => {
    try {
      const request = {
        user_id: req.user,
        name_product: req.body.name_product,
        price: req.body.price,
        descripition: req.body.descripition,
        image: req.file.path,
      };
      const product = await req.productsUC.create(request);
      return res.status(200).json({ product });
    } catch (error) {
      return res.status(error.status).json({ message: error.message });
    }
  },

  updateProducts: async (req, res) => {
    try {
      const { id } = req.params;
      const request = {
        name_product: req.body.name_product,
        price: req.body.price,
        descripition: req.body.descripition,
        image: req.body.image,
      };
      const product = await req.productsUC.update(request, id);
      return res.status(200).json({ product });
    } catch (error) {
      return res.status(error.status).json({ message: error.message });
    }
  },

  deleteProducts: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await req.productsUC.delete(id);
      return res.status(200).json({ message: "Succces delete product" });
    } catch (error) {
      return res.status(error.status).json({ message: error.message });
    }
  },
};
