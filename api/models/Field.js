const mongoose = require("mongoose");

const fieldSchema = mongoose.Schema(
  {
    user: mongoose.Types.ObjectId,
    title: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["primary", "secondary"],
      default: "primary",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Field", fieldSchema);
