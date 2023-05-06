import { AxiosRequestConfig, AxiosResponse } from "axios"

import getAuthAxiosAsync from "./axiosCreate"

export type ResponseError = {
  message: string
}

export const simpleFetcher = async (url: string, method = "GET") => {
  return fetch(url, { method }).then((response) => response.json())
}

interface FetcherOptions<PT> {
  endpointUrl: string
  payload?: PT // | Record<string, string> | string,
  method?: string
  headers?: Record<string, string>
}

export type ErrorResponse = {
  code: string
  message: string
}

export type PrismaErrorResponse = {
  error: ErrorResponse
}

export const fetcher = async <T, PT>({
  endpointUrl,
  payload,
  method = "GET",
  headers = {
    "Content-Type": "application/json;charset=UTF-8",
  },
}: FetcherOptions<PT>): Promise<T | PrismaErrorResponse> => {
  const response = await fetch(endpointUrl, {
    method,
    headers,
    // body: payload as BodyInit,
    body: JSON.stringify(payload),
  })

  const responseData: T | PrismaErrorResponse = await response.json()

  if (response.ok) {
    const successResponse: T = responseData as T

    return successResponse
  } else {
    const failResponse: PrismaErrorResponse =
      responseData as PrismaErrorResponse

    return failResponse
  }
}

export const singleGetRequest = async <Resp>(
  apiUrl: string,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<Resp>> => {
  const request = await getAuthAxiosAsync()

  return request.get<Resp>(apiUrl, config).catch((error: any) => {
    throw error
  })
}

export const multiGetRequest = async <Resp>(
  apiUrlArray: string[],
  config?: AxiosRequestConfig
): Promise<AxiosResponse<Resp>[]> => {
  const request = await getAuthAxiosAsync()

  const result = await Promise.all(
    apiUrlArray.map((apiUrl) => {
      return request.get(apiUrl, config)
    })
  )

  return result
}

export const singlePostRequest = async <Req, Resp>(
  apiUrl: string,
  params: Req,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<Resp>> => {
  const request = await getAuthAxiosAsync()

  return request.post<Resp>(apiUrl, params, config).catch((error: any) => {
    throw error
  })
}

export const singlePutRequest = async <Req, Resp>(
  apiUrl: string,
  params: Req,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<Resp>> => {
  const request = await getAuthAxiosAsync()

  return request.put<Resp>(apiUrl, params, config).catch((error: any) => {
    throw error
  })
}

export const deleteRequest = async <Resp>(
  apiUrl: string,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<Resp>> => {
  const request = await getAuthAxiosAsync()

  return request.delete(apiUrl, config).catch((error: any) => {
    throw error
  })
}
