import { createRoom, createRoomType, createUser } from "../schemas/index";

import { Request, Response, NextFunction } from "express";
const schemas = {
  "/api/v1/rooms": createRoom,
  "/api/v1/users": createUser,
  "/api/v1/rooms-types": createRoomType,
};

import { ObjectSchema } from 'joi';

interface Schemas {
  [key: string]: ObjectSchema<any>;
}

export const validator = (req: Request, res: Response, next: NextFunction) => {
  const path = req.path;
  const pathSchema = (schemas as Schemas)[path]; 
  if (!pathSchema) {
    return res.status(404).json({
      code: "schema_not_found",
      message: "Schema not defined for the route",
    });
  }

  const validData = pathSchema.validate(req.body);
  console.log(validData);

  if (validData.error) {
    return res.status(403).json({
      code: "invalid_data_passed",
      message: validData.error.message, // Access the error message
    });
  }

  next();
};

