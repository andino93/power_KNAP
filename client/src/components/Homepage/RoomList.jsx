import React from 'react';
import PropTypes from 'prop-types';
import RoomListEntry from './RoomListEntry.jsx';

const RoomList = ({ rooms, createRoom, roomName, captureInput, onEnter }) => (
  <div className="container room-list">
    <div className="container lobby-room create">
      <input placeholder="Room name" value={roomName} onChange={captureInput} onKeyUp={onEnter}/>
      <button onClick={createRoom}>Create a room!</button>
      {rooms.map((room, index) => <RoomListEntry room={room} key={index} />)}
    </div>
  </div>
);

RoomList.propTypes = {
  rooms: PropTypes.instanceOf(Array).isRequired,
};

export default RoomList;
