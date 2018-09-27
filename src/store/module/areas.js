import { queryAreas, queryAreass } from '@/api/areas'

export default {
  actions: {
    // 获取区域
    queryAreas () {
      return new Promise((resolve, reject) => {
        queryAreas().then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    queryAreass () {
      return new Promise((resolve, reject) => {
        queryAreass().then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
