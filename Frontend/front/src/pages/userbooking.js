// import React, { useState, useEffect } from 'react';
// import { Modal, Button, Table, Form } from 'react-bootstrap';
// import './userbooking.css';

// export default function BookingHistory() {
//   const [bookingHistory, setBookingHistory] = useState([]);
//   const [editId, setEditId] = useState(null);
//   const [editedReservation, setEditedReservation] = useState({
//     name: '',
//     idNumber: '',
//     // phoneNumber: '',
//     roomType: '',
//     checkIn: '',
//     checkOut: '',
//   });
//   const [showNotFoundModal, setShowNotFoundModal] = useState(false);

//   const username = localStorage.getItem('username');  // Fetch the username from localStorage

//   useEffect(() => {
//     if (username) {
//       fetchBookingHistory(username);
//     }
//   }, [username]);

//   const fetchBookingHistory = async (username) => {
//     try {
//       const response = await fetch(`http://localhost:3001/api/reservations/user/${username}`);
//       if (response.ok) {
//         const data = await response.json();
//         console.log('Fetched data:', data);
//         if (Array.isArray(data)) {
//           setBookingHistory(data);
//         } else {
//           console.error('Fetched data is not an array:', data);
//         }
//       } else {
//         console.error('Failed to fetch booking history');
//       }
//     } catch (error) {
//       console.error('Error fetching booking history:', error);
//     }
//   };


//   const fetchEventHistory = async (username) => {
//     try {
//       const response = await fetch(`http://localhost:3001/api/event/user/${username}`);
//       if (response.ok) {
//         const data = await response.json();
//         console.log('Fetched data:', data);
//         if (Array.isArray(data)) {
//           setBookingHistory(data);
//         } else {
//           console.error('Fetched data is not an array:', data);
//         }
//       } else {
//         console.error('Failed to fetch booking history');
//       }
//     } catch (error) {
//       console.error('Error fetching booking history:', error);
//     }
//   };

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
//   };

//   const handleEdit = (reservationId) => {
//     setEditId(reservationId);
//     const reservationToEdit = bookingHistory.find((reservation) => reservation._id === reservationId);
//     setEditedReservation({
//       name: reservationToEdit.name,
//       idNumber: reservationToEdit.idNumber,
//       phoneNumber: reservationToEdit.phoneNumber,
//       roomType: reservationToEdit.roomType,
//       checkIn: reservationToEdit.checkIn.split('T')[0], // Format date correctly
//       checkOut: reservationToEdit.checkOut.split('T')[0], // Format date correctly
//     });
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
//         fetchBookingHistory(username); // Refresh the booking history
//       } else {
//         console.error(`Failed to update reservation with ID ${editId}`);
//       }
//     } catch (error) {
//       console.error('Error updating reservation:', error);
//     }
//   };

//   const handleCancelEdit = () => {
//     setEditId(null);
//   };

//   const handleNotFoundModalClose = () => {
//     setShowNotFoundModal(false);
//   };

//   return (
//     <div className="container">
//       <h1>My bookings</h1>
//       {bookingHistory.length > 0 ? (
//         <Table striped bordered hover>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>ID Number</th>
//               <th>Phone Number</th>
//               <th>Room Type</th>
//               <th>Check-In Date</th>
//               <th>Check-Out Date</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {bookingHistory.map((reservation) => (
//               <tr key={reservation._id}>
//                 <td>{reservation.name}</td>
//                 <td>{reservation.idNumber}</td>
//                 <td>{reservation.phoneNumber}</td>
//                 <td>{reservation.roomType}</td>
//                 <td>{new Date(reservation.checkIn).toLocaleDateString()}</td>
//                 <td>{new Date(reservation.checkOut).toLocaleDateString()}</td>
//                 <td>
//                   {editId === reservation._id ? (
//                     <>
//                       <Form.Group controlId={`checkIn-${reservation._id}`}>
//                         <Form.Label>Check-In Date</Form.Label>
//                         <Form.Control
//                           type="date"
//                           name="checkIn"
//                           value={editedReservation.checkIn}
//                           onChange={(e) => setEditedReservation({ ...editedReservation, checkIn: e.target.value })}
//                         />
//                       </Form.Group>
//                       <Form.Group controlId={`checkOut-${reservation._id}`}>
//                         <Form.Label>Check-Out Date</Form.Label>
//                         <Form.Control
//                           type="date"
//                           name="checkOut"
//                           value={editedReservation.checkOut}
//                           onChange={(e) => setEditedReservation({ ...editedReservation, checkOut: e.target.value })}
//                         />
//                       </Form.Group>
//                       <Button className="btn-success" onClick={handleSave}>Save</Button>
//                       <Button className="btn-danger" onClick={handleCancelEdit}>Cancel</Button>
//                     </>
//                   ) : (
//                     <>
//                       <Button className="btn-warning" onClick={() => handleEdit(reservation._id)}>Edit Dates</Button>
//                       <Button className="btn-danger" onClick={() => handleDelete(reservation._id)}>Delete</Button>
//                     </>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       ) : (
//         <p>No bookings found.</p>
//       )}

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
// import { Modal, Button, Table, Form } from 'react-bootstrap';
// import './userbooking.css';

