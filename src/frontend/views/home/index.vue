<template>
  <div>
    <qian-row :gutter="15">
      <qian-col :xs="24" :md="17" class="qian-relative">
        <transition name="fade-transform" mode="out-in">
          <div v-show="$route.name === 'index'">
            <qian-article-list :list="articleList"></qian-article-list>
            <el-pagination
              layout="prev, pager, next"
              :total="count"
              :page-size="pageSize"
              :current-page="currentPage"
              @current-change="changePage">
            </el-pagination>
          </div>
        </transition>
        <transition name="fade-transform" mode="out-in">
          <router-view></router-view>
        </transition>
      </qian-col>
      <qian-col :xs="0" :md="7">
        <div class="qian-article-aside">
          <qian-featured :list="featuredList"></qian-featured>
          <qian-tags :list="tagList"></qian-tags>
        </div>
      </qian-col>
    </qian-row>
  </div>
</template>

<script>
import QianMessageBoard from '@/frontend/components/messageBoard'
import QianTags from '@/frontend/components/tags'
import QianFeatured from '@/frontend/components/featured'
import QianCard from '@/frontend/components/card'
import QianArticleList from '../article/list.vue'
import { mapState } from 'vuex'
import { thumbnail } from '@/frontend/filters'
import { timeFilter } from '@/filters'

export default {
  name: 'home',
  components: {
    QianMessageBoard,
    QianTags,
    QianFeatured,
    QianCard,
    QianArticleList
  },
  data () {
    return {
      currentPage: 1,
      pageSize: 8
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
  },
  computed: {
    ...mapState({
      articleList: state => state.app.articleList,
      featuredList: state => state.app.featuredList,
      tagList: state => state.app.tagList,
      count: state => state.app.count
    })
  },
  async created () {
    if (!this.count) {
      await this.$store.dispatch('getArticleSum')
    }
    if (this.articleList.length <= 0) {
      await this.$store.dispatch('getPaginationArticle', {page: this.currentPage, limit: this.pageSize})
    }
    this.featuredList.length <= 0 && this.$store.dispatch('getFeaturedList')
    this.tagList.length <= 0 && this.$store.dispatch('getTagList')
  },
  methods: {
    changePage (page) {
      this.$store.dispatch('getPaginationArticle', {page, limit: this.pageSize})
      window.scrollTo(0, 0)
    }
  }
}
</script>

<style lang="scss">
  @import '@/styles/common/var.scss';
  @import '@/styles/mixins/mixins.scss';

  .el-pagination {
    text-align: center;
    margin-bottom: 15px;
    [class*="btn"], ul, li {
      background-color: transparent !important;
    }
  }
  .el-pager li.active {
    color: $--color-main;
  }
  /* 右侧侧栏 */
  @include b(article-aside) {
    position: fixed;
    width: 247px;
  }
</style>
