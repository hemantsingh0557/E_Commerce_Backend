

import { otpRoutes } from "./otpRoutes.js";
import { productRoutes } from "./productRoutes.js";
import { userRoutes } from "./userRoutes.js";


export const allRoutes = [ ...userRoutes ,  ...otpRoutes , ...productRoutes ] ; 



