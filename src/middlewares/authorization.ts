import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface UserActions {
  [key: string]: string[];
}

const actions: UserActions = {
  admin: ["GET", "POST", "PUT", "DELETE"],
  user: ["GET"],
};

export const authorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { accessToken } = req.cookies;

  // Decode the access token
  const decodedToken = jwt.decode(accessToken) as JwtPayload | null;

  if (!decodedToken || typeof decodedToken === "string") {
    return res.status(401).json({
      code: "unauthorized",
      message: "Invalid access token",
    });
  }

  const { role } = decodedToken;

  if (!role) {
    return res.status(401).json({
      code: "unauthorized",
      message: "Role not found in token payload",
    });
  }

  const userActions = actions[role];

  if (!userActions || !Array.isArray(userActions)) {
    return res.status(401).json({
      code: "unauthorized",
      message: "User actions not defined for the role",
    });
  }

  const method = req.method;
  const verifyAction = userActions.includes(method);

  if (!verifyAction) {
    res.status(402).json({
      code: "unauthorized",
      message: "Method not allowed for account",
    });
    return;
  }

  next();
};
