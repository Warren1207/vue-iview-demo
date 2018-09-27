import axios from '@/libs/api.request'

export const queryTest = (params) => {
  return axios.request({
    url: '/teststandard/list',
    params,
    method: 'get'
  })
}
export const insertTest = (data) => {
  return axios.request({
    url: '/teststandard/add',
    data,
    method: 'post'
  })
}
export const delTest = (data) => {
  console.log(data)
  return axios.request({
    url: '/teststandard/delete',
    data,
    method: 'post'
  })
}
export const modifyTest = (data) => {
  return axios.request({
    url: '/teststandard/update',
    data,
    method: 'post'
  })
}
