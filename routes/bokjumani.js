const express = require("express");
const mongoose = require("mongoose");

const Bokjumani = require("../models/Bokjumani");
const User = require("../models/User");

const router = express.Router();

router.get("/:bokjumaniId", async function (req, res, next) {
  try {
    const { bokjumaniId } = req.params;

    const bokjumani = await Bokjumani.findById(bokjumaniId);

    if (!bokjumani) {
      res.json({
        result: "failed",
        message: "복주머니를 찾을 수 없습니다!",
      });

      return;
    }

    res.json({
      result: "ok",
      bokjumani,
    });
  } catch (error) {
    console.log(error);

    next(error);
  }
});

router.post("/:userId", async function (req, res, next) {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      res.status(400).json({
        result: "failed",
        message: "Invalid user id!",
      });

      return;
    }

    const user = await User.findById(userId);

    if (!user) {
      res.json({
        result: "failed",
        message: "해당 유저(room owner)를 찾을 수 없습니다!",
      });

      return;
    }

    const { author, greeting, type } = req.body;

    const bokjumani = new Bokjumani({
      author,
      greeting,
      type,
    });

    const newBokjumani = await bokjumani.save();

    if (!newBokjumani) {
      res.json({
        result: "failed",
        message: "새로운 복주머니 생성이 실패했습니다!",
      });

      return;
    }

    const originalLength = user.bokjumani_list.length;

    user.bokjumani_list.push(newBokjumani._id);
    await user.save();

    const isBokjumaniAdded = originalLength < user.bokjumani_list.length;

    if (!isBokjumaniAdded) {
      res.json({
        result: "failed",
        message: "복주머니를 생성했지만 유저에게 추가되지 않았습니다..",
      });

      return;
    }

    res.json({
      result: "ok",
      newBokjumani,
    });
  } catch (error) {
    console.log(error);

    next(error);
  }
});

module.exports = router;
