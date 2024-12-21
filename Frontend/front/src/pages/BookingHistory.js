// import React, { useState, useEffect } from 'react';
// import { Modal, Button,  } from 'react-bootstrap';
// import './BookingHistory.css';

// export default function BookingHistory() {
//   const [bookingHistory, setBookingHistory] = useState([]);
//   const [searchId, setSearchId] = useState('');
//   const [highlightedId, setHighlightedId] = useState(null);
//   const [editId, setEditId] = useState(null);
//   const [editedReservation, setEditedReservation] = useState({
//     name: '',
//     idNumber: '',
//     phoneNumber: '',
//     roomType: '',
//     checkIn: '',
//     checkOut: '',
//   });

//   const [showNotFoundModal, setShowNotFoundModal] = useState(false);

//   useEffect(() => {
//     const fetchBookingHistory = async () => {
//       try {
//         const response = await fetch('http://localhost:3001/api/reservations');
//         if (response.ok) {
//           const data = await response.json();
//           console.log('Fetched data:', data);
//           if (Array.isArray(data)) {
//             setBookingHistory(data);
//           } else {
//             console.error('Fetched data is not an array:', data);
//           }
//         } else {
//           console.error('Failed to fetch booking history');
//         }
//       } catch (error) {
//         console.error('Error fetching booking history:', error);
//       }
//     };
  
//     fetchBookingHistory();
//   }, []);

//   const handleDelete = async (reservationId) => {
//     try {
//       const response = await fetch(`http://localhost:3001/api/reservations/${reservationId}`, {
//         method: 'DELETE',
//       });

//       if (response.ok) {
//         setBookingHistory((prevHistory) => prevHistory.filter((reservation) => reservation._id !== reservationId));
//         console.log(`Reservation with ID ${reservationId} deleted successfully`);
//       } else {
//         console.error(`Failed to delete reservation with ID ${reservationId}`);
//       }
//     } catch (error) {
//       console.error('Error deleting reservation:', error);
//     }

//     setHighlightedId(null); 
//   };

//   const handleEdit = (reservationId) => {
//     setEditId(reservationId);
//     const reservationToEdit = bookingHistory.find((reservation) => reservation._id === reservationId);
//     setEditedReservation({
//       name: reservationToEdit.name,
//       idNumber: reservationToEdit.idNumber,
//       phoneNumber: reservationToEdit.phoneNumber,
//       roomType: reservationToEdit.roomType,
//       checkIn: reservationToEdit.checkIn,
//       checkOut: reservationToEdit.checkOut,
//     });

//     setHighlightedId(null); // Clear highlighted row after starting edit
//   };

//   const handleSave = async () => {
//     try {
//       const response = await fetch(`http://localhost:3001/api/reservations/${editId}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(editedReservation),
//       });

//       if (response.ok) {
//         console.log(`Reservation with ID ${editId} updated successfully`);
//         setEditId(null);
//         setHighlightedId(editId); // Highlight the edited row after saving
//       } else {
//         console.error(`Failed to update reservation with ID ${editId}`);
//       }
//     } catch (error) {
//       console.error('Error updating reservation:', error);
//     }
//   };

//   const handleCancelEdit = () => {
//     setEditId(null);

//     setHighlightedId(null);
//   };

//   const handleFindById = async () => {
//     try {
//       const response = await fetch(`http://localhost:3001/api/reservations/${searchId}`);
//       if (response.ok) {
//         const data = await response.json();
//         if (data.length > 0) {
//           console.log(`Reservations found for ID number ${searchId}:`, data);
//           setBookingHistory(data); // Update the displayed records to show only the searched record
//           setHighlightedId(data[0]._id); // Highlight the found row
//         } else {
//           console.error(`No reservations found for ID number ${searchId}`);
//           setHighlightedId(null);
//           setShowNotFoundModal(true); // Display the not found modal
//         }
//       } else {
//         console.error(`Failed to find reservations for ID number ${searchId}`);
//         setHighlightedId(null);
//         setShowNotFoundModal(true); // Display the not found modal
//       }
//     } catch (error) {
//       console.error('Error finding reservations:', error);
//       setHighlightedId(null);
//       setShowNotFoundModal(true); // Display the not found modal
//     }
//   };

