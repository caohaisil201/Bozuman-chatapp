import MessageGroup from 'components/MessageGroup';
import React from 'react';
import Image from 'next/image';
import { FaInfoCircle, FaTelegramPlane } from 'react-icons/fa';

type Props = {
  isGroup: boolean;
  name: string;
  listAvt: Array<string>;
};

function ChatBox({ isGroup, listAvt, name }: Props) {
  return (
    <div className="chatBox">
      <div className="chatBox__infoBar">
        <div className="chatBox__infoBar--content">
          <div className={isGroup ? 'userInfo' : 'userInfo'}>
            {/* TODO: use loader to load img from backend  */}
            <>
              {listAvt.map((item, index) => {
                <Image
                  // loader={item}
                  key={index}
                  src={'/avatar3.png'}
                  alt="user avatar"
                  width={42}
                  height={42}
                />;
              })}
            </>
            <p>{name}</p>
          </div>
          <div className="infoButton">
            <FaInfoCircle className="infoIcon" />
          </div>
        </div>
        <div className="chatBox__infoBar--bar"></div>
      </div>
      <div className="chatBox__messagePanel">
        <MessageGroup
          isMe={false}
          messages={['112312312312312312312321', '2', '3']}
          isGroup={isGroup}
          senderName="Hung"
        />
      </div>
      <div className="chatBox__holdPlace">
        <div className="chatBox__input">
        <input placeholder='Type your message' />
        <FaTelegramPlane className="buttonIcon"/>
        </div>

      </div>
    </div>
  );
}

export default ChatBox;
