import React from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import cookie from 'cookie';
import { Link } from 'react-router-dom';
import RoomList from './RoomList';

const lobby = io('/lobby');

class Homepage extends React.Component {
  constructor() {
    super();
    this.state = {
      roomList: [],
      roomName: '',
      user: '',
    };
    this.createRoom = this.createRoom.bind(this);
    this.captureInput = this.captureInput.bind(this);
    this.onEnter = this.onEnter.bind(this);
  }

  componentDidMount() {
    if (cookie.parse(document.cookie).user) {
      this.setState({ user: cookie.parse(document.cookie).user });
    }
    this.fetchRooms();
    lobby.on('retrieveRooms', (rooms) => {
      this.setState({ roomList: rooms });
    });
  }

  onEnter(event) {
    if (event.key === 'Enter') {
      this.createRoom();
    }
  }

  fetchRooms() {
    axios.get('/fetchRooms')
      .then(({ data }) => this.setState({ roomList: data }));
  }

  createRoom() {
    lobby.emit('createRoom', this.state.roomName);
    // redirect to new room page
    this.setState({ roomName: '' });
  }

  captureInput(event) {
    this.setState({ roomName: event.target.value });
  }

  render() {
    const view = this.state.user ?
      <span className="login">Welcome, {this.state.user} <a href="/auth/logout">Logout</a></span> :
      <span className="login">Login with <a href="/auth/google">Google</a></span>;
    return (
      <div className="lobby">
        <div className="container navbar">
          <Link to='/'>
          fam.ly
          </Link>
          {view}
        </div>
        <div className="container rooms">
          <div>Listening Rooms</div>
          <RoomList
            rooms={this.state.roomList}
            createRoom={this.createRoom}
            roomName={this.state.roomName}
            captureInput={this.captureInput}
            onEnter={this.onEnter}
          />
        </div>
      </div>
    );
  }
}

export default Homepage;

// ReactDOM.render(<App />, document.getElementById('homepage'));
