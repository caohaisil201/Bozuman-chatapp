import axiosClient from 'helper/axiosClient';
import React, { useState, useRef, MouseEventHandler } from 'react';
import { FaTimes, FaSearch } from 'react-icons/fa';
import User from './user';
import { UserType } from 'components/SideBar';

type Props = {
  roomName?: string;
  users: Array<UserType>;
  isEdit?: boolean;
  close: () => void;
  click: (users: Array<string>, roomName: string) => void;
};

const RoomBehaviourPopup = ({ roomName, users, isEdit, close, click }: Props) => {
  const roomNameRef = useRef<HTMLInputElement | null>(null);
  const searchRef = useRef<HTMLInputElement | null>(null);
  const [userFind, setUserFind] = useState<Array<UserType>>([]);
  const [userResult, setUserResult] = useState<Array<UserType>>([...users]);

  const  onSubmitSearch = async () => {
    if (searchRef.current?.value) {
      const searchValue: string = searchRef.current.value.trim();
      //TODO: call API, it return users
      // let users : Array<UserType> = await axiosClient.get(`/api/user/search-user?search_value=${searchValue}`);
      // setUserFind([...users]);
      let users = [
        {username: 'bozuman1'},
        {username: 'bozuman2'},
        {username: 'bozuman3'},
        {username: 'bozuman1'},
        {username: 'bozuman2'},
        {username: 'bozuman3'},
        {username: 'bozuman1'},
        {username: 'bozuman2'},
        {username: 'bozuman3'},
        {username: 'bozuman1'},
        {username: 'bozuman2'},
        {username: 'bozuman3'},
        {username: 'bozuman1'},
        {username: 'bozuman2'},
        {username: 'bozuman3'},
        {username: 'bozuman1'},
        {username: 'bozuman2'},
        {username: 'bozuman3'},
      ];
      
      setUserFind(users.filter((user) => 
      searchValue === user.username
      ));
    }
  };

  const onAddUser = (user: UserType) : void => {
    if(userResult.find(element => element['username']===user['username'])){
      return
    }
    setUserResult([...userResult,user]);
  }

  const onDeleteUser = (user: UserType) : void => {
    let result = userResult.filter(element => element.username !== user.username);
    setUserResult([...result]);
  }

  const handleClick = () => {
    if(userResult.length === 0){
      return;
    }
    let userNameData = userResult.map(element => element.username);
    roomNameRef.current?.value 
      ? click(userNameData,roomNameRef.current.value)
      : click(userNameData,'');
  }

  return (
    <div className="layer">
      <div className="popup">
        <FaTimes className="icon close" onClick={close} />
        <input 
          placeholder="Enter room name"
          ref={roomNameRef}
        />
        <div className="search">
          <input 
            ref={searchRef} 
            placeholder="Search user name" 
          />
          <div onClick={onSubmitSearch}>
            <FaSearch className="icon" />
          </div>
        </div>
        <div className="userList">
          {userFind.map((user, index) => (
            <User 
              key={`find ${index}`} 
              user={user}
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
        <button 
          className="button"
          onClick={handleClick}
        >
          {isEdit ? 'save' : 'create'}
        </button>
      </div>
    </div>
  );
};

export default RoomBehaviourPopup;
