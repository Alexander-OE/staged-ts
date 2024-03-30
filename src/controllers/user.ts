import bcrypt from "bcryptjs";
import userModel from "../models/userModel";
import jwt from "jsonwebtoken";

import { Request, Response } from "express";


export const createUser = async (req:Request, res:Response) => {
  const { name, email, password, role } = req.body;

  const existingEmail = await userModel.findOne({ email: email });

  if (existingEmail) {
    res.status(400).json({
      code: "used_email",
      message: "Email already exists",
    });
  }

  const hashedPassword = bcrypt.hash(password, "ejwdshda78");
  const user = await userModel.create({
    name: name,
    email: email,
    password: hashedPassword,
    role,
  });

  const jwtBody = { name, email, role };
  const accessToken = jwt.sign(jwtBody, process.env.ACCESS_TOKEN);
  res.cookie("accessToken", accessToken).status(201).json({
    code: "success",
    message: "User signed in successfully",
    accessToken: accessToken,
    name,
  });
};

export const loginUser = async (req:Request, res:Response) => {
  const { email, password } = req.body;
  const checkEmail = await userSchema.findOne({ email: email });

  if (!checkEmail) {
    res.status(400).json({
      code: "no_email_found",
      message: "No User Found with this email",
    });
  }

  const userPassword = checkEmail.password;
  const checkPassword = bcrypt.compare(password, userPassword);

  if (checkPassword === false) {
    res.status(400).json({
      code: "incorrect_password",
      message: "Password is Incorrect",
    });
  }

  //creating the body to be put on the jwt sign
  const jwtBody = {
    name: checkEmail.name,
    email: checkEmail.email,
    role: checkEmail.role,
  };
  const accessToken = jwt.sign(jwtBody, process.env.ACCESS_TOKEN);

  res.cookie("accessToken", accessToken).status(200).json({
    code: "success",
    message: "User signed in successfully",
    accessToken: accessToken,
    name: checkEmail.name,
  });
};
