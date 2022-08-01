import type { NextPage } from 'next';
import Head from 'next/head';
import SideBar from 'components/SideBar';
import ChatBox from 'components/ChatBox';

const Home: NextPage = () => {
  return (
    <div>
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
            <ChatBox room_id={2} isChanel={true} name="Bozuman" listAvt={['1', '2']} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
