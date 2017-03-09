import React, {Component} from 'react';
import Message from './Message.jsx';
// import Notifications from './Notifications.jsx';

class MessageList extends Component {

  render() { 
    return (
      <main className="messages">
         {
          this.props.messages.map((e, i) => {
            return <Message message={e} key={i}/>
          })
        }
        <div className="message system">
          {this.props.notification.notification}
        </div>
      </main>
    );
  }
}
          // <Notifications notifs={this.props.notif} />

export default MessageList;