const mongoose = require("mongoose");

const socialProfileSchema = mongoose.Schema({
  user: mongoose.Types.ObjectId,
  linkedin_handle: String,
  twitter_handle: String,
  github_handle: String,
  facebook_handle: String,
});

module.exports = mongoose.model("SocialProfile", socialProfileSchema);
