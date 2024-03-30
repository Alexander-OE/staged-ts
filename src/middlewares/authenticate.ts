import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import userModel from '../models/userModel'; // Assuming you have a userModel imported

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { accessToken } = req.cookies;

  if (!accessToken) {
    return res.status(400).json({
      code: "unauthenticated",
      message: "Please sign in",
    });
  }

  let decodedToken: JwtPayload | null;
  try {
    decodedToken = jwt.verify(accessToken, 'your_secret_key_here') as JwtPayload;
  } catch (error) {
    return res.status(400).json({
      code: "unauthenticated",
      message: "Invalid access token",
    });
  }

  if (!decodedToken || typeof decodedToken === 'string') {
    return res.status(400).json({
      code: "unauthenticated",
      message: "Invalid access token",
    });
  }

  const { email } = decodedToken;

  if (!email) {
    return res.status(400).json({
      code: "unauthenticated",
      message: "Email not found in token payload",
    });
  }

  try {
    const checkUser = await userModel.findOne({ email: email });

    if (!checkUser) {
      return res.status(400).json({
        code: "unauthenticated",
        message: "User not found",
      });
    }
  } catch (error) {
    console.error('Error finding user:', error);
    return res.status(500).json({
      code: "server_error",
      message: "Internal server error",
    });
  }

  next();
};
