
import Joi from "joi" ;
import { adminController } from "../controller/adminController.js";
import { ADMIN } from "../utils/constants.js";



export const adminRoutes = [
    {
        method : "get" ,
        path : "/getProductDetail/:productId" ,
        schema : {
            params : Joi.object({
                productId : Joi.string().length(24).hex().required() ,
            }),
        } ,
        auth : true ,
        roles : [ADMIN] ,
        controller : adminController.getProductDetail, 
    } ,
    {
        method: "post",
        path: "/addProduct",
        schema: {
            body: Joi.object({
                name: Joi.string().required(),
                description: Joi.string().optional(),
                category: Joi.string().required(),
                tags: Joi.array().items(Joi.string()).optional(),
                warranty: Joi.string().optional(),
                returnPolicy: Joi.string().optional(),
                brandsName: Joi.string().optional(),
                material: Joi.string().optional(),
                variations: Joi.array().items(Joi.object({
                    sku: Joi.string().required(),
                    size: Joi.string().valid("S", "M", "L", "XL", "2XL", "3XL").optional(),
                    weight: Joi.object({ value: Joi.number().required(), unit: Joi.string().valid("mg", "g", "kg").default("g") }).optional(),
                    capacity: Joi.object({ value: Joi.number().required(), unit: Joi.string().valid("ml", "l").default("ml") }).optional(),
                    color: Joi.string().optional(),
                    // material: Joi.string().optional(),
                    dimensions: Joi.object({
                        length: Joi.object({ value: Joi.number().required(), unit: Joi.string().valid("cm", "m").default("cm") }).optional(),
                        width: Joi.object({ value: Joi.number().required(), unit: Joi.string().valid("cm", "m").default("cm") }).optional(),
                        height: Joi.object({ value: Joi.number().required(), unit: Joi.string().valid("cm", "m").default("cm") }).optional(),
                    }).optional(),
                    price: Joi.number().required(),
                    stock: Joi.number().default(1),
                    discount: Joi.number().default(0),
                    images: Joi.array().items(Joi.string()).min(1).max(10).required(), 
                    inStock: Joi.boolean().default(true) ,
                })).min(1).required(), 
            }),
        },
        auth: true, 
        roles : [ADMIN] ,
        controller: adminController.addProduct,
    } ,
    {
        method: "put",
        path: "/updateBaseProductDetails/:productId",
        schema: {
            params: Joi.object({
                productId: Joi.string().length(24).hex().required(),
            }),
            body: Joi.object({
                name: Joi.string().optional(),
                description: Joi.string().optional(),
                category: Joi.string().optional(),
                tags: Joi.array().items(Joi.string()).optional(),
                warranty: Joi.string().optional(),
                returnPolicy: Joi.string().optional(),
                brandsName: Joi.string().optional(),
                material: Joi.string().optional(),
            }),
        },
        auth: true,
        roles : [ADMIN] ,
        controller: adminController.updateBaseProductDetails,
    },
    {
        method: "post",
        path: "/addProductVariation/:productId",
        schema: {
            params: Joi.object({
                productId: Joi.string().length(24).hex().required(),
            }),
            body: Joi.object({
                sku: Joi.string().optional(),
                size: Joi.string().valid("S", "M", "L", "XL", "2XL", "3XL").optional(),
                weight: Joi.object({ value: Joi.number().optional(), unit: Joi.string().valid("mg", "g", "kg").optional() }).optional(),
                capacity: Joi.object({ value: Joi.number().optional(), unit: Joi.string().valid("ml", "l").optional() }).optional(),
                color: Joi.string().optional(),
                // material: Joi.string().optional(),
                dimensions: Joi.object({
                    length: Joi.object({ value: Joi.number().optional(), unit: Joi.string().valid("cm", "m").optional() }).optional(),
                    width: Joi.object({ value: Joi.number().optional(), unit: Joi.string().valid("cm", "m").optional() }).optional(),
                    height: Joi.object({ value: Joi.number().optional(), unit: Joi.string().valid("cm", "m").optional() }).optional(),
                }).optional(),
                price: Joi.number().optional(),
                stock: Joi.number().optional(),
                discount: Joi.number().optional(),
                images: Joi.array().items(Joi.string()).min(1).max(10).required(), //  this is the array of images paths
                inStock: Joi.boolean().optional(),
            }),
        },
        auth: true,
        roles : [ADMIN] ,
        controller: adminController.addProductVariation,
    } ,    
    {
        method: "put",
        path: "/updateProductVariation/:productVariationId",
        schema: {
            params: Joi.object({
                productVariationId: Joi.string().length(24).hex().required(),
            }),
            body: Joi.object({
                sku: Joi.string().optional(),
                size: Joi.string().valid("S", "M", "L", "XL", "2XL", "3XL").optional(),
                weight: Joi.object({ value: Joi.number().optional(), unit: Joi.string().valid("mg", "g", "kg").optional() }).optional(),
                capacity: Joi.object({ value: Joi.number().optional(), unit: Joi.string().valid("ml", "l").optional() }).optional(),
                color: Joi.string().optional(),
                // material: Joi.string().optional(),
                dimensions: Joi.object({
                    length: Joi.object({ value: Joi.number().optional(), unit: Joi.string().valid("cm", "m").optional() }).optional(),
                    width: Joi.object({ value: Joi.number().optional(), unit: Joi.string().valid("cm", "m").optional() }).optional(),
                    height: Joi.object({ value: Joi.number().optional(), unit: Joi.string().valid("cm", "m").optional() }).optional(),
                }).optional(),
                price: Joi.number().optional(),
                stock: Joi.number().optional(),
                discount: Joi.number().optional(),
                images: Joi.array().items(Joi.string()).min(1).max(10).required(), //  this is the array of images paths
                inStock: Joi.boolean().optional(),
            }),
        },
        auth: true,
        roles : [ADMIN] ,
        controller: adminController.updateProductVariation,
    } ,    
    {
        method : "delete" ,
        path : "/deleteProduct/:productId" ,
        schema : {
            params : Joi.object({
                productId : Joi.string().length(24).hex().required() ,
            }),
        } ,
        auth : true ,
        roles : [ADMIN] ,
        controller : adminController.deleteProduct, 
    } ,
    {
        method : "delete" ,
        path : "/deleteProductVariation/:productVariationId" ,
        schema : {
            params : Joi.object({
                productVariationId : Joi.string().length(24).hex().required() ,
            }),
        } ,
        auth : true ,
        roles : [ADMIN] ,
        controller : adminController.deleteProductVariation, 
    } ,
];


 




























