import React, { useState, useEffect, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import axios from 'axios';

const TextSharing = () => {
  const [inputMessage, setInputMessage] = useState('');
  const [client, setClient] = useState();
  const timeoutRef = useRef(null);

  useEffect(() => {
    axios.get('http://localhost:8080')
      .then(response => setInputMessage(response.data))
      .catch(error => console.error(error));

    const client = new Client({
      brokerURL: "ws://localhost:8080/websocket", // 서버 WebSocket URL
      reconnectDelay: 5000,
      onConnect: () => {
        client.subscribe(`/topic/public`, (message) => {
          const msg = JSON.parse(message.body);
          setInputMessage(msg);
        });
      },
    });

    client.activate();
    setClient(client)

  }, []);

  useEffect(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      client.publish({ destination: "/app/send", body: JSON.stringify(inputMessage) });
    }, 1000);

    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    }

  }, [inputMessage, client]);

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  return (
    <textarea
      className='resize-none shadow-md p-3 mt-1 w-4/5 h-screen 
      border-4 border-blue-600 rounded-md focus:outline-none
       focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
      value={inputMessage}
      onChange={handleInputChange}
    />
  )
};

export default TextSharing;
