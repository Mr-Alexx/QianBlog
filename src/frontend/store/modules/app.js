import {
  getAllArticle,
  getTags,
  getArticleSum,
  getPaginationArticle,
  getFeaturedList,
  getTimelineList
} from '@/frontend/api'
import playlist from '@/../static/songs/songs.js'

export default {
  state: {
    menuList: [
      {name: 'index', label: '主页', icon: ''},
      {name: 'file', label: '归档', icon: ''},
      {name: 'tag', label: '标签', icon: ''},
      {name: 'music', label: '音乐', icon: ''},
      {name: 'movie', label: '电影', icon: ''},
      {name: 'message', label: '留言', icon: ''}
    ],
    tagList: [],
    activeRoute: 'index',
    articleList: [],
    featuredList: [], // 推荐列表
    timelineList: [], // 归档列表
    count: 0,
    playlist
  },
  mutations: {
    'SET_ACTIVEROUTE' (state, routeName) {
      state.activeRoute = routeName
    },
    'SET_ARTICLELIST' (state, list) {
      state.articleList = list
    },
    'SET_TAGLIST' (state, list) {
      state.tagList = list
    },
    'SET_COUNT' (state, count) {
      state.count = count
    },
    'SET_FEATUREDLIST' (state, list) {
      state.featuredList = list
    },
    'SET_TIMELINELIST' (state, list) {
      state.timelineList = list
    }
  },
  actions: {
    getArticleList ({ commit }) {
      getAllArticle().then(res => {
        commit('SET_ARTICLELIST', res.data.data)
      })
    },
    getTagList ({ commit }) {
      getTags().then(res => {
        commit('SET_TAGLIST', res.data.data)
      })
    },
    // 获取分页总数
    async getArticleSum ({ commit }) {
      const res = await getArticleSum()
      commit('SET_COUNT', res.data.data.count || 0)
    },
    async getPaginationArticle ({ commit }, { page, limit }) {
      const res = await getPaginationArticle(page, limit)
      commit('SET_ARTICLELIST', res.data.data || [])
    },
    // 获取推荐列表
    getFeaturedList ({ commit }) {
      getFeaturedList().then(res => {
        commit('SET_FEATUREDLIST', res.data.data || [])
      }).catch(err => console.log(err))
    },
    // 获取归档信息
    getTimelineList ({commit}) {
      getTimelineList().then(res => {
        commit('SET_TIMELINELIST', res.data.data || [])
      }).catch(err => console.log(err))
    }
  }
}
