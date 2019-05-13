<template>
  <aside class="app-tools">
    <ul class="qian-tools-list">
      <!-- <li class="qian-tools-list__item">猿</li> -->
      <li class="qian-tools-list__item">
        <a href="mailto:719876205@qq.com" class="icon icon-email"></a>
      </li>
      <li class="qian-tools-list__item" @mouseenter="scrollUp" @mouseleave="cancelAnimation('upId')" @click="goTop">
        <i class="icon icon-arrow-up"></i>
      </li>
      <li class="qian-tools-list__item" @mouseenter="scrollDown" @mouseleave="cancelAnimation('downId')" @click="goDown">
        <i class="icon icon-arrow-down"></i>
      </li>
    </ul>
  </aside>
</template>

<script>
export default {
  name: 'AppTools',
  data () {
    return {
      upId: undefined,
      downId: undefined
    }
  },
  methods: {
    cancelAnimation (method) {
      // 需要传入请求动画frame时产生的id
      window.cancelAnimationFrame(this[method])
    },
    scrollUp () {
      let currentScroll = document.documentElement.scrollTop || document.body.scrollTop
      if (currentScroll > 0) {
        this.upId = window.requestAnimationFrame(this.scrollUp)
        window.scrollTo(0, currentScroll - 1)
      }
    },
    scrollDown () {
      // 内容高度
      const clientHeight = document.documentElement.clientHeight || window.innerHeight
      const scrollHeight = document.body.scrollHeight
      // 先判断内容区域是否可以滚动
      // 当内容高度大于窗口高度时，为可滚动状态
      if (scrollHeight > clientHeight) {
        // 当前所在滚动位置
        let currentScroll = document.documentElement.scrollTop || document.body.scrollTop
        if (currentScroll < scrollHeight - clientHeight) {
          // 可以向下滚动时
          this.downId = window.requestAnimationFrame(this.scrollDown)
          window.scrollTo(0, currentScroll + 1)
        }
      }
    },
    goDown (direction) {
      // 内容高度
      const clientHeight = document.documentElement.clientHeight || window.innerHeight
      const scrollHeight = document.body.scrollHeight
      // 先判断内容区域是否可以滚动
      // 当内容高度大于窗口高度时，为可滚动状态
      if (scrollHeight > clientHeight) {
        // 当前所在滚动位置
        let currentScroll = document.documentElement.scrollTop || document.body.scrollTop
        if (currentScroll < scrollHeight - clientHeight) {
          // 可以向下滚动时
          window.requestAnimationFrame(this.goDown)
          window.scrollTo(0, currentScroll + (currentScroll / 20))
        }
      }
    },
    goTop () {
      let currentScroll = document.documentElement.scrollTop || document.body.scrollTop
      if (currentScroll > 0) {
        window.requestAnimationFrame(this.goTop)
        window.scrollTo(0, currentScroll - (currentScroll / 20))
      }
    }
  }
}
</script>

<style lang="scss">
  @import '@/frontend/styles/common/var.scss';
  @import '@/styles/mixins/mixins.scss';

  .app-tools {
    position: fixed;
    z-index: 3;
    right: calc((100% - 1060px) / 2 - 100px);
    bottom: 200px;
    cursor: pointer;
  }

  @include b(tools-list) {
    line-height: $--tools-height;
    text-align: center;
    background-color: #fff;
    font-size: $--font-size-middle;

    @include utils-prefix(box-shadow, $--box-shadow-dark);

    @include e(item) {
      width: $--tools-width;
      height: $--tools-height;

      &:first-child {
        @include utils-prefix(animation, twinkling 8s infinite);
        a {
          color: $--color-white;
        }
      }

      &:not(:last-child) {
        border-bottom: 1px solid mix($--color-info, $--color-white, 15%);
      }

      &:hover {
        background-color: mix($--color-info, $--color-white, 15%);
      }

      .icon {
        font-size: 24px;
      }
    }
  }

  @keyframes twinkling {
    from {
      background-color: $--color-main;
    }

    25% {
      background-color: $--color-primary;
    }

    50% {
      background-color: $--color-success;
    }

    75% {
      background-color: $--color-warning;
    }

    to {
      background-color: $--color-danger;
    }
  }
</style>
