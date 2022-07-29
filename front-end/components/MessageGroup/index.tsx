import React from 'react';
import Message from './Message';
import Image from 'next/image';
type MessageGroupProps = {
  isMe: boolean;
  messages: Array<string>;
  sender: string | null;
};
const AVATAR_SIZE = 42;
function MessageGroup({ isMe, messages, sender }: MessageGroupProps) {
  
  return (
    <div
      className={'messageGroup ' + (isMe ? 'senderIsUser' : 'senderIsNotUser')}
    >
      <div className="messageGroup__avatar senderIsNotUser">
        {/* TODO: use loader to load img from backend */}
        <Image
          src={'/avatarPlaceHolder.png'}
          alt="user avatar"
          width={AVATAR_SIZE}
          height={AVATAR_SIZE}
        />
      </div>
      <div className="messageGroup__messageContainer">
        {/* If this is a 1-1 chat room, then senderName is null. following mockup design */}
        <p className="messageGroup__senderName">{sender}</p>
        {messages.map((item, index) => (
          <Message key={`MESSAGE_KEY ${index}`} content={item} />
        ))}
      </div>
    </div>
  );
}

export default MessageGroup;
