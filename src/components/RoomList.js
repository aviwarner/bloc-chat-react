import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      newName: ''
     };
    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  handleChange(e) {
    this.setState({ newName: e.target.value });
  }

  handleSubmit(e) {
    this.roomsRef.push({
      name: this.state.newName
    });
    this.state.newName = '';
    e.preventDefault();
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) })
    });
  }

  render() {
    return(
      <section className="container-fluid bg-secondary text-light h-100 p-4 pl-5">
        <h2>Chat Rooms</h2>
        <hr className="room-divider"></hr>
        {
          this.state.rooms.map( (room, index) =>
            <h4 key={index} className="room-list-item">{room.name}</h4>
          )
        }
        <hr className="room-divider"></hr>
        <div>
          <form className="form-inline form-group" onSubmit={ (e) => this.handleSubmit(e) }>
            <label for="new-room-name">Create a new room</label>
            <input
              type="text"
              id="new-room-name"
              className="form-control mr-2"
              placeholder="Enter Name"
              value={ this.state.newName }
              onChange={ (e) => this.handleChange(e) }
            />
            <input className="btn btn-info" type="submit" />
          </form>
        </div>
      </section>
    );
  }
}

export default RoomList;
