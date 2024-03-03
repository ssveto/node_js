const express = require("express");
const router = express.Router();

const book_controller = require("../controllers/bookController");
const author_controller = require("../controllers/authorController");
const genre_controller = require("../controllers/genreController");
const book_instance_controller = require("../controllers/bookinstanceController");

router.get("/", book_controller.index);

router.get("/book/create", book_controller.book_create_get);