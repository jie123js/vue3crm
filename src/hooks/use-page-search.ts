import { ref } from 'vue'
import PageContent from '@/components/page-content'

export function usePageSearch() {
  const pageContentRef = ref<InstanceType<typeof PageContent>>()
  const handeleSearch = (queryInfo = []) => {
    if (queryInfo.length === 0) {
      pageContentRef.value?.getTableList()
    } else {
      pageContentRef.value?.getTableList(queryInfo)
    }
  }
  return [pageContentRef, handeleSearch]
}
