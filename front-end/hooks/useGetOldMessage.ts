import useSWR  from 'swr'
import axiosClient from 'helper/axiosClient'

interface DataObj {
  data: any,
  isLoading: boolean,
  isError: any
}

const fetcher = async (url:string) => await axiosClient.get(url).then((res) => res.data);

const useGetOldMessage = (room_id: string, page: number) : DataObj => {
  const res = useSWR(`${process.env.NEXT_PUBLIC_DOMAIN}/api/chat/get-message-in-room?room_id=${room_id}&page=${page}`, fetcher)
  return {
    // data,
    // isLoading: !error && !data,
    // isError: error,
    data: res,
    isLoading: false,
    isError: false,
  }
}

export default useGetOldMessage

const { data, isLoading, isError } = useGetOldMessage()

