


import mongoose from "mongoose";



const productSchema = new mongoose.Schema({
    productQuantity : {type : Number , min : 1 , max : 100 , required: true }
})


const ProductModel = new mongoose.model( "product" , productSchema ) ;


export {ProductModel} ;





















