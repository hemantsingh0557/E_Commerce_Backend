
import mongoose from "mongoose";

const productVariationsSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    sku: { type: String, unique: true, required: true },
    size: { type: String, enum: ['S', 'M', 'L', 'XL', '2XL', '3XL'] }, 
    weight: { value: { type: Number },  unit: { type: String, enum: ['mg', 'g', 'kg'], default: 'g' } },
    capacity: { value: { type: Number },  unit: { type: String, enum: ['ml', 'l'], default: 'ml' }  },
    color: { type: String }, 
    // material: { type: String }, 
    dimensions: {
        length: { value: { type: Number },  unit: { type: String, enum: ['cm', 'm'], default: 'cm' }  },
        width: { value: { type: Number },  unit: { type: String, enum: ['cm', 'm'], default: 'cm' } },
        height: { value: { type: Number },  unit: { type: String, enum: ['cm', 'm'], default: 'cm' } }
    },
    price: { type: Number, required: true },
    stock: { type: Number, default: 1 },
    discount: { type: Number, default: 0 },
    images: [{ type: String }],
    inStock: { type: Boolean, default: true },
} , { timestamps: true } );

const ProductVariationsModel = mongoose.model('ProductVariations', productVariationsSchema);
export { ProductVariationsModel };



const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    category: { type: String , required: true },
    tags: [{ type: String }],
    warranty: { type: String },
    returnPolicy: { type: String },
    brandsName: { type: String },
    material: { type: String },
}, { timestamps: true });

productSchema.index({ name: 'text', description: 'text' , tags : 'text' });

const ProductModel = mongoose.model('Product', productSchema);
export { ProductModel };





// import mongoose from "mongoose";


// const variationSchema = new mongoose.Schema({
//     size: { type: String, enum: ['S', 'M', 'L', 'XL', '2XL', '3XL'] },
//     color: { type: String },
//     price: { type: Number },
//     stock: { type: Number, default: 0 },
//     discount: { type: Number, default: 0 },
//     image: { type: String } 
// }, { _id: false });


// const productSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     category: { type: String },
//     variations: [variationSchema],
//     rating: { type: Number },
//     brandsName: { type: String },
//     material: { type: String },
//     inStock: { type: Boolean, default: true },
// }, { timestamps: true });

// productSchema.index({ name: 'text', description: 'text' });


// const ProductModel = mongoose.model('Product', productSchema);

// export { ProductModel };



















