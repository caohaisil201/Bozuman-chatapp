import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { deleteCookie } from 'cookies-next';
import { FaUserPlus, FaChevronDown, FaChevronUp, FaSignOutAlt } from 'react-icons/fa';
import PersonalRoom from 'components/PersonalRoom';
import GroupRoom from 'components/GroupRoom';
import axiosClient
 from 'helper/axiosClient';
const SIZE_OF_AVATAR_PROFILE: number = 50;

function SideBar() {
  const router = useRouter();
  const [name, setName] = useState('Vu Le Anh');
  const [showPersonalMessage, setShowPersonalMessage] = useState(true);
  const [showGroupMessage, setShowGroupMessage] = useState(true);
  const [dataUser,setDataUser] = useState({});

  useEffect(()=>{
    async function getUserInfo() {
       try{
          const res = await axiosClient.get(`${process.env.NEXT_PUBLIC_DOMAIN}/api/user/user-info`);
          console.log(res);
       }catch (err) {
          console.log(err);
       }
    } 
    getUserInfo();
  },[])

  // const personalRooms = ():Array<Room> => {
  //    const personalRooms:Array<Room> = [];
  //    dataUser.room_list.forEach((room:Room)=>{
  //       if (room.type=="Direct Message") personalRooms.push(room);
  //    })
  //    return personalRooms;
  // }
  
  // const groupRooms = ():Array<Room> => {
  //    const groupRooms:Array<Room> = [];
  //    dataUser.room_list.forEach((room:Room)=>{
  //       if (room.type="Channel message") groupRooms.push(room);
  //    })
  //    return groupRooms;
  // }

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
            <p className="name">{name}</p>
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
              <PersonalRoom />
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
              <GroupRoom />
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
