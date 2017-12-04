import React from 'react';
import PropTypes from 'prop-types';

import MessageInput from './MessageInput';
import Messages from './Messages';

class ChatView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    };
    this.sendMessage = this.sendMessage.bind(this);
  }

  componentWillReceiveProps({ message }) {
    if (message !== null) {
      if (this.state.messages.length > 0) {
        if (message.dateTime !== this.state.messages[this.state.messages.length - 1].date) {
          this.setState({
            messages: this.state.messages.concat({
              message: message.body,
              username: message.userName,
              date: message.dateTime,
              color: message.userColor,
            }),
          });
        }
      } else {
        this.setState({
          messages: this.state.messages.concat({
            message: message.body,
            username: message.userName,
            date: message.dateTime,
            color: message.userColor,
          }),
        });
      }
    }
  }

  sendMessage(time, message) {
    this.props.emitMessage(time, message);
  }

  render() {
    return (
      <div className="container userChat">
        <h3>Chat Box</h3>
        <div className="chatscroll">
          <div className="messageContainer">
            <Messages messages={this.state.messages} />
          </div>
        </div>
        <div className="messageInput">
          <MessageInput
            sendMessage={this.sendMessage}
            typingMessage={this.props.broadcastTyping}
            typing={this.props.typing}
          />
        </div>
      </div>
    );
  }
}

ChatView.propTypes = {
  emitMessage: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  broadcastTyping: PropTypes.func.isRequired,
  typing: PropTypes.string.isRequired,
};

export default ChatView;
