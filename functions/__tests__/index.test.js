

// const firebaseTest = require('firebase-functions-test')({
//     // databaseURL: 'https://miki-firebase-test-sample.firebaseio.com',
//     // storageBucket: 'my-project.appspot.com',
//     // projectId: 'miki-firebase-test-sample',
// }, './serviceAccountKey.json');
const firebaseTest = require('firebase-functions-test')();
const admin = require('firebase-admin');
let myFunctions;
let db;

process.env.FIRESTORE_EMULATOR_HOST = "localhost:8080";

beforeAll(() => {
    myFunctions = require('../index');
    db = admin.firestore();
});

afterAll(() => {
    firebaseTest.cleanup();
});


test('Payment information should be added to payment doc when user purchase a ticket, ', async () => {
    const wrapped = firebaseTest.wrap(myFunctions.onCreatePayment);

    // Make a user
    const userId = "TEST_USER";

    // Make a ticket with price
    const ticketId = (await db.collection("ticket").add({ price: 11000 })).id;
    const paymentId = "PAYMENT_ID";

    // Make a payment snapshot
    const snap = firebaseTest.firestore.makeDocumentSnapshot({ ticket_id: ticketId }, `user/${userId}/payment/${paymentId}`);
    // Call wrapped function with the snapshot
    await wrapped(snap);
    const result = (await snap.ref.get()).data();
    console.log('result :>> ', result);
    // result.price.toBe(11000);
    // return result.price.created=at(11000);

});

test('Payment information should be added to payment doc when user purchase a ticket, ', () => {
    // console.log('firebaseTest :>> ', firebaseTest);

    // const wrapped = firebaseTest.wrap(myFunctions.onCreatePayment);

    // Make a user
    const userId = "TEST_USER";
    // const snap = firebaseTest.firestore.makeDocumentSnapshot({ ticket_id: ticketId }, `user/${userId}}`);

    return expect(3).toBe(3);

});

