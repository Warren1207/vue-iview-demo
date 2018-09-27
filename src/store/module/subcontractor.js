import { querySubcontractor, subcontractorCombox, insertSubcontractor, modifySubcontractor, deleteSubcontractor } from '@/api/subcontractor'

export default {
  actions: {
    // 获取分包商列表
    querySubcontractorList ({ state }, params) {
      return new Promise((resolve, reject) => {
        querySubcontractor(params).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 分包商下拉框列表
    subcontractorComboxList () {
      return new Promise((resolve, reject) => {
        subcontractorCombox().then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 分包商新增
    insertSubcInfo ({ state }, data) {
      return new Promise((resolve, reject) => {
        insertSubcontractor(data).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 分包商修改
    modifySubcInfo ({ state }, data) {
      return new Promise((resolve, reject) => {
        modifySubcontractor(data).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 分包商删除
    deleteSubcInfo ({ state }, data) {
      return new Promise((resolve, reject) => {
        deleteSubcontractor(data).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
