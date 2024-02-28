import React, { useEffect, useRef, useState } from 'react';
import { Client } from '@stomp/stompjs';

const emojis = ['🐱', '🐶', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🐸', '🐵'];

const Messaging = () => {
    const [messages, setMessages] = useState([]);
    const messageInput = useRef();

    useEffect(() => {
        const stompClient = new Client({
            brokerURL: 'ws://localhost:8080/websocket',
            onConnect: frame => {
                stompClient.subscribe('/topic/public2', function (messageOutput) {
                    const messageBody = JSON.parse(messageOutput.body);
                    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
                    setMessages((prevMessages) => [...prevMessages, `${randomEmoji} ${messageBody.message}`]);
                });
            },
        });

        stompClient.activate();

        const sendMessage = ()=>  {
            if (messageInput.current.value) {
                stompClient.publish({ destination: "/app/send2", body: JSON.stringify({ message: messageInput.current.value }) });
                messageInput.current.value = '';
            }
        }

        return () => {
            if (stompClient.connected) {
                stompClient.deactivate();
            }
        }
    }, []);

    return (
        <div>
            <div id="messageArea" className="message-area">
                <ul>
                    {messages.map((message, index) => <li key={index}>{message}</li>)}
                </ul>
            </div>
            <div className="input-area">
                <textarea ref={messageInput} />
                <button onClick={sendMessage}>전송</button>
            </div>
        </div>
    );
}

export default Messaging;
