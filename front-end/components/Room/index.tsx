import React from 'react';
import { Room } from 'hooks/useGetUserInfo';
import Image from 'next/image';

type RoomProps = {
  room: Room,
  mapKey: string,
  clickHandle: (room_id: number, isChanel: boolean, name:string)=>void
};
const SIZE_OF_AVATAR_PROFILE: number = 42;
function Room({room, mapKey, clickHandle}:RoomProps) {
  const choseRoom = () => {
    const isChanel = room.type === 'Direct message' ? false : true
    clickHandle(room.room_id, isChanel, room.name)
  }
  return (
    <div
      className={room.unread ? 'room room_active' : 'room'}
      key={mapKey} onClick={choseRoom}
    >
      <Image
        src="/avatar.png"
        alt="avatar"
        width={SIZE_OF_AVATAR_PROFILE}
        height={SIZE_OF_AVATAR_PROFILE}
      />
      <div className="room_info">
        <p className="roomName">{room.name}</p>
        <p className="lastTime">
          {new Date(room.last_time).getHours()}:
          {new Date(room.last_time).getMinutes()}
        </p>
        <p className="lastMessage">{room.last_message}</p>
      </div>
    </div>
  );
}

export default Room;
