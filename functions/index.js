const functions = require("firebase-functions");

const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

// if (location.hostname === "localhost") {
// db.useEmulator("localhost", 8080);
// }

exports.onCreateUser = functions.firestore.document('/user/{userId}').onCreate(async (snap, cxt) => {
    const userId = cxt.params.userId;
    const { name } = snap.data();

    // Get payment ticket price
    const lowerName = name.toLowerCase();

    functions.logger.log(`User make a payment user id:${userId} name:${name} lower name:${lowerName} `);

    await snap.ref.set({ created_at: admin.firestore.Timestamp.now().toDate(), lowerName }, { merge: true });
});


exports.onCreatePayment = functions.firestore.document('/user/{userId}/payment/{paymentId}').onCreate(async (snap, cxt) => {
    const userId = cxt.params.userId;
    const paymentId = cxt.params.paymentId;
    const ticketId = snap.data().ticket_id;

    // Get payment ticket price
    const price = (await db.collection("ticket").doc(ticketId).get()).data().price;

    functions.logger.log(`User make a payment user id:${userId} payment id:${paymentId} ticket id:${ticketId} ticket price:${price}`);

    await snap.ref.set({ created_at: admin.firestore.Timestamp.now().toDate(), price }, { merge: true });
});

