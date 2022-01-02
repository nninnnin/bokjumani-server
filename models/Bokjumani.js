const mongoose = require("mongoose");

const bokjumaniSchema = mongoose.Schema({
  author: {
    type: String,
  },
  image_url: String,
  note: String,
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Bokjumani", bokjumaniSchema);
