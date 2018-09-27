import axios from '@/libs/api.request'

export const queryLog = (params) => {
  return axios.request({
    url: '/log/list',
    params,
    method: 'get'
  })
}
