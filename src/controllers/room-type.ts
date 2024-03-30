import { Request, Response } from "express";
import roomTypeSchema from "../models/roomTypeModel";

export const createRoomTypeHandler = async (req:Request, res:Response) => {
  const { name } = req.body;

  const result = await roomTypeSchema.create({
    name,
  });

  res.status(200).json({
    code: "success",
    data: result,
  });
};

export const getRoomTypeHandler = async (req:Request, res:Response) => {
  const result = await roomTypeSchema.find();

  res.status(200).json({
    code: "success",
    data: result,
  });
};
