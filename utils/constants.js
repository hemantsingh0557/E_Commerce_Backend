

export const SALT_ROUNDS = 10 ;


export const LOCK_TIMEOUT = 15 * 60 ; // 15 minutes // when user initiate checkout process and if abandons the process
export const TASK_EXECUTION_INTERVAL = 5 * 60 ; // 5 minutes // check after every 5 minutes if any stocks are locked after 15 minues after user initaite checout


export const ADMIN = 'Admin'  ;
export const REGULAR_USER = 'regularUser'  ;



export const ESTIMATE_DAYS = 7 ;

export const ORDER_STATUS = ['Preparing for Shipment', 'Dispatched', 'Out for Delivery', 'Delivered', 'Delivery Failed', 
    'Returned', 'Return Initiated', 'Return Confirmed', 'Exchange Initiated','Exchange Confirmed','Pickup Pending', 'Pickup Done', 
    'Exchanged', 'Cancelled', 'Refund Initiated', 'Refund Approved', 'Refund Processing', 'Refund Completed', 'Refund Failed' 
]



export const ERROR_TYPES = {
    DATA_NOT_FOUND: 'DATA_NOT_FOUND',
    BAD_REQUEST: 'BAD_REQUEST',
    MONGO_EXCEPTION: 'MONGO_EXCEPTION',
    ALREADY_EXISTS: 'ALREADY_EXISTS',
    FORBIDDEN: 'FORBIDDEN',
    INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
    UNAUTHORIZED: 'UNAUTHORIZED',
};







// export const RESPONSE_MESSAGE = {} ; 
// RESPONSE_MESSAGE.USER_EXIST = "Email or mobile number already exists" ;
// RESPONSE_MESSAGE.SIGNED_UP = "New user signed up successfully. Now please verify your OTP" ;
// RESPONSE_MESSAGE.USER_NOT_EXIST = "User does not exist " ;
// RESPONSE_MESSAGE.PASSWORD_MISMATCH = "Unauthorized access" ;
// RESPONSE_MESSAGE.VARIFY_OTP = "Please verify your OTP" ;
// RESPONSE_MESSAGE.SIGNED_IN = "User signed in successfully" ;
// RESPONSE_MESSAGE.PASSWORD_RESET = 'Password has been reset successfully.' ;









// export const OTP_MESSAGE = {} ;
// OTP_MESSAGE.FAILED_SAVE_OTP = "Otp can't be saved in DB" ;
// OTP_MESSAGE.OTP_SENT = "Otp sent successfully" ;
// OTP_MESSAGE.FAILED_EMAIL_OTP = "Failed to send OTP via email" ;
// OTP_MESSAGE.FAILED_MOBILE_NUMBER_OTP = "Failed to send OTP via mobile number" ;
// OTP_MESSAGE.EXPIRED_OTP = "OTP is expired or not found. Please try to resend the OTP" ;
// OTP_MESSAGE.INVALID_OTP = "Invalid OTP. Please enter the correct OTP" ;
// OTP_MESSAGE.VERIFEID_OTP = "OTP is verified successfully" ;











// export const ADD_TO_CART_MESSAGE = {} ;
// ADD_TO_CART_MESSAGE.ADD_SUCCESSFULLY = "Product added to cart successfully" ;
// ADD_TO_CART_MESSAGE.INSUFFICIENT_STOCK = "Insufficient stock for the requested quantity" ;
// ADD_TO_CART_MESSAGE.CART_UPDATED_SUCCESSFULLY = "Cart updated successfully" ;
// ADD_TO_CART_MESSAGE.CART_UPDATED_PARTIALLY = "Cart updated partially" ;
// ADD_TO_CART_MESSAGE.FAILED_TO_UPDATE_CART = "Failed to update cart" ;
// ADD_TO_CART_MESSAGE.ITEMS_SUCCESSFULLY_UPDATED = "items were successfully updated." ;
// ADD_TO_CART_MESSAGE.ITEMS_STOCK_ISSUES = "items had stock issues." ;

