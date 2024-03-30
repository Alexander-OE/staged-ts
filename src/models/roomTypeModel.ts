import mongoose, { Schema, Document } from 'mongoose';

export interface IRoomType extends Document {
  name: string;
}

const roomTypeSchema: Schema<IRoomType> = new Schema<IRoomType>({
  name: String,
}, { timestamps: true });

const RoomTypeModel = mongoose.model<IRoomType>('room-type', roomTypeSchema);

export default RoomTypeModel;
