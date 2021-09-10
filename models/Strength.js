const mongoose = require("mongoose");

const strengthSchema = mongoose.Schema(
  {
    user: mongoose.Types.ObjectId,
    title: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Strength", strengthSchema);
