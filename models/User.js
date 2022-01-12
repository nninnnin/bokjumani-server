const mongoose = require("mongoose");
const { ObjectId } = mongoose;

const userSchema = mongoose.Schema({
  kakao_id: {
    type: Number,
    unique: true,
  },
  name: String,
  bokjumani_list: [{ type: ObjectId, ref: "Bokjimani" }],
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
