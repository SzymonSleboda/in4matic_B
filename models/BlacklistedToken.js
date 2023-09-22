const mongoose = require("mongoose");

const BlacklistedTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: process.env.JWT_EXPIRES_IN,
  },
});

module.exports = mongoose.model("BlacklistedToken", BlacklistedTokenSchema);
