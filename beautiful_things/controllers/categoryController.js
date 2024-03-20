const Category = require("../models/category");
const Item = require("../models/item");
const asyncHandler = require("express-async-handler");


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
    res.send("NOT IMPLEMENTED: Author create GET");
});

  // Handle Category create on POST.
exports.category_create_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Author create POST");
});

  // Display Category delete form on GET.
exports.category_delete_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Author delete GET");
});

  // Handle Category delete on POST.
exports.category_delete_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Author delete POST");
});

  // Display Category update form on GET.
exports.category_update_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Author update GET");
});

  // Handle Category update on POST.
exports.category_update_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Author update POST");
});