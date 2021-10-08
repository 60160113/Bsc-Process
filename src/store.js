import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  sidebarShow: 'responsive',
  sidebarMinimize: false,
  asideShow: false,
  darkMode: false,
  id: '',
  email: '',
  fullname: '',
  department: '',
  departmentName: '',
  permission: '',
  groupPermission: '',
  iamat: null,
  token: ''
}

const mutations = {
  toggleSidebarDesktop(state) {
    const sidebarOpened = [true, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarOpened ? false : 'responsive'
  },
  toggleSidebarMobile(state) {
    const sidebarClosed = [false, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarClosed ? true : 'responsive'
  },
  set(state, [variable, value]) {
    state[variable] = value
  },
  toggle(state, variable) {
    state[variable] = !state[variable]
  },
  STORE_USER(state, payload) {
    state.id = payload.id
    state.email = payload.email
    state.fullname = payload.fullname
    state.department = payload.department
    state.departmentName = payload.departmentName
    state.permission = payload.permission
    state.groupPermission = payload.groupPermission
    state.token = payload.token
    state.iamat = payload.iamat
  }
}

const getters = {
  id: state => state.id,
  email: state => state.email,
  fullname: state => state.fullname,
  department: state => state.department,
  departmentName: state => state.departmentName,
  permission: state => state.permission,
  groupPermission: state => state.groupPermission,
  token: state => state.token,
  iamat: state => state.iamat
}

export default new Vuex.Store({
  state,
  mutations,
  getters
})