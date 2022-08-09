import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import {  ChatBoxProps} from 'components/ChatBox';
import { checkAuth } from 'components/ProtectedRoute';
import Head from 'next/head';
import SideBar from 'components/SideBar';
import ChatBox from 'components/ChatBox';
import Loading from 'components/Loading';
import router from 'next/router';

const Home: NextPage = () => {
  const [chatBoxProps, setChatBoxProps] = useState<ChatBoxProps | null>(null);
  const [isLogIn, setIsLogIn] = useState(false);
  const selectRoom = (room_id: number, username:string | undefined) => {
    setChatBoxProps({...chatBoxProps, room_id, username, renderHomePage})
  };
  const renderHomePage = () => {
    setChatBoxProps(null)
  }
  useEffect(() => {
    async function checkLogIn() {
      if(await checkAuth(router)){
        setIsLogIn(true);
      }
    }
    checkLogIn()
  }, [isLogIn]);

  return (
    isLogIn ? <div>
      <Head>
        <title>Bozuman chat app</title>
        <meta name="description" content="Chat app develop by bozuman team" />
      </Head>
      <div className="warpper">
        <div className="row">
          <div className="col-3">
            <SideBar selectRoom={selectRoom} />
          </div>
          <div className="col-9">
            {chatBoxProps ? (
              <ChatBox
                room_id={chatBoxProps?.room_id}
                username={chatBoxProps?.username}
                renderHomePage = {chatBoxProps?.renderHomePage}
              />
            ) : (
              <div className='homePage'><p>Bozuman chat app</p></div>
            )}
          </div>
        </div>
      </div>
    </div> : <Loading/>
  );
};

export default Home;
