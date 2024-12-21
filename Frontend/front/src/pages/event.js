// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import './event.css'; // Adjust the path as necessary

// // function EventBookingForm({ isLoggedIn }) {
// //     const [formData, setFormData] = useState({
// //         name: '',
// //         email: '',
// //         phone: '',
// //         eventType: '',
// //         guests: '',
// //         username: '' // Initialize username as empty
// //     });
// //     const [loading, setLoading] = useState(false);
// //     const [modalMessage, setModalMessage] = useState('');
// //     const [showModal, setShowModal] = useState(false);

// //     useEffect(() => {
// //         const username = localStorage.getItem('username'); // Fetch the username from localStorage
// //         if (username) {
// //             setFormData((prevData) => ({ ...prevData, username })); // Set the username in formData
// //         }
// //     }, []);

// //     const handleChange = (e) => {
// //         setFormData({
// //             ...formData,
// //             [e.target.name]: e.target.value
// //         });
// //     }

// //     const handleSubmit = (e) => {
// //         e.preventDefault();
// //         setLoading(true);
// //         setShowModal(true);

// //         axios.post('http://localhost:3001/api/event', formData)
// //             .then(response => {
// //                 // Handle success here
// //                 setLoading(false);
// //                 setModalMessage('Your booking has been successfully saved!');
// //                 console.log(response.data); // Optional: log server response
// //             })
// //             .catch(error => {
// //                 // Handle error here
// //                 setLoading(false);
// //                 setModalMessage('Failed to save booking. Please try again.');
// //                 console.error('Error:', error); // Optional: log error details
// //             });
// //     }

// //     return (
// //         <div className="container-event">
// //             <h2 className='h2-eve'>Event Booking Form</h2>
// //             <form onSubmit={handleSubmit}>
// //                 <div className="row">
// //                     <div className="col-md-6 mb-3">
// //                         <label htmlFor="name" className="form-label-event">Name</label>
// //                         <input type="text" className="form-control" id="name" name="name" onChange={handleChange} value={formData.name} />
// //                     </div>
// //                     <div className="col-md-6 mb-3">
// //                         <label htmlFor="email" className="form-label-event">Email</label>
// //                         <input type="email" className="form-control" id="email" name="email" onChange={handleChange} value={formData.email} />
// //                     </div>
// //                 </div>
// //                 <div className="row">
// //                     <div className="col-md-6 mb-3">
// //                         <label htmlFor="phone" className="form-label-event">Phone Number</label>
// //                         <input type="tel" className="form-control" id="phone" name="phone" onChange={handleChange} value={formData.phone} />
// //                     </div>
// //                     <div className="col-md-6 mb-3">
// //                         <label htmlFor="eventType" className="form-label-event">Event Type</label>
// //                         <select className="form-select" id="eventType" name="eventType" onChange={handleChange} value={formData.eventType}>
// //                             <option value="">Select an Event Type</option>
// //                             <option value="wedding">Wedding</option>
// //                             <option value="birthday">Birthday</option>
// //                             <option value="corporate">Corporate Event</option>
// //                             <option value="other">Other</option>
// //                         </select>
// //                     </div>
// //                 </div>
// //                 <div className="row">
// //                     <div className="col-md-12 mb-3">
// //                         <label htmlFor="guests" className="form-label-event">Number of Guests</label>
// //                         <input type="number" className="form-control" id="guests" name="guests" onChange={handleChange} value={formData.guests} />
// //                     </div>
// //                 </div>
// //                 <button type="submit" className="btn btn-primary" disabled={loading}>
// //                     {loading ? 'Submitting...' : 'Submit'}
// //                 </button>
// //             </form>
// //             {showModal && (
// //                 <div className="modal" tabIndex="-1" style={{ display: 'block' }}>
// //                     <div className="modal-dialog">
// //                         <div className="modal-content">
// //                             <div className="modal-header">
// //                                 <h5 className="modal-title">Submission Status</h5>
// //                                 <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
// //                             </div>
// //                             <div className="modal-body">
// //                                 <p>{modalMessage}</p>
// //                             </div>
// //                             <div className="modal-footer">
// //                                 <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
// //                             </div>
// //                         </div>
// //                     </div>
// //                 </div>
// //             )}
// //         </div>
// //     );
// // }

