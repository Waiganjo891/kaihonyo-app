import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    orderItems: [
        {
        name: {type: String, required: true},
        qty: {type: Number, required: true},
        image: {type: String, required: true},
        price: {type: Number, required: true},
        product: {type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product', required: true},
    },
],
paymentResult: {
    id: String,
    status: String,
    update_time: String,
    email_address: String,
  },
paymentMethod: { type: String, required: true },
itemsPrice: {type: Number, required: true},
totalPrice: {type: Number, required: true},
user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
seller: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
isPaid: {type: Boolean, default: false},
paidAt: {type: Date},
}, {
    timestamps: true,
});
const Order = mongoose.model("Order", orderSchema);
export default Order;