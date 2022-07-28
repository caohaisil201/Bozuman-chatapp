import type { NextPage } from 'next'
import Head from 'next/head'
<<<<<<< HEAD
=======
import SideBar from 'components/SideBar'
import ChatBox from 'components/ChatBox';
import MessageGroup from 'components/MessageGroup';

>>>>>>> 2039a1967993cf0a4d57a23c85b5fe1c423174d4
const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Bozuman chat app</title>
        <meta name="description" content="Chat app develop by bozuman team" />
      </Head>
      <div className="container">
        <div className="row">
          <div className="col-3">
            <SideBar/>
          </div>
        </div>  
      </div>
      <ChatBox isChanel={true} name='Bozuman' listAvt={['1', '2']}/>
    </div>
  );
};

export default Home;
