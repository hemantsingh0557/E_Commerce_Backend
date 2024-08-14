import { LockedProductModel } from "../models/LockedProductModel.js";
import { OrderItemModel, OrderModel } from "../models/OrderModel.js";
import { PaymentModel } from "../models/PaymentModel.js";
import { paymentService } from "./paymentService.js";

export const orderService = {};

orderService.getOrderSummary = async(userId, sessionId, addressId, paymentDetailsId) => {
    const getAllProducts = await LockedProductModel.aggregate([
        {
            $match: { userId: mongoose.Types.ObjectId(userId), sessionId },
        },
        {
            $lookup: {
                from: "products",
                localField: "productId",
                foreignField: "_id",
                as: "productDetails",
            },
        },
        {
            $unwind: { path: "$productDetails", preserveNullAndEmptyArrays: true },
        },
        {
            $lookup: {
                from: "productVariations",
                localField: "productVariationId",
                foreignField: "_id",
                as: "variationDetails",
            },
        },
        {
            $unwind: { path: "$variationDetails", preserveNullAndEmptyArrays: true },
        },
        {
            $project: {
                _id: 0,
                productId: 1,
                productVariationId: 1,
                quantity: 1,
                sessionId: 1,
                productDetails: {
                    _id: 1,
                    name: 1,
                    category: 1,
                },
                variationDetails: {
                    _id: 1,
                    price: 1,
                    color: 1,
                    size: 1,
                    stock: 1,
                    weight: 1,
                    capacity: 1,
                },
                totalPrice: { $multiply: ["$quantity", "$variationDetails.price"] },
            },
        },
        {
            $group: {
                _id: null,
                items: { $push: "$$ROOT" },
                subtotal: { $sum: "$totalPrice" },
            },
        },
        {
            $addFields: {
                totalItems: { $size: "$items" },
                totalPrice: { $sum: "$subtotal" },
            },
        },
    ]);

    const address = await AddressModel.findById(addressId);
    const paymentDetails = await PaymentModel.findById(paymentDetailsId);
    const discount = 0; // Assuming discount is applied later
    const totalAfterDiscount = getAllProducts.length ? getAllProducts[0].subtotal - discount : 0;

    return {
        items: getAllProducts.length ? getAllProducts[0].items : [],
        subtotal: getAllProducts.length ? getAllProducts[0].subtotal : 0,
        discount,
        totalAfterDiscount,
        totalItems: getAllProducts.length ? getAllProducts[0].totalItems : 0,
        address: address || null,
        paymentDetails: paymentDetails || null,
    };
};




function calculateTotalAmount(lockedProducts) {
    return lockedProducts.reduce((total, product) => total + (product.price * product.quantity), 0);
}



orderService.placeOrderInDb = async(userId, sessionId, addressId, paymentMethodId) => {
    const payment = await PaymentModel.findById(paymentMethodId);
    if (payment.paymentMethod !== "COD") {
        const paymentResult = await paymentService.processPayment(userId, sessionId, payment);
        if (!paymentResult.success) {
            return paymentResult;
        }
    }

    const lockedProducts = await LockedProductModel.find({ sessionId });
    const newOrder = new OrderModel({
        userId,
        totalAmount: calculateTotalAmount(lockedProducts),
        shippingAddress: addressId,
        paymentMethod: paymentMethodId,
    });
    await newOrder.save();

    const orderItems = lockedProducts.map((product) => new OrderItemModel({
        orderId: newOrder._id,
        userId,
        productId: product.productId,
        quantity: product.quantity,
        price: product.price,
        size: product.size,
        color: product.color,
    }));

    await OrderItemModel.insertMany(orderItems);
    await LockedProductModel.deleteMany({ sessionId });

    return { orderId: newOrder._id };
};

orderService.getAllOrdersDetailsFromDb = async(userId, page, limit) => {
    const getAllOrders = await OrderModel.find({ userId })
        .sort({ orderDate: -1 })
        .skip((page - 1) * limit)
        .limit(parseInt(limit))
        .populate("orderItems"); // Assuming orderItems is populated
    return getAllOrders;
};