//   const handleNotFoundModalClose = () => {
//     setShowNotFoundModal(false);
//   };

//   const handleSearchInputChange = (e) => {
//     setSearchId(e.target.value);

//     // Highlight the row if the searchId matches any reservation's idNumber
//     const foundReservation = bookingHistory.find((reservation) => reservation.idNumber === e.target.value);
//     if (foundReservation) {
//       setHighlightedId(foundReservation._id);
//     } else {
//       setHighlightedId(null);
//     }
//   };

//   return (
//     <div className='container-xl'>
//       <h1>Booking History</h1>
//       <div className="form-control sm-2 d-flex">
//         <input
//           type="text"
//           className="form-control"
//           placeholder="Search by ID Number"
//           value={searchId}
//           onChange={handleSearchInputChange}
//         />
//         <button
//           className="btn btn-secondary-search"
//           type="button"
//           onClick={handleFindById}
//         >
//           Search
//         </button>
//       </div>
//       <br />
//       <table className="table table-hover">
//         <thead>
//           <tr>
//             <th className='thead' scope="col">Name</th>
//             <th className='thead' scope="col">National ID</th>
//             <th className='thead' scope="col">Contact Number</th>
//             <th className='thead' scope="col">Room Type</th>
//             <th className='thead' scope="col">Check In</th>
//             <th className='thead' scope="col">Check Out</th>
//             <th className='thead' scope="col">Action</th>
//           </tr>
//         </thead>
//         <tbody className="table-group-divider">
//           {bookingHistory.map((reservation) => (
//             <tr key={reservation._id} className={highlightedId === reservation._id ? 'highlighted-row' : ''}>
//               <td>
//                 {editId === reservation._id ? (
//                   <input
//                     type="text"
//                     value={editedReservation.name}
//                     style={{ width: '100px' }}
//                     onChange={(e) => setEditedReservation({ ...editedReservation, name: e.target.value })}
//                   />
//                 ) : (
//                   reservation.name
//                 )}
//               </td>
//               <td>
//                 {editId === reservation._id ? (
//                   <input
//                     type="text"
//                     value={editedReservation.idNumber}
//                     style={{ width: '100px' }}
//                     onChange={(e) => setEditedReservation({ ...editedReservation, idNumber: e.target.value })}
//                   />
//                 ) : (
//                   reservation.idNumber
//                 )}
//               </td>
//               <td>
//                 {editId === reservation._id ? (
//                   <input
//                     type="text"
//                     value={editedReservation.phoneNumber}
//                     style={{ width: '100px' }}
//                     onChange={(e) => setEditedReservation({ ...editedReservation, phoneNumber: e.target.value })}
//                   />
//                 ) : (
//                   reservation.phoneNumber
//                 )}
//               </td>
//               <td>
//                 {editId === reservation._id ? (
//                   <input
//                     type="text"
//                     value={editedReservation.roomType}
//                     style={{ width: '100px' }}
//                     onChange={(e) => setEditedReservation({ ...editedReservation, roomType: e.target.value })}
//                   />
//                 ) : (
//                   reservation.roomType
//                 )}
//               </td>
//               <td>
//                 {editId === reservation._id ? (
//                   <input
//                     type="text"
//                     value={editedReservation.checkIn}
//                     style={{ width: '100px' }}
//                     onChange={(e) => setEditedReservation({ ...editedReservation, checkIn: e.target.value })}
//                   />
//                 ) : (
//                   reservation.checkIn
//                 )}
//               </td>
//               <td>
//                 {editId === reservation._id ? (
//                   <input
//                     type="text"
//                     value={editedReservation.checkOut}
//                     style={{ width: '100px' }}
//                     onChange={(e) => setEditedReservation({ ...editedReservation, checkOut: e.target.value })}
//                   />
//                 ) : (
//                   reservation.checkOut
//                 )}
//               </td>
//               <td>
//                 {editId === reservation._id ? (
//                   <>
//                     <button className='btn btn-success' onClick={handleSave}>
//                       Save
//                     </button>
//                     <button className='btn btn-danger' onClick={handleCancelEdit}>
//                       Cancel
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     <button className='btn btn-secondary1' id='booking-delete' onClick={() => handleDelete(reservation._id)}>
//                       Delete
//                     </button>
//                     <button className='btn btn-secondary2' id='booking-edit' onClick={() => handleEdit(reservation._id)}>
//                       Edit
//                     </button>
//                   </>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Bootstrap Modal for Not Found */}
//       <Modal show={showNotFoundModal} onHide={handleNotFoundModalClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>National ID Not Found</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <p>The National ID you entered was not found. Please check and try again.</p>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleNotFoundModalClose}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// }

