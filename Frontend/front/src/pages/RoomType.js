import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom'; 
import RoomBackgroundVideo from '../images/roomtype.mp4';
import './RoomType.css';
import img1 from '../images/img1.png';
import img2 from '../images/img2.png';
import img3 from '../images/img3.png';

export default function RoomTypes() {
  const roomTypes = [
    {
      title: 'Single Room',
      description: 'No of Guest: 1 | $100 Per Night',
      image: img1,
      route: '/singleroom', 
    },
    {
      title: 'Double Room',
      description: 'No of Guests: 2-3 | $200 Per Night.',
      image: img2,
      route: '/doubleroom', 
    },
    {
      title: 'Apartment',
      description: 'No of Guests: 5-8 | $450 Per Night.',
      image: img3,
      route: '/apartment', 
    },
  ];

  return (
    <div className="rooms">
      <video autoPlay loop muted className="Video-background">
        <source src={RoomBackgroundVideo} type="video/mp4" />
      </video>

      <div className="Center-cards">
        <div className="Card-container">
          <Row xs={20} md={10} className="g-4">
            {roomTypes.map((room, idx) => (
              <Col key={idx}>
                <Link to={room.route} className="card-link" id='room-card-link'>
                  <Card className="card roomcard">
                    <Card.Img variant="top" src={room.image} />
                    <Card.Body>
                      <Card.Title>{room.title}</Card.Title>
                      <Card.Text>{room.description}</Card.Text>
                    </Card.Body>
                  </Card>
                </Link> 
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
}
