const myFunctions = require('../index');

const test = require('firebase-functions-test')({
    databaseURL: 'https://my-project.firebaseio.com',
    storageBucket: 'my-project.appspot.com',
    projectId: 'my-project',
}, 'path/to/serviceAccountKey.json');


test('Payment information should be added to payment doc when user purchase a ticket, ', () => {
    const wrapped = test.wrap(myFunctions.onCreatePayment);

    // Make a user
    const userId = test.firestore.collection("user").add({ name: "test user" });
    // Make a ticket with price
    const ticketId = test.firestore.collection("ticket").add({ price: 11000 });

    // Make a payment snapshot
    const snap = test.firestore.makeDocumentSnapshot({ ticket_id: ticketId }, `user/${userId}/payment}`);
    // Call wrapped function with the snapshot
    wrapped(snap);

});
