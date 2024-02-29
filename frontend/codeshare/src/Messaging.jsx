import React, { useEffect, useRef, useState } from 'react';
import { Client } from '@stomp/stompjs';

const emojis = ['🐱', '🐶', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🐸', '🐵'];

const Messaging = () => {
    const [messages, setMessages] = useState([]);
    const messageInput = useRef();
    const stompClient = useRef();

    useEffect(() => {
        stompClient.current = new Client({
            brokerURL: 'ws://localhost:8080/websocket',
            onConnect: frame => {
                stompClient.current.subscribe('/topic/public2', function (messageOutput) {
                    const messageBody = JSON.parse(messageOutput.body);
                    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
                    setMessages((prevMessages) => [...prevMessages, `${randomEmoji} ${messageBody.message}`]);
                });
            },
        });

        stompClient.current.activate();

        return () => {
            if (stompClient.current.connected) {
                stompClient.current.deactivate();
            }
        }
    }, []);

    const sendMessage = () => {
        if (messageInput.current.value) {
            stompClient.current.publish({ destination: "/app/send2", body: JSON.stringify({ message: messageInput.current.value }) });
            messageInput.current.value = '';
        }
    }

    return (
        <div className='flex flex-col h-screen bg-gray-100'>
            <div id="messageArea" className="overflow-auto flex-grow p-4">
                <ul className='space-y-2'>
                    {messages.map((message, index) => <li key={index} className='p-2 bg-white rounded shadow'>{message}</li>)}
                </ul>
            </div>
            <div className="relative flex items-center p-2">
                <textarea className='w-full pr-20 resize-none p-2 rounded shadow-inner' ref={messageInput} />
                <button className='absolute right-2 border-black p-2 bg-blue-500 text-white rounded shadow' onClick={sendMessage}>전송</button>
            </div>
        </div>
    );
}

export default Messaging;
