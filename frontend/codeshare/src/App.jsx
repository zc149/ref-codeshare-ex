import React, { useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import axios from 'axios';


const RealTimeMessaging = () => {
  const [message, setMessage] = useState('');
  const [client, setClient] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080')
      .then(response => setMessage(response.data))
      .catch(error => console.error(error));

    const socketClient = new Client({
      brokerURL: 'ws://localhost:8080/websocket',
      onConnect: () => {
        socketClient.subscribe('/topic/public', messageOutput => {
          if (!messageOutput) messageOutput = '';
          setMessage(messageOutput.body);
        });
      },
    });

    socketClient.activate();
    setClient(socketClient);

    return () => {
      socketClient.deactivate();
    };
  }, []);

  const debounce = (func, wait) => {
    let timeout;
    return () => {
      clearTimeout(timeout);
      timeout = setTimeout(func, wait);
    };
  };

  const sendMessage = () => {
    if (client) {
      client.publish({ destination: "/app/send", body: message });
    }
  };

  const debouncedSend = debounce(sendMessage, 100);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
    debouncedSend();
  };

  return (
    <textarea cols="50" rows="10" value={message} onChange={handleInputChange} />
  );
};

export default RealTimeMessaging;
