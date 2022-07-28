import MessageGroup from 'components/MessageGroup';
import React from 'react';
import Image from 'next/image';
import { FaInfoCircle, FaTelegramPlane } from 'react-icons/fa';

type ChatBoxProps = {
  isChanel: boolean;
  name: string;
  listAvt: Array<string>;
};

function ChatBox({ isChanel, listAvt, name }: ChatBoxProps) {
  const AVATAR_SIZE = 42;
  return (
    <div className="chatBox">
      <div className="chatBox__infoBar">
        <div className="chatBox__infoBar--content">
          <div className={isChanel ? 'userInfo' : 'userInfo'}>
            {/* TODO: use loader to load img from backend  */}
            <>
              {listAvt.map((item, index) => {
                <Image
                  // loader={item}
                  key={index}
                  src={'/avatarPlaceHolder.png'}
                  alt="user avatar"
                  width={AVATAR_SIZE}
                  height={AVATAR_SIZE}
                />;
              })}
            </>
            <p>{name}</p>
          </div>
          <div className="infoButton">
            {/* TODO: open information component, complete it in next sprint */}
            {/* <FaInfoCircle className="infoIcon" /> */}
          </div>
        </div>
        <div className="chatBox__infoBar--bar"></div>
      </div>
      <div className="chatBox__messagePanel">
        {/* TODO: Load array of message from backend, distinguish sender and render in difference messageGroup. If isChanel===false then senderName is null by default*/}
        <MessageGroup
          isMe={false}
          messages={['Message', 'Tri']}
          senderName={'Hung'}
        />
        <MessageGroup
          isMe={true}
          messages={['Message', 'Hung']}
          senderName={'Trí'}
        />
      </div>

      <div className="chatBox__holdPlace">
        <div className="chatBox__input">
          <input placeholder="Type your message" />
          <FaTelegramPlane className="buttonIcon" />
        </div>
      </div>
    </div>
  );
}

export default ChatBox;
