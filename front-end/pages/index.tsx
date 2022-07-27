import ChatBox from 'components/ChatBox';
import MessageGroup from 'components/MessageGroup';
import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Bozuman chat app</title>
        <meta name="description" content="Chat app develop by bozuman team" />
      </Head>
      <ChatBox isChanel={true} name='Bozuman' listAvt={['1', '2']}/>
    </div>
  );
};

export default Home;