// import React, { useState, useEffect } from 'react';
// import { Modal, Button } from 'react-bootstrap';
// import './BookingHistory.css';

// export default function BookingHistory() {
//   const [bookingHistory, setBookingHistory] = useState([]);
//   const [eventBookings, setEventBookings] = useState([]);
//   const [searchId, setSearchId] = useState('');
//   const [highlightedId, setHighlightedId] = useState(null);
//   const [editId, setEditId] = useState(null);
//   const [editedReservation, setEditedReservation] = useState({
//     name: '',
//     idNumber: '',
//     phoneNumber: '',
//     roomType: '',
//     checkIn: '',
//     checkOut: '',
//   });

//   const [showNotFoundModal, setShowNotFoundModal] = useState(false);

//   useEffect(() => {
//     const fetchBookingHistory = async () => {
//       try {
//         const response = await fetch('http://localhost:3001/api/reservations');
//         if (response.ok) {
//           const data = await response.json();
//           console.log('Fetched data:', data);
//           if (Array.isArray(data)) {
//             setBookingHistory(data);
//           } else {
//             console.error('Fetched data is not an array:', data);
//           }
//         } else {
//           console.error('Failed to fetch booking history');
//         }
//       } catch (error) {
//         console.error('Error fetching booking history:', error);
//       }
//     };

//     const fetchEventBookings = async () => {
//       try {
//         const response = await fetch('http://localhost:3001/api/events');
//         if (response.ok) {
//           const data = await response.json();
//           console.log('Fetched event bookings:', data);
//           if (Array.isArray(data)) {
//             setEventBookings(data);
//           } else {
//             console.error('Fetched event bookings data is not an array:', data);
//           }
//         } else {
//           console.error('Failed to fetch event bookings');
//         }
//       } catch (error) {
//         console.error('Error fetching event bookings:', error);
//       }
//     };

//     fetchBookingHistory();
//     fetchEventBookings();
//   }, []);

//   const handleDelete = async (reservationId) => {
//     try {
//       const response = await fetch(`http://localhost:3001/api/reservations/${reservationId}`, {
//         method: 'DELETE',
//       });

//       if (response.ok) {
//         setBookingHistory((prevHistory) => prevHistory.filter((reservation) => reservation._id !== reservationId));
//         console.log(`Reservation with ID ${reservationId} deleted successfully`);
//       } else {
//         console.error(`Failed to delete reservation with ID ${reservationId}`);
//       }
//     } catch (error) {
//       console.error('Error deleting reservation:', error);
//     }

//     setHighlightedId(null); 
//   };

//   const handleEdit = (reservationId) => {
//     setEditId(reservationId);
//     const reservationToEdit = bookingHistory.find((reservation) => reservation._id === reservationId);
//     setEditedReservation({
//       name: reservationToEdit.name,
//       idNumber: reservationToEdit.idNumber,
//       phoneNumber: reservationToEdit.phoneNumber,
//       roomType: reservationToEdit.roomType,
//       checkIn: reservationToEdit.checkIn,
//       checkOut: reservationToEdit.checkOut,
//     });

//     setHighlightedId(null); // Clear highlighted row after starting edit
//   };

//   const handleSave = async () => {
//     try {
//       const response = await fetch(`http://localhost:3001/api/reservations/${editId}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(editedReservation),
//       });

//       if (response.ok) {
//         console.log(`Reservation with ID ${editId} updated successfully`);
//         setEditId(null);
//         setHighlightedId(editId); // Highlight the edited row after saving
//       } else {
//         console.error(`Failed to update reservation with ID ${editId}`);
//       }
//     } catch (error) {
//       console.error('Error updating reservation:', error);
//     }
//   };

