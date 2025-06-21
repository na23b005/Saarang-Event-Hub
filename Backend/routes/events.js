const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Middleware to check auth
function auth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// Get all events
router.get('/', async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

// Register for event
router.post('/:id/register', auth, async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) return res.status(404).json({ error: 'Event not found' });
  if (event.registrations.includes(req.userId)) {
    return res.status(400).json({ error: 'Already registered' });
  }
  event.registrations.push(req.userId);
  await event.save();

  const user = await User.findById(req.userId);
  user.registeredEvents.push(event._id);
  await user.save();

  res.json({ message: 'Registered!' });
});

// Get my registrations
router.get('/my', auth, async (req, res) => {
  const user = await User.findById(req.userId).populate('registeredEvents');
  res.json(user.registeredEvents);
});

module.exports = router;
