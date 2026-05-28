const Payment = require('../models/payment.model');
const Order = require('../models/order.model');

// Helper to get user ID from decoded token
const getUserId = (req) => {
  return req.user.id || req.user._id;
};

// @desc    Simulate and process payment for an order
// @route   POST /api/payments/process
// @access  Private
const processPayment = async (req, res) => {
  try {
    const userId = getUserId(req);
    const { orderId, method, transactionId = `txn_${Date.now()}`, status = 'success' } = req.body;

    if (!orderId || !method) {
      return res.status(400).json({ message: 'Order ID and payment method are required' });
    }

    if (!['card', 'upi', 'cod'].includes(method)) {
      return res.status(400).json({ message: 'Invalid payment method' });
    }

    // 1. Fetch and verify the order
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Security check: Check if order belongs to the user
    if (order.user.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'Access denied: You do not own this order' });
    }

    if (order.paymentStatus === 'paid') {
      return res.status(400).json({ message: 'This order has already been paid' });
    }

    // 2. Create the Payment document
    const payment = new Payment({
      order: orderId,
      method,
      transactionId: method === 'cod' ? `cod_${Date.now()}` : transactionId,
      status: status === 'success' ? 'success' : 'failed',
      paidAt: status === 'success' ? new Date() : null
    });

    const savedPayment = await payment.save();

    // 3. Update Order payment status and general status
    if (status === 'success') {
      order.paymentStatus = 'paid';
      order.status = 'confirmed'; // confirm the order upon payment success
    } else {
      order.paymentStatus = 'failed';
    }

    const updatedOrder = await order.save();

    res.status(200).json({
      message: status === 'success' ? 'Payment processed successfully' : 'Payment failed',
      payment: savedPayment,
      order: updatedOrder
    });
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).json({ message: 'Server error processing payment' });
  }
};

module.exports = {
  processPayment
};
