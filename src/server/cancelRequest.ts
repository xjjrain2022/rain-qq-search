import axios, { AxiosRequestConfig } from "axios"

const pendings: any = {};

const addPending = (config: AxiosRequestConfig) => {
  const { url, method, data, headers } = config;
  const id = [url, method, JSON.stringify(data), JSON.stringify(headers)].join('&');
  const cancel = pendings[id];
  config.cancelToken = config.cancelToken || new axios.CancelToken(c => {
    if (!cancel) {
      // 不存在，就存进去
      pendings[id] = c;
    }
  })
  return config;
}

const removePending = (config: AxiosRequestConfig) => {
  const { url, method, data, headers } = config;
  const id = [url, method, JSON.stringify(data), JSON.stringify(headers)].join('&');
  const cancel = pendings[id];
  if (cancel && typeof cancel == 'function') {
    // 存在这个请求，删除
    cancel();
    delete pendings[id];
    console.log('请求频繁,加载中');
  }
}

// 清除所有请求
const clearPendings = () => {
  Object.keys(pendings).forEach(i => pendings[i]())
}

const pendingFuncs = { addPending, removePending, clearPendings };

export default pendingFuncs;
