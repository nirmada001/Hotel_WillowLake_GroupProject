// import React, { useState, useEffect } from 'react';
// import { Row, Col, Form, Button, Modal } from 'react-bootstrap';
// import axios from 'axios';
// import './profile.css';

// const Profile = ({ user, onUpdateProfile, onDeleteProfile }) => {
//   const [userData, setUserData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     username: '',
//     password: '',
//   });

//   const [isFormEdited, setIsFormEdited] = useState(false);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     if (user) {
//       axios
//         .get(`http://localhost:3001/api/signup/${user}`)
//         .then((response) => {
//           const userDataFromServer = response.data;
//           setUserData(userDataFromServer);
//         })
//         .catch((error) => {
//           console.error('Error fetching user data:', error);
//         });
//     }
//   }, [user]);

//   const handleInputChange = (e) => {
//     if (isEditMode) {
//       const { name, value } = e.target;
//       setUserData((prevData) => ({ ...prevData, [name]: value }));
//       setIsFormEdited(true);
//     }
//   };

//   const handleSaveProfile = () => {
//     axios
//       .put(`http://localhost:3001/api/signup/${user}`, userData)
//       .then((response) => {
//         console.log('Profile updated successfully:', response.data);
//         setIsFormEdited(false);
//         setIsEditMode(false);
//         setShowModal(true); // Show the modal after profile update
//       })
//       .catch((error) => {
//         console.error('Error updating profile:', error);
//       });
//   };

//   const handleDeleteProfile = () => {
//     axios
//       .delete(`http://localhost:3001/api/signup/${user}`)
//       .then((response) => {
//         console.log('Profile deleted successfully:', response.data);
//         onDeleteProfile();
//       })
//       .catch((error) => {
//         console.error('Error deleting profile:', error);
//       });
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//   };

//   return (
//     <div className='container-profile-wrapper'>
//       <div className="backimg-profile"></div>
//       <div className="profile-wrapper" id="profile">
//         <Row>
//           <Col>
//             <h2 className="profile-title">User Profile</h2>
//           </Col>
//         </Row>
//         <Row>
//           <Col>
//             <Form className='profile-form'>
//               <Form.Group as={Row} controlId="formName" className="mb-3">
//                 <Form.Label column sm={4}>
//                   First Name
//                 </Form.Label>
//                 <Col sm={8}>
//                   <Form.Control
//                     type="text"
//                     placeholder="Enter First Name"
//                     name="firstName"
//                     value={userData.firstName}
//                     onChange={handleInputChange}
//                     readOnly={!isEditMode}
//                   />
//                 </Col>
//               </Form.Group>
//               <Form.Group as={Row} controlId="formLastName" className="mb-3">
//                 <Form.Label column sm={4}>
//                   Last Name
//                 </Form.Label>
//                 <Col sm={8}>
//                   <Form.Control
//                     type="text"
//                     placeholder="Enter Last Name"
//                     name="lastName"
//                     value={userData.lastName}
//                     onChange={handleInputChange}
//                     readOnly={!isEditMode}
//                   />
//                 </Col>
//               </Form.Group>
//               <Form.Group as={Row} controlId="formEmail" className="mb-3">
//                 <Form.Label column sm={4}>
//                   Email
//                 </Form.Label>
//                 <Col sm={8}>
//                   <Form.Control
//                     type="text"
//                     placeholder="Enter Email"
//                     name="email"
//                     value={userData.email}
//                     onChange={handleInputChange}
//                     readOnly={!isEditMode}
//                   />
//                 </Col>
//               </Form.Group>
//               <Form.Group as={Row} controlId="formUsername" className="mb-3">
//                 <Form.Label column sm={4}>
//                   Username
//                 </Form.Label>
//                 <Col sm={8}>
//                   <Form.Control
//                     type="text"
//                     placeholder="Enter Username"
//                     name="username"
//                     value={userData.username}
//                     onChange={handleInputChange}
//                     readOnly={!isEditMode}
//                   />
//                 </Col>
//               </Form.Group>
//               <Form.Group as={Row} controlId="formPassword" className="mb-3">
//                 <Form.Label column sm={4}>
//                   Password
//                 </Form.Label>
//                 <Col sm={8}>
//                   <Form.Control
//                     type="text"
//                     placeholder="Enter Password"
//                     name="password"
//                     value={userData.password}
//                     onChange={handleInputChange}
//                     readOnly={!isEditMode}
//                   />
//                 </Col>
//               </Form.Group>
//             </Form>
//           </Col>
//         </Row>
//         <Row>
//           <Col className="text-right">
//             <div className="">
//               {!isEditMode && (
//                 <Button className="profilebtn" onClick={() => setIsEditMode(true)}>
//                   Edit
//                 </Button>
//               )}
//               {isFormEdited && isEditMode && (
//                 <Button className="profilebtn" onClick={handleSaveProfile}>
//                   Save
//                 </Button>
//               )}
//               <Button className="profilebtn" onClick={handleDeleteProfile}>
//                 Delete Profile
//               </Button>
//             </div>
//           </Col>
//         </Row>

