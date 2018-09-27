import { queryTest, insertTest, delTest, modifyTest } from '@/api/test'

export default {
  actions: {
    // 查询测试列表
    queryTest ({ state }, params) {
      return new Promise((resolve, reject) => {
        queryTest(params).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 新增测试列表
    insertTestInfo ({ state }, data) {
      return new Promise((resolve, reject) => {
        insertTest(data).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 删除测试列表
    deleteTestInfo ({ state }, data) {
      console.log({ state })
      return new Promise((resolve, reject) => {
        delTest(data).then(res => {
          console.log(res)
          resolve(res.data)
        }).catch(err => {
          console.log(err)
          reject(err)
        })
      })
    },
    // 修改计划列表
    modifyTestInfo ({ state }, data) {
      return new Promise((resolve, reject) => {
        modifyTest(data).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
