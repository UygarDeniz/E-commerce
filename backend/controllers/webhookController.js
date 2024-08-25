import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export default async function webhook(req, res) {
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      req.headers['stripe-signature'],
      process.env.STRIPE_WEBHOOK
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    const order = await order.findOne({ paymentIntentId: paymentIntent.id });

    if (order) {
      console.log(`Payment for order ${order.id} was successful!`);
      order.isPaid = true;
      await order.save();
    } else {
      console.log(`No order found for payment intent ${paymentIntent.id}`);
    }
  }

  res.json({ received: true });
}
