const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    title: { type: String, required: true, minLength: 3, maxLength: 100 },
    time_stamp: { type: Date, default: Date.now },
    text: { type: String, required: true, minLength: 3, maxLength: 150 },
    created_by: { type: Schema.Types.ObjectId, ref: "Member", required: true,  }
});


MessageSchema.virtual("time_stamp_formatted").get(function() {
    return DateTime.fromJSDate(this.time_stamp).toLocaleString(DateTime.DATE_MED);
})

MessageSchema.virtual("url").get(function () {
    return `/catalog/author/${this._id}`;
});

module.exports = mongoose.model("Message", MessageSchema);
