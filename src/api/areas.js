import axios from '@/libs/api.request'

export const queryAreas = () => {
  return axios.request({
    url: '/areas/listlb',
    method: 'get'
  })
}
export const queryAreass = () => {
  return axios.request({
    url: '/areas/listit',
    method: 'get'
  })
}
