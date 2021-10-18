const mongoose = require("mongoose");

const projectSchema = mongoose.Schema(
  {
    user: mongoose.Types.ObjectId,
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: String,
    url: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
