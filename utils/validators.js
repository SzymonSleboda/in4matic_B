const { check, validationResult } = require("express-validator");

const validateRegister = [
  check("name").not().isEmpty().withMessage("Name is required"),

  check("email").isEmail().withMessage("Invalid email"),

  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

const validateLogin = [
  check("email").isEmail().withMessage("Invalid email"),

  check("password").not().isEmpty().withMessage("Password is required"),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

module.exports = {
  validateRegister,
  validateLogin,
  validate,
};
