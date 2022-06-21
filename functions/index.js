const functions = require("firebase-functions");
const admin = require('firebase-admin')
//const db = require('../src/firebase.config')

admin.initializeApp(functions.config().admin)

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  response.send("Hello Keegan!");
});

//exports.aggregateReviewsOnDelete = functions.firestore.document().onDelete(async (change, context) =>)

exports.aggregateReviews = functions.firestore
  .document('/products/{productId}/reviews/{reviewId}')
  .onWrite(async (change, context) => {
    const { before, after } = change
    //const reviewVal = after.data().rating
    const productRef = admin.firestore().collection('products').doc(context.params.productId)

    // Update aggregations in a transaction
    await admin.firestore().runTransaction(async (transaction) => {
      const productDoc = await transaction.get(productRef);

      // Compute new number of ratings
      let newNumReviews = productDoc.data().numReviews;
      let reviewVal = null;
      if (after.exists && before.exists) {
        //update event
        // do nothing with numReviews
        console.log('update event')
        reviewVal = after.data().rating
      }
      else if (!after.exists) {
        //delete event
        console.log('delete event')
        newNumReviews -= 1;
        reviewVal = before.data().rating * (-1)
      } else {
        //add event
        console.log('add event')
        newNumReviews += 1
        reviewVal = after.data().rating
      }

      // Compute new average rating
      const oldReviewTotal = productDoc.data().avgRating * productDoc.data().numReviews;
      let newAvgRating = (oldReviewTotal + reviewVal) / (newNumReviews);
      if (isNaN(newAvgRating) || newAvgRating < 0) newAvgRating = 0;

      // Update product info
      transaction.update(productRef, {
        avgRating: newAvgRating,
        numReviews: newNumReviews
      });
    });
  })