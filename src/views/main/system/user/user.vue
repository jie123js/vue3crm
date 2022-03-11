<template>
  <div class="user">
    <page-search
      :searchFormConfig="searchFormConfig"
      @handeleSearch="handeleSearch"
    />
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="users"
    ></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { usePageSearch } from '@/hooks/use-page-search.ts'
export default defineComponent({
  name: 'users',
  components: {
    PageSearch,
    PageContent
  },
  setup() {
    const [pageContentRef, handeleSearch] = usePageSearch()
    return {
      searchFormConfig,
      contentTableConfig,
      handeleSearch,
      pageContentRef
    }
  }
})
</script>

<style scoped></style>