// export default function BookingHistory() {
//   const [roomBookings, setRoomBookings] = useState([]);
//   const [eventBookings, setEventBookings] = useState([]);
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

//   const username = localStorage.getItem('username');  // Fetch the username from localStorage

//   useEffect(() => {
//     if (username) {
//       fetchRoomBookings(username);
//       fetchEventBookings(username);
//     }
//   }, [username]);

//   const fetchRoomBookings = async (username) => {
//     try {
//       const response = await fetch(`http://localhost:3001/api/reservations/user/${username}`);
//       if (response.ok) {
//         const data = await response.json();
//         console.log('Fetched room bookings:', data);
//         if (Array.isArray(data)) {
//           setRoomBookings(data);
//         } else {
//           console.error('Fetched data is not an array:', data);
//         }
//       } else {
//         console.error('Failed to fetch room bookings');
//       }
//     } catch (error) {
//       console.error('Error fetching room bookings:', error);
//     }
//   };

//   const fetchEventBookings = async (username) => {
//     try {
//       const response = await fetch(`http://localhost:3001/api/events/user/${username}`);
//       if (response.ok) {
//         const data = await response.json();
//         console.log('Fetched event bookings:', data);
//         if (Array.isArray(data)) {
//           setEventBookings(data);
//         } else {
//           console.error('Fetched data is not an array:', data);
//         }
//       } else {
//         console.error('Failed to fetch event bookings');
//       }
//     } catch (error) {
//       console.error('Error fetching event bookings:', error);
//     }
//   };

//   const handleDelete = async (reservationId) => {
//     try {
//       const response = await fetch(`http://localhost:3001/api/reservations/${reservationId}`, {
//         method: 'DELETE',
//       });

//       if (response.ok) {
//         setRoomBookings((prevHistory) => prevHistory.filter((reservation) => reservation._id !== reservationId));
//         console.log(`Reservation with ID ${reservationId} deleted successfully`);
//       } else {
//         console.error(`Failed to delete reservation with ID ${reservationId}`);
//       }
//     } catch (error) {
//       console.error('Error deleting reservation:', error);
//     }
//   };

//   const handleEdit = (reservationId) => {
//     setEditId(reservationId);
//     const reservationToEdit = roomBookings.find((reservation) => reservation._id === reservationId);
//     setEditedReservation({
//       name: reservationToEdit.name,
//       idNumber: reservationToEdit.idNumber,
//       phoneNumber: reservationToEdit.phoneNumber,
//       roomType: reservationToEdit.roomType,
//       checkIn: reservationToEdit.checkIn.split('T')[0], // Format date correctly
//       checkOut: reservationToEdit.checkOut.split('T')[0], // Format date correctly
//     });
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
//         fetchRoomBookings(username); // Refresh the booking history
//       } else {
//         console.error(`Failed to update reservation with ID ${editId}`);
//       }
//     } catch (error) {
//       console.error('Error updating reservation:', error);
//     }
//   };

//   const handleCancelEdit = () => {
//     setEditId(null);
//   };

//   const handleNotFoundModalClose = () => {
//     setShowNotFoundModal(false);
//   };

//   return (
//     <div className="container">
//       <h1>My Bookings</h1>

