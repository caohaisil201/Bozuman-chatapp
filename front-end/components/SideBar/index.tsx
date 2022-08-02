import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { deleteCookie } from 'cookies-next';
import { FaUserPlus, FaChevronDown, FaChevronUp, FaSignOutAlt } from 'react-icons/fa';
import PersonalRoom from 'components/PersonalRoom';
import GroupRoom from 'components/GroupRoom';
import axiosClient from 'helper/axiosClient';
import { Room } from 'hooks/useGetUserInfo';
const SIZE_OF_AVATAR_PROFILE: number = 50;



function SideBar() {
  const router = useRouter();
  const [fullname, setFullname] = useState('Vu Le Anh');
  const [showPersonalMessage, setShowPersonalMessage] = useState(true);
  const [showGroupMessage, setShowGroupMessage] = useState(true);
  const [personalRooms, setPersonalRooms] = useState<Array<Room>>([]);
  const [groupRooms, setGroupRooms] = useState<Array<Room>>([]);

  console.log('rerender');

  useEffect(()=>{
    async function getUserInfo() {
      try{
        const res = await axiosClient.get(`${process.env.NEXT_PUBLIC_DOMAIN}/api/user/user-info`);
        setFullname(res.data.data.full_name);
        const personalRoomsArr:Array<Room> = [];
        const groupRoomsArr:Array<Room> = [];
        const room_list = res.data.data.room_list;
        room_list.forEach((room:Room)=>{
          switch (room.type){
            case 'Direct message':
              personalRoomsArr.push(room);
              break;
            case 'Channel message':
              groupRoomsArr.push(room);
              break;
            default:
              break;
          }
        })
        console.log(personalRoomsArr, groupRoomsArr);

        setPersonalRooms(personalRoomsArr);
        setGroupRooms(groupRoomsArr);
      }catch (err) { 
      }
    } 

    getUserInfo();
  },[fullname,personalRooms.length,groupRooms.length])


  function handleShowPersonalMessage() {  
    setShowPersonalMessage((prevState) => !prevState);
  }

  function handleShowGroupMessage() {
    setShowGroupMessage((prevState) => !prevState);
  }

  function handleSignOut() {
    deleteCookie('access_token');
    deleteCookie('refresh_token');
    router.push('/sign-in');
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
        <FaSignOutAlt 
          className="iconSignOut"
          onClick={handleSignOut}
        />
      </div>
      <div className="searchAndAdd mt-1">
        <input className="search" type="text" placeholder="Search"></input>
        <FaUserPlus className="iconAdd" />
      </div>
      <div className="typeMessage mt-2">
        <div>
          Personal message
          {showPersonalMessage ? (
            <>
              <FaChevronUp
                className="iconScrollTypeMessage"
                onClick={handleShowPersonalMessage}
              />
              <PersonalRoom data={personalRooms} style={''}/>
            </>
          ) : (
            <FaChevronDown
              className="iconScrollTypeMessage"
              onClick={handleShowPersonalMessage}
            />
          )}
        </div>

        <div>
          Group message
          {showGroupMessage ? (
            <>
              <FaChevronUp
                className="iconScrollTypeMessage"
                onClick={handleShowGroupMessage}
              />
              <GroupRoom data={groupRooms} style={''} />
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
