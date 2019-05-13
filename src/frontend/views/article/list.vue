<template>
  <div>
    <ul class="qian-article-list" v-if="list.length > 0">
      <li
        class="qian-card qian-card--white qian-article-item"
        v-for="(item, i) in list"
        :key="i">
        <div :span="6" class="qian-article-item__thumbnail">
          <span
            class="qian-article-item__source"
            :class="{'qian-article-item__source--primary': item.source == '转载'}">{{ item.source }}</span>
          <router-link :to="`/article/${item.id}`">
            <img :src="item.thumbnail | thumbnail">
          </router-link>
        </div>
        <div :span="18" class="qian-article-item__content">
          <h3>
            <router-link :to="`/article/${item.id}`">
              {{item.title}}
            </router-link>
          </h3>
          <div>
            <p>{{item.summary | summaryFilter}}</p>
          </div>
          <div>
            <div>
              <span>
                <qian-icon icon="ios-happy"></qian-icon>
                {{item.update_time | timeFilter}}
              </span>
              <span>
                <qian-icon icon="ios-eye"></qian-icon>
                {{item.views}}
              </span>
              <span>
                <qian-icon icon="ios-at"></qian-icon>
                {{item.comments}}
              </span>
              <span>
                <qian-icon icon="ios-apple"></qian-icon>
                {{item.likes}}
              </span>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <p style="text-align: center" v-else>暂无文章...</p>
  </div>
</template>

<script>
import { thumbnail } from '@/frontend/filters'
import { timeFilter } from '@/filters'

export default {
  name: 'QianArticleList',
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  filters: {
    thumbnail,
    timeFilter,
    summaryFilter (summary) {
      let str = summary
      if (summary.length > 120) {
        str = summary.substring(0, 120) + '......'
      }
      return str
    }
  }
}
</script>

<style lang="scss">
  @import '@/styles/common/var.scss';
  @import '@/styles/mixins/mixins.scss';

  @include b(article-List) {
    overflow: hidden;
  }
  @include b(article-item) {
    @include utils-clearfix;
    height: 140px;
    margin-bottom: 15px;
    position: relative;
    overflow: hidden;
    @include utils-prefix(transition, $--all-transition);
    &:hover {
      // @include utils-prefix(transform, translateY(-1px));
      @include e(thumbnail) {
        img {
          // @include utils-prefix(transform, translate3d(-3px, 0, 0));
          left: -3px;
        }
      }
    }

    @include e(source) {
      position: absolute;
      top: -30px;
      left: -30px;
      width: 60px;
      line-height: 20px;
      padding-top: 40px;
      font-size: 12px;
      background-color: rgba(218, 22, 155, .7);
      color: $--color-white;
      text-align: center;
      z-index: 2;

      @include m(primary) {
        background-color: rgba(64, 158, 255, .7);
      }
      @include utils-prefix(transform, rotate(-45deg));
    }
    // 缩略图
    @include e(thumbnail) {
      float: left;
      width: 35%;
      height: 100%;
      overflow: hidden;
      margin-right: 15px;
      position: relative;
      img {
        width: calc(100% + 3px);
        height: auto;
        position: relative;
        left: 0;
        @include utils-prefix(transition, all .3s linear);
        // &:hover {
        //   @include utils-prefix(transform, scale(1.015, 1.02));
        // }
      }
    }
    @include e(content) {
      float: left;
      max-width: calc(100% - 235px);
      height: 100%;
      color: $--color-text-secondary;
      >h3 {
        font-size: $--font-size-middle;
        font-weight: 500;
        a {
          @include utils-prefix(transition, padding-left .3s linear);
          &:hover {
            color: $--color-main;
            text-decoration: underline;
            padding-left: 10px;
          }
        }
      }
      >h3, >div {
        height: 30px;
      }
      >div:nth-child(2) {
        height: calc(100% - 60px);
        padding-top: 10px;
        overflow: hidden;
      }
      >div:last-child {
        display: table;
        div {
          display: table-cell;
          vertical-align: bottom;
          span {
            display: inline-block;
            margin-right: 15px;
            i {
              vertical-align: middle;
            }
          }
        }
      }
      >p, >div {
        font-size: $--font-size-small;
      }
    }
  }
</style>
