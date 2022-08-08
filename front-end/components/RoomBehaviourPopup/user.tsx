import React from 'react';
import { FaUserTie } from 'react-icons/fa';

type Props = {
  user: string;
  isDelete?: boolean | undefined;
  showButton: boolean;
  isAdmin?: boolean;
  isEdit?: boolean | undefined;
  clickButton: (user: string) => void;
  clickAdmin?: ((user: string) => void) | undefined;
};

const User = ({ user, isDelete, showButton, isAdmin, isEdit, clickButton, clickAdmin }: Props) => {
  const handleOnClickButton = () => {
    clickButton(user);
  };

  const handleOnClickAdmin = () =>{
    if (clickAdmin){
      clickAdmin(user);
    }
  }

  return (
    <div className="user">
      {user}
      {showButton ? (
        <div>
          {isDelete && isEdit ? (
            <FaUserTie 
              className={'admin ' + (isAdmin ? 'isAdmin' : '')}
              onClick={handleOnClickAdmin}
            />
          ) : (
            <></>
          )}
          <button
            className={(isAdmin ? 'disable ' : '') + (isDelete ? 'delete' : 'add')}
            disabled={isAdmin}
            onClick={handleOnClickButton}
          >
            {isDelete ? 'delete' : 'add'}
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default User;