//   const handleCancelEdit = () => {
//     setEditId(null);
//     setHighlightedId(null);
//   };

//   const handleFindById = async () => {
//     try {
//       const response = await fetch(`http://localhost:3001/api/reservations/${searchId}`);
//       if (response.ok) {
//         const data = await response.json();
//         if (data.length > 0) {
//           console.log(`Reservations found for ID number ${searchId}:`, data);
//           setBookingHistory(data); // Update the displayed records to show only the searched record
//           setHighlightedId(data[0]._id); // Highlight the found row
//         } else {
//           console.error(`No reservations found for ID number ${searchId}`);
//           setHighlightedId(null);
//           setShowNotFoundModal(true); // Display the not found modal
//         }
//       } else {
//         console.error(`Failed to find reservations for ID number ${searchId}`);
//         setHighlightedId(null);
//         setShowNotFoundModal(true); // Display the not found modal
//       }
//     } catch (error) {
//       console.error('Error finding reservations:', error);
//       setHighlightedId(null);
//       setShowNotFoundModal(true); // Display the not found modal
//     }
//   };

//   const handleNotFoundModalClose = () => {
//     setShowNotFoundModal(false);
//   };

//   const handleSearchInputChange = (e) => {
//     setSearchId(e.target.value);

//     // Highlight the row if the searchId matches any reservation's idNumber
//     const foundReservation = bookingHistory.find((reservation) => reservation.idNumber === e.target.value);
//     if (foundReservation) {
//       setHighlightedId(foundReservation._id);
//     } else {
//       setHighlightedId(null);
//     }
//   };

//   return (
//     <div className='container-xl'>
//       <h1>Booking History</h1>
//       <div className="form-control sm-2 d-flex">
//         <input
//           type="text"
//           className="form-control"
//           placeholder="Search by ID Number"
//           value={searchId}
//           onChange={handleSearchInputChange}
//         />
//         <button
//           className="btn btn-secondary-search"
//           type="button"
//           onClick={handleFindById}
//         >
//           Search
//         </button>
//       </div>
//       <br />

