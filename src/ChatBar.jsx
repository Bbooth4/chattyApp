import React, {Component} from 'react';

class ChatBar extends Component {

  render() {
    return (
      <footer className="chatbar">
        <input 
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
