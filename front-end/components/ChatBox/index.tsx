import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import InfiniteScroll from 'react-infinite-scroll-component';
import Swal from 'sweetalert2';
import { getCookie } from 'cookies-next';
import { io } from 'socket.io-client';
import { FaEdit } from 'react-icons/fa';
import { _VAR, IRoomInfo } from 'constant/variables';
import {
  pushOldMessage,
  pushNewMessage,
  MessageGroupProps,
  MessageInput,
} from 'helper/messageHandle';
import axiosClient from 'helper/axiosClient';
import MessageGroup from 'components/MessageGroup';
import usePrevious from 'hooks/usePrevious';
import InputMessage from './inputMessage';
import Loading from 'components/Loading';
import RoomBehaviourPopup from 'components/RoomBehaviourPopup';

export type ChatBoxProps = {
  room_id: number;
  username?: string;
  renderHomePage: () => void;
};

const getAccessToken = () => {
  const access_token = getCookie('access_token');
  return access_token;
};


function ChatBox({ room_id, username, renderHomePage }: ChatBoxProps) {
  const socketRef = useRef<any>(null);
  const savedMessagesRef = useRef<Array<MessageGroupProps>>([]);

  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Array<MessageGroupProps>>([]);
  const [bucketIndex, setBucketIndex] = useState<number>(0);
  const [outOfMessages, setOutOfMessages] = useState<boolean>(false);
  const [showEditRoom, setShowEditRoom] = useState<boolean>(false);
  const [render, setRender] = useState<boolean>(false);
  const [roomInfo, setRoomInfo] = useState<IRoomInfo>({
    name: '',
    user_list: [],
    admin: '',
  });
  
  const clickSendMessageHandle = (inputValue: string) => {
    sendMessage(inputValue);
  };

  const handleShowEditRoomPopup = () => {
    setShowEditRoom(true);
  };

  const handleCloseEditRoomPopup = () => {
    setShowEditRoom(false);
  };

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
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Something went wrong...',
        showConfirmButton: false,
        timer: _VAR.TIME_SHOW_SWAL,
      });
    }
  };

  const getInitMessage = async () => {
    try {
      // Count message bucket to get the newest bucket index
      setIsLoading(true);
      const { data } = await axiosClient.get(
        `/api/chat/get-newest-message-bucket?room_id=${room_id}`
      );
      

      if (data.newestIndex >= _VAR.TWO_NEWSET_BUCKET) {
        await getMessageBucket(data.newestIndex);
        await getMessageBucket(data.newestIndex - _VAR.FIRST_NEWEST_BUCKET);
        setIsLoading(false);
        return setBucketIndex(data.newestIndex - _VAR.TWO_NEWSET_BUCKET);
      }

      if (data.newestIndex === _VAR.FIRST_NEWEST_BUCKET) {
        await getMessageBucket(data.newestIndex);
        setIsLoading(false);
        return setBucketIndex(data.newestIndex - _VAR.FIRST_NEWEST_BUCKET);
      }
      setIsLoading(false);
      setOutOfMessages(true);
      return setBucketIndex(data.newestIndex);
    } catch (error) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Something went wrong...',
        showConfirmButton: false,
        timer: _VAR.TIME_SHOW_SWAL,
      });
    }
  };

  const getRoomInfo = async () => {
    try {
      const { data } = await axiosClient.get(
        `/api/chat/room-info?room_id=${room_id}`
      );

      if (data.roomInfo.type === _VAR.DIRECT_ROOM_TYPE) {
        setIsAdmin(true);
      }
      setRoomInfo({
        ...roomInfo,
        name: data.roomInfo.name,
        user_list: [...data.roomInfo.user_list],
        admin: data.roomInfo.admin,
      });
      if (data.roomInfo.admin === username) {
        return setIsAdmin(true);
      }
      setIsAdmin(false);
    } catch (error) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Something went wrong...',
        showConfirmButton: false,
        timer: _VAR.TIME_SHOW_SWAL,
      });
    }
  };

  const sendMessage = (inputValue: string) => {
    if (inputValue.trim().length !== 0) {
      socketRef.current.emit('chatMessage', {
        content: inputValue,
        time: Date(),
        room: room_id,
        token: getAccessToken()
      });
    }
  };

  const getOldMessage = async () => {
    if (bucketIndex !== 0) {
      const res = await axiosClient.get(
        `/api/chat/get-message-in-room?room_id=${room_id}&page=${bucketIndex}`
      );
      setBucketIndex(bucketIndex - _VAR.ONE_NEWEST_BUCKET);
      if (res.data[0]) {
        res.data[0].message_list.reverse().forEach((element: MessageInput) => {
          pushOldMessage(element, savedMessagesRef.current, username);
        });
        setMessages([...savedMessagesRef.current]);
      }
    } else {
      setOutOfMessages(true);
    }
  };

  const handleEditRoom = async (
    users: Array<string>,
    roomName: string,
    admin?: string
  ) => {
    try {
      const res = await axiosClient.post('/api/chat/edit-room', {
        room_id,
        user_list: users,
        name: roomName,
        admin: admin,
      });
      if (res.data.success) {
        admin !== username ? setIsAdmin(false) : {};
        handleCloseEditRoomPopup();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: _VAR.UPDATE_ROOM_SUCCESS,
          showConfirmButton: false,
          timer: _VAR.TIME_SHOW_SWAL,
        });
        setTimeout(() => {
          socketRef.current.emit('roomEdit', { newUserList: users, room_id: room_id });
          socketRef.current.emit('roomUpdate', users.concat(roomInfo.user_list));
        }, 500)
      }
    } catch (error) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Something went wrong...',
        showConfirmButton: false,
        timer: _VAR.TIME_SHOW_SWAL,
      });
    }
  };

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
    socketRef.current.on('roomEditReceiver', (message: any) => {
      if (!message.newUserList.includes(username) && room_id === message.room_id) {
        Swal.fire({
          icon: 'error',
          title: `You have been deleted out of this room :(`,
        })
        renderHomePage();
      }
      setRender(prev => !prev);
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
  }, [room_id, render]);

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
            <div className="userInfo">
              <>
                <Image
                  src={'/avatarPlaceHolder.png'}
                  alt="user avatar"
                  width={_VAR.AVATAR_SIZE}
                  height={_VAR.AVATAR_SIZE}
                />
              </>
              <p>{roomInfo.name}</p>
            </div>

            <div className="infoButton">
              {isAdmin ? (
                <FaEdit
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
            <InputMessage clickHandle={clickSendMessageHandle} />
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
          admin={roomInfo.admin}
        />
      )}
    </>
  );
}

export default ChatBox;