//         <Modal show={showModal} onHide={handleCloseModal} centered>
//           <Modal.Header closeButton>
//             <Modal.Title>Profile Updated</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>Your profile has been successfully updated.</Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={handleCloseModal} className='profilebtn'>
//               Close
//             </Button>
//           </Modal.Footer>
//         </Modal>
//       </div>
//     </div>
//   );
// };

// export default Profile;

import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import './profile.css';

const Profile = ({ user, onUpdateProfile, onDeleteProfile }) => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
  });

  const [originalUserData, setOriginalUserData] = useState(null);
  const [isFormEdited, setIsFormEdited] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:3001/api/signup/${user}`)
        .then((response) => {
          const userDataFromServer = response.data;
          setUserData(userDataFromServer);
          setOriginalUserData(userDataFromServer);
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [user]);

  const handleInputChange = (e) => {
    if (isEditMode) {
      const { name, value } = e.target;
      setUserData((prevData) => ({ ...prevData, [name]: value }));
      setIsFormEdited(true);
    }
  };

  const handleSaveProfile = () => {
    axios
      .put(`http://localhost:3001/api/signup/${user}`, userData)
      .then((response) => {
        console.log('Profile updated successfully:', response.data);
        setIsFormEdited(false);
        setIsEditMode(false);
        setShowModal(true); // Show the modal after profile update
      })
      .catch((error) => {
        console.error('Error updating profile:', error);
      });
  };

  const handleCancelEdit = () => {
    setUserData(originalUserData);
    setIsEditMode(false);
    setIsFormEdited(false);
  };

  const handleDeleteProfile = () => {
    axios
      .delete(`http://localhost:3001/api/signup/${user}`)
      .then((response) => {
        console.log('Profile deleted successfully:', response.data);
        onDeleteProfile();
      })
      .catch((error) => {
        console.error('Error deleting profile:', error);
      });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className='container-profile-wrapper'>
      <div className="backimg-profile"></div>
      <div className="profile-wrapper" id="profile">
        <Row>
          <Col>
            <h2 className="profile-title">User Profile</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form className='profile-form'>
              <Form.Group as={Row} controlId="formName" className="mb-3">
                <Form.Label column sm={4}>
                  First Name
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="text"
                    placeholder="Enter First Name"
                    name="firstName"
                    value={userData.firstName}
                    onChange={handleInputChange}
                    readOnly={!isEditMode}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formLastName" className="mb-3">
                <Form.Label column sm={4}>
                  Last Name
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="text"
                    placeholder="Enter Last Name"
                    name="lastName"
                    value={userData.lastName}
                    onChange={handleInputChange}
                    readOnly={!isEditMode}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formEmail" className="mb-3">
                <Form.Label column sm={4}>
                  Email
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="text"
                    placeholder="Enter Email"
                    name="email"
                    value={userData.email}
                    onChange={handleInputChange}
                    readOnly={!isEditMode}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formUsername" className="mb-3">
                <Form.Label column sm={4}>
                  Username
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="text"
                    placeholder="Enter Username"
                    name="username"
                    value={userData.username}
                    onChange={handleInputChange}
                    readOnly={!isEditMode}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formPassword" className="mb-3">
                <Form.Label column sm={4}>
                  Password
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    name="password"
                    value={userData.password}
                    onChange={handleInputChange}
                    readOnly={!isEditMode}
                  />
                </Col>
              </Form.Group>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col className="text-right">
            <div className="">
              {!isEditMode && (
                <Button className="profilebtn" onClick={() => setIsEditMode(true)}>
                  Edit
                </Button>
              )}
              {isEditMode && (
                <>
                  {isFormEdited && (
                    <Button className="profilebtn" onClick={handleSaveProfile}>
                      Save
                    </Button>
                  )}
                  <Button className="profilebtn" onClick={handleCancelEdit}>
                    Cancel
                  </Button>
                </>
              )}
              <Button className="profilebtn" onClick={handleDeleteProfile}>
                Delete Profile
              </Button>
            </div>
          </Col>
        </Row>

        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Profile Updated</Modal.Title>
          </Modal.Header>
          <Modal.Body>Your profile has been successfully updated.</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal} className='profilebtn'>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Profile;
