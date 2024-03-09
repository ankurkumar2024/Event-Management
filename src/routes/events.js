const { validateToken } = require('../middlewares/authMiddleware');
const { validateRole } = require('../utils/common');
const eventService = require('../services/events');
const validateInput = require('../middlewares/validateInput');
const {
  checkEventValidator,
  checkEventIdValidator,
  checkUpdateEventValidator,
} = require('../validators/events');
const sendEmail = require('../utils/email');

const events = require('express').Router();

events.post(
  '/',
  [checkEventValidator, validateInput, validateToken],
  async (req, res) => {
    //check if the user is allowed or not.
    await validateRole(req.user.role, ['organizer'], res);
    const isEventExists = await eventService.checkIfEventAlreadyExists(
      req.body
    );
    if (isEventExists) {
      res.status(200).send({
        status: true,
        message: 'same event already exists. Please check the details',
      });
    }
    const dbInsertionResponse = await eventService.createNewEvent(req.body);
    if (dbInsertionResponse._id) {
      res.status(201).send({
        status: true,
        message: 'Event created successfully',
      });
    }
  }
);

events.put(
  '/:id',
  [
    checkEventIdValidator,
    checkUpdateEventValidator,
    validateInput,
    validateToken,
  ],
  async (req, res) => {
    //only organizer make changes to the event
    await validateRole(req.user.role, ['organizer'], res);
    const updationResult = await eventService.updateExistingEvent(
      req.params.id,
      req.body
    );
    if (!updationResult) {
      res.status(404).send({
        status: false,
        message: `No event found having the id ${req.params.id}`,
      });
    } else {
      res.status(200).send({
        status: true,
        message: 'Event updated successfully',
      });
    }
  }
);

events.post(
  '/:id/register',
  [checkEventIdValidator, validateInput, validateToken],
  async (req, res) => {
    await validateRole(req.user.role, ['attendee'], res);
    if (req.user.role !== 'attendee') {
      return;
    }
    const isRegistered = await eventService.isUserAlreadyRegistered(
      req.user._id
    );
    if (isRegistered) {
      res.status(200).send({
        status: true,
        message: 'You are already registered for the event',
      });
    } else {
      const addParticipantResponse =
        await eventService.registerParticipantForEvent(
          req.params.id,
          req.user._id
        );
      if (addParticipantResponse) {
        res.status(200).send({
          status: true,
          message: 'You have been registered for the event',
        });
      }

      if (addParticipantResponse) {
        sendEmail(
          [req.user.email],
          'Event Registration Done',
          'You have been successfully registered for the event'
        );
      }
    }
  }
);
module.exports = events;