//       <h2>Room Reservations</h2>
//       {roomBookings.length > 0 ? (
//         <Table striped bordered hover>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>ID Number</th>
//               <th>Phone Number</th>
//               <th>Room Type</th>
//               <th>Check-In Date</th>
//               <th>Check-Out Date</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {roomBookings.map((reservation) => (
//               <tr key={reservation._id}>
//                 <td>{reservation.name}</td>
//                 <td>{reservation.idNumber}</td>
//                 <td>{reservation.phoneNumber}</td>
//                 <td>{reservation.roomType}</td>
//                 <td>{new Date(reservation.checkIn).toLocaleDateString()}</td>
//                 <td>{new Date(reservation.checkOut).toLocaleDateString()}</td>
//                 <td>
//                   {editId === reservation._id ? (
//                     <>
//                       <Form.Group controlId={`checkIn-${reservation._id}`}>
//                         <Form.Label>Check-In Date</Form.Label>
//                         <Form.Control
//                           type="date"
//                           name="checkIn"
//                           value={editedReservation.checkIn}
//                           onChange={(e) => setEditedReservation({ ...editedReservation, checkIn: e.target.value })}
//                         />
//                       </Form.Group>
//                       <Form.Group controlId={`checkOut-${reservation._id}`}>
//                         <Form.Label>Check-Out Date</Form.Label>
//                         <Form.Control
//                           type="date"
//                           name="checkOut"
//                           value={editedReservation.checkOut}
//                           onChange={(e) => setEditedReservation({ ...editedReservation, checkOut: e.target.value })}
//                         />
//                       </Form.Group>
//                       <Button className="btn-success" onClick={handleSave}>Save</Button>
//                       <Button className="btn-danger" onClick={handleCancelEdit}>Cancel</Button>
//                     </>
//                   ) : (
//                     <>
//                       <Button className="btn-warning" onClick={() => handleEdit(reservation._id)}>Edit Dates</Button>
//                       <Button className="btn-danger" onClick={() => handleDelete(reservation._id)}>Delete</Button>
//                     </>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       ) : (
//         <p>No room bookings found.</p>
//       )}

//       <h2>Event Bookings</h2>
//       {eventBookings.length > 0 ? (
//         <Table striped bordered hover>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Phone Number</th>
//               <th>Event Type</th>
//               <th>Number of Guests</th>
//             </tr>
//           </thead>
//           <tbody>
//             {eventBookings.map((event) => (
//               <tr key={event._id}>
//                 <td>{event.name}</td>
//                 <td>{event.email}</td>
//                 <td>{event.phone}</td>
//                 <td>{event.eventType}</td>
//                 <td>{event.guests}</td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       ) : (
//         <p>No event bookings found.</p>
//       )}

//       <Modal show={showNotFoundModal} onHide={handleNotFoundModalClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Not Found</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <p>The information you entered was not found. Please check and try again.</p>
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
// import { Modal, Button, Table, Form } from 'react-bootstrap';
// import './userbooking.css';

// export default function BookingHistory() {
//   const [roomBookings, setRoomBookings] = useState([]);
//   const [eventBookings, setEventBookings] = useState([]);
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

//   const username = localStorage.getItem('username');  // Fetch the username from localStorage

//   useEffect(() => {
//     if (username) {
//       fetchRoomBookings(username);
//       fetchEventBookings(username);
//     }
//   }, [username]);

//   const fetchRoomBookings = async (username) => {
//     try {
//       const response = await fetch(`http://localhost:3001/api/reservations/user/${username}`);
//       if (response.ok) {
//         const data = await response.json();
//         console.log('Fetched room bookings:', data);
//         if (Array.isArray(data)) {
//           setRoomBookings(data);
//         } else {
//           console.error('Fetched data is not an array:', data);
//         }
//       } else {
//         console.error('Failed to fetch room bookings');
//       }
//     } catch (error) {
//       console.error('Error fetching room bookings:', error);
//     }
//   };

//   const fetchEventBookings = async (username) => {
//     try {
//       const response = await fetch(`http://localhost:3001/api/events/user/${username}`);
//       if (response.ok) {
//         const data = await response.json();
//         console.log('Fetched event bookings:', data);
//         if (Array.isArray(data)) {
//           setEventBookings(data);
//         } else {
//           console.error('Fetched data is not an array:', data);
//         }
//       } else {
//         console.error('Failed to fetch event bookings');
//       }
//     } catch (error) {
//       console.error('Error fetching event bookings:', error);
//     }
//   };

//   const handleDelete = async (reservationId) => {
//     try {
//       const response = await fetch(`http://localhost:3001/api/reservations/${reservationId}`, {
//         method: 'DELETE',
//       });

