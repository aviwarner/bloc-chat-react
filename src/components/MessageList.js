import React, { Component } from 'react';
import moment from 'moment';

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      newMessageText: ''
     };
    this.messagesRef = this.props.firebase.database().ref('messages');
  }

  handleChange(e) {
    this.setState({ newMessageText: e.target.value });
  }

  handleSubmit(e) {
    if (this.state.newMessageText) {
      this.messagesRef.push({
        content: this.state.newMessageText,
        roomId: this.props.activeRoom.key,
        username: this.props.currentUser,
        sentAt: Date.now()
      });
    }
    this.setState({newMessageText: ''});
    e.preventDefault();
  }

  delete(key) {
    const messages = this.state.messages;
    const m = messages.find(message => message.key === key);
    this.setState({ messages: messages.filter(message => message !== m) })
    return this.props.firebase.database().ref('messages/' + key).remove();
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
      <section className="container-fluid bg-light pt-1 px-0 chat-window">
        <div className="container-fluid p-4 pb-4 mb-5">
          <h3 className="pb-2">{this.props.activeRoom ? this.props.activeRoom.name : 'Pick a room'}</h3>
          {/* <hr className="chat-divider"></hr> */}
          <div className="table-responsive">
            <table className="table table-striped">
              <tbody>
                {
                  messages.map( (message, index) =>
                    <tr key={index}>
                      <td>
                        <small className="small text-muted">{message.username}</small><br />
                        {message.content}
                      </td>
                      <td className="small text-muted text-right">
                        {moment(message.sentAt).from(Date.now())}<br />
                        {message.username === this.props.currentUser ?
                          <p className="text-danger" onClick={() => this.delete(message.key)}>Delete?</p>
                          : ''}
                        </td>
                      </tr>
                  )
                }
              </tbody>
            </table>
          </div>
        </div>
        {activeRoom ?
          <footer className="footer container-fluid col-8 px-0">
            <div className="container messagebox mx-0">
              <form className="form-group row" onSubmit={ (e) => this.handleSubmit(e) }>
                <div className="col-10">
                  <input
                    type="text"
                    className="form-control"
                    id="newMessage"
                    placeholder="message text"
                    value={this.state.newMessageText}
                    onChange={ (e) => this.handleChange(e) }
                  />
                </div>
                <div className="col-2">
                  <input className="btn btn-info" id="newMessageSubmit" type="submit"  />
                </div>
              </form>
            </div>
          </footer>
        : ''}

      </section>
          );
          }
          }

          export default MessageList;
