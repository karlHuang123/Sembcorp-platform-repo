<template>
  <div class="search-area">
    <div class="icon"><img src="../assets/icons/search-icon.svg" /></div>
    <div style="flex: 1"><input v-model="data.inputValue" class="input" type="text" @input="handleInput" /></div>
  </div>
</template>

<style lang="scss">
.search-area {
  display: flex;
  .icon {
    background-color: #F2F4F8;
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 5px 0 24px;
  }
  .input[type="text"] {
      font-size: 20px;
      padding: 24px 0;
      border-top-right-radius: 12px;
      border-bottom-right-radius: 12px;
      border: none;
      border-left:none;
      font-weight: 700;
      background-color: #F2F4F8;
      -web-kit-appearance:none;
      -moz-appearance: none;
      outline:0;
      text-decoration:none;
      width: 100%;
  }
}
</style>

<script lang="ts">
import { defineComponent, reactive, onMounted, watch } from 'vue'

export default defineComponent({
  name: 'search-area',
  props: {
    keyword: String
  },
  emits: ['onChange'],
  setup (props, ctx) {
    const data = reactive({
      inputValue: '' as any
    })
    const handleInput = () => {
      ctx.emit('onChange', data.inputValue)
    }
    onMounted(() => {
      if (props.keyword && props.keyword !== '') {
        data.inputValue = props.keyword
      }
    })
    watch(() => props.keyword, (newVal: any) => {
      if (newVal && newVal !== '') {
        data.inputValue = newVal
      }
    })
    return {
      data,
      handleInput
    }
  }
})

</script>
