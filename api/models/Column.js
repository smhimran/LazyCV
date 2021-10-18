const mongoose = require("mongoose");

const columnSchema = mongoose.Schema(
  {
    row: mongoose.Types.ObjectId,
    type: {
      type: String,
      enum: ["Text", "Textarea", "Url", "Number", "Icon"],
      default: "Text",
    },
    value: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Column", columnSchema);
