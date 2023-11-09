import { AxiosError, AxiosResponse } from "axios";
import {
  BASE_API_CONFIG,
  BASE_API_RESPONSE,
  ERROR_API_RESPONSE,
} from "../constants/interfaces";

const addPathVariables = (
  url: string,
  pathVariables?: Record<string, string | number>
) => {
  if (pathVariables) {
    for (const key of Object.keys(pathVariables)) {
      url = url.replace(`{${key}}`, pathVariables[key].toString());
    }
  }
  return url;
};

const createApiRequestFunction = <
  TPayload,
  TResponse extends BASE_API_RESPONSE
>(
  config: BASE_API_CONFIG<TPayload, TResponse>,
  payload?: TPayload
) => {
  return config.apiClient
    .request<AxiosError<ERROR_API_RESPONSE>, AxiosResponse<TResponse>>({
      method: config.method,
      url: addPathVariables(config.endpoint, config.pathVariables),
      data: payload,
      headers: config.headers,
      params: config.queryParams,
    })
    .then((response) => {
      if (response.data && response.data.status_code >= 400) {
        throw response;
      }
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export default createApiRequestFunction;
