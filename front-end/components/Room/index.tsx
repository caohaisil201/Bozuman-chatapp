import React from 'react';
import { RoomInterface } from 'components/SideBar';
import Image from 'next/image';

type RoomProps = {
  room: RoomInterface;
  clickRoomHandle: (room_id: number, name: string) => void;
};

const SIZE_OF_AVATAR_PROFILE: number = 42;
function Room({ room, clickRoomHandle }: RoomProps) {
  const chooseRoom = () => {
    clickRoomHandle(room.room_id, room.name);
  };
  const renderTime = () => {
    const isToDay = room.last_time.getDate() === new Date().getDate()
    if(isToDay) {
      
      return room.last_time.toTimeString().split(" ")[0]
    }
    return room.last_time.toDateString()

  }
  return (
    <div
      className={'room ' + (room.unread ? 'room_unread' : '')}
      onClick={chooseRoom}
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
          {renderTime()}
        </p>
        <p className="lastMessage">{room.last_message}</p>
      </div>
    </div>
  );
}

export default Room;
