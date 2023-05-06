import useSWR, { KeyedMutator, SWRConfiguration } from "swr"

type UseSWRAppData<T> = {
  data: T
  error: any
  mutate: KeyedMutator<T>
  isLoading: boolean
  isValidating: boolean
}

const useSWRAppData = <T>(
  key: string | null,
  fetcher: null | ((url: string) => Promise<any>),
  options?: SWRConfiguration
): UseSWRAppData<T> => {
  const { data, error, mutate, isLoading, isValidating }: UseSWRAppData<T> =
    useSWR(!key ? null : key, fetcher, { ...options })

  return { data, error, mutate, isLoading, isValidating }
}

export default useSWRAppData