//       if (response.ok) {
//         setRoomBookings((prevHistory) => prevHistory.filter((reservation) => reservation._id !== reservationId));
//         console.log(`Reservation with ID ${reservationId} deleted successfully`);
//       } else {
//         console.error(`Failed to delete reservation with ID ${reservationId}`);
//       }
//     } catch (error) {
//       console.error('Error deleting reservation:', error);
//     }
//   };

//   const handleEdit = (reservationId) => {
//     setEditId(reservationId);
//     const reservationToEdit = roomBookings.find((reservation) => reservation._id === reservationId);
//     setEditedReservation({
//       name: reservationToEdit.name,
//       idNumber: reservationToEdit.idNumber,
//       phoneNumber: reservationToEdit.phoneNumber,
//       roomType: reservationToEdit.roomType,
//       checkIn: reservationToEdit.checkIn.split('T')[0], // Format date correctly
//       checkOut: reservationToEdit.checkOut.split('T')[0], // Format date correctly
//     });
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
//         fetchRoomBookings(username); // Refresh the booking history
//       } else {
//         console.error(`Failed to update reservation with ID ${editId}`);
//       }
//     } catch (error) {
//       console.error('Error updating reservation:', error);
//     }
//   };

//   const handleCancelEdit = () => {
//     setEditId(null);
//   };

//   const handleNotFoundModalClose = () => {
//     setShowNotFoundModal(false);
//   };

//   return (
//     <div className="container">
//       <h1>My Bookings</h1>
//       {roomBookings.length > 0 ? (
//         <Table striped bordered hover>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>ID Number</th>
//               <th>Phone Number</th>
//               <th>Room Type</th>
//               <th>Check-In Date</th>
//               <th>Check-Out Date</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {roomBookings.map((reservation) => (
//               <tr key={reservation._id}>
//                 <td>{reservation.name}</td>
//                 <td>{reservation.idNumber}</td>
//                 <td>{reservation.phoneNumber}</td>
//                 <td>{reservation.roomType}</td>
//                 <td>{new Date(reservation.checkIn).toLocaleDateString()}</td>
//                 <td>{new Date(reservation.checkOut).toLocaleDateString()}</td>
//                 <td>
//                   {editId === reservation._id ? (
//                     <>
//                       <Form.Group controlId={`checkIn-${reservation._id}`}>
//                         <Form.Label>Check-In Date</Form.Label>
//                         <Form.Control
//                           type="date"
//                           name="checkIn"
//                           value={editedReservation.checkIn}
//                           onChange={(e) => setEditedReservation({ ...editedReservation, checkIn: e.target.value })}
//                         />
//                       </Form.Group>
//                       <Form.Group controlId={`checkOut-${reservation._id}`}>
//                         <Form.Label>Check-Out Date</Form.Label>
//                         <Form.Control
//                           type="date"
//                           name="checkOut"
//                           value={editedReservation.checkOut}
//                           onChange={(e) => setEditedReservation({ ...editedReservation, checkOut: e.target.value })}
//                         />
//                       </Form.Group>
//                       <Button className="btn-success" onClick={handleSave}>Save</Button>
//                       <Button className="btn-danger" onClick={handleCancelEdit}>Cancel</Button>
//                     </>
//                   ) : (
//                     <>
//                       <Button className="btn-warning" onClick={() => handleEdit(reservation._id)}>Edit Dates</Button>
//                       <Button className="btn-danger" onClick={() => handleDelete(reservation._id)}>Delete</Button>
//                     </>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       ) : (
//         <p>No room bookings found.</p>
//       )}

//       <h2 className='event-fetch'>Event Bookings</h2>
//       {eventBookings.length > 0 ? (
//         <Table striped bordered hover>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Phone Number</th>
//               <th>Event Type</th>
//               <th>Number of Guests</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {eventBookings.map((event) => (
//               <tr key={event._id}>
//                 <td>{event.name}</td>
//                 <td>{event.email}</td>
//                 <td>{event.phone}</td>
//                 <td>{event.eventType}</td>
//                 <td>{event.guests}</td>
//                 <td> <Button className="btn-success" onClick={handleSave}>Save</Button>
//                      <Button className="btn-danger" onClick={handleCancelEdit}>Cancel</Button></td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       ) : (
//         <p>No event bookings found.</p>
//       )}

//       <Modal show={showNotFoundModal} onHide={handleNotFoundModalClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Not Found</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <p>The information you entered was not found. Please check and try again.</p>
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
// import { Modal, Button, Table, Form } from 'react-bootstrap';
// import './userbooking.css';

