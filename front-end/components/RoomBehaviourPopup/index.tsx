import React, { useState, useRef } from 'react';
import { FaTimes, FaSearch } from 'react-icons/fa';
import User from './user';

const users = [
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

type Props = {
  roomName?: string;
  
  isEdit?: boolean;
  close: () => void;
};

interface UserType {
  username: string;
}

const RoomBehaviourPopup = ({ isEdit, close }: Props) => {
  const searchRef = useRef<HTMLInputElement | null>(null);
  const [userFind, setUserFind] = useState<Array<UserType>>([]);
  const [userResult, setUserResult] = useState<Array<UserType>>([]);

  const onSubmitSearch = (): void => {
    if (searchRef.current?.value) {
      const username: string = searchRef.current.value.trim();
      //TODO: call API
      setUserFind(users.filter((user) => 
        username === user.username
      ));
    }
  };

  const onAddUser = (user: User) : void => {
    if(userResult.find(element => element['username']===user['username'])){
      return
    }
    setUserResult([...userResult,user]);
  }

  const onDeleteUser = (user: User) : void => {
    let result = userResult.filter(element => element.username !== user.username);
    setUserResult([...result]);
  }

  return (
    <div className="layer">
      <div className="popup">
        <FaTimes className="icon close" onClick={close} />
        <input placeholder="Enter room name" />
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
        {isEdit ? (
          <button className="button">edit</button>
        ) : (
          <button className="button">save</button>
        )}
      </div>
    </div>
  );
};

export default RoomBehaviourPopup;
