import React, { useState, useEffect, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import axios from 'axios';

const RealTimeMessaging = () => {
  const [message, setMessage] = useState('');
  const [client, setClient] = useState();
  const timeout = useRef(null);

  useEffect(() => {
    const client = new Client({
      brokerURL: "ws://localhost:8080/websocket", // 서버 WebSocket URL
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("conn");
        client.subscribe(`/topic/public`, (message) => {
          const msg = JSON.parse(message.body);
          setMessage((prevMessages) => [...prevMessages, msg]);
        });
      },
    });
    client.activate();

    setClient(client)


    // axios.get('http://localhost:8080')
    //   .then(response => setMessage(response.data))
    //   .catch(error => console.error(error));

    // const socket = new SockJS('http://localhost:8080/websocket');
    // const stompClient = new Client({
    //   webSocketFactory: () => socket,
    //   onConnect: () => {

    //     stompClient.subscribe('/topic/public', (messageOutput) => {
    //       if (!messageOutput) messageOutput = '';
    //       setMessage(messageOutput.body);
    //     });
    //     client.current = stompClient;
    //     console.log(client)
    //   },
    // });

    // stompClient.activate();

    // return () => {
    //   if (stompClient.connected) {
    //     stompClient.deactivate();
    //   }
    // };
  }, []);

  // const sendMessage = () => {
  //   console.log(client)
  //   // console.log(client.current.connected)
  //   if (client.current && client.current.connected) {
  //     const payload = JSON.stringify({ body: message });
  //     client.current.publish({ destination: "/app/send", body: payload });
  //   }
  // };

  // const debounce = (func, wait) => {
  //   return () => {
  //     clearTimeout(timeout.current);
  //     timeout.current = setTimeout(func, wait);
  //   };
  // };

  // const debouncedSend = debounce(sendMessage, 100);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
    // debouncedSend();
    client.publish({ destination: "/app/send", body: JSON.stringify(e.target.value) });

  };

  return (
    <textarea cols="50" rows="10" value={message} onChange={handleInputChange} />
  );
};

export default RealTimeMessaging;
