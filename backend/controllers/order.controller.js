const Order = require('../models/order.model');
const Cart = require('../models/cart.model');
const Product = require('../models/product.model').default;

// Helper to get user ID from decoded token
const getUserId = (req) => {
  return req.user.id || req.user._id;
};

// @desc    Create a new order from cart
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res) => {
  try {
    const userId = getUserId(req);
    const { address } = req.body;

    if (!address || !address.fullAddress || !address.city || !address.state || !address.pincode || !address.country) {
      return res.status(400).json({ message: 'Please provide full shipping address details' });
    }

    // 1. Fetch user's cart
    const cart = await Cart.findOne({ user: userId }).populate('items.product');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Your cart is empty' });
    }

    // 2. Verify stock and calculate total price
    let totalAmount = 0;
    const orderItems = [];

    for (const item of cart.items) {
      const product = item.product;
      if (!product) {
        return res.status(400).json({ message: 'One or more products in your cart are no longer available' });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for product: ${product.name}. Available: ${product.stock}, Requested: ${item.quantity}`
        });
      }

      // Use the actual current price of the product (or discount price if it exists)
      const currentPrice = product.discountPrice || product.price;
      totalAmount += currentPrice * item.quantity;

      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        priceAtTime: currentPrice
      });
    }

    // 3. Create the order
    const order = new Order({
      user: userId,
      items: orderItems,
      totalAmount,
      status: 'pending',
      paymentStatus: 'pending',
      address
    });

    const savedOrder = await order.save();

    // 4. Update product stock (decrement stock)
    for (const item of cart.items) {
      const product = await Product.findById(item.product._id);
      product.stock -= item.quantity;
      await product.save();
    }

    // 5. Clear the user's cart
    cart.items = [];
    await cart.save();

    // Populate the saved order with product details
    const populatedOrder = await Order.findById(savedOrder._id).populate('items.product');

    res.status(201).json(populatedOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Server error creating order' });
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders
// @access  Private
const getUserOrders = async (req, res) => {
  try {
    const userId = getUserId(req);
    const orders = await Order.find({ user: userId })
      .populate('items.product')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({ message: 'Server error fetching orders' });
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res) => {
  try {
    const userId = getUserId(req);
    const order = await Order.findById(req.params.id).populate('items.product');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Security check: Check if order belongs to the requesting user
    if (order.user.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'Access denied: You do not own this order' });
    }

    res.json(order);
  } catch (error) {
    console.error('Error fetching order by ID:', error);
    res.status(500).json({ message: 'Server error fetching order details' });
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private (Simplified to allow user or admin to update for testing)
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const allowedStatuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];

    if (!status || !allowedStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid or missing order status' });
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // If order is being cancelled, restore product stock
    if (status === 'cancelled' && order.status !== 'cancelled') {
      for (const item of order.items) {
        const product = await Product.findById(item.product);
        if (product) {
          product.stock += item.quantity;
          await product.save();
        }
      }
    }

    order.status = status;
    const updatedOrder = await order.save();

    const populatedOrder = await Order.findById(updatedOrder._id).populate('items.product');
    res.json(populatedOrder);
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Server error updating order status' });
  }
};

module.exports = {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus
};
