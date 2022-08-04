import React from 'react';

interface User {
  username: string;
}

type Props = {
  user: User;
  isDelete?: boolean | undefined;
  click: (user: User) => void;
};

const User = ({ user, isDelete, click}: Props) => {
  const handleOnclick = () => {
    click(user)
  }

  return (
    <div className="user">
      {user.username}
      {<button
        className={isDelete ? 'delete' : 'add'}
        onClick={handleOnclick}
      >
        {isDelete ? 'delete' : 'add'}
      </button>}
    </div>
  );
};

export default User;
