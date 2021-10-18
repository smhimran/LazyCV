const mongoose = require("mongoose");

const skillSchema = mongoose.Schema(
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

module.exports = mongoose.model("Skill", skillSchema);
