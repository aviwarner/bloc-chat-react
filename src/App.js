import React, { Component } from 'react';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';
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
      activeRoom: '',
      currentUser: ''
    };
  }

  setUser(user) {
    this.setState({ currentUser: user ? user.displayName : "Guest"});
  }

  setActiveRoom(room) {
    this.setState({ activeRoom: room });
  }

  render() {
    return (
      <div className="App container-fluid p-0 h-100">
        <nav className="navbar navbar-dark bg-dark navbar-expand-sm fixed-top justify-content-between">
          <a className="navbar-brand" href="/">Bloc Chat: React</a>
          <User
            firebase={firebase}
            currentUser={this.state.currentUser}
            setUser={(user) => this.setUser(user)}
          />
        </nav>
        <div className="row p-0 h-100">
          <div className="col-4 p-0 h-100">
            <RoomList
              firebase={firebase}
              activeRoom={this.state.activeRoom}
              setActiveRoom={(room) => this.setActiveRoom(room)}
            />
          </div>
          <div className="col-8 p-0 h-100 bg-light">
            <section className="container-fluid px-0 h-100">
              <MessageList
                firebase={firebase}
                activeRoom={this.state.activeRoom}
                currentUser={this.state.currentUser}
              />
            </section>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
