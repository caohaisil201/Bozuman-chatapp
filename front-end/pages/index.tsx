import type { NextPage } from 'next';
import router from 'next/router';
import { useEffect, useState } from 'react';
import { checkAuth } from 'components/ProtectedRoute';
import Head from 'next/head';
import SideBar from 'components/SideBar';
import ChatBox from 'components/ChatBox';
import Loading from 'components/Loading';

const Home: NextPage = () => {
  const [isLogIn, setIsLogIn] = useState(false);

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
            <SideBar />
          </div>
          <div className="col-9">
            <ChatBox
              room_id={1}
              isChanel={true}
              roomName="Bozuman"
              listAvt={['1', '2']}
            />
          </div>
        </div>
      </div>
    </div> :<Loading/>
  );
};

export default Home;
