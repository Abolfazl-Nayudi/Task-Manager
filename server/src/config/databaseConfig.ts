import mongoose from 'mongoose';
const { DB_NAME, DB_URI } = process.env;

const connectDB = async () => {
  try {
    await mongoose.connect(`${DB_URI}/${DB_NAME}`);
    console.log('connected to db');
  } catch (error) {
    console.log('error connection to mongodb: ', error);
  }
};

export { connectDB };
