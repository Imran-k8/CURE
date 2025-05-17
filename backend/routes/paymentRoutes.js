import express from 'express';
import Stripe from 'stripe';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/create-checkout-session', async (req, res) => {
    const { amount, email, metadata } = req.body;
  
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        customer_email: email,
        line_items: [
          {
            price_data: {
              currency: 'cad',
              product_data: {
                name: 'Research Submission Fee',
              },
              unit_amount: amount,
            },
            quantity: 1,
          },
        ],
        success_url: 'http://localhost:5173/payment-success?session_id={CHECKOUT_SESSION_ID}',
        cancel_url: 'http://localhost:5173/payment-cancel',
        metadata,
      });
  
      res.json({ url: session.url });
    } catch (err) {
      console.error('Stripe error:', err.message);
      res.status(500).json({ error: err.message });
    }
  });

router.get('/verify-checkout-session/:sessionId', async (req, res) => {
    try {
      const session = await stripe.checkout.sessions.retrieve(req.params.sessionId);
      res.json({ paid: session.payment_status === 'paid' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  

export default router;
