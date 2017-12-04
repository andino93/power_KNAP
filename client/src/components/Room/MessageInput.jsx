import React from 'react';
import PropTypes from 'prop-types';
import { Picker } from 'emoji-mart';

class MessageInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      showPicker: false,
    };
    this.setMessage = this.setMessage.bind(this);
    this.enterMessage = this.enterMessage.bind(this);
  }

  setMessage(event) {
    const pressedEnter = event.key === 'Enter';
    if (pressedEnter) {
      const time = new Date().toLocaleTimeString();
      this.props.sendMessage(time, this.state.message);
      this.clear();
      // this.setState({
      //   typing = null;
      // })
    }
  }

  enterMessage(event) {
    // const userTyping = 'user typing message...';
    this.props.typingMessage();
    this.setState({
      message: event.target.value,
    });
  }

  clear() {
    this.setState({
      message: '',
    });
  }

  addEmoji(emote) {
    this.setState({
      message: this.state.message.concat(emote),
    });
  }

  showEmojiPicker() {
    this.setState({ showPicker: !this.state.showPicker });
  }

  render() {
    const style = {
      position: 'absolute',
      bottom: '50px',
      right: '20px',
      height: '300px',
      overflow: 'auto',
    };

    return (
      <div className="message-imput-stuff">
        <div className="emoji-picker">
          {this.state.showPicker &&
            <div className="inner-picker">
              <Picker
                style={style}
                onClick={emoji => this.addEmoji(emoji.native)}
                perLine={6}
                showPreview={false}
              />
            </div>}
        </div>
        <div className="inputBoxes">
          <div
            className="userTyping"
          >
            {this.props.typing}
          </div>
          <input
            type="text"
            className="messageText"
            placeholder="Enter message"
            onKeyUp={this.setMessage}
            onChange={e => this.enterMessage(e)}
            value={this.state.message}
          />
          <button className="emojiButton" onClick={() => this.showEmojiPicker()}>=)</button>
        </div>
      </div>
    );
  }
}

MessageInput.propTypes = {
  sendMessage: PropTypes.func.isRequired,
  typingMessage: PropTypes.func.isRequired,
  typing: PropTypes.string.isRequired,
};

export default MessageInput;
