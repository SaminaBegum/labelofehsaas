// const express = require("express");
// const router = express.Router();
// const Order = require("../models/Order");
// const nodemailer = require("nodemailer");

// // POST – SAVE ORDER
// router.post("/save-order", async (req, res) => {
//   try {
//     const orderData = req.body;

//     const newOrder = new Order(orderData);
//     await newOrder.save();

//     // SEND EMAIL
//     await sendOrderEmail(orderData);

//     res.json({ success: true, message: "Order stored successfully" });

//   } catch (err) {
//     console.log("Order Save Error:", err);
//     return res.status(500).json({ success: false, message: "Failed to save order" });
//   }
// });

// // EMAIL FUNCTION
// async function sendOrderEmail(order) {
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: "yourgmail@gmail.com",
//       pass: "app-password"
//     },
//   });

//   const mailOptions = {
//     from: "yourgmail@gmail.com",
//     to: order.email,
//     subject: "Your Order Confirmation",
//     html: `
//       <h2>Thank you for your order!</h2>
//       <p><b>Order ID:</b> ${order.orderId}</p>
//       <p><b>Amount:</b> ₹${order.amount}</p>
//       <p><b>Status:</b> ${order.paymentStatus}</p>
//     `,
//   };

//   await transporter.sendMail(mailOptions);
// }

// module.exports = router;
const express = require("express");

const router = express.Router();
const Order = require("../models/Order");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const Razorpay = require("razorpay");


// 🔥 RAZORPAY INSTANCE
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});


// ✅ CREATE ORDER (FIXES 404 ERROR)
router.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    const order = await razorpay.orders.create({
      amount: amount * 100, // convert ₹ to paise
      currency: "INR",
    });

    res.json(order);
  } catch (err) {
    console.log("Create Order Error:", err);
    res.status(500).json({ success: false });
  }
});


// ✅ VERIFY PAYMENT (CRITICAL FIX)
router.post("/verify-payment", (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const secret = process.env.RAZORPAY_KEY_SECRET;

    const generated_signature = crypto
      .createHmac("sha256", secret)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated_signature === razorpay_signature) {
      return res.json({ success: true });
    } else {
      return res.json({ success: false });
    }
  } catch (err) {
    console.log("Verification Error:", err);
    return res.status(500).json({ success: false });
  }
});


// ✅ SAVE ORDER (UPDATED SAFETY)
router.post("/save-order", async (req, res) => {
  try {
    const orderData = req.body;

    // 🔒 BASIC SAFETY CHECK
    if (
      orderData.paymentMethod === "razorpay" &&
      orderData.paymentStatus === "paid" &&
      !orderData.paymentId
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment data",
      });
    }

    const newOrder = new Order(orderData);
    await newOrder.save();

    // 📧 SEND EMAIL
    await sendOrderEmail(orderData);

    res.json({ success: true, message: "Order stored successfully" });

  } catch (err) {
    console.log("Order Save Error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to save order",
    });
  }
});


// 📧 EMAIL FUNCTION
async function sendOrderEmail(order) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "labelehsaas@gmail.com",
      pass: "qduxdqyydxyddusq", // 🔥 use Gmail App Password
    },
  });

  const mailOptions = {
    from: "labelehsaas@gmail.com",
    to: order.email,
    subject: "Your Order Confirmation",
    html: `
      <h2>Thank you for your order!</h2>
      <p><b>Order ID:</b> ${order.orderId || "N/A"}</p>
      <p><b>Amount:</b> ₹${order.amount}</p>
      <p><b>Status:</b> ${order.paymentStatus}</p>
    `,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = router;