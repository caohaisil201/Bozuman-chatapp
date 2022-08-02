import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { deleteCookie } from 'cookies-next';
import { FaUserPlus, FaChevronDown, FaChevronUp, FaSignOutAlt } from 'react-icons/fa';
import PersonalRoom from 'components/PersonalRoom';
import GroupRoom from 'components/GroupRoom';

const SIZE_OF_AVATAR_PROFILE: number = 50;

function SideBar() {
  const router = useRouter();
  const [name, setName] = useState('Vu Le Anh');
  const [showPersonalMessage, setShowPersonalMessage] = useState(true);
  const [showGroupMessage, setShowGroupMessage] = useState(true);

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
