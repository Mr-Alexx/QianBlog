<template>
  <nav class="qian-asidenav">
    <router-link
      v-for="(item, i) in menuList"
      :key="i"
      :class="['qian-asidenav__item', {'is-active': activeRoute === item.name}]"
      @click.native="changeMenu(item.name)"
      :to="{name: item.name}">
      {{item.label}}
    </router-link>
  </nav>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'AppNav',
  computed: {
    ...mapState({
      menuList: state => state.app.menuList,
      activeRoute: state => state.app.activeRoute
    })
  },
  mounted () {
    // 保持当前激活的菜单
    this.$store.commit('SET_ACTIVEROUTE', sessionStorage.activeRoute || 'index')
  },
  methods: {
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

  @include b(asidenav) {
    position: fixed;
    top: $--menu-offset;
    // left: 0; // 跟随父元素
    width: $--asidenav-width;
    z-index: 2;
    font-size: $--font-size-middle;
    background-color: #fff;
    text-align: center;

    @include e(item) {
      display: block;
      padding: 6px 0;
      margin: 15px;
      color: $--color-text-secondary;
      border-radius: $--border-radius-base;

      &:nth-child(3) {
        position: relative;
        margin-bottom: 25px;
        &:after {
          position: absolute;
          bottom: -18px;
          left: 0;
          content: '';
          display: inline-block;
          width: 100%;
          height: 1px;
          background-color: mix($--color-info, $--color-white, 30%);
          margin: 5px 0;
        }
      }

      &:hover{
        color: $--color-main;
        background-color: mix($--color-info, $--color-white, 15%);
      }
      &.is-active {
        background-color: $--color-main;
        color: $--color-white;
      }
    }
  }
</style>
