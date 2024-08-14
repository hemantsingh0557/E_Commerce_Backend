

import { addressRoutes } from "./addressRoutes.js";
import { addToCardRoutes } from "./addToCartRoutes.js";
import { adminRoutes } from "./adminRoutes.js";
import { checkoutRoutes } from "./checkoutRoutes.js";
import { fileRoutes } from "./fileRoutes.js";
import { orderRoutes } from "./orderRoutes.js";
import { otpRoutes } from "./otpRoutes.js";
import { paymentRoutes } from "./paymentRoutes.js";
import { productRoutes } from "./productRoutes.js";
import { userRoutes } from "./userRoutes.js";
import { wishlistRoutes } from "./wishlistRoutes.js";


export const allRoutes = [ ...addressRoutes , ...addToCardRoutes , ...adminRoutes , ...checkoutRoutes , ...fileRoutes , ...orderRoutes , ...otpRoutes ,
    ...paymentRoutes , ...productRoutes , ...userRoutes , ...wishlistRoutes 
  ] ; 



