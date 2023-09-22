const jwt = require("jsonwebtoken");

const User = require("../models/User");

const BlacklistedToken = require("../models/BlacklistedToken");

const { TokenExpiredError } = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const accessToken = req.header("Authorization").split(" ")[1];

    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ error: "No user found" });
    }

    const isBlacklisted = await BlacklistedToken.exists({ token: accessToken });

    if (isBlacklisted) {
      return res.status(401).json({ error: "Access token blacklisted" });
    }

    req.user = user;

    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return res.status(401).json({ error: "Access token expired" });
    } else {
      return res.status(401).json({ error: "Invalid access token" });
    }
  }
};

module.exports = auth;
