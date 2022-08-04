import MessageGroup from 'components/MessageGroup';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  pushOldMessage,
  pushNewMessage,
  MessageGroupProps,
  MessageInput,
} from 'helper/messageHandle';
import { FaInfoCircle } from 'react-icons/fa';
import axiosClient from 'helper/axiosClient';
import InfiniteScroll from 'react-infinite-scroll-component';
import usePrevious from 'hooks/usePrevious';
import InputMessage from './inputMessage';
import Loading from 'components/Loading';
import { io } from 'socket.io-client';
import { getCookie } from 'cookies-next';
import RoomBehaviourPopup from 'components/RoomBehaviourPopup';
import Swal from 'sweetalert2';

const TWO_NEWSET_BUCKET = 2;
const FIRST_NEWEST_BUCKET = 1;
const AVATAR_SIZE = 42;

export type ChatBoxProps = {
  room_id: number;
  isChanel: boolean;
  roomName: string;
  username?: string;
};

interface IRoomInfo {
  name: string;
  user_list: Array<string>;
  admin: string;
}

function getAccessToken() {
  const access_token = getCookie('access_token');
  return access_token;
}

function ChatBox({ room_id, isChanel, roomName, username }: ChatBoxProps) {
  const savedMessagesRef = useRef<Array<MessageGroupProps>>([]);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [messages, setMessages] = useState<Array<MessageGroupProps>>([]);
  const [bucketIndex, setBucketIndex] = useState<number>(0);
  const [outOfMessages, setOutOfMessages] = useState<boolean>(false);
  const [showEditRoom, setShowEditRoom] = useState<boolean>(false);
  const [roomInfo, setRoomInfo] = useState<IRoomInfo>({
    name: '',
    user_list: [],
    admin: '',
  });

  const getMessageBucket = async (page: number) => {
    try {
      const { data } = await axiosClient.get(
        `/api/chat/get-message-in-room?room_id=${room_id}&page=${page}`
      );
      if (data[0]) {
        data[0].message_list.reverse().forEach((element: MessageInput) => {
          pushOldMessage(element, savedMessagesRef.current, username);
        });
        setMessages([...savedMessagesRef.current]);
      }
    } catch (error) {
      // TODO: Do something when error
    }
  };

  const getInitMessage = async () => {
    try {
      // Count message bucket to get the newest bucket index
      const { data } = await axiosClient.get(
        `/api/chat/get-newest-message-bucket?room_id=${room_id}`
      );

      if (data.newestIndex >= 2) {
        await getMessageBucket(data.newestIndex);
        await getMessageBucket(data.newestIndex - FIRST_NEWEST_BUCKET);
        setIsLoading(false);
        return setBucketIndex(data.newestIndex - TWO_NEWSET_BUCKET);
      }
      if (data.newestIndex === 1) {
        await getMessageBucket(data.newestIndex);
        setIsLoading(false);
        return setBucketIndex(data.newestIndex - FIRST_NEWEST_BUCKET);
      }
      setOutOfMessages(true);
      setIsLoading(false);
      return setBucketIndex(data.newestIndex);
    } catch (error) {
      // TODO: Do something when error
    }
  };

  const getRoomInfo = async () => {
    try {
      const { data } = await axiosClient.get(
        `/api/chat/room-info?room_id=${room_id}`
      );
      if (data.roomInfo.admin === username) {
        setRoomInfo({
          ...roomInfo,
          name: data.roomInfo.name,
          user_list: [...data.roomInfo.user_list],
          admin: data.roomInfo.admin,
        });
        return setIsAdmin(true);
      }
      setIsAdmin(false);
    } catch (error) {
      // TODO: Do something when error
    }
  };

  const socketRef = useRef<any>(null);
  useEffect(() => {
    socketRef.current = io(`${process.env.NEXT_PUBLIC_DOMAIN}`, {
      transportOptions: {
        polling: {
          extraHeaders: {
            Authorization: getAccessToken(),
          },
        },
      },
    });
    socketRef.current.on('message', (message: any) => {
      pushNewMessage(message, savedMessagesRef.current, username);
      setMessages([...savedMessagesRef.current]);
    });
  }, []);

  useEffect(() => {
    getRoomInfo();
    savedMessagesRef.current = [];
    getInitMessage();
    if (username) {
      socketRef.current.emit('joinRoom', {
        sender: username,
        room: room_id,
      });
    }
    setOutOfMessages(false);
  }, [room_id]);

  const sendMessage = (inputValue: string) => {
    if (inputValue.trim().length !== 0) {
      socketRef.current.emit('chatMessage', {
        content: inputValue,
        time: Date(),
        room: room_id,
      });
    }
  };

  const getOldMessage = async () => {
    if (bucketIndex !== 0) {
      const res = await axiosClient.get(
        `/api/chat/get-message-in-room?room_id=${room_id}&page=${bucketIndex}`
      );
      setBucketIndex(bucketIndex - 1);
      res.data[0].message_list.reverse().forEach((element: MessageInput) => {
        pushOldMessage(element, savedMessagesRef.current, username);
      });
      setMessages([...savedMessagesRef.current]);
    } else {
      setOutOfMessages(true);
    }
  };

  const clickHandle = (inputValue: string) => {
    sendMessage(inputValue);
  };

  const handleShowEditRoomPopup = () => {
    setShowEditRoom(true);
  };

  const handleCloseEditRoomPopup = () => {
    setShowEditRoom(false);
  };

  const handleEditRoom = async (users: Array<string>, roomName: string) => {
    try{
      const res = await axiosClient.post('/api/chat/edit-room', {
        room_id,
        user_list: users,
        name: roomName,
      })
      if(res.data.success) {
        handleCloseEditRoomPopup();
        Swal.fire('Update successfully');
      }
    }catch (error) {
      //TODO: catch error;
    }
  };

  const prevChatId = usePrevious(room_id);
  if (prevChatId !== room_id) {
    return null;
  }
  return isLoading ? (
    <Loading />
  ) : (
    <>
      <div className="chatBox">
        <div className="chatBox__infoBar">
          <div className="chatBox__infoBar--content">
            <div className={isChanel ? 'userInfo' : 'userInfo'}>
              {/* TODO: use loader to load img from backend  */}
              <>
                <Image
                  src={'/avatarPlaceHolder.png'}
                  alt="user avatar"
                  width={AVATAR_SIZE}
                  height={AVATAR_SIZE}
                />
              </>
              <p>{roomName}</p>
            </div>

            <div className="infoButton">
              {isAdmin ? (
                <FaInfoCircle
                  onClick={handleShowEditRoomPopup}
                  className="infoIcon"
                />
              ) : (
                <></>
              )}
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
            loader={<p className="loadingNewMessage"></p>}
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
            <InputMessage clickHandle={clickHandle} />
          </div>
        </div>
      </div>
      {showEditRoom && (
        <RoomBehaviourPopup
          isEdit
          click={handleEditRoom}
          close={handleCloseEditRoomPopup}
          roomName={roomInfo.name}
          users={roomInfo.user_list}
        />
      )}
    </>
  );
}

export default ChatBox;
