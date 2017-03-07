import React, {Component} from 'react';

class ChatBar extends Component {

  render() {
    let key = Math.floor(Math.random()*1000); 
    return (
      <footer className="chatbar" onKeyUp={this.props.handleSubmit} key={key}>
        <input 
          defaultValue={this.props.currentUser.name}
          className="chatbar-username" 
          placeholder="Your Name (Optional)" 
        />
        <input  
          className="chatbar-message"   
          placeholder="Type a message and hit ENTER" 
        />
      </footer>
    );
  }
}

            // onSubmit={this.props.handleSubmit(this.props.messages)} 
export default ChatBar;
