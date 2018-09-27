import { queryPlan, insertPlan, modifyPlan, delPlan } from '@/api/plan'

export default {
  actions: {
    // 查询计划列表
    queryPlan ({ state }, params) {
      return new Promise((resolve, reject) => {
        queryPlan(params).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 新增计划列表
    insertPlanInfo ({ state }, data) {
      return new Promise((resolve, reject) => {
        insertPlan(data).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 修改计划列表
    modifyPlanInfo ({ state }, data) {
      return new Promise((resolve, reject) => {
        modifyPlan(data).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 删除计划列表
    deletePlanInfo ({ state }, data) {
      return new Promise((resolve, reject) => {
        delPlan(data).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
