<template>
  <div class="tags" v-bind:class="{ active: data.isActive }">
    <img v-if="data.isActive" src="../assets/icons/tag.svg" alt="">
    <img v-else src="../assets/icons/tagNoActive.svg" alt="">
    <span class="tag">{{ data.tag }}</span>
  </div>
</template>

<style lang="scss">
.tags {
  display: flex;
  align-items: center;
  padding: 7px 17px;
  border-radius: 40px;
  background-color: #F2F4F8;
  color: #6833FF;
  .tag {
    margin-left: 9px;
  }
}
.active {
  color: white;
  background-color: #6833FF;
}
</style>

<script lang="ts">
import { defineComponent, reactive, onMounted, watch } from 'vue'

export default defineComponent({
  name: 'search-area',
  props: {
    tag: String,
    isActive: Boolean
  },
  emits: ['onChange'],
  setup (props, ctx) {
    const data = reactive({
      tag: '' as any,
      isActive: false
    })
    onMounted(() => {
      if (props.tag && props.tag !== '') {
        data.tag = props.tag
      }
      data.isActive = props.isActive
    })
    watch(() => props.tag, (newVal: any) => {
      if (newVal && newVal !== '') {
        data.tag = newVal
      }
    })
    watch(() => props.isActive, (newVal: any) => {
      data.isActive = newVal
      if (data.isActive) {
        ctx.emit('onChange', data.tag)
      }
    })
    return {
      data
    }
  }
})

</script>
