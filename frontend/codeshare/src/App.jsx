import React, { useState, useEffect, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import axios from 'axios';

const RealTimeMessaging = () => {
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
    <textarea cols="50" rows="10" value={inputMessage} onChange={handleInputChange} />
  );
};

export default RealTimeMessaging;
