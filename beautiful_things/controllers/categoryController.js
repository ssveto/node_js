const Category = require("../models/category");
const Item = require("../models/item");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");


const isValidUrl = (value) => {
  try {
    new URL(value);
    return true;
  } catch (error) {
    return false;
  }
};


exports.index = asyncHandler(async (req, res, next) => {
    const [
        numItems,
        numCategories,
        allCategories
    ] = await Promise.all([
        Item.countDocuments({}).exec(),
        Category.countDocuments({}).exec(),
        Category.find({}, "name").sort({ name: 1 }).exec(),
    ]);


    res.render("index", {
        title: "Beauty in things",
        items_count: numItems,
        categories_count: numCategories,
        categories: allCategories
    });

});

// Display list of all Categories.
exports.category_list = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Author list");
});

  // Display detail page for a specific Category.
exports.category_detail = asyncHandler(async (req, res, next) => {
    const [
      category,
      allItems,
      allCategories
    ] = await Promise.all([
      Category.findById(req.params.id).exec(),
      Item.find({ category: req.params.id }).sort({ title: 1 }).exec(),
      Category.find({}, "name").sort({ name: 1 }).exec()

    ]);

    if (category === null) {
      // No results.
      const err = new Error("Category not found");
      err.status = 404;
      return next(err);
    }

    res.render("category_detail", {
      title: category.name,
      items: allItems,
      category: category,
      categories: allCategories
    })
});

  // Display Category create form on GET.
exports.category_create_get = asyncHandler(async (req, res, next) => {
  const [
    categories,
    items,
  ] = await Promise.all([
    Category.find({}, "name").sort({ name: 1 }).exec(),
    Item.find().sort({ title: 1 }).exec()
  ]);

  res.render("category_form", {
    title: "Create New Category",
    items: items,
    categories: categories,
  })
});

  // Handle Category create on POST.
exports.category_create_post = [
  body("name", "Name must be specified").trim().isLength({ min: 1 }).escape(),
  body("description", "Description must be given").trim().isLength({ min: 10 }).escape(),
  body("user_name", "The name of the user must be given").trim().isLength({ min: 1 }).escape(),
  body("url_search", 'Invalid URL format').trim().isURL().isLength({ min: 1 }).custom(isValidUrl),
  body("url_picture", 'Invalid URL of the picture').trim().isURL().isLength({ min: 1 }).custom(isValidUrl),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const category = new Category({
      name: req.body.name,
      category: req.body.category,
      description: req.body.description,
      url_search: req.body.url_search,
      url_picture: req.body.url_picture,
      created_by: req.body.user_name
    });

    if (!errors.isEmpty()) {

      const categories = await Category.find().sort({ name: 1 }).exec();
    
      res.render("category_form", {
        title: "Create New Category",
        category: category,
        categories: categories,
        errors: errors.array()
      })

    } else {
      await category.save();
      res.redirect(category.url);
    }
  })
];

  // Display Category delete form on GET.
exports.category_delete_get = asyncHandler(async (req, res, next) => {
  const [
    category,
    allItems,
    allCategories
  ] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Item.find({ category: req.params.id }).sort({ title: 1 }).exec(),
    Category.find({}, "name").sort({ name: 1 }).exec()

  ]);
  
  if (category === null) {
    res.redirect("/catalog");
  }

  res.render("category_delete", {
    title: category.name,
    items: allItems,
    category: category,
    categories: allCategories
  })
});

  // Handle Category delete on POST.
exports.category_delete_post = asyncHandler(async (req, res, next) => {
  const [
    category,
    allItems,
    allCategories
  ] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Item.find({ category: req.params.id }).sort({ title: 1 }).exec(),
    Category.find({}, "name").sort({ name: 1 }).exec()

  ]);

  if (allItems.length > 0) {
    res.render("category_delete", {
      title: category.name,
      items: allItems,
      category: category,
      categories: allCategories
    })
  } else {
    await Category.findByIdAndDelete(req.body.categoryid);
    res.redirect("/catalog/")
  }

});

  // Display Category update form on GET.
exports.category_update_get = asyncHandler(async (req, res, next) => {
  const [
    categories,
    category
  ] = await Promise.all([
    Category.find({}, "name").sort({ name: 1 }).exec(),
    Category.findById(req.params.id).exec()
  ]);

  res.render("category_form", {
    title: "Update Category",
    category: category,
    categories: categories,
  })});

  // Handle Category update on POST.
exports.category_update_post = [
  body("name", "Name must be specified").trim().isLength({ min: 1 }).escape(),
  body("description", "Description must be given").trim().isLength({ min: 10 }).escape(),
  body("user_name", "The name of the user must be given").trim().isLength({ min: 1 }).escape(),
  body("url_search", 'Invalid URL format').trim().isURL().isLength({ min: 1 }).custom(isValidUrl),
  body("url_picture", 'Invalid URL of the picture').trim().isURL().isLength({ min: 1 }).custom(isValidUrl),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const category = new Category({
      name: req.body.name,
      category: req.body.category,
      description: req.body.description,
      url_search: req.body.url_search,
      url_picture: req.body.url_picture,
      created_by: req.body.user_name,
      _id: req.params.id
    });

    if (!errors.isEmpty()) {

      const categories = await Category.find().sort({ name: 1 }).exec();
    
      res.render("category_form", {
        title: "Update Category",
        category: category,
        categories: categories,
        errors: errors.array()
      })

    } else {
      const updatedCategory = await Category.findByIdAndUpdate(req.params.id, category, {});
      res.redirect(updatedCategory.url);
    }
  })
];