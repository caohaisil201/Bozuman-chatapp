import axiosClient from 'helper/axiosClient';
import React, { useState, useRef, KeyboardEvent } from 'react';
import { FaTimes, FaSearch } from 'react-icons/fa';
import User from './user';
import { UserType } from 'components/SideBar';
import _CONF from 'config/config';

const MAX_ROOM_NAME_LENGTH = 32;
const MIN_ROOM_NAME_LENGTH = 4;

type Props = {
  roomName?: string;
  users: Array<string>;
  isEdit?: boolean;
  close: () => void;
  click: (users: Array<string>, roomName: string) => void;
};

const RoomBehaviourPopup = ({
  roomName,
  users,
  isEdit,
  close,
  click,
}: Props) => {
  const roomNameRef = useRef<HTMLInputElement | null>(null);
  const searchRef = useRef<HTMLInputElement | null>(null);
  const [userFind, setUserFind] = useState<Array<UserType>>([]);
  const [userResult, setUserResult] = useState<Array<string>>([...users]);
  const [roomNameError, setRoomNameError] = useState<string>('');
  const [searchError, setSearchError] = useState<string>('');
  const [responseError, setResponseError] = useState<string>('');

  const onSubmitSearch = async () => {
    if (searchRef.current?.value) {
      const searchValue: string = searchRef.current.value.trim();
      const res = await axiosClient.get(
        `/api/user/search-user?search_value=${searchValue}`
      );
      const users: Array<UserType> | undefined = res.data?.searchResult;
      if (!users || users.length === 0) {
        setSearchError('Can not find users');
        setUserFind([]);
        return;
      }
      setUserFind([...users]);
    }
  };

  const pressEnterToSearch = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      onSubmitSearch();
    }
  };

  const onAddUser = (username: string): void => {
    if (userResult.find((element) => element === username)) {
      return;
    }
    setUserResult([...userResult, username]);
  };

  const onDeleteUser = (username: string): void => {
    let result = userResult.filter((element) => element !== username);
    setUserResult([...result]);
  };

  const handleClick = () => {
    if (userResult.length === 0) {
      setResponseError('No user in room');
      return;
    }
    // let userNameData = userResult.map(element => element.username);
    if (roomNameRef.current?.value) {
      const roomName = roomNameRef.current.value.trim();
      if (
        roomName.length < MIN_ROOM_NAME_LENGTH ||
        roomName.length > MAX_ROOM_NAME_LENGTH
      ) {
        setRoomNameError(`Room name must between 4-32 characters`);
        return;
      }
      if (_CONF.REGEX_FULLNAME.test(roomName)) {
        click(userResult, roomNameRef.current.value);
      } else {
        setRoomNameError(`Room name must not have special characters`);
      }
      return;
    }
    setRoomNameError(`Room name is required`);
  };

  const setNoError = () => {
    setResponseError('');
    setRoomNameError('');
    setSearchError('');
  };

  return (
    <div className="layer">
      <div className="popup">
        <FaTimes className="icon close" onClick={close} />
        <input
          placeholder="Enter room name"
          ref={roomNameRef}
          defaultValue={roomName ? roomName : ''}
          onFocus={setNoError}
        />
        <p className="errorMessage">{roomNameError}</p>
        <div className="search">
          <input
            ref={searchRef}
            onKeyDown={pressEnterToSearch}
            placeholder="Search user name"
            onFocus={setNoError}
          />
          <div onClick={onSubmitSearch}>
            <FaSearch className="icon" />
          </div>
        </div>
        <p className="errorMessage">{searchError}</p>
        <div className="userList">
          {userFind.map((user, index) => (
            <User
              key={`find ${index}`}
              user={user.username}
              click={onAddUser}
            />
          ))}
        </div>
        <div className="userList">
          {userResult.map((user, index) => (
            <User
              key={`result ${index}`}
              user={user}
              click={onDeleteUser}
              isDelete
            />
          ))}
        </div>
        <p className="errorMessage">{responseError}</p>
        <button className="button" onClick={handleClick}>
          {isEdit ? 'save' : 'create'}
        </button>
      </div>
    </div>
  );
};

export default RoomBehaviourPopup;
