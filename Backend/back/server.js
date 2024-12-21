// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const http = require('http');
// const multer = require('multer');
// const socketIO = require('socket.io');
// const SignupModel = require('./models/signupmodel');
// const EventModel = require('./models/Event');
// const BookingModel = require('./models//bookinghistrotymodel');

// const app = express();
// app.use(cors());
// app.use(express.json({ limit: '20mb' }));
// const URI = "mongodb+srv://test:test123@cluster0.yz6odl0.mongodb.net/innovatex?retryWrites=true&w=majority";
// mongoose.connect(URI);
// const connection = mongoose.connection;

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// const server = http.createServer(app);
// const io = socketIO(server, { origins: "*" });

// io.on('connection', (socket) => {

//   socket.on('new-event', (event) => {
//     io.emit('new-event-notification', event);
//   });

//   socket.on('new-dining', (dining) => {
//     io.emit('new-dining-notification', dining);
//   });
// });


// app.post('/signup', async (req, res) => {
//   const { username, firstName, lastName, email, password } = req.body;

//   try {
//     const existingUser = await SignupModel.findOne({ username });

//     if (existingUser) {
//       res.status(409).json({ error: 'Username already exist.' });
//     } else {
//       const newUser = await SignupModel.create({
//         username,
//         firstName,
//         lastName,
//         email,
//         password,
//       });

//       res.status(201).json({ message: 'User added successfully', user: newUser });
//     }
//   } catch (error) {
//     console.error('Error creating user:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });


// app.get('/api/signup/:username', async (req, res) => {
//     const { username } = req.params;
  
//     try {
//       const user = await SignupModel.findOne({ username });
  
//       if (user) {
//         res.json({
//           firstName: user.firstName,
//           lastName: user.lastName,
//           email: user.email,
//           username: user.username,
//           password: user.password, // Note: It's not recommended to send the password to the client
//         });
//       } else {
//         res.status(404).json({ error: 'User not found' });
//       }
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//       res.status(500).json({ error: 'internal Server Error' });
//     }
//   });
  
//   app.put('/api/signup/:username', async (req, res) => {
//     const { username } = req.params;
//     const updatedUserData = req.body;
  
//     try {
//       const updatedUser = await SignupModel.findOneAndUpdate(
//         { username },
//         { $set: updatedUserData },
//         { new: true }
//       );
  
//       if (updatedUser) {
//         console.log('User profile updated:', updatedUser);
//         res.json(updatedUser);
//       } else {
//         res.status(404).json({ error: 'User not found' });
//       }
//     } catch (error) {
//       console.error('Error updating user profile:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });
  
//   app.delete('/api/signup/:username', async (req, res) => {
//     const { username } = req.params;
  
//     try {
//       const deletedUser = await SignupModel.findOneAndDelete({ username });
  
//       if (deletedUser) {
//         console.log('User profile deleted:', deletedUser);
//         res.json({ message: 'User profile deleted successfully' });
//       } else {
//         res.status(404).json({ error: 'User not found' });
//       }
//     } catch (error) {
//       console.error('Error deleting user profile:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });
  

//   app.post('/login', (req, res) => {
//     const { username, password } = req.body;

//     SignupModel.findOne({ username })
//         .then(user => {
//             if (user) {
//                 if (user.password === password) {
//                     res.json('success');
//                 } else {
//                     res.json('Incorrect Username or Password');
//                 }
//             } else {
//                 if (!user) {
//                     res.json('User not found');
//                 } else {
//                     res.json('Incorrect Username or Password');
//                 }
//             }
//         }) 
//         .catch(err => res.json(err));
// });

// app.post('/api/event', async (req, res) => {
//   try {
//       const event = new EventModel(req.body);s
//       await event.save();
//       res.status(201).send({ message: 'Event booked successfully', event });
//   } catch (error) {
//       res.status(400).send({ message: 'Error booking event', error: error.message });
//   }
// });

// app.get('/api/events', async (req, res) => {
//   try {
//     const events = await EventModel.find();
//     res.json(events);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// app.post('/api/reservations', (req, res) => {
//   const {
//       name,
//       idNumber,
//       phoneNumber,
//       roomType,
//       checkIn,
//       checkOut,
//       username  // Include the username field in the request body
//   } = req.body;

//   BookingModel.create({
//       name,
//       idNumber,
//       phoneNumber,
//       roomType,
//       checkIn,
//       checkOut,
//       username  // Add the username to the reservation
//   })
//   .then(newReservation => {
//       console.log('Reservation created:', newReservation);
//       res.json({ message: 'Reservation created successfully', newReservation });
//   })
//   .catch(err => {
//       console.error('Error creating reservation:', err);
//       res.status(500).json({ error: 'Internal Server Error' });
//   });
// });


