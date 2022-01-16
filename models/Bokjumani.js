const mongoose = require("mongoose");

const bokjumaniSchema = mongoose.Schema({
  author: {
    type: String,
    ref: "User",
  },
  type: Number,
  greeting: String,
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Bokjumani", bokjumaniSchema);
