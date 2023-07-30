import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI;

const connectToDB = async () => {
  const client = new MongoClient(uri, {
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    console.log("Connected to MongoDB successfully!");
    return client.db();
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    throw err;
  }
};

export { connectToDB };
