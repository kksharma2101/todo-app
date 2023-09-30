import User from "../models/user.model.js";
import AppError from "../utils/error.js";
import JWT from "jsonwebtoken";
import bcrypt from "bcryptjs";

const cookieOption = {
  maxAge: 1 * 24 * 60 * 60,
  httpOnly: true,
  secure: true,
};

// register controllers
const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!(name, email, password)) {
      return next(new AppError("All field is require"));
    }

    const existEmail = await User.findOne({ email });
    if (existEmail) {
      return next(new AppError("Email is already exists", 404));
    }

    const user = await User.create({ name, email, password });
    if (!user) {
      return next(new AppError("User is not register,Please, try again"));
    }
    await user.save();
    user.password = undefined;

    const token = JWT.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: 1 * 24 * 60 * 60 }
    );

    res.cookie("token", token, cookieOption);

    res.status(200).json({
      success: true,
      message: "User register successfully",
      user,
    });
  } catch (e) {
    return next(new AppError(e.message));
  }
};

// login controllers
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // const password = req.body.password;
    if (!(email, password)) {
      return next(new AppError("Data is not exists, Try again", 404));
    }
    const user = await User.findOne({ email });

    const match = await bcrypt.compare(password, user.password);

    if (!match || !user) {
      return next(new AppError("Email and Password does not match", 404));
    }

    user.password = undefined;

    const token = JWT.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: 1 * 24 * 60 * 60 }
    );

    res.cookie("token", token, cookieOption);

    res.status(200).json({
      success: true,
      message: "User loged in successfully",
      user,
    });
  } catch (e) {
    return next(new AppError(e.message, 404));
  }
};

export { register, login };
