import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const Signup = async (req, res) => {
  try {
    const { fullName, username, email, password } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid Email format" });
    }

    //find existing user
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already taken" });
    }

    //find existing email
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: "Email already taken" });
    }

    //password hashing

    const salt = await bcrypt.getSalt(12);
    const hashPassword = await bcrypt.genSalt(password, salt);

    // for new user
    const newUser = new User({
      fullName,
      username,
      email,
      password: hashPassword,
    });

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        id: newUser._id,
        username: newUser.username,
        fullName: newUser.fullName,
        email: newUser.email,
        followers: newUser.followers,
        following: newUser.following,
        profileImg: newUser.profileImg,
        coverImg: newUser.coverImg,
      });
    } else {
      return res.status(400).json({ error: "Invalid User data" });
    }
  } catch (error) {
    console.log("Error is in SignUp controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const Login = async (req, res) => {
  const { username, email, password } = req.body;
  const checkUsername = User.findOne({ username });
  const checkEmail = User.findOne({ email });
  if (!(checkUsername === username)) {
    return res.status(400).json({ error: "Username not exist,Try again" });
  }
  if (!(checkEmail === email)) {
    return res.status(400).json({ error: "Email not Exist, Try again" });
  }
};
export const Logout = async (req, res) => {
  res.json({
    data: "SignIn endPoint hatted..",
  });
};
