const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    title: { type: String, required: true, maxLength: 50 },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    description: { type: String, required: true, maxLength: 1000 },
    url_search: { type: String, maxLength: 500 },
    url_picture: { type: String, required: true, maxLength: 500 },
    date_created: { type: Date, default: Date.now },
    created_by: { type: String, required: true, maxLength: 50 },
})

ItemSchema.virtual("url").get(function () {
    return `/catalog/item/${this._id}`;
});

ItemSchema.virtual("date_created_formatted").get(function() {
    return DateTime.fromJSDate(this.date_created).toLocaleString(DateTime.DATE_MED);
});

ItemSchema.virtual("date_created_yyyy_mm_dd").get(function () {
    return DateTime.fromJSDate(this.date_created).toISODate(); // format 'YYYY-MM-DD'
});

module.exports = mongoose.model("Item", ItemSchema);