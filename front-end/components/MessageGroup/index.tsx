import React from 'react';
import Message from './Message';
import Image from 'next/image';
import { _VAR } from 'constant/variables';

type MessageGroupProps = {
  isMe: boolean;
  messages: Array<string>;
  sender: string | undefined | null;
};

function MessageGroup({ isMe, messages, sender }: MessageGroupProps) {
  
  return (
    <div
      className={'messageGroup ' + (isMe ? 'senderIsUser' : 'senderIsNotUser')}
    >
      <div className="messageGroup__avatar">
        <Image
          src={'/avatarPlaceHolder.png'}
          alt="user avatar"
          width={_VAR.AVATAR_SIZE}
          height={_VAR.AVATAR_SIZE}
        />
      </div>
      <div className="messageGroup__messageContainer">
        <p className="messageGroup__senderName">{sender}</p>
        {messages.map((item, index) => (
          <Message key={`MESSAGE_KEY ${index}`} content={item} />
        ))}
      </div>
    </div>
  );
}

export default MessageGroup;
