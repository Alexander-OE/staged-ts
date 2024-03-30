import roomSchema from "../models/roomsModel";
import { Request, Response, NextFunction } from "express";

export const createRoomHandler = async (req:Request, res:Response) => {
  const { name, roomtype, price } = req.body;

  const newRoom = await roomSchema.create({
    name,
    roomType: roomtype,
    price,
  });

  res.status(200).json({
    code: "success",
    data: newRoom,
  });
};

export const getRoomHandler = async (req:Request, res:Response) => {
  const { search, roomType, minPrice, maxPrice } = req.query;
  const rooms = await roomSchema.find();

  res.status(200).json({
    code: "success",
    data: rooms,
  });
};

export const updateRoomHandler = async (req:Request, res:Response) => {
  const { name, roomtype, price } = req.body;
  const { roomid } = req.params;

  const rooms = await roomSchema.findOneAndUpdate(
    { _id: roomid },
    { name, roomType: roomtype, price }
  );

  res.status(200).json({
    code: "success",
    data: rooms,
  });
};

export const deleteRoomHandler = async (req:Request, res:Response) => {
  const { roomid } = req.params;

  await roomSchema.deleteOne({ _id: roomid });

  res.status(200).json({
    code: "deleted",
  });
};

export const getOneRoomHandler = async (req:Request, res:Response) => {
  const { roomid } = req.params;

  const room = await roomSchema.findById(roomid);

  res.status(200).json({
    code: "success",
    data: room,
  });
};

/**

const getRecipe = asyncHandler(async (req, res) => {
  const { n } = req.query;
  const getRecipes = await recipeSchema.find();
  const requestedRecipes = getRecipes.splice(0, n);
  res
    .status(200)
    .json({ message: "Request successful", data: requestedRecipes });
});
const getRecipeViaFilter = asyncHandler(async (req, res) => {
  const { similar, n } = req.query;
  console.log(similar, n);
  const data = await recipeSchema.find();
  const match = data.filter((item) => item.title.startsWith(similar));
  console.log("the match", match[0].title);
  if (match.length === 0) {
    res.status(404);
    throw new Error("Recipe not found");
  }
  const result = match.splice(0, n);
  res.status(200).json({ message: "request gotten", data: result });
});
const getOneRecipe = asyncHandler(async (req, res) => {
  const { recipe } = req.body;
  console.log("the real recipe", req.body.recipe);
  const data = await recipeSchema.find();
  const match = data.filter((item) => {
    return item.title === recipe;
  });
  console.log("the particular match", match);
  if (match.length === 0) {
    res.status(404);
    throw new Error("Recipe not found");
  }
  res.status(200).json({ message: "request gotten", data: match });
});
module.exports = {
  handleRecipeUploads,
  getRecipe,
  getRecipeViaFilter,
  getOneRecipe,
};
 */
