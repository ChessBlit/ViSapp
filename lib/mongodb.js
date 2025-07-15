import mongoose from "mongoose";

let isConnected = false;

export async function connectDB () {
    try {
        if (isConnected){
            return;
        }
    
        const db = await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "ViSapp"
        })
        isConnected = db.connections[0].readyState === 1
    } catch (error) {
        console.log("Error while connecting to DB", error);
        process.exit(1)
    }
}

export default connectDB;