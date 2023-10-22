import mongoose from "mongoose";
const mongodb_uri = process.env.MONGODB_URI;
const connectToDb = async () => {
  try {
    const { connection } = await mongoose.connect(mongodb_uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    if (connection) {
      console.log(`connect to : ${connection.host}`);
    }
  } catch (error) {
    console.log(`Error : ${error.message}`);
    process.exit(1);
  }
};
export default connectToDb;
