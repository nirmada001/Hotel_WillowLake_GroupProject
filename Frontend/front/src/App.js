import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './component/navbar';
import RoomType from "./pages/RoomType";
import BookingHistory from "./pages/BookingHistory";
import Signup from "./pages/signup";
import Signout from "./pages/signout";
import Login from "./pages/login";
import Home from "./pages/Home";
import DeluxRoom from "./pages/DeluxeRoom";
import SingleRoom from "./pages/Singleroom";
import DoubleRoom from "./pages/Doubleroom";
import Footer from "./component/footer";
import UserBookings from "./pages/userbooking";
import Event from "./pages/event";
import Profile from "./pages/profile";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    return storedLoginStatus ? JSON.parse(storedLoginStatus) : false;
  });

  const [isAdmin, setIsAdmin] = useState(() => {
    const storedAdminStatus = localStorage.getItem('isAdmin');
    return storedAdminStatus ? JSON.parse(storedAdminStatus) : false;
  });

  const [username, setUsername] = useState(() => {
    return localStorage.getItem('username') || '';
  });

  const handleLoginStatusUpdate = (status, admin, username) => {
    setIsLoggedIn(status);
    setIsAdmin(admin);
    setUsername(username);

    localStorage.setItem('isLoggedIn', JSON.stringify(status));
    localStorage.setItem('isAdmin', JSON.stringify(admin));
    localStorage.setItem('username', username);
  };

  // useEffect to clear local storage on sign out
  useEffect(() => {
    if (!isLoggedIn) {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('isAdmin');
      localStorage.removeItem('username');
    }
  }, [isLoggedIn]);


  return (
    <div>
      <BrowserRouter>
        <Navbar isLoggedIn={isLoggedIn} updateLoginStatus={handleLoginStatusUpdate} isAdmin={isAdmin} username={username} />
        <Routes>
          <Route path="/login" element={<Login updateLoginStatus={handleLoginStatusUpdate} />} />
          <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signout" element={<Signout updateLoginStatus={setIsLoggedIn} setIsAdmin={setIsAdmin} />} />
          <Route path="/roomtype" element={<RoomType />} />
          <Route path="/bookinghistory" element={<BookingHistory />} />
          <Route path="/apartment" element={<DeluxRoom isLoggedIn={isLoggedIn} />} />
          <Route path="/singleroom" element={<SingleRoom isLoggedIn={isLoggedIn} />} />
          <Route path="/doubleroom" element={<DoubleRoom isLoggedIn={isLoggedIn} />} />
          <Route path="/userbookings" element={<UserBookings user={username} />} />
          <Route path="/event" element={<Event user={username} />} />     
          <Route path="/profile" element={<Profile user={username} />} />       
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
