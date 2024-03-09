const Event = require('../models/Event');

module.exports = {
  async getAllEvents() {
    try {
      return await Event.find();
    } catch (error) {
      console.log('Error finding the events in the database', error);
      throw error;
    }
  },

  async checkIfEventAlreadyExists(eventPayload) {
    try {
      return await Event.exists(eventPayload);
    } catch (error) {
      console.log('Failed checking if the course already exists', error);
      throw error;
    }
  },

  async createNewEvent(eventPayload) {
    try {
      const eventDbInsertionObj = new Event(eventPayload);
      return await eventDbInsertionObj.save();
    } catch (error) {
      console.log('Failed creating the event due to error', error);
      throw error;
    }
  },

  async updateExistingEvent(eventId, updateEventPayload) {
    try {
      return await Event.findOneAndUpdate(
        { _id: eventId },
        updateEventPayload,
        { new: true }
      );
    } catch (error) {
      console.log('Failed updating the event', error);
      throw error;
    }
  },
  async isUserAlreadyRegistered(participantId) {
    try {
      return await Event.exists({ participants: { $in: [participantId] } });
    } catch (error) {
      console.log(
        'Failed checking the user if he is already registered',
        error
      );
      throw error;
    }
  },
  async registerParticipantForEvent(eventId, attendeeId) {
    try {
      return await Event.findOneAndUpdate(
        { _id: eventId },
        { $addToSet: { participants: attendeeId } },
        { new: true }
      );
    } catch (error) {
      console.log('Failed registering the participant for the event', error);
      throw error;
    }
  },
};
