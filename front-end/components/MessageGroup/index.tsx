import React from 'react';
import Message from './Message';
import Image from 'next/image';
type Props = {
  isMe: boolean;
  messages: Array<string>;
  isGroup: boolean;
  senderName: string;
};

function MessageGroup({ isMe, messages, isGroup, senderName }: Props) {
  return (
    <div
      className={
        isMe ? 'messageGroup senderIsUser' : 'messageGroup senderIsNotUser'
      }
    >
      {isMe ? (
        <></>
      ) : (
        <div className="messageGroup__avatar senderIsNotUser">
          {/* TODO: use loader to load img from backend */}
          <Image
            src={'/avatar3.png'}
            alt="user avatar"
            width={42}
            height={42}
          />
        </div>
      )}

      <div
        className={
          isMe
            ? 'messageGroup__messageContainer senderIsUser'
            : 'messageGroup__messageContainer senderIsNotUser'
        }
      >
        {isGroup ? (
          isMe ? (
            <p className="messageGroup__senderName senderIsUser">
              {senderName}
            </p>
          ) : (
            <p className="messageGroup__senderName senderIsNotUser">
              {senderName}
            </p>
          )
        ) : (
          <></>
        )}
        {messages.map((item, index) => (
          <Message key={index} content={item} />
        ))}
      </div>
      {isMe ? (
        <div className="messageGroup__avatar senderIsUser">
          {/* TODO: use loader to load img from backend */}
          <Image src={'/avatar.png'} alt="user avatar" width={42} height={42} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default MessageGroup;
