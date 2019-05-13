<template>
  <footer class="qian-footer" :class="{ 'qian-footer--fixed': fixed }">
    <div class="qian-container">
      <qian-row>
        <qian-col :span="11">
          <span>&copy; 2019-{{currentYear}} 潜.</span>
          <span>
            <router-link
              v-for="(item, i) in menuList.slice(0, 3)"
              :key="i"
              :to="{ name: item.name }"
              class="qian-footer-link">
              {{ item.label }}
            </router-link>
          </span>
        </qian-col>
        <qian-col :span="2">
          <a :href="githubAddr" target="__blank" class="qian-footer-github">
            <svg height="24" viewBox="0 0 16 16" version="1.1" width="24" aria-hidden="true">
              <path fill="#DA3E9B" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
            </svg>
          </a>
        </qian-col>
        <qian-col :span="11">
          <span class="qian-fr">
            <router-link
              v-for="(item, i) in menuList.slice(3)"
              :key="i"
              :to="{ name: item.name }"
              class="qian-footer-link">
              {{ item.label }}
            </router-link>
          </span>
        </qian-col>
      </qian-row>
    </div>
  </footer>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'QianFooter',
  data () {
    return {
      githubAddr: 'https://github.com/Mr-Alexx/QianBlog'
    }
  },
  props: {
    fixed: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    currentYear () {
      return (new Date()).getFullYear()
    },
    ...mapState({
      menuList: state => state.app.menuList
    })
  }
}
</script>

<style lang="scss">
  @import '@/styles/common/var.scss';
  @import '@/styles/mixins/mixins.scss';

  @include b(footer) {
    height: $--footer-height;
    padding: ($--footer-height - 30px) / 2;
    background-color: #fff;
    overflow: hidden;
    font-size: $--font-size-small;
    color: $--color-text-secondary;

    @include m(fixed) {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
    }
  }
  @include b(footer-link) {
    display: inline-block;
    padding: 5px;
    margin: 0 5px;
    color: mix($--color-main, $--color-white, 60%);

    &:hover {
      color: $--color-main;
      text-decoration: underline;
    }
  }

  @include b(footer-github) {
    opacity: .5;
    display: block;
    width: 24px;
    margin: 2px auto 0 auto;

    &:hover {
      opacity: 1;
    }
  }
</style>
