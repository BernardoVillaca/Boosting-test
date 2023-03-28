import { useQuery } from '@tanstack/react-query';



export const useFetch = ({ key, fn }) => {
    const { data } = useQuery({
        queryKey: [key],
        queryFn: fn
    })
    return data
}

export const useFetchWithLocalStorage = ({ key, fn }) => {
    const localStorageData = JSON.parse(window.localStorage.getItem(key));
    const { data } = useQuery({
        queryKey: [key],
        queryFn: async () => {
            const fetchedData = await fn()
            window.localStorage.setItem(key, JSON.stringify(fetchedData))
            return fetchedData
        },
        initialData: localStorageData
    })
    return data
}
