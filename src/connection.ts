import mongoose from "mongoose";

export const connect = async () => {
  try {
    const connect = await mongoose.connect(process.env.DATABASE_URL!);
    console.log(
      "connected successfully",
      connect.connection.host,
      connect.connection.name
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