// app.get('/api/reservations', async (req, res) => {
//     try {
//       const existingReservations = await BookingModel.find();
//       res.json(existingReservations);
//     } catch (error) {
//       console.error('Error fetching existing reservations:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });
  

// // Update reservation by ID
// app.put('/api/reservations/:reservationId', async (req, res) => {
//     const { reservationId } = req.params;
//     const {
//         name,
//         idNumber,
//         phoneNumber,
//         roomType,
//         checkIn,
//         checkOut
//     } = req.body;

//     try {
//         const updatedReservation = await BookingModel.findByIdAndUpdate(
//             reservationId,
//             {
//                 name,
//                 idNumber,
//                 phoneNumber,
//                 roomType,
//                 checkIn,
//                 checkOut,
//             },
//             { new: true }
//         );

//         if (updatedReservation) {
//             console.log('Reservation updated:', updatedReservation);
//             res.json({message: 'Reservation Updated',updatedReservation});
//         } else {
//             res.status(404).json({ error: 'Reservation not found' });
//         }
//     } catch (error) {
//         console.error('Error updating reservation:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// // Delete reservation by ID
// app.delete('/api/reservations/:reservationId', async (req, res) => {
//     const { reservationId } = req.params;

//     try {
//         const deletedReservation = await BookingModel.findByIdAndDelete(reservationId);
//         if (deletedReservation) {
//             console.log('Reservation deleted successfully');
//             res.json({ message: 'Reservation deleted successfully' });
//         } else {
//             res.status(404).json({ error: 'Reservation not found' });
//         }
//     } catch (error) {
//         console.error('Error deleting reservation:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// // Find booking by ID number
// app.get('/api/reservations/:idNumber', async (req, res) => {
//   const { idNumber } = req.params;

//   try {
//       const bookings = await BookingModel.find({ idNumber });

//       if (bookings.length === 0) {
//           res.status(404).json({ message: 'No records available for the provided ID number' });
//       } else {
//           res.json(bookings);
//       }
//   } catch (error) {
//       console.error('Error finding reservations:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// app.get('/api/reservations/user/:username', async (req, res) => {
//   const { username } = req.params;

//   try {
//     const reservations = await BookingModel.find({ username });

//     if (reservations.length > 0) {
//       res.json(reservations);
//     } else {
//       res.status(404).json({ error: 'No reservations found for this user' });
//     }
//   } catch (error) {
//     console.error('Error fetching reservations:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// app.get('/api/events/user/:username', async (req, res) => {
//   const { username } = req.params;

//   try {
//     const events = await EventModel.find({ username });
//     if (events.length > 0) {
//       res.json(events);
//     } else {
//       res.status(404).json({ error: 'No events found for this user' });
//     }
//   } catch (error) {
//     console.error('Error fetching event bookings:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// const PORT = process.env.PORT || 3001;

// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const multer = require('multer');
const socketIO = require('socket.io');
const SignupModel = require('./models/signupmodel');
const EventModel = require('./models/Event');
const BookingModel = require('./models/bookinghistrotymodel'); // Fixed the path typo
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '20mb' }));
require('dotenv').config();
const URI = process.env.MONGO_URI;

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const server = http.createServer(app);
const io = socketIO(server, { cors: { origin: "*" } });

io.on('connection', (socket) => {
  socket.on('new-event', (event) => {
    io.emit('new-event-notification', event);
  });

  socket.on('new-dining', (dining) => {
    io.emit('new-dining-notification', dining);
  });
});

