import MessageGroup from 'components/MessageGroup';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaInfoCircle, FaTelegramPlane } from 'react-icons/fa';
import {
  pushOldMessage,
  pushNewMessage,
  MessageGroupProps,
  MessageInput,
} from 'helper/messageHandle';
import axiosClient from 'helper/axiosClient';
import InfiniteScroll from 'react-infinite-scroll-component';
import usePrevious from 'hooks/usePrevious'

const TWO_NEWSET_BUCKET = 2
const FIRST_NEWEST_BUCKET = 1

type ChatBoxProps = {
  room_id: number;
  isChanel: boolean;
  name: string;
  listAvt: Array<string>;
};
const AVATAR_SIZE = 42;
const savedMessages: Array<MessageGroupProps> = [];

function ChatBox({ room_id, isChanel, listAvt, name }: ChatBoxProps) {
  const [messages, setMessages] = useState<Array<MessageGroupProps>>([]);
  const [bucketIndex, setBucketIndex] = useState<number>(0);
  const [outOfMessages, setOutOfMessages] = useState<boolean>(false);
  const getInitMessage = async () => {
    const { data } = await axiosClient.get(
      `/api/chat/get-newest-message-bucket?room_id=${room_id}`
    );
    setBucketIndex(data.newestIndex - TWO_NEWSET_BUCKET);
    const firstBucket = await axiosClient.get(
      `/api/chat/get-message-in-room?room_id=${room_id}&page=${data.newestIndex}`
    );
    
    firstBucket.data[0].message_list.reverse().forEach((element: MessageInput) => {
      pushOldMessage(element, savedMessages);
    });
    const secondBucket = await axiosClient.get(
      `/api/chat/get-message-in-room?room_id=${room_id}&page=${data.newestIndex - FIRST_NEWEST_BUCKET}`
    );
    secondBucket.data[0].message_list.reverse().forEach((element: MessageInput) => {
      pushOldMessage(element, savedMessages);
    });
    setMessages(savedMessages);
  };
  useEffect(() => {
    getInitMessage();
  }, [room_id]);

  const getOldMessage = async () => {
    if (bucketIndex !== 0) {
      const res = await axiosClient.get(
        `/api/chat/get-message-in-room?room_id=${room_id}&page=${bucketIndex}`
      );
      setBucketIndex(bucketIndex - 1);
      res.data[0].message_list.reverse().forEach((element: MessageInput) => {
        pushOldMessage(element, savedMessages);
      });
      setMessages(savedMessages);
    } else {
      setOutOfMessages(true);
    }
  };
  const prevChatId = usePrevious(room_id);
  if (prevChatId !== room_id) {
    return null;
  }
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
      <div className="chatBox__messagePanel" id="scrollableDiv">
        <InfiniteScroll
          dataLength={messages.length}
          next={getOldMessage}
          style={{ display: 'flex', flexDirection: 'column-reverse' }}
          inverse={true}
          hasMore={true && !outOfMessages}
          loader={<p className="loadingNewMessage">Loading...</p>}
          scrollableTarget="scrollableDiv"
        >
          {messages.map((item, index) => (
            <MessageGroup
              key={`MESSAGEGROUP_KEY ${index}`}
              isMe={item.isMe}
              messages={item.messages}
              sender={item.sender}
            />
          ))}
        </InfiniteScroll>
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
