import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import Notifications from './Notifications.jsx';

class App extends Component {

  // this only sets things, it is static 
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: 'Bob'},
      messages: []
    };
    // sets the default state before anything happens
  }

  handleSubmitContent = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); 
      let newMessage = {
        type: 'post-new-message',
        username: this.state.currentUser.name,
        content: event.target.value
      };
      this.socket.send(JSON.stringify(newMessage)); 
    }
  }

  handleNotifications = (event) => {
    console.log(this.state.currentUser.name, event.target.value)
    if (event.key === 'Enter') {
      event.preventDefault(); 
      let notification = {
        type: 'post-notification',
        notification: `${this.state.currentUser.name} changed their name to ${event.target.value}`,
        name: event.target.value
      }
      this.socket.send(JSON.stringify(notification));
    }
    // let newUser = {
     
    // }
    // this.socket.send(JSON.stringify(newUser)); 
  }

  // not all of these need to be used but this is the general skeleton for the whole process
  componentWillMount(){
    // might be good for fetching information before everything has loaded 
  }
  // delcaring of these built in function, they will run regardless of what I do, this just gives me the tools to overrite them 

  componentDidMount() {
    console.log('reached didMount');
    this.socket = new WebSocket("ws://localhost:5000"); 
    this.socket.onmessage = (event) => {
      console.log('received object', event.data)
      console.log('it did mount')
      let parsedMessage = JSON.parse(event.data);
      console.log('parsed message', parsedMessage)
      
      switch (parsedMessage.type) {
        case 'post-new-message':
          this.setState({ 
            messages: this.state.messages.concat(parsedMessage)
          });
          break;

        case 'incoming-notification':
          console.log('inside incoming-notification',parsedMessage);
          let newUser = this.state.currentUser;
          console.log('newUser', newUser)
          newUser.name = parsedMessage.name;
          newUser.id = parsedMessage.id;
          this.setState({
            id: newUser.id,
            name: newUser.name,
            notification: parsedMessage.notification 
          })
          break;
        default: 
          console.error('Failed to send back'); 
      }
      console.log(this.state)
    };
    
  } 

  // gives you a say about when the components will update (if you do not want it to update all the time, then set it to only do so after a certain criteria has been satisfied)
  componentWillUpdate(nextProps, nextState){
    // console.log('componentWillUpdate', nextProps, nextState);
  }

  componentDidUpdate(prevProps, prevState){
    // might run whenever any states changes || any props are changed
    // console.log('componentDidUpdate', prevProps, prevState);
  }

  componentWillReceiveProps(){
    // if any any props are changed
    // console.log('componentWillReceiveProps');
  }

  componentWillUnmount(){
    // the component is about to be deleted 
    // console.log('componentWillUnmount');
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList 
          messages={this.state.messages}
          notif={this.state.notification}
        />
        <ChatBar 
          currentUser={this.state.currentUser}
          messages={this.state.messages}
          handleNotifications={this.handleNotifications}
          handleSubmitContent={this.handleSubmitContent}
        />
      </div>
    );
  }
}

export default App;
