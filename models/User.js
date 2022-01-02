const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
  bokjumani: [{ type: ObjectId, ref: "Bokjimani" }],
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
