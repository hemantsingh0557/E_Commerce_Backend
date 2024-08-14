
import mongoose from 'mongoose';
import { ESTIMATE_DAYS, ORDER_STATUS } from '../utils/constants';

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    totalAmount: { type: Number, required: true },
    shippingAddress: { type: mongoose.Schema.Types.ObjectId, ref: 'Address', required: true },
    paymentMethod: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment', required: true },
    orderDate: { type: Date, default: Date.now },
}, { timestamps: true });

export const OrderModel = mongoose.model('Order', orderSchema);




const orderItemSchema = new mongoose.Schema({
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    size: { type: String, required: true },
    color: { type: String, required: true },
    status: {  type: String, enum: ORDER_STATUS , default: 'Preparing for Shipment' },
    orderDate: { type: Date, default: Date.now },
    estimateDeliveryDate: { 
        type: Date, 
        default: function() { 
            const now = new Date(); 
            now.setDate(now.getDate() + ESTIMATE_DAYS); 
            return now; 
        } 
    },
    actualDeliveredDate: { type: Date }
}, { timestamps: true });

export const OrderItemModel = mongoose.model('OrderItem', orderItemSchema);















