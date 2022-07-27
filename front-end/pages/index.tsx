import type { NextPage } from 'next'
import Head from 'next/head'
const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Bozuman chat app</title>
        <meta name="description" content="Chat app develop by bozuman team" />
      </Head>
      <div className="container">
        <h1>Bozuman chat app home pageeeeeeeeeeeeeeeeeeeeeeeee</h1>
        <input type="user" name="user" />

        <input type="submit" name="submit" value="Continue" />
      </div>
    </div>
  )
}

export default Home
