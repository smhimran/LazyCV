const mongoose = require("mongoose");

const educationSchema = mongoose.Schema(
  {
    user: mongoose.Types.ObjectId,
    degree: {
      type: String,
      required: true,
      trim: true,
    },
    institute: {
      type: String,
      required: true,
      trim: true,
    },
    start_date: {
      type: Date,
      required: true,
    },
    end_date: Date,
    is_ongoing: {
      type: Boolean,
      default: false,
    },
    grade_point: Number,
    max_grade: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Education", educationSchema);
