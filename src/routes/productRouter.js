const router = require("express").Router();
const productsController = require("../controller/productsController");

const handleUpload = require("../helpers/mediaHandler");

const authorized = require("../middlerware/authorization");

router.get("/product", authorized, productsController.getAllProducts);
router.get("/product/:id", authorized, productsController.getByIdProducts);
router.post(
  "/product",
  authorized,
  handleUpload.upload.single("image"),
  productsController.createProducts
);
router.put(
  "/product/:id",
  authorized,
  handleUpload.upload.single("image"),
  productsController.updateProducts
);
router.delete("/product/:id", authorized, productsController.deleteProducts);

module.exports = router;
