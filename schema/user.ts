import { body } from "express-validator";

export const RegistrationSchema = [
  body("email").isEmail().withMessage("Email must be valid email address"),
  body("fullname").isString().isLength({ min: 6, max: 100 }),
  body("phone_number")
    .isString()
    .isLength({ min: 9, max: 14 })
    .withMessage("Valid phone number is required."),
  body("password").isLength({ min: 4, max: 64 }),
  body("confirmPassword").isLength({ min: 4, max: 64 }),
];

export const loginUserSchema = [
  body("email").isEmail().withMessage("Please provide valid email address"),
  body("password")
    .isLength({
      min: 4,
      max: 64,
    })
    .withMessage("Password must be atleast 4 characters."),
];
