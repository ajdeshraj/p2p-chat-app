import React, { useState, useEffect, useRef } from 'react'
import './App.css'

const App = () => {
    const [message, setMessage] = useState('')
    const [chatHistory, setChatHistory] = useState([])
    const messageListRef = useRef(null)

    // Simulating Messages from other user
    useEffect(() => {
        const timer = setInterval(() => {
            const randomMessage = `Incoming message ${chatHistory.length + 1}`
            setChatHistory((prevHistory) => [...prevHistory, randomMessage])
        }, 10000) // Simulating new message every 10 seconds

        return () => clearInterval(timer)
    }, [chatHistory])

    const handleSendMessage = (e) => {
        e.preventDefault()
        if (message.trim() !== '') {
            // Here you can implement your logic to send messages to other peers via holepunch
            setChatHistory((prevHistory) => [...prevHistory, `You: ${message}`])
            setMessage('')
        }
    }

    // Adding autoscroll to automate scrolling to bottom when new message is sent 
    useEffect(() => {
        messageListRef.current.scrollTop = messageListRef.current.scrollHeight
    }, [chatHistory])

    return (
        <div className="app">
            <h1>Peer-to-Peer Chat</h1>
            <div className="chat-box" ref={messageListRef}>
                {chatHistory.map((msg, index) => (
                  <div key={index} className="message">
                    {msg}
                  </div>
                ))}
            </div>
            <form onSubmit={handleSendMessage} className="message-form">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Message"
                />
                <button type="submit">Send</button>
            </form>
        </div>
  )
}

export default App;
