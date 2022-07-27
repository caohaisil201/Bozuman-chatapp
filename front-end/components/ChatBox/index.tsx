import MessageGroup from 'components/MessageGroup';
import React from 'react';
import Image from 'next/image';
import {FaInfoCircle} from 'react-icons/fa'
function ChatBox() {
  const name = 'Cao Hải Síl'
  return (
    <div className="chatBox">
      <div className="chatBox__infoBar">
        <div className="chatBox__infoBar--content">
          <div className="userInfo">
            {/* TODO: use loader to load img from backend  */}
            <Image
              src={'/avatar3.png'}
              alt="user avatar"
              width={42}
              height={42}
            />
            <p>{name}</p>
          </div>
          <div className="infoButton">
            <FaInfoCircle className='infoIcon'/>
          </div>
        </div>
        <div className="chatBox__infoBar--bar"></div>
      </div>
      <div className="chatBox__messagePanel">
        <MessageGroup isMe={false} messages={['1', '2', '3']} />
      </div>
      <div className="chatBox__input">
        
      </div>
    </div>
  );
}

export default ChatBox;
