const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const authenticate = require('../middleware/auth');

router.post('/create-checkout-session', authenticate, async (req, res) => {
  const { title, price, courseId ,description, instructor} = req.body;

  console.log('Body Received:', req.body);
  console.log('Title:', title);
  console.log('Price:', price);
  console.log('Course ID:', courseId);

  try {
    if (!title || !price || !courseId) {
      return res.status(400).json({ error: "Missing title, price, or courseId" });
    }

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
          price_data: {
            currency: 'inr',
            product_data: {
              name: title || 'LMS Course',
              description: `Instructor: ${instructor} | ${description}`,
            },
            unit_amount: Math.round(price),
          },
          quantity: 1,
        }],
        mode: 'payment',
        success_url: `http://localhost:3000/#!/payment-success?courseId=${courseId}`, // ✅ #! important
        cancel_url: `http://localhost:3000/#!/courses`,
      });
      

    res.json({ id: session.id });
  } catch (err) {
    console.error('❌ Stripe Session Error:', err);
    res.status(500).json({ error: 'Stripe session creation failed' });
  }
});

module.exports = router;
