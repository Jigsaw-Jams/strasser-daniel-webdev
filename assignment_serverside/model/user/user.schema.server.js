var mongoose = require("mongoose");

var userSchema = mongoose.Schema(
    {
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        websites: [{type: mongoose.Schema.Types.ObjectId, ref: "WebsiteModel"}],
        dateCreated: {type: Date, default: Date.now}
    },
    {collection: "user"} // Explicitly declare the collection name.
);

module.exports = userSchema;