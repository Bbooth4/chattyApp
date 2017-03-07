import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
// import Axious from 'axios';

class App extends Component {

  // this only sets things, it is static 
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"}, 
      messages: [
        {
          id: 1,
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          id: 2, 
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    };
    console.log('message state', this.state.currentUser)
    // sets the default state before anything happens
  }

  handleSubmit = (event) => {
    console.log(event.key)
    if (event.key === 'Enter') {
      // ... adds all other objects within the messages object
      event.preventDefault(); 
      let messages = [...this.state.messages, {
        username: this.state.currentUser.name,
        content: event.target.value
      }];
      this.setState({messages});
    }
  }

  // not all of these need to be used but this is the general skeleton for the whole process
  componentWillMount(){
    // might be good for fetching information before everything has loaded 
    console.log('componentWillMount');
  }
  // delcaring of these built in function, they will run regardless of what I do, this just gives me the tools to overrite them 

  componentDidMount() {
    // means that the component is created from the constructor, this is before the user ever sees it, essentially 
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      this.setState({messages})
    }, 3000);
  }
  
  // gives you a say about when the components will update (if you do not want it to update all the time, then set it to only do so after a certain criteria has been satisfied)
  componentWillUpdate(nextProps, nextState){
    console.log('componentWillUpdate', nextProps, nextState);
  }

  componentDidUpdate(prevProps, prevState){
    // might run whenever any states changes || any props are changed
    console.log('componentDidUpdate', prevProps, prevState);
  }

  componentWillReceiveProps(){
    // if any any props are changed
    console.log('componentWillReceiveProps');
  }

  componentWillUnmount(){
    // the component is about to be deleted 
    console.log('componentWillUnmount');
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
