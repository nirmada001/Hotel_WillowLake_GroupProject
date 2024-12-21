import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'react-chatbot-kit/build/main.css';
import './Home.css';
import '../component/Chatbot.css'; // Import Chatbot styles
import Background from '../images/Hotel.png';
import EventImageOne from '../images/family.jpg';
import EventImageTwo from '../images/birthday.jpg';
import EventImageThree from '../images/friend.jpg';
import BackgroundVideo from '../images/backvideo.mp4'; 
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Chatbot from '../component/Chatbot'; // Import the Chatbot component

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(true);
  }, []);

  const handleLogin = () => {
    if (isLoggedIn) {
      navigate('/roomtype');
    } else {
      navigate('/login');
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div>
      <div className="Container1" id='container'>
        <img src={Background} alt="Background" className="background-image-new img-fluid" />
        <div className="contentContainer text-center">
          <h1 className="homeTitle">Welcome to <br/>Hotel Willow Lake</h1>
          <div className="backgroundImage">
            <h2 className='h2-new'><i>
            Located in Kurunegala, Sri Lanka, Hotel Willow Lake offers <br/>luxury and comfort with elegant accommodations and exquisite dining. <br/>
            
              <br></br>
              {isLoggedIn ? (
                <button className=" btn-secondary-booknow" onClick={handleLogin}>
                  Book Now
                </button>
              ) : (
                <Link to='/login' className="btn btn-secondary">
                  Log in to Book Now
                </Link>
              )}
            </i></h2>
          </div>
          <br />
        </div>
      </div>

      <div className="Container2" id="events-container">
        <h1 className="h1-event">Events</h1>
        <video autoPlay loop muted className="background-video">
          <source src={BackgroundVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <br></br>
        <Slider {...settings}>
          <div className="event-card-adj">
            <div className="card">
              <div className="card-body-event">
                <h3>Family Gathering</h3>
                <h4>Experience a heartwarming family gathering at Hotel Willow Lake in Kurunegala, 
                  amidst tranquil surroundings and joyful moments. Cherish quality time with loved ones,
                   enjoying delightful cuisine, fun activities, and beautiful lake views.</h4>
                <Link to='/event'><img src={EventImageOne} alt="Background" className="event-image-two img-fluid" /></Link>
              </div>
            </div>
          </div>
          <div className="event-card-adj">
            <div className="card">
              <div className="card-body-event">
                <h3>Birthday Party</h3>
                <h4>
                Celebrate your special day with a memorable birthday party at Hotel Willow Lake in
                 Kurunegala. Enjoy a fun-filled event with delicious food, entertainment, and stunning
                  lake views in a beautiful outdoor setting.</h4>
                <Link to='/event'><img src={EventImageTwo} alt="Background" className="event-image-one img-fluid" /></Link>
              </div>
            </div>
          </div>
          <div className="event-card-adj">
            <div className="card">
              <div className="card-body-event">
                <h3>Friend Gathering</h3>
                <h4>Join us for a delightful outdoor gathering at Hotel Willow Lake in Kurunegala,
                   surrounded by serene nature and good company. Enjoy a memorable evening with friends,
                    featuring delicious food, music, and scenic lake views.</h4>
                <Link to='/event'><img src={EventImageThree} alt="Background" className="event-image-one img-fluid" /></Link>
              </div>
            </div>
          </div>
        </Slider>

        <br></br>
        <div className="row">
        </div>
      </div>
   

      {/* Include Chatbot component */}
      <div className="chatbot-wrapper">
        <Chatbot />
      </div>
    </div>
  );
}