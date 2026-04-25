import Razorpay from "razorpay";

export default async function handler(req, res) {
  console.log("Received amount from frontend:", req.body.amount); // 👉 ADDED

  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const { amount } = req.body;

  if (!amount) {
    return res.status(400).json({ error: "Amount is required" });
  }

  try {
    const order = await razorpay.orders.create({
      amount: amount * 100, // convert ₹ to paise
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    });

    res.status(200).json(order);
  } catch (err) {
    console.error("Razorpay Create Order Error:", err.message); // 👉 ADDED
    res.status(500).json({ error: err.message });
  }
}