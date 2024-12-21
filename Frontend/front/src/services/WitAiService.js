import axios from 'axios';

const WIT_AI_TOKEN = 'U2OSBX3Y4R3AHJPQLYZPLI6DHVELGII6';

const headers = {
  Authorization: `Bearer ${WIT_AI_TOKEN}`,
  'Content-Type': 'application/json',
};

export const sendMessageToWit = async (message) => {
  try {
    const response = await axios.get(
      'https://api.wit.ai/message',
      {
        headers,
        params: {
          v: '20240722',
          q: message,
        },
      }
    );
    console.log('Wit.ai API response:', response.data);  // Debug log for the API response
    return response.data;
  } catch (error) {
    console.error('Error communicating with Wit.ai', error);
    return null;
  }
};
