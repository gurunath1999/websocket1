import { useRecoilState } from "recoil";
import { messageState } from "./atom";
import { useEffect, useState } from "react";

function Chat() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8080');
        setSocket(ws);

        ws.onmessage = (message) => {

            setMessages((prev) => [...prev,message.data]); // Fixed here
        };

        return () => {
            ws.close(); // Clean up the WebSocket connection on unmount
        };
    }, []);

    function send() {
        if (socket && message) {
            socket.send(message);
            setMessage(''); // Clear the input after sending
        }
    }

    return (
        <>
        <input
            type="text"
            placeholder="Enter message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                width: '300px',
                marginRight: '10px',
                fontSize: '16px',
            }}
        />
        <button
            onClick={send}
            style={{
                padding: '10px 20px',
                borderRadius: '5px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                fontSize: '16px',
            }}
        >
            Send
        </button>
        <br /><br />
        <div style={{ marginTop: '20px' }}>
            <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
                {messages.map((x, index) => (
                    <li
                        key={index}
                        style={{
                            backgroundColor: '#f1f1f1',
                            padding: '10px',
                            borderRadius: '5px',
                            marginBottom: '10px',
                            fontSize: '16px',
                            maxWidth: '400px',
                        }}
                    >
                        {x}
                    </li>
                ))}
            </ul>
        </div>
    </>
    
    );
}

export default Chat;
