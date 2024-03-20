import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const baseClient = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_API_URL}/api`,
  // withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const onRequestSuccess = async (config: InternalAxiosRequestConfig) => {
  config.headers = config.headers ?? {};
  return config;
};

export const onRequestError = (
  error: AxiosError | Error
): Promise<AxiosError> => {
  const errMessage = error.message ?? error;
  return Promise.reject(errMessage);
};

// -------- Response Interceptors -------
export const onResponseSuccess = async (response: AxiosResponse) => {
  return response;
};

export const onResponseError = async (error: AxiosError) => {
  // TODO: handle error
  // const errorCodeAxios = error.response?.status

  // if (errorCodeAxios === 401) {

  // }
  // if (errorCodeAxios === 403) {

  // }
  return Promise.reject(error);
};

baseClient.interceptors.request.use(onRequestSuccess, onRequestError);
baseClient.interceptors.response.use(onResponseSuccess, onResponseError);

export default baseClient;