// export default function BookingHistory() {
//   const [roomBookings, setRoomBookings] = useState([]);
//   const [eventBookings, setEventBookings] = useState([]);
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

//   const username = localStorage.getItem('username');  // Fetch the username from localStorage

//   useEffect(() => {
//     if (username) {
//       fetchRoomBookings(username);
//       fetchEventBookings(username);
//     }
//   }, [username]);

//   const fetchRoomBookings = async (username) => {
//     try {
//       const response = await fetch(`http://localhost:3001/api/reservations/user/${username}`);
//       if (response.ok) {
//         const data = await response.json();
//         console.log('Fetched room bookings:', data);
//         if (Array.isArray(data)) {
//           setRoomBookings(data);
//         } else {
//           console.error('Fetched data is not an array:', data);
//         }
//       } else {
//         console.error('Failed to fetch room bookings');
//       }
//     } catch (error) {
//       console.error('Error fetching room bookings:', error);
//     }
//   };

//   const fetchEventBookings = async (username) => {
//     try {
//       const response = await fetch(`http://localhost:3001/api/events/user/${username}`);
//       if (response.ok) {
//         const data = await response.json();
//         console.log('Fetched event bookings:', data);
//         if (Array.isArray(data)) {
//           setEventBookings(data);
//         } else {
//           console.error('Fetched data is not an array:', data);
//         }
//       } else {
//         console.error('Failed to fetch event bookings');
//       }
//     } catch (error) {
//       console.error('Error fetching event bookings:', error);
//     }
//   };

//   const handleDelete = async (reservationId) => {
//     try {
//       const response = await fetch(`http://localhost:3001/api/reservations/${reservationId}`, {
//         method: 'DELETE',
//       });

//       if (response.ok) {
//         setRoomBookings((prevHistory) => prevHistory.filter((reservation) => reservation._id !== reservationId));
//         console.log(`Reservation with ID ${reservationId} deleted successfully`);
//       } else {
//         console.error(`Failed to delete reservation with ID ${reservationId}`);
//       }
//     } catch (error) {
//       console.error('Error deleting reservation:', error);
//     }
//   };

//   const handleEdit = (reservationId) => {
//     setEditId(reservationId);
//     const reservationToEdit = roomBookings.find((reservation) => reservation._id === reservationId);
//     setEditedReservation({
//       name: reservationToEdit.name,
//       idNumber: reservationToEdit.idNumber,
//       phoneNumber: reservationToEdit.phoneNumber,
//       roomType: reservationToEdit.roomType,
//       checkIn: reservationToEdit.checkIn.split('T')[0], // Format date correctly
//       checkOut: reservationToEdit.checkOut.split('T')[0], // Format date correctly
//     });
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
//         fetchRoomBookings(username); // Refresh the booking history
//       } else {
//         console.error(`Failed to update reservation with ID ${editId}`);
//       }
//     } catch (error) {
//       console.error('Error updating reservation:', error);
//     }
//   };

//   const handleCancelEdit = () => {
//     setEditId(null);
//   };

//   const handleNotFoundModalClose = () => {
//     setShowNotFoundModal(false);
//   };

//   return (
//     <div className="container">
//       <h1>My Bookings</h1>
//       {roomBookings.length > 0 ? (
//         <Table striped bordered hover>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>ID Number</th>
//               <th>Phone Number</th>
//               <th>Room Type</th>
//               <th>Check-In Date</th>
//               <th>Check-Out Date</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {roomBookings.map((reservation) => (
//               <tr key={reservation._id}>
//                 <td>{reservation.name}</td>
//                 <td>{reservation.idNumber}</td>
//                 <td>{reservation.phoneNumber}</td>
//                 <td>{reservation.roomType}</td>
//                 <td>{new Date(reservation.checkIn).toLocaleDateString()}</td>
//                 <td>{new Date(reservation.checkOut).toLocaleDateString()}</td>
//                 <td>
//                   {editId === reservation._id ? (
//                     <>
//                       <Form.Group controlId={`checkIn-${reservation._id}`}>
//                         <Form.Label>Check-In Date</Form.Label>
//                         <Form.Control
//                           type="date"
//                           name="checkIn"
//                           value={editedReservation.checkIn}
//                           onChange={(e) => setEditedReservation({ ...editedReservation, checkIn: e.target.value })}
//                         />
//                       </Form.Group>
//                       <Form.Group controlId={`checkOut-${reservation._id}`}>
//                         <Form.Label>Check-Out Date</Form.Label>
//                         <Form.Control
//                           type="date"
//                           name="checkOut"
//                           value={editedReservation.checkOut}
//                           onChange={(e) => setEditedReservation({ ...editedReservation, checkOut: e.target.value })}
//                         />
//                       </Form.Group>
//                       <Button className="btn-success" onClick={handleSave}>Save</Button>
//                       <Button className="btn-danger" onClick={handleCancelEdit}>Cancel</Button>
//                     </>
//                   ) : (
//                     <>
//                       <Button className="btn-warning" onClick={() => handleEdit(reservation._id)}>Edit Dates</Button>
//                       <Button className="btn-danger" onClick={() => handleDelete(reservation._id)}>Delete</Button>
//                     </>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       ) : (
//         <p>No room bookings found.</p>
//       )}

