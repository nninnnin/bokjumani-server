const express = require("express");
const axios = require("axios");
const User = require("../models/User");

const router = express.Router();

router.get("/", async function (req, res, next) {
  try {
    const { kakaoId } = req.query;

    const user = await User.findOne({ kakaoId }).lean();

    console.log("그런 유저 있습니까..?", user);

    if (user) {
      delete user.kakao_id;

      res.cookie("user", JSON.stringify(user), {
        httpOnly: false,
        secure: true,
        expires: new Date(Date.now() + 900000),
        sameSite: "none",
      });
      res.json({
        result: "ok",
        message: "유저 이써",
      });
      return;
    }

    res.json({
      result: "failed",
      message: "User is not found..",
    });
  } catch (error) {
    console.log(error);

    next(error);
  }
});

// 가입시키기
router.post("/", async function (req, res, next) {
  try {
    const { kakaoId, username } = req.body;

    if (isNaN(kakaoId)) {
      new Error("Invalid kakaoId");
    }

    const user = await User.findOne({ kakao_id: kakaoId });

    // 이미 가입한 경우
    if (user) {
      res.json({
        result: "failed",
        message: "이미 가입한 유저입니다!",
      });

      return;
    }

    const newUser = new User({ kakao_id: kakaoId, name: username });
    await newUser.save();

    res.json({ result: "ok", newUser });
  } catch (err) {
    console.log(err);

    next(err);
  }
});

module.exports = router;
