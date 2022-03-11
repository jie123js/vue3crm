<template>
  <div class="role">
    <PageSearch :searchFormConfig="searchFormConfig"></PageSearch>
    <PageContent
      :contentTableConfig="contentTableConfig"
      pageName="role"
    ></PageContent>
    <div><el-input v-model="demo"></el-input></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
export default defineComponent({
  name: 'role',
  components: {
    PageSearch,
    PageContent
  },
  setup() {
    const demo = ref()
    return {
      demo,
      contentTableConfig,
      searchFormConfig
    }
  }
})
</script>

<style scoped></style>
