<template>
  <div id="app">
    <div class="qian-app" :class="{'qian-app--pdt': smallBar}">
      <!-- 头部 -->
      <app-header></app-header>
      <!-- 内容 -->
      <div class="qian-container qian-container--pd app-content">
        <!-- 侧边导航栏 -->
        <app-nav></app-nav>
        <div class="qian-content">
          <transition name="fade-transform" mode="out-in">
            <router-view></router-view>
          </transition>
        </div>
        <!-- 音乐播放器 -->
        <div v-show="$route.name === 'music'" class="qian-content">
          <aplayer
            :music="music"
            :list="list"
            :showLrc="true"
            theme="#DA3E9B"
            :autoplay="true"></aplayer>
        </div>
      </div>
      <!-- 页脚 -->
      <app-footer></app-footer>
    </div>
    <!-- 右侧工具栏 -->
    <app-tools></app-tools>
    <!-- 遮罩 -->
    <div class="qian-appmask"></div>
  </div>
</template>

<script>
import AppHeader from '@/frontend/components/header'
import AppNav from '@/frontend/components/nav'
import AppFooter from '@/frontend/components/footer'
import AppTools from '@/frontend/components/tools'
import Aplayer from 'vue-aplayer'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppNav,
    AppFooter,
    AppTools,
    Aplayer
  },
  data () {
    return {
      smallBar: false
    }
  },
  computed: {
    music () {
      return this.$store.state.app.playlist.Body[0]
    },
    list () {
      return this.$store.state.app.playlist.Body
    }
  },
  mounted () {
    // window.addEventListener('scroll', this.handleScroll, true)
  },
  methods: {
    handleScroll (e) {
      const top = window.pageYOffset
      if (top >= 280) {
        if (this.smallBar) return
        this.smallBar = true
      } else {
        if (!this.smallBar) return
        this.smallBar = false
      }
    },
    handleClick () {
      console.log(2)
    }
  },
  watch: {
    '$route' (route) {
      sessionStorage.activeRoute = route.name
      this.$store.commit('SET_ACTIVEROUTE', route.name)
    }
  }
}
</script>

<style lang="scss">
  @import '@/frontend/styles/common/var.scss';
  @import '@/styles/mixins/mixins.scss';

  @include b(app) {
    position: relative;
    z-index: 2;
  }

  @include b(appmask) {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: url(https://s2.ax1x.com/2019/05/08/E6eTYj.jpg) no-repeat;
    background-attachment: fixed;
    z-index: 1;

    &:after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: rgba(235, 235, 235, .95);
    }
  }

  .app-content {
    min-height: calc(100% - #{$--footer-height});
    padding-bottom: 15px;
  }

  @include b(content) {
    padding-left: $--asidenav-width + 15px;
  }

  @include b(app) {
    @include m(pdt) {
      padding-top: $--menu-height + 280px;
    }
  }

  @include b(asidenav-container) {
    width: 100%;
    position: relative;
  }
</style>
