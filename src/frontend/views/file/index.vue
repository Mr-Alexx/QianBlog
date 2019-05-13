<template>
  <div class="qian-mgb">
    <time-line :list="timelineList" is-link></time-line>
  </div>
</template>

<script>
import TimeLine from '@/frontend/components/timeLine'

export default {
  name: 'File',
  components: {
    TimeLine
  },
  computed: {
    timelineList () {
      return this.$store.state.app.timelineList
    }
  },
  created () {
    if (this.timelineList.length <= 0) {
      this.$store.dispatch('getTimelineList')
    }
  }
}
</script>

<style>

</style>
