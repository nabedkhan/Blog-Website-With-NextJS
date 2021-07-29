import mongoose from "mongoose";

const connectDB = () => {
  try {
    mongoose.connect(process.env.MONGO_URI, {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database Connected successfully");
  } catch (error) {
    console.log("MongoDB Error------>", error);
  }
};

export default connectDB;
