import Vue from 'vue';
import Vuex from 'vuex';
import Cookies from 'js-cookie'

import variables from '@/styles/element-variables.scss'

import {login,logout,getInfo} from '../api/user.js'
import router, { resetRouter,BaseRoutes,asyncRoutes } from '@/router'
import {getToken,setToken,removeToken} from '@/utils/auth.js'

Vue.use(Vuex);
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}
export function filterAsyncRoutes(routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}

const state = {
 token: getToken(),
 theme:variables.theme,/* 主题 */
 fixedHeader:true,/* 是否固定头部 */
 sidebar: {/* 侧边栏状态 */
   opened: true,
   withoutAnimation: false
 },
 addRoutes:[],
 routes:[],/* 侧边栏导航路由 */
 roles:[],
 peopleName:''
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_ROLES: (state, roles) => {
    if (typeof(roles)=="object") {
      state.roles = roles
    } else{
      state.roles.push(roles)
    }
  },
  SET_NAME: (state, name) => {
    state.peopleName=name
  },
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = BaseRoutes.concat(routes)
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  login({ commit }, userInfo) {
    const { accountName, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ accountName: accountName.trim(), password: password }).then(response => {
        const data = response
        commit('SET_TOKEN', data.result.token)
        setToken(data.result.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout({token:state.token}).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo({token:state.token}).then(response => {
        const { result } = response
        if (!response.success) {
          reject('Verification failed, please Login again.')
        }
        const { peopleType, peopleName } = result
        commit('SET_ROLES', peopleType)
        commit('SET_NAME', peopleName)
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  /* */
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  },
  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
   }
}

const getters = {
  routes: state => state.routes,
  sidebar: state => state.sidebar,
  token:state=>state.token,
  peopleName:state=>state.peopleName,
  roles:state=>state.roles
}


export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})
