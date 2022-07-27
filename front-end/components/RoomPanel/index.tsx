import { useState } from "react";

type RoomMiniShow = {
   room_id: string;
   last_mess: string;
   last_time: number;
   unread: boolean;
}
const roomListPersonalMessage: RoomMiniShow[] =[
   {  
      "room_id":"1",
      "last_mess":"Lorem Ipsum is simply dummy text of the printing",
      "last_time":2222,
      "unread":false
   },
   {  
      "room_id":"1",
      "last_mess":"Lorem Ipsum is simply dummy text of the printing",
      "last_time":2222,
      "unread":false
   },
   {  
      "room_id":"1",
      "last_mess":"Lorem Ipsum is simply dummy text of the printing",
      "last_time":2222,
      "unread":false
   },
   {  
      "room_id":"1",
      "last_mess":"Lorem Ipsum is simply dummy text of the printing",
      "last_time":2222,
      "unread":false
   },
   {  
      "room_id":"1",
      "last_mess":"Lorem Ipsum is simply dummy text of the printing",
      "last_time":2222,
      "unread":false
   },
   {  
      "room_id":"1",
      "last_mess":"Lorem Ipsum is simply dummy text of the printing",
      "last_time":2222,
      "unread":false
   }
]

function PersonalRoom(){
   
   return(
      <div className="showroompanel">
         <div className="personal">

         </div>
      </div>
   )
}

function GroupRoom(){
   
   return(
      <div className="showroompanel">
         <div className="personal">

         </div>
      </div>
   )
}

export default {PersonalRoom,GroupRoom};