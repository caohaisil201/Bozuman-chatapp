import useSWR  from 'swr'

// example swr hook

const useSomeData = () => {
  const { data, error } = useSWR('/api/something')
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  }
}

export default useSomeData

// use this hook in some component:
const { data, isLoading, isError } = useSomeData()
// data in here is global. only 1 request sent to server althought we use this hook in many component

