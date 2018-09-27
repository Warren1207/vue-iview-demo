import axios from '@/libs/api.request'

export const queryFtp = (params) => {
  return axios.request({
    url: '/ftpinfo/list',
    params,
    method: 'get'
  })
}
export const ftpCombox = () => {
  return axios.request({
    url: '/ftpinfo/select',
    method: 'get'
  })
}
export const ftpState = ({ id, state }) => {
  const data = {
    id: id,
    state: state
  }
  return axios.request({
    url: '/ftpinfo/updatestate',
    data,
    method: 'post'
  })
}
export const ftpDel = ({ ids }) => {
  const data = {
    ids: ids
  }
  return axios.request({
    url: '/ftpinfo/delete',
    data,
    method: 'post'
  })
}
export const ftpAdd = (data) => {
  return axios.request({
    url: '/ftpinfo/add',
    data,
    method: 'post'
  })
}
export const ftpModify = (data) => {
  return axios.request({
    url: '/ftpinfo/update',
    data,
    method: 'post'
  })
}
export const ftpCheck = (data) => {
  return axios.request({
    url: '/ftpinfo/check',
    data,
    method: 'post'
  })
}
