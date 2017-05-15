import React, {Component} from 'react';

class ChatBar extends Component {

  render() {
    return (
      <footer className="chatbar">
        <input
          onChange={this.props.checkIfEmpty}
          onKeyUp={this.props.handleNotifications}
          defaultValue={this.props.currentUser.name}
          className="chatbar-username"
          placeholder="Your Name (Optional)"
        />
        <input
          onKeyUp={this.props.handleSubmitContent}
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
        />
      </footer>
    );
  }
}

export default ChatBar;