// ADD_TO_CART_MESSAGE.ITEM_NOT_FOUND = "item not found in the cart " ;
// ADD_TO_CART_MESSAGE.ITEM_REMOVED_SUCCESSFULLY = "item removed from the cart successfully " ;





// export const WISHLIST_MESSAGE = {} ;
// WISHLIST_MESSAGE.ADD_SUCCESSFULLY = 'Product added to wishlist successfully.' ;
// WISHLIST_MESSAGE.FAILED_TO_ADD = 'Failed to add product to wishlist.' ;
// WISHLIST_MESSAGE.NO_PRODUCT_IN_WISHLIST = 'No products found in wishlist.' ;
// WISHLIST_MESSAGE.PRODUCTS_FETCHED_SUCCESSFULLY = 'Products fetched successfully.' ;
// WISHLIST_MESSAGE.PRODUCT_DELETED_SUCCESSFULLY = 'Product removed from wishlist successfully.' ;
// WISHLIST_MESSAGE.FAILED_TO_FETCHED_PRODUCTS = 'Failed to fetch products.' ;
// WISHLIST_MESSAGE.FAILED_TO_DELETED_PRODUCTS = 'Failed to remove product from wishlist.' ;
// WISHLIST_MESSAGE.PRODUCT_NOT_FOUND = 'Product not found in wishlist.' ;
// WISHLIST_MESSAGE.PRODUCT_ALREADY_IN_WISHLIST = 'Product already in wishlist.' ;




// export const PRODUCTS_MESSAGE = {} ; 
// PRODUCTS_MESSAGE.PRODUCTS_SEARCH_SUCCESSFULLY = "Products search successfully" ;
// PRODUCTS_MESSAGE.NO_PRODUCTS_FOUND = "No products found " ;
// PRODUCTS_MESSAGE.PRODUCT_FETCHED = "Product details fetched successfully " ;








// export const CHECKOUT_MESSAGE = {} ; 
// CHECKOUT_MESSAGE.INITIATED_SUCCESSFULLY = "Checkout process initiated successfully." ;
// CHECKOUT_MESSAGE.PRODUCT_STOCK_ISSUE = "Insufficient stock for product." ;
// CHECKOUT_MESSAGE.STOCK_ISSUE = "One or more items are out of stock or not available." ;
// CHECKOUT_MESSAGE.ORDER_PLACED_SUCCESSFULLY = "Your order has been placed successfully." ;
// CHECKOUT_MESSAGE.FAILED_TO_PLACE_ORDER = "There was an error placing your order." ;
// CHECKOUT_MESSAGE.PRODUCT_RELEASED_SUCCESSFULLY = "Product stock has been released successfully." ;
// CHECKOUT_MESSAGE.FAILED_TO_RESTORE_PRODUCT = "Failed to restore the product." ;

// CHECKOUT_MESSAGE.PRODUCT_VARIATION_NOT_FOUND = "Product variation not found " ;
// CHECKOUT_MESSAGE.VARIATION_OUT_OF_STOCK = "Product variation is out of stock " ;








// export const ADDRESS_MESSAGE = {} ;
// ADDRESS_MESSAGE.ALREADY_EXIST = "Address already exists." ;
// ADDRESS_MESSAGE.ADDED_SUCCESSFULLY = "Address added successfully." ;
// ADDRESS_MESSAGE.NOT_EXIST = "Address not found." ;
// ADDRESS_MESSAGE.ADDRESS_UPDATED_SUCCESSFULLY = "Address updated successfully." ;
// ADDRESS_MESSAGE.ADDRESS_DELETED_SUCCESSFULLY = "Address deleted successfully." ;
// ADDRESS_MESSAGE.NO_ADDRESS_FOUND = "No address found for this user." ;
// ADDRESS_MESSAGE.FETCHED_ALL_ADDRESSES = "All addresses fetched successfully." ;
// ADDRESS_MESSAGE.USER_MUST_ADMIN = "User must be admin " ;







