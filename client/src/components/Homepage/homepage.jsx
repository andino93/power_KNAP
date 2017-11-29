import React from 'react';
import { Link } from 'react-router-dom';
import Search from '../Room/Search';
import RoomList from './RoomList';
import Sidebar from './Sidebar';

// const lobby = io('/lobby');

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomList: ['Room1', 'Room2', 'Room3'],
    };
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <Link to='/room'>Room</Link>
        <h1>Fam.ly</h1>
        <Search />
        <RoomList rooms={this.state.roomList} />
        <Sidebar />
      </div>
    );
  }
}

export default Homepage;
