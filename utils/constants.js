

export const LOCK_TIMEOUT = 15 * 60 ; // 15 minutes // when user initiate checkout process and if abandons the process
export const TASK_EXECUTION_INTERVAL = 5 * 60 ; // 15 minutes // when user initiate checkout process and if abandons the process



export const RESPONSE_MESSAGE = {} ; 

RESPONSE_MESSAGE.USER_EXIST = "Email or mobile number already exists" ;
RESPONSE_MESSAGE.SIGNED_UP = "New user signed up successfully. Now please verify your OTP" ;
RESPONSE_MESSAGE.USER_NOT_EXIST = "User does not exist " ;
RESPONSE_MESSAGE.PASSWORD_MISMATCH = "Unauthorized access" ;
RESPONSE_MESSAGE.VARIFY_OTP = "Please verify your OTP" ;
RESPONSE_MESSAGE.SIGNED_IN = "User signed in successfully" ;









export const OTP_MESSAGE = {} ;

OTP_MESSAGE.FAILED_SAVE_OTP = "Otp can't be saved in DB" ;
OTP_MESSAGE.OTP_SENT = "Otp sent successfully" ;
OTP_MESSAGE.FAILED_EMAIL_OTP = "Failed to send OTP via email" ;
OTP_MESSAGE.FAILED_MOBILE_NUMBER_OTP = "Failed to send OTP via mobile number" ;
OTP_MESSAGE.EXPIRED_OTP = "OTP is expired or not found. Please try to resend the OTP" ;
OTP_MESSAGE.INVALID_OTP = "Invalid OTP. Please enter the correct OTP" ;
OTP_MESSAGE.VERIFEID_OTP = "OTP is verified successfully" ;











export const ADD_TO_CART_MESSAGE = {} ;

ADD_TO_CART_MESSAGE.ADD_SUCCESSFULLY = "Product added to cart successfully" ;
ADD_TO_CART_MESSAGE.INSUFFICIENT_STOCK = "Insufficient stock for the requested quantity" ;
ADD_TO_CART_MESSAGE.CART_UPDATED_SUCCESSFULLY = "Cart updated successfully" ;
ADD_TO_CART_MESSAGE.CART_UPDATED_PARTIALLY = "Cart updated partially" ;
ADD_TO_CART_MESSAGE.FAILED_TO_UPDATE_CART = "Failed to update cart" ;
ADD_TO_CART_MESSAGE.ITEMS_SUCCESSFULLY_UPDATED = "items were successfully updated." ;
ADD_TO_CART_MESSAGE.ITEMS_STOCK_ISSUES = "items had stock issues." ;





export const WISHLIST_MESSAGE = {} ;

WISHLIST_MESSAGE.ADD_SUCCESSFULLY = "Product added to wishlist successfully" ;
WISHLIST_MESSAGE.FAILED_TO_ADD = "Failed to add to wishlist" ;
WISHLIST_MESSAGE.NO_PRODUCT_IN_WISHLIST = "there is no product in the wishlist " ;
WISHLIST_MESSAGE.PRODUCTS_FETCHED_SUCCESSFULLY = "successfully fetched all the products from wishlist " ;
WISHLIST_MESSAGE.FAILED_TO_FETCHED_PRODUCTS = "Some internal error during fetching the product from wishlist " ;
WISHLIST_MESSAGE.PRODUCT_NOT_FOUND = " product is not found " ;
WISHLIST_MESSAGE.PRODUCT_DELETED_SUCCESSFULLY = "Product is deleted from teh wishlist successfully " ;
WISHLIST_MESSAGE.FAILED_TO_DELETED_PRODUCTS = "Some internal error during deleting the product from wishlist " ;







export const PRODUCTS_MESSAGE = {} ; 

PRODUCTS_MESSAGE.PRODUCTS_SEARCH_SUCCESSFULLY = "Products search successfully" ;
PRODUCTS_MESSAGE.NO_PRODUCTS_FOUND = "No products found " ;
PRODUCTS_MESSAGE.PRODUCT_FETCHED = "Product details fetched successfully " ;










export const CHECKOUT_MESSAGE = {} ; 

CHECKOUT_MESSAGE.INITIATED_SUCCESSFULLY = "Checkout process initiated successfully." ;
CHECKOUT_MESSAGE.PRODUCT_STOCK_ISSUE = "Insufficient stock for product." ;
CHECKOUT_MESSAGE.STOCK_ISSUE = "One or more items are out of stock or not available." ;
CHECKOUT_MESSAGE.ORDER_PLACED_SUCCESSFULLY = "Your order has been placed successfully." ;
CHECKOUT_MESSAGE.FAILED_TO_PLACE_ORDER = "There was an error placing your order." ;
CHECKOUT_MESSAGE.PRODUCT_RELEASED_SUCCESSFULLY = "Product stock has been released successfully." ;
CHECKOUT_MESSAGE.FAILED_TO_RESTORE_PRODUCT = "Failed to restore the product." ;



export const ADDRESS_MESSAGE = {} ;
ADDRESS_MESSAGE.ALREADY_EXIST = "Address already exists." ;
ADDRESS_MESSAGE.ADDED_SUCCESSFULLY = "Address added successfully." ;
ADDRESS_MESSAGE.NOT_EXIST = "Address not found." ;
ADDRESS_MESSAGE.ADDRESS_UPDATED_SUCCESSFULLY = "Address updated successfully." ;
ADDRESS_MESSAGE.ADDRESS_DELETED_SUCCESSFULLY = "Address deleted successfully." ;
ADDRESS_MESSAGE.NO_ADDRESS_FOUND = "No address found for this user." ;
ADDRESS_MESSAGE.FETCHED_ALL_ADDRESSES = "All addresses fetched successfully." ;