// export const ORDER_MESSAGE = {} ;
// ORDER_MESSAGE.FAILED_TO_GET_PRODUCT_DETAIL = 'can not find product details '
// ORDER_MESSAGE.SUCCESSFULLY_FETCHED_PRODUCT_DETAIL = 'Fetched product details successfully '
// ORDER_MESSAGE.ORDER_PLACED_SUCCESSFULLY = 'Order Placed Successfully'
// ORDER_MESSAGE.ORDER_NOT_FOUND = "No Order found for this user." ;
// ORDER_MESSAGE.ORDER_FETCHED_SUCCESSFULLY = "Order fetched successfully ." ;






// export const PAYMENT_MESSAGE = {} ;
// PAYMENT_MESSAGE.PAYMENT_SUCCESSFULLY = 'Payment successfull '
// PAYMENT_MESSAGE.PAYMENT_FAILD = 'Payment failed '







// export const ADMIN_ACTIVITY_MESSAGE = {};
// ADMIN_ACTIVITY_MESSAGE.FETCHED_PRODUCT_SUCCESSFULLY = 'Prodcut fetched successfully';
// ADMIN_ACTIVITY_MESSAGE.PRODUCT_DELETED_SUCCESSFULLY = 'Prodcut deleted successfully';
// ADMIN_ACTIVITY_MESSAGE.PRODUCT_ADDED_SUCCESSFULLY = 'Product added successfully';
// ADMIN_ACTIVITY_MESSAGE.FAILED_TO_ADD_PRODUCT = 'Failed to add product';
// ADMIN_ACTIVITY_MESSAGE.FAILED_TO_DELETE_PRODUCT = 'Failed to delete product';

// ADMIN_ACTIVITY_MESSAGE.SKU_ALREADY_EXISTS = 'SKU {sku} already exists'; // Keep this line
// ADMIN_ACTIVITY_MESSAGE.VARIATION_NOT_FOUND = 'Variation with SKU {sku} not found';

// ADMIN_ACTIVITY_MESSAGE.BASE_PRODUCT_UPDATED_SUCCESSFULLY = 'base product details updated successfully';
// ADMIN_ACTIVITY_MESSAGE.BASE_PRODUCT_NOT_FOUND = 'Base Product not found';
// ADMIN_ACTIVITY_MESSAGE.FAILED_TO_UPDATE_BASE_PRODUCT = 'Failed to update base product details ';


// ADMIN_ACTIVITY_MESSAGE.PRODUCT_VARIATION_NOT_FOUND = "Product variation not found." ;
// ADMIN_ACTIVITY_MESSAGE.FAILED_TO_UPDATE_PRODUCT_VARIATION = "Failed to update the product variation." ;
// ADMIN_ACTIVITY_MESSAGE.PRODUCT_VARIATION_UPDATED_SUCCESSFULLY = "Product variation updated successfully." ;


// ADMIN_ACTIVITY_MESSAGE.FAILED_TO_ADD_PRODUCT_VARIATION = "Failed to add the product variation." ; 
// ADMIN_ACTIVITY_MESSAGE.PRODUCT_VARIATION_ADDED_SUCCESSFULLY = "Product variation added successfully." ; 











// export const FILE_MESSAGE = { } ;
// FILE_MESSAGE.FILE_UPLOADED_SUCCESSFULLY = "Files uploaded successfully" ;
// FILE_MESSAGE.FAILED_TO_UPLOAD_FILE = "Failed to upload some files" ;
// FILE_MESSAGE.NO_FILES_PROVIDED = "No files provided" ;
// FILE_MESSAGE.ERROR_DURING_FILE_SAVE = "Error during file save" ;










