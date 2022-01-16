const express = require("express");

const User = require("../models/User");

const router = express.Router();

router.get("/:roomId", async function (req, res, next) {
  try {
    const { roomId } = req.params;

    const user = await User.findOne({ room_id: roomId }).populate(
      "bokjumani_list"
    );

    console.log("roomid로 찾아낸 유저..", user);

    if (!user) {
      res.json({
        result: "failed",
        message: "해당 room id로 user를 찾지 못했습니다..",
      });

      return;
    }

    res.json({
      result: "ok",
      user,
    });
  } catch (error) {
    console.log(error);

    next(error);
  }
});

module.exports = router;
