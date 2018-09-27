import axios from '@/libs/api.request'
export const login = ({ userName, password }) => {
  const data = {
    username: userName,
    password: password
  }
  return axios.request({
    url: '/account/login',
    data,
    method: 'post'
  })
}

export const logout = () => {
  return axios.request({
    url: '/account/logout',
    method: 'post'
  })
}
export const getUserInfo = () => {
  return axios.request({
    url: '/account/userinfo',
    method: 'get'
  })
}

export const queryUser = (params) => {
  return axios.request({
    url: '/userinfo/list',
    params,
    method: 'get'
  })
}

export const insertUser = (data) => {
  return axios.request({
    url: '/userInfo/add',
    data,
    method: 'post'
  })
}

export const disableUser = (data) => {
  return axios.request({
    url: '/userinfo/disable',
    data,
    method: 'post'
  })
}

export const enableUser = (data) => {
  return axios.request({
    url: '/userinfo/enable',
    data,
    method: 'post'
  })
}

export const modifyUser = (data) => {
  return axios.request({
    url: '/userinfo/update',
    data,
    method: 'post'
  })
}
