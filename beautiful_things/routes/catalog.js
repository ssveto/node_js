const express = require("express");
const router = express.Router();

const category_controller = require("../controllers/categoryController");
const item_controller = require("../controllers/itemController");

router.get("/", category_controller.index);


router.get("/category_create_get/create", category_controller.category_create_get);
router.post("/category_create_post/create", category_controller.category_create_post);
router.get("/category_delete_get/:id/delete", category_controller.category_delete_get);
router.post("/category_delete_post/:id/delete", category_controller.category_delete_post);
router.get("/category_update_get/:id/update", category_controller.category_update_get);
router.post("/category_update_post/:id/update", category_controller.category_update_post);
router.get("/category/:id", category_controller.category_detail);
router.get("/categories", category_controller.category_list);


router.get("/item_create_get/create", item_controller.item_create_get);
router.post("/item_create_post/create", item_controller.item_create_post);
router.get("/item_delete_get/:id/delete", item_controller.item_delete_get);
router.post("/item_delete_post/:id/delete", item_controller.item_delete_post);
router.get("/item_update_get/:id/update", item_controller.item_update_get);
router.post("/item_update_post/:id/update", item_controller.item_update_post);
router.get("/item/:id", item_controller.item_detail);
router.get("/items", item_controller.item_list);


module.exports = router;