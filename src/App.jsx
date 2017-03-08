import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {

  // this only sets things, it is static 
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"}, 
      messages: []
    };
    // sets the default state before anything happens
  }

  handleSubmit = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); 
      let newMessage = {
        username: this.state.currentUser.name,
        content: event.target.value
      };
      // let newMessageArr = this.state.messages.concat(newMessage) 
      this.socket.send(JSON.stringify(newMessage));
    }
  }

  // not all of these need to be used but this is the general skeleton for the whole process
  componentWillMount(){
    // might be good for fetching information before everything has loaded 
  }
  // delcaring of these built in function, they will run regardless of what I do, this just gives me the tools to overrite them 

  componentDidMount() {
    console.log('here')
    this.socket = new WebSocket("ws://localhost:5000"); 
    this.socket.onmessage = (event) => {
      console.log(concat(event.data))
      console.log('it reached here')
      this.setState(this.state.message.concat(event.data));
    };
    
  }

  socketSendReceive = () => {
    
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
        />
        <ChatBar 
          currentUser={this.state.currentUser}
          messages={this.state.messages}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

export default App;