//       {/* Table for Room Reservations */}
//       <h2>Room Reservations</h2>
//       <table className="table table-hover">
//         <thead>
//           <tr>
//             <th className='thead' scope="col">Name</th>
//             <th className='thead' scope="col">National ID</th>
//             <th className='thead' scope="col">Contact Number</th>
//             <th className='thead' scope="col">Room Type</th>
//             <th className='thead' scope="col">Check In</th>
//             <th className='thead' scope="col">Check Out</th>
//             <th className='thead' scope="col">Action</th>
//           </tr>
//         </thead>
//         <tbody className="table-group-divider">
//           {bookingHistory.map((reservation) => (
//             <tr key={reservation._id} className={highlightedId === reservation._id ? 'highlighted-row' : ''}>
//               <td>
//                 {editId === reservation._id ? (
//                   <input
//                     type="text"
//                     value={editedReservation.name}
//                     style={{ width: '100px' }}
//                     onChange={(e) => setEditedReservation({ ...editedReservation, name: e.target.value })}
//                   />
//                 ) : (
//                   reservation.name
//                 )}
//               </td>
//               <td>
//                 {editId === reservation._id ? (
//                   <input
//                     type="text"
//                     value={editedReservation.idNumber}
//                     style={{ width: '100px' }}
//                     onChange={(e) => setEditedReservation({ ...editedReservation, idNumber: e.target.value })}
//                   />
//                 ) : (
//                   reservation.idNumber
//                 )}
//               </td>
//               <td>
//                 {editId === reservation._id ? (
//                   <input
//                     type="text"
//                     value={editedReservation.phoneNumber}
//                     style={{ width: '100px' }}
//                     onChange={(e) => setEditedReservation({ ...editedReservation, phoneNumber: e.target.value })}
//                   />
//                 ) : (
//                   reservation.phoneNumber
//                 )}
//               </td>
//               <td>
//                 {editId === reservation._id ? (
//                   <input
//                     type="text"
//                     value={editedReservation.roomType}
//                     style={{ width: '100px' }}
//                     onChange={(e) => setEditedReservation({ ...editedReservation, roomType: e.target.value })}
//                   />
//                 ) : (
//                   reservation.roomType
//                 )}
//               </td>
//               <td>
//                 {editId === reservation._id ? (
//                   <input
//                     type="text"
//                     value={editedReservation.checkIn}
//                     style={{ width: '100px' }}
//                     onChange={(e) => setEditedReservation({ ...editedReservation, checkIn: e.target.value })}
//                   />
//                 ) : (
//                   reservation.checkIn
//                 )}
//               </td>
//               <td>
//                 {editId === reservation._id ? (
//                   <input
//                     type="text"
//                     value={editedReservation.checkOut}
//                     style={{ width: '100px' }}
//                     onChange={(e) => setEditedReservation({ ...editedReservation, checkOut: e.target.value })}
//                   />
//                 ) : (
//                   reservation.checkOut
//                 )}
//               </td>
//               <td>
//                 {editId === reservation._id ? (
//                   <>
//                     <button className='btn btn-success' onClick={handleSave}>
//                       Save
//                     </button>
//                     <button className='btn btn-danger' onClick={handleCancelEdit}>
//                       Cancel
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     <button className='btn btn-secondary1' id='booking-delete' onClick={() => handleDelete(reservation._id)}>
//                       Delete
//                     </button>
//                     <button className='btn btn-secondary2' id='booking-edit' onClick={() => handleEdit(reservation._id)}>
//                       Edit
//                     </button>
//                   </>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Table for Event Bookings */}
//       <h2>Event Bookings</h2>
//       <table className="table table-hover">
//         <thead>
//           <tr>
//             <th className='thead' scope="col">Name</th>
//             <th className='thead' scope="col">Email</th>
//             <th className='thead' scope="col">Phone Number</th>
//             <th className='thead' scope="col">Event Type</th>
//             <th className='thead' scope="col">Number of Guests</th>
//           </tr>
//         </thead>
//         <tbody className="table-group-divider">
//           {eventBookings.map((event) => (
//             <tr key={event._id}>
//               <td>{event.name}</td>
//               <td>{event.email}</td>
//               <td>{event.phone}</td>
//               <td>{event.eventType}</td>
//               <td>{event.guests}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Bootstrap Modal for Not Found */}
//       <Modal show={showNotFoundModal} onHide={handleNotFoundModalClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>National ID Not Found</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <p>The National ID you entered was not found. Please check and try again.</p>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleNotFoundModalClose}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './BookingHistory.css';

