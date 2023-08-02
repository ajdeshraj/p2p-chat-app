import React, { useState} from 'react'
import io from 'socket.io-client'
import './App.css'
import './Chat'

const socket = io.connect('http:localhost:8000')

const App = () => {
    const [username, setUsername] = useState('')
    const [room, setRoom] = useState('')
    const [showChat, setShowChat] = useState(false)

    const joinRoom = () => {
        if (username !== '' && room !== '') {
            socket.emit('joinRoom', room)
            setShowChat(true)
        }
    }

    return (
        <div className='app'>
            {!showChat ? (
                <div className="joinChatContainer">
                    <h4>Join A Chat</h4>
                    <input 
                        type="text"
                        placeholder="Name"
                        onChange={(event) => {
                            setUsername(event.target.value)
                        }}
                    />
                    <input 
                        type="text"
                        placeholder="Peer ID"
                        onChange={(event) => {
                            setRoom(event.target.value)
                        }}
                    />
                    <button onClick={joinRoom}>Join</button>
                </div>
            ) : (
                <Chat socket={socket} username={username} room={room} />
            )}
        </div>
    )
}

export default App

    /*
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
*/
