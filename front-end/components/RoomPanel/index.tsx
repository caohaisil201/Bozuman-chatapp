import React from 'react';
import Image from 'next/image';
import {useState, useEffect} from 'react';
import useGetUserInfo, { Room } from 'hooks/useGetUserInfo';
import {io} from 'socket.io-client';

const SIZE_OF_AVATAR_PROFILE: number = 48;

type Props={
   data: Room[]; 
   style:string;
}

function RoomPanel({data, style}:Props){
   useEffect(()=>{
      data.map(room => {
         if (room.last_message.length>=35) {
            room.last_message = room.last_message.slice (0,32)+" ...";
         }
      })           
   })

   const [lastRoomID,setLastRoomID] = useState(data[0].room_id);

   const socket = io(`${process.env.NEXT_PUBLIC_DOMAIN}`);
   socket.on('message', message => {
      setLastRoomID(message.room_id);
   })

   const [roomList,setRoomList]=useState([<></>]);

   useEffect(()=>{

      const tmp:Array<Room>=data;
      const position:number = tmp.findIndex(value => value.room_id===lastRoomID);
      if (position!=0){
         const lastRoom:Room=tmp[position];
         for(let i=position;i>0;i--){
            tmp[i]=tmp[i-1];
         }
         tmp[0]=lastRoom;
      }

      const tmpList = tmp.map(room => 
         <div className={room.unread?"room room_active":"room"} key={room.room_id}>
            <Image
               src='/avatar.png'
               alt='avatar'
               width={SIZE_OF_AVATAR_PROFILE}
               height={SIZE_OF_AVATAR_PROFILE}
            />      
            <div className="room_info">
               <p className="roomName">{room.room_name}</p>
               <p className="lastTime">{room.last_time.getHours()}:{room.last_time.getMinutes()}</p>
               <p className="lastMessage">{room.last_message}</p>
            </div>
         </div>  
      ) 
      setRoomList(tmpList);
   },[lastRoomID])

   return(
      <div className='showRoomPanel'>
         <div className={style}>
            {roomList}
         </div>
      </div>
   )
}

export default RoomPanel;