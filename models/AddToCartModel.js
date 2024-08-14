


import mongoose from "mongoose";



const addToCartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    productQuantity: { type: Number, min: 1, required: true },
    size: { type: String, enum: ['S', 'M', 'L', 'XL', '2XL', '3XL'], required: true },
    color: { type: String, required: true },
}, { timestamps: true });

const AddToCartModel = new mongoose.model( "addToCart" , addToCartSchema ) ;


export {AddToCartModel} ;





















