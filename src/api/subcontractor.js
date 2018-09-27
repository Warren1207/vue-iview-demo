import axios from '@/libs/api.request'

export const querySubcontractor = (params) => {
  return axios.request({
    url: '/subcontractor/list',
    params,
    method: 'get'
  })
}
export const subcontractorCombox = () => {
  return axios.request({
    url: '/subcontractor/select',
    method: 'get'
  })
}
export const insertSubcontractor = (data) => {
  return axios.request({
    url: '/subcontractor/add',
    data,
    method: 'post'
  })
}
export const modifySubcontractor = (data) => {
  return axios.request({
    url: '/subcontractor/update',
    data,
    method: 'post'
  })
}
export const deleteSubcontractor = (data) => {
  return axios.request({
    url: '/subcontractor/delete',
    data,
    method: 'post'
  })
}
