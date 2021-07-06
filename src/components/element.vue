<template>
  <div class="element" @click="goTo(value.url)">
    <div class="element-container">
      <div class="image"><img :src="value.image" alt=""></div>
      <div class="information">
        <div class="title">{{ value.title }}</div>
        <div class="description">{{ value.description }}</div>
      </div>
      <div class="icon">
        <img src="../assets/icons/arrow.svg" alt="">
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.element {
  border-radius: 12px;
  padding-right: 12px;
  .element-container {
    cursor: pointer;
    display: flex;
    padding: 12px;
    align-items: center;
    border-radius: 12px;
    .image {
      height: 76px;
      width: 76px;
      border-radius: 10px;
      img {
        width: 100%;
        border-radius: 10px;
      }
    }
    .information {
      text-align: left;
      margin-left: 20px;
      .title {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 8px;
      }
      .description {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 16px;
        color: #999FAA;
        width: 450px;
      }
    }
    .icon {
      visibility: hidden;
      margin-left: auto;
    }
  }
}
.element-container:hover {
  background-color: #F2F4F8;
  .icon {
    visibility: visible;
  }
}
</style>

<script lang="ts">
import { defineComponent, reactive, onMounted, watch } from 'vue'

export default defineComponent({
  name: 'element',
  props: {
    value: Object
  },
  emits: ['onChange'],
  setup (props, ctx) {
    const data = reactive({
      tag: '' as any
    })
    const goTo = (url: string) => {
      window.open(url, "_blank")
    }
    return {
      data,
      goTo
    }
  }
})

</script>