app.post('/signup', async (req, res) => {
  const { username, firstName, lastName, email, password } = req.body;

  try {
    const existingUser = await SignupModel.findOne({ username });

    if (existingUser) {
      res.status(409).json({ error: 'Username already exists.' });
    } else {
      const newUser = await SignupModel.create({
        username,
        firstName,
        lastName,
        email,
        password,
      });

      res.status(201).json({ message: 'User added successfully', user: newUser });
    }
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/signup/:username', async (req, res) => {
  const { username } = req.params;

  try {
    const user = await SignupModel.findOne({ username });

    if (user) {
      res.json({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
        password: user.password, // Note: It's not recommended to send the password to the client
      });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/api/signup/:username', async (req, res) => {
  const { username } = req.params;
  const updatedUserData = req.body;

  try {
    const updatedUser = await SignupModel.findOneAndUpdate(
      { username },
      { $set: updatedUserData },
      { new: true }
    );

    if (updatedUser) {
      console.log('User profile updated:', updatedUser);
      res.json(updatedUser);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/api/signup/:username', async (req, res) => {
  const { username } = req.params;

  try {
    const deletedUser = await SignupModel.findOneAndDelete({ username });

    if (deletedUser) {
      console.log('User profile deleted:', deletedUser);
      res.json({ message: 'User profile deleted successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error deleting user profile:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  SignupModel.findOne({ username })
    .then(user => {
      if (user) {
        if (user.password === password) {
          res.json('success');
        } else {
          res.json('Incorrect Username or Password');
        }
      } else {
        res.json('User not found');
      }
    })
    .catch(err => res.json(err));
});

app.post('/api/event', async (req, res) => {
  try {
    const event = new EventModel(req.body);
    await event.save();
    res.status(201).send({ message: 'Event booked successfully', event });
  } catch (error) {
    res.status(400).send({ message: 'Error booking event', error: error.message });
  }
});

app.get('/api/events', async (req, res) => {
  try {
    const events = await EventModel.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/reservations', (req, res) => {
  const {
    name,
    idNumber,
    phoneNumber,
    roomType,
    checkIn,
    checkOut,
    username  // Include the username field in the request body
  } = req.body;

  BookingModel.create({
    name,
    idNumber,
    phoneNumber,
    roomType,
    checkIn,
    checkOut,
    username  // Add the username to the reservation
  })
    .then(newReservation => {
      console.log('Reservation created:', newReservation);
      res.json({ message: 'Reservation created successfully', newReservation });
    })
    .catch(err => {
      console.error('Error creating reservation:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

app.get('/api/reservations', async (req, res) => {
  try {
    const existingReservations = await BookingModel.find();
    res.json(existingReservations);
  } catch (error) {
    console.error('Error fetching existing reservations:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/api/reservations/:reservationId', async (req, res) => {
  const { reservationId } = req.params;
  const {
    name,
    idNumber,
    phoneNumber,
    roomType,
    checkIn,
    checkOut
  } = req.body;

  try {
    const updatedReservation = await BookingModel.findByIdAndUpdate(
      reservationId,
      {
        name,
        idNumber,
        phoneNumber,
        roomType,
        checkIn,
        checkOut,
      },
      { new: true }
    );

    if (updatedReservation) {
      console.log('Reservation updated:', updatedReservation);
      res.json({ message: 'Reservation Updated', updatedReservation });
    } else {
      res.status(404).json({ error: 'Reservation not found' });
    }
  } catch (error) {
    console.error('Error updating reservation:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/api/reservations/:reservationId', async (req, res) => {
  const { reservationId } = req.params;

  try {
    const deletedReservation = await BookingModel.findByIdAndDelete(reservationId);
    if (deletedReservation) {
      console.log('Reservation deleted successfully');
      res.json({ message: 'Reservation deleted successfully' });
    } else {
      res.status(404).json({ error: 'Reservation not found' });
    }
  } catch (error) {
    console.error('Error deleting reservation:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/reservations/:idNumber', async (req, res) => {
  const { idNumber } = req.params;

  try {
    const bookings = await BookingModel.find({ idNumber });

    if (bookings.length === 0) {
      res.status(404).json({ message: 'No records available for the provided ID number' });
    } else {
      res.json(bookings);
    }
  } catch (error) {
    console.error('Error finding reservations:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/reservations/user/:username', async (req, res) => {
  const { username } = req.params;

  try {
    const reservations = await BookingModel.find({ username });

    if (reservations.length > 0) {
      res.json(reservations);
    } else {
      res.status(404).json({ error: 'No reservations found for this user' });
    }
  } catch (error) {
    console.error('Error fetching reservations:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/events/user/:username', async (req, res) => {
  const { username } = req.params;

  try {
    const events = await EventModel.find({ username });
    if (events.length > 0) {
      res.json(events);
    } else {
      res.status(404).json({ error: 'No events found for this user' });
    }
  } catch (error) {
    console.error('Error fetching event bookings:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update an event
app.put('/api/events/:eventId', async (req, res) => {
  const { eventId } = req.params;
  const {
    name,
    email,
    phone,
    eventType,
    guests,
    foodRequired,
    date,
    timeFrom,
    timeTo,
    paymentMethod
  } = req.body;

  try {
    const updatedEvent = await EventModel.findByIdAndUpdate(
      eventId,
      {
        name,
        email,
        phone,
        eventType,
        guests,
        foodRequired,
        date,
        timeFrom,
        timeTo,
        paymentMethod,
      },
      { new: true }
    );

    if (updatedEvent) {
      console.log('Event updated:', updatedEvent);
      res.json({ message: 'Event Updated', updatedEvent });
    } else {
      res.status(404).json({ error: 'Event not found' });
    }
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete an event
app.delete('/api/events/:eventId', async (req, res) => {
  const { eventId } = req.params;

  try {
    const deletedEvent = await EventModel.findByIdAndDelete(eventId);
    if (deletedEvent) {
      console.log('Event deleted successfully');
      res.json({ message: 'Event deleted successfully' });
    } else {
      res.status(404).json({ error: 'Event not found' });
    }
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});