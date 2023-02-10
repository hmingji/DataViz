import axios from 'axios';

axios.defaults.baseURL = process.env.API_URL ?? 'http://localhost:3000/api/v1/';

export const requests = {
  get: <ResType>(url: string, params?: URLSearchParams): Promise<ResType> =>
    axios
      .get<ResType>(url, { params })
      .then((response) => response.data)
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          console.log('error message: ', error.message);
          return error.message;
        } else {
          console.log('unexpected error: ', error);
          return error;
        }
      }),
};