// // export default EventBookingForm;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './event.css'; // Adjust the path as necessary

// function EventBookingForm({ isLoggedIn }) {
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         phone: '',
//         eventType: '',
//         guests: '',
//         username: '' // Initialize username as empty
//     });
//     const [loading, setLoading] = useState(false);
//     const [modalMessage, setModalMessage] = useState('');
//     const [showModal, setShowModal] = useState(false);

//     useEffect(() => {
//         const username = localStorage.getItem('username'); // Fetch the username from localStorage
//         if (username) {
//             setFormData((prevData) => ({ ...prevData, username })); // Set the username in formData
//         }
//     }, []);

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         });
//     }

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setShowModal(true);

//         axios.post('http://localhost:3001/api/event', formData)
//             .then(response => {
//                 // Handle success here
//                 setLoading(false);
//                 setModalMessage('Your booking has been successfully saved!');
//                 console.log(response.data); // Optional: log server response
//             })
//             .catch(error => {
//                 // Handle error here
//                 setLoading(false);
//                 setModalMessage('Failed to save booking. Please try again.');
//                 console.error('Error:', error); // Optional: log error details
//             });
//     }

//     return (
//         <div className="container-event">
//             <h2 className='h2-eve'>Event Booking Form</h2>
//             <form onSubmit={handleSubmit}>
//                 <div className="row">
//                     <div className="col-md-6 mb-3">
//                         <label htmlFor="name" className="form-label-event">Name</label>
//                         <input type="text" className="form-control" id="name" name="name" onChange={handleChange} value={formData.name} />
//                     </div>
//                     <div className="col-md-6 mb-3">
//                         <label htmlFor="email" className="form-label-event">Email</label>
//                         <input type="email" className="form-control" id="email" name="email" onChange={handleChange} value={formData.email} />
//                     </div>
//                 </div>
//                 <div className="row">
//                     <div className="col-md-6 mb-3">
//                         <label htmlFor="phone" className="form-label-event">Phone Number</label>
//                         <input type="tel" className="form-control" id="phone" name="phone" onChange={handleChange} value={formData.phone} />
//                     </div>
//                     <div className="col-md-6 mb-3">
//                         <label htmlFor="eventType" className="form-label-event">Event Type</label>
//                         <select className="form-select" id="eventType" name="eventType" onChange={handleChange} value={formData.eventType}>
//                             <option value="">Select an Event Type</option>
//                             <option value="wedding">Wedding</option>
//                             <option value="birthday">Birthday</option>
//                             <option value="corporate">Corporate Event</option>
//                             <option value="other">Other</option>
//                         </select>
//                     </div>
//                 </div>
//                 <div className="row">
//                     <div className="col-md-12 mb-3">
//                         <label htmlFor="guests" className="form-label-event">Number of Guests</label>
//                         <input type="number" className="form-control" id="guests" name="guests" onChange={handleChange} value={formData.guests} />
//                     </div>
//                 </div>
//                 <button type="submit" className="btn btn-primary" disabled={loading}>
//                     {loading ? 'Submitting...' : 'Submit'}
//                 </button>
//             </form>
//             {showModal && (
//                 <div className="modal" tabIndex="-1" style={{ display: 'block' }}>
//                     <div className="modal-dialog">
//                         <div className="modal-content">
//                             <div className="modal-header">
//                                 <h5 className="modal-title">Submission Status</h5>
//                                 <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
//                             </div>
//                             <div className="modal-body">
//                                 <p>{modalMessage}</p>
//                             </div>
//                             <div className="modal-footer">
//                                 <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default EventBookingForm;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './event.css'; // Adjust the path as necessary

