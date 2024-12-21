import React from 'react';
import './footer.css'
import InstagramIcon from '../images/instagram.png';
import FacebookIcon from '../images/facebook.png';
import WhatsappIcon from '../images/whatsapp.png';

export default function App() {
  return (
<footer class="footer">
  <div class="footer-left col-md-4 col-sm-6">
    <p class="about">
      <span> About Hotel Willow Lake</span> 
      Nestled in the heart of Kurunegala, Hotel Willow Lake offers a serene escape with breathtaking 
      views and exceptional hospitality. Our hotel combines modern comforts with natural beauty, 
      providing a perfect setting for relaxation, events, and memorable experiences by the lake.
    </p>
    <br></br>
    <div class="social-icons">
    <a href="" target="_blank" rel="noopener noreferrer">
          <img src={WhatsappIcon} alt="WhatsApp" />
        </a>
        <a href="https://www.facebook.com/p/Hotel-willow-lake-100064105301462/" target="_blank" rel="noopener noreferrer">
          <img src={FacebookIcon} alt="Facebook" />
        </a>
        <a href="">
          <img src={InstagramIcon} alt="Instagram" />
        </a>
    </div>
  </div>
  <div class="footer-center col-md-4 col-sm-6">
    <div>
      <i class="fa fa-map-marker"></i>
      <p><span> No.208</span> S Lake road Kurunegala, SriLanka</p>
    </div>
    <div>
      <i class="fa fa-phone"></i>
      <p> (+94) 071 354 2960</p>
    </div>
    <div>
      <i class="fa fa-envelope"></i>
      <p>info@hotelwillowlake.com</p>
    </div>
  </div>
  <div class="footer-right col-md-4 col-sm-6">
  <h2>Hotel <span>Willow Lake</span></h2>
    <p class="menu">
      <a href="/home"> Home</a> |
      <a href="/event">Events</a> |
      <a href="/dining"> Dinings</a> |
      <a href="/login"> Sign In</a> |
    </p>
    <p class="name">© 2023 Hotel Willow Lake</p>
  </div>
</footer>
  );
}