import mongoose, { ConnectOptions } from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect('mongodb://192.168.1.107:27017/express-ts', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions); // Type assertion for Mongoose options
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err: unknown) { // Best practice for error typing
    if (err instanceof Error) {
      console.error(`Error: ${err.message}`);
    } else {
      console.error('An unknown error occurred');
    }
    process.exit(1);
  }
};

export default connectDB;
