const User = require("../models/User");
const validator = require("validator");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  
  if (!validator.isEmail(email)) {
    return res.status(400).json({
      error: "Invalid email format",
    });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        error: "Email is already in use",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};
