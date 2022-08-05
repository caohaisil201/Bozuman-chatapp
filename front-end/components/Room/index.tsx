import React from 'react';
import { RoomInterface } from 'components/SideBar';
import Image from 'next/image';
import {useState} from 'react'
type RoomProps = {
  room: RoomInterface;
  clickRoomHandle: (room_id: number, isChanel: boolean, name: string) => void;
};
const SIZE_OF_AVATAR_PROFILE: number = 42;
function Room({ room, clickRoomHandle }: RoomProps) {
  const chooseRoom = () => {
    const isChanel = room.type === 'Direct message' ? false : true;
    clickRoomHandle(room.room_id, isChanel, room.name);
  };
  
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
          {room.last_time.getDate()===new Date().getDate()?
            (room.last_time.getHours()+":"+room.last_time.getMinutes()):
            (room.last_time.getDate()+"/"+room.last_time.getMonth())
          }
        </p>
        <p className="lastMessage">{room.last_message}</p>
      </div>
    </div>
  );
}

export default Room;
