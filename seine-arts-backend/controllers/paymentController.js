const paypal = require('@paypal/checkout-server-sdk');
const dotenv = require('dotenv');

dotenv.config();

// Configure PayPal Environment
let environment = new paypal.core.SandboxEnvironment(process.env.PAYPAL_CLIENT_ID, process.env.PAYPAL_SECRET); // Use Sandbox for testing, switch to `LiveEnvironment` for production
let client = new paypal.core.PayPalHttpClient(environment);

exports.processPayment = async (req, res) => {
  const { amount, currency } = req.body;

  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer("return=representation");
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: currency,
          value: amount,
        },
      },
    ],
  });

  try {
    const order = await client.execute(request);
    res.status(200).json({ id: order.result.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error processing payment", error });
  }
};

exports.capturePayment = async (req, res) => {
  const { orderID } = req.body;

  const request = new paypal.orders.OrdersCaptureRequest(orderID);
  request.requestBody({});

  try {
    const capture = await client.execute(request);
    res.status(200).json({ capture });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error capturing payment", error });
  }
};
