const Category = require("../models/category");
const Item = require("../models/item");
const asyncHandler = require("express-async-handler");


// Display list of all Authors.
exports.item_list = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Author list");
});

  // Display detail page for a specific Author.
exports.item_detail = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: Author detail: ${req.params.id}`);
});

  // Display Author create form on GET.
exports.item_create_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Author create GET");
});

  // Handle Author create on POST.
exports.item_create_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Author create POST");
});

  // Display Author delete form on GET.
exports.item_delete_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Author delete GET");
});

  // Handle Author delete on POST.
exports.item_delete_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Author delete POST");
});

  // Display Author update form on GET.
exports.item_update_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Author update GET");
});

  // Handle Author update on POST.
exports.item_update_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Author update POST");
});