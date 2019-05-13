<template>
  <qian-card bg="#fff" title="标签">
    <div v-if="list.length > 0" class="qian-tags">
      <qian-tag
        v-for="(item, i) in list"
        :key="i"
        :label="item.name"
        @click.native="tagClick(item)"
        :active="activeTag.name === item.name"></qian-tag>
    </div>
  </qian-card>
</template>

<script>
import QianCard from '../card'
import QianTag from './tag.vue'

export default {
  name: 'QianTags',
  components: {
    QianTag,
    QianCard
  },
  data () {
    return {
      activeTag: {}
    }
  },
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    tagClick (tag) {
      if (tag.name === this.activeTag.name) return
      this.activeTag = tag
      console.log(tag)
    }
  }
}
</script>

<style lang="scss">
  @import '@/styles/common/var.scss';
  @import '@/styles/mixins/mixins.scss';

  @include b(tags) {
    padding-left: 10px;
  }
</style>
