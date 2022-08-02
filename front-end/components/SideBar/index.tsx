import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { deleteCookie } from 'cookies-next';
import {
  FaUserPlus,
  FaChevronDown,
  FaChevronUp,
  FaSignOutAlt,
} from 'react-icons/fa';
import axiosClient from 'helper/axiosClient';
import Room from 'components/Room';

const SIZE_OF_AVATAR_PROFILE: number = 50;

export interface RoomInterface {
  room_id: number;
  last_message: string;
  last_time:Date;
  unread: boolean;
  name: string;
  type: string;
}

type SideBarProps = {
  selectRoom: (room_id: number, isChanel: boolean, roomName:string, username: string | undefined)=> void;
};

function SideBar({selectRoom} : SideBarProps) {
  const router = useRouter();
  const [fullname, setFullname] = useState('');
  const [showPersonalMessage, setShowPersonalMessage] = useState(true);
  const [showGroupMessage, setShowGroupMessage] = useState(true);
  const [personalRooms, setPersonalRooms] = useState<Array<RoomInterface>>([]);
  const [groupRooms, setGroupRooms] = useState<Array<RoomInterface>>([]);
  const [username, setUsername] = useState<string>()
  useEffect(() => {
    async function getUserInfo() {
      try {
        const {data} = await axiosClient.get(
          `${process.env.NEXT_PUBLIC_DOMAIN}/api/user/user-info`
        );
        setFullname(data.data.full_name);
        setUsername(data.data.username)
        const room_list = data.data.room_list;
        const personalRoomsArr: Array<RoomInterface> = [];
        const groupRoomsArr: Array<RoomInterface> = [];
        room_list.forEach((room: RoomInterface) => {
          switch (room.type) {
            case 'Direct message':
              personalRoomsArr.push(room);
              break;
            case 'Channel message':
              groupRoomsArr.push(room);
              break;
            default:
              break;
          }
        });
        setPersonalRooms([...personalRoomsArr]);
        setGroupRooms([...groupRoomsArr]);
      } catch (err) {}
    }
    getUserInfo();
  }, []);

  function handleShowPersonalMessage() {
    setShowPersonalMessage((prevState) => !prevState);
  }

  function handleShowGroupMessage() {
    setShowGroupMessage((prevState) => !prevState);
  }

  function handleSignOut() {
    deleteCookie('access_token');
    deleteCookie('refresh_token');
    deleteCookie('username');
    router.push('/sign-in');
  }

const clickRoomHandle = (room_id: number, isChanel: boolean, roomName:string) => {
  selectRoom(room_id, isChanel, roomName, username)
}

  return (
    <div className="sidebar">
      <div className="header">
        <div className="personalInfo">
          <Image
            src="/avatar.png"
            alt="avatar"
            width={SIZE_OF_AVATAR_PROFILE}
            height={SIZE_OF_AVATAR_PROFILE}
          />
          <div className="info">
            <p className="name">{fullname}</p>
            My account
          </div>
        </div>
        <FaSignOutAlt className="iconSignOut" onClick={handleSignOut} />
      </div>
      <div className="typeMessage mt-2">
        <div className="roomList">
          Personal message
          {showPersonalMessage ? (
            <>
              <FaChevronUp
                className="iconScrollTypeMessage"
                onClick={handleShowPersonalMessage}
              />
              <div className="showRoomPanel">
                {personalRooms.map((room, index) => (
                  <Room room={room} mapKey={`personalRooms ${index}`} clickRoomHandle={clickRoomHandle}/>
                ))}
              </div>
            </>
          ) : (
            <FaChevronDown
              className="iconScrollTypeMessage"
              onClick={handleShowPersonalMessage}
            />
          )}
        </div>

        <div className="roomList">
          Group message
          {showGroupMessage ? (
            <>
              <FaChevronUp
                className="iconScrollTypeMessage"
                onClick={handleShowGroupMessage}
              />
              <div className="showRoomPanel">
                {groupRooms.map((room, index) => (
                  <Room room={room} mapKey={`groupRooms ${index}`} clickRoomHandle={clickRoomHandle}/>
                ))}
              </div>
            </>
          ) : (
            <FaChevronDown
              className="iconScrollTypeMessage"
              onClick={handleShowGroupMessage}
            />
          )}
        </div>
      </div>
      <p className="copyRight">Copyright 2022 All Rights Reserved Bozuman </p>
    </div>
  );
}

export default SideBar;
