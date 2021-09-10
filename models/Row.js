const mongoose = require("mongoose");

const rowSchema = mongoose.Schema(
  {
    field: mongoose.Types.ObjectId,
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Row", rowSchema);
