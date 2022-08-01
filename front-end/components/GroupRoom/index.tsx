import RoomPanel from "components/RoomPanel";
import  {Room}  from "hooks/useGetUserInfo";

type Props= {
  data: Array<Room>,
  style:string
}

function GroupRoom({data,style}: Props) {
   return (
      <RoomPanel data={data} style={style}/>
   )
}

export default GroupRoom;