function EventBookingForm({ isLoggedIn }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        eventType: '',
        guests: '',
        foodRequired: '',
        date: '',
        timeFrom: '',
        timeTo: '',
        paymentMethod: '',
        username: '' // Initialize username as empty
    });
    const [loading, setLoading] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const username = localStorage.getItem('username'); // Fetch the username from localStorage
        if (username) {
            setFormData((prevData) => ({ ...prevData, username })); // Set the username in formData
        }
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setShowModal(true);

        axios.post('http://localhost:3001/api/event', formData)
            .then(response => {
                // Handle success here
                setLoading(false);
                setModalMessage('Your booking has been successfully saved!');
                console.log(response.data); // Optional: log server response
            })
            .catch(error => {
                // Handle error here
                setLoading(false);
                setModalMessage('Failed to save booking. Please try again.');
                console.error('Error:', error); // Optional: log error details
            });
    }

    return (
        <div className="container-event-wrapper">
            <div className="backimg-event"></div>
            <div className="content-event">
                <h2 className='h2-eve'>Event Booking Form</h2>
                <h4 className="event-heading">~ Book Your Perfect Event by the Lake ~</h4>
                <form onSubmit={handleSubmit} className='event-form'>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="name" className="form-label-event">Name</label>
                            <input type="text" className="form-control" id="name" name="name" onChange={handleChange} value={formData.name} />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="email" className="form-label-event">Email</label>
                            <input type="email" className="form-control" id="email" name="email" onChange={handleChange} value={formData.email} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="phone" className="form-label-event">Phone Number</label>
                            <input type="tel" className="form-control" id="phone" name="phone" onChange={handleChange} value={formData.phone} />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="eventType" className="form-label-event">Event Type</label>
                            <select className="form-select" id="eventType" name="eventType" onChange={handleChange} value={formData.eventType}>
                                <option value="">Select an Event Type</option>
                                <option value="wedding">Family Gathering</option>
                                <option value="birthday">Birthday Party</option>
                                <option value="corporate">Friend Gathering</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="guests" className="form-label-event">Number of Guests</label>
                            <input type="number" className="form-control" id="guests" name="guests" onChange={handleChange} value={formData.guests} />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="foodRequired" className="form-label-event">Food Required</label>
                            <select className="form-select" id="foodRequired" name="foodRequired" onChange={handleChange} value={formData.foodRequired}>
                                <option value="">Select an Option</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="date" className="form-label-event">Event Date</label>
                            <input type="date" className="form-control" id="date" name="date" onChange={handleChange} value={formData.date} />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="timeFrom" className="form-label-event">Start Time</label>
                            <input type="time" className="form-control" id="timeFrom" name="timeFrom" onChange={handleChange} value={formData.timeFrom} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="timeTo" className="form-label-event">End Time</label>
                            <input type="time" className="form-control" id="timeTo" name="timeTo" onChange={handleChange} value={formData.timeTo} />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="paymentMethod" className="form-label-event">Payment Method</label>
                            <select className="form-select" id="paymentMethod" name="paymentMethod" onChange={handleChange} value={formData.paymentMethod}>
                                <option value="">Select a Payment Method</option>
                                <option value="credit">Credit Card</option>
                                <option value="debit">Debit Card</option>
                                <option value="paypal">PayPal</option>
                            </select>
                        </div>
                    </div>
                    <button type="submit" className="btn-submit" disabled={loading}>
                        {loading ? 'Submitting...' : 'Submit'}
                    </button>
                </form>
            </div>
            {showModal && (
                <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Booking Status</h5>
                                <button type="button" className="closeicon" onClick={() => setShowModal(false)} aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>{modalMessage}</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="closebtn" onClick={() => setShowModal(false)}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default EventBookingForm;