//       <h2 className='event-fetch'>Event Bookings</h2>
//       {eventBookings.length > 0 ? (
//         <Table striped bordered hover>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Phone Number</th>
//               <th>Event Type</th>
//               <th>Number of Guests</th>
//               <th>Food Required</th>
//               <th>Date</th>
//               <th>Time From</th>
//               <th>Time To</th>
//               <th>Payment Method</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {eventBookings.map((event) => (
//               <tr key={event._id}>
//                 <td>{event.name}</td>
//                 <td>{event.email}</td>
//                 <td>{event.phone}</td>
//                 <td>{event.eventType}</td>
//                 <td>{event.guests}</td>
//                 <td>{event.foodRequired}</td>
//                 <td>{new Date(event.date).toLocaleDateString()}</td>
//                 <td>{event.timeFrom}</td>
//                 <td>{event.timeTo}</td>
//                 <td>{event.paymentMethod}</td>
//                 <td>
//                   <Button className="btn-danger" onClick={() => handleDelete(event._id)}>Delete</Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       ) : (
//         <p>No event bookings found.</p>
//       )}

//       <Modal show={showNotFoundModal} onHide={handleNotFoundModalClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Not Found</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <p>The information you entered was not found. Please check and try again.</p>
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
import { Modal, Button, Table, Form } from 'react-bootstrap';
import './userbooking.css';

