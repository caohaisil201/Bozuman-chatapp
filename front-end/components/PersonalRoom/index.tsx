import Image from 'next/image';

const SIZE_OF_AVATAR_PROFILE: number = 52;

type RoomMiniShow = {
   room_id: string;
   last_message: string;
   last_time: number;
   unread: boolean;
   name:string;
}
const roomListPersonalMessage: RoomMiniShow[] =[
   {  
      "room_id":"1",
      "last_message":"Lorem Ipsum is simply dummy",
      "last_time":2222,
      "unread":false,
      "name":"Cao Hai Sil"
   },
   {  
      "room_id":"1",
      "last_message":"Lorem Ipsum is simply dummy",
      "last_time":2222,
      "unread":false,
      "name":"Cao Hai Sil"
   },
   {  
      "room_id":"1",
      "last_message":"Lorem Ipsum is simply dummy",
      "last_time":2222,
      "unread":false,
      "name":"Cao Hai Sil"
   },
   {  
      "room_id":"1",
      "last_message":"Lorem Ipsum is simply dummy",
      "last_time":2222,
      "unread":false,
      "name":"Cao Hai Sil"

   },
   {  
      "room_id":"1",
      "last_message":"Lorem Ipsum is simply dummy",
      "last_time":2222,
      "unread":false,
      "name":"Cao Hai Sil"
   },
   {  
      "room_id":"1",
      "last_message":"Lorem Ipsum is simply dummy",
      "last_time":2222,
      "unread":false,
      "name":"Cao Hai Sil"
   }
]

function PersonalRoom(){
   const list = roomListPersonalMessage.map(room => 
      <div className="room" key={room.room_id}>
         <Image
            src='/avatar.png'
            alt='avatar'
            width={SIZE_OF_AVATAR_PROFILE}
            height={SIZE_OF_AVATAR_PROFILE}
         />      
         <div>
            <p className="roomName">{room.name}</p>
            <p className="lastMessage">{room.last_message}</p>
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

export default PersonalRoom;
