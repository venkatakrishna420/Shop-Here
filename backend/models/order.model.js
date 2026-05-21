const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      },
      quantity: Number,
      priceAtTime: Number
    }
  ],
  totalAmount: Number,
  status: {
    type: String,
    enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
    default: "pending"
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed"],
    default: "pending"
  },
  address: {
    fullAddress: String,
    city: String,
    state: String,
    pincode: String,
    country: String
  }
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);