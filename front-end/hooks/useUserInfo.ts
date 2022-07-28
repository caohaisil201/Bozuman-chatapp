import useSWR  from 'swr'
import axiosClient from 'helper/axiosClient'

interface DataObj {
  data: any,
  isLoading: boolean,
  isError: any
}

const fetcher = async (url:string) => await axiosClient.get(url).then((res) => res.data);

const useUserInfo = () : DataObj => {
  const res = useSWR(`${process.env.NEXT_PUBLIC_DOMAIN}/users/info`, fetcher)
  return {
    // data,
    // isLoading: !error && !data,
    // isError: error,
    data: res,
    isLoading: false,
    isError: false,
  }
}

export default useUserInfo

// use this hook in some component:
const { data, isLoading, isError } = useUserInfo()
// data in here is global. only 1 request sent to server althought we use this hook in many component

