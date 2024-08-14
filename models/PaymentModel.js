
import mongoose from 'mongoose';



const PaymentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    paymentMethod: { type: String, required: true },
    paymentDetails: { type: String, required: true },
}, { timestamps: true });

export const PaymentModel = mongoose.model('Payment', PaymentSchema);





























