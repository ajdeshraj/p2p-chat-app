import React, {useState, useEffect, useRef} from 'react'

function Chat({socket, username, room}) {
    const [message, setMessage] = useState('')
    const [chatHistory, setChatHistory] = useState([])
    const messageListRef = useRef(null)

    // Sending message
    const sendMessage = async () => {
        if (message != '') {
            const messageData = {
                room: room,
                author: username,
                message: message,
                time: new Date(Date.now()).getHours()+':'+new Date(Date.now()).getMinutes()
            }

            await socket.emit('sendMessage', messageData)
            setChatHistory((history) => [...history, messageData])
            setMessage = ''
        }
    }

    // Receiving message 
    useEffect(() => {
        socket.on('receiveMessage', (data) => {
            setChatHistory((history) => [...history, data]),
            setMessage('')
        })
    }, [socket])

    // Adding autoscroll to automate scrolling to bottom when new message is sent 
    useEffect(() => {
        messageListRef.current.scrollTop = messageListRef.current.scrollHeight
    }, [chatHistory])

    return (
        <div className="chat-container">
            <div className="chat-header">
                <h1>Peer-to-Peer Chat</h1>
            </div>
            <div className="chat-box">
                {chatHistory.map((messageContent) => {
                    return (
                        <div className="message" id={username === messageContent.author ? 'you' : 'other'}>
                            <div className="message-content">
                                <p>{messageContent.message}</p>
                            </div>
                            <div className="message-meta">
                                <p id="author">{messageContent.author}</p>
                                <p id="time">{messageContent.time}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="chat-footer">
                <input type="text" value={message} placeholder="Message" onChange={(event) => { setMessage(event.target.value) }} onKeyPress={(event) => { event.key === 'Enter' && sendMessage() }} />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    )
}

export default Chat
