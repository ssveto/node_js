const Category = require("../models/category");
const Item = require("../models/item");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");


const isValidUrl = (value) => {
  try {
    new URL(value);
    return true;
  } catch (error) {
    return false;
  }
};


  // Display detail page for a specific Item.
exports.item_detail = asyncHandler(async (req, res, next) => {
  const [
    item,
    categories
  ] = await Promise.all([
    Item.findById(req.params.id).populate("category").exec(),
    Category.find({}, "name").sort({ name: 1 }).exec()
  ]);

  if (item === null) {
    // No results.
    const err = new Error("Item not found");
    err.status = 404;
    return next(err);
  }

  res.render("item_detail", {
    title: item.title,
    item: item,
    categories: categories
  })
});

// Display Author create form on GET.
exports.item_create_get = asyncHandler(async (req, res, next) => {
  const [
    categories,
    items,
  ] = await Promise.all([
    Category.find({}, "name").sort({ name: 1 }).exec(),
    Item.find().sort({ title: 1 }).exec()
  ]);

  res.render("item_form", {
    title: "Create New Item",
    items: items,
    categories: categories,
  })
});

  // Handle Author create on POST.
exports.item_create_post = [
  body("title", "Title must be specified").trim().isLength({ min: 1 }).escape(),
  body("description", "Description must be given").trim().isLength({ min: 10 }).escape(),
  body("user_name", "The name of the user must be given").trim().isLength({ min: 1 }).escape(),
  body("url_search", 'Invalid URL format').trim().isURL().isLength({ min: 1 }).custom(isValidUrl),
  body("url_picture", 'Invalid URL of the picture').trim().isURL().isLength({ min: 1 }).custom(isValidUrl),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const item = new Item({
      title: req.body.title,
      category: req.body.category,
      description: req.body.description,
      url_search: req.body.url_search,
      url_picture: req.body.url_picture,
      created_by: req.body.user_name
    });

    if (!errors.isEmpty()) {

      const categories = await Category.find().sort({ name: 1 }).exec();
    
      res.render("item_form", {
        title: "Create New Item",
        item: item,
        categories: categories,
        errors: errors.array()
      })

    } else {
      await item.save();
      res.redirect(item.url);
    }
  })
];

  // Display Author delete form on GET.
exports.item_delete_get = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id).exec();
  const categories = await Category.find().sort({ name: 1 }).exec();


  if (item === null) {
    res.redirect("/catalog/")
  }

  res.render("item_delete", {
    title: "Delete Item",
    item: item,
    categories: categories,


  })
});

  // Handle Author delete on POST.
exports.item_delete_post = asyncHandler(async (req, res, next) => {
  await Item.findByIdAndDelete(req.body.itemid);
  res.redirect("/catalog/")
});

  // Display Author update form on GET.
exports.item_update_get = asyncHandler(async (req, res, next) => {
  const [
    categories,
    items,
    item
  ] = await Promise.all([
    Category.find({}, "name").sort({ name: 1 }).exec(),
    Item.find().sort({ title: 1 }).exec(),
    Item.findById(req.params.id).populate("category").exec()
  ]);

  res.render("item_form", {
    title: "Update Item",
    items: items,
    item: item,
    categories: categories,
  })
});

  // Handle Author update on POST.
exports.item_update_post = [
  body("title", "Title must be specified").trim().isLength({ min: 1 }).escape(),
  body("description", "Description must be given").trim().isLength({ min: 10 }).escape(),
  body("user_name", "The name of the user must be given").trim().isLength({ min: 1 }).escape(),
  body("url_search", 'Invalid URL format').trim().isURL().isLength({ min: 1 }).custom(isValidUrl),
  body("url_picture", 'Invalid URL of the picture').trim().isURL().isLength({ min: 1 }).custom(isValidUrl),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const item = new Item({
      title: req.body.title,
      category: req.body.category,
      description: req.body.description,
      url_search: req.body.url_search,
      url_picture: req.body.url_picture,
      created_by: req.body.user_name,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {

      const categories = await Category.find().sort({ name: 1 }).exec();
    
      res.render("item_form", {
        title: "Update Item",
        item: item,
        categories: categories,
        errors: errors.array()
      })

    } else {
      const updatedItem = await Item.findByIdAndUpdate(req.params.id, item, {});
      res.redirect(updatedItem.url);
    }
  })
];