var express = require('express');
var router = express.Router();
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");

const asyncHandler = require("express-async-handler");
const index_controller = require("../controllers/indexController");


/* GET home page. */
router.get('/', index_controller.index); 

router.get("/sign-up", index_controller.sign_up_get);

router.post("/sign-up", index_controller.sign_up_post);

module.exports = router;
