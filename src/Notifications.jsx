import React, {Component} from 'react';

class Notifications extends Component {

  render() {
    return (
      <div className="message">
        <div>
          {this.props.notifs}  
        </div>
      </div>
    );
  }
}

export default Notifications;