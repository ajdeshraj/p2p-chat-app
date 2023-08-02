import React, { Component } from 'react'
import './ChatContainer.css'

class ChatContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inputMsg: ''
        }
    }

    generateChats = () => {
        if (this.chatContainer) {
            setTimeout(() => {
                this.chatContainer.scrollTop = this.chatContainer.scrollHeight
            }, 2)
        }

        return this.props.chatLog.map((item) => {
            <div className="chat" key={`chat-${item.name}-${item.timestamp}`}>
                <b className="name">{item.name}</b> <span className="msg">{item.message}</span>
            </div>
        })
    }

    handleSend = (chatMsg) => {
        this.props.onSend(chatMsg)
    }

    handleKeyUp = (e) => {
        if (e.keyCode === 13) {
            this.handleSend(this.state.inputMsg)
            this.setState({ inputMsg: ''})
        }
    }

    handleInputChange = (e) => this.setState({inputMsg: e.target.value})

    render() {
        const { chatLog } = this.props;
        return (
            <div className="container">
                <div className="chatContainer" ref={(div) => this.chatContainer = div}>
                    {chatLog.length ? this.generateChats() : (
                        <div className="info">
                            <p></p>
                        </div>
                    )}
                </div>
                <hr />
                <div className="bottomBar">
                    <input className="chatInput" type="text" placeholder="Message" onKeyUp={this.handleKeyUp} onChange={this.handleInputChange} value={this.state.inputMsg} />
                </div>
            </div>
        )
    }
}

export default ChatContainer
