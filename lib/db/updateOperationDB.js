import { User, UserDetail, Account, FlightReview } from "./models";
import { auth } from "../auth";

async function updateUser({ email, image, name, emailVerified }) {
  const userId = (await auth()).user.id;

  const objToUpdate = {};

  if (email) {
    objToUpdate.email = email;
  }
  if (image) {
    objToUpdate.image = image;
  }
  if (name) {
    objToUpdate.name = name;
  }
  if (emailVerified) {
    objToUpdate.emailVerified = emailVerified;
  }

  return User.updateOne({ _id: userId }, objToUpdate);
}

async function updateUserDetails(updatedUserDetailsObj) {
  const userId = (await auth()).user.id;

  return UserDetail.updateOne({ userId }, updatedUserDetailsObj);
}

async function updateAccount(accountObj, userId) {
  return Account.updateOne({ userId }, accountObj);
}

async function updateFlightReview(filter = {}, updateDataObj = {}) {
  try {
    return await FlightReview.updateOne(filter, updateDataObj);
  } catch (error) {
    throw error;
  }
}
// async function updateFlightReview(updateData = {}, filter = {}) {
//   try {
//     return await FlightReview.updateOne(
//       { flightId: reviewObj.flightId },
//       { rating: reviewObj.rating, comment: reviewObj.comment }
//     );
//   } catch (error) {
//     throw error;
//   }
// }
export { updateUser, updateUserDetails, updateAccount, updateFlightReview };
