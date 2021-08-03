const functions = require("firebase-functions");

const admin = require('firebase-admin');
admin.initializeApp();

exports.onCreateUser = functions.firestore.document('/users/{docId}').onCreate(async (snap, cxt) => {
    const docId = cxt.params.docId;

    const originalName = snap.data().name;
    const lowercaseName = originalName.toUpperCase();
    functions.logger.log('Set lowercase_name to ', docId, lowercaseName);

    await snap.ref.set({ lowercase_name: lowercaseName, created_at: firebase.getDate() }, { merge: true });

    const eventDocId = snap.ref.parents.collection("logs").add({ event: "createUser", created_at: firebase.getDate(), created_by: docId });
    functions.logger.log('Add event log ', eventDocId);
});
