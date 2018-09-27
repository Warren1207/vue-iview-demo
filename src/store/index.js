import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user'
import areas from './module/areas'
import plan from './module/plan'
import operator from './module/operator'
import subcontractor from './module/subcontractor'
import log from './module/log'
import ftp from './module/ftp'
import test from './module/test'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //
  },
  mutations: {
    //
  },
  actions: {
    //
  },
  modules: {
    user,
    areas,
    plan,
    operator,
    subcontractor,
    log,
    ftp,
    test
  }
})
