import mongoose from "mongoose";




const wishListSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
}, { timestamps: true });

const WishListModel = mongoose.model("Wishlist", wishListSchema);

export { WishListModel };

















