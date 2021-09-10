const mongoose = require("mongoose");

const achievementSchema = mongoose.Schema(
  {
    user: mongoose.Types.ObjectId,
    title: {
      type: String,
      required: true,
      trim: true,
    },
    position: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Achievement", achievementSchema);
