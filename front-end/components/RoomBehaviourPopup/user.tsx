import React from 'react';

type Props = {
  user: string;
  isDelete?: boolean | undefined;
  click: (user: string) => void;
};

const User = ({ user, isDelete, click }: Props) => {
  const handleOnclick = () => {
    click(user);
  };

  return (
    <div className="user">
      {user}
      {
        <button className={isDelete ? 'delete' : 'add'} onClick={handleOnclick}>
          {isDelete ? 'delete' : 'add'}
        </button>
      }
    </div>
  );
};

export default User;
