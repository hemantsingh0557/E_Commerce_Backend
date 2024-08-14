
import mongoose from "mongoose";


const variationSchema = new mongoose.Schema({
    size: { type: String, enum: ['S', 'M', 'L', 'XL', '2XL', '3XL'] },
    color: { type: String },
    price: { type: Number },
    stock: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    image: { type: String } 
}, { _id: false });


const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String },
    variations: [variationSchema],
    rating: { type: Number },
    brandsName: { type: String },
    material: { type: String },
    inStock: { type: Boolean, default: true },
}, { timestamps: true });

productSchema.index({ name: 'text', description: 'text' });


const ProductModel = mongoose.model('Product', productSchema);

export { ProductModel };



















