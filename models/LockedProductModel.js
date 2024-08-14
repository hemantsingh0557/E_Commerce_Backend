


import mongoose from 'mongoose';
import { LOCK_TIMEOUT } from '../utils/constants.js';

const lockedProductSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    quantity: { type: Number, required: true },
    size: { type: String, required: true },
    color: { type: String, required: true },
    lockedAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, default: function() { return Date.now() + LOCK_TIMEOUT * 1000 ; }, expires: LOCK_TIMEOUT } ,
});




const LockedProductModel = mongoose.model('LockedProduct', lockedProductSchema);

export { LockedProductModel };













