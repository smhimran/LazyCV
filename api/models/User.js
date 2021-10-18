const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    avatar: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
    },
    address: String,
    intro: String,
    summary: String,
    isActive: Boolean,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
