import React, { useState, useEffect } from 'react';
import './Chatbot.css';
import ChatBotIcon from '../images/chat-bot.png';
import { sendMessageToWit } from '../services/WitAiService';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  // Define the room prices
  const roomPrices = {
    'single room': '100$',
    'double room': '150$',
    'apartment': '200$',
  };

  useEffect(() => {
    if (isOpen) {
      setMessages([{ text: 'Welcome to Hotel Willow Lake. How can I assist you?', user: false }]);
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (userInput.trim()) {
      const newMessages = [...messages, { text: userInput, user: true }];
      setMessages(newMessages);
      setUserInput('');

      const response = await sendMessageToWit(userInput);
      console.log('Wit.ai response:', response);  // Debug log for the response

      if (!response) {
        setMessages([...newMessages, { text: 'Sorry, there was an error processing your request.', user: false }]);
        return;
      }

      const intent = response.intents && response.intents.length > 0 ? response.intents[0].name : null;
      const entities = response.entities || {};
      let reply;

      if (!intent) {
        reply = 'I did not understand that. Can you please rephrase?';
      } else {
        switch (intent) {
          case 'Greeting':
            reply = 'Hello! How can I assist you today?';
            break;
          case 'Hotel_location':
            reply = 'Our hotel is located at No: 208 S Lake Rd, Kurunegala, Sri Lanka.';
            break;
          case 'info':
            reply = 'Located in Kurunegala, Sri Lanka, Hotel Willow Lake offers luxury and comfort with elegant accommodations and exquisite dining.';
            break;

          case 'events':
            reply = 'You can book the event through the event tab on the navigation bar';
            break;

          case 'help':
            reply = 'Yes...How can i help you ??';
            break;

          case 'foods':
            reply = 'We offer a variety of dining options including local and international cuisines at our on-site restaurant.';
            break;
          case 'payment_methods':
            reply = 'We accept various payment methods including credit cards, cash, and PayPal.';
            break;
          case 'room_availability':
            reply = 'Please provide the type of room and date to check availability.';
            break;
          case 'room_facilities':
            reply = 'Our rooms include facilities such as Wi-Fi, a mini-bar, air conditioning, and complimentary toiletries.';
            break;
          case 'room_price':
            const roomType = entities['room_type:room_type']?.[0]?.value;
            const price = roomPrices[roomType] || 'a standard price';
            reply = `The price of a ${roomType || 'room'} is ${price}.`;
            break;
          case 'room_types':
            reply = 'We have single rooms, double rooms, and apartments available.';
            break;
          default:
            reply = 'I did not understand that. Can you please rephrase?';
        }
      }

      console.log('Reply:', reply);  // Debug log for the reply
      setMessages([...newMessages, { text: reply, user: false }]);
    }
  };

  return (
    <div className="chatbot-wrapper">
      <div className={`chatbot-container ${isOpen ? 'open' : 'closed'}`}>
        <div className="chatbot-header">Hotel Willow Lake Chat Assistant</div>
        <div className="messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.user ? 'user' : 'bot'}`}>
              {msg.text}
            </div>
          ))}
        </div>
        <div className="input-container">
          <input
            type="text"
            placeholder='Message'
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
      <div className="chatbot-icon" onClick={() => setIsOpen(!isOpen)}>
        <img src={ChatBotIcon} alt="Chatbot Icon" className='chatbot-icon' />
      </div>
    </div>
  );
};

export default Chatbot;
