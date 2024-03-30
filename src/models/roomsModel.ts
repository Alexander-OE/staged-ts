import mongoose, { Schema, Document } from 'mongoose';

export interface IRoom extends Document {
  name: string;
  roomType: string;
  price: number;
}

const roomSchema: Schema<IRoom> = new Schema<IRoom>({
  name: String,
  roomType: String,
  price: Number,
}, { timestamps: true });

const RoomModel = mongoose.model<IRoom>('Room', roomSchema);

export default RoomModel;

