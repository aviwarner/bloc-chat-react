import React, { Component } from 'react';

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };

    this.props.firebase.auth().onAuthStateChanged( user =>
      {this.props.setUser(user);
    });
  }

  handleChange() {
  }

  handleSubmit() {
  }

  componentDidMount() {
  }

  render() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();

    return(
      <div className="nav-user">
        <ul className="navbar-nav mr-auto">
          <li>
            <p className="nav-item navbar-text text-light mr-3">{this.props.currentUser}</p>
          </li>
          {
            this.props.currentUser === 'Guest' ?
              <li>
                <button className="btn nav-item btn-primary" onClick={() => this.props.firebase.auth().signInWithPopup( provider )}>Log in</button>
              </li> :
            <li>
              <button className="btn btn-warning nav-item" onClick={() => this.props.firebase.auth().signOut( )}>Sign Out</button>
            </li>
          }
        </ul>
      </div>
    );
  }
}

export default User;
