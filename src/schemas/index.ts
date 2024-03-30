import Joi from "joi";

export const createUser = Joi.object({
  name: Joi.string().min(4).max(30),
  password: Joi.string().min(8).max(30),
  role: Joi.string().valid("guest", "admin").optional(),
});

export const createRoom = Joi.object({
  name: Joi.string().min(4).max(30),
  roomType: Joi.string(),
  price: Joi.number(),
});

export const createRoomType = Joi.object({
  name: Joi.string().min(4).max(30),
});
