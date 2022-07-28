import Image from 'next/image';

const SIZE_OF_AVATAR_PROFILE: number = 52;

type RoomMiniShow = {
   room_id: string;
   last_mess: string;
   last_time: number;
   unread: boolean;
   name:string;
}
const roomListGroupMessage: RoomMiniShow[] =[
   {  
      "room_id":"1",
      "last_mess":"Lorem Ipsum is simply dummy",
      "last_time":2222,
      "unread":false,
      "name":"Bozuman"
   },
   {  
      "room_id":"1",
      "last_mess":"Lorem Ipsum is simply dummy",
      "last_time":2222,
      "unread":false,
      "name":"Bozuman"
   },
   {  
      "room_id":"1",
      "last_mess":"Lorem Ipsum is simply dummy",
      "last_time":2222,
      "unread":false,
      "name":"Bozuman"
   },
   {  
      "room_id":"1",
      "last_mess":"Lorem Ipsum is simply dummy",
      "last_time":2222,
      "unread":false,
      "name":"Bozuman"

   }
]

function GroupRoom(){
   const list = roomListGroupMessage.map(room => 
      <div className="room" key={room.room_id}>
         <Image
            src='/avatar.png'
            alt='avatar'
            width={SIZE_OF_AVATAR_PROFILE}
            height={SIZE_OF_AVATAR_PROFILE}
         />      
         <div>
            <p className="sender">{room.name}</p>
            <p className="lastmessage">{room.last_mess}</p>
         </div>
      </div>   
   )
   return(
      <div className="showRoomPanel">
         <div className="group">
            {list}
         </div>
      </div>
   )
}

export default GroupRoom;
