import Axios, { AxiosInstance } from "axios"

import { assertIsTrue } from "../../utils/helpers/valueCheckers"

let authAxiosInstance: AxiosInstance | undefined

// creating the axios allows us to request cross origin to a separate BE.
// If we need to make requests to 3rd party apis we can use the standard axios instance.
const makeAuthAxios = async () => {
  authAxiosInstance = Axios.create({
    // baseURL: import.meta.env.VITE_PUBLIC_BACKEND_URL,
    headers: {
      "X-Requested-With": "XMLHttpRequest",
    },
    withCredentials: true,
  })
  // authAxiosInstance.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest"
}

// Create our AxiosInstance using lazy instantiation,
const getAxiosAsync = async (): Promise<AxiosInstance> => {
  if (authAxiosInstance === undefined) {
    await makeAuthAxios()
  }

  assertIsTrue(authAxiosInstance !== undefined)
  return authAxiosInstance as AxiosInstance
}

export default getAxiosAsync
