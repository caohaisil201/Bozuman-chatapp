import React from 'react';
import Image from 'next/image';
import {useState, useEffect} from 'react';
import useGetUserInfo, { Room } from 'hooks/useGetUserInfo';
import {io} from 'socket.io-client';

const SIZE_OF_AVATAR_PROFILE: number = 48;

type Props={
   data: Array<Room>; 
   style:string;
}

function RoomPanel({data, style}:Props){
   const [lastRoomID,setLastRoomID] = useState(1);

   const socket = io(`${process.env.NEXT_PUBLIC_DOMAIN}`);
   socket.on('message', message => {
      setLastRoomID(message.room_id);
   })

   const [roomList,setRoomList]=useState([<></>]);

   useEffect(()=>{
      if (data.length!==0){
         const tmp:Array<Room>=data;
         console.log(data);
         const position:number = tmp.findIndex(value => value.room_id===lastRoomID);
         if (position!=0){
            const lastRoom:Room=tmp[position];
            for(let i=position;i>0;i--){
               tmp[i]=tmp[i-1];
            }
            tmp[0]=lastRoom;
         }

         console.log("ffff",tmp);

         const tmpList = tmp.map((room:Room,index) => 
            <div className={room.unread?"room room_active":"room"} key={index}>
               <Image
                  src='/avatar.png'
                  alt='avatar'
                  width={SIZE_OF_AVATAR_PROFILE}
                  height={SIZE_OF_AVATAR_PROFILE}
               />      
               <div className="room_info">
                  <p className="roomName">{room.name}</p>
                  <p className="lastTime">{new Date(room.last_time).getHours()}:{new Date(room.last_time).getMinutes()}</p>
                  <p className="lastMessage">{room.last_message}</p>
               </div>
            </div>  
         ) 
         setRoomList(tmpList);
      }

   },[lastRoomID,data.length])

   return(
      <div className='showRoomPanel'>
         <div className={style}>
            {roomList}
         </div>
      </div>
   )
}

export default RoomPanel;