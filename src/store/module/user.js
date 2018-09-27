import { login, logout, getUserInfo, queryUser, insertUser, disableUser, enableUser, modifyUser } from '@/api/user'
import { setToken, getToken } from '@/libs/utils'

export default {
  state: {
    UserName: '',
    UserType: '',
    AreaId: '',
    FtpId: '',
    OperatorId: '',
    SubcontractorId: '',
    token: getToken()
  },
  mutations: {
    setUserName (state, name) {
      state.UserName = name
    },
    setUserType (state, type) {
      state.UserType = type
    },
    setAreaId (state, AreaId) {
      state.AreaId = AreaId
    },
    setFtpId (state, FtpId) {
      state.FtpId = FtpId
    },
    setOperatorId (state, OperatorId) {
      state.OperatorId = OperatorId
    },
    setSubcontractorId (state, SubcontractorId) {
      state.SubcontractorId = SubcontractorId
    },
    setToken (state, token) {
      state.token = token
      setToken(token)
    }
  },
  actions: {
    // 登录
    handleLogin ({ commit }, { userName, password }) {
      userName = userName.trim()
      return new Promise((resolve, reject) => {
        login({
          userName,
          password
        }).then(res => {
          const data = res.data.Data
          if (data) {
            commit('setToken', data.Token)
          }
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 登出
    handleLogout ({ commit }) {
      return new Promise((resolve, reject) => {
        logout().then(res => {
          const data = res.data.Data
          if (data) {
            commit('setToken', '')
          }
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 获取用户相关信息
    getUserInfo ({ state, commit }) {
      return new Promise((resolve, reject) => {
        getUserInfo().then(res => {
          const data = res.data.Data
          if (data) {
            commit('setUserName', data.UserName)
            commit('setUserType', data.UserType)
            commit('setAreaId', data.AreaIds)
            commit('setFtpId', data.FtpId)
            commit('setOperatorId', data.OperatorId)
            commit('setSubcontractorId', data.SubcontractorId)
          }
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 获取用户相关信息
    queryUserList ({ commit }, params) {
      return new Promise((resolve, reject) => {
        queryUser(params).then(res => {
          const data = res.data
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 新增用户
    insertUserInfo ({ state }, data) {
      return new Promise((resolve, reject) => {
        insertUser(data).then(res => {
          const data = res.data
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 禁用用户
    disableUserInfo ({ state }, data) {
      return new Promise((resolve, reject) => {
        disableUser(data).then(res => {
          const data = res.data
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 启用用户
    enableUserInfo ({ state }, data) {
      return new Promise((resolve, reject) => {
        enableUser(data).then(res => {
          const data = res.data
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 修改用户
    modifyUserInfo ({ state }, data) {
      return new Promise((resolve, reject) => {
        modifyUser(data).then(res => {
          const data = res.data
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
