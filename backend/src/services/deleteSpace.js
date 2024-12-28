const cloudinary = require('./cloudinaryConfig');  // Import Cloudinary configuration
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
    // Fetch space data to get the logo URL before deleting
    const space = await Space.findById(spaceID).session(session);
    
    // If logoUrl exists, delete it from Cloudinary
    if (space && space.logo) {
      const imageUrl = space.logo;
      
      if (typeof imageUrl === 'string' && imageUrl.trim() !== '') {
        console.log('Image URL:', imageUrl);  // Log the full URL for debugging
        
        // Extract the public ID (including folder path)
        const urlParts = imageUrl.split('/');
        const publicID = urlParts.slice(urlParts.length - 3, urlParts.length).join('/').split('.')[0];
        
        console.log('Extracted Public ID:', publicID);  // Log the extracted public ID
        
        // Delete the image from Cloudinary
        const cloudinaryResponse = await cloudinary.uploader.destroy(publicID);
        console.log('Cloudinary Response:', cloudinaryResponse);  // Log the response from Cloudinary
        
        if (cloudinaryResponse.result !== 'ok') {
          throw new Error('Failed to delete logo from Cloudinary');
        }
      }
    }

    // Delete related data from the database
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
