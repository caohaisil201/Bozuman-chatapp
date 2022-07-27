import React from 'react';
import Message from './Message';
import Image from 'next/image';
type Props = {
  isMe: boolean;
  messages: Array<string>;
  senderName: string | null;
};

function MessageGroup({ isMe, messages, senderName }: Props) {
  return (
    <div
      className={'messageGroup ' + (isMe ? 'senderIsUser' : 'senderIsNotUser')}
    >
      <div className="messageGroup__avatar senderIsNotUser">
        {/* TODO: use loader to load img from backend */}
        <Image src={'/avatar3.png'} alt="user avatar" width={42} height={42} />
      </div>
      <div
        className={
          'messageGroup__messageContainer ' +
          (isMe ? 'senderIsUser' : 'senderIsNotUser')
        }
      >
        {/* If this is a 1-1 chat room, then senderName is null. following mockup design */}
        {isMe ? (
          <p className="messageGroup__senderName senderIsUser">{senderName}</p>
        ) : (
          <p className="messageGroup__senderName senderIsNotUser">
            {senderName}
          </p>
        )}
        {messages.map((item, index) => (
          <Message key={index} content={item} />
        ))}
      </div>
    </div>
  );
}

export default MessageGroup;
