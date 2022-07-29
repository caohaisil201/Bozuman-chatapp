import useSWR  from 'swr'
import axiosClient from 'helper/axiosClient'

interface DataUser {
  username : string;
  email: string;
  room_list: Array<Room>
  full_name: string;
  gender?: boolean;
  phone?: string;
  avatar?:string;
  description?:string;
}

interface Room {
  room_id: number;
  name: string;
  type: string;
  last_mess: string;
  last_time: string;
  unread: boolean;
}
const fetcher = async (url:string) => await axiosClient.get(url).then((res) => res.data);

const useGetUserInfo = () : DataUser => {
  const {data} = useSWR(`${process.env.NEXT_PUBLIC_DOMAIN}/api/user/user-info`, fetcher)
  return data;
}

export default useGetUserInfo


