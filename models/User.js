const mongoose = require("mongoose");
const { ObjectId } = mongoose;

const userSchema = mongoose.Schema({
  kakao_id: {
    type: Number,
    unique: true,
  },
  name: String,
  bokjumani_list: [{ type: ObjectId, ref: "Bokjumani" }],
  created_at: {
    type: Date,
    default: Date.now,
  },
  room_uri: String,
});

module.exports = mongoose.model("User", userSchema);
