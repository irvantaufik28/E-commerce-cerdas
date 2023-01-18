const router = require("express").Router();
const productsController = require("../controller/productsController");

const handleUpload = require("../helpers/mediaHandler");

const authorized = require("../middlerware/authorization");

router.get("/api/v1/product", authorized, productsController.getAllProducts);
router.get("/api/v1/product/:id", authorized, productsController.getByIdProducts);
router.post(
  "/api/v1/product",
  authorized,
  handleUpload.upload.single("image"),
  productsController.createProducts
);
router.put(
  "/api/v1/product/:id",
  authorized,
  handleUpload.upload.single("image"),
  productsController.updateProducts
);
router.delete("/api/v1/product/:id", authorized, productsController.deleteProducts);

module.exports = router;
