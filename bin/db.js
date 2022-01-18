const mongoose = require("mongoose");

exports.connectDB = function () {
  mongoose.connect(
    `mongodb+srv://justin:${process.env.DB_PASSWORD}@cluster0.fo5rp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true },
    function () {
      console.log("Database connected 🧧");
    }
  );
};
