import axios from '@/libs/api.request'

export const queryOperator = (params) => {
  return axios.request({
    url: '/operator/list',
    params,
    method: 'get'
  })
}

export const operatorCombox = () => {
  return axios.request({
    url: '/operator/select',
    method: 'get'
  })
}

export const operatorAdd = (data) => {
  return axios.request({
    url: '/operator/add',
    data,
    method: 'post'
  })
}

export const operatorModify = (data) => {
  return axios.request({
    url: '/operator/update',
    data,
    method: 'post'
  })
}

export const operatorDel = (data) => {
  return axios.request({
    url: '/operator/delete',
    data,
    method: 'post'
  })
}
