<template>
  <div class="main-container">
    <div class="search-container">
      <div class="input-container"><search :keyword="data.keyword" @onChange="handleInputChange" /></div>
      <div class="tags-container">
        <div class="my-tags" v-for="(item, index) in data.options" @click="clickTag(index)" v-bind:key="index">
          <tags :tag="item.tag" :isActive="item.isActive" @onChange="handleQuickSearch" />
        </div>
      </div>
      <div class="result-container">
        <div class="no-result-container" v-if="data.showLoading">
          <img class="no-result spin" src="../assets/icons/Loader.png" alt="">
        </div>
        <div class="result-list">
          <img
            class="no-result"
            v-bind:style="{'visibility': data.showLoading?'hidden': 'visible'}"
            v-if="(data.result === null || data.result.length === 0) && !config.resultErr"
            src="../assets/icons/noResult.png" alt="">
            <img
              class="no-result"
              v-bind:style="{'visibility': data.showLoading?'hidden': 'visible'}"
              v-if="(data.result === null || data.result.length === 0) && config.resultErr"
              src="../assets/icons/error.png" alt="">
          <div class="emelent-list" v-else>
            <div class="" v-for="(item, index) in data.result" v-bind:key="index">
              <result-element :value="item" />
            </div>
          </div>
        </div>
      </div>
      <div class="result-number">
        <div class="" v-if="!config.resultErr">
          <div class="searching" v-if="data.showLoading">Searching...</div>
          <div class="searching" v-else>
            <span v-if="data.result.length && data.result.length > 0">
              {{ data.result.length && data.result.length > 1?data.result.length + ' results' : '1 result' }}
            </span>
            <span v-else>No result</span>
          </div>
        </div>
        <div class="error" v-else>
          <span>{{ config.errMessage }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.main-container {
  height: 100%;
  .search-container {
    padding: 24px;
    position: relative;
    margin-top: -142px;
    min-height: 150px;
    border-radius: 20px;
    width: 690px;
    margin: 135px auto auto;
    background-color: #FFFFFF;
  }
  .tags-container {
    text-align: left;
    margin-top: 20px;
    .my-tags {
      cursor: pointer;
      display: inline-block;
      margin: 0 8px;
    }
    .my-tags:first-child {
      margin-left: 0;
    }
  }
  .result-container {
    position: relative;
    .no-result-container {
      background-color: rgba(250, 250, 250, 0.4);
      height: 100%;
      width: 102%;
      position: absolute;
    }
    .result-list {
      .no-result {
        margin-bottom: 135px;
        margin-top: 135px;
      }
      .emelent-list {
        max-height: 450px;
        overflow-y: scroll;
        transition: 450px 2s;
        -moz-transition: 450px 2s; /* Firefox 4 */
        -webkit-transition: 450px 2s; /* Safari 和 Chrome */
        -o-transition: 450px 2s;
        margin-top: 20px;
      }
    }
  }
  .result-number {
    text-align: left;
    font-size: 16px;
    color: #999FAA;
    font-weight: 600;
    padding-top: 15px;
    border-top: 1px solid #F2F4F8;
    padding-left: 15px;
    margin-top: 5px;
  }
}
.spin {
  position: absolute;
  left: 45%;
  top: 50%;
  animation-name: spin;
  animation-duration: 1000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
.error {
  color: red;
}
/*滚动条样式*/
.emelent-list::-webkit-scrollbar {
    width: 4px;
}
.emelent-list::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: rgba(0,0,0,0.2);
}
.emelent-list::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 0;
    background: rgba(0,0,0,0.1);

}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>

<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue'
import Search from './search.vue'
import Tags from "./tags.vue"
import ResultElement from "./element.vue"

import { getSearchResult } from '@/api/index'

export default defineComponent({
  name: 'search-container',
  props: {

  },
  emits: [],
  setup (props, ctx) {
    const data = reactive({
      keyword: '',
      showLoading: false,
      options: [
        {
          tag: 'Languages',
          isActive: false
        },
        {
          tag: 'Build',
          isActive: false
        },
        {
          tag: 'Design',
          isActive: false
        },
        {
          tag: 'Cloud',
          isActive: false
        }
      ],
      result: [] as any
    })
    const config = reactive({
      resultErr: false,
      errMessage: '' as any
    })
    // call api
    const toGetSearchResult = (keyword: string) => {
      data.showLoading = true
      config.resultErr = false
      let url
      if (keyword !== 'false') {
        url = '/?no-throttling=true&search='
      } else {
        url = '/?no-throttling=false&search='
      }
      getSearchResult(url, keyword).then((res: any) => {
        // can use settimeout for loading feature since api reponses too fast
        setTimeout(() => {
          data.result = res.data
          data.showLoading = false
        }, 1000);
      }).catch((err: any) => {
        data.showLoading = false
        config.resultErr = true
        data.result = []
        if (err.includes('timeout')) { // handle timeout
          config.errMessage = 'The request time out'
        } else {
          config.errMessage = 'Something wrong happened but this is not your fault : )'
        }
      })
    }
    // listen input typing
    const handleInputChange = (val: string) => {
      toGetSearchResult(val)
      data.options.forEach((item: any) => {
        item.isActive = false
      })
    }
    const handleQuickSearch = (val: string) => {
      data.keyword = val
      toGetSearchResult(val)
    }
    const clickTag = (index: number) => {
      data.options.forEach((item: any) => {
        item.isActive = false
      })
      data.options[index].isActive = true
    }
    return {
      data,
      config,
      handleInputChange,
      handleQuickSearch,
      clickTag
    }
  },
  components: {
    Search,
    Tags,
    ResultElement
  }
})

</script>
