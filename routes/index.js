

import { addToCardRoutes } from "./addToCartRoutes.js";
import { checkoutRoutes } from "./checkoutRoutes.js";
import { otpRoutes } from "./otpRoutes.js";
import { productRoutes } from "./productRoutes.js";
import { userRoutes } from "./userRoutes.js";
import { wishlistRoutes } from "./wishlistRoutes.js";


export const allRoutes = [ ...userRoutes ,  ...otpRoutes , ...productRoutes , ...wishlistRoutes , ...checkoutRoutes , ...addToCardRoutes  ] ; 



