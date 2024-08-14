


import mongoose from "mongoose";



const addToCartSchema = new mongoose.Schema({
    userId : mongoose.Schema.Types.ObjectId ,
    productId : mongoose.Schema.Types.ObjectId ,
    productQuantity : {type : Number , min : 1 , max : 100 , required: true }
})


const AddToCartModel = new mongoose.model( "addToCart" , addToCartSchema ) ;


export {AddToCartModel} ;





















