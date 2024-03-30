import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'guest' | 'admin';
}

const userSchema: Schema<IUser> = new Schema<IUser>({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["guest", "admin"],
    default: "guest",
  },
}, { timestamps: true });

const UserModel = mongoose.model<IUser>('User', userSchema);

export default UserModel;


/**
 * 
 *const mongoose = require("mongoose");
const userSchema = require("../Models/userModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleRegister = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("All fields mandatory");
  }
  const existingEmail = await userSchema.findOne({ email: email });
  if (existingEmail) {
    res.status(400);
    throw new Error("Email already exists");
  }
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, process.env.SALT);
  const user = await userSchema.create({
    name: name,
    email: email,
    password: hashedPassword,
    verificationCode: "null",
  });
  res.status(201).json({
    message: "Successfully signed up",
    data: {
      name: user.name,
      email: user.email,
    },
  });
});

const handleLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log("user password", password);
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields mandatory");
  }
  const checkEmail = await userSchema.findOne({ email: email });
  if (!checkEmail) {
    res.status(401);
    throw new Error("Email invalid. Signed up Already?");
  }
  console.log("the email", checkEmail);
  const userPassword = checkEmail.password;
  console.log(password, userPassword);
  const checkPassword = bcrypt.compareSync(password, userPassword);
  console.log("the check password", checkPassword);
  if (checkPassword === false) {
    res.status(401);
    throw new Error("Password incorrect");
  }
  const singleEmail = checkEmail.email;
  //creating the body to be put on the jwt sign
  const jwtBody = { name: checkEmail.name, email: singleEmail };
  const accessToken = jwt.sign(jwtBody, process.env.ACCESS_TOKEN);
  res.cookie("accessToken", accessToken).status(201);
  res.json({
    message: "User signed in successfully",
    accessToken: accessToken,
    name: checkEmail.name,
  });
});
const handleCurrent = asyncHandler(async (req, res) => {
  const { accessToken } = req.cookies;
  if (!accessToken) {
    res.status(401);
    throw new Error("User not authorized");
  }
  res.status(200).json({
    success: true,
  });
});

const handleLogOUt = asyncHandler(async (req, res) => {
  res.clearCookie("accessToken");
  res.status(200).json({ message: "User logged out" });
});

module.exports = { handleRegister, handleLogin, handleCurrent, handleLogOUt };
 */
