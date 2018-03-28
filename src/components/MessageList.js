import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: []
     };
    this.messagesRef = this.props.firebase.database().ref('messages');
  }

  handleChange() {
  }

  handleSubmit() {
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat( message ) })
    });
  }

  render() {
    const activeRoom = this.props.activeRoom;
    const messages = this.state.messages.filter(m => m.roomId === activeRoom.key);

    return(
      <section className="container-fluid bg-light h-100 p-4">
        <h2>{this.props.activeRoom ? this.props.activeRoom.name : 'Pick a room'}</h2>
        <hr className="chat-divider"></hr>
        {
          messages.map( (message, index) =>
            <p key={index}>{message.content}</p>
          )
        }
      </section>
    );
  }
}

export default MessageList;
