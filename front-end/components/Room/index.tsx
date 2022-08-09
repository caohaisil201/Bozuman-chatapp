import React from 'react';
import { _VAR } from 'constant/variables';
import { RoomInterface } from 'components/SideBar';
import Image from 'next/image';

type RoomProps = {
  room: RoomInterface;
  clickRoomHandle: (room_id: number, isChanel: boolean, name: string) => void;
};

function Room({ room, clickRoomHandle }: RoomProps) {
  const chooseRoom = () => {
    const isChanel = room.type === _VAR.DIRECT_ROOM_TYPE ? false : true;
    clickRoomHandle(room.room_id, isChanel, room.name);
  };

  const renderTime = () => {
    return room.last_time.getDate() === new Date().getDate()
      ? room.last_time.toTimeString().split(' ')[0]
      : room.last_time.toDateString().slice(4);
  }
  
  return (
    <div
      className={'room ' + (room.unread ? 'room_unread' : '')}
      onClick={chooseRoom}
    >
      <Image
        src="/avatar.png"
        alt="avatar"
        width={_VAR.AVATAR_SIZE}
        height={_VAR.AVATAR_SIZE}
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
