import axios from '@/libs/api.request'

export const queryPlan = (params) => {
  return axios.request({
    url: '/plan/list',
    params,
    method: 'get'
  })
}

export const insertPlan = (data) => {
  return axios.request({
    url: '/plan/add',
    data,
    method: 'post'
  })
}

export const modifyPlan = (data) => {
  return axios.request({
    url: '/plan/update',
    data,
    method: 'post'
  })
}

export const delPlan = (data) => {
  return axios.request({
    url: '/plan/delete',
    data,
    method: 'post'
  })
}
