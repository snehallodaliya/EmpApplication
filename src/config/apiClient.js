import axios from 'axios';

export const defaultAxios = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
    Expires: '0'
  },
});

export function apiClient({url, data = {}, method = 'POST', headers = {}, ...rest}) {
  return new Promise((resolve, reject) => {
    defaultAxios({
      method,
      url,
      headers:{},
      data:{},
      ...rest,
    }).then((res) => {
      resolve(res?.data);
    }).catch((err) => {
      reject(err?.response || err);
    });
  });
}
