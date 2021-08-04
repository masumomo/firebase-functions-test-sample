const functions = require("firebase-functions");

const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();


exports.onCreatePayment = functions.firestore.document('/users/{userId}/payment/{paymentId}').onCreate(async (snap, cxt) => {
    const userId = cxt.params.userId;
    const paymentId = cxt.params.paymentId;
    const ticketId = (await snap.get()).ticketId;

    // Get payment ticket price
    const price = (await db.collection("ticket").doc(ticketId).get()).price;

    functions.logger.log(`User make a payment user id:${userId} payment id:${paymentId} ticket id:${ticketId} ticket price:${price}`);

    await snap.ref.set({ created_at: firebase.getDate(), price }, { merge: true });
});

