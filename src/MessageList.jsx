import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {

  render() { 
    return (
      <main className="messages">
         {
          this.props.messages.map((e) => {
            return <Message message={e} key={e.id}/>
          })
        }
        <div className="message system">
          Anonymous1 changed their name to nomnom.
        </div>
      </main>
    );
  }
}

export default MessageList;