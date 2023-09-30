import mongoose from "mongoose";

const connectToDb = async (req, res) => {
  try {
    const connected = await mongoose.connect(process.env.MONGODB_URL);
    if (connected) {
      console.log("DB connected");
    }
  } catch (e) {
    console.log(e.message);
  }
};

export default connectToDb;
