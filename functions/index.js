const functions = require("firebase-functions");
const admin = require("firebase-admin");
const stripe = require("stripe")("sk_test_51QoAMqLDm40RyVaMOPkCfIqhcBqWQYJXdVO2MQVkoVvY12NsDU7menbZdgIPxtO1q3bZKRx2fxx1MPL64d6Z2HJJ00RyEN2KEA"); // Make sure this is your TEST key!

admin.initializeApp();

exports.createCheckoutSession = functions.https.onCall(async (data, context) => {
    try {
        if (!context.auth) {
            throw new functions.https.HttpsError("unauthenticated", "User must be logged in");
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: "Fitness Training Plan",
                        },
                        unit_amount: 5000, // $50.00
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: "http://localhost:8223/success", // Change for production
            cancel_url: "http://localhost:8223/cancel",
        });

        return { sessionId: session.id };
    } catch (error) {
        console.error("Stripe Error:", error);
        throw new functions.https.HttpsError("internal", error.message);
    }
});
