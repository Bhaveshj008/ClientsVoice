const mongoose = require('mongoose');
const Client = require('../models/ClientModel')
const FeedbackResponse = require('../models/FormResponses').FeedbackResponse;
const TestimonialResponse = require('../models/FormResponses').TestimonialResponse;
const FeedbackForm = require('../models/FeedbackFormConfig');
const TestimonialForm = require('../models/TestimonialFormConfig');
const Space = require('../models/spaceModel');

const deleteSpaceData = async (clientId, spaceID) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  const responseDetails = {};

  try {
    await Promise.all([
      Client.updateOne({ clientId }, { $pull: { spaces: spaceID } }, { session }),
      FeedbackResponse.deleteMany({ spaceId: spaceID }, { session }),
      TestimonialResponse.deleteMany({ spaceId: spaceID }, { session }),
      FeedbackForm.deleteMany({ spaceId: spaceID }, { session }),
      TestimonialForm.deleteMany({ spaceId: spaceID }, { session }),
      Space.findByIdAndDelete(spaceID, { session }),
    ]);

    await session.commitTransaction();
    session.endSession();
    return { message: 'Space and related data deleted successfully.' };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

module.exports = { deleteSpaceData };
