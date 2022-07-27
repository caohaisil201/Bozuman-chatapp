import type { NextPage } from 'next'
import Head from 'next/head'
import SideBar from 'components/SideBar'

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
    </div>
  )
}

export default Home
