import React from 'react';

type Props = {
  user: string;
  isDelete?: boolean | undefined;
  showButton: boolean;
  click: (user: string) => void;
};

const User = ({ user, isDelete, showButton, click }: Props) => {
  const handleOnclick = () => {
    click(user);
  };

  return (
    <div className="user">
      {user}
      {
        showButton ? <button className={isDelete ? 'delete' : 'add'} onClick={handleOnclick}>
          {isDelete ? 'delete' : 'add'}
        </button> : <></>
      }
    </div>
  );
};

export default User;
