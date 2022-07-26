import React from 'react';
import Message from './Message';

type Props = {
  isMe: boolean;
  messages: Array<string>;
};

function MessageGroup({isMe,messages} : Props) {
  return (
    <div className={isMe ? "messageGroup senderIsUser" : "messageGroup senderIsNotUser"}>
      <div>
        <Message content="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate harum magni doloribus aut ut reiciendis minus, voluptates est deleniti eius!" />
        <Message content="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate harum magni doloribus aut ut reiciendis minus, voluptates est deleniti eius!" />
      </div>
    </div>
  );
}



export default MessageGroup;
