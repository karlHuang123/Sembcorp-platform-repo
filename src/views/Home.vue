<template>
  <div class="home" style="height: 100%">
    <search-container />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import SearchContainer from '@/components/search-container.vue'; // @ is an alias to /src

@Options({
  components: {
    SearchContainer,
  },
})
export default class Home extends Vue {}
</script>
