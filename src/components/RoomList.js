import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = { rooms: [] };
    this.roomsRef = this.props.firebase.database().ref('rooms');
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
      </section>
    );
  }
}

export default RoomList;
