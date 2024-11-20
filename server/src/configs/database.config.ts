import mongoose from "mongoose";

const user = Bun.env.MONGO_USER || 'your-username';
const password = Bun.env.MONGO_PASSWORD || 'your-password';
const db_name = Bun.env.MONGO_DB_NAME || 'tinner_app';

const url = `mongodb+srv://${user}:${password}@cluster0.e1mxj.mongodb.net/${db_name}?retryWrites=true&w=majority&appName=${db_name}`;


export const MongoDB = {
    connect: async function () {
        try {
            await mongoose.connect(url);
            console.log("----- 🪄   MongoDB connected -----");
        } catch (error) {
            console.error("----- MongoDB connection error🪄 -----", error);
            console.error("error: ", error);
        }
    }
};
