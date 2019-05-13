<template>
  <div>
    <qian-card class="qian-relative">
      <article class="article-content markdown-body editormd-preview-container">
        <h2 class="qian-article-title">{{ article.title }}</h2>
        <div class="qian-article-source" :class="sourceCls">{{ article.source }}</div>
        <div v-html="article.html"></div>
      </article>
    </qian-card>
  </div>
</template>

<script>
import { getArticleById } from '@/frontend/api'
import QianCard from '@/frontend/components/card'

export default {
  name: 'customArticle',
  components: {
    QianCard
  },
  props: {
    id: [Number, String]
  },
  data () {
    return {
      article: {}
    }
  },
  computed: {
    sourceCls () {
      return this.article.source == '原创' ? '' : 'qian-article-source--primary'
    }
  },
  created () {
    // 进入时获取
    if (Object.keys(this.article).length === 0) {
      this.getArticle()
    }
  },
  methods: {
    getArticle () {
      getArticleById(this.id).then(res => {
        console.log(res)
        this.article = res.data.code === 1001 ? res.data.data : '获取文章失败'
      }).catch(err => {
        console.log(err)
      })
    }
  },
  watch: {
    // 切换文章时,重新获取
    id (id) {
      this.getArticle()
    }
  }
}
</script>

<style lang="scss">
  @import '@/styles/common/var.scss';
  @import '@/styles/mixins/mixins.scss';

  .qian-card.qian-relative {
    overflow: hidden;
  }
  .article-content {
    width: 100%;
  }
  @include b(container) {
    @include m(mgb) {
      margin-bottom: 15px;
    }
  }
  @include b(article-title) {
    border: none !important;
    text-align: center;
  }
  @include b(article-source) {
    position: absolute;
    top: -50px;
    left: -50px;
    width: 100px;
    line-height: 36px;
    padding-top: 64px;
    font-size: $--font-size-large;
    // font-weight: bold;
    background-color: $--color-main;
    color: $--color-white;
    text-align: center;

    @include m(primary) {
      background-color: $--color-primary;
    }

    @include utils-prefix(transform, rotate(-45deg));
  }
</style>
