import instance from './axiosInstance';
import axios from 'axios';


const http = {
  get(url: string, params: any = {}) {
    return instance.get(url, { params }).catch(err => {
      if (axios.isCancel(err)) {
        console.log(err);
      }
    });
  },
  post(url: string, data: any = {}) {
    return instance.post(url, data);
  }
};

export default http;