export default function BookingHistory() {
  const [roomBookings, setRoomBookings] = useState([]);
  const [eventBookings, setEventBookings] = useState([]);
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

  const username = localStorage.getItem('username');  // Fetch the username from localStorage

  useEffect(() => {
    if (username) {
      fetchRoomBookings(username);
      fetchEventBookings(username);
    }
  }, [username]);

  const fetchRoomBookings = async (username) => {
    try {
      const response = await fetch(`http://localhost:3001/api/reservations/user/${username}`);
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) {
          setRoomBookings(data);
        } else {
          console.error('Fetched data is not an array:', data);
        }
      } else {
        console.error('Failed to fetch room bookings');
      }
    } catch (error) {
      console.error('Error fetching room bookings:', error);
    }
  };

  const fetchEventBookings = async (username) => {
    try {
      const response = await fetch(`http://localhost:3001/api/events/user/${username}`);
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) {
          setEventBookings(data);
        } else {
          console.error('Fetched data is not an array:', data);
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
          setRoomBookings((prevHistory) => prevHistory.filter((reservation) => reservation._id !== id));
        } else {
          setEventBookings((prevHistory) => prevHistory.filter((event) => event._id !== id));
        }
      } else {
        console.error(`Failed to delete entry with ID ${id}`);
      }
    } catch (error) {
      console.error(`Error deleting entry with ID ${id}:`, error);
    }
  };

  const handleEditRoom = (reservationId) => {
    setEditId(reservationId);
    const reservationToEdit = roomBookings.find((reservation) => reservation._id === reservationId);
    setEditedReservation({
      name: reservationToEdit.name,
      idNumber: reservationToEdit.idNumber,
      phoneNumber: reservationToEdit.phoneNumber,
      roomType: reservationToEdit.roomType,
      checkIn: reservationToEdit.checkIn.split('T')[0], // Format date correctly
      checkOut: reservationToEdit.checkOut.split('T')[0], // Format date correctly
    });
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
        date: eventToEdit.date ? eventToEdit.date.split('T')[0] : '', // Format date correctly
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
        setEditId(null);
        fetchRoomBookings(username); // Refresh the booking history
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
        setEditId(null);
        fetchEventBookings(username); // Refresh the event bookings
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

  const handleNotFoundModalClose = () => {
    setShowNotFoundModal(false);
  };

  return (
    <div className='container-userbooking-wrapper'>
      <div className="backimg-userbooking"></div>
      <div className="userbooking-container">
      <h1>My Bookings</h1>
      {roomBookings.length > 0 ? (
        <Table striped bordered hover className="booking-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>ID Number</th>
              <th>Phone Number</th>
              <th>Room Type</th>
              <th>Check-In Date</th>
              <th>Check-Out Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {roomBookings.map((reservation) => (
              <tr key={reservation._id}>
                <td>{reservation.name}</td>
                <td>{reservation.idNumber}</td>
                <td>{reservation.phoneNumber}</td>
                <td>{reservation.roomType}</td>
                <td>{new Date(reservation.checkIn).toLocaleDateString()}</td>
                <td>{new Date(reservation.checkOut).toLocaleDateString()}</td>
                <td>
                  {editId === reservation._id ? (
                    <>
                      <Form.Group controlId={`checkIn-${reservation._id}`}>
                        <Form.Label>Check-In Date</Form.Label>
                        <Form.Control
                          type="date"
                          name="checkIn"
                          value={editedReservation.checkIn}
                          onChange={(e) => setEditedReservation({ ...editedReservation, checkIn: e.target.value })}
                        />
                      </Form.Group>
                      <Form.Group controlId={`checkOut-${reservation._id}`}>
                        <Form.Label>Check-Out Date</Form.Label>
                        <Form.Control
                          type="date"
                          name="checkOut"
                          value={editedReservation.checkOut}
                          onChange={(e) => setEditedReservation({ ...editedReservation, checkOut: e.target.value })}
                        />
                      </Form.Group>
                      <Button className="btn-success" onClick={handleSaveRoom}>Save</Button>
                      <Button className="btn-danger" onClick={handleCancelEdit}>Cancel</Button>
                    </>
                  ) : (
                    <>
                      <Button className="btn-dates" onClick={() => handleEditRoom(reservation._id)}>Edit Dates</Button>
                      <Button className="btn-danger" onClick={() => handleDelete(reservation._id, 'room')}>Delete</Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No room bookings found.</p>
      )}

      <h2 className='event-fetch'>Event Bookings</h2>
      {eventBookings.length > 0 ? (
        <Table striped bordered hover className="booking-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Event Type</th>
              <th>Number of Guests</th>
              <th>Food Required</th>
              <th>Date</th>
              <th>Time From</th>
              <th>Time To</th>
              <th>Payment Method</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {eventBookings.map((event) => (
              <tr key={event._id}>
                <td>{event.name}</td>
                <td>{event.email}</td>
                <td>{event.phone}</td>
                <td>{event.eventType}</td>
                <td>{event.guests}</td>
                <td>{event.foodRequired}</td>
                <td>{new Date(event.date).toLocaleDateString()}</td>
                <td>{event.timeFrom}</td>
                <td>{event.timeTo}</td>
                <td>{event.paymentMethod}</td>
                <td>
                  {editId === event._id ? (
                    <>
                      <Form.Group controlId={`eventName-${event._id}`}>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={editedEvent.name}
                          onChange={(e) => setEditedEvent({ ...editedEvent, name: e.target.value })}
                        />
                      </Form.Group>
                      <Form.Group controlId={`eventDate-${event._id}`}>
                        <Form.Label>Date</Form.Label>
                        <Form.Control
                          type="date"
                          name="date"
                          value={editedEvent.date}
                          onChange={(e) => setEditedEvent({ ...editedEvent, date: e.target.value })}
                        />
                      </Form.Group>
                      {/* Add more form fields for other event properties */}
                      <Button className="btn-success" onClick={handleSaveEvent}>Save</Button>
                      <Button className="btn-danger" onClick={handleCancelEdit}>Cancel</Button>
                    </>
                  ) : (
                    <>
                      <Button className="btn-dates" onClick={() => handleEditEvent(event._id)}>Edit</Button>
                      <Button className="btn-danger" onClick={() => handleDelete(event._id, 'event')}>Delete</Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No event bookings found.</p>
      )}

      <Modal show={showNotFoundModal} onHide={handleNotFoundModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Data Not Found</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>There was an issue retrieving your booking data. Please try again later.</p>
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
