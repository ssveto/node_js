const mongoose = require("mongoose");
require('mongoose-type-email');

const Schema = mongoose.Schema;

const MemberSchema = new Schema({
    first_name: { type: String, required: true, maxLength: 100 },
    family_name: { type: String, required: true, maxLength: 100 },
    username: { type: String, required: true},
    password: { type: String, required: true },
    membership_status: { type: String, required: true, minLength: 3, maxLength: 20 }
});

MemberSchema.virtual("name").get(function () {
    let fullname = "";
    if (this.first_name && this.family_name) {
        fullname = `${this.family_name}, ${this.first_name}`;
    }

    return fullname;
});

MemberSchema.virtual("url").get(function () {
    return `/catalog/author/${this._id}`;
});

module.exports = mongoose.model("Member", MemberSchema);
