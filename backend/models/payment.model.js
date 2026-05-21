const paymentSchema = new mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order"
  },
  method: {
    type: String,
    enum: ["card", "upi", "cod"]
  },
  transactionId: String,
  status: {
    type: String,
    enum: ["pending", "success", "failed"]
  },
  paidAt: Date
}, { timestamps: true });

export default mongoose.model("Payment", paymentSchema);