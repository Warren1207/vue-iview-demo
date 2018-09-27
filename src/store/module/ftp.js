import { queryFtp, ftpCombox, ftpAdd, ftpModify, ftpState, ftpDel, ftpCheck } from '@/api/ftp'

export default {
  actions: {
    // 获取ftp列表
    queryFtpList ({ commit }, params) {
      return new Promise((resolve, reject) => {
        queryFtp(params).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 获取ftp下拉列表
    ftpComboxList () {
      return new Promise((resolve, reject) => {
        ftpCombox().then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 启用、禁用ftp
    ftpState ({ commit }, { id, state }) {
      return new Promise((resolve, reject) => {
        ftpState({ id, state }).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 批量删除ftp
    ftpDel ({ commit }, { ids }) {
      return new Promise((resolve, reject) => {
        ftpDel({ ids }).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 添加ftp
    ftpAdd ({ commit }, data) {
      return new Promise((resolve, reject) => {
        ftpAdd(data).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 修改ftp
    ftpModify ({ commit }, data) {
      return new Promise((resolve, reject) => {
        ftpModify(data).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 测试连接
    ftpCheck ({ commit }, data) {
      return new Promise((resolve, reject) => {
        ftpCheck(data).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
