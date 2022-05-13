import http from './http';
export const getQQInfo = (qq: string) => http.get('/api/qq.info', { qq })

const qqService = { getQQInfo };

export default qqService;
