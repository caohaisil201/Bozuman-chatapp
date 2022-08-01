import RoomPanel from "components/RoomPanel";
import  {Room}  from "hooks/useGetUserInfo";

const style: string = 'group';

const roomListGroupMessage: Array<Room> =[
   {  
      "room_id":2,
      "type":"a",
      "last_message":"Lorem Ipsum is simply dummy dummy",
      "last_time":new Date(2017, 4, 4, 17, 23, 42, 11),
      "unread":false,
      "room_name":"Cao Hai Sil2"
   },
   {  
      "room_id":3,
      "type":"a",
      "last_message":"Lorem Ipsum is simply dummy dummy",
      "last_time":new Date(2017, 4, 4, 17, 23, 42, 11),
      "unread":false,
      "room_name":"Cao Hai Sil2"
   },
   {  
      "room_id":4,
      "type":"a",
      "last_message":"Lorem Ipsum is simply dummy dummy",
      "last_time":new Date(2017, 4, 4, 17, 23, 42, 11),
      "unread":false,
      "room_name":"Cao Hai Sil2"
   },
   {  
      "room_id":5,
      "type":"a",
      "last_message":"Lorem Ipsum is simply dummy dummy",
      "last_time":new Date(2017, 4, 4, 17, 23, 42, 11),
      "unread":false,
      "room_name":"Cao Hai Sil2"

   },
   {  
      "room_id":6,
      "type":"a",
      "last_message":"Lorem Ipsum is simply dummy dummy",
      "last_time":new Date(2017, 4, 4, 17, 23, 42, 11),
      "unread":false,
      "room_name":"Cao Hai Sil2"
   },
   {  
      "room_id":7,
      "type":"a",
      "last_message":"Lorem Ipsum is simply dummy dummy",
      "last_time":new Date(2017, 4, 4, 17, 23, 42, 11),
      "unread":false,
      "room_name":"Cao Hai Sil2"
   },
   {  
      "room_id":8,
      "type":"a",
      "last_message":"Lorem Ipsum is simply dummy dummy",
      "last_time":new Date(2017, 4, 4, 17, 23, 42, 11),
      "unread":false,
      "room_name":"Cao Hai Sil2"
   },
   {  
      "room_id":9,
      "type":"a",
      "last_message":"Lorem Ipsum is simply dummy dummy",
      "last_time":new Date(2017, 4, 4, 17, 23, 42, 11),
      "unread":false,
      "room_name":"Cao Hai Sil2"
   }
]

function GroupRoom() {
   return (
      <RoomPanel data={roomListGroupMessage} style={style}/>
   )
}

export default GroupRoom;
