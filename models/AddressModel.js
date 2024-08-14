
import mongoose from 'mongoose';




const addressSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    street: { type: String, required: true },
    landMark : { type : String , required : false } ,
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
    addressType: { type: String, enum: ['home', 'work', 'other'], default: 'home' }, 
}, { timestamps: true });

const AddressModel = mongoose.model('Address', addressSchema);


export {AddressModel} ; 
















