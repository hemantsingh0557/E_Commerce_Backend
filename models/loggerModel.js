
import mongoose from "mongoose";





const loggerSchema = new mongoose.Schema({
    action: {
        type: Number, // HTTP status code 
        required: true,
    },
    message: {
        type: String, 
        required: true,
    },
 
});

const loggerModel = mongoose.model("Logger", loggerSchema);

export { loggerModel } ;  





