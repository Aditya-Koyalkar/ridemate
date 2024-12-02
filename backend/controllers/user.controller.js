import { validationResult } from "express-validator";
import bcrypt from "bcrypt";

import userModel from "../models/user.model.js";
import userService from "../services/user.service.js";

const registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { fullname, password, email } = req.body;
  try {
    const isUserAlready = await userModel.findOne({ email });

    if (isUserAlready) {
      return res.status(400).json({ message: "User already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const token = await userService.createUser({
      firstName: fullname.firstName,
      lastName: fullname.lastName,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ token });
  } catch (e) {
    console.log(e);
  }
};

export default { registerUser };
