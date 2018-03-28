import React, { Component } from 'react';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import './App.css';
import * as firebase from 'firebase';

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCPlFmHHboebhgNVKq7Cv6N_eMh8wuHqUo",
    authDomain: "bloc-chat-react-4fa6b.firebaseapp.com",
    databaseURL: "https://bloc-chat-react-4fa6b.firebaseio.com",
    projectId: "bloc-chat-react-4fa6b",
    storageBucket: "bloc-chat-react-4fa6b.appspot.com",
    messagingSenderId: "37555993030"
  };
  firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRoom: ''
    };
  }

  setActiveRoom(room) {
    this.setState({ activeRoom: room });
  }

  render() {
    return (
      <div className="App container-fluid p-0 h-100">
        <div className="row p-0 h-100">
          <div className="col-4 p-0 h-100">
            <RoomList
              firebase={firebase}
              activeRoom={this.state.activeRoom}
              setActiveRoom={(room) => this.setActiveRoom(room)}
            />
          </div>
          <div className="col-8 p-0 h-100 bg-light">
            <section className="container">
              <MessageList
                firebase={firebase}
                activeRoom={this.state.activeRoom}
              />
            </section>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
