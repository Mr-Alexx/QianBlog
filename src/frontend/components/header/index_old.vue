<template>
  <div :class="['qian-navbar', {'qian-navbar--fixed': smallBar}]">
    <div class="qian-navbar__banner"></div>
    <div class="qian-container">
      <qian-row class="qian-menu-container">
        <!-- 头像 -->
        <qian-col :xs="4" :md="5" :lg="6" class="qian-avatar-container">
          <div class="qian-avatar">
            <img src="/static/images/frontend_avatar.jpg" alt="个人头像" class="qian-avatar__img">
          </div>
        </qian-col>
        <qian-col :xs="16" :md="14" :lg="12">
          <!-- <rect-menu :menu-list="menuList"></rect-menu> -->
          <line-menu :menu-list="menuList" @change="changeMenu" :active-route="activeRoute"></line-menu>
        </qian-col>
        <qian-col :xs="4" :md="5" :lg="6">
          <div class="qian-search">
            <input type="text" placeholder="请输入关键词" class="qian-search__input" v-model="searchValue">
            <qian-icon icon="md-search" class="qian-search__label" @click.native="search"></qian-icon>
          </div>
        </qian-col>
      </qian-row>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import RectMenu from './rectMenu.vue'
import LineMenu from './lineMenu.vue'

export default {
  name: 'navbar',
  components: {
    RectMenu,
    LineMenu
  },
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
  @import '@/frontend/styles/common/var.scss';
  @import '@/styles/mixins/mixins.scss';

  @include b(navbar) {
    background-color: $--color-white;
    @include utils-prefix(box-shadow, $--box-shadow-dark);
    @include e(banner) {
      min-height: 70px;
      background-image: url(https://s2.ax1x.com/2019/05/07/EyJsat.png); /* https://i.loli.net/2018/10/09/5bbc7c611eaf0.jpg */
      background-size: cover;
    }
    @include m(fixed) {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 10;
      height: $--menu-height;
      @include e(banner) {
        display: none;
      }
    }
  }
  .qian-avatar-container {
    position: relative;
    height: 100%;
  }
  @include b(menu-container) {
    height: $--menu-height;
    background-color: $--color-white;
  }
  // 头像
  @include b(avatar) {
    width: 180px;
    height: 180px;
    border: 5px solid $--color-white;
    border-radius: 50%;
    overflow: hidden;
    background-color: $--color-white;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -100px;
    margin-top: -125px;
    @include e(img) {
      width: 100%;
      height: 100%;
    }
  }
  // 搜索
  @include b(search) {
    float: right;
    position: relative;
    margin-top: ($--menu-height - 36px) / 2;
    @include e(input) {
      -webkit-appearance: none;
      outline: none;
      height: 36px;
      line-height: 36px;
      padding-left: 15px;
      padding-right: 40px;
      border: $--border-base;
      border-radius: 20px; // $--border-radius-base;
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
