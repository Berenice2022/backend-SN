import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const url =
      'mongodb+srv://sistema_socialnetwork:SistemaSocialnetwork.2023@sistema.87gdufj.mongodb.net/?retryWrites=true&w=majority';
    //await mongoose.connect('mongodb://127.0.0.1/socialnetwork');
    await mongoose.connect(url);
    console.log('Connected database');
  } catch (error) {
    console.log(error);
  }
};
