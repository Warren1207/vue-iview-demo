import { queryOperator, operatorCombox, operatorModify, operatorAdd, operatorDel } from '@/api/operator'

export default {
  actions: {
    // 获取运营商列表
    queryOperatorList ({ state }, params) {
      return new Promise((resolve, reject) => {
        queryOperator(params).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 获取运营商下拉列表
    operatorComboxList () {
      return new Promise((resolve, reject) => {
        operatorCombox().then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 添加运营商
    operatorAdd ({ commit }, data) {
      return new Promise((resolve, reject) => {
        operatorAdd(data).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 修改运营商
    operatorModify ({ commit }, data) {
      return new Promise((resolve, reject) => {
        operatorModify(data).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 删除运营商
    operatorDel ({ commit }, data) {
      return new Promise((resolve, reject) => {
        operatorDel(data).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
