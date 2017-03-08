import React, {Component} from 'react';
import Message from './Message.jsx';

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
          Anonymous1 changed their name to nomnom.
        </div>
      </main>
    );
  }
}

export default MessageList;