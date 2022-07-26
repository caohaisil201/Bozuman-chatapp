import type { NextPage } from 'next'
import Head from 'next/head'
import {io} from 'socket.io-client'
import { useEffect } from 'react'
const Home: NextPage = () => {
  useEffect(() => {
    const socket = io(`${process.env.NEXT_PUBLIC_DOMAIN}`);
    socket.on('connection', () => {console.log('I have join server')})
  },[])
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
