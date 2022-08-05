import React from 'react';
import { RoomInterface } from 'components/SideBar';
import Image from 'next/image';

type RoomProps = {
  room: RoomInterface;
  clickRoomHandle: (room_id: number, isChanel: boolean, name: string) => void;
};
const DIRECT_MESSAGE = 'Direct message';
const SIZE_OF_AVATAR_PROFILE: number = 42;
function Room({ room, clickRoomHandle }: RoomProps) {
  const chooseRoom = () => {
    const isChanel = room.type === DIRECT_MESSAGE ? false : true;
    clickRoomHandle(room.room_id, isChanel, room.name);
  };
  const renderTime = () => {
    const isToDay = room.last_time.getDate() === new Date().getDate()
    const timeString = room.last_time.toLocaleString().split(", ")
    if(isToDay) {
      return timeString[0]
    }
    return timeString[1]
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
