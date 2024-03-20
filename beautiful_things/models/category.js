const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: { type: String, required: true, maxLength: 50 },
    description: { type: String, required: true, maxLength: 1000 },
    url_search: { type: String, required: true, maxLength: 500 },
    url_picture: { type: String, required: true, maxLength: 500 },
    date_created: { type: Date, default: Date.now },
    created_by: { type: String, required: true, maxLength: 50 },
})

CategorySchema.virtual("url").get(function () {
    return `/catalog/category/${this._id}`;
});

CategorySchema.virtual("date_created_formatted").get(function() {
    return DateTime.fromJSDate(this.due_back).toLocaleString(DateTime.DATE_MED);
});

CategorySchema.virtual("date_created_yyyy_mm_dd").get(function () {
    return DateTime.fromJSDate(this.due_back).toISODate(); // format 'YYYY-MM-DD'
});

module.exports = mongoose.model("Category", CategorySchema);