export default function BookingHistory() {
  const [bookingHistory, setBookingHistory] = useState([]);
  const [eventBookings, setEventBookings] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [highlightedId, setHighlightedId] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editedReservation, setEditedReservation] = useState({
    name: '',
    idNumber: '',
    phoneNumber: '',
    roomType: '',
    checkIn: '',
    checkOut: '',
  });
  const [editedEvent, setEditedEvent] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    guests: '',
    foodRequired: '',
    date: '',
    timeFrom: '',
    timeTo: '',
    paymentMethod: ''
  });
  const [showNotFoundModal, setShowNotFoundModal] = useState(false);

  useEffect(() => {
    fetchBookingHistory();
    fetchEventBookings();
  }, []);

  const fetchBookingHistory = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/reservations');
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched data:', data);
        if (Array.isArray(data)) {
          setBookingHistory(data);
        } else {
          console.error('Fetched data is not an array:', data);
        }
      } else {
        console.error('Failed to fetch booking history');
      }
    } catch (error) {
      console.error('Error fetching booking history:', error);
    }
  };

  const fetchEventBookings = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/events');
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched event bookings:', data);
        if (Array.isArray(data)) {
          setEventBookings(data);
        } else {
          console.error('Fetched event bookings data is not an array:', data);
        }
      } else {
        console.error('Failed to fetch event bookings');
      }
    } catch (error) {
      console.error('Error fetching event bookings:', error);
    }
  };

  const handleDelete = async (id, type) => {
    try {
      const url = type === 'room'
        ? `http://localhost:3001/api/reservations/${id}`
        : `http://localhost:3001/api/events/${id}`;

      const response = await fetch(url, {
        method: 'DELETE',
      });

      if (response.ok) {
        if (type === 'room') {
          setBookingHistory((prevHistory) => prevHistory.filter((reservation) => reservation._id !== id));
        } else {
          setEventBookings((prevHistory) => prevHistory.filter((event) => event._id !== id));
        }
        console.log(`Entry with ID ${id} deleted successfully`);
      } else {
        console.error(`Failed to delete entry with ID ${id}`);
      }
    } catch (error) {
      console.error(`Error deleting entry with ID ${id}:`, error);
    }

    setHighlightedId(null);
  };

  const handleEditRoom = (reservationId) => {
    setEditId(reservationId);
    const reservationToEdit = bookingHistory.find((reservation) => reservation._id === reservationId);
    setEditedReservation({
      name: reservationToEdit.name,
      idNumber: reservationToEdit.idNumber,
      phoneNumber: reservationToEdit.phoneNumber,
      roomType: reservationToEdit.roomType,
      checkIn: reservationToEdit.checkIn,
      checkOut: reservationToEdit.checkOut,
    });

    setHighlightedId(null); // Clear highlighted row after starting edit
  };

  const handleEditEvent = (eventId) => {
    setEditId(eventId);
    const eventToEdit = eventBookings.find((event) => event._id === eventId);
    if (eventToEdit) {
      setEditedEvent({
        name: eventToEdit.name || '',
        email: eventToEdit.email || '',
        phone: eventToEdit.phone || '',
        eventType: eventToEdit.eventType || '',
        guests: eventToEdit.guests || '',
        foodRequired: eventToEdit.foodRequired || '',
        date: eventToEdit.date ? eventToEdit.date.split('T')[0] : '', // Ensure date exists before splitting
        timeFrom: eventToEdit.timeFrom || '',
        timeTo: eventToEdit.timeTo || '',
        paymentMethod: eventToEdit.paymentMethod || ''
      });
    } else {
      console.error('Event to edit not found');
    }
  };

  const handleSaveRoom = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/reservations/${editId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedReservation),
      });

      if (response.ok) {
        console.log(`Reservation with ID ${editId} updated successfully`);
        setEditId(null);
        fetchBookingHistory(); // Refresh the booking history
      } else {
        console.error(`Failed to update reservation with ID ${editId}`);
      }
    } catch (error) {
      console.error('Error updating reservation:', error);
    }
  };

  const handleSaveEvent = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/events/${editId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedEvent),
      });

      if (response.ok) {
        console.log(`Event with ID ${editId} updated successfully`);
        setEditId(null);
        fetchEventBookings(); // Refresh the event bookings
      } else {
        console.error(`Failed to update event with ID ${editId}`);
      }
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditId(null);
  };

  const handleFindById = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/reservations/${searchId}`);
      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          console.log(`Reservations found for ID number ${searchId}:`, data);
          setBookingHistory(data); // Update the displayed records to show only the searched record
          setHighlightedId(data[0]._id); // Highlight the found row
        } else {
          console.error(`No reservations found for ID number ${searchId}`);
          setHighlightedId(null);
          setShowNotFoundModal(true); // Display the not found modal
        }
      } else {
        console.error(`Failed to find reservations for ID number ${searchId}`);
        setHighlightedId(null);
        setShowNotFoundModal(true); // Display the not found modal
      }
    } catch (error) {
      console.error('Error finding reservations:', error);
      setHighlightedId(null);
      setShowNotFoundModal(true); // Display the not found modal
    }
  };

  const handleNotFoundModalClose = () => {
    setShowNotFoundModal(false);
  };

  const handleSearchInputChange = (e) => {
    setSearchId(e.target.value);

    // Highlight the row if the searchId matches any reservation's idNumber
    const foundReservation = bookingHistory.find((reservation) => reservation.idNumber === e.target.value);
    if (foundReservation) {
      setHighlightedId(foundReservation._id);
    } else {
      setHighlightedId(null);
    }
  };

  return (
    <div className='container-bookinghistory-wrapper'>
      <div className="backimg-bookinghistory"></div>
      <div className='bookinghistory-conatiner'>
        <h1>Booking History</h1>
        <div className="search-bar">
          <input
            type="text"
            className="form-control"
            placeholder="Search by ID Number"
            value={searchId}
            onChange={handleSearchInputChange}
          />
          <button
            className="searchbtn"
            type="button"
            onClick={handleFindById}
          >
            Search
          </button>
        </div>
        <br />

        {/* Table for Room Reservations */}
        <h2>Room Reservations</h2>
        <table className="table table-hover">
          <thead>
            <tr>
              <th className='thead' scope="col">Name</th>
              <th className='thead' scope="col">National ID</th>
              <th className='thead' scope="col">Contact Number</th>
              <th className='thead' scope="col">Room Type</th>
              <th className='thead' scope="col">Check In</th>
              <th className='thead' scope="col">Check Out</th>
              <th className='thead' scope="col">Action</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {bookingHistory.map((reservation) => (
              <tr key={reservation._id} className={highlightedId === reservation._id ? 'highlighted-row' : ''}>
                <td>
                  {editId === reservation._id ? (
                    <input
                      type="text"
                      value={editedReservation.name}
                      style={{ width: '100px' }}
                      onChange={(e) => setEditedReservation({ ...editedReservation, name: e.target.value })}
                    />
                  ) : (
                    reservation.name
                  )}
                </td>
                <td>
                  {editId === reservation._id ? (
                    <input
                      type="text"
                      value={editedReservation.idNumber}
                      style={{ width: '100px' }}
                      onChange={(e) => setEditedReservation({ ...editedReservation, idNumber: e.target.value })}
                    />
                  ) : (
                    reservation.idNumber
                  )}
                </td>
                <td>
                  {editId === reservation._id ? (
                    <input
                      type="text"
                      value={editedReservation.phoneNumber}
                      style={{ width: '100px' }}
                      onChange={(e) => setEditedReservation({ ...editedReservation, phoneNumber: e.target.value })}
                    />
                  ) : (
                    reservation.phoneNumber
                  )}
                </td>
                <td>
                  {editId === reservation._id ? (
                    <input
                      type="text"
                      value={editedReservation.roomType}
                      style={{ width: '100px' }}
                      onChange={(e) => setEditedReservation({ ...editedReservation, roomType: e.target.value })}
                    />
                  ) : (
                    reservation.roomType
                  )}
                </td>
                <td>
                  {editId === reservation._id ? (
                    <input
                      type="text"
                      value={editedReservation.checkIn}
                      style={{ width: '100px' }}
                      onChange={(e) => setEditedReservation({ ...editedReservation, checkIn: e.target.value })}
                    />
                  ) : (
                    reservation.checkIn
                  )}
                </td>
                <td>
                  {editId === reservation._id ? (
                    <input
                      type="text"
                      value={editedReservation.checkOut}
                      style={{ width: '100px' }}
                      onChange={(e) => setEditedReservation({ ...editedReservation, checkOut: e.target.value })}
                    />
                  ) : (
                    reservation.checkOut
                  )}
                </td>
                <td>
                  {editId === reservation._id ? (
                    <>
                      <button className='btn btn-success' onClick={handleSaveRoom}>
                        Save
                      </button>
                      <button className='btn btn-danger' onClick={handleCancelEdit}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button className='btnedit' id='booking-edit' onClick={() => handleEditRoom(reservation._id)}>
                        Edit
                      </button>
                      <button className='btndelete' id='booking-delete' onClick={() => handleDelete(reservation._id, 'room')}>
                        Delete
                      </button>
                      
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Table for Event Bookings */}
        <h2>Event Bookings</h2>
        <table className="table table-hover">
          <thead>
            <tr>
              <th className='thead' scope="col">Name</th>
              <th className='thead' scope="col">Email</th>
              <th className='thead' scope="col">Phone Number</th>
              <th className='thead' scope="col">Event Type</th>
              <th className='thead' scope="col">Number of Guests</th>
              <th className='thead' scope="col">Food Required</th>
              <th className='thead' scope="col">Date</th>
              <th className='thead' scope="col">Time From</th>
              <th className='thead' scope="col">Time To</th>
              <th className='thead' scope="col">Payment Method</th>
              <th className='thead' scope="col">Actions</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {eventBookings.map((event) => (
              <tr key={event._id} className={highlightedId === event._id ? 'highlighted-row' : ''}>
                <td>{editId === event._id ? (
                    <input
                      type="text"
                      value={editedEvent.name}
                      style={{ width: '100px' }}
                      onChange={(e) => setEditedEvent({ ...editedEvent, name: e.target.value })}
                    />
                  ) : (
                    event.name
                  )}</td>
                <td>{editId === event._id ? (
                    <input
                      type="text"
                      value={editedEvent.email}
                      style={{ width: '100px' }}
                      onChange={(e) => setEditedEvent({ ...editedEvent, email: e.target.value })}
                    />
                  ) : (
                    event.email
                  )}</td>
                <td>{editId === event._id ? (
                    <input
                      type="text"
                      value={editedEvent.phone}
                      style={{ width: '100px' }}
                      onChange={(e) => setEditedEvent({ ...editedEvent, phone: e.target.value })}
                    />
                  ) : (
                    event.phone
                  )}</td>
                <td>{editId === event._id ? (
                    <input
                      type="text"
                      value={editedEvent.eventType}
                      style={{ width: '100px' }}
                      onChange={(e) => setEditedEvent({ ...editedEvent, eventType: e.target.value })}
                    />
                  ) : (
                    event.eventType
                  )}</td>
                <td>{editId === event._id ? (
                    <input
                      type="text"
                      value={editedEvent.guests}
                      style={{ width: '100px' }}
                      onChange={(e) => setEditedEvent({ ...editedEvent, guests: e.target.value })}
                    />
                  ) : (
                    event.guests
                  )}</td>
                <td>{editId === event._id ? (
                    <input
                      type="text"
                      value={editedEvent.foodRequired}
                      style={{ width: '100px' }}
                      onChange={(e) => setEditedEvent({ ...editedEvent, foodRequired: e.target.value })}
                    />
                  ) : (
                    event.foodRequired
                  )}</td>
                <td>{editId === event._id ? (
                    <input
                      type="date"
                      value={editedEvent.date}
                      style={{ width: '100px' }}
                      onChange={(e) => setEditedEvent({ ...editedEvent, date: e.target.value })}
                    />
                  ) : (
                    new Date(event.date).toLocaleDateString()
                  )}</td>
                <td>{editId === event._id ? (
                    <input
                      type="time"
                      value={editedEvent.timeFrom}
                      style={{ width: '100px' }}
                      onChange={(e) => setEditedEvent({ ...editedEvent, timeFrom: e.target.value })}
                    />
                  ) : (
                    event.timeFrom
                  )}</td>
                <td>{editId === event._id ? (
                    <input
                      type="time"
                      value={editedEvent.timeTo}
                      style={{ width: '100px' }}
                      onChange={(e) => setEditedEvent({ ...editedEvent, timeTo: e.target.value })}
                    />
                  ) : (
                    event.timeTo
                  )}</td>
                <td>{editId === event._id ? (
                    <input
                      type="text"
                      value={editedEvent.paymentMethod}
                      style={{ width: '100px' }}
                      onChange={(e) => setEditedEvent({ ...editedEvent, paymentMethod: e.target.value })}
                    />
                  ) : (
                    event.paymentMethod
                  )}</td>
                <td>
                  {editId === event._id ? (
                    <>
                      <button className='btn btn-success' onClick={handleSaveEvent}>
                        Save
                      </button>
                      <button className='btn btn-danger' onClick={handleCancelEdit}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button className='btnedit' id='booking-edit' onClick={() => handleEditEvent(event._id)}>
                        Edit
                      </button>
                      <button className='btndelete2' id='booking-delete' onClick={() => handleDelete(event._id, 'event')}>
                        Delete
                      </button>
                      
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Bootstrap Modal for Not Found */}
        <Modal show={showNotFoundModal} onHide={handleNotFoundModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>National ID Not Found</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>The National ID you entered was not found. Please check and try again.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleNotFoundModalClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
    
  );
}
