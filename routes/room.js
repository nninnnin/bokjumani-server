const express = require("express");

const User = require("../models/User");

const router = express.Router();

router.get("/:roomId", async function (req, res, next) {
  try {
    const { roomId } = req.params;

    const user = await User.findOne({ room_uri: roomId }).populate({
      path: "bokjumani_list",
      options: {
        sort: { created_at: -1 },
      },
    });

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
