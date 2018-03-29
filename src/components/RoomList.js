import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      newName: ''
      // activeRoom: ''
     };
    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  handleChange(e) {
    this.setState({ newName: e.target.value });
  }

  handleSubmit(e) {
    if (this.state.newName) {
      this.roomsRef.push({
        name: this.state.newName
      });
    }
    this.setState({newName: ''});
    e.preventDefault();
    document.getElementById("newRoomCancel").click();
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
        <h3>Chat Rooms</h3>

        {/* room list */}
        <hr className="room-divider"></hr>
        {
          this.state.rooms.map( (room, index) =>
            <h4 key={index} className={"room-list-item " + (room.key === this.props.activeRoom.key ? 'active-room' : '')} onClick={() => this.props.setActiveRoom(room)}>{(room.key === this.props.activeRoom.key ? '> ' : '') + room.name}</h4>
            )
            }
            <hr className="room-divider"></hr>

            {/* new room modal button  */}
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#newRoomModal">
              Create a new room
            </button>

            {/* new room modal */}
            <div className="modal fade" id="newRoomModal" tabIndex="-1" role="dialog" aria-labelledby="newRoomModalLabel" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h4 className="modal-title text-dark" id="exampleModalLabel">Create a new room</h4>
                  </div>
                  <div className="modal-body">
                    <form className="" onSubmit={ (e) => this.handleSubmit(e) }>
                      <div className="form-group">
                        <input
                          type="text"
                          id="new-room-name"
                          aria-describedby="room-name-help"
                          className="form-control mr-2"
                          placeholder="Enter Name"
                          maxLength="25"
                          value={ this.state.newName }
                          onChange={ (e) => this.handleChange(e) }
                        />
                        <small id="room-name-help" className={'form-text ' + (this.state.newName.length === 25 ? 'text-danger' : 'text-muted ')}>{this.state.newName.length}/25 {(this.state.newName.length === 25) ? ' - Please keep it under 25 characters.' : ''}</small>
                      </div>
                      <div className="form-group">
                        <button id="newRoomCancel" type="button" className="btn btn-secondary mr-2" data-dismiss="modal">Cancel</button>
                        <input className="btn btn-info" id="newRoomSubmit" type="submit"  />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
    );
  }
}

export default RoomList;
