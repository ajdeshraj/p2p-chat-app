import React, { useState, useEffect } from 'react'
import './App.css'

const App = () => {
    const [message, setMessage] = useState('')
    const [chatHistory, setChatHistory] = useState([])

    // Simulating Messages from other user
    useEffect(() => {
        const timer = setInterval(() => {
            const randomMessage = `Incoming message ${chatHistory.length + 1}`
            setChatHistory((prevHistory) => [...prevHistory, randomMessage])
        }, 3000) // Simulating new message every 3 seconds

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

    return (
        <div className="app">
            <h1>Peer-to-Peer Chat</h1>
            <div className="chat-box">
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
