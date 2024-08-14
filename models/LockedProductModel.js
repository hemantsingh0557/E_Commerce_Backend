


import mongoose from "mongoose";
import { LOCK_TIMEOUT } from "../utils/constants.js";
import { type } from "os";

const lockedProductSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    sessionId: { type: String, required: true }, 
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    productVariationId: { type: mongoose.Schema.Types.ObjectId, ref: "ProductVariations", required: true },
    quantity : { type: Number },
    lockedAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, default: function() {
        return Date.now() + LOCK_TIMEOUT * 1000; 
    }, expires: LOCK_TIMEOUT },
});




const LockedProductModel = mongoose.model("LockedProduct", lockedProductSchema);

export { LockedProductModel };












