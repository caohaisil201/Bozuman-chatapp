import { useState, useEffect } from "react";
import {io} from 'socket.io-client';

const socket = io(`${process.env.NEXT_PUBLIC_DOMAIN}`);
export default function SocketTest() {

  const [textField, setTextField] = useState('');
  const [isConnected, setIsConnected] = useState(socket.connected);
  const handleChange = (event: any) => {
    setTextField(event.target.value);
  }
  const sendMessage = () => {
    socket.emit('message', textField);
  }

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);
  return(
    <>
      <p>Connected: { '' + isConnected }</p>
      <form >
        <label>
          Name:
          <input type="text" value={textField} onChange={handleChange} />
        </label>
        <input type="button" onClick={sendMessage} value="Submit" />
      </form>
    </>
  );
}