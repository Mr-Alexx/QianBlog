<template>
  <header :class="['qian-header', {'qian-header--fixed': smallBar}]">
    <div class="qian-container">
      <div class="qian-logo">
        <!-- shinny bar -->
        <div class="qian-logo__shinnybar" @click="$router.push('/')"></div>
          <img src="/static/images/logo_2.png" alt="logo" class="qian-logo__picture">
      </div>
      <div class="qian-search">
        <input type="text" placeholder="请输入关键词" class="qian-search__input" v-model="searchValue">
        <qian-icon icon="md-search" class="qian-search__label" @click.native="search"></qian-icon>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'AppHeader',
  props: {
    smallBar: Boolean
  },
  data () {
    return {
      searchValue: ''
    }
  },
  computed: {
    ...mapState({
      menuList: state => state.app.menuList,
      activeRoute: state => state.app.activeRoute
    })
  },
  created () {
    // 保持当前激活的菜单
    this.$store.commit('SET_ACTIVEROUTE', sessionStorage.activeRoute || 'index')
  },
  methods: {
    search () {
      if (!this.searchValue) return
      console.log(this.searchValue)
    },
    changeMenu (routeName) {
      sessionStorage.activeRoute = routeName
      this.$store.commit('SET_ACTIVEROUTE', routeName)
    }
  }
}
</script>

<style lang="scss">
  @import '@/styles/common/var.scss';
  @import '@/styles/mixins/mixins.scss';

  @include b(header) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: $--menu-height;
    z-index: 999;
    background-color: rgba(255, 255, 255, 0.85);
    @include utils-prefix(box-shadow, rgb(235, 235, 235));

    .qian-container {
      height: 100%;
    }
  }

  @include b(logo) {
    height: 100%;
    width: $--asidenav-width + 15px;
    float: left;
    position: relative;

    /* 闪光条 */
    @include e(shinnybar) {
      position: absolute;
      width: 100%;
      height: 100%;
      overflow: hidden;
      cursor: pointer;

      &:after {
        content: '';
        display: inline-block;
        width: 20px;
        height: calc(100% + 60px);
        @include utils-prefix(transform, translateX(-50px) translateY(-30px) rotateZ(45deg));
        background: radial-gradient(#fff,rgba(255, 255, 255, .25),rgba(255, 255, 255, 0));
        @include utils-prefix(animation, shinnybar 6s ease-in-out infinite);
      }
    }
    @keyframes shinnybar {
      from {
        @include utils-prefix(transform, translateX(-50px) translateY(-30px) rotateZ(45deg));
      }
      to {
        @include utils-prefix(transform, translateX(195px) translateY(-30px) rotateZ(45deg));
      }
    }
    @include e(picture) {
      display: inline-block;
      height: $--logo-height;
      margin-top: ($--menu-height - $--logo-height) / 2;
      width: auto;
    }
  }

  /* 搜索 */
  @include b(search) {
    float: left;
    position: relative;
    margin-top: ($--menu-height - $--search-height) / 2;
    @include e(input) {
      -webkit-appearance: none;
      outline: none;
      height: $--search-height;
      line-height: $--search-height;
      padding-left: 15px;
      padding-right: 40px;
      border: $--border-base;
      border-radius: $--border-radius-base;
      background-color: rgba(255, 255, 255, 0);
      @include utils-prefix(transition, $--border-transition-base);
      font-size: $--font-size-base;
      &:hover {
        border-color: $--border-color-hover;
      }
      &:focus {
        border-color: $--color-main;
      }
      &::-webkit-input-placeholder {
        color: $--color-text-placeholder;
      }
    }
    @include e(label) {
      position: absolute;
      top: 50%;
      margin-top: -18px;
      right: 5px;
      z-index: 2;
      width: 36px;
      height: 100%;
      border-radius: 50%;
      text-align: center;
      line-height: 36px;
      cursor: pointer;
      font-size: 20px;
      color: $--color-text-placeholder;
      @include utils-prefix(transition, $--all-transition);
      &:hover, &:active {
        color: $--color-main;
      }
    }
  }
</style